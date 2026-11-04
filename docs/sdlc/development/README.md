# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-V1 · approved · source: plan:version-1

The delivery plan for TimeTrack Pro is approved at version 1. It has 7 sprints, each with capacity 20. The backlog holds 10 epics, 33 stories and 4 tasks under US-008.

- Plan status: approved, version 1.
- Sprints: Sprint 1 to Sprint 7, capacity 20 each (140 total).
- Backlog story points total 127 across US-001 to US-033.
- Epics carry no points or assigned role.
- Agent roles used: backend-agent, frontend-agent, security-agent, devops-agent, qa-agent.
- Sprint-by-sprint goals are documented in entries DEV-SPRINT-1 to DEV-SPRINT-7.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008, EPIC-009, EPIC-010

- ⚠ The plan has no approval date and no named approver.
- ⚠ The input does not explicitly assign stories to sprints. Sprint scope can only be inferred from goal text.
- ⚠ No sprint start or end dates are given.

### DEV-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 targets a deployable foundation. It covers an HTTPS-only single-tenant platform in an EU/UK region, email/password sign-in, and company settings. Capacity is 20.

- Goal: deployable, HTTPS-only single-tenant platform in an EU/UK region with email/password sign-in and company settings (time zone, date format, labour rules).
- Capacity: 20.
- Related stories inferred from the goal text:
  - US-001 (5 pts)
  - US-019 (2 pts)
  - US-030 (3 pts)
  - US-031 (3 pts)
  - US-033 (5 pts)
  - Total: 18 pts.
- These five stories match the ticket set in the development run exactly.
- Run outcome:
  - US-001, US-019 and US-031 were delivered.
  - US-030 and US-033 were skipped.

**Related:** US-001, US-019, US-030, US-031, US-033

- ⚠ The 'deployable, HTTPS-only, EU/UK region' part of the goal depends on US-033 and US-030, which were both skipped. The sprint goal is therefore not met as stated.
- ⚠ The story-to-sprint mapping is inferred, not stated in the input.

### DEV-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 targets user administration, role-based data scoping, and maintenance of clients, projects, tasks and bill rates. Capacity is 20.

- Goal: admins can create users, assign managers and send invite/reset links. Role-based data scoping is enforced. Clients, projects, tasks and bill rates are maintained.
- Capacity: 20.
- Related stories inferred from the goal text:
  - US-002 (5 pts)
  - US-003 (2 pts)
  - US-004 (5 pts, security-agent)
  - US-005 (5 pts)
  - US-006 (2 pts)
  - Total: 19 pts.

**Related:** US-002, US-003, US-004, US-005, US-006

- ⚠ No development ticket or commit is recorded for any Sprint 2 story.
- ⚠ The story-to-sprint mapping is inferred, not stated in the input.

### DEV-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 targets the Monday-to-Sunday weekly timesheet charged to project and task. It also covers audit of every entry change and the notification store. Capacity is 20.

- Goal: employees fill a Monday-to-Sunday weekly timesheet charged to project and task. Every entry change is audited. The notification store is in place.
- Capacity: 20.
- Related stories inferred from the goal text:
  - US-008 (8 pts)
  - US-009 (3 pts)
  - US-028 (5 pts)
  - Possibly the store portion of US-026.
- US-008 is broken into four tasks:
  - T1: add timesheet, time entry and break tables (backend-agent).
  - T2: implement week and entry endpoints (backend-agent).
  - T3: build weekly timesheet grid (frontend-agent).
  - T4: add API test suite for timesheet editing and locking (qa-agent).

**Related:** US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4, US-009, US-028, US-026

- ⚠ No development ticket or commit is recorded for any Sprint 3 story or task.
- ⚠ It is unclear whether US-026 is split across Sprint 3 (store) and Sprint 6 (alerts).
- ⚠ US-008 tasks have no points.
- ⚠ The story-to-sprint mapping is inferred, not stated in the input.

### DEV-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 targets clock in/out with breaks and the full timesheet approval lifecycle. Capacity is 20.

- Goal: clock in/out with breaks and the full timesheet approval lifecycle: submit, approve/reject with comment, resubmit, lock, and Payroll Admin unlock.
- Capacity: 20.
- Related stories inferred from the goal text:
  - US-007 (5 pts)
  - US-011 (3 pts)
  - US-012 (5 pts)
  - US-013 (2 pts)
  - US-014 (3 pts)
  - Total: 18 pts.

**Related:** US-007, US-011, US-012, US-013, US-014

- ⚠ No development ticket or commit is recorded for any Sprint 4 story.
- ⚠ The story-to-sprint mapping is inferred, not stated in the input.

### DEV-SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 targets leave requests and decisions, monthly accrual and balances, leave shown on the timesheet, and overtime and missed-break flags. Capacity is 20.

- Goal: leave requests, manager decisions, monthly accrual and balances, leave shown on the timesheet, and overtime and missed-break flags.
- Capacity: 20.
- Related stories inferred from the goal text:
  - US-015 (3 pts)
  - US-016 (3 pts)
  - US-017 (5 pts)
  - US-018 (2 pts)
  - US-020 (5 pts)
  - Total: 18 pts.

