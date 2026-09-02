---
id: E004-T03
title: Define typed source, part and evidence contracts
status: pending
priority: high
effort: medium
type: feature
dependencies: [E004-T02]
tags: [typescript, evidence, components]
epic: E004
branch: feat/E004-T03-source-contracts
commit: "feat(hardware): define typed part and evidence contracts"
created: 2026-09-02
completed_at: null
---
# E004-T03: Define typed source, part and evidence contracts

## Objective
Represent package identity, pin maps, geometry, orientation, source evidence,
confidence and unresolved fields as typed, versioned data that every component
consumes.

## Acceptance criteria
- [ ] Catalogue, measured and provisional sources have distinct statuses.
- [ ] Pad number/name/position and orientation are required for a reusable part.
- [ ] Missing evidence is visible and cannot be silently promoted to verified.
- [ ] Runtime validation protects the domain from malformed JSON or provider data.
- [ ] Schema versions and migration failures are explicit.

## Tests
- Valid and invalid source-register fixtures; typecheck; serialization test.
