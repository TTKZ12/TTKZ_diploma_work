import os
from datetime import date, datetime
from typing import Annotated
from zoneinfo import ZoneInfo
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from .db import get_db
from .models import Booking, Hall, Invitation, Player, PlayingTable, Tournament
from .schemas import BookingIn, BookingOut, HallOut, PlayerOut, ProfileIn, TournamentOut

app = FastAPI(title="TTKZ prototype API", version="0.1.0", description="Local diploma demo. Single shared demo player; no authentication. All venues and events are fictional.")
app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(","), allow_methods=["GET", "POST", "PUT", "DELETE"], allow_headers=["Content-Type"])
DB = Annotated[Session, Depends(get_db)]
TZ = ZoneInfo("Asia/Almaty")
DEMO_PLAYER_ID = 1

def get_or_404(db: Session, model, identity: int):
    item = db.get(model, identity)
    if item is None:
        raise HTTPException(404, "Record not found")
    return item

def validate_slot(play_date: date, hour: int) -> None:
    if datetime.combine(play_date, datetime.min.time(), TZ).replace(hour=hour) <= datetime.now(TZ):
        raise HTTPException(422, "Choose a future session (Kazakhstan time)")

def serialize_booking(db: Session, booking: Booking) -> dict:
    hall = get_or_404(db, Hall, booking.table.hall_id)
    return dict(id=booking.id, table_id=booking.table_id, hall_id=hall.id,
                hall_name=hall.name, city=hall.city, table_number=booking.table.number,
                play_date=booking.play_date, hour=booking.hour, price=booking.price, status=booking.status)

@app.get("/api/health")
def health(db: DB):
    db.execute(text("SELECT 1"))
    return {"status": "ok", "mode": "single-player local demo"}

@app.get("/api/halls", response_model=list[HallOut])
def halls(db: DB, city: str | None = None):
    query = select(Hall).order_by(Hall.id)
    if city:
        query = query.where(Hall.city == city)
    return db.scalars(query).all()

@app.get("/api/halls/{hall_id}/availability")
def availability(hall_id: int, db: DB, play_date: date = Query()):
    hall = get_or_404(db, Hall, hall_id)
    table_ids = [table.id for table in hall.tables]
    taken = set(db.execute(select(Booking.table_id, Booking.hour).where(
        Booking.table_id.in_(table_ids), Booking.play_date == play_date, Booking.status == "confirmed")).all())
    now = datetime.now(TZ)
    return [{"table_id": table.id, "number": table.number,
             "slots": [{"hour": hour, "available": (table.id, hour) not in taken and
                        datetime.combine(play_date, datetime.min.time(), TZ).replace(hour=hour) > now}
                       for hour in range(9, 21)]} for table in hall.tables]

@app.get("/api/bookings", response_model=list[BookingOut])
def bookings(db: DB):
    rows = db.scalars(select(Booking).where(Booking.player_id == DEMO_PLAYER_ID, Booking.status == "confirmed").order_by(Booking.play_date, Booking.hour)).all()
    return [serialize_booking(db, row) for row in rows]

@app.post("/api/bookings", response_model=BookingOut, status_code=201)
def book(payload: BookingIn, db: DB):
    validate_slot(payload.play_date, payload.hour)
    table = get_or_404(db, PlayingTable, payload.table_id)
    hall = get_or_404(db, Hall, table.hall_id)
    get_or_404(db, Player, DEMO_PLAYER_ID)
    booking = Booking(**payload.model_dump(), player_id=DEMO_PLAYER_ID, price=hall.price)
    db.add(booking)
    try:
        # The partial unique PostgreSQL index arbitrates simultaneous requests.
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        if getattr(exc.orig, "sqlstate", None) == "23505":
            raise HTTPException(409, "This table and time are already booked. Choose another session.") from exc
        raise
    db.refresh(booking)
    return serialize_booking(db, booking)

@app.delete("/api/bookings/{booking_id}", status_code=204)
def cancel(booking_id: int, db: DB):
    booking = get_or_404(db, Booking, booking_id)
    if booking.player_id != DEMO_PLAYER_ID:
        raise HTTPException(403, "This booking belongs to another player")
    booking.status = "cancelled"
    db.commit()

@app.get("/api/profile", response_model=PlayerOut)
def profile(db: DB):
    return get_or_404(db, Player, DEMO_PLAYER_ID)

@app.put("/api/profile", response_model=PlayerOut)
def update_profile(payload: ProfileIn, db: DB):
    player = get_or_404(db, Player, DEMO_PLAYER_ID)
    for key, value in payload.model_dump().items():
        setattr(player, key, value)
    db.commit()
    db.refresh(player)
    return player

@app.get("/api/players", response_model=list[PlayerOut])
def players(db: DB, city: str | None = None, level: str | None = None):
    query = select(Player).where(Player.id != DEMO_PLAYER_ID).order_by(Player.id)
    if city:
        query = query.where(Player.city == city)
    if level:
        query = query.where(Player.level == level)
    return db.scalars(query).all()

@app.get("/api/invitations", response_model=list[int])
def invitations(db: DB):
    return db.scalars(select(Invitation.receiver_id).where(Invitation.sender_id == DEMO_PLAYER_ID)).all()

@app.post("/api/players/{player_id}/invite", status_code=201)
def invite(player_id: int, db: DB):
    if player_id == DEMO_PLAYER_ID:
        raise HTTPException(422, "Choose another player")
    get_or_404(db, Player, player_id)
    db.add(Invitation(sender_id=DEMO_PLAYER_ID, receiver_id=player_id))
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        if getattr(exc.orig, "sqlstate", None) == "23505":
            raise HTTPException(409, "Invitation already sent") from exc
        raise
    return {"message": "Demo invitation saved. No external message sent."}

@app.get("/api/tournaments", response_model=list[TournamentOut])
def tournaments(db: DB):
    return db.scalars(select(Tournament).order_by(Tournament.event_date)).all()