**Related:** US-015, US-016, US-017, US-018, US-020

- ⚠ No development ticket or commit is recorded for any Sprint 5 story.
- ⚠ The story-to-sprint mapping is inferred, not stated in the input.

### DEV-SPRINT-6 · approved · source: plan:Sprint 6

Sprint 6 targets in-app alerts, the employee dashboard, hours and billable reports with CSV export, and audit history viewing. Capacity is 20.

- Goal: in-app alerts, employee dashboard, hours and billable reports with CSV export, and audit history viewing.
- Capacity: 20.
- Related stories inferred from the goal text:
  - US-026 (5 pts)
  - US-027 (3 pts)
  - US-010 (3 pts)
  - US-022 (5 pts)
  - US-023 (3 pts)
  - US-029 (3 pts)
  - Total: 22 pts, which exceeds capacity 20 if all are assigned here.

**Related:** US-026, US-027, US-010, US-022, US-023, US-029

- ⚠ The inferred scope (22 pts) exceeds sprint capacity (20). The actual assignment needs confirmation.
- ⚠ No development ticket or commit is recorded for any Sprint 6 story.

### DEV-SPRINT-7 · approved · source: plan:Sprint 7

Sprint 7 targets compliance, overtime, leave-taken and payroll CSV exports, plus mobile-browser usability on key employee screens. Capacity is 20.

- Goal: compliance, overtime, leave-taken and payroll CSV exports, plus mobile-browser usability across the key employee screens.
- Capacity: 20.
- Related stories inferred from the goal text:
  - US-021 (5 pts)
  - US-024 (5 pts)
  - US-025 (3 pts)
  - US-032 (3 pts)
  - Total: 16 pts.

**Related:** US-021, US-024, US-025, US-032

- ⚠ No development ticket or commit is recorded for any Sprint 7 story.
- ⚠ The story-to-sprint mapping is inferred, not stated in the input.

### DEV-BACKLOG · approved · source: plan:version-1

The backlog is grouped into 10 epics. This entry lists each epic with its stories, points and assigned agent role, as given in the plan.

- EPIC-001 Users, roles and sign-in:
  - US-001 Sign in with email and password (5, backend-agent)
  - US-002 Admin creates user accounts and assigns a manager (5, backend-agent)
  - US-003 Admin-initiated password reset (2, backend-agent)
  - US-004 Role-based access to data (5, security-agent)
- EPIC-002 Clients, projects and tasks:
  - US-005 Maintain clients, projects and tasks (5, backend-agent)
  - US-006 Hourly bill rate per project and currency (2, backend-agent)
- EPIC-003 Time tracking:
  - US-007 Clock in and out with breaks (5, backend-agent)
  - US-008 Weekly timesheet entry by day (8, backend-agent), with tasks T1 to T4
  - US-009 Charge each entry to a project and task and mark billable (3, frontend-agent)
  - US-010 Employee dashboard of own hours this week (3, frontend-agent)
- EPIC-004 Timesheet approval:
  - US-011 Submit a weekly timesheet (3, backend-agent)
  - US-012 Manager approves or rejects with a comment (5, backend-agent)
  - US-013 Edit and resubmit a rejected timesheet (2, frontend-agent)
  - US-014 Approved timesheets are locked; Payroll Admin can unlock (3, backend-agent)
- EPIC-005 Time off:
  - US-015 Request leave (3, backend-agent)
  - US-016 Manager decides leave requests (3, backend-agent)
  - US-017 Leave balance with monthly accrual (5, backend-agent)
  - US-018 Approved leave shown on the timesheet (2, frontend-agent)
- EPIC-006 Labour rules and compliance flags:
  - US-019 Configure labour rules (2, backend-agent)
  - US-020 Flag overtime and missed breaks on the timesheet (5, backend-agent)
  - US-021 Compliance report (5, backend-agent)
- EPIC-007 Reports and CSV export:
  - US-022 Hours report by employee, project and week (5, backend-agent)
  - US-023 Billable versus non-billable report (3, backend-agent)
  - US-024 Overtime and leave taken reports (5, backend-agent)
  - US-025 Payroll export of approved hours (3, backend-agent)
- EPIC-008 In-app notifications:
  - US-026 Receive in-app alerts (5, backend-agent)
  - US-027 View and clear notifications (3, frontend-agent)
- EPIC-009 Audit trail:
  - US-028 Record changes and approvals of timesheets (5, backend-agent)
  - US-029 View audit history and retention (3, frontend-agent)
- EPIC-010 Data protection, localisation and platform:
  - US-030 Protect personal data (3, devops-agent)
  - US-031 Company time zone, date format, currency and language (3, frontend-agent)
  - US-032 Use the web app on a mobile browser (3, frontend-agent)
  - US-033 Single-tenant deployment for up to 50 employees (5, devops-agent)

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008, EPIC-009, EPIC-010

