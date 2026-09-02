---
id: E003-T15
title: Replace provisional ToF footprint and optical model
status: pending
priority: critical
effort: large
type: improvement
dependencies: [E003-T14]
tags: [hardware, footprint, tof, mechanics]
epic: E003
commit: "fix(hardware): align Variant A ToF geometry"
created: 2026-09-01
---
# E003-T15: Replace provisional ToF footprint and optical model

## Objective

Make Variant A's ToF representation match the measured board, including pad
centres, pad shapes, board outline, corner hole and the real optical package
and aperture.

## Acceptance criteria

- [ ] `src/carrier.tsx` contains measured six-pad coordinates and pad geometry.
- [ ] The carrier clearance hole matches the measured ToF hole and clears every
      pad by the documented manufacturing margin.
- [ ] The optical keep-out models the measured package/aperture and downward
      installed clearance; it is not a generic circle chosen for convenience.
- [ ] The 1:1 render/overlay shows no pad, hole or optical mismatch.
- [ ] `fabricationAllowed` remains false until external review.

## Tests

- Unit/contract: exact pad IDs, coordinates, hole and optical datum.
- Manual: 1:1 print overlay against the received board.
