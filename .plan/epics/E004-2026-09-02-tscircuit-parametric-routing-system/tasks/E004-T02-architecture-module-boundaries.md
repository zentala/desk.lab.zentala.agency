---
id: E004-T02
title: Establish typed architecture module boundaries
status: pending
priority: high
effort: medium
type: feature
dependencies: [E004-T01]
tags: [typescript, architecture]
epic: E004
branch: feat/E004-T02-architecture-boundaries
commit: "feat(hardware): add typed carrier architecture boundaries"
created: 2026-09-02
completed_at: null
---
# E004-T02: Establish typed architecture module boundaries

## Objective
Create the domain/component/board/routing/verification boundaries described by
ADR-006 and ADR-009 without moving provider-specific tscircuit props or side
effects into the domain.

## Acceptance criteria
- [ ] Module layout and import directions are documented and typechecked.
- [ ] Domain types do not import React or tscircuit implementation types.
- [ ] Domain resolution is pure and does not access filesystem or network APIs.
- [ ] Renderer, router, evidence I/O and portal adapters are the only
      provider-facing boundaries.

## Tests
- Typecheck and an import-boundary test or static dependency assertion.
