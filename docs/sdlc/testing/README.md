# Testing

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### TEST-RUNCHECKS-1 · draft · source: testing:run_checks

An automated run_checks execution completed successfully, with 4 of 4 checks passing. The run was not associated with any ticket.

- Check runner: run_checks
- Ticket: none (ticket=None)
- Result status: succeeded
- Detail as reported: "4/4 checks passed"
- Number of checks: 4
- Failures: 0
- Date/time of run: not provided
- Who or what triggered the run: not provided

- ⚠ The names, types and scope of the 4 checks are not given. It is unknown whether they are unit tests, lint, type checks, a build or something else.
- ⚠ The run is not linked to a ticket (ticket=None), so it cannot be traced to a development change.
- ⚠ The run is not linked to any requirement (US-001 to US-033), so no requirement can be marked as verified from this result.
- ⚠ No run date or timestamp is provided.
- ⚠ The environment and build/commit under test are not identified.
- ⚠ No test logs, artefacts or coverage figures are provided.

### TEST-COVERAGE-GAP · draft

No testing input confirms verification of any of the 33 known requirements. The functional areas in the project description have no recorded test cases or results.

The project description defines these functional areas. No test evidence was supplied for any of them:
- Sign-in with email and password, and the four roles (Employee, Manager, Payroll Admin, System Admin)
- Admin creation of users and assignment of a manager to each employee
- Clock in/out with breaks, and weekly timesheet entry by day
- Charging time entries to a project and task, with billable/non-billable marking
- Admin management of clients, projects and tasks, with hourly bill rates
- Timesheet submission, manager approve/reject with comment, return of rejected sheets for editing, and locking of approved sheets
- Leave requests (annual, sick, unpaid; full or half day), manager approval, and leave balance accrual per month
- Admin-configured daily/weekly overtime limits and minimum break after 6 hours
- Flagging of overtime and missed breaks on timesheets and in the compliance report
- Reports for hours by employee, project and week; billable vs non-billable; overtime; leave taken
- CSV export, including the payroll export of approved hours per employee per period
- In-app notifications for timesheet due, approved or rejected, and leave decided
- Audit record of who changed or approved any timesheet, and when

The input does not map the requirement keys US-001 to US-033 to these areas, so this entry links all keys collectively rather than individually.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-019, US-020, US-021, US-022, US-023, US-024, US-025, US-026, US-027, US-028, US-029, US-030, US-031, US-032, US-033

- ⚠ No test plan or test cases are provided for any requirement.
- ⚠ No requirement-to-test traceability exists. Each of US-001 to US-033 is currently unverified.
- ⚠ No role-based access control or permission testing is recorded.
- ⚠ No tests are recorded for the overtime and break-rule calculations. These are business-critical labour-rule logic (e.g. 8 h/day, 40 h/week, break after 6 h).
- ⚠ No tests are recorded for timesheet locking after approval, or for audit trail completeness.
- ⚠ No tests are recorded for the accuracy of the payroll CSV export (approved hours only, per employee per period).
- ⚠ No tests are recorded for leave balance accrual or half-day handling.
- ⚠ No performance or load testing is recorded for the stated scale of up to 500 employees.
- ⚠ No security testing is recorded (authentication, password handling, session management).
- ⚠ No user acceptance testing or sign-off is recorded.
- ⚠ No defects or bug reports are recorded, and it is unknown whether any exist.
- ⚠ No industry or domain skill was specified, so no regulatory compliance tracing was performed.
<!-- sdlc:auto:end narrative -->
