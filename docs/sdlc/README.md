# TimeTrack Pro — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Build a time and labour management web app for a company of up to 500 employees, similar to Replicon.
▎
▎ Users and roles: Employee, Manager, Payroll Admin, System Admin. Sign-in with email and password. Admins create users and assign each employee a manager.
▎
▎ Time tracking: employees clock in and out (with breaks) from the browser, or fill a weekly timesheet by day. Each time entry is charged to a project and task. Entries can be marked billable or non-billable.
▎
▎ Projects: admins create clients, projects and tasks, with an hourly bill rate per project.
▎
▎ Timesheet approval: employees submit their week. The manager approves or rejects it with a comment, and a rejected sheet goes back for editing. Approved sheets are locked.
▎
▎ Time off: employees request leave (annual, sick, unpaid) for full or half days. The manager approves it. Each employee sees their leave balance, which grows by a fixed number of days per month.
▎
▎ Labour rules: an admin sets the daily and weekly overtime limits, for example 8 h per day and 40 h per week, plus the minimum break after 6 hours. The app flags overtime and missed breaks on the timesheet and in a compliance report.
▎
▎ Reports: hours by employee, project and week; billable versus non-billable hours; overtime; leave taken. Export to CSV, including a payroll export of approved hours per employee per period.
▎
▎ Notifications: in-app alerts for a timesheet due, approved or rejected, and a leave request decided.
▎
▎ Audit: record who changed or approved any timesheet, and when.

**Documentation version:** v5
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 32 entries |
| [Development](development/README.md) | 16 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 3 entries |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 7 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 6 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 4 tests |
| [Deployment guide](deployment/deployment-guide.md) | deployed |
| [Runbook](deployment/runbook.md) | deployed |
| [Release notes](deployment/release-notes.md) | 1 release |
| [Traceability matrix](traceability-matrix.md) | 33 requirements |
| [Changelog](CHANGELOG.md) | 5 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- The project description says 'up to 500 employees', but the stack rationale, US-033 and NFR-013 size the system for 50 employees. Needs resolution.
- Currency default is stated as 'EUR or GBP' without saying which one applies by default.
- EPIC-010 still lists the stack as 'React, Node/TypeScript, PostgreSQL ... to be confirmed at the stack screen'. This conflicts with the approved FastAPI backend, so EPIC-010 text appears stale and should be updated.
- The approver's name and the approval date are not recorded.
- References an 'architecture finding' that is not present in any provided input.
- No story covers deactivating a user account, although AC-003 depends on deactivated accounts existing.
- The content of each role's home screen is not specified, except the Employee dashboard (US-010).
- Not stated what happens to items already pending with the old manager when an employee's manager changes.
- No acceptance criterion covers deactivating users.
- The link expiry duration is not specified.
- Which admin role(s) may trigger a reset is not specified.
- System Admin data visibility (outside audit history and user admin) is not specified.
- Which admin role is meant ('admin') is not specified.
- Archiving or deleting clients, projects and tasks is not specified.
- Not stated whether a rate change applies retroactively to past billable values.
- Behaviour for an entry left running across midnight or the end of the week is not specified.
- No default billable value per project or task is specified.
- No approval cover is defined for an absent manager or an employee without a manager.
- AC-037 requires an in-app notification to the manager on submission, but US-026 lists no 'timesheet submitted' alert type for managers.
- The status of an unlocked sheet, and whether it must be re-approved, is not specified.
- Leave cancellation or withdrawal is not specified.
- No year-end carry-over or cap on balances is specified.
- AC-052 is explicitly marked 'assumption: to be confirmed'.
- Not stated whether a sick-leave balance limits requests.
- Not stated whether rejecting a leave request requires a comment.
- Not stated whether sick leave is deducted from a sick balance.
- Opening balances and pro-rating for joiners are not specified.
- Not stated whether leave hours are included in the payroll export.
- The WTD 48 h average and 11 h rest checks are deferred on a low-confidence assumption and need confirmation.
- Not stated whether rule changes re-evaluate flags on past weeks.
- Not stated whether the other reports include unapproved hours.
- The available filters are not enumerated.
- How a period is defined (date range vs fixed pay period) is not specified.
- The exact trigger time for 'timesheet due' is not confirmed.
- Alerts to managers (e.g. a timesheet submitted, as implied by AC-037, or a leave request pending) are not listed.
- Audit of non-timesheet actions (user admin, role changes, leave decisions, labour-rule changes) is not required.
- Behaviour after 6 years (deletion or retention) is not specified.
- The stated Node/TypeScript backend conflicts with the approved FastAPI 0.115 backend (REQ-STACK).
- The 'Map' term in the intake was ambiguous. A location map is listed as out of scope, yet EPIC-010 says 'Map' was read as MVP. This needs explicit confirmation.
- The story promises protection 'at rest', but no acceptance criterion verifies encryption at rest.
- Sizing for 50 employees conflicts with the project description's 'up to 500 employees'.
- No measurable response-time target is given.
- No hashing algorithm or parameters are specified.
- No rate limiting or lockout against brute force is specified.
- No expiry duration is specified.
- The at-rest protection mechanism is unspecified and not covered by an acceptance criterion.
- The specific region is not chosen.
- No manual procedure for leaver data is documented.
- It is unclear how manual leaver handling reconciles with immutable 6-year audit records (NFR-010/NFR-011).
- The WTD 48 h average and 11 h daily rest checks are deferred.
- Conflicts with the 'up to 500 employees' in the project description.
- No latency target is given.

