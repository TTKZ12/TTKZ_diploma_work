# Backend status

The backend is **planned and not implemented**. Use the [root README](../README.md) as the primary project document for pre-defense.

The current frontend uses labelled static catalog fixtures. Authentication, persistent profiles, reservations, partner requests, contact storage, and administrator tools are not connected to an API. There are no backend dependencies, startup commands, database migrations, or backend tests in this directory.

The [supporting architecture and migration plan](../docs/MIGRATION_PLAN.md) proposes a FastAPI modular monolith with PostgreSQL, session authentication, ownership checks, safe uploads, and database-level booking overlap protection. These are future implementation requirements.

The earlier Forest Express/SQLite application is not part of this working backend.
