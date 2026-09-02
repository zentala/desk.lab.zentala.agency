---
id: E004-T07
title: Add anchor-based placement and mechanical constraints
status: pending
priority: high
effort: large
type: feature
dependencies: [E004-T05, E004-T06]
tags: [placement, mechanics, geometry]
epic: E004
branch: feat/E004-T07-placement-constraints
commit: "feat(hardware): add parametric placement constraints"
created: 2026-09-02
completed_at: null
---
# E004-T07: Add anchor-based placement and mechanical constraints

## Objective
Replace scattered coordinates with named datums, anchors, envelopes, access
zones, optical keep-outs, mounting rules and board-edge constraints using the
typed physical-unit model from ADR-010.

## Acceptance criteria
- [ ] Placement is generated from anchors and dimensions, not repeated magic numbers.
- [ ] Component-local coordinates transform through named datums into one board datum.
- [ ] Millimetres, angles, points, sizes and clearances use typed domain values.
- [ ] USB, antenna, optics, tape-facing underside and service access are explicit.
- [ ] Geometry resolution emits collision-ready obstacles for routing.

## Tests
- Unit/transform, tolerance and collision fixtures for all variants; 1:1 review.
