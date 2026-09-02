---
id: E004-T12
title: Enforce electrical and geometry release gates
status: pending
priority: critical
effort: large
type: improvement
dependencies: [E004-T11]
tags: [verification, drc, release]
epic: E004
branch: feat/E004-T12-release-gates
commit: "test(hardware): enforce routed board release gates"
created: 2026-09-02
completed_at: null
---
# E004-T12: Enforce electrical and geometry release gates

## Objective
Make missing required traces, unrouted nets, endpoint mismatches, collisions,
off-board paths and illegal keep-out crossings hard failures, then derive the
board maturity state defined by ADR-011 from those results.

## Acceptance criteria
- [ ] Every required net has resolved endpoints and a verified route.
- [ ] Negative fixtures fail for each release-gate class.
- [ ] Reports distinguish warnings, provisional evidence and blocking failures.
- [ ] Maturity transitions are monotonic and cannot skip an unmet gate.
- [ ] Human review and fabrication approval require recorded external evidence.

## Tests
- Full unit/negative and maturity-transition suite, `npm run verify:boards`,
  `npm run validate` and generated report review.
