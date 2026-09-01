---
id: E003-T11
title: Add JLCPCB vibration and buzzer feedback variant
status: pending
priority: medium
effort: large
type: feature
dependencies: [E003-T10]
tags: [hardware, jlcpcb, vibration, buzzer]
epic: E003
commit: "feat(hardware): add vibration and buzzer feedback variant"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T11: Add JLCPCB vibration and buzzer feedback variant

## Objective

Extend Variant B with a JLCPCB-sourced accelerometer and buzzer without making
either accessory necessary for the reference sensor test.

## Acceptance criteria

- [ ] LIS2DW12TR `C189624` has verified supply, I²C address and interrupt net.
- [ ] The selected buzzer has a verified voltage/current/frequency record.
- [ ] A transistor/MOSFET driver protects the RP2040 GPIO and has a test point.
- [ ] Vibration interrupt, buzzer tone and distance sampling can be tested
      independently.

## Tests

- Measure idle and event current for the accelerometer.
- Verify buzzer current, tone generation and no brown-out during USB operation.
- Run the same desk-height application test with feedback disabled and enabled.

## Implementation note

Variant C records LIS2DW12TR, buzzer, isolated driver and `VIB_INT`/
`BUZZER_DRV` test points in its BOM/source contract. Driver selection, current
measurements and independent hardware tests remain open.
