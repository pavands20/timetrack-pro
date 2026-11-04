# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| POST | /api/auth/login | login | `backend/app/routers/auth.py:43` | — |
| POST | /api/auth/logout | logout | `backend/app/routers/auth.py:69` | — |
| GET | /api/auth/me | me | `backend/app/routers/auth.py:76` | — |
| GET | /api/settings | read_settings | `backend/app/routers/settings.py:54` | — |
| PUT | /api/settings | update_settings | `backend/app/routers/settings.py:61` | — |
| GET | /health | health | `backend/app/main.py:62` | Liveness probe, and the only route here that is not a stub. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- DELETE /api/time-entries/{id}
- GET /api/approvals/timesheets
- GET /api/clients
- GET /api/clock
- GET /api/leave/balances
- GET /api/leave/requests
- GET /api/notifications
- GET /api/reports/billable
- GET /api/reports/compliance
- GET /api/reports/hours
- GET /api/reports/leave-taken
- GET /api/reports/overtime
- GET /api/reports/payroll-export
- GET /api/timesheets/week
- GET /api/timesheets/{id}/audit
- GET /api/users
- PATCH /api/clients/{id}
- PATCH /api/projects/{id}
- PATCH /api/tasks/{id}
- PATCH /api/time-entries/{id}
- PATCH /api/users/{id}
- POST /api/auth/set-password
- POST /api/clients
- POST /api/clock/break/end
- POST /api/clock/break/start
- POST /api/clock/in
- POST /api/clock/out
- POST /api/leave/requests
- POST /api/leave/requests/{id}/decide
- POST /api/notifications/{id}/read
- POST /api/projects
- POST /api/tasks
- POST /api/timesheets/{id}/approve
- POST /api/timesheets/{id}/entries
- POST /api/timesheets/{id}/reject
- POST /api/timesheets/{id}/submit
- POST /api/timesheets/{id}/unlock
- POST /api/users
- POST /api/users/{id}/password-reset
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `a08a3ea`
<!-- sdlc:auto:end source -->
