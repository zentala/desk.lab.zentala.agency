---
id: E003-T10
title: Design Variant B JLCPCB chip-down board
status: pending
priority: high
effort: large
type: feature
dependencies: [E003-T08, E003-T09]
tags: [hardware, tscircuit, jlcpcb, rp2040]
epic: E003
commit: "feat(hardware): add JLCPCB chip-down carrier variant"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T10: Design Variant B JLCPCB chip-down board

## Objective

Replace the development modules with JLCPCB-sourced ICs and passives while
preserving the tested USB serial and I²C contract.

## Acceptance criteria

- [ ] RP2040 `C2040`, external flash, USB, clock, regulator and decoupling are
      represented with source-backed footprints.
- [ ] VL53L0X `C2929940` or VL53L1X `C2924337` is selected explicitly; the
      rejected alternative and reason remain documented.
- [ ] Boot, reset, SWD/test pads and sensor optical keep-out are included.
- [ ] JLCPCB assembly eligibility and package orientation are checked from the
      current library before export.

## Tests

- ERC/netlist review and power-tree calculation.
- DFM/clearance inspection and USB serial bring-up on a prototype.

## Implementation note

The review candidate source and BOM are generated with the A–D proof pipeline.
JLCPCB IDs are recorded as catalogue candidates only; source-backed footprints,
power-tree values and current library eligibility must be verified before this
task can close.
