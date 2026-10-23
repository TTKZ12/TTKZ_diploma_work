# First pre-defense submission audit (historical snapshot)

> Historical audit of commit `1fc76fd`, before restoration commit `b199280`. Its repository inventory, branch/PR states, tag findings, and release decision describe that earlier snapshot. They are not current status claims. Local history now includes the restored frontend and the `prob-period-1` tag at `81dbc95`; this documentation update does not move that tag or certify academic submission readiness. Use the [root README](../README.md) for the current project scope. The original audit is preserved below.

Audit date: 23 October 2026 (Asia/Almaty).

## Scope and evidence

Audited public Git history, all three remote branches, current tracked files, PR details, changed files, review records, inline comments, and remote tags. Main snapshot: `1fc76fd55f99ab26bab7334fde56223f9bdfa20e`. This is a repository audit, not evidence of supervisor approval or stakeholder research. Branch protection requirements were not verified with authenticated access.

## Material inventory on audited main

| Required material | Finding |
| --- | --- |
| Current project code | Only an 18-line HTML mount; missing React source and build configuration; no backend |
| README | Missing |
| Proposal | Missing |
| Literature review | Missing |
| Existing systems comparison | Missing |
| Technology comparison | Missing |
| Requirements specification | Missing |
| Three architecture diagrams and editable sources | Missing |
| UX prototype materials | No complete runnable prototype or prototype documentation |
| Verification plan | Missing |
| Project management documentation | Missing; PR #2 retains a YouTrack-link placeholder |

This preparation branch adds a factual README and this audit only. It does not satisfy the missing academic deliverables.

## Branches and PRs

- `main`: `1fc76fd55f99ab26bab7334fde56223f9bdfa20e`.
- `initial_db_structure`: same SHA as main; no separate backend implementation.
- `frontend-layout`: `63602cdd4d60da76865f6d2adb22995453829e12`; contains only `index.html`.
- PR #1: https://github.com/TTKZ12/TTKZ_diploma_work/pull/1 — merged into main, 23 October 2026, 10:06 UTC. Adds only `index.html` (18 lines). Its description's UI/component/responsiveness scope is not demonstrated by its diff. No recorded GitHub reviews or inline review comments were returned. This does not rule out review outside GitHub.
- PR #2: https://github.com/TTKZ12/TTKZ_diploma_work/pull/2 — open; head `initial_db_structure`, base `frontend-layout`. Zero changed files. Its title repeats the frontend merge title, while its body describes a FastAPI/SQLAlchemy/Alembic backend absent from the diff. No recorded GitHub reviews or inline review comments were returned. Do not merge as evidence of backend delivery. Publish actual backend changes, use the correct target branch, correct its title/body, and obtain the other student's review.

## Recoverable history

Commit `a49320fb90de38c7b63e334d22b6f82db7e3d88f` contains a React/TypeScript frontend, FastAPI backend, SQLAlchemy models, Alembic migration, Docker Compose, CI, tests, README, `docs/BACKLOG.md`, and `docs/VERIFICATION.md`. Subsequent commits explicitly deleted these materials. Restore selected files through a team-reviewed PR only after confirming that this is the intended baseline. Preserve commit history and both students' authorship.

The historical README describes a local demo with fictional fixtures and a shared demo player, not individual authentication or real reservations. Its statement that no GitHub repository exists is outdated. It does not supply the missing proposal, literature review, comparisons, requirements, or three architectural diagrams. Historical test reports must retain their original context; they are not current audit results.

## Verification performed

- Inspected current tracked tree and the historical prototype tree.
- Checked the HTML's source and favicon references against current tracked paths; both targets are absent.
- Compared remote branch SHAs and PR file counts.
- Queried review records and remote tags: no reviews recorded on PRs #1/#2; no tags returned.
- No application build, API startup, database connection, or functional tests were run: current main lacks the necessary source and configuration. No successful runtime result is claimed.

## Required work before tagging

1. Agree on the intended prototype baseline and restore or complete frontend/backend code through a dedicated PR. Review the prior deletion history before restoring files.
2. Add the actual proposal, literature review with traceable references, existing-system and technology comparisons, and requirements with identifiers and acceptance criteria.
3. Add the three university-required architecture diagrams, exports, and editable sources; connect them to the actual code and clearly label planned elements.
4. Add UX prototype materials and a verification plan mapped to requirements. Record actual build/API/database/manual test outcomes with commands, environment, commit SHA, and failures or skips.
5. Add project management evidence: actual task links, responsibility allocation, milestone/backlog status, and real review evidence. Do not manufacture activity or interviews.
6. Correct PR #2's target, title, description, and empty implementation; obtain the required team review. Review this documentation branch too.
7. Merge approved changes into main and audit the resulting exact commit again. Confirm all submission files are tracked, links resolve, and descriptions distinguish completed work from plans.
8. Recheck remote tags. If `prob-period-1` exists, inspect it and do not move it without explicit approval. Otherwise create and push an annotated tag at the verified main commit, then verify the remote tag and dereferenced commit SHA.

## Release decision

BLOCKED. No `prob-period-1` tag was created or pushed. There is no published tag URL or tagged commit SHA to report, and submission consistency cannot yet be confirmed.

Prepared documentation changes are uncommitted and unpublished until an authenticated GitHub workflow is available. No original code was overwritten or restored by this preparation branch.
