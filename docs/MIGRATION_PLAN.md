# Forest → TTKZ: source analysis and staged migration

## 1. Inspected sources and current repository

The supplied ZIP was read first (3,291 entries including dependencies and runtime data). It was subsequently unavailable at its original path; analysis continued from the matching extracted `Desktop/my_first_project/temporary-folder` copy. UI and code files were copied to a private temporary inspection directory. The original project was not modified or executed. Secrets, databases, user records, uploaded avatars, and node_modules were not copied into this repository.

The original is a CommonJS Express 5 / better-sqlite3 application with static HTML/CSS/JS:

| Source | Responsibility |
| --- | --- |
| `forest.html` | Home hero, introduction, contribution dashboard, contact, About, footer |
| `forest.css` | 3D hero, full-screen snap sections, glass navigation, tabs, forms, responsive breakpoints |
| `forest.js` | Mouse rotation, smooth section navigation, mobile menu, dashboard tabs, API loading, contact feedback |
| `login.html/css/js` | Separate login/register views, floating labels, glass panels, inline loading/errors |
| `account.html/css/js` | Cover/avatar identity, profile edit, privacy preferences, verification, session revocation, account deletion |
| `auth-client.js` | Navigation identity from `/api/me` |
| `server.js` | Auth, sessions, uploads, mail, contact, forest contributions, news/assistant integrations |
| `db.js` | SQLite schema, prepared queries, token hashes, profile settings and forest activity |
| `mailer.js` | SMTP delivery and development console fallback |
| `images/` | Forest-specific photography, favicon, social icons |
| `.env`, `data/`, `uploads/` | Private configuration and runtime records: excluded from migration |

The TTKZ GitHub repository's current `main` (31282f7) has no application files following deletion commits. Work starts on `codex/parallax-redesign` from that existing history. Earlier prototype commits remain in history; no reset, rewrite, or force push is used.

## 2. Parallax assessment

Evidence: `forest.js` lines 1–9 and `forest.css` lines 18–50, 157–181.

- Pointer displacement from viewport center sets `--mouse-x` and `--mouse-y` at −0.005 degrees per pixel.
- The hero provides 1000px perspective. `.layers__container` preserves 3D transforms and rotates on both axes.
- Its background is one oversized, blurred image at `translateZ(-100px) scale(1.2)`; text sits above it. It is not currently a multilayer scene with independently moving objects.
- A 1.5s easing transition smooths rotation. Hero text reveals with opacity/translation/scale.
- Full-height sections live in a nested scroll container with mandatory snapping. `snapTo()` scrolls that container. The JavaScript contains no continuous scroll-driven parallax.
- Reduced motion removes reveal animations and transform transition, but the document mouse listener still changes rotation. That needs correcting.
- Every mouse event rewrites the root `style` attribute, which can overwrite unrelated inline variables. There is no frame batching, visibility pause, or coarse-pointer policy.

TTKZ adaptation: preserve the perspective/rotation and editorial reveal, but isolate updates to one scene via `style.setProperty`, batch in one requestAnimationFrame, and add separately composed arena, table, racket, and ball layers. Add gentle scroll displacement as an explicit extension. Disable pointer tilt for coarse/touch pointers, stop all parallax for reduced motion, pause work when offscreen/hidden, and clean up listeners/observers/frames. Keep navigation and readable text outside the rotating scene. Use native document scrolling and proximity snapping only where appropriate, avoiding mandatory scroll traps on forms/mobile.

## 3. Reuse decisions

| Original pattern | Migration decision |
| --- | --- |
| Immersive hero, large type, eyebrow, two actions | Retain composition and hierarchy; write new table-tennis content |
| 3D pointer transform and eased motion | Reimplement as typed lifecycle-safe hook; add real independent layers |
| Full-screen section rhythm and scroll cue | Retain generous sections and smooth anchors; relax mandatory snapping |
| Transparent navigation and mobile hamburger | React layout with real routes, current-page states, Escape/outside close |
| Glass form cards and floating labels | Preserve for later auth/contact integration; never simulate successful submissions |
| Avatar/cover/profile identity | Preserve for future authenticated account pages |
| Tabs, filters, feedback, empty/loading states | Reusable accessible React components |
| Privacy and session-revocation concepts | Migrate with server enforcement in Phase 3/4 |
| Forest photographs, campaigns, contribution charts, donation flows | Do not migrate; unrelated domain |
| External forest news and AI assistant | Do not migrate; explicitly outside scope |
| Existing database records and credentials | Do not import into the public development repository |

