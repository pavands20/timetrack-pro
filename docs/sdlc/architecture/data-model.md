# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| email | citext unique | False | — | False |
| full_name | text | False | — | False |
| password_hash | text (argon2id) | False | — | True |
| manager_id | uuid | False | users.id | True |
| is_active | boolean | False | — | False |
| created_at | timestamptz | False | — | False |

### user_roles

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| user_id | uuid | True | users.id | False |
| role | enum(employee,manager,payroll_admin,system_admin) | True | — | False |

### auth_tokens

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| purpose | enum(invite,reset) | False | — | False |
| token_hash | text unique | False | — | False |
| expires_at | timestamptz | False | — | False |
| used_at | timestamptz | False | — | True |

### company_settings

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | smallint (single row) | True | — | False |
| time_zone | text (IANA, e.g. Europe/London) | False | — | False |
| currency | char(3) default EUR | False | — | False |
| daily_limit_minutes | int check >0 default 480 | False | — | False |
| weekly_limit_minutes | int check >0 default 2400 | False | — | False |
| break_threshold_minutes | int default 360 | False | — | False |
| min_break_minutes | int check >=0 default 20 | False | — | False |

### clients

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| name | text | False | — | False |
| is_active | boolean | False | — | False |

### projects

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| client_id | uuid | False | clients.id | False |
| name | text | False | — | False |
| bill_rate | numeric(10,2) | False | — | True |
| is_active | boolean | False | — | False |

### tasks

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| project_id | uuid (unique with id) | False | projects.id | False |
| name | text | False | — | False |
| is_active | boolean | False | — | False |

### timesheets

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| week_start | date (Monday, unique with user_id) | False | — | False |
| status | enum(draft,submitted,approved,rejected) | False | — | False |
| reject_comment | text | False | — | True |
| submitted_at | timestamptz | False | — | True |
| decided_by | uuid | False | users.id | True |
| decided_at | timestamptz | False | — | True |

### time_entries

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| timesheet_id | uuid | False | timesheets.id | False |
| user_id | uuid | False | users.id | False |
| project_id | uuid | False | projects.id | False |
| task_id | uuid (composite FK task_id,project_id) | False | tasks.id | False |
| billable | boolean | False | — | False |
| source | enum(clock,manual) | False | — | False |
| work_date | date (company tz) | False | — | False |
| start_utc | timestamptz | False | — | True |
| end_utc | timestamptz (null = running) | False | — | True |
| break_minutes | int default 0 | False | — | False |
| worked_minutes | int | False | — | True |

### entry_breaks

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| time_entry_id | uuid | False | time_entries.id | False |
| start_utc | timestamptz | False | — | False |
| end_utc | timestamptz | False | — | True |

### leave_types

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| code | enum(annual,sick,unpaid) | False | — | False |
| has_balance | boolean | False | — | False |
| accrual_days_per_month | numeric(5,2) | False | — | True |

### leave_requests

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| leave_type_id | uuid | False | leave_types.id | False |
| start_date | date | False | — | False |
| end_date | date check >= start_date | False | — | False |
| day_portion | enum(full,half_am,half_pm) | False | — | False |
| days | numeric(5,1) | False | — | False |
| status | enum(pending,approved,rejected) | False | — | False |
| decided_by | uuid | False | users.id | True |
| decided_at | timestamptz | False | — | True |

### leave_ledger

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| leave_type_id | uuid | False | leave_types.id | False |
| kind | enum(accrual,deduction) | False | — | False |
| days | numeric(5,2) | False | — | False |
| accrual_month | date (unique per user,type when accrual) | False | — | True |
| leave_request_id | uuid | False | leave_requests.id | True |
| created_at | timestamptz | False | — | False |

### notifications

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| kind | enum(timesheet_due,timesheet_submitted,timesheet_approved,timesheet_rejected,leave_requested,leave_decided) | False | — | False |
| payload | jsonb | False | — | False |
| created_at | timestamptz | False | — | False |
| read_at | timestamptz | False | — | True |

