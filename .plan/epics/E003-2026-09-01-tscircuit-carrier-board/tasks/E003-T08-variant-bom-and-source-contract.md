---
id: E003-T08
title: Freeze four-variant BOM and source contract
status: pending
priority: high
effort: medium
type: docs
dependencies: [E003-T01]
tags: [hardware, bom, jlcpcb, variants]
epic: E003
commit: "docs(hardware): define three board variants and BOM sources"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T08: Freeze four-variant BOM and source contract

## Objective

Turn the three board ideas into separate, reviewable BOMs with explicit source
IDs, electrical assumptions and substitutions.

## Acceptance criteria

- [ ] Variant A lists the received modules and all required test points.
- [ ] Variant B lists JLCPCB source IDs for RP2040, ToF IC, flash, USB, power
      and passives.
- [ ] Variant C extends B with LIS2DW12TR and a selected buzzer/driver.
- [ ] Every uncertain part has a confidence level and a measurement or
      datasheet check that can close it.

## Tests

- BOM source links resolve and package names agree with the EasyEDA export.
- A reviewer can distinguish module-dependent and chip-down assumptions.

## Notes

Use [`board-variants.md`](../../../../hardware/e003-carrier/board-variants.md)
and [ADR-003](../../../ADR/003-three-hardware-board-variants.md) as the initial
contract. Review-time machine-readable BOMs now live in
`hardware/e003-carrier/variants/`; current catalogue, package and assembly
eligibility checks remain open.
