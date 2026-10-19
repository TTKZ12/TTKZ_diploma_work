from datetime import date
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field

class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class TableOut(ORMModel):
    id: int
    number: int

class HallOut(ORMModel):
    id: int
    name: str
    city: str
    address: str
    description: str
    price: int
    facilities: str
    tables: list[TableOut]

class ProfileIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    name: str = Field(min_length=1, max_length=60)
    city: Literal['Almaty', 'Astana', 'Shymkent', 'Karaganda']
    level: Literal['Beginner', 'Intermediate', 'Advanced']
    preference: str = Field(min_length=1, max_length=80)
    bio: str = Field(max_length=240)

class PlayerOut(ProfileIn, ORMModel):
    id: int

class BookingIn(BaseModel):
    table_id: int = Field(gt=0)
    play_date: date
    hour: int = Field(ge=9, le=20, strict=True)

class BookingOut(ORMModel):
    id: int
    table_id: int
    hall_id: int
    hall_name: str
    city: str
    table_number: int
    play_date: date
    hour: int
    price: int
    status: str

class TournamentOut(ORMModel):
    id: int
    name: str
    city: str
    venue: str
    event_date: date
    level: str
    description: str
