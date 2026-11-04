# Deployment

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEP-a08a3ea55954 · approved · source: deployment:a08a3ea55954

TimeTrack Pro version a08a3ea55954 is recorded as live. The release has a separate frontend and backend, each with its own public URL. No other deployment metadata was supplied.

- Deployment status: live
- Version identifier: a08a3ea55954. This looks like a short source-control commit hash, but the input does not confirm it.
- Frontend URL: https://pb05224319b77.d3j61xaup4zgrx.amplifyapp.com
- Backend URL: https://32-189-101-24.sslip.io/apps/b05224319b77/
- Both URLs use HTTPS.
- Status is set to 'approved' only because the input says the release is live. No explicit sign-off or approver was provided.

**Related:** DEP-a08a3ea55954-FE, DEP-a08a3ea55954-BE

- ⚠ No deployment date or time was recorded.
- ⚠ No deployer or release approver was recorded.
- ⚠ The environment is not labelled (production, staging, or demo). 'Live' alone does not say whether this is the production release for the up-to-500-employee company.
- ⚠ No release notes were provided. It is unknown which requirements (US-001 to US-033) are included in this version, so related_ids cannot be linked to specific requirements.
- ⚠ No pre-deployment test or QA results are referenced for this version.
- ⚠ No post-deployment smoke-test or health-check results were recorded.
- ⚠ No rollback plan or previous version was recorded.
- ⚠ No database migration, seed data, or initial System Admin account setup steps were recorded. The app depends on admins creating users and assigning managers.
- ⚠ No monitoring, logging, alerting, or backup configuration was recorded. This matters because the app stores timesheet, payroll-export, and audit-trail data.
- ⚠ The version is the same string for frontend and backend. It is not stated whether both components were built from the same commit.

### DEP-a08a3ea55954-FE · approved · source: deployment:a08a3ea55954

Public frontend endpoint for the live TimeTrack Pro web app. This is the browser entry point that employees, managers, payroll admins, and system admins would use.

- URL: https://pb05224319b77.d3j61xaup4zgrx.amplifyapp.com
- Protocol: HTTPS
- Hosting: the amplifyapp.com domain suggests AWS Amplify Hosting. This is inferred from the URL only and is not stated in the input.
- Version: a08a3ea55954

**Related:** DEP-a08a3ea55954

- ⚠ No custom or company domain is recorded. The URL is a generated hosting subdomain, so it should be confirmed whether this is the intended long-term user-facing address.
- ⚠ It is not recorded how the frontend is configured to reach the backend URL (for example, environment variables or build-time config).
- ⚠ Browser support and accessibility checks for the deployed build are not recorded.

### DEP-a08a3ea55954-BE · approved · source: deployment:a08a3ea55954

Public backend endpoint for the live TimeTrack Pro release. It serves the frontend and is assumed to host authentication, time entries, approvals, leave, reports, CSV export, notifications, and audit logging, but the input does not confirm what it serves.

- URL: https://32-189-101-24.sslip.io/apps/b05224319b77/
- Protocol: HTTPS
- Hostname: sslip.io is a wildcard DNS service that maps the hostname to the embedded IP address, here 32.189.101.24. The backend is therefore addressed by that IP rather than a dedicated domain.
- Path prefix: /apps/b05224319b77/. This suggests a shared host serving several apps, but that is inferred and not stated.
- Version: a08a3ea55954

**Related:** DEP-a08a3ea55954

- ⚠ The backend is reached through an IP-based sslip.io hostname. It should be confirmed whether this is acceptable for a live system holding employee time, leave, and payroll data, or whether a dedicated domain and certificate are planned.
- ⚠ Server hosting provider, runtime, scaling, and capacity for up to 500 employees are not recorded.
- ⚠ Database location, backup schedule, and data-retention settings are not recorded. This matters especially for audit records of timesheet changes and approvals.
- ⚠ CORS, authentication/session configuration, and secrets management for the deployed backend are not recorded.
- ⚠ It is not recorded whether the shared host (/apps/ path) isolates this app's data from other apps.
<!-- sdlc:auto:end narrative -->
