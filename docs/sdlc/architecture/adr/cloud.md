<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Approved. Runs ECS Fargate, RDS and an ALB in eu-west-2 for GDPR and UK GDPR residency, with KMS encryption at rest and ACM TLS in transit.

## Consequences

A single Fargate task means brief downtime during deploys, which is acceptable for this scope.
<!-- sdlc:auto:end adr -->