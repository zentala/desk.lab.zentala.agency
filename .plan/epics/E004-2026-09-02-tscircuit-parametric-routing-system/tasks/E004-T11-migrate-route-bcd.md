---
id: E004-T11
title: Migrate and route Variants B, C and D
status: pending
priority: critical
effort: large
type: feature
dependencies: [E004-T10]
tags: [variants, routing, electrical]
epic: E004
branch: feat/E004-T11-route-bcd
commit: "feat(hardware): route chip-down and wireless variants"
created: 2026-09-02
completed_at: null
---
# E004-T11: Migrate and route Variants B, C and D

## Objective
Generate real PCB traces from the resolved netlists for B/C/D, including power,
I2C, USB, QSPI, clock, accelerometer and buzzer/RF-specific connections.

## Acceptance criteria
- [ ] B, C and D contain actual routed copper in PCB artefacts.
- [ ] Critical routes are locked or explicitly reviewed by policy.
- [ ] No route is accepted merely because it reaches a nearby component.

## Tests
- Four-variant render, route report, tscircuit diagnostics and manual PCB review.
