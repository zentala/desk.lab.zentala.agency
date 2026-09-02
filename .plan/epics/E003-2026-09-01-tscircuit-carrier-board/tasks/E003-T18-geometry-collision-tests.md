---
id: E003-T18
title: Add carrier geometry collision regression tests
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E003-T17]
tags: [hardware, validation, tests, drc]
epic: E003
commit: "test(hardware): cover carrier geometry collisions"
created: 2026-09-01
---
# E003-T18: Add carrier geometry collision regression tests

## Objective

Make the basic checks the design needs explicit in repository tests, rather
than relying only on generated DRC diagnostics.

## Acceptance criteria

- [ ] Tests cover module-pad to carrier-hole, trace-to-hole, trace-to-keep-out,
      silk-to-pad, silk-to-hole, board-edge and module-body collisions.
- [ ] Tests assert exact route endpoints and X/E no-connect state.
- [ ] Negative fixtures fail for each injected collision and the clean candidate
      passes.
- [ ] `npm run check` reports zero generated Circuit errors.

## Tests

- Unit: negative geometry fixtures in `validation.test.mjs`.
- Integration: full candidate proof and validation pipeline.