## Security observations from the original source

Positive controls worth preserving: bcrypt password hashing, HttpOnly/SameSite=Lax cookies, production Secure cookies, rate limits, token-version revocation, cryptographic reset/verification tokens stored as SHA-256 hashes, parameterized SQLite queries, upload size limits, contact honeypot, generic forgot-password responses.

Migration risks to address before real accounts:

1. `server.js:255` serves the entire project root. Non-dotfile source and `data/forest.db`, its WAL, or JSON records may be publicly reachable when running that server. Serve only a dedicated public/assets directory.
2. The provided archive contains an `.env` with authentication, SMTP, and external API configuration fields, plus databases and uploaded user images. Values were withheld, not imported, and not printed. If real credentials were shared outside a trusted environment, rotate them. Never bundle runtime records with a design sample.
3. Avatar validation relies on client MIME type and uses the original extension. Decode/verify image bytes, cap dimensions/pixel count, re-encode accepted JPEG/PNG/WebP, use a server-generated extension/name, and keep storage outside application source.
4. No explicit CSRF/origin-validation mechanism was found for cookie-authenticated writes. The new API needs same-origin checks/CSRF protection in addition to cookie flags.
5. Development mail fallback prints reset/verification links to logs. Production must require SMTP and avoid token-bearing logs; unavailable mail must not claim delivery.
6. Registration accepts up to 200 password characters with bcrypt; account for bcrypt's input-length behavior. Prefer Argon2id and consistent validation in the new application.
7. Case-insensitive email/username lookup is not matched by a case-insensitive database unique constraint. Normalize values and enforce uniqueness atomically in PostgreSQL.
8. Inline `innerHTML` templates and remote article URLs need safe rendering and URL validation. React text rendering removes most manual interpolation; still validate external URLs.

This is source inspection, not a penetration test or a claim of exploited vulnerabilities.

## 4. React and TypeScript migration

Vite + React + TypeScript + React Router. Organized CSS files retain meaningful design tokens and avoid the previous single giant component. Fetch handles API requests; a typed catalog adapter holds clearly labelled static design fixtures for Phase 2. It must never fabricate successful authentication, contact submissions, invitations, or reservations.

```text
frontend/src/
  app/                 App routes and providers
  components/layout/   Navigation, footer, route scroll handling
  components/common/   Buttons, headings, cards, status/empty states
  components/parallax/ Layered scene and sports graphics
  hooks/               Parallax and reveal lifecycles
  pages/               Home, Halls, Tournaments, Players, About, Contact, Auth, Account
  services/            Catalog boundary, Fetch client
  types/               Domain preview contracts
  styles/              Tokens, global styles, catalog and form styles
  assets/              Local project-owned visuals
```

Use `/`, `/halls`, `/halls/:id`, `/players`, `/players/:id`, `/tournaments`, `/tournaments/:id`, `/news/:id`, `/about`, `/contact`, auth and account routes. No hash-based navigation. Direct navigation and refresh must work through the Vite SPA fallback. Preserve route contracts when server APIs arrive.

## 5. Proposed FastAPI modular monolith

One deployable Python application, one PostgreSQL database, REST communication. Modules own their routes, schemas, business services, repositories and SQLAlchemy models. Avoid empty abstractions where a simple query will do; transactions belong to services, not frontend components.

```text
backend/
  app/
    main.py
    core/       config.py, security.py, database.py, dependencies.py
    modules/
      auth/     sessions, registration, login/logout, reset/verification
      users/    private account, avatar validation, privacy, password changes
      halls/    catalog, facilities, gallery, tables, hours, admin writes
      bookings/ availability, transactional reservations, cancellation
      players/  public privacy-filtered discovery
      partners/ directed requests and authorized state transitions
      tournaments/ announcements, status, organizer, participation details
      news/     database-authored articles
      contacts/ validated persistent submissions and abuse controls
    shared/     errors, pagination, timestamp mixins
  alembic/versions/
  tests/
```

API namespace: `/api/v1`. Separate public response schemas from private user/account schemas. Server-side role/ownership dependencies guard every write. Prefer opaque, revocable sessions in HttpOnly cookies (Secure under HTTPS), CSRF/origin protection, rate-limited auth/reset/contact endpoints, Argon2id password hashes, and environment-only configuration. No browser localStorage access tokens. Password reset is enabled only when mail delivery is configured; never pretend mail was sent.

Errors use `{error: {code, message, fields?}}`, with consistent validation, 401/403/404/409 handling and no raw SQL/secret leakage. Pagination uses a bounded page size and total count; filtering/sorting is server-controlled. OpenAPI documents each endpoint.

