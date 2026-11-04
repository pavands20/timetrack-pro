# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · draft · source: requirements:scope

Project scope for requirements version 1 of TimeTrack Pro, delivered at lightweight scope. Defines the in-scope capabilities and the out-of-scope exclusions.

- Delivery scope: lightweight. Requirements version: 1.
- Project description: time and labour management web app for a company of up to 500 employees, similar to Replicon.
- Roles: Employee, Manager, Payroll Admin, System Admin.
- Capabilities in scope:
  - Email/password sign-in; employee accounts created by an admin.
  - Clock in/out with breaks from the browser; weekly timesheet by day.
  - Each entry charged to a project and task, and marked billable or non-billable.
  - Admin maintenance of clients, projects and tasks; hourly bill rate per project.
  - Employee dashboard of own hours this week.
  - Weeks run Monday to Sunday.
  - Times stored in UTC and shown in one company-wide time zone.
  - Day/month/year date format; English-only interface.
  - Responsive web app for mobile browsers (no native app).
  - Bill rates used for reporting only (no invoicing or payroll calculation).
  - Configurable bill-rate currency (default EUR or GBP).
- Out of scope:
  - Native mobile app; GPS or geofenced clock-in.
  - SSO/SAML; direct payroll-system integration; invoicing.
  - Email or SMS notifications.
  - Map of employee locations and location capture at clock-in.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008, EPIC-009, EPIC-010

- ⚠ The project description says 'up to 500 employees', but the stack rationale, US-033 and NFR-013 size the system for 50 employees. Needs resolution.
- ⚠ Currency default is stated as 'EUR or GBP' without saying which one applies by default.

### REQ-STACK · approved · source: requirements:technology-stack

The product owner approved the technology stack and external services. Designs must use exactly these, with no substitution.

Approved stack:
- Backend: FastAPI 0.115.
  - Replaces an earlier Node/TypeScript assumption, which is not on the available list; FastAPI is the closest option.
  - Rationale given: handles rules (overtime and missed-break flags, leave accrual, approval workflows, audit records, CSV exports).
  - Validates incoming data automatically.
  - Runs comfortably as one small service at 50 employees.
- Cloud: AWS.
  - Needed for EU/UK hosting under GDPR / UK GDPR (London and Ireland regions).
  - Containerised hosting of one app plus one managed PostgreSQL database.
  - No hosting constraint was set, so the platform default was chosen.
- Database: PostgreSQL 16.
  - Data is highly relational, with consistency needed on approve and lock.
  - Matches the confirmed single-database deployment; reports can use plain queries.
- Frontend: React 19.
  - Confirmed as the starting position.
  - Suits a weekly timesheet grid, clock in/out, approval queues and reports.
  - Must work in phone browsers.

Approved services (runtime_needs):
- Email via an SMTP server (SaaS).
  - Environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD.
  - Used only for password-reset and invite links.

API keys needed: SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER.

**Related:** US-030, US-033, NFR-006, NFR-013, US-002, US-003, US-107

- ⚠ EPIC-010 still lists the stack as 'React, Node/TypeScript, PostgreSQL ... to be confirmed at the stack screen'. This conflicts with the approved FastAPI backend, so EPIC-010 text appears stale and should be updated.
- ⚠ The approver's name and the approval date are not recorded.

### EPIC-001 · draft · source: requirements:EPIC-001

Users, roles and sign-in. Four roles sign in with email and password. Admins create users and assign each employee a manager.

- Roles: Employee, Manager, Payroll Admin, System Admin.
- Assumption: at 50 employees, one person may hold both admin roles.
- Assumption: email is used only for invite and password-reset links, sent through an SMTP provider.
- Password reset is initiated by an admin, 'as in the architecture finding'.
- Self-service reset is not specified.

**Related:** US-001, US-002, US-003, US-004

- ⚠ References an 'architecture finding' that is not present in any provided input.
- ⚠ No story covers deactivating a user account, although AC-003 depends on deactivated accounts existing.

### US-001 · draft · source: requirements:US-001

Critical. Users of any role sign in with email and password and land on their role's home screen. Wrong passwords and deactivated accounts are refused, and passwords are stored only as salted hashes.

Priority: critical.
Story: a user of any role signs in with email and password to reach the features their role allows.
Acceptance criteria:
- AC-001: An active account with a password set, given the correct email and password, is signed in and sees the home screen for its role.
- AC-002: A wrong password is refused with a generic error that does not reveal whether the email exists.
- AC-003: A deactivated account is refused even with correct credentials.
- AC-004: Passwords are stored only as salted hashes, never in plain text.

**Related:** EPIC-001, NFR-001, NFR-002

- ⚠ The content of each role's home screen is not specified, except the Employee dashboard (US-010).

### US-002 · draft · source: requirements:US-002

Critical. A System Admin or Payroll Admin creates users with a role and a manager, and an invite link is emailed. Duplicate emails are refused, and a manager change re-routes future approvals.

Priority: critical.
Story: a System Admin or Payroll Admin creates users, assigns roles and assigns each employee a manager.
Acceptance criteria:
- AC-005: Creating a user with name, email, role and manager saves the account and emails an invite link to set a password.
- AC-006: A duplicate email is refused with a clear message.
- AC-007: Changing an employee's manager routes future submissions and leave requests to the new manager.
- AC-008: Employees and Managers are denied access to user administration.
- AC-009: One person can be assigned both the Payroll Admin and System Admin roles and gets the permissions of both.

**Related:** EPIC-001, NFR-003, NFR-004

- ⚠ Not stated what happens to items already pending with the old manager when an employee's manager changes.
- ⚠ No acceptance criterion covers deactivating users.

### US-003 · draft · source: requirements:US-003

Medium. An admin sends a user a single-use, time-limited password-reset link by email.

Priority: medium.
Story: an admin sends a password-reset link so a user who lost their password regains access.
Acceptance criteria:
- AC-010: Triggering a reset emails a single-use, time-limited link to the user.
- AC-011: A used or expired link is rejected and the password does not change.

**Related:** EPIC-001, NFR-003

- ⚠ The link expiry duration is not specified.
- ⚠ Which admin role(s) may trigger a reset is not specified.

### US-004 · draft · source: requirements:US-004

High. Role-based data visibility: Employees see only their own data, and Managers see their direct reports plus themselves. Payroll Admins see all employees in reports and the payroll export.

Priority: high.
Story: a System Admin wants each role to see only the data it needs, so personal data is protected.
Acceptance criteria:
- AC-012: An Employee sees only their own timesheet, leave and report data.
- AC-013: A Manager sees only direct reports and their own data.
- AC-014: A Manager cannot approve timesheets or leave for anyone who is not a direct report.
- AC-015: A Payroll Admin sees all employees in reports and the payroll export.

**Related:** EPIC-001, NFR-004

- ⚠ System Admin data visibility (outside audit history and user admin) is not specified.

### EPIC-002 · draft · source: requirements:EPIC-002

Clients, projects and tasks. Admins maintain the structure that time is charged to, including a per-project bill rate used for reporting only.

