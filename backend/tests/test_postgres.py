"""Integration checks against a separate, migrated PostgreSQL test database.

Run with TEST_DATABASE_URL=postgresql+psycopg://.../ttkz_test pytest.
Uses its own rows and removes them after each test. Never points at the demo DB by default.
"""
import os
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from uuid import uuid4
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, delete
from sqlalchemy.orm import Session
from app.db import get_db
from app.main import app
from app.models import Booking, Hall, Player, PlayingTable

@pytest.fixture
def context():
    url = os.getenv("TEST_DATABASE_URL")
    if not url:
        pytest.skip("TEST_DATABASE_URL is required for real PostgreSQL checks")
    engine = create_engine(url, pool_pre_ping=True)
    marker = uuid4().hex[:8]
    with Session(engine) as db:
        # The API intentionally uses the shared demo player id 1.
        if not db.get(Player, 1):
            pytest.fail("Seed the isolated test DB before running integration tests")
        hall = Hall(name=f"Test {marker}", city="Almaty", address="Test", description="Test", price=1000, facilities="Parking")
        db.add(hall); db.flush()
        table = PlayingTable(hall_id=hall.id, number=1)
        db.add(table); db.commit()
        table_id, hall_id = table.id, hall.id
    def override_db():
        with Session(engine) as db:
            yield db
    app.dependency_overrides[get_db] = override_db
    try:
        yield table_id
    finally:
        app.dependency_overrides.clear()
        with Session(engine) as db:
            db.execute(delete(Booking).where(Booking.table_id == table_id))
            db.execute(delete(PlayingTable).where(PlayingTable.id == table_id))
            db.execute(delete(Hall).where(Hall.id == hall_id))
            db.commit()
        engine.dispose()

def test_simultaneous_booking_and_rebooking_after_cancellation(context):
    payload={"table_id":context,"play_date":"2099-01-01","hour":10}
    def reserve(_):
        with TestClient(app) as client:
            return client.post("/api/bookings", json=payload)
    with ThreadPoolExecutor(max_workers=2) as executor:
        responses = list(executor.map(reserve, range(2)))
    assert sorted(response.status_code for response in responses) == [201,409]
    booking = next(response.json() for response in responses if response.status_code==201)
    with TestClient(app) as client:
        assert client.delete(f"/api/bookings/{booking['id']}").status_code == 204
        assert client.post("/api/bookings", json=payload).status_code == 201
