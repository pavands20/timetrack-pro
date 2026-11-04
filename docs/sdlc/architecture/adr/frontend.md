<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Angular

## Decision Outcome

Chosen option: React 19, because Approved. Built as a responsive SPA covering the weekly grid, the clock screen, approval queues and reports. Mobile-first CSS avoids horizontal scrolling on phones (NFR-015). The build is served as static files by the API container, so no separate web host is needed.

## Consequences

An SPA needs client-side time-zone formatting, handled by a small date library. No offline mode.
<!-- sdlc:auto:end adr -->