---
id: E004-T08
title: Define routing policy and router adapter boundary
status: pending
priority: critical
effort: medium
type: feature
dependencies: [E004-T06, E004-T07]
tags: [routing, tscircuit, architecture]
epic: E004
branch: feat/E004-T08-routing-adapter
commit: "feat(hardware): add normalized routing adapter"
created: 2026-09-02
completed_at: null
---
# E004-T08: Define routing policy and router adapter boundary

## Objective
Implement ADR-008's normalized route request/result types and classify routes as
locked, autorouted or deterministic fallback.

## Acceptance criteria
- [ ] Width, layer, clearance, via and keep-out policy are explicit per net class.
- [ ] Provider-specific autorouter output is normalized and versioned.
- [ ] Unsupported, incomplete or non-deterministic output fails the adapter.

## Tests
- Route normalization fixtures, stable-ID snapshots and invalid-output tests.
