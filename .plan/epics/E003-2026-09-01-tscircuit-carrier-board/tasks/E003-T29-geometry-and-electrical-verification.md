---
id: E003-T29
title: Enforce cross-variant geometry and electrical verification
status: pending
priority: critical
effort: large
type: improvement
dependencies: [E003-T23, E003-T25, E003-T26, E003-T27, E003-T28]
tags: [hardware, validation, drc, regression]
epic: E003
commit: "test(hardware): enforce complete variant verification"
created: 2026-09-02
---
# E003-T29: Enforce cross-variant geometry and electrical verification

## Objective

Make the basic review process fail loudly when a variant loses pads, outlines,
holes, real components or routes. Combine generated Circuit diagnostics with
repository-level checks that understand the product's mechanical contracts.

## Acceptance criteria

- [ ] Tests reject duplicate render hashes and missing full-board images.
- [ ] Tests reject `pinrow4_p2.54mm` in B/C/D and dot-only functional parts in C.
- [ ] Tests assert package-specific pad counts, module outlines, holes,
      optical/antenna keep-outs, board-edge margins and trace endpoints.
- [ ] Negative fixtures fail for pad/hole, trace/hole, trace/keep-out,
      silk/pad, edge and component-body collisions.
- [ ] `npm run check` passes for every intentional release candidate with no
      generated Circuit errors; known warnings remain explicit in the manifest.

## Tests

- Unit and negative geometry fixtures.
- Full `npm run check`, clean-install proof and deterministic artifact hashes.
- Manual review of generated PCB, schematic and component images.