### Architecture

- The architecture input does not reference any known requirement key (US-001 to US-033). The links between design elements and user stories cannot be confirmed from this input.
- No approval date or approver is recorded for version 1.
- The input does not describe monitoring, logging, alerting, backup retention or disaster recovery.
- The 6-year audit retention period has no stated rationale or source requirement.
- Screen-level design (screen keys) is not part of this input.
- Required roles are not stated for most endpoints, for example which admin role manages users, clients, projects or settings. Only unlock (Payroll Admin), payroll export (Payroll Admin), approve/reject (current manager) and report scoping are specified.
- JWT expiry, refresh behaviour and CSRF protection for the cookie-based session are not described.
- Login throttling or account lockout is not described.
- Conflict: the audit retention sweep deletes audit rows, but ARCH-COMP-DB makes audit_log append-only through grants and a trigger. The input does not explain how the sweep is permitted to delete, for example a separate role or a trigger exception.
- No frequency is stated for the token cleanup job.
- The mechanism for database-enforced status locks is not described, for example a trigger or constraint.
- The specific SMTP provider is not named.
- Possible discrepancy: the project description says only Approved sheets are locked, but this path also refuses entries in Submitted weeks. This needs confirmation.
- audit_log rows are keyed by timesheet_id. The input does not say whether a timesheet row is created automatically when an employee first clocks in for a week.
- Handling of an entry still running across midnight or across the week boundary is not described.
- The unlock transition by Payroll Admin is not in the project description, which only says approved sheets are locked. Confirm which requirement it traces to.
- The input does not say who acts if an employee has no manager or the manager changes mid-review.
- The input does not say whether the employee is notified on unlock.
- Flags use the current labour rules. The input does not say whether historical weeks are re-flagged when the rules change.
- The input does not say whether overtime hours are double-counted when both the daily and weekly limits are exceeded.
- The payroll 'period' is not defined, for example whether it is weekly, monthly or a custom date range.
- System Admin report visibility is not stated.
- The input does not define which leave types are balance-bearing. The project description implies annual leave, but sick and unpaid leave are not specified.
- Behaviour for a missed run (app down on the 1st) or for employees who join mid-month is not described.
- There is no self-service 'forgot password' flow; resets are admin-initiated only. Confirm this matches the requirements.
- Password complexity rules are not stated.
- audit_log is keyed to timesheet_id only, so changes to users, settings or leave are not covered by the audit design. This matches the project description's audit scope, which is timesheets only.
- timesheets stores only a single reject_comment field. Rejection history across multiple rejections appears to rely on audit_log; this is not confirmed.
- The required role is not stated; the project description says 'Admins'.
- There is no delete endpoint; deactivation is via the active flag.
- The input does not say whether a bill rate change applies retroactively to billable-value reports.
- The required admin role is not stated.
- The required role is not stated.
- There is no endpoint to create or edit leave types themselves; accrual rates are included in settings.
- Who may view the audit history is not stated.
- Only annual leave is stated to write a ledger deduction. Ledger behaviour for sick and unpaid leave is not specified.
- The input does not say whether a request exceeding the available balance is refused or only flagged.
- Cancellation of an approved leave request is not covered.
- No notification retention or cleanup is described.
- The input does not say whether every report has a CSV variant or only some. The project description requires CSV export for reports.
- A single task means no redundancy. Availability targets are not stated.
- The advisory lock implies multiple instances may run at some point, but scaling plans are not described.
- Only the dev configuration (single-AZ) is stated. The production RDS configuration, including Multi-AZ and backup retention, is not described.
- No secret rotation policy is stated.
- No comparison reasoning is given for rejecting Vue or Angular.
- GDPR obligations beyond data residency and encryption, such as data subject access and erasure, are not addressed in this architecture input. This is noted for human review, not as a legal assessment.

