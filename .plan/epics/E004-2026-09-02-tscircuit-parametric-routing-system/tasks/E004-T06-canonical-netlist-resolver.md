---
id: E004-T06
title: Build the canonical typed netlist and endpoint resolver
status: pending
priority: critical
effort: large
type: feature
dependencies: [E004-T03, E004-T05]
tags: [netlist, electrical, typescript]
epic: E004
branch: feat/E004-T06-netlist-resolver
commit: "feat(hardware): resolve typed carrier netlists"
created: 2026-09-02
completed_at: null
---
# E004-T06: Build the canonical typed netlist and endpoint resolver

## Objective
Implement ADR-007: define required/optional/NC endpoints, electrical roles and
compatibility rules before any PCB trace is generated.

## Acceptance criteria
- [ ] A/B/C/D have explicit power, ground, I2C, USB, clock, memory and feedback
      net contracts appropriate to their capabilities.
- [ ] Missing, duplicate, incompatible and unknown endpoints fail deterministically.
- [ ] The resolver emits stable IDs and a reviewable endpoint report.

## Tests
- Positive four-variant netlist fixtures plus negative endpoint/NC fixtures.