- Bill rates are used for reporting only: no invoicing, payments or payroll calculation.
- Currency is configurable per company (default EUR or GBP).

**Related:** US-005, US-006

### US-005 · draft · source: requirements:US-005

Critical. Admins create and edit clients, projects under clients, and tasks under projects. Renaming a project keeps its existing entries linked.

Priority: critical.
Acceptance criteria:
- AC-016: An admin creates a client, then a project, then a task; all are saved, and the project and task appear in employees' selection lists.
- AC-017: Employees and Managers are refused when they try to create or edit clients, projects or tasks.
- AC-018: Renaming a project that has entries keeps the links and shows the new name.

**Related:** EPIC-002, NFR-004

- ⚠ Which admin role is meant ('admin') is not specified.
- ⚠ Archiving or deleting clients, projects and tasks is not specified.

### US-006 · draft · source: requirements:US-006

Medium. Admins set an hourly bill rate per project and choose the company currency. Rates are used only in reports.

Priority: medium.
Acceptance criteria:
- AC-019: An entered rate is saved and shown on the project.
- AC-020: The selected currency (default EUR or GBP) applies to all bill rates and billable values.
- AC-021: Saved rates are used only in reports; no invoice, payment or payroll amount is produced.

**Related:** EPIC-002, US-023

- ⚠ Not stated whether a rate change applies retroactively to past billable values.

### EPIC-003 · draft · source: requirements:EPIC-003

Time tracking. Employees record time by clock in/out with breaks, or by a weekly timesheet by day. Every entry has a project, task and billable flag.

- Weeks run Monday to Sunday.
- Times are stored in UTC and shown in the company time zone.
- Assumption: approved leave appears on the timesheet (see US-018).

**Related:** US-007, US-008, US-009, US-010, US-018

### US-007 · draft · source: requirements:US-007

Critical. Employees clock in on a project, task and billable flag, take breaks, and clock out. Worked time equals elapsed time minus breaks.

Priority: critical.
Acceptance criteria:
- AC-022: Clocking in with a project, task and billable flag starts a running entry at the current time.
- AC-023: Breaks started and ended while clocked in are recorded and excluded from worked time.
- AC-024: Clocking out closes the entry; worked time = elapsed time - breaks.
- AC-025: A second clock-in is refused and the running entry is shown.
- AC-026: Clocking in for a day in a submitted or approved week is refused with a 'not editable' message.

**Related:** EPIC-003, NFR-008, NFR-015

- ⚠ Behaviour for an entry left running across midnight or the end of the week is not specified.

### US-008 · draft · source: requirements:US-008

Critical. Employees fill a Monday-to-Sunday timesheet with hours and break time per day, with day and week totals. Clocked entries appear as editable rows.

Priority: critical.
Acceptance criteria:
- AC-027: The week shows Monday to Sunday with day/month/year dates and per-day and weekly totals.
- AC-028: Hours and break time entered for a day against a project and task are saved, and totals update.
- AC-029: Clocked entries appear as editable rows while the sheet is editable.
- AC-030: Submitted or approved sheets cannot be edited.

**Related:** EPIC-003, NFR-015, NFR-017

### US-009 · draft · source: requirements:US-009

Critical. Every entry needs a project and a task, and only tasks of the chosen project are offered. The billable flag is saved and used by reports.

Priority: critical.
Acceptance criteria:
- AC-031: An entry with an empty project or task is not saved, and the missing field is indicated.
- AC-032: Only tasks belonging to the selected project are offered.
- AC-033: The billable or non-billable flag is saved and used by the billable reports.

**Related:** EPIC-003, US-023

- ⚠ No default billable value per project or task is specified.

### US-010 · draft · source: requirements:US-010

Medium. The Employee dashboard shows this week's hours by day, the sheet status, clock controls when clocked in, and the unread alert count.

Priority: medium.
Acceptance criteria:
- AC-034: Shows total hours for the current Monday-to-Sunday week, split by day, plus the sheet status.
- AC-035: If a clock entry is running, shows clocked-in state with clock-out and break controls.
- AC-036: Shows the unread notification count.

**Related:** EPIC-003, US-027

### EPIC-004 · draft · source: requirements:EPIC-004

Timesheet approval. Employees submit a week, and managers approve or reject it with a comment. Rejected sheets return for editing, and approved sheets lock.

- Assumption: managers approve only their direct reports.
- Assumption: only a Payroll Admin can unlock an approved timesheet, and the unlock is audited.

**Related:** US-011, US-012, US-013, US-014

- ⚠ No approval cover is defined for an absent manager or an employee without a manager.

### US-011 · draft · source: requirements:US-011

Critical. Employees submit a week, which locks it and notifies the manager. Submission is refused while a clock entry is running; compliance flags never block.

Priority: critical.
Acceptance criteria:
- AC-037: Submitting sets status to Submitted, locks editing and notifies the manager in-app.
- AC-038: Submission is refused while a clock entry is still running.
- AC-039: Flagged overtime or missed breaks do not block submission.

**Related:** EPIC-004, NFR-012, US-026

- ⚠ AC-037 requires an in-app notification to the manager on submission, but US-026 lists no 'timesheet submitted' alert type for managers.

### US-012 · draft · source: requirements:US-012

Critical. Managers approve or reject a direct report's submitted timesheet. Rejection requires a comment, and approval locks the sheet.

Priority: critical.
Acceptance criteria:
- AC-040: Approving sets status to Approved and locks the sheet.
- AC-041: Rejecting without a comment is refused.
- AC-042: Rejecting with a comment sets status to Rejected, and the employee sees the comment.
- AC-043: A Manager is denied access to sheets of people who are not direct reports.

**Related:** EPIC-004, NFR-004, US-026

### US-013 · draft · source: requirements:US-013

High. A rejected timesheet returns to the employee, editable, with the manager's comment. The employee corrects and resubmits it.

Priority: high.
Acceptance criteria:
- AC-044: A rejected sheet is editable and shows the manager's comment.
- AC-045: Resubmitting returns the sheet to Submitted for the manager.

**Related:** EPIC-004, US-012

### US-014 · draft · source: requirements:US-014

High. Approved timesheets are locked. Only a Payroll Admin can unlock one, and the unlock is audited.

Priority: high.
Acceptance criteria:
- AC-046: Employees and Managers cannot edit an approved sheet.
- AC-047: A Payroll Admin unlock makes the sheet editable and records an audit entry with user and time.
- AC-048: Users without the Payroll Admin role cannot unlock.

**Related:** EPIC-004, NFR-004, NFR-010, US-028

- ⚠ The status of an unlocked sheet, and whether it must be re-approved, is not specified.

### EPIC-005 · draft · source: requirements:EPIC-005

Time off. Employees request annual, sick or unpaid leave for full or half days, and managers approve it.

Assumptions:
- Accrual is one company-wide number of days per month per leave type.
- Unpaid leave has no balance.
- Approved leave shows on the timesheet.
- Sick leave is stored as a leave type only, with no medical details.
- Public holidays are not loaded automatically.