### audit_log

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | bigserial | True | — | False |
| occurred_at | timestamptz (UTC) | False | — | False |
| actor_id | uuid | False | users.id | False |
| timesheet_id | uuid | False | timesheets.id | False |
| action | enum(entry_created,entry_updated,entry_deleted,submitted,approved,rejected,unlocked) | False | — | False |
| old_values | jsonb | False | — | True |
| new_values | jsonb | False | — | True |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | users | one-to-many |
| users | user_roles | one-to-many |
| users | auth_tokens | one-to-many |
| clients | projects | one-to-many |
| projects | tasks | one-to-many |
| users | timesheets | one-to-many |
| timesheets | time_entries | one-to-many |
| projects | time_entries | one-to-many |
| tasks | time_entries | one-to-many |
| time_entries | entry_breaks | one-to-many |
| leave_types | leave_requests | one-to-many |
| users | leave_requests | one-to-many |
| users | leave_ledger | one-to-many |
| leave_requests | leave_ledger | one-to-many |
| users | notifications | one-to-many |
| timesheets | audit_log | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    citext_unique email
    text full_name
    text__argon2id_ password_hash
    uuid manager_id FK
    boolean is_active
    timestamptz created_at
  }
  user_roles {
    uuid user_id PK,FK
    enum_employee_manager_payroll_admin_system_admin_ role PK
  }
  auth_tokens {
    uuid id PK
    uuid user_id FK
    enum_invite_reset_ purpose
    text_unique token_hash
    timestamptz expires_at
    timestamptz used_at
  }
  company_settings {
    smallint__single_row_ id PK
    text__IANA__e_g__Europe_London_ time_zone
    char_3__default_EUR currency
    int_check__0_default_480 daily_limit_minutes
    int_check__0_default_2400 weekly_limit_minutes
    int_default_360 break_threshold_minutes
    int_check___0_default_20 min_break_minutes
  }
  clients {
    uuid id PK
    text name
    boolean is_active
  }
  projects {
    uuid id PK
    uuid client_id FK
    text name
    numeric_10_2_ bill_rate
    boolean is_active
  }
  tasks {
    uuid id PK
    uuid__unique_with_id_ project_id FK
    text name
    boolean is_active
  }
  timesheets {
    uuid id PK
    uuid user_id FK
    date__Monday__unique_with_user_id_ week_start
    enum_draft_submitted_approved_rejected_ status
    text reject_comment
    timestamptz submitted_at
    uuid decided_by FK
    timestamptz decided_at
  }
  time_entries {
    uuid id PK
    uuid timesheet_id FK
    uuid user_id FK
    uuid project_id FK
    uuid__composite_FK_task_id_project_id_ task_id FK
    boolean billable
    enum_clock_manual_ source
    date__company_tz_ work_date
    timestamptz start_utc
    timestamptz__null___running_ end_utc
    int_default_0 break_minutes
    int worked_minutes
  }
  entry_breaks {
    uuid id PK
    uuid time_entry_id FK
    timestamptz start_utc
    timestamptz end_utc
  }
  leave_types {
    uuid id PK
    enum_annual_sick_unpaid_ code
    boolean has_balance
    numeric_5_2_ accrual_days_per_month
  }
  leave_requests {
    uuid id PK
    uuid user_id FK
    uuid leave_type_id FK
    date start_date
    date_check____start_date end_date
    enum_full_half_am_half_pm_ day_portion
    numeric_5_1_ days
    enum_pending_approved_rejected_ status
    uuid decided_by FK
    timestamptz decided_at
  }
  leave_ledger {
    uuid id PK
    uuid user_id FK
    uuid leave_type_id FK
    enum_accrual_deduction_ kind
    numeric_5_2_ days
    date__unique_per_user_type_when_accrual_ accrual_month
    uuid leave_request_id FK
    timestamptz created_at
  }
  notifications {
    uuid id PK
    uuid user_id FK
    enum_timesheet_due_timesheet_submitted_timesheet_approved_timesheet_rejected_leave_requested_leave_decided_ kind
    jsonb payload
    timestamptz created_at
    timestamptz read_at
  }
  audit_log {
    bigserial id PK
    timestamptz__UTC_ occurred_at
    uuid actor_id FK
    uuid timesheet_id FK
    enum_entry_created_entry_updated_entry_deleted_submitted_approved_rejected_unlocked_ action
    jsonb old_values
    jsonb new_values
  }
  users ||--o{ users : "one-to-many"
  users ||--o{ user_roles : "one-to-many"
  users ||--o{ auth_tokens : "one-to-many"
  clients ||--o{ projects : "one-to-many"
  projects ||--o{ tasks : "one-to-many"
  users ||--o{ timesheets : "one-to-many"
  timesheets ||--o{ time_entries : "one-to-many"
  projects ||--o{ time_entries : "one-to-many"
  tasks ||--o{ time_entries : "one-to-many"
  time_entries ||--o{ entry_breaks : "one-to-many"
  leave_types ||--o{ leave_requests : "one-to-many"
  users ||--o{ leave_requests : "one-to-many"
  users ||--o{ leave_ledger : "one-to-many"
  leave_requests ||--o{ leave_ledger : "one-to-many"
  users ||--o{ notifications : "one-to-many"
  timesheets ||--o{ audit_log : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
