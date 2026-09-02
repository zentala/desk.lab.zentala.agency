---
id: E003-T27
title: Implement complete wireless Variant D
status: pending
priority: medium
effort: large
type: feature
dependencies: [E003-T21, E003-T22, E003-T24]
tags: [hardware, variant-d, esp32, wireless]
epic: E003
commit: "feat(hardware): implement complete wireless Variant D"
created: 2026-09-02
---
# E003-T27: Implement complete wireless Variant D

## Objective

Replace the D four-pad placeholder with the selected ESP32-C3 module or IC
footprint, its power, programming, antenna and sensor interfaces. Keep USB as
power/debug only according to ADR-003.

## Acceptance criteria

- [ ] Every ESP32 pad, exposed area, antenna keep-out and module edge is
      represented according to the selected source.
- [ ] D has no RP2040 or generic four-pad substitute and no false claim that
      the wireless part is a four-pin device.
- [ ] USB power, regulator limits, reset/boot access and wireless keep-outs are
      documented in the source and review package.
- [ ] The same raw sensor contract is preserved without local buzzer logic.

## Tests

- Package pad-count and antenna-clearance checks.
- Power-budget and USB-power-only contract tests.
- Full PCB render with module outline and all access features.
