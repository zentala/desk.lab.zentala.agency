---
id: E003-T23
title: Integrate compact received-module Variant A
status: pending
priority: critical
effort: large
type: feature
dependencies: [E003-T15, E003-T16, E003-T22, E003-T24]
tags: [hardware, variant-a, mechanics, pcb]
epic: E003
commit: "feat(hardware): compact Variant A received-module carrier"
created: 2026-09-02
---
# E003-T23: Integrate compact received-module Variant A

## Objective

Replace the oversized provisional A layout with the measured RP2040-Zero and
ToF module assets. Produce a minimal frameless carrier and compare a rotated
RP2040 layout with the best non-rotated layout.

## Acceptance criteria

- [ ] All 23 RP2040-Zero pads and all four ToF electrical pads are visible and
      connected according to the truth table.
- [ ] The ToF outline, X/E vias, mounting hole and optical aperture are shown
      in their measured locations.
- [ ] The RP2040 USB-C, BOOTSEL and RESET access remains usable.
- [ ] The board outline is generated from the envelope and keep-outs; no
      decorative perimeter frame is added.
- [ ] A dimensioned comparison records the rotated and non-rotated layouts,
      including direct-solder and removable-header options.

## Tests

- 1:1 print/overlay against both received modules.
- Pad, hole, optical and edge-clearance checks.
- Browser render review with full board outlines and no duplicate image.
