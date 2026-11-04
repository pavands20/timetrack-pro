# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Sign in with email and password | US-001 | 1 | GET /api/auth/me, POST /api/auth/login, POST /api/auth/logout, api, db, user_roles, users, web_ui | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-002 | EPIC-001 | Admin creates user accounts and assigns a manager | US-002 | 2 | GET /api/users, PATCH /api/users/{id}, POST /api/auth/set-password, POST /api/users, api, auth_tokens, db, email, user_roles, users, web_ui | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-003 | EPIC-001 | Admin-initiated password reset | US-003 | 2 | POST /api/auth/set-password, POST /api/users/{id}/password-reset, api, auth_tokens, email, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-001 | Role-based access to data | US-004 | 2 | GET /api/auth/me, api, user_roles, users | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-005 | EPIC-002 | Maintain clients, projects and tasks | US-005 | 2 | GET /api/clients, PATCH /api/clients/{id}, PATCH /api/projects/{id}, PATCH /api/tasks/{id}, POST /api/clients, POST /api/projects, POST /api/tasks, api, clients, db, projects, tasks, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | Hourly bill rate per project and currency | US-006 | 2 | PATCH /api/projects/{id}, PUT /api/settings, api, company_settings, projects, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-007 | EPIC-003 | Clock in and out with breaks | US-007 | 4 | GET /api/clock, POST /api/clock/break/end, POST /api/clock/break/start, POST /api/clock/in, POST /api/clock/out, api, entry_breaks, time_entries, timesheets, web_ui | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-008 | EPIC-003 | Weekly timesheet entry by day | US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4 | 3 | DELETE /api/time-entries/{id}, GET /api/timesheets/week, PATCH /api/time-entries/{id}, POST /api/timesheets/{id}/entries, api, db, entry_breaks, time_entries, timesheets, web_ui | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-009 | EPIC-003 | Charge each entry to a project and task and mark billable | US-009 | 3 | PATCH /api/time-entries/{id}, POST /api/timesheets/{id}/entries, api, projects, tasks, time_entries, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-010 | EPIC-003 | Employee dashboard of own hours this week | US-010 | 6 | GET /api/clock, GET /api/notifications, GET /api/timesheets/week, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-011 | EPIC-004 | Submit a weekly timesheet | US-011 | 4 | POST /api/timesheets/{id}/submit, api, audit_log, notifications, timesheets, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-012 | EPIC-004 | Manager approves or rejects with a comment | US-012 | 4 | GET /api/approvals/timesheets, POST /api/timesheets/{id}/approve, POST /api/timesheets/{id}/reject, api, audit_log, timesheets, users, web_ui | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-013 | EPIC-004 | Edit and resubmit a rejected timesheet | US-013 | 4 | GET /api/timesheets/week, POST /api/timesheets/{id}/submit, api, timesheets, web_ui | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-004 | Approved timesheets are locked; Payroll Admin can unlock | US-014 | 4 | POST /api/timesheets/{id}/unlock, api, audit_log, timesheets, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-015 | EPIC-005 | Request leave | US-015 | 5 | GET /api/leave/requests, POST /api/leave/requests, api, db, leave_requests, leave_types, web_ui | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-016 | EPIC-005 | Manager decides leave requests | US-016 | 5 | GET /api/leave/requests, POST /api/leave/requests/{id}/decide, api, leave_ledger, leave_requests, notifications, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-017 | EPIC-005 | Leave balance with monthly accrual | US-017 | 5 | GET /api/leave/balances, PUT /api/settings, api, leave_ledger, leave_requests, leave_types, scheduler, web_ui | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-018 | EPIC-005 | Approved leave shown on the timesheet | US-018 | 5 | GET /api/timesheets/week, api, leave_requests, timesheets, web_ui | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-019 | EPIC-006 | Configure labour rules | US-019 | 1 | GET /api/settings, PUT /api/settings, api, company_settings, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-020 | EPIC-006 | Flag overtime and missed breaks on the timesheet | US-020 | 5 | GET /api/timesheets/week, api, company_settings, entry_breaks, time_entries, web_ui | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-021 | EPIC-006 | Compliance report | US-021 | 7 | api, company_settings, entry_breaks, time_entries, web_ui | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-022 | EPIC-007 | Hours report by employee, project and week | US-022 | 6 | GET /api/reports/hours, api, projects, time_entries, timesheets, users, web_ui | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-023 | EPIC-007 | Billable versus non-billable report | US-023 | 6 | GET /api/reports/billable, api, company_settings, projects, time_entries, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-024 | EPIC-007 | Overtime and leave taken reports | US-024 | 7 | api, company_settings, leave_requests, time_entries, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-025 | EPIC-007 | Payroll export of approved hours | US-025 | 7 | api, time_entries, timesheets, users, web_ui | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-026 | EPIC-008 | Receive in-app alerts | US-026 | 6 | api, leave_requests, notifications, scheduler, timesheets | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-027 | EPIC-008 | View and clear notifications | US-027 | 3 | GET /api/notifications, POST /api/notifications/{id}/read, api, db, notifications, web_ui | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-028 | EPIC-009 | Record changes and approvals of timesheets | US-028 | 3 | api, audit_log, db, time_entries, timesheets | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-029 | EPIC-009 | View audit history and retention | US-029 | 6 | GET /api/timesheets/{id}/audit, api, audit_log, web_ui | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-030 | EPIC-010 | Protect personal data | US-030 | 1 | db, edge, leave_requests | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-031 | EPIC-010 | Company time zone, date format, currency and language | US-031 | 1 | GET /api/settings, PUT /api/settings, api, company_settings, db, web_ui | — | — | not started | not run | 0/5 tested · 0/5 passing | — |
| US-032 | EPIC-010 | Use the web app on a mobile browser | US-032 | 7 | web_ui | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-033 | EPIC-010 | Single-tenant deployment for up to 50 employees | US-033 | 1 | api, db, edge, email, scheduler | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
<!-- sdlc:auto:end matrix -->
