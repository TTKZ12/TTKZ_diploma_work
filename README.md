# TTKZ conceptual prototype

A responsive, buildless web prototype for the diploma project **Design and Development of the TTKZ Web Platform for Digital Integration of the Table Tennis Community in Kazakhstan**.

## Run locally

From `ttkz-prototype/dist`:

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. No package installation or compilation is needed.

## Included

- Hall catalog with city, facility, and favorite filters
- Hall details, dates, table selection, and one-hour sessions
- Demo booking confirmation, persisted reservations, and cancellation
- Past-time blocking and same-table/time conflict checks within one browser
- Editable player profile with city, skill, biography, and playing preferences
- Partner discovery and simulated invitations
- Tournament announcements and detail dialogs
- Responsive mobile and desktop layouts

## Prototype boundaries

All halls, locations, prices, ratings, players, and tournaments are fictional sample data. Venue imagery is a custom SVG illustration. Reservations, favorites, profiles, and invitations use browser localStorage; no real reservations, payments, or messages are sent. Google Fonts are optional; system fonts provide offline fallbacks.

This is a frontend concept. Production requires authentication, a shared database, server-side authorization, atomic booking constraints, real venue schedules and pricing, notification delivery, and hall-manager/admin interfaces. Local conflict checks do not guarantee protection across devices or simultaneous browser tabs.

## Source

- `dist/index.html`: app shell
- `dist/style.css`: responsive design
- `dist/app.js`: sample data, routing, interactions, and persistence

## Verification

JavaScript syntax validation and browser checks for booking confirmation, an existing booked slot being unavailable, and cancellation were completed during development. The demonstration is intended for design discussion and diploma planning.
