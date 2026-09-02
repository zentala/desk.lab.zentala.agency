---
id: E004-T05
title: Implement typed variant configuration and board factory
status: pending
priority: high
effort: large
type: feature
dependencies: [E004-T04]
tags: [typescript, variants, composition]
epic: E004
branch: feat/E004-T05-variant-factory
commit: "feat(hardware): generate carrier variants from typed config"
created: 2026-09-02
completed_at: null
---
# E004-T05: Implement typed variant configuration and board factory

## Objective
Generate A/B/C/D through one composed factory. Variant files should select
capabilities and constraints rather than copy JSX board trees.

## Acceptance criteria
- [ ] A/B/C/D use the same factory and have no duplicated board skeleton.
- [ ] Controller, sensor, feedback, transport and mechanics are discriminated
      typed capabilities.
- [ ] A fifth fixture variant can be composed without changing components.

## Tests
- Type-level invalid-variant fixtures; four render proofs; fifth-variant test.
