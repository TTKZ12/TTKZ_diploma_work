# TTKZ — raw diploma platform

 conceptual web platform for digital integration of Kazakhstan's table tennis community. Hall discovery and booking are the main flow; profiles, partner discovery, and tournament announcements support it.

## Agreed stack

| Area | Technology |
| --- | --- |
| Frontend | React + TypeScript |
| Backend | Python + FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy 2 |
| Migrations | Alembic |
| Containers | Docker Compose |
| Version control | Git / GitHub |
| Task tracking | YouTrack |

Vite is the React build/dev tool. Application code and styling are TypeScript; `frontend/index.html` is only React's mounting entry. The old `dist/index.html`, `dist/style.css`, and `dist/app.js` have been deleted. This implementation runs locally and does not use Sites hosting. The previously published static preview is an earlier version and has not been updated.

## Quick preview: frontend only

```sh
cd frontend
npm ci
npm run dev
```

Open http://127.0.0.1:5173. The clearly labelled **BROWSER DEMO** uses sample data and browser storage, without requiring Python or PostgreSQL. The demo covers filters, hall details, table/date/time selection, booking cancellation, profiles, partner invitations, and tournaments. Web Locks serializes demo booking mutations across tabs where supported; this is not a substitute for a server database.

## Full stack: Docker

Install Docker with Compose, then from this directory:

```sh
cp .env.example .env
docker compose up --build
```

- Frontend: http://localhost:5173
- FastAPI API documentation: http://localhost:8000/docs
- Database-aware health check: http://localhost:8000/api/health

PostgreSQL starts first, Alembic applies the schema, fictional fixtures are seeded once, then FastAPI and the React preview start. Docker builds React with `VITE_DEMO_MODE=false`, so booking and profile actions use the API. PostgreSQL data survives container restarts in a named volume. Use `docker compose down` to stop services without deleting data. Development ports bind only to localhost.

The API intentionally operates as **one shared demo player**, not authenticated individual users. Keep this raw stack local. Invitations are stored records, not real notifications. None of the halls or events represent verified businesses or announcements; no real reservations or payments occur.

## Manual backend development

With PostgreSQL running, create a database and configure `DATABASE_URL` (SQLAlchemy psycopg URL). From `backend`:

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
export DATABASE_URL='postgresql+psycopg://ttkz:ttkz_dev@localhost:5432/ttkz'
alembic upgrade head
python -m app.seed
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

For the frontend to use this API, copy `frontend/.env.example` to `frontend/.env`, change `VITE_DEMO_MODE=false`, and restart Vite. The frontend proxies `/api` to port 8000. The Docker frontend proxies to the API container instead.

## Booking rules

- Each reservation is exactly one hour, starting on the hour, 09:00–20:00 (hall closes at 21:00).
- Dates and sessions are evaluated in `Asia/Almaty`, UTC+5.
- Past sessions and out-of-hours requests are rejected server-side.
- A PostgreSQL partial unique index on `(table_id, play_date, hour)` for confirmed bookings rejects duplicates even under concurrent requests. Conflicts return HTTP 409.
- Cancellation retains a cancelled record and releases the unique slot.
- The backend records the venue's price at booking time; clients cannot set the price.

## Project structure

```text
frontend/src/       React components, typed API client, demo adapter, styles
backend/app/        FastAPI routes, SQLAlchemy models, schemas, sample seeding
backend/alembic/    Versioned database migrations
backend/tests/      Validation and PostgreSQL concurrency integration tests
.github/workflows/  Frontend build and PostgreSQL-backed backend CI
compose.yaml       PostgreSQL, FastAPI, and React containers
docs/              Development notes and YouTrack-ready backlog
```

This project already has a local Git repository. No GitHub repository or YouTrack project has been created or connected; their destinations must come from the project owner.

## Checks

```sh
cd frontend
npm run build
```

```sh
cd backend
.venv/bin/python -m pytest -q
.venv/bin/alembic upgrade head --sql
```

Without `TEST_DATABASE_URL`, the PostgreSQL integration test is skipped. To run it, create a **separate** PostgreSQL test database, set both `DATABASE_URL` and `TEST_DATABASE_URL` to that database, then run `alembic upgrade head`, `python -m app.seed`, and `pytest -q`. CI is configured to do this automatically, including simultaneous reservation attempts, cancellation/rebooking, and schema drift checks.

Docker/PostgreSQL execution requires Docker or a running PostgreSQL instance. It was unavailable on the development machine; see `docs/VERIFICATION.md` for the checks actually completed.

## Next diploma milestones

Authentication and per-user permissions; hall-manager and administrator interfaces; verified venue data; flexible session durations; partner messaging; multilingual Kazakh/Russian/English content. These are not implemented in the raw version. See `docs/BACKLOG.md` for YouTrack task suggestions.
