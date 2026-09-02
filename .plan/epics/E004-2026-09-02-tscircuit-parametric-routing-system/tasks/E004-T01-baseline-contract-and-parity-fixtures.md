---
id: E004-T01
title: Freeze E003 baseline contracts and parity fixtures
status: pending
priority: high
effort: small
type: chore
dependencies: []
tags: [tscircuit, baseline, tests]
epic: E004
branch: feat/E004-T01-baseline-contract
commit: "test(hardware): freeze E003 baseline contracts"
created: 2026-09-02
completed_at: null
---
# E004-T01: Freeze E003 baseline contracts and parity fixtures

## Objective
Record current A–D artefact hashes, pad contracts, route counts and known
provisional behaviour before refactoring.

## Acceptance criteria
- [ ] Baseline report identifies current traces, pads, warnings and artefacts.
- [ ] A parity fixture proves the refactor has not changed the received-module
      geometry or four known A routes unintentionally.
- [ ] Known E003 limitations are encoded as expected provisional states.

## Tests
- Existing `npm run check` plus a new baseline/fixture test.
