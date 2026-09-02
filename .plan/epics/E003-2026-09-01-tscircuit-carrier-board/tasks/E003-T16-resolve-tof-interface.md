---
id: E003-T16
title: Resolve ToF power and auxiliary interface
status: pending
priority: critical
effort: medium
type: improvement
dependencies: [E003-T14]
tags: [hardware, power, i2c, tof]
epic: E003
commit: "fix(hardware): resolve Variant A sensor interface"
created: 2026-09-01
---
# E003-T16: Resolve ToF power and auxiliary interface

## Objective

Turn the provisional `VIN_OR_3V3_PENDING` connection into a measured electrical
contract, or add the required power/level adaptation instead of hiding the
uncertainty in a net name.

## Acceptance criteria

- [ ] VIN input limits and breakout regulator output are documented with
      evidence or remain explicitly blocked.
- [ ] I2C pull-up rail and level shifting are identified; carrier pull-ups are
      added only if the measured design requires them.
- [ ] X and E are either source-backed nets or remain explicit no-connects.
- [ ] The truth table and source names agree with the measured contract.
- [ ] A qualified reviewer confirms that the proposed RP2040 3.3 V interface
      is electrically safe.

## Tests

- Electrical: continuity and voltage/current measurements.
- Contract: test rejects a power-rail or X/E status drift.
