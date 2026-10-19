# YouTrack-ready development backlog

Use these as issue titles and acceptance criteria in the team's chosen YouTrack project. No issues have been created in an external account.

| Priority | Task | Acceptance criteria |
| --- | --- | --- |
| P0 | Run and validate the Docker/PostgreSQL stack | All services healthy; migrations and seeding succeed; frontend uses API mode; concurrency integration test passes. |
| P0 | Add authentication and account ownership | Register/sign in; profiles and bookings belong to an authenticated account; permissions enforced in FastAPI. |
| P1 | Add hall-manager role | Managers edit only their halls, tables, hours, prices, and reservations. |
| P1 | Add administrator role | Admin manages verified halls, users, and tournament announcements. |
| P1 | Add API-backed booking availability refresh | Sessions refresh while viewing a hall; a conflicting request returns a useful message. |
| P1 | Add verified Kazakhstan venue data | Real names, addresses, facilities, prices, and venue permission recorded. |
| P2 | Add Kazakh and Russian translations | Users can switch among kk, ru, en; dates/prices format appropriately. |
| P2 | Add partner invitation inbox | Sender/recipient can see status and accept or decline invitations. |
| P2 | Add tournament management | Authorized users create/edit announcements and publish official details. |
| P2 | Prepare diploma architecture and evaluation | ER diagram, use cases, API specification, booking-race demonstration, and usability results documented. |