**Related:** US-015, US-016, US-017, US-018

- ⚠ Leave cancellation or withdrawal is not specified.
- ⚠ No year-end carry-over or cap on balances is specified.

### US-015 · draft · source: requirements:US-015

High. Employees request annual, sick or unpaid leave for full or half days. Requests start as Pending, and sick leave holds no medical details.

Priority: high.
Acceptance criteria:
- AC-049: A request with type, start date, end date and full or half day is saved as Pending and is visible to the manager.
- AC-050: Sick leave allows no medical details; only the type is stored.
- AC-051: An end date before the start date is rejected with an error.
- AC-052: Annual leave exceeding the balance is not blocked, and the manager sees the balance alongside the request (assumption: to be confirmed).

**Related:** EPIC-005, NFR-007, NFR-015

- ⚠ AC-052 is explicitly marked 'assumption: to be confirmed'.
- ⚠ Not stated whether a sick-leave balance limits requests.

### US-016 · draft · source: requirements:US-016

High. Managers approve or reject direct reports' leave requests. The employee is notified, and approved annual leave is deducted from the balance.

Priority: high.
Acceptance criteria:
- AC-053: The decision updates the status and sends the employee an in-app notification.
- AC-054: Deciding requests of people who are not direct reports is denied.
- AC-055: Approved annual leave days are deducted from the annual balance.

**Related:** EPIC-005, NFR-004, US-026

- ⚠ Not stated whether rejecting a leave request requires a comment.
- ⚠ Not stated whether sick leave is deducted from a sick balance.

### US-017 · draft · source: requirements:US-017

High. Leave balances grow monthly by a company-wide number of days per leave type. Employees see balance, leave taken and pending requests; unpaid leave has no balance.

Priority: high.
Acceptance criteria:
- AC-056: At the start of each month, each employee's balance increases by the admin-set days for that type.
- AC-057: The leave page shows balance, approved leave taken and pending requests per balance-bearing type.
- AC-058: No balance is kept or shown for unpaid leave.
- AC-059: Changing the accrual applies from the next accrual onward; past accruals are not rewritten.

**Related:** EPIC-005

- ⚠ Opening balances and pro-rating for joiners are not specified.

### US-018 · draft · source: requirements:US-018

Medium. Approved leave appears on the weekly timesheet with its type and portion. It is not counted as worked hours or overtime.

Priority: medium.
Acceptance criteria:
- AC-060: A day with approved leave is marked with the leave type and full or half day.
- AC-061: Leave is excluded from worked hours and overtime.

**Related:** EPIC-005, EPIC-003, US-008

- ⚠ Not stated whether leave hours are included in the payroll export.

### EPIC-006 · draft · source: requirements:EPIC-006

Labour rules and compliance flags. Admins configure overtime limits and the minimum break, and the app flags issues but never blocks.

- Defaults: 8 h per day, 40 h per week, 20-minute break after 6 h.
- Deferred from this version (low-confidence assumption):
  - Working Time Directive 48 h weekly average check.
  - 11 h daily rest check.
- Assumption: a missed break means a day with more than 6 h worked and less than the minimum break recorded.

**Related:** US-019, US-020, US-021, NFR-012

- ⚠ The WTD 48 h average and 11 h rest checks are deferred on a low-confidence assumption and need confirmation.

### US-019 · draft · source: requirements:US-019

High. Admins set the daily and weekly overtime limits and the minimum break after 6 hours, starting from defaults. Invalid values are rejected.

Priority: high.
Acceptance criteria:
- AC-062: A new installation defaults to 8 h/day, 40 h/week and a 20-minute break after 6 h.
- AC-063: Saved values apply to flags from then on.
- AC-064: Invalid values (e.g. negative numbers) are rejected with an error.

**Related:** EPIC-006, NFR-012

- ⚠ Not stated whether rule changes re-evaluate flags on past weeks.

### US-020 · draft · source: requirements:US-020

High. The timesheet flags daily overtime, weekly overtime and missed breaks. Flags never block saving, submitting or approving.

Priority: high.
Acceptance criteria:
- AC-065: A day above the daily limit is flagged as overtime.
- AC-066: A week above the weekly limit is flagged as overtime.
- AC-067: A day with more than 6 h worked and less than the minimum break is flagged as a missed break.
- AC-068: Flags do not block save, submit or approve.

**Related:** EPIC-006, NFR-012, US-011

### US-021 · draft · source: requirements:US-021

Medium. A compliance report lists overtime and missed-break flags for a date range, limited by visibility. It exports to CSV.

Priority: medium.
Users: Payroll Admin or Manager.
Acceptance criteria:
- AC-069: Lists each flag with employee, date, flag type and hours, limited to the people the user may see.
- AC-070: CSV export contains the same rows.

**Related:** EPIC-006, NFR-004

### EPIC-007 · draft · source: requirements:EPIC-007

Reports and CSV export. Covers hours, billable versus non-billable, overtime and leave taken, plus a payroll export of approved hours.

Assumptions:
- The payroll export has one CSV row per employee per period and covers approved hours only.
- Managers see their direct reports; Payroll Admins see everyone.
- Dates use day/month/year.

**Related:** US-022, US-023, US-024, US-025

- ⚠ Not stated whether the other reports include unapproved hours.

### US-022 · draft · source: requirements:US-022

High. Hours report grouped by employee, project and week, with filters. Exports to CSV.

Priority: high.
Users: Manager or Payroll Admin.
Acceptance criteria:
- AC-071: Takes a date range and optional filters; groups hours by employee, project and week for visible people.
- AC-072: CSV export contains the same rows and totals.

**Related:** EPIC-007, NFR-004, NFR-017

- ⚠ The available filters are not enumerated.

### US-023 · draft · source: requirements:US-023

Medium. Billable versus non-billable hours per project and employee, with billable value. Exports to CSV.

Priority: medium.
Users: Manager or Payroll Admin.
Acceptance criteria:
- AC-073: Shows billable and non-billable hours per project and employee for a date range.
- AC-074: Billable value = billable hours x project rate, in the company currency, for reporting only.
- AC-075: CSV export matches the on-screen data.

**Related:** EPIC-007, US-006, US-009

### US-024 · draft · source: requirements:US-024

Medium. Overtime report and leave taken report. Both export to CSV.

Priority: medium.
Users: Manager or Payroll Admin.
Acceptance criteria:
- AC-076: The overtime report shows overtime hours per employee and week, using the configured limits.
- AC-077: The leave taken report shows approved leave days per employee and leave type.
- AC-078: CSV exports match the on-screen data.

**Related:** EPIC-007, US-019

### US-025 · draft · source: requirements:US-025

High. A Payroll Admin exports approved hours per employee for a period as CSV. It contains no pay calculation and has no payroll integration.

Priority: high.
Acceptance criteria:
- AC-079: One row per employee with total approved hours for the period.
- AC-080: Hours from Draft, Submitted or Rejected sheets are excluded.
- AC-081: Non-Payroll Admins are denied.
- AC-082: No pay amounts are included, and there is no direct payroll integration.

