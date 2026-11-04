# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-V1 · approved · source: plan:v1

The development plan for TimeTrack Pro is approved at version 1. It covers 7 sprints of 20 points each, 10 epics and 33 stories (US-001 to US-033). Planned work totals 127 story points against 140 points of total sprint capacity.

- Plan status: approved, version 1.
- Sprints: 7 (Sprint 1 to Sprint 7), each with capacity 20, giving 140 total.
- Epics: EPIC-001 to EPIC-010. No points are set on epics and none has an assigned role.
- Stories: US-001 to US-033, totalling 127 points.
- Tasks: only US-008 is broken down, into US-008-T1 to T4.
- Points by assigned agent role:
  - backend-agent: 23 stories, 91 points.
  - frontend-agent: 7 stories, 19 points.
  - security-agent: 1 story (US-004), 5 points.
  - devops-agent: 2 stories (US-030, US-033), 8 points.
  - qa-agent: no stories; one task only (US-008-T4).
- Platform constraints stated in the plan (Sprint 1 goal): HTTPS-only, single-tenant, hosted in an EU/UK region.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008, EPIC-009, EPIC-010, SPRINT-1, SPRINT-2, SPRINT-3, SPRINT-4, SPRINT-5, SPRINT-6, SPRINT-7

- ⚠ No approver or approval date is recorded for plan v1.
- ⚠ The plan does not assign stories to specific sprints; the sprint-to-story mapping is only implied by the sprint goal text.
- ⚠ The EU/UK hosting region appears in the plan but not in the project description, and no rationale is given.
- ⚠ Only US-008 has a task breakdown. The other 32 stories have no tasks.
- ⚠ The qa-agent appears only on US-008-T4. No testing work is planned for any other story.

### DEV-EXECUTION-STATUS · draft

No development execution has been recorded. There is no evidence of any ticket being started, completed, merged or demoed.

- The input contains only the plan: sprints, goals, items, points and roles.
- There are no ticket statuses, commits, pull requests, build results, sprint start or end dates, velocities or sprint reviews.
- None of the 33 stories can be documented as implemented.

**Related:** DEV-PLAN-V1

- ⚠ No development progress has been recorded for any sprint or story.
- ⚠ No sprint start or end dates are recorded.
- ⚠ The application is not built yet, so the user guide cannot be written. There is no confirmed functionality to document usage for.

### DEV-DISCREPANCY-SCALE · draft · source: plan:US-033

The planned deployment scale conflicts with the project description. US-033 says up to 50 employees; the description says up to 500.

- Project description: 'a company of up to 500 employees'.
- Plan item US-033: 'Single-tenant deployment for up to 50 employees' (5 points, devops-agent).
- Both values are reported here as given. Neither has been chosen over the other.

**Related:** US-033, EPIC-010

- ⚠ Confirm the intended scale: 50 or 500 employees. This affects sizing, performance and the hosting work in Sprint 1.

### SPRINT-1 · approved · source: plan:Sprint 1

Platform foundation sprint. The goal is a deployable, secure single-tenant platform with sign-in and company settings.

- Goal: Deployable, HTTPS-only single-tenant platform in an EU/UK region with email/password sign-in and company settings (time zone, date format, labour rules).
- Capacity: 20.
- Stories implied by the goal (inferred):
  - US-001 Sign in (5)
  - US-019 Configure labour rules (2)
  - US-030 Protect personal data (3)
  - US-031 Company time zone, date format, currency and language (3)
  - US-033 Single-tenant deployment (5)
- Inferred total: 18 points.

**Related:** US-001, US-019, US-030, US-031, US-033

- ⚠ The story-to-sprint assignment is inferred, not explicit in the plan.
- ⚠ US-031 also covers currency and language, but the goal names only time zone and date format. It is unclear whether currency and language are in this sprint.
- ⚠ US-001 depends on users existing, but user creation (US-002) is in Sprint 2. The plan does not say how first sign-in or admin bootstrap works.

### SPRINT-2 · approved · source: plan:Sprint 2

User administration and project setup sprint. Covers user creation, manager assignment, invite and reset links, role scoping, and clients, projects, tasks and bill rates.

- Goal: Admins can create users, assign managers and send invite/reset links; role-based data scoping is enforced; clients, projects, tasks and bill rates are maintained.
- Capacity: 20.
- Stories implied by the goal (inferred):
  - US-002 (5)
  - US-003 (2)
  - US-004 (5)
  - US-005 (5)
  - US-006 (2)
- Inferred total: 19 points.

**Related:** US-002, US-003, US-004, US-005, US-006

- ⚠ The story-to-sprint assignment is inferred.
- ⚠ The goal mentions 'invite' links, which do not appear in any story title or in the project description. Their scope is unconfirmed.

### SPRINT-3 · approved · source: plan:Sprint 3

Weekly timesheet sprint. Covers the Monday-to-Sunday timesheet charged to project and task, an audit record for every entry change, and the notification store.

