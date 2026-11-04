<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved. Provides relational integrity for status locks and the task-to-project FK, report aggregations in SQL, jsonb for audit old and new values, and grants plus triggers for an append-only audit trail (NFR-010).

## Consequences

Reports run against the live database, which is acceptable at this size with indexes on (user_id, work_date).
<!-- sdlc:auto:end adr -->