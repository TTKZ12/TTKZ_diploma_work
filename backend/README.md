# Backend planning status

The redesigned backend is intentionally not implemented in this homepage-first phase. See `../docs/MIGRATION_PLAN.md` for module boundaries, authentication/session requirements, PostgreSQL entities, overlap exclusion constraint, API conventions, and test acceptance criteria.

The original Express/SQLite application and earlier TTKZ demo remain outside this working tree/in Git history respectively. Their credentials and runtime records are not imported. The frontend currently uses labelled design fixtures and has no working account, reservation, partner-request, or contact-submission API.