**Related:** EPIC-007, NFR-004

- ⚠ How a period is defined (date range vs fixed pay period) is not specified.

### EPIC-008 · draft · source: requirements:EPIC-008

In-app notifications only. Email is used solely for invite and reset links.

- Email and SMS notifications are out of scope.
- Assumption: 'timesheet due' triggers when the week has ended and the sheet is not submitted.
- The exact timing should be confirmed.

**Related:** US-026, US-027

- ⚠ The exact trigger time for 'timesheet due' is not confirmed.

### US-026 · draft · source: requirements:US-026

Medium. In-app alerts for timesheet due, timesheet approved or rejected, and leave decided. No email or SMS is sent.

Priority: medium.
Users: Employee or Manager.
Acceptance criteria:
- AC-083: A timesheet-due alert is sent when the week has ended and the sheet is not submitted.
- AC-084: An alert reports the approve or reject outcome, including the comment on rejection.
- AC-085: An alert reports a leave request approved or rejected.
- AC-086: No email or SMS is sent for alert events.

**Related:** EPIC-008, US-011, US-012, US-016

- ⚠ Alerts to managers (e.g. a timesheet submitted, as implied by AC-037, or a leave request pending) are not listed.

### US-027 · draft · source: requirements:US-027

Low. Users view unread alerts newest first and mark them read.

Priority: low.
Acceptance criteria:
- AC-087: Unread alerts are listed newest first with date and time.
- AC-088: Opening or dismissing an alert marks it read and decrements the unread count.

**Related:** EPIC-008, US-010

### EPIC-009 · draft · source: requirements:EPIC-009

Audit trail. Records who changed or approved any timesheet, and when.

- Assumption: audit records are kept for 6 years by default.
- Configurable retention is deferred.

**Related:** US-028, US-029, NFR-010, NFR-011

- ⚠ Audit of non-timesheet actions (user admin, role changes, leave decisions, labour-rule changes) is not required.

### US-028 · draft · source: requirements:US-028

High. Every timesheet entry change, submission, approval, rejection and unlock is recorded immutably, with user and time.

Priority: high.
Acceptance criteria:
- AC-089: Entry create, edit or delete records the user, UTC timestamp, timesheet, and old and new values.
- AC-090: Submit, approve, reject or unlock records the actor, action and timestamp.
- AC-091: No user, including admins, can edit or delete audit records.

**Related:** EPIC-009, NFR-010, US-014

### US-029 · draft · source: requirements:US-029

Medium. Payroll Admins and System Admins view a timesheet's audit history in time order. Retention is fixed at 6 years.

Priority: medium.
Acceptance criteria:
- AC-092: History is listed in time order with user, action and time in the company time zone.
- AC-093: Employees and Managers are denied.
- AC-094: Records younger than 6 years are not removed.

**Related:** EPIC-009, NFR-004, NFR-011

- ⚠ Behaviour after 6 years (deletion or retention) is not specified.

### EPIC-010 · draft · source: requirements:EPIC-010

Data protection, localisation and platform. GDPR / UK GDPR and WTD / UK Working Time Regulations apply, on a single-tenant deployment.

- Employee time, leave and sickness data is personal data.
- Assumptions:
  - Single-tenant: one app instance, one PostgreSQL database, no scaling layer, up to 50 employees.
  - Stack stated as React, Node/TypeScript, PostgreSQL, containerised, in an EU/UK region (starting position, to be confirmed).
  - English-only UI; one company-wide time zone; responsive for mobile, no native app.
- The leaver anonymisation/export tool is deferred; leaver handling is manual by the System Admin.
- Out of scope: native app, GPS or geofenced clock-in, location map, SSO/SAML, payroll integration, invoicing, email/SMS notifications.
- 'Map' in the intake was read as MVP and confirmed by the user, though the original message was ambiguous.

**Related:** US-030, US-031, US-032, US-033, REQ-STACK

- ⚠ The stated Node/TypeScript backend conflicts with the approved FastAPI 0.115 backend (REQ-STACK).
- ⚠ The 'Map' term in the intake was ambiguous. A location map is listed as out of scope, yet EPIC-010 says 'Map' was read as MVP. This needs explicit confirmation.

### US-030 · draft · source: requirements:US-030

Critical. Personal data is protected in transit (HTTPS) and hosted in an EU/UK region. Sick leave holds no medical details.

Priority: critical.
Acceptance criteria:
- AC-095: Plain HTTP requests are refused or redirected to HTTPS.
- AC-096: The app and database run in an EU or UK region.
- AC-097: Sick leave stores only type, dates and day portion.

**Related:** EPIC-010, NFR-005, NFR-006, NFR-007

- ⚠ The story promises protection 'at rest', but no acceptance criterion verifies encryption at rest.

### US-031 · draft · source: requirements:US-031

Medium. UTC storage, display in the company time zone, day/month/year dates, an English-only UI, and no automatic public holidays.

Priority: medium.
Acceptance criteria:
- AC-098: Times are stored in UTC.
- AC-099: Times are displayed in the admin-set company time zone, including across DST changes.
- AC-100: All screens, reports and CSVs format dates as day/month/year.
- AC-101: All interface text is in English, with no language switcher.
- AC-102: No public holidays are loaded automatically.

**Related:** EPIC-010, NFR-016, NFR-017

### US-032 · draft · source: requirements:US-032

Medium. Clock in/out, timesheet and leave pages work on phone browsers. No location is captured.

Priority: medium.
Acceptance criteria:
- AC-103: Pages are usable at phone size without horizontal scrolling, and all actions are reachable.
- AC-104: No location is requested or stored on clock-in from any device.

**Related:** EPIC-010, NFR-008, NFR-015

### US-033 · draft · source: requirements:US-033

Medium. Containerised single-company deployment (one app instance, one PostgreSQL database) for up to 50 employees. SMTP is used only for invites and resets.

Priority: medium.
Acceptance criteria:
- AC-105: Serves one company only; no multi-tenant separation.
- AC-106: 50 employees on a normal working day get responses without errors on a single instance.
- AC-107: With SMTP configured, invite and reset emails are sent, and email is used for nothing else.

**Related:** EPIC-010, NFR-013, NFR-014, REQ-STACK

- ⚠ Sizing for 50 employees conflicts with the project description's 'up to 500 employees'.
- ⚠ No measurable response-time target is given.

### NFR-001 · draft · source: requirements:NFR-001

Security: passwords are stored only as salted hashes, never in plain text.

Category: security. Applies to: US-001.

**Related:** US-001

- ⚠ No hashing algorithm or parameters are specified.

### NFR-002 · draft · source: requirements:NFR-002

Security: sign-in errors are generic and do not reveal account existence. Deactivated accounts are refused.

Category: security. Applies to: US-001.

**Related:** US-001

- ⚠ No rate limiting or lockout against brute force is specified.

### NFR-003 · draft · source: requirements:NFR-003

