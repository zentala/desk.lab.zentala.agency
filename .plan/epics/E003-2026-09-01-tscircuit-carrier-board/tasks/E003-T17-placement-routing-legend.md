---
id: E003-T17
title: Re-place, route and label Variant A
status: pending
priority: high
effort: large
type: improvement
dependencies: [E003-T15, E003-T16]
tags: [hardware, routing, pcb, silkscreen]
epic: E003
commit: "fix(hardware): simplify Variant A placement and routing"
created: 2026-09-01
---
# E003-T17: Re-place, route and label Variant A

## Objective

Use the measured module datums to create a compact, inspectable two-layer
carrier with short parallel I2C routes, intentional power routing and clear
access markings.

## Acceptance criteria

- [ ] Placement preserves USB-C, BOOT, RESET, optical and mounting access.
- [ ] SDA/SCL leave the chosen RP2040 pads cleanly and reach the measured ToF
      pads without avoidable backtracking or crossings.
- [ ] Power and ground routes have an explicit layer strategy and no trace
      passes through a mechanical/optical/USB keep-out.
- [ ] Carrier silkscreen clearly labels USB-C, BOOT, RESET, 5V/VBUS, 3V3, GND,
      SDA/GP4 and SCL/GP5 without overlapping pads or module bodies.
- [ ] A reviewer can distinguish module access labels from carrier nets.

## Tests

- Geometry: route endpoint/layer/clearance assertions.
- Visual: annotated PCB render and installed-access review.
