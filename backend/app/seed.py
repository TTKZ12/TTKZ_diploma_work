"""Idempotent, fictional fixtures for the local diploma demo."""
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from sqlalchemy import select
from .db import SessionLocal
from .models import Hall, Player, PlayingTable, Tournament

HALLS = [
    ("Spin Arena", "Almaty", "Abay Avenue · sample address", 2500, "Professional tables,Changing rooms,Parking", 8),
    ("Topspin Club", "Astana", "Turan Avenue · sample address", 3000, "Professional tables,Equipment rental,Parking", 6),
    ("Dostyk Table Tennis", "Almaty", "Dostyk Avenue · sample address", 2000, "Equipment rental,Changing rooms,Coaching", 4),
    ("Shymkent Ping Pong", "Shymkent", "Tauke Khan Avenue · sample address", 1800, "Equipment rental,Coaching,Parking", 5),
    ("Saryarka TT Center", "Astana", "Saryarka Avenue · sample address", 2500, "Professional tables,Changing rooms,Coaching", 6),
    ("Karaganda Spin Club", "Karaganda", "Bukhar Zhyrau Avenue · sample address", 1500, "Equipment rental,Parking,Coaching", 4),
]

def seed():
    with SessionLocal.begin() as db:
        if db.scalar(select(Hall.id).limit(1)) is None:
            for name, city, address, price, facilities, count in HALLS:
                hall = Hall(name=name, city=city, address=address, price=price, facilities=facilities,
                            description="A welcoming sample venue for practice and friendly matches. Open daily, 09:00–21:00.")
                db.add(hall)
                db.flush()
                db.add_all(PlayingTable(hall_id=hall.id, number=i) for i in range(1, count + 1))
        if db.scalar(select(Player.id).limit(1)) is None:
            for name, city, level, preference, bio in [
                ("Alex", "Almaty", "Intermediate", "Weekday evenings", "Always up for a friendly game."),
                ("Aigerim S.", "Almaty", "Intermediate", "Weekday evenings", "Looking for a regular partner to improve our rallies together."),
                ("Dias K.", "Astana", "Advanced", "Weekend mornings", "Competitive player who enjoys match practice."),
                ("Madina A.", "Almaty", "Beginner", "Weekend afternoons", "New to the sport and happy to meet other beginners."),
                ("Arman T.", "Shymkent", "Intermediate", "Weekday evenings", "Good rallies and a little friendly competition.")]:
                db.add(Player(name=name, city=city, level=level, preference=preference, bio=bio))
        if db.scalar(select(Tournament.id).limit(1)) is None:
            today = datetime.now(ZoneInfo("Asia/Almaty")).date()
            for name, city, venue, days, level in [
                ("Almaty Community Open", "Almaty", "Spin Arena", 14, "All levels"),
                ("Capital City Championship", "Astana", "Topspin Club", 21, "Intermediate & advanced"),
                ("First Serve: Beginners Cup", "Shymkent", "Shymkent Ping Pong", 28, "Beginners")]:
                db.add(Tournament(name=name, city=city, venue=venue, event_date=today + timedelta(days=days), level=level,
                                  description="A fictional community singles event with group stages and friendly competition. This is a sample announcement; registration is not available."))

if __name__ == "__main__":
    seed()