Security: invite and reset links are single-use and time-limited. Used or expired links are rejected without changing the password.

Category: security. Applies to: US-002, US-003.

**Related:** US-002, US-003

- ⚠ No expiry duration is specified.

### NFR-004 · draft · source: requirements:NFR-004

Security: role-based access to personal data. Employees see their own data, Managers see direct reports plus themselves, and Payroll Admins see all employees in reports and the payroll export.

Category: security.
- Managers approve or reject only for direct reports.
- User admin, project setup, unlocking, audit history and the payroll export are refused to roles not allowed them.

**Related:** US-002, US-004, US-005, US-012, US-014, US-016, US-021, US-022, US-023, US-024, US-025, US-029

### NFR-005 · draft · source: requirements:NFR-005

Security: HTTPS only; plain HTTP is refused or redirected. Data is protected at rest.

Category: security. Applies to: US-030.

**Related:** US-030

- ⚠ The at-rest protection mechanism is unspecified and not covered by an acceptance criterion.

### NFR-006 · draft · source: requirements:NFR-006

Privacy: the app and database run in an EU or UK region, for GDPR and UK GDPR.

Category: privacy. Applies to: US-030. AWS London or Ireland is named in the stack rationale.

**Related:** US-030, REQ-STACK

- ⚠ The specific region is not chosen.

### NFR-007 · draft · source: requirements:NFR-007

Privacy: sick leave stores only type, dates and day portion. The form allows no medical details.

Category: privacy. Applies to: US-015, US-030.

**Related:** US-015, US-030

### NFR-008 · draft · source: requirements:NFR-008

Privacy: no location is requested or stored at clock-in.

Category: privacy. Applies to: US-007, US-032.

**Related:** US-007, US-032

### NFR-009 · draft · source: requirements:NFR-009

Privacy (accepted risk): the leaver data export and anonymisation tool is deferred. The System Admin handles leaver data manually.

Category: privacy, accepted risk. Applies to: whole system.

- ⚠ No manual procedure for leaver data is documented.
- ⚠ It is unclear how manual leaver handling reconciles with immutable 6-year audit records (NFR-010/NFR-011).

### NFR-010 · draft · source: requirements:NFR-010

Compliance: a complete, tamper-proof audit trail of timesheet changes, submissions, approvals, rejections and unlocks. No one can edit or delete audit records.

Category: compliance.
- Records the user and UTC time.
- Entry changes also record old and new values.

**Related:** US-014, US-028, US-029

### NFR-011 · draft · source: requirements:NFR-011

Compliance: audit records are kept for 6 years and not removed earlier. Retention is not configurable in this version.

Category: compliance. Target: 6 years retention.

**Related:** US-029

### NFR-012 · draft · source: requirements:NFR-012

Compliance: working-time rules (WTD / UK WTR) are only flagged and never block. The 48 h weekly average and 11 h rest checks are deferred.

Category: compliance. Target defaults: 8 h per day, 40 h per week, 20-minute break after 6 h.

**Related:** US-011, US-019, US-020

- ⚠ The WTD 48 h average and 11 h daily rest checks are deferred.

### NFR-013 · draft · source: requirements:NFR-013

Scalability: single-tenant deployment on one app instance and one PostgreSQL database, serving up to 50 employees without errors on a normal working day.

Category: scalability. Target: up to 50 employees on a single app instance.

**Related:** US-033

- ⚠ Conflicts with the 'up to 500 employees' in the project description.
- ⚠ No latency target is given.

### NFR-014 · draft · source: requirements:NFR-014

Scalability (accepted risk): no horizontal scaling or caching layer, and no multi-tenant separation.

Category: scalability, accepted risk. Sized only for one company of up to 50 employees.

**Related:** US-033

### NFR-015 · draft · source: requirements:NFR-015

Usability: the clock in/out, timesheet and leave request pages work in phone-sized browsers without horizontal scrolling.

Category: usability. No native app is built.

**Related:** US-007, US-008, US-015, US-032

### NFR-016 · draft · source: requirements:NFR-016

Usability: times are stored in UTC and shown in one company-wide time zone, including across DST changes.

Category: usability. Applies to: US-031.

**Related:** US-031

### NFR-017 · draft · source: requirements:NFR-017

Usability: day/month/year dates on all screens, reports and CSVs. English-only interface with no language switcher.

Category: usability. Applies to: US-031, US-008, US-022.

**Related:** US-031, US-008, US-022
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-04

**Capabilities in scope:** Email and password sign-in, Employee accounts created by an admin, Clock in and out with breaks from the browser, Weekly timesheet entry by day, Charging each entry to a project and task, Billable and non-billable marking on entries, Client, project and task maintenance by admins, Hourly bill rate per project, Employee dashboard of own hours this week, Weeks run Monday to Sunday, Times stored in UTC and shown in one company-wide time zone, Day/month/year date format, English-only interface, Responsive web app for mobile browsers, no native app, Bill rates for reporting only, with no invoicing or payroll calculation, Bill rate currency is configurable (default EUR or GBP)

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The earlier assumption was Node/TypeScript, but that isn't on the available list, so FastAPI is the closest option. It is a Python API that handles your rules well: overtime and missed-break flags, leave accrual, approval workflows, audit records and CSV exports. It checks incoming data automatically, which helps with timesheet entries and admin settings. At 50 employees it runs comfortably as one small service. |
| cloud | AWS | You need EU/UK hosting for GDPR / UK GDPR, and AWS has regions in London and Ireland, so employee data stays in the right jurisdiction. Containerised hosting of one app and one managed PostgreSQL database fits your single-tenant setup. You set no hosting constraint, so the platform default is a safe choice. |
| database | PostgreSQL | Your data is highly relational: employees, managers, clients, projects, tasks, time entries, leave and audit records. It must also stay consistent when a sheet is approved and locked. PostgreSQL handles this well and matches the single-database deployment you confirmed. It also handles the reports (hours by employee, project and week) with plain queries. |
| frontend | React | You confirmed React as the starting position. It suits what you described: a weekly timesheet grid, a clock in/out screen, approval queues and reports. It also needs to work well in a phone browser, since you ruled out a native app. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Users, roles and sign-in

Four roles: Employee, Manager, Payroll Admin, System Admin. Sign-in is by email and password. Admins create users and assign each employee a manager. Assumption: at 50 employees one person may hold both admin roles. Assumption: email is used only for invite and password-reset links, sent through an SMTP provider that needs SMTP credentials. Password reset is initiated by an admin, as in the architecture finding. Self-service reset is not specified.

### US-001: Sign in with email and password

**Priority:** critical

> As a user of any role, I want to sign in with my email and password, so that I can reach the features my role allows.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | an active account with a password set | the user submits the correct email and password | the user is signed in and sees the home screen for their role |
| AC-002 | an active account | the user submits a wrong password | sign-in is refused with a generic error that does not reveal whether the email exists |
| AC-003 | a deactivated account | the user submits the correct credentials | sign-in is refused |
| AC-004 | stored credentials | the database is inspected | passwords are stored only as salted hashes, never in plain text |

