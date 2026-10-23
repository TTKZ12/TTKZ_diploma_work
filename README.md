# TTKZ — Table Tennis Community Platform for Kazakhstan

**Diploma project:** Design and Development of the TTKZ Web Platform for Digital Integration of the Table Tennis Community in Kazakhstan.

**Pre-defense stage · Version 0.2.0 · Documentation reviewed: 23 October 2026**

TTKZ proposes a single place to discover table tennis halls, find practice partners, and follow tournaments and community news in Kazakhstan. The intended users are beginners, regular players, competitive athletes, and sports hall operators.

The current deliverable is a **responsive frontend prototype**. It demonstrates navigation, catalog discovery, filtering, and detail pages using fictional data. The backend, database, authentication, and reservation workflows are planned. This README is the primary project document for pre-defense; supporting technical records are linked below.

## Project purpose

Finding a venue, a suitable practice partner, and a local event can require consulting separate sources. TTKZ explores how these tasks can be brought into one web platform, starting with an Astana-focused hall catalog and sample content for Almaty and Shymkent.

The project objectives are to:

- Design a responsive interface for hall, player, tournament, and news discovery.
- Provide clear navigation, useful filters, and informative public detail pages.
- Define a maintainable frontend and a future REST API with persistent data.
- Implement secure accounts, conflict-safe reservations, and partner requests in subsequent development stages.

The prototype demonstrates the proposed user experience. User adoption, operational venue data, and community impact have not yet been evaluated.

## Team responsibilities

- Zhanybek Alikhan — backend development: Python, FastAPI, PostgreSQL, API and database design.
- Tazhimova Araizhan — frontend development: React, TypeScript, UI/UX, responsive layout and frontend integration.

These responsibilities describe the project roles and do not change Git commit authorship.

## Current implementation

| Area | Available in this repository | Remaining work |
| --- | --- | --- |
| Home and navigation | Layered sports hero, pointer/scroll parallax, preview sections, desktop/mobile navigation | Further usability and device testing |
| Sports halls | Search, city/facility/maximum-price filters, hall details; Astana selected initially | Database records, real availability, reservations and cancellations |
| Players | Name search, city/level/playing-time filters, public profile previews | Real profiles, privacy enforcement, partner requests |
| Tournaments and news | Content tabs, search, date sorting, event and article details | Persistent content and administration |
| About and contact | Project description, optional contact email display, disabled contact form | Validated and stored contact submissions |
| Authentication and account | Login/register/reset layouts and account navigation | Sessions, registration, login/logout, reset email, protected account data and uploads |
| Backend and database | Architecture and preliminary schema documented | FastAPI application, PostgreSQL, migrations, seeds and API tests |

The fixture catalog contains **4 halls, 4 players, 3 tournaments, and 2 articles** in `frontend/src/services/catalog.ts`. Names, addresses, prices, people, organizers, and events are illustrative. Tournament dates and statuses are fixed fixture values, not a live schedule.

Backend-dependent forms are disabled. The account routes display an integration notice and contain no private user data. There are no working reservations, invitations, contact submissions, or authenticated sessions in this release.

## Technology and architecture

**Implemented:** React 19, TypeScript 5.9, Vite 7, React Router 7, and CSS. Exact dependency versions are recorded in `frontend/package-lock.json`.

Current data flow:

```text
Browser → React Router → Pages/components → Typed local catalog fixtures
```

Components read static catalog data through the service layer. `frontend/src/services/http.ts` defines a Fetch helper for the future `/api/v1` API, but the current catalog does not call it. Vite has a development proxy from `/api` to `http://127.0.0.1:8000`; running the frontend does not require a backend.

**Planned:** one FastAPI application with SQLAlchemy, Pydantic, Alembic, and PostgreSQL. Docker Compose is also planned. The proposed modules cover authentication, users, halls, bookings, players, partner requests, tournaments, news, and contacts. The planned database uses an exclusion constraint to reject overlapping active bookings for the same table, including concurrent requests. These designs are specified in [the architecture and migration plan](docs/MIGRATION_PLAN.md); they are not implemented in this repository.

## Run locally

Use Node.js **20.19+ within the 20.x line, or 22.12+** and npm. The production build was verified with Node.js 24.15.0 and npm 11.12.1 during this documentation review.

From the repository root:

```sh
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173`. No database, backend service, account, or environment file is required for the demo. Install dependencies before the presentation; Google Fonts requires network access, with system-font fallbacks when unavailable.

Run the commands below from `frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run typecheck` | Check TypeScript without emitting output |
| `npm run build` | Run the TypeScript build check and produce `dist/` |
| `npm run preview` | Serve an existing production build locally |

For a production-build demonstration:

```sh
npm run build
npm run preview
```

Use the preview URL printed in the terminal. The application entry point is `frontend/index.html`; run these commands inside `frontend/`. There is no separate application entry point at the repository root.

For future static hosting, publish `frontend/dist/` and configure a fallback to its `index.html` for application routes such as `/halls/astana-arena`. Opening the HTML file directly from disk does not serve the application correctly. No public deployment is documented for this milestone.

## Optional configuration

To show a real contact email, copy `frontend/.env.example` to `frontend/.env.local` and set:

```dotenv
VITE_CONTACT_EMAIL=your-contact@example.com
```

