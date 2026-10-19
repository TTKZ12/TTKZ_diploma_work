from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import pytest
from fastapi import HTTPException
from pydantic import ValidationError
from sqlalchemy.schema import CreateIndex
from sqlalchemy.dialects import postgresql
from app.main import app, validate_slot
from app.models import Booking
from app.schemas import BookingIn, ProfileIn

def test_whole_hour_sessions_only():
    for hour in (8, 21, 10.5, "10"):
        with pytest.raises(ValidationError):
            BookingIn(table_id=1, play_date="2099-01-01", hour=hour)
    assert BookingIn(table_id=1, play_date="2099-01-01", hour=10).hour == 10

def test_kazakhstan_past_slot_rejected():
    yesterday = datetime.now(ZoneInfo("Asia/Almaty")).date() - timedelta(days=1)
    with pytest.raises(HTTPException) as error:
        validate_slot(yesterday, 10)
    assert error.value.status_code == 422
    validate_slot(yesterday + timedelta(days=2), 10)

def test_blank_name_and_invalid_level_rejected():
    for name, level in (("   ", "Beginner"), ("Alex", "Professional")):
        with pytest.raises(ValidationError):
            ProfileIn(name=name, city="Almaty", level=level, preference="Flexible", bio="")

def test_postgres_atomic_index_covers_active_slots_only():
    index = next(i for i in Booking.__table__.indexes if i.name == "unique_active_table_slot")
    sql = str(CreateIndex(index).compile(dialect=postgresql.dialect()))
    assert "UNIQUE INDEX" in sql
    assert "(table_id, play_date, hour)" in sql
    assert "WHERE status = 'confirmed'" in sql

def test_openapi_includes_main_flows():
    schema = app.openapi()
    assert schema["paths"]["/api/bookings"]["post"]["responses"]["201"]
    assert schema["paths"]["/api/profile"]["put"]
    assert schema["paths"]["/api/halls/{hall_id}/availability"]["get"]