### US-002: Admin creates user accounts and assigns a manager

**Priority:** critical

> As a System Admin or Payroll Admin, I want to create users, give each a role and assign each employee a manager, so that people can sign in and approvals route to the right manager.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | I am signed in as an admin | I create a user with name, email, role and manager | the account is saved and an invite link is emailed so the user can set a password |
| AC-006 | an email address already in use | I try to create another user with it | creation is refused with a clear message |
| AC-007 | an existing employee | I change their manager | future submissions and leave requests route to the new manager |
| AC-008 | I am signed in as an Employee or Manager | I try to open user administration | access is denied |
| AC-009 | one person needs both admin duties | an admin assigns that person both the Payroll Admin and System Admin roles | the person has the permissions of both roles |

### US-003: Admin-initiated password reset

**Priority:** medium

> As a admin, I want to send a user a password-reset link, so that a user who has lost their password can regain access.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | an existing user | an admin triggers a password reset | an email with a single-use, time-limited link is sent to the user |
| AC-011 | a reset link that has been used or has expired | the user opens it | it is rejected and the password does not change |

### US-004: Role-based access to data

**Priority:** high

> As a System Admin, I want each role to see only the data it needs, so that personal data is protected.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I am an Employee | I request any timesheet, leave or report data | I see only my own |
| AC-013 | I am a Manager | I request timesheets, leave requests or reports | I see only my direct reports (and my own data) |
| AC-014 | I am a Manager | I try to approve a timesheet or leave request of someone who is not my direct report | the action is refused |
| AC-015 | I am a Payroll Admin | I open reports and the payroll export | I can see all employees |

## EPIC-002: Clients, projects and tasks

Admins maintain the structure that time is charged to. Each project has an hourly bill rate used for reporting only. No invoicing, payments or payroll calculation is built. The currency is configurable per company, default EUR or GBP.

### US-005: Maintain clients, projects and tasks

**Priority:** critical

> As a admin, I want to create and edit clients, projects under clients, and tasks under projects, so that employees can charge their time correctly.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am signed in as an admin | I create a client, then a project for that client, then a task for that project | all three are saved and the project and task appear in employees' selection lists |
| AC-017 | I am an Employee or Manager | I try to create or edit a client, project or task | the action is refused |
| AC-018 | a project that already has time entries | an admin renames it | existing entries keep their link to the project and show the new name |

### US-006: Hourly bill rate per project and currency

**Priority:** medium

> As a admin, I want to set an hourly bill rate on each project and choose the company currency, so that reports can show billable value.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | a project | an admin enters an hourly bill rate | the rate is saved and shown on the project |
| AC-020 | company settings | an admin selects the currency (default EUR or GBP) | all bill rates and billable values are shown in that currency |
| AC-021 | the application | a bill rate is saved | it is used only in reports and no invoice, payment or payroll amount is produced |

## EPIC-003: Time tracking

Employees record time by clock in and out with breaks from the browser, or by a weekly timesheet by day. Every entry is charged to a project and task and marked billable or non-billable. Weeks run Monday to Sunday. Times are stored in UTC and shown in the company time zone. Assumption: approved leave appears on the timesheet (see Time off).

### US-007: Clock in and out with breaks

**Priority:** critical

> As a Employee, I want to clock in, start and end breaks, and clock out in my browser, so that my working time is recorded without manual calculation.

| ID | Given | When | Then |
|---|---|---|---|
| AC-022 | I am not clocked in | I clock in and choose a project, task and billable flag | a running entry starts at the current time |
| AC-023 | I am clocked in | I start a break and later end it | the break is recorded and excluded from worked time |
| AC-024 | I am clocked in | I clock out | the entry is closed and worked time equals elapsed time minus breaks |
| AC-025 | I am already clocked in | I try to clock in again | it is refused and my running entry is shown |
| AC-026 | the week's timesheet is submitted or approved | I try to clock in for a day in that week | it is refused with a message that the sheet is not editable |

### US-008: Weekly timesheet entry by day

**Priority:** critical

> As a Employee, I want to fill a weekly timesheet with hours for each day, so that I can record time I did not clock.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | I open a week | the timesheet loads | it shows Monday to Sunday with dates in day/month/year format and totals per day and week |
| AC-028 | an editable timesheet | I enter hours and break time for a day against a project and task | the entry is saved and totals update |
| AC-029 | a clocked entry exists | I view the timesheet | the clocked entry appears as a row I can edit while the sheet is editable |
| AC-030 | a timesheet in submitted or approved status | I try to edit it | editing is not allowed |

### US-009: Charge each entry to a project and task and mark billable

**Priority:** critical

> As a Employee, I want to pick a project and task and mark each entry billable or non-billable, so that time is reported against the right work.

| ID | Given | When | Then |
|---|---|---|---|
| AC-031 | I am saving an entry | I leave project or task empty | the entry is not saved and the missing field is indicated |
| AC-032 | I am saving an entry | I choose a task that does not belong to the selected project | it is not possible; only tasks of the chosen project are offered |
| AC-033 | an entry | I set it billable or non-billable | the flag is saved and used by the billable reports |

### US-010: Employee dashboard of own hours this week

**Priority:** medium

> As a Employee, I want a dashboard showing my hours for the current week, so that I can see my progress, status and any alerts at a glance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-034 | I sign in as an Employee | the dashboard loads | it shows my total hours for the current Monday to Sunday week, split by day, and the sheet status |
| AC-035 | I have a running clock entry | the dashboard loads | it shows that I am clocked in and offers clock-out and break controls |
| AC-036 | I have unread notifications | the dashboard loads | the unread count is visible |

## EPIC-004: Timesheet approval

Employees submit a week and their manager approves or rejects it with a comment. A rejected sheet returns for editing and approved sheets are locked. Assumptions: managers approve only direct reports. Only a Payroll Admin can unlock an approved timesheet, and the unlock is audited.

### US-011: Submit a weekly timesheet

**Priority:** critical

> As a Employee, I want to submit my week for approval, so that my manager can review my hours.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | an editable timesheet with entries | I submit it | its status becomes Submitted, it is locked from editing and my manager is notified in-app |
| AC-038 | a timesheet with a clock entry still running | I try to submit | submission is refused until I clock out |
| AC-039 | flagged overtime or missed breaks on the sheet | I submit | submission still succeeds, because flags never block |

### US-012: Manager approves or rejects with a comment

**Priority:** critical

> As a Manager, I want to approve or reject a direct report's submitted timesheet with a comment, so that only reviewed hours go to payroll.

| ID | Given | When | Then |
|---|---|---|---|
| AC-040 | a Submitted timesheet of my direct report | I approve it | its status becomes Approved and it is locked |
| AC-041 | a Submitted timesheet of my direct report | I reject it without a comment | rejection is refused and a comment is required |
| AC-042 | a Submitted timesheet of my direct report | I reject it with a comment | its status becomes Rejected and the employee sees my comment |
| AC-043 | a timesheet of someone who is not my direct report | I try to open or decide it | access is denied |

