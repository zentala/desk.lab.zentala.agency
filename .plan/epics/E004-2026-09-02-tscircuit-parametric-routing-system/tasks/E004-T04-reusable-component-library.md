---
id: E004-T04
title: Extract reusable typed component library
status: pending
priority: high
effort: large
type: improvement
dependencies: [E004-T03]
tags: [tscircuit, components, footprints]
epic: E004
branch: feat/E004-T04-component-library
commit: "refactor(hardware): extract reusable carrier components"
created: 2026-09-02
completed_at: null
---
# E004-T04: Extract reusable typed component library

## Objective
Move controllers, ToF sensors, accelerometer, USB, regulator, memory, crystal,
passives, buzzer and driver into named components with stable ports and isolated
footprint implementations.

## Acceptance criteria
- [ ] Each component exposes named logical ports and physical pad mapping.
- [ ] Received-module and catalogue footprints cannot be confused by naming.
- [ ] Local provisional geometry is replaceable without board-source changes.

## Tests
- Pad-count and pin-map fixtures for every reusable component; render preview.
