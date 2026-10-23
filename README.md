# TTKZ — Forest design migration, Phase 2

**Design and Development of the TTKZ Web Platform for Digital Integration of the Table Tennis Community in Kazakhstan.**

This milestone adapts the supplied Forest website's cinematic composition, perspective-based parallax, transparent navigation, glass forms, and profile identity to table tennis. The original project was inspected before implementation. Its source, private environment, SQLite records, uploaded avatars, and dependencies were not copied into this repository.

Read **[the source assessment and migration plan](docs/MIGRATION_PLAN.md)** for the original structure, parallax assessment, reuse decisions, security findings, React migration, proposed FastAPI modules, normalized PostgreSQL schema, and phased plan.

## Current scope

Implemented:

- React + TypeScript + Vite + React Router frontend.
- Polished dark/charcoal and electric-lime homepage with local generated sports imagery.
- Foreground racket/ball, arena and middle layers with pointer and scroll depth, requestAnimationFrame easing, visibility-aware work and full reduced-motion opt-out.
- Sticky navigation, working mobile menu with Escape/outside close, native document scrolling, route focus handling and skip link.
- Home introduction, sports hall previews, tournament previews, player previews and platform benefits.
- Read-only hall catalog/details with city/facility/price/search filters; Astana is the default city.
- Read-only player catalog/public profiles with city, level and playing-time filters.
- Tournament/news previews with search, sort, content switch and detail/article routes.
- About page and explicitly labelled contact/auth/account layout foundations.
- Typed catalog service and Fetch API boundary separate from components.

Not implemented in this phase:

- Live availability, reservations/cancellations and the PostgreSQL overlap constraint.
- Real registration/login/logout, protected account data, resets, uploads and privacy controls.
- Partner-request state transitions, stored contact messages or administrator tools.
- FastAPI modules, PostgreSQL schema migrations and seeds, Docker Compose and backend test suite.

These are planned Phase 3–5 work, not completed functionality. Preview records are static design fixtures, never represented as live or verified data. Forms requiring a backend are disabled with an explanation; no fake success states or localStorage authentication are provided.

## Run the frontend

Requires Node.js 20.19+ or 22.12+ (Node 24 recommended).

```sh
cd frontend
npm ci
npm run dev
```

Open the Local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run build
npm run preview
```

The frontend is an SPA: production hosting must return `index.html` for non-asset routes. Vite development/preview handles direct-route refresh. No deployment or remote repository push is performed automatically in this milestone.

## Routes

`/`, `/halls`, `/halls/:id`, `/tournaments`, `/tournaments/:id`, `/news/:id`, `/players`, `/players/:id`, `/about`, `/contact`, `/login`, `/register`, `/forgot-password`, `/account`, `/account/edit`, `/account/bookings`, `/account/requests`.

Catalog routes are functional read-only previews. Auth/contact/account routes communicate their pending integration status and do not collect credentials or submit messages.

## Structure

```text
frontend/src/
  app/                   React Router composition
  components/layout/     Navigation, footer, route scroll/focus
  components/common/     Icons, headings, preview labels, cards
  components/parallax/   Layered sports hero and motion styles
  hooks/                 Parallax and reveal lifecycles
  pages/                 Feature-oriented page layouts
  services/              Typed design fixtures and Fetch API boundary
  types/                 Catalog contracts
  styles/                Organized tokens/global/catalog/form CSS
frontend/public/images/  Local hero asset
backend/README.md        Backend scope boundary for this milestone
docs/                    Analysis, schema, asset provenance, verification
```

The agreed full stack remains React/TypeScript/Vite, FastAPI, SQLAlchemy 2.x, Pydantic, Alembic, PostgreSQL, Docker/Compose, GitHub and YouTrack. No microservices or unrelated forest integrations are introduced.

## Configuration and assets

`frontend/.env.example` documents optional contact display information. Never put backend secrets into `VITE_*` variables: those are public build values. If contact information is absent, the UI explicitly says it is not configured. No invented official phone/email/address is shown.

Hero photograph is AI-generated concept imagery; hall illustrations are project-native SVG. Neither depicts a verified venue or real community member. See [asset provenance](docs/ASSETS.md). Google Fonts supplies Barlow Condensed and DM Sans with local system fallbacks; no secret configuration is required.

## Validation

See [verification record](docs/VERIFICATION.md) for actual completed build/browser checks and limitations. Backend acceptance criteria are in the migration plan; they have not been claimed as passing for this frontend-only milestone.