### US-013: Edit and resubmit a rejected timesheet

**Priority:** high

> As a Employee, I want a rejected timesheet to return for editing, so that I can correct it and resubmit.

| ID | Given | When | Then |
|---|---|---|---|
| AC-044 | my timesheet was rejected | I open it | it is editable and shows the manager's comment |
| AC-045 | I have corrected a rejected timesheet | I resubmit it | it returns to Submitted for my manager |

### US-014: Approved timesheets are locked; Payroll Admin can unlock

**Priority:** high

> As a Payroll Admin, I want approved timesheets to be locked and to be able to unlock one when needed, so that approved hours stay reliable and corrections are controlled.

| ID | Given | When | Then |
|---|---|---|---|
| AC-046 | an approved timesheet | an Employee or Manager tries to edit it | the change is refused |
| AC-047 | an approved timesheet | a Payroll Admin unlocks it | it becomes editable again and the unlock is recorded in the audit trail with user and time |
| AC-048 | an approved timesheet | a user without the Payroll Admin role tries to unlock it | the action is refused |

## EPIC-005: Time off

Employees request annual, sick or unpaid leave for full or half days and the manager approves it. Assumptions: leave accrual is one company-wide number of days per month per leave type; unpaid leave has no balance; approved leave shows on the timesheet; sick leave is stored as a leave type only, with no medical details; public holidays are not loaded automatically.

### US-015: Request leave

**Priority:** high

> As a Employee, I want to request annual, sick or unpaid leave for full or half days, so that my absence is recorded and approved.

| ID | Given | When | Then |
|---|---|---|---|
| AC-049 | I am signed in | I request leave with a type, start date, end date and full or half day | the request is saved as Pending and my manager is able to see it |
| AC-050 | a leave request form | I choose sick leave | no medical details can be entered; only the leave type is stored |
| AC-051 | a leave request | the end date is before the start date | the request is not saved and an error is shown |
| AC-052 | a request for annual leave larger than my balance | I submit it | it is not blocked, and the manager sees the balance alongside the request (assumption: to be confirmed) |

### US-016: Manager decides leave requests

**Priority:** high

> As a Manager, I want to approve or reject my direct reports' leave requests, so that leave is authorised and employees are informed.

| ID | Given | When | Then |
|---|---|---|---|
| AC-053 | a Pending request from my direct report | I approve or reject it | its status updates and the employee gets an in-app notification |
| AC-054 | a request from someone who is not my direct report | I try to decide it | access is denied |
| AC-055 | an approved annual leave request | it is approved | the days are deducted from the employee's annual balance |

### US-017: Leave balance with monthly accrual

**Priority:** high

> As a Employee, I want to see my leave balance, so that I know how many days I can take.

| ID | Given | When | Then |
|---|---|---|---|
| AC-056 | an admin has set a company-wide number of days per month for a leave type | a new month starts | each employee's balance for that type increases by that number of days |
| AC-057 | I open my leave page | it loads | I see my balance, approved leave taken and pending requests per leave type that has a balance |
| AC-058 | unpaid leave | I view balances | no balance is kept or shown for unpaid leave |
| AC-059 | an admin | they change the accrual days per month | the new value applies from the next accrual and past accruals are not rewritten |

### US-018: Approved leave shown on the timesheet

**Priority:** medium

> As a Employee, I want approved leave to appear on my weekly timesheet, so that my week is complete and hours match my absence.

| ID | Given | When | Then |
|---|---|---|---|
| AC-060 | I have approved leave on a day in the week | I open that week's timesheet | the day is marked with the leave type and full or half day |
| AC-061 | approved leave on a day | totals are calculated | leave is not counted as worked hours or overtime |

## EPIC-006: Labour rules and compliance flags

Admins configure daily and weekly overtime limits and the minimum break after 6 hours. Defaults: 8 h per day, 40 h per week, 20-minute break after 6 h. The app flags only and never blocks. Deferred from this version: the WTD 48 h weekly average check and the 11 h daily rest check (low-confidence assumption). Assumption: a missed break means a day with more than 6 h worked and less than the minimum break recorded.

### US-019: Configure labour rules

**Priority:** high

> As a admin, I want to set the daily overtime limit, weekly overtime limit and minimum break after 6 hours, so that flags follow the company's rules.

| ID | Given | When | Then |
|---|---|---|---|
| AC-062 | a new installation | an admin opens labour rules | the values are 8 h per day, 40 h per week and a 20-minute break after 6 h |
| AC-063 | an admin | they save new values | the new values are used for flags from then on |
| AC-064 | an invalid value such as a negative number | an admin saves | it is rejected with an error |

### US-020: Flag overtime and missed breaks on the timesheet

**Priority:** high

> As a Employee or Manager, I want overtime and missed breaks to be flagged on the timesheet, so that issues are visible during entry and review.

| ID | Given | When | Then |
|---|---|---|---|
| AC-065 | a day with worked hours above the daily limit | the timesheet is shown | the day is flagged as overtime |
| AC-066 | a week with worked hours above the weekly limit | the timesheet is shown | the week is flagged as overtime |
| AC-067 | a day with more than 6 h worked and less than the minimum break recorded | the timesheet is shown | the day is flagged as a missed break |
| AC-068 | a flagged timesheet | the employee saves or submits, or the manager approves | the action is not blocked |

### US-021: Compliance report

**Priority:** medium

> As a Payroll Admin or Manager, I want a compliance report listing overtime and missed-break flags, so that I can review working-time compliance across people and weeks.

| ID | Given | When | Then |
|---|---|---|---|
| AC-069 | I choose a date range | I run the compliance report | it lists each flag with employee, date, flag type and hours, limited to the people I am allowed to see |
| AC-070 | the compliance report | I export it | a CSV with the same rows is downloaded |

## EPIC-007: Reports and CSV export

Reports: hours by employee, project and week; billable versus non-billable hours; overtime; leave taken. All export to CSV, including a payroll export. Assumptions: payroll export is one CSV row per employee per period and covers approved hours only. Managers see their direct reports, Payroll Admins see everyone. Dates use day/month/year.

### US-022: Hours report by employee, project and week

**Priority:** high

> As a Manager or Payroll Admin, I want hours grouped by employee, project and week, so that I can see where time went.

| ID | Given | When | Then |
|---|---|---|---|
| AC-071 | a date range and optional filters | I run the report | I see hours grouped by employee, project and week for the people I may see |
| AC-072 | the report is displayed | I export to CSV | the file contains the same rows and totals |

### US-023: Billable versus non-billable report

**Priority:** medium

> As a Manager or Payroll Admin, I want billable and non-billable hours compared, with billable value, so that I can see utilisation and project value.

| ID | Given | When | Then |
|---|---|---|---|
| AC-073 | a date range | I run the report | it shows billable and non-billable hours per project and employee |
| AC-074 | projects with bill rates | I run the report | billable value equals billable hours times the project rate in the company currency, for reporting only |
| AC-075 | the report | I export to CSV | the file matches the on-screen data |