- ⚠ US-006 and US-031 mention currency, and US-031 mentions language. The project description does not specify currency or language requirements, so their scope needs confirming against the requirements phase.
- ⚠ US-029 mentions audit retention. No retention period is given in the input.

### DEV-RUN · draft · source: dev:run

The development run is marked completed but covers only 5 of 33 stories. Three were delivered in a single commit and two were skipped.

- Run status: completed.
- Delivered (commit 91d46dd01f1bb680628c0a1dd59ecf7e8b08b726):
  - US-001
  - US-019
  - US-031
- Skipped (no commit):
  - US-030
  - US-033
- No tickets are recorded for the other 28 stories (US-002 to US-018, US-020 to US-029, US-032) or for tasks US-008-T1 to T4.

**Related:** US-001, US-019, US-030, US-031, US-033

- ⚠ DISCREPANCY: the run is 'completed', yet the approved plan spans 7 sprints and 33 stories. It is unclear whether this run represents Sprint 1 only or the whole plan.
- ⚠ There is no run date, no reviewer, and no acceptance or merge record for the delivered commit.
- ⚠ No reason is recorded for skipping US-030 and US-033.

### US-001 · draft · source: dev:US-001

Sign in with email and password. The ticket is delivered in commit 91d46dd.

- Ticket: US-001 Sign in with email and password.
- Status: delivered.
- Commit: 91d46dd01f1bb680628c0a1dd59ecf7e8b08b726 (shared with US-019 and US-031).
- Planned: 5 pts, backend-agent.

**Related:** EPIC-001, DEV-SPRINT-1

- ⚠ No implementation details are provided, such as session handling, password policy or lockout.
- ⚠ No test evidence or acceptance record exists.

### US-019 · draft · source: dev:US-019

Configure labour rules: daily and weekly overtime limits and minimum break after 6 hours. The ticket is delivered in commit 91d46dd.

- Ticket: US-019 Configure labour rules.
- Status: delivered.
- Commit: 91d46dd01f1bb680628c0a1dd59ecf7e8b08b726.
- Planned: 2 pts, backend-agent.
- Per the project description, the rules are daily and weekly overtime limits (example 8 h/day, 40 h/week) and a minimum break after 6 hours.

**Related:** EPIC-006, DEV-SPRINT-1, US-020, US-021

- ⚠ It is not stated which settings were actually implemented, or what the default values are.
- ⚠ The flagging of overtime and missed breaks (US-020) and the compliance report (US-021) that consume these rules have no recorded development.

### US-030 · draft · source: dev:US-030

Protect personal data. The ticket was skipped and has no commit.

- Ticket: US-030 Protect personal data.
- Status: skipped.
- Commit: none.
- Planned: 3 pts, devops-agent.

**Related:** EPIC-010, DEV-SPRINT-1

- ⚠ No reason is recorded for the skip.
- ⚠ The Sprint 1 'HTTPS-only' goal is unmet if this story carries it.
- ⚠ It is unknown whether this story was rescheduled or descoped.

### US-031 · draft · source: dev:US-031

Company time zone, date format, currency and language settings. The ticket is delivered in commit 91d46dd.

- Ticket: US-031 Company time zone, date format, currency and language.
- Status: delivered.
- Commit: 91d46dd01f1bb680628c0a1dd59ecf7e8b08b726.
- Planned: 3 pts, frontend-agent.

**Related:** EPIC-010, DEV-SPRINT-1, US-006

- ⚠ The supported languages, currencies and date formats are not stated.
- ⚠ No test evidence exists.

### US-033 · draft · source: dev:US-033

Single-tenant deployment for up to 50 employees. The ticket was skipped and has no commit.

- Ticket: US-033 Single-tenant deployment for up to 50 employees.
- Status: skipped.
- Commit: none.
- Planned: 5 pts, devops-agent.

**Related:** EPIC-010, DEV-SPRINT-1

- ⚠ DISCREPANCY: the project description says the app is for a company of up to 500 employees, but US-033 says up to 50 employees. Confirm the intended scale.
- ⚠ No reason is recorded for the skip.
- ⚠ The Sprint 1 goal of a deployable EU/UK-region platform is unmet.

### DEV-NOT-STARTED · draft

28 planned stories have no development ticket, commit or status in the run input. The core time-tracking, approval, leave, reporting, notification and audit features are not confirmed as built.

- Stories with no development record:
  - US-002 to US-018
  - US-020 to US-029
  - US-032
- US-008 tasks T1 to T4 also have no development record.
- Features affected:
  - User administration
  - Role-based access
  - Projects and bill rates
  - Clock in/out
  - Weekly timesheet
  - Approval workflow
  - Leave
  - Overtime and break flags
  - All reports and CSV exports
  - Notifications
  - Audit trail
  - Mobile browser usability

**Related:** US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-020, US-021, US-022, US-023, US-024, US-025, US-026, US-027, US-028, US-029, US-032

- ⚠ Development status is unknown for all of these stories. Do not treat them as built.
- ⚠ Only sign-in, labour-rule configuration and company settings are recorded as delivered. User-facing documentation can therefore cover only those areas.
<!-- sdlc:auto:end narrative -->
