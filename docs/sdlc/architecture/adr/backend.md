<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Node/TypeScript (NestJS)
- Django

## Decision Outcome

Chosen option: FastAPI 0.115, because Approved. Pydantic models validate entries, settings and leave requests. One modular-monolith process also hosts the scheduler, which fits the single-instance deployment.

## Consequences

The in-process scheduler relies on a single instance. An advisory lock protects against duplicate runs if a second task is ever started.
<!-- sdlc:auto:end adr -->