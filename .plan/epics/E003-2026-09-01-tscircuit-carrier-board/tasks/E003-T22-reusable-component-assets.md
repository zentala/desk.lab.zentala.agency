---
id: E003-T22
title: Author reusable measured module and chip-down component assets
status: pending
priority: critical
effort: large
type: feature
dependencies: [E003-T21]
tags: [hardware, tscircuit, footprint, component]
epic: E003
commit: "feat(hardware): add verified reusable component assets"
created: 2026-09-02
---
# E003-T22: Author reusable measured module and chip-down component assets

## Objective

Build isolated TS Circuit components for the physical RP2040-Zero, received
ToF breakout, bare RP2040 chip, selected ToF IC, LIS2DW12TR and the selected
buzzer/driver parts. The assets must expose real pads, bodies, holes,
orientation and optical/mechanical keep-outs.

## Acceptance criteria

- [ ] Module assets show all physical pads and connector/access features.
- [ ] The ToF asset shows four electrical pads plus X/E as non-electrical
      auxiliary vias when the evidence confirms that interpretation.
- [ ] Chip-down assets show the full package pad count and required exposed,
      thermal or no-connect pads.
- [ ] C's accelerometer and buzzer are real footprints, not testpoint dots.
- [ ] Every asset includes orientation, datum and source metadata.

## Tests

- Exact pad-count and pad-name contract tests.
- Isolated PCB render and visual inspection of every component.
- Negative test rejecting generic four-pad substitutions.
