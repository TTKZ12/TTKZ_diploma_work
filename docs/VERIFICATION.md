# Verification record

This file records actual checks for the React/FastAPI replacement. Docker was not installed. Local PostgreSQL binaries were present, but initializing an isolated cluster failed because expected runtime assets (including timezone files) were missing from the Homebrew installation. The machine installation was not modified. Full-stack startup, applied migrations, and real database concurrency therefore require the provided Docker/CI environment.

## Automated checks

- Frontend: TypeScript compilation and Vite production build.
- Backend: pytest validation, timezone, PostgreSQL index SQL compilation, and OpenAPI route checks.
- Migration: Alembic offline PostgreSQL DDL generation.
- Integration test supplied: simultaneous booking attempts must return one 201 and one 409; cancellation permits rebooking. Skips locally without `TEST_DATABASE_URL`.

## Manual browser checks

The frontend browser demo is checked separately from the real API. Browser demo results do not establish PostgreSQL or Docker correctness.

Browser demo checks passed: city filtering, hall details, future-date availability, booking confirmation, persisted reservations shown as unavailable, cancellation, partner city/level filtering, simulated invitation persistence, profile persistence across reload, and tournament details. Mobile and desktop layouts were inspected.

Result: frontend production build passed; Python tests: 5 passed, 1 PostgreSQL integration test skipped; Alembic offline DDL generated successfully; Compose YAML parsed successfully. Docker image builds and real PostgreSQL execution remain unverified.
