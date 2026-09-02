---
id: E003-T26
title: Implement complete feedback Variant C
status: pending
priority: high
effort: large
type: feature
dependencies: [E003-T25, E003-T22]
tags: [hardware, variant-c, accelerometer, buzzer]
epic: E003
commit: "feat(hardware): implement Variant C feedback circuitry"
created: 2026-09-02
---
# E003-T26: Implement complete feedback Variant C

## Objective

Extend the complete B design with a real accelerometer and buzzer driver while
keeping their power, interrupt and drive nets independently testable.

## Acceptance criteria

- [ ] The accelerometer is represented by its real package footprint, not a
      small testpoint dot, with address/interrupt and unused-pin intent shown.
- [ ] The buzzer and its transistor/MOSFET, resistor and protection parts are
      represented with real bodies and a documented current path.
- [ ] Vibration interrupt and buzzer drive have separate named nets and test
      points where physically useful.
- [ ] The board remains within the compact mechanical contract or records the
      exact reason for the narrow-frame fallback.

## Tests

- Isolated accelerometer I2C/interrupt contract test.
- Buzzer current and driver-state calculation review.
- Visual inspection that no functional component is rendered as a dot.