## 6. Preliminary PostgreSQL schema

All entities use stable primary keys and `created_at` / `updated_at` timestamptz where relevant. Store timestamps in UTC; convert for venue-local calendars (`Asia/Almaty` initially).

| Entity | Key fields and constraints |
| --- | --- |
| users | UUID PK, normalized unique email/username, password_hash, role, active/verified flags |
| player_profiles | user_id PK/FK, display_name, city, level (Beginner/Intermediate/Advanced/Competitive), bio, avatar_path, public_profile |
| playing_preferences | id PK, profile/user FK, weekday/time-window or documented preference values |
| sessions | hashed opaque token unique, user FK, expiry, revocation |
| password_reset_tokens | hashed token unique, user FK, expiry, consumed_at |
| sports_halls | UUID PK, name, city, address, description, timezone, numeric hourly_price, active, manager_id FK |
| hall_images | hall FK, local/storage path, alt_text, sort_order |
| table_tennis_tables | UUID PK, hall FK, table_number, active; unique(hall_id, table_number) |
| facilities | id PK, unique slug, name |
| hall_facilities | composite PK(hall_id, facility_id), both FKs |
| operating_hours | hall FK, weekday, opens_at, closes_at; opening < closing |
| bookings | UUID PK, table FK, user FK, starts_at/ends_at timestamptz, status, price_snapshot, cancelled_at; start < end |
| partner_requests | UUID PK, sender/recipient FKs, pending/accepted/declined/cancelled, responded_at; no self-request |
| tournaments | UUID PK, title, starts_at/ends_at, city, venue, organizer, description, participation_info, upcoming/ongoing/completed, is_demo |
| news_articles | UUID PK, slug unique, title, cover image/alt, excerpt, content, published_at, author FK, is_demo |
| contact_submissions | UUID PK, name, email, subject, message, received_at, handling status |

Indexes: booking `(user_id, starts_at)`, hall city/price/active, tournament date/status/city, article publication, player city/level/public flag, request sender/recipient/status. A partial unique unordered sender/recipient pair can prevent duplicate pending requests in either direction, with a service transaction governing transitions.

### Overlap protection

Enable PostgreSQL `btree_gist` in Alembic, then add an exclusion constraint:

```sql
EXCLUDE USING gist (
  table_id WITH =,
  tstzrange(starts_at, ends_at, '[)') WITH &&
) WHERE (status IN ('pending', 'confirmed'));
```

The half-open range allows adjacent sessions and rejects any overlapping active intervals, including concurrent inserts from different users. Validate timezone-aware future intervals against operating hours in the service; commit transaction; map exclusion violations (`23P01`) to HTTP 409. Capture venue price on the server. Cancel only the authenticated owner's future reservation under the published policy. Test two concurrent overlapping inserts with different start times against real PostgreSQL, not SQLite or mocked repositories.

## 7. Phased delivery and acceptance

1. **Analysis (this step):** source inventory, reuse/security assessment, architecture, schema, and this plan.
2. **Frontend foundation (current implementation):** polished responsive home, preserved/reworked parallax, real route navigation, hall/player/tournament preview pages, coherent About and clear integration-status layouts. Static preview records are labelled. Backend-dependent forms/actions remain explicitly unavailable.
3. **Backend foundation:** environment configuration, PostgreSQL, SQLAlchemy modules, Alembic, development seeding, session auth, account ownership, safe uploads, configured reset mail.
4. **Core integration:** replace catalog fixtures with `/api/v1` repositories; overlap-safe booking; account reservations; public profiles; partner state machine; news/tournaments; stored contacts; admin management.
5. **Quality:** PostgreSQL race tests, authentication/authorization and request transition tests, Docker Compose startup/health checks, API validation, responsive and reduced-motion checks, OpenAPI/README updates.

Do not describe Phase 2 preview interactions as completed production workflows. No online payments, marketplace, real-time chat, AI assistant, live streaming, external federation/news integrations, or complex ranking are included.

## Implementation references

- [React Router declarative routing](https://reactrouter.com/start/declarative/routing): route composition and nested layouts.
- [MDN reduced-motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): motion preference handling.
- [MDN IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver): visibility-aware work.
- [FastAPI bigger applications](https://fastapi.tiangolo.com/tutorial/bigger-applications/): module routers and dependencies.
- [PostgreSQL range types and exclusion constraints](https://www.postgresql.org/docs/current/rangetypes.html): proposed database overlap protection.