### Development

- The plan has no approval date and no named approver.
- The input does not explicitly assign stories to sprints. Sprint scope can only be inferred from goal text.
- No sprint start or end dates are given.
- The 'deployable, HTTPS-only, EU/UK region' part of the goal depends on US-033 and US-030, which were both skipped. The sprint goal is therefore not met as stated.
- The story-to-sprint mapping is inferred, not stated in the input.
- No development ticket or commit is recorded for any Sprint 2 story.
- No development ticket or commit is recorded for any Sprint 3 story or task.
- It is unclear whether US-026 is split across Sprint 3 (store) and Sprint 6 (alerts).
- US-008 tasks have no points.
- No development ticket or commit is recorded for any Sprint 4 story.
- No development ticket or commit is recorded for any Sprint 5 story.
- The inferred scope (22 pts) exceeds sprint capacity (20). The actual assignment needs confirmation.
- No development ticket or commit is recorded for any Sprint 6 story.
- No development ticket or commit is recorded for any Sprint 7 story.
- US-006 and US-031 mention currency, and US-031 mentions language. The project description does not specify currency or language requirements, so their scope needs confirming against the requirements phase.
- US-029 mentions audit retention. No retention period is given in the input.
- DISCREPANCY: the run is 'completed', yet the approved plan spans 7 sprints and 33 stories. It is unclear whether this run represents Sprint 1 only or the whole plan.
- There is no run date, no reviewer, and no acceptance or merge record for the delivered commit.
- No reason is recorded for skipping US-030 and US-033.
- No implementation details are provided, such as session handling, password policy or lockout.
- No test evidence or acceptance record exists.
- It is not stated which settings were actually implemented, or what the default values are.
- The flagging of overtime and missed breaks (US-020) and the compliance report (US-021) that consume these rules have no recorded development.
- No reason is recorded for the skip.
- The Sprint 1 'HTTPS-only' goal is unmet if this story carries it.
- It is unknown whether this story was rescheduled or descoped.
- The supported languages, currencies and date formats are not stated.
- No test evidence exists.
- DISCREPANCY: the project description says the app is for a company of up to 500 employees, but US-033 says up to 50 employees. Confirm the intended scale.
- The Sprint 1 goal of a deployable EU/UK-region platform is unmet.
- Development status is unknown for all of these stories. Do not treat them as built.
- Only sign-in, labour-rule configuration and company settings are recorded as delivered. User-facing documentation can therefore cover only those areas.

### Testing

- Testing phase has not started. None of the 107 acceptance criteria have recorded verification.

### Deployment

- No deployment date or time recorded.
- No record of who performed or approved this deployment.
- No release notes, and no list of which requirements (US-001 to US-033) are included in this version. related_ids to requirements cannot be set.
- Environment type is not stated (production, staging, or demo). 'Live' alone does not confirm this is the production environment for end users.
- No post-deployment smoke test or health-check results recorded.
- No rollback plan or previous version identifier recorded.
- No monitoring, logging, or alerting configuration recorded.
- No database or migration details recorded. This matters because the app stores timesheets, leave balances, payroll exports, and audit history (US-related audit requirement).
- No backup or data-retention arrangements recorded for timesheet and audit data.
- No custom domain recorded. The default Amplify domain is in use, and it is not stated whether this is intended for end users.
- No confirmation that the frontend is configured to call the backend URL listed for this release.
- No browser compatibility or accessibility verification recorded for the deployed build.
- Use of an sslip.io hostname (a direct IP mapping) should be confirmed as intended. It may not be suitable for a production system handling employee sign-in credentials and payroll data.
- No information on the hosting provider, server or runtime, scaling, or availability for up to 500 employees.
- No record of TLS certificate management, CORS configuration, or security hardening.
- No record of how secrets and credentials (e.g. database, password hashing configuration) are managed in this environment.
- No API health-check result recorded for this deployment.

### Maintenance

- Maintenance phase has not started because nothing has been deployed.
<!-- sdlc:auto:end open-gaps -->
