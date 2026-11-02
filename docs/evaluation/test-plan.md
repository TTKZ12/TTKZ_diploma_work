# TT KZ verification and evaluation plan

Status: Planned. The evaluations described below have not yet
been executed. All thresholds are proposed acceptance targets,
not achieved results.

Previous frontend build and verification records are retained
in [VERIFICATION.md](../VERIFICATION.md). They do not establish
that the backend or the evaluations below have passed.

## 1. Scope and responsibilities

The initial pilot is limited to Astana.

The evaluation covers venue discovery, table booking,
player profiles, partner discovery and tournament information.

- Zhanybek Alikhan: backend, database, authorization,
  booking integrity and API performance checks.
- Tazhimova Araizhan: frontend flows, interface states
  and usability sessions.
- Both students: integration checks, evidence review
  and interpretation of results.

Backend-dependent tests require a runnable FastAPI application
and a real PostgreSQL test database. Interface mockups alone
cannot demonstrate persistence or conflict prevention.

## 2. Functional correctness

Requirements: FR-01 to FR-11.

Method:
- Map each requirement to positive and negative test cases.
- Check registration and login, venue search and details,
  booking, profiles, partner filters, tournament information,
  venue maintenance and tournament publishing.
- Check empty, loading, success and recoverable error states.
- Check cancellation against the agreed cancellation policy.

Acceptance:
- Every Must requirement passes its acceptance criteria.
- Record Should requirements separately.
- Preserve failures and link them to defect records.
- Do not mark unimplemented functionality as passed.

## 3. Booking integrity

Requirements: FR-03, FR-04, FR-09 and NFR-02.

Environment:
- Isolated PostgreSQL test database.
- Known users, venue, table and available intervals.
- Reset relevant booking data between rounds.

Method:
- Send 20 concurrent booking requests for the same table
  and interval.
- Repeat for 100 rounds.
- Also test partially overlapping intervals,
  adjacent non-overlapping intervals, different tables
  and cancellation followed by rebooking.
- Inspect persisted records as well as API responses.

Acceptance:
- Exactly one booking is confirmed in each contested round.
- Zero overlapping active bookings remain in the database.
- Rejected overlapping requests receive HTTP 409.
- Adjacent valid intervals and bookings for different tables
  remain possible.

Baseline:
Compare with a deliberately unprotected check-then-insert
implementation in an isolated test environment only.

## 4. Authentication, authorization and privacy

Requirements: FR-01, FR-05, FR-06, FR-08, FR-09, FR-11,
NFR-01 and NFR-06.

Method:
- Test unauthenticated users, record owners, other players,
  assigned venue managers and tournament publishers.
- Attempt to access or modify records outside each role's
  permissions.
- Check that opted-out profiles are excluded from discovery.
- Check that public responses omit private contact fields.

Acceptance:
- All Must access-control checks pass.
- Zero unauthorized reads or modifications.
- Invalid requests are rejected without changing protected data.
- Private profile information is not exposed publicly.

## 5. Usability and booking effort

Requirement: NFR-03.

Participants:
Five adult potential users for an exploratory pilot.
Participation and consent must be recorded before testing.

Method:
- Ask users to find a suitable venue and complete a booking
  without assistance.
- Use the same desktop setup and equivalent venue data.
- Compare TT KZ with a prepared phone/message booking workflow.
- Counterbalance task order.
- Record completion, elapsed time, user actions, errors
  and participant feedback.
- Separate simulated task time from real venue response delays.
- Repeat relevant tasks after interface revisions.

Proposed acceptance:
- At least 4 of 5 participants complete the task without help.
- Median booking task time is at least 20% lower than baseline.

Report failures, learning effects and the small sample size.
Do not generalize the findings to nationwide demand.

## 6. Access to relevant information

Requirements: FR-02, FR-07 and NFR-07.

Method:
- Ask participants to find venue prices and conditions,
  and tournament dates, locations and participation conditions.
- Compare equivalent prepared multi-channel information
  with the TT KZ interface.
- Record answer correctness, task time and user actions.

Proposed acceptance:
- At least 4 of 5 participants complete the tasks correctly.
- Median lookup time is at least 20% lower than baseline.

## 7. API performance

Requirement: NFR-04.

Environment:
- Seed 100 venues and 10,000 bookings.
- Record hardware, operating system, software versions,
  database configuration and request mix.

Method:
- Run 20 concurrent users.
- Use a 1-minute warm-up followed by a 5-minute measurement.
- Record p50 and p95 latency and unexpected error rate.
- Compare initial and revised implementations under
  the same conditions.

Proposed acceptance:
- Read-endpoint p95 latency is no more than 1,000 ms.
- Unexpected error rate is below 1%.
- Expected HTTP 409 booking conflicts are reported separately.

## 8. Data linkage and information freshness

Requirements: FR-08, FR-11 and NFR-07.

Method:
- Update venue availability as an authorized manager.
- Update tournament information as an authorized publisher.
- Check the affected public views and related record IDs.
- Attempt the same changes as an unauthorized user.

Acceptance:
- All Must traceability checks pass.
- Public details show the source or responsible owner
  and last-update date.
- Stale or unconfirmed schedules are labeled.
- Unauthorized edits are denied.

## 9. Reproducibility

Requirement: NFR-05.

Method:
- Start from a clean checkout.
- Follow the documented setup commands and example configuration.
- Initialize an empty database through migrations.
- Run mandatory acceptance checks.

Acceptance:
- Documented startup succeeds.
- Migrations initialize the database successfully.
- All mandatory acceptance checks pass.

## 10. Evidence and reporting

For every executed check, record:
- Actual execution date and tester.
- Commit SHA and linked YouTrack issue.
- Environment and dataset.
- Commands or steps.
- Expected and actual outcome.
- Passed, Failed, Blocked or Not run status.
- Supporting logs or screenshots where useful.
- Defects and rerun results.

Keep results in this directory after execution:
- results.md: actual outcomes and limitations.
- logs/: relevant test output.
- screenshots/: relevant interface evidence.

Do not create passing results before running the checks.
Do not treat booked capacity as actual attendance.