- Goal: Employees fill a Monday-to-Sunday weekly timesheet charged to project and task, every entry change is audited, and the notification store is in place.
- Capacity: 20.
- Stories implied by the goal (inferred):
  - US-008 (8), with tasks T1 to T4
  - US-009 (3)
  - US-028 (5)
- Inferred total: 16 points.
- A 'notification store' is also planned. It appears to be part of US-026, whose alerts are delivered in Sprint 6.

**Related:** US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4, US-009, US-028, US-026

- ⚠ The story-to-sprint assignment is inferred.
- ⚠ The plan does not say how US-026 (5 points) and US-028 are split across sprints. US-028 covers approvals, which arrive in Sprint 4.
- ⚠ The Monday-to-Sunday week definition comes from the plan, not the project description. It is unconfirmed whether the week start is configurable.

### SPRINT-4 · approved · source: plan:Sprint 4

Clock in/out and approval lifecycle sprint. Covers clock in/out with breaks and the full approval flow: submit, approve or reject, resubmit, lock and unlock.

- Goal: Clock in/out with breaks and the full timesheet approval lifecycle: submit, approve/reject with comment, resubmit, lock and Payroll Admin unlock.
- Capacity: 20.
- Stories implied by the goal (inferred):
  - US-007 (5)
  - US-011 (3)
  - US-012 (5)
  - US-013 (2)
  - US-014 (3)
- Inferred total: 18 points.

**Related:** US-007, US-011, US-012, US-013, US-014

- ⚠ The story-to-sprint assignment is inferred.
- ⚠ Payroll Admin unlock (US-014) is not in the project description, which says only that approved sheets are locked. Confirm the requirement is approved.

### SPRINT-5 · approved · source: plan:Sprint 5

Time off and compliance flags sprint. Covers leave requests, decisions, accrual, leave shown on the timesheet, and overtime and missed-break flags.

- Goal: Leave requests, manager decisions, monthly accrual and balances, leave shown on the timesheet, and overtime and missed-break flags.
- Capacity: 20.
- Stories implied by the goal (inferred):
  - US-015 (3)
  - US-016 (3)
  - US-017 (5)
  - US-018 (2)
  - US-020 (5)
- Inferred total: 18 points.

**Related:** US-015, US-016, US-017, US-018, US-020

- ⚠ The story-to-sprint assignment is inferred.
- ⚠ The monthly accrual amount is not stated anywhere in the input.

### SPRINT-6 · approved · source: plan:Sprint 6

Alerts, dashboard, core reports and audit viewing sprint.

- Goal: In-app alerts, employee dashboard, hours and billable reports with CSV export, and audit history viewing.
- Capacity: 20.
- Stories implied by the goal (inferred):
  - US-026 (5)
  - US-027 (3)
  - US-010 (3)
  - US-022 (5)
  - US-023 (3)
  - US-029 (3)
- Inferred total: 22 points, which exceeds the 20-point capacity.

**Related:** US-010, US-022, US-023, US-026, US-027, US-029

- ⚠ The story-to-sprint assignment is inferred.
- ⚠ If all six inferred stories belong here, the sprint is over capacity at 22 of 20 points. Confirm the scope, or confirm that part of US-026 was delivered in Sprint 3.
- ⚠ US-029 includes 'retention', but no retention period is stated in the input.

### SPRINT-7 · approved · source: plan:Sprint 7

Remaining reports and exports sprint, plus mobile-browser usability for key employee screens.

- Goal: Compliance, overtime, leave-taken and payroll CSV exports, plus mobile-browser usability across the key employee screens.
- Capacity: 20.
- Stories implied by the goal (inferred):
  - US-021 (5)
  - US-024 (5)
  - US-025 (3)
  - US-032 (3)
- Inferred total: 16 points.

**Related:** US-021, US-024, US-025, US-032

- ⚠ The story-to-sprint assignment is inferred.
- ⚠ The plan does not define which screens count as the 'key employee screens' for mobile usability.

### EPIC-001 · approved · source: plan:EPIC-001

Users, roles and sign-in. Four stories, 17 points.

- US-001 Sign in with email and password: 5 points, backend-agent.
- US-002 Admin creates user accounts and assigns a manager: 5 points, backend-agent.
- US-003 Admin-initiated password reset: 2 points, backend-agent.
- US-004 Role-based access to data: 5 points, security-agent.

**Related:** US-001, US-002, US-003, US-004

- ⚠ The epic has no assigned role or owner.
- ⚠ No frontend work (sign-in or user admin screens) is planned under this epic.

### EPIC-002 · approved · source: plan:EPIC-002

Clients, projects and tasks. Two stories, 7 points.

- US-005 Maintain clients, projects and tasks: 5 points, backend-agent.
- US-006 Hourly bill rate per project and currency: 2 points, backend-agent.

**Related:** US-005, US-006

- ⚠ The epic has no assigned role.
- ⚠ No frontend story is planned for the admin screens.
- ⚠ Currency per project is not in the project description.

### EPIC-003 · approved · source: plan:EPIC-003

Time tracking. Four stories, 19 points. This is the only epic with a task breakdown.

