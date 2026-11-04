# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Deployable, HTTPS-only single-tenant platform in an EU/UK region with email/password sign-in and company settings (time zone, date format, labour rules)

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Sign in with email and password | 5 | backend-agent | US-033 |
| US-019 | Story | Configure labour rules | 2 | backend-agent | US-031 |
| US-030 | Story | Protect personal data | 3 | devops-agent | US-033 |
| US-031 | Story | Company time zone, date format, currency and language | 3 | frontend-agent | US-033 |
| US-033 | Story | Single-tenant deployment for up to 50 employees | 5 | devops-agent | — |

## Sprint 2: Sprint 2

Admins can create users, assign managers and send invite/reset links; role-based data scoping is enforced; clients, projects, tasks and bill rates are maintained

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-002 | Story | Admin creates user accounts and assigns a manager | 5 | backend-agent | US-001 |
| US-003 | Story | Admin-initiated password reset | 2 | backend-agent | US-002 |
| US-004 | Story | Role-based access to data | 5 | security-agent | US-002 |
| US-005 | Story | Maintain clients, projects and tasks | 5 | backend-agent | US-004 |
| US-006 | Story | Hourly bill rate per project and currency | 2 | backend-agent | US-005, US-031 |

## Sprint 3: Sprint 3

Employees fill a Monday-to-Sunday weekly timesheet charged to project and task, every entry change is audited, and the notification store is in place

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-008 | Story | Weekly timesheet entry by day | 8 | backend-agent | US-005, US-031, US-004 |
| ↳ US-008-T1 | Task | Add timesheet, time entry and break tables | — | backend-agent | — |
| ↳ US-008-T2 | Task | Implement week and entry endpoints | — | backend-agent | — |
| ↳ US-008-T3 | Task | Build weekly timesheet grid | — | frontend-agent | — |
| ↳ US-008-T4 | Task | Add API test suite for timesheet editing and locking | — | qa-agent | — |
| US-009 | Story | Charge each entry to a project and task and mark billable | 3 | frontend-agent | US-008 |
| US-027 | Story | View and clear notifications | 3 | frontend-agent | US-001 |
| US-028 | Story | Record changes and approvals of timesheets | 5 | backend-agent | US-008 |

## Sprint 4: Sprint 4

Clock in/out with breaks and the full timesheet approval lifecycle: submit, approve/reject with comment, resubmit, lock and Payroll Admin unlock

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-007 | Story | Clock in and out with breaks | 5 | backend-agent | US-008, US-009 |
| US-011 | Story | Submit a weekly timesheet | 3 | backend-agent | US-007, US-027, US-028 |
| US-012 | Story | Manager approves or rejects with a comment | 5 | backend-agent | US-011, US-004 |
| US-013 | Story | Edit and resubmit a rejected timesheet | 2 | frontend-agent | US-012 |
| US-014 | Story | Approved timesheets are locked; Payroll Admin can unlock | 3 | backend-agent | US-012, US-028 |

## Sprint 5: Sprint 5

Leave requests, manager decisions, monthly accrual and balances, leave shown on the timesheet, and overtime and missed-break flags

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-015 | Story | Request leave | 3 | backend-agent | US-004 |
| US-016 | Story | Manager decides leave requests | 3 | backend-agent | US-015, US-027 |
| US-017 | Story | Leave balance with monthly accrual | 5 | backend-agent | US-015 |
| US-018 | Story | Approved leave shown on the timesheet | 2 | frontend-agent | US-016, US-008 |
| US-020 | Story | Flag overtime and missed breaks on the timesheet | 5 | backend-agent | US-019, US-008 |

## Sprint 6: Sprint 6

In-app alerts, employee dashboard, hours and billable reports with CSV export, and audit history viewing

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-010 | Story | Employee dashboard of own hours this week | 3 | frontend-agent | US-007, US-027 |
| US-022 | Story | Hours report by employee, project and week | 5 | backend-agent | US-008, US-004 |
| US-023 | Story | Billable versus non-billable report | 3 | backend-agent | US-022, US-006, US-009 |
| US-026 | Story | Receive in-app alerts | 5 | backend-agent | US-012, US-016, US-027 |
| US-029 | Story | View audit history and retention | 3 | frontend-agent | US-028, US-004 |

## Sprint 7: Sprint 7

Compliance, overtime, leave-taken and payroll CSV exports, plus mobile-browser usability across the key employee screens

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-021 | Story | Compliance report | 5 | backend-agent | US-020, US-004 |
| US-024 | Story | Overtime and leave taken reports | 5 | backend-agent | US-020, US-016, US-022 |
| US-025 | Story | Payroll export of approved hours | 3 | backend-agent | US-012, US-022 |
| US-032 | Story | Use the web app on a mobile browser | 3 | frontend-agent | US-007, US-008, US-015 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
