# Deployment

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEP-3d13b3f26251 · draft · source: deployment:3d13b3f26251

Release 3d13b3f26251 of TimeTrack Pro is recorded with status "live". It consists of a frontend and a backend, each with its own public URL. No date, approver, or release notes were provided.

- Version: 3d13b3f26251 (appears to be a commit hash or build identifier; the input does not say which)
- Reported status: live
- Frontend URL: https://pb05224319b77.d3j61xaup4zgrx.amplifyapp.com
- Backend URL: https://32-189-101-24.sslip.io/apps/b05224319b77/
- Entry status is set to 'draft' because no release approval is recorded in the input. The deployment itself is reported as live.

**Related:** DEP-3d13b3f26251-FE, DEP-3d13b3f26251-BE

- ⚠ No deployment date or time recorded.
- ⚠ No record of who performed or approved this deployment.
- ⚠ No release notes, and no list of which requirements (US-001 to US-033) are included in this version. related_ids to requirements cannot be set.
- ⚠ Environment type is not stated (production, staging, or demo). 'Live' alone does not confirm this is the production environment for end users.
- ⚠ No post-deployment smoke test or health-check results recorded.
- ⚠ No rollback plan or previous version identifier recorded.
- ⚠ No monitoring, logging, or alerting configuration recorded.
- ⚠ No database or migration details recorded. This matters because the app stores timesheets, leave balances, payroll exports, and audit history (US-related audit requirement).
- ⚠ No backup or data-retention arrangements recorded for timesheet and audit data.

### DEP-3d13b3f26251-FE · draft · source: deployment:3d13b3f26251

The frontend web application for release 3d13b3f26251 is served from an AWS Amplify hosted URL over HTTPS.

- URL: https://pb05224319b77.d3j61xaup4zgrx.amplifyapp.com
- Hosting: AWS Amplify, inferred only from the amplifyapp.com domain. No hosting configuration was provided.
- Protocol: HTTPS

**Related:** DEP-3d13b3f26251

- ⚠ No custom domain recorded. The default Amplify domain is in use, and it is not stated whether this is intended for end users.
- ⚠ No confirmation that the frontend is configured to call the backend URL listed for this release.
- ⚠ No browser compatibility or accessibility verification recorded for the deployed build.

### DEP-3d13b3f26251-BE · draft · source: deployment:3d13b3f26251

The backend for release 3d13b3f26251 is exposed at an HTTPS path on an sslip.io hostname that resolves to IP 32.189.101.24. No hosting or infrastructure details were provided.

- URL: https://32-189-101-24.sslip.io/apps/b05224319b77/
- Hostname pattern: sslip.io is a wildcard DNS service that maps the hostname to IP 32.189.101.24.
- App path segment: /apps/b05224319b77/. This matches the identifier in the frontend hostname (pb05224319b77), which suggests both URLs belong to the same app instance. This is an inference, not stated in the input.

**Related:** DEP-3d13b3f26251

- ⚠ Use of an sslip.io hostname (a direct IP mapping) should be confirmed as intended. It may not be suitable for a production system handling employee sign-in credentials and payroll data.
- ⚠ No information on the hosting provider, server or runtime, scaling, or availability for up to 500 employees.
- ⚠ No record of TLS certificate management, CORS configuration, or security hardening.
- ⚠ No record of how secrets and credentials (e.g. database, password hashing configuration) are managed in this environment.
- ⚠ No API health-check result recorded for this deployment.
<!-- sdlc:auto:end narrative -->
