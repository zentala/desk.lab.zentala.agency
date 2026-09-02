---
id: E004-T09
title: Evaluate autorouter and implement deterministic fallback
status: pending
priority: high
effort: large
type: feature
dependencies: [E004-T08]
tags: [routing, autorouter, reproducibility]
epic: E004
branch: feat/E004-T09-autorouter-evaluation
commit: "feat(hardware): add constrained autorouting and fallback"
created: 2026-09-02
completed_at: null
---
# E004-T09: Evaluate autorouter and implement deterministic fallback

## Objective
Run a controlled routing experiment against the pinned tscircuit toolchain and
provide a local deterministic route strategy when the provider is unavailable.

## Acceptance criteria
- [ ] Router input includes obstacles, locked traces and all required nets.
- [ ] Output is reproducible or is rejected with a clear provider/version record.
- [ ] Fallback can route the supported two-layer test board without hidden paths.

## Tests
- Repeated route hash comparison; obstacle/crossover fixtures; provider failure test.
