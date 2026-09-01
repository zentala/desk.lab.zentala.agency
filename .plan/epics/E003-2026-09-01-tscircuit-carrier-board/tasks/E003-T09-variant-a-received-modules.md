---
id: E003-T09
title: Design Variant A received-module carrier
status: pending
priority: high
effort: large
type: feature
dependencies: [E003-T08, E003-T03]
tags: [hardware, tscircuit, rp2040-zero, vl53ldk]
epic: E003
commit: "feat(hardware): add received-module carrier variant"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T09: Design Variant A received-module carrier

## Objective

Produce the smallest useful carrier for the physical RP2040-Zero and received
blue ToF breakout, preserving USB access and downward optical clearance.

## Acceptance criteria

- [ ] Measured board outlines and pad coordinates replace placeholders.
- [ ] VIN/GND/SDA/SCL nets and test points are explicit; sensor voltage remains
      constrained by the measurement result.
- [ ] USB, BOOT/RESET and optical keep-outs are visible in the render.
- [ ] The same firmware/application smoke test can run on the assembled board.

## Tests

- 1:1 print or CAD overlay against both physical boards.
- Continuity, power-rail and I²C smoke test before desk installation.

## Implementation note

The provisional Variant A source is exported from
`src/variant-candidates.tsx` and its BOM contract is in
`variants/variant-a-bom.json`. The received-board dimensions and electrical
power path remain unresolved, so this task is not closed.
