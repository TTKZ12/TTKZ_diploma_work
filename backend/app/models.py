from datetime import date
from sqlalchemy import CheckConstraint, Date, ForeignKey, Index, Integer, String, UniqueConstraint, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .db import Base

class Hall(Base):
    __tablename__ = "halls"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    city: Mapped[str] = mapped_column(String(50), index=True)
    address: Mapped[str] = mapped_column(String(240))
    description: Mapped[str] = mapped_column(String(600))
    price: Mapped[int] = mapped_column(Integer)
    facilities: Mapped[str] = mapped_column(String(300))
    tables: Mapped[list["PlayingTable"]] = relationship(order_by="PlayingTable.number", lazy="selectin")
    __table_args__ = (CheckConstraint("price > 0", name="positive_hall_price"),)

class PlayingTable(Base):
    __tablename__ = "playing_tables"
    id: Mapped[int] = mapped_column(primary_key=True)
    hall_id: Mapped[int] = mapped_column(ForeignKey("halls.id"))
    number: Mapped[int] = mapped_column(Integer)
    __table_args__ = (UniqueConstraint("hall_id", "number", name="unique_hall_table"),)

class Player(Base):
    __tablename__ = "players"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60))
    city: Mapped[str] = mapped_column(String(50))
    level: Mapped[str] = mapped_column(String(20))
    preference: Mapped[str] = mapped_column(String(80))
    bio: Mapped[str] = mapped_column(String(240))
    __table_args__ = (CheckConstraint("level IN ('Beginner', 'Intermediate', 'Advanced')", name="valid_player_level"),)

class Booking(Base):
    __tablename__ = "bookings"
    id: Mapped[int] = mapped_column(primary_key=True)
    player_id: Mapped[int] = mapped_column(ForeignKey("players.id"), index=True)
    table_id: Mapped[int] = mapped_column(ForeignKey("playing_tables.id"))
    play_date: Mapped[date] = mapped_column(Date)
    hour: Mapped[int] = mapped_column(Integer)
    price: Mapped[int] = mapped_column(Integer)
    status: Mapped[str] = mapped_column(String(20), default="confirmed", server_default="confirmed")
    table: Mapped[PlayingTable] = relationship(lazy="joined")
    __table_args__ = (
        CheckConstraint("hour >= 9 AND hour <= 20", name="booking_opening_hours"),
        CheckConstraint("status IN ('confirmed', 'cancelled')", name="valid_booking_status"),
        Index("unique_active_table_slot", "table_id", "play_date", "hour", unique=True,
              postgresql_where=text("status = 'confirmed'")),
    )

class Invitation(Base):
    __tablename__ = "invitations"
    id: Mapped[int] = mapped_column(primary_key=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("players.id"))
    receiver_id: Mapped[int] = mapped_column(ForeignKey("players.id"))
    __table_args__ = (
        UniqueConstraint("sender_id", "receiver_id", name="unique_player_invitation"),
        CheckConstraint("sender_id <> receiver_id", name="no_self_invitation"),
    )

class Tournament(Base):
    __tablename__ = "tournaments"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    city: Mapped[str] = mapped_column(String(50))
    venue: Mapped[str] = mapped_column(String(120))
    event_date: Mapped[date] = mapped_column(Date)
    level: Mapped[str] = mapped_column(String(80))
    description: Mapped[str] = mapped_column(String(600))