- US-007 Clock in and out with breaks: 5 points, backend-agent.
- US-008 Weekly timesheet entry by day: 8 points, backend-agent. Tasks:
  - T1 Add timesheet, time entry and break tables (backend-agent).
  - T2 Implement week and entry endpoints (backend-agent).
  - T3 Build weekly timesheet grid (frontend-agent).
  - T4 Add API test suite for timesheet editing and locking (qa-agent).
- US-009 Charge each entry to a project and task and mark billable: 3 points, frontend-agent.
- US-010 Employee dashboard of own hours this week: 3 points, frontend-agent.

**Related:** US-007, US-008, US-008-T1, US-008-T2, US-008-T3, US-008-T4, US-009, US-010

- ⚠ The epic has no assigned role.
- ⚠ US-007 has no frontend task for the clock in/out UI.
- ⚠ US-008-T4 tests locking, which is delivered in Sprint 4 (US-014), but US-008 is inferred to be in Sprint 3.

### EPIC-004 · approved · source: plan:EPIC-004

Timesheet approval. Four stories, 13 points.

- US-011 Submit a weekly timesheet: 3 points, backend-agent.
- US-012 Manager approves or rejects with a comment: 5 points, backend-agent.
- US-013 Edit and resubmit a rejected timesheet: 2 points, frontend-agent.
- US-014 Approved timesheets are locked; Payroll Admin can unlock: 3 points, backend-agent.

**Related:** US-011, US-012, US-013, US-014

- ⚠ The epic has no assigned role.
- ⚠ No frontend work is planned for the manager approval screen.

### EPIC-005 · approved · source: plan:EPIC-005

Time off. Four stories, 13 points.

- US-015 Request leave: 3 points, backend-agent.
- US-016 Manager decides leave requests: 3 points, backend-agent.
- US-017 Leave balance with monthly accrual: 5 points, backend-agent.
- US-018 Approved leave shown on the timesheet: 2 points, frontend-agent.

**Related:** US-015, US-016, US-017, US-018

- ⚠ The epic has no assigned role.
- ⚠ The accrual rate per leave type is not specified.
- ⚠ No frontend work is planned for the leave request and balance screens.

### EPIC-006 · approved · source: plan:EPIC-006

Labour rules and compliance flags. Three stories, 12 points.

- US-019 Configure labour rules: 2 points, backend-agent. Example limits from the description: 8 h per day, 40 h per week, and a minimum break after 6 hours.
- US-020 Flag overtime and missed breaks on the timesheet: 5 points, backend-agent.
- US-021 Compliance report: 5 points, backend-agent.

**Related:** US-019, US-020, US-021

- ⚠ The epic has no assigned role.
- ⚠ The minimum break duration is not stated.

### EPIC-007 · approved · source: plan:EPIC-007

Reports and CSV export. Four stories, 16 points.

- US-022 Hours report by employee, project and week: 5 points, backend-agent.
- US-023 Billable versus non-billable report: 3 points, backend-agent.
- US-024 Overtime and leave taken reports: 5 points, backend-agent.
- US-025 Payroll export of approved hours: 3 points, backend-agent.

**Related:** US-022, US-023, US-024, US-025

- ⚠ The epic has no assigned role.
- ⚠ No frontend story is planned for the report screens.
- ⚠ The payroll export period definition and CSV column format are not specified.

### EPIC-008 · approved · source: plan:EPIC-008

In-app notifications. Two stories, 8 points.

- US-026 Receive in-app alerts (timesheet due, approved or rejected, leave request decided): 5 points, backend-agent.
- US-027 View and clear notifications: 3 points, frontend-agent.

**Related:** US-026, US-027

- ⚠ The epic has no assigned role.
- ⚠ The trigger timing for the 'timesheet due' alert is not specified.

### EPIC-009 · approved · source: plan:EPIC-009

Audit trail. Two stories, 8 points.

- US-028 Record changes and approvals of timesheets (who and when): 5 points, backend-agent.
- US-029 View audit history and retention: 3 points, frontend-agent.

**Related:** US-028, US-029

- ⚠ The epic has no assigned role.
- ⚠ The audit retention period is unspecified.

### EPIC-010 · approved · source: plan:EPIC-010

Data protection, localisation and platform. Four stories, 14 points.

- US-030 Protect personal data: 3 points, devops-agent.
- US-031 Company time zone, date format, currency and language: 3 points, frontend-agent.
- US-032 Use the web app on a mobile browser: 3 points, frontend-agent.
- US-033 Single-tenant deployment for up to 50 employees: 5 points, devops-agent.

**Related:** US-030, US-031, US-032, US-033, DEV-DISCREPANCY-SCALE

- ⚠ The epic has no assigned role.
- ⚠ US-033 scopes 50 employees, which conflicts with the 500 in the project description (see DEV-DISCREPANCY-SCALE).
- ⚠ The specific data-protection controls in US-030 are not detailed.
- ⚠ The supported languages for US-031 are not listed.
<!-- sdlc:auto:end narrative -->
