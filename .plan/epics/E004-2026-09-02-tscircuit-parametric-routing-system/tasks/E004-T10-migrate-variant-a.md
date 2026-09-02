---
id: E004-T10
title: Migrate Variant A to the shared generator
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E004-T06, E004-T07, E004-T09]
tags: [variants, migration, regression]
epic: E004
branch: feat/E004-T10-migrate-variant-a
commit: "refactor(hardware): migrate Variant A to shared generator"
created: 2026-09-02
completed_at: null
---
# E004-T10: Migrate Variant A to the shared generator

## Objective
Move the received-module reference board to the factory while preserving its
known pad geometry, four net contract and explicit route behaviour.

## Acceptance criteria
- [ ] A is generated through shared components, config, netlist and placement.
- [ ] Existing A parity fixture passes or documents an intentional change.
- [ ] A's provisional evidence and fabrication gate remain visible.

## Tests
- A render, endpoint report, route/geometry checks and baseline parity test.
