---
id: E003-T25
title: Implement complete compact chip-down Variant B
status: pending
priority: critical
effort: large
type: feature
dependencies: [E003-T21, E003-T22, E003-T24]
tags: [hardware, variant-b, chipdown, jlcpcb]
epic: E003
commit: "feat(hardware): implement complete chip-down Variant B"
created: 2026-09-02
---
# E003-T25: Implement complete compact chip-down Variant B

## Objective

Replace the B four-pad study with a real bare-RP2040 and ToF-IC design,
including flash, regulator, USB, decoupling, pull-ups, programming access and
all required no-connect/exposed pads.

## Acceptance criteria

- [ ] B contains no module substitute and no generic four-pad placeholder.
- [ ] The complete power tree, USB/programming interface and I2C contract are
      present in schematic and PCB source.
- [ ] All package pads are represented with correct electrical or no-connect
      intent.
- [ ] The compact outline and component placement pass the same edge,
      keep-out and underside mounting contract as A.
- [ ] The source records which parts are JLCPCB-verified and which remain
      review blockers.

## Tests

- Netlist/pad-count and power-tree contract tests.
- PCB render with every package body and pad visible.
- Generated diagnostics and clearance checks.
