---
id: E004-T14
title: Add reproducibility checks and fifth-variant extension fixture
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E004-T12, E004-T13]
tags: [ci, reproducibility, extensibility]
epic: E004
branch: feat/E004-T14-reproducibility
commit: "test(hardware): prove generator reproducibility and extensibility"
created: 2026-09-02
completed_at: null
---
# E004-T14: Add reproducibility checks and fifth-variant extension fixture

## Objective
Prove that two clean generations produce the same normalized design outputs and
that a fifth composition-based variant does not require generator changes. Lock
the resolved-design schema and semantic impact report into the CI contract.

## Acceptance criteria
- [ ] Source, netlist, routes, manifest and portal hashes are deterministic.
- [ ] A fifth fixture variant uses existing components and verifier contracts.
- [ ] CI/check scripts fail on drift or uncommitted generated output.
- [ ] Schema compatibility and semantic design-diff fixtures detect intentional
      versus accidental changes.

## Tests
- Clean-install check, repeated-generation hash test, schema/diff fixtures and
  extension fixture.