### US-024: Overtime and leave taken reports

**Priority:** medium

> As a Manager or Payroll Admin, I want overtime and leave taken reports, so that I can monitor overtime and absence.

| ID | Given | When | Then |
|---|---|---|---|
| AC-076 | a date range | I run the overtime report | it shows overtime hours per employee and week, using the configured limits |
| AC-077 | a date range | I run the leave taken report | it shows approved leave days per employee and leave type |
| AC-078 | either report | I export to CSV | the file matches the on-screen data |

### US-025: Payroll export of approved hours

**Priority:** high

> As a Payroll Admin, I want to export approved hours per employee for a period as CSV, so that I can pass them to payroll.

| ID | Given | When | Then |
|---|---|---|---|
| AC-079 | a chosen period | I run the payroll export | the CSV has one row per employee with the total of approved hours in that period |
| AC-080 | timesheets in Draft, Submitted or Rejected status | I run the payroll export | their hours are not included |
| AC-081 | I am not a Payroll Admin | I try the payroll export | access is denied |
| AC-082 | the export | it is generated | no payroll calculation such as pay amounts is included; direct payroll integration is not provided |

## EPIC-008: In-app notifications

In-app alerts only. Email and SMS notifications are out of scope. Email is used only for invite and password-reset links. Assumption: 'timesheet due' triggers when the week has ended and the sheet is not yet submitted. The exact timing was not specified and should be confirmed.

### US-026: Receive in-app alerts

**Priority:** medium

> As a Employee or Manager, I want in-app alerts for a timesheet due, a timesheet approved or rejected, and a leave request decided, so that I know when to act.

| ID | Given | When | Then |
|---|---|---|---|
| AC-083 | a week has ended and my timesheet is not submitted | the due point is reached | I get a timesheet-due alert |
| AC-084 | my manager approves or rejects my timesheet | the decision is saved | I get an alert stating the outcome, including the comment on rejection |
| AC-085 | my manager decides my leave request | the decision is saved | I get an alert stating approved or rejected |
| AC-086 | an event that triggers an alert | it happens | no email or SMS is sent |

### US-027: View and clear notifications

**Priority:** low

> As a user, I want to see unread alerts and mark them read, so that I can keep track of what needs attention.

| ID | Given | When | Then |
|---|---|---|---|
| AC-087 | I have unread alerts | I open the notification list | they are shown newest first with date and time |
| AC-088 | an unread alert | I open or dismiss it | it is marked read and the unread count decreases |

## EPIC-009: Audit trail

The app records who changed or approved any timesheet, and when. Assumption: audit records are kept for 6 years by default. Configurable retention is deferred.

### US-028: Record changes and approvals of timesheets

**Priority:** high

> As a Payroll Admin, I want every timesheet change, submission, approval, rejection and unlock recorded with user and time, so that hours can be traced for payroll and legal review.

| ID | Given | When | Then |
|---|---|---|---|
| AC-089 | a timesheet entry is created, edited or deleted | the change is saved | an audit record stores the user, UTC timestamp, the timesheet and the old and new values |
| AC-090 | a timesheet is submitted, approved, rejected or unlocked | the action completes | an audit record stores the actor, action and timestamp |
| AC-091 | any user, including admins | they use the application | they cannot edit or delete audit records |

### US-029: View audit history and retention

**Priority:** medium

> As a Payroll Admin or System Admin, I want to view the audit history of a timesheet and know how long records are kept, so that I can answer who changed what and when.

| ID | Given | When | Then |
|---|---|---|---|
| AC-092 | a timesheet | an admin opens its audit history | records are listed in time order with user, action and time in the company time zone |
| AC-093 | an Employee or Manager | they try to open the audit history | access is denied |
| AC-094 | audit records younger than 6 years | retention is applied | they are not removed (retention fixed at 6 years in this version) |

## EPIC-010: Data protection, localisation and platform

GDPR / UK GDPR and the Working Time Directive / UK Working Time Regulations apply. Employee time, leave and sickness data is personal data. Assumptions: single-tenant deployment (one app instance, one PostgreSQL database, no scaling layer) for up to 50 employees; stack React, Node/TypeScript, PostgreSQL, containerised, hosted in an EU/UK region (starting position, to be confirmed at the stack screen); English-only UI; one company-wide time zone; responsive for mobile browsers with no native app. The leaver anonymisation/export tool is deferred in this version, so leaver handling is manual by the System Admin until a later version. Out of scope: native app, GPS or geofenced clock-in, location map, SSO/SAML, payroll integration, invoicing, email/SMS notifications. 'Map' in the intake was read as MVP and confirmed by the user, though the original message was ambiguous.

### US-030: Protect personal data

**Priority:** critical

> As a System Admin, I want data protected in transit and at rest in an EU/UK region, so that the company meets GDPR / UK GDPR.

| ID | Given | When | Then |
|---|---|---|---|
| AC-095 | any request to the app | it is made over plain HTTP | it is refused or redirected to HTTPS |
| AC-096 | the deployment | it is hosted | the application and database run in an EU or UK region |
| AC-097 | sick leave data | it is stored | only the leave type, dates and day portion are held, with no medical details |

### US-031: Company time zone, date format, currency and language

**Priority:** medium

> As a user, I want times shown in the company time zone, dates as day/month/year and an English interface, so that everyone reads the same consistent values.

| ID | Given | When | Then |
|---|---|---|---|
| AC-098 | times are saved | they are stored | they are stored in UTC |
| AC-099 | an admin has set the company time zone | any user views times | times are shown in that time zone, including across daylight-saving changes |
| AC-100 | any screen, report or CSV showing a date | it is displayed | the date is formatted day/month/year |
| AC-101 | the application | any user opens it | all interface text is in English and there is no language switcher |
| AC-102 | public holidays | a week is displayed | no public holidays are loaded automatically |

### US-032: Use the web app on a mobile browser

**Priority:** medium

> As a Employee, I want the web app to work on my phone browser, so that I can clock in and out and check my timesheet away from a desk.

| ID | Given | When | Then |
|---|---|---|---|
| AC-103 | a phone-sized browser window | I use clock in/out, the timesheet, and leave request pages | they are usable without horizontal scrolling and all actions are reachable |
| AC-104 | the clock-in action | I clock in from any device | no location is requested or stored |

### US-033: Single-tenant deployment for up to 50 employees

**Priority:** medium

> As a System Admin, I want a containerised single-company deployment with one app instance and one PostgreSQL database, so that the company can run it simply at its size.

| ID | Given | When | Then |
|---|---|---|---|
| AC-105 | a deployment | it is set up | it serves one company only, with no multi-tenant data separation required |
| AC-106 | 50 employees using the app on a normal working day | they clock in, edit timesheets and run reports | pages respond without errors on a single app instance |
| AC-107 | SMTP credentials are configured | an invite or reset is triggered | the link email is sent, and email is used for nothing else |
<!-- sdlc:auto:end epics -->