Replace the example with a contact you intend to publish, then restart the development server or rebuild. This enables email display and a `mailto:` link only; it does not activate the contact form. Without this value, the page explains that contact information is not configured.

All `VITE_*` values are public browser build values. Backend credentials and secrets must not be placed in them.

## Pre-defense demonstration

Suggested walkthrough: approximately 5–7 minutes, followed by questions.

1. **Purpose and scope:** explain the intended community use and identify the current release as a frontend prototype with fictional data.
2. **Homepage (`/`):** show the visual identity, layered hero, navigation, and links to the main catalogs.
3. **Halls (`/halls`):** show the default Astana results, select all cities, filter by facility or price, then open `/halls/astana-arena`. Explain where real availability and booking will be integrated.
4. **Players (`/players`):** filter by city or playing level and open `/players/aigerim`. Explain the planned authenticated partner-request workflow.
5. **Events and news (`/tournaments`):** demonstrate search and date ordering, open `/tournaments/capital-open`, then switch to News and open a sample article.
6. **Responsive interface and integration boundaries:** show the mobile menu, then `/login`, `/account`, and `/contact`. Explain why the forms are disabled and what requires a server.
7. **Technical design and next steps:** describe the typed catalog boundary, planned FastAPI/PostgreSQL architecture, and database-level booking conflict protection.

The demonstration establishes the implemented discovery experience and the technical plan. It does not establish production readiness or completion of the full diploma system.

## Routes

| Routes | Purpose |
| --- | --- |
| `/` | Homepage |
| `/halls`, `/halls/:id` | Hall catalog and details |
| `/players`, `/players/:id` | Player catalog and public profile previews |
| `/tournaments`, `/tournaments/:id` | Tournament catalog and event details |
| `/news/:id` | Sample article; the news listing is a tab on `/tournaments` |
| `/about`, `/contact` | Project information and contact layout |
| `/login`, `/register`, `/forgot-password` | Disabled authentication layouts |
| `/account`, `/account/edit`, `/account/bookings`, `/account/requests` | Account integration placeholders |

Unknown routes and unknown catalog IDs render the not-found page.

## Repository structure

```text
README.md                    Primary pre-defense project document
frontend/
  src/app/                   Route composition
  src/components/            Layout, common UI, and parallax scene
  src/hooks/                 Parallax and reveal lifecycles
  src/pages/                 Feature pages
  src/services/              Static catalog and future Fetch boundary
  src/types/                 Catalog TypeScript interfaces
  src/styles/                Global, catalog, and form styles
  public/                    Favicon and local hero image
  .env.example               Optional public contact configuration
  package.json               Dependencies and npm commands
  package-lock.json          Locked dependency versions
backend/README.md            Backend status pointer; no backend code yet
docs/                        Supporting plans, provenance, and verification
```

The visual foundation adapts the composition and parallax approach of an earlier Forest project to the table tennis domain. The current application uses React and TypeScript; the earlier Express/SQLite application is not the backend of this prototype.

## Verification and limitations

On **23 October 2026**, `npm run build` passed, including TypeScript build checking and Vite production bundling. The documentation review checked route definitions, fixture counts, filter behavior in source, disabled forms, API configuration, and repository structure. See [the verification record](docs/VERIFICATION.md) for the complete evidence and its limits.

Earlier browser checks and screenshots are retained as historical evidence. They were not repeated during this documentation review. Reduced-motion and coarse-pointer handling exist in source, but physical-device testing and a full accessibility audit remain outstanding. There is no automated application test suite in the current package scripts, and no backend tests can run before the backend exists.

## Remaining development

1. **Backend foundation:** FastAPI configuration, PostgreSQL schema/migrations, seed data, session authentication, ownership checks, and safe profile uploads.
2. **Core integration:** API-backed catalogs, availability, conflict-safe booking/cancellation, account reservations, partner-request transitions, persistent contacts, and content administration.
3. **System validation:** real PostgreSQL concurrency tests, authentication/authorization tests, API validation, responsive/accessibility checks, and Docker Compose startup verification.

Online payments, real-time chat, external federation integrations, an AI assistant, and complex ranking are outside the documented project scope.

## Supporting documentation and visuals

| Document | Relevance to pre-defense |
| --- | --- |
| [Migration and architecture plan](docs/MIGRATION_PLAN.md) | Historical source assessment, design rationale, proposed API/database design, and delivery phases; future architecture is explicitly provisional |
| [Verification record](docs/VERIFICATION.md) | Current build evidence, earlier browser checks, and testing limitations |
| [Asset provenance](docs/ASSETS.md) | Origin and intended use of generated imagery, source graphics, and fonts |
| [Historical submission audit](docs/PREDEFENSE_PERIOD_1_AUDIT.md) | Findings for the earlier `1fc76fd` snapshot, including academic deliverables; not a current release assessment |
| [Backend status](backend/README.md) | Short pointer confirming that backend implementation is pending |

[Desktop homepage screenshot](docs/screenshots/home-desktop.jpg) · [Mobile homepage screenshot](docs/screenshots/home-mobile.jpg)

The screenshots are retained prototype captures rather than evidence of a deployed service. Hero imagery is documented as AI-generated concept imagery, and venue illustrations are SVG/CSS; neither verifies real venues or community members.
