# ADR-011: Version resolved designs and compute maturity gates

- **Status**: accepted
- **Date**: 2026-09-02
- **Epic**: E004

## Context

The current project uses words such as PASS, provisional, routed and blocked in
different reports. A board can pass pad/collision checks while still having no
copper routing or verified physical evidence. Independent booleans and prose
make it too easy for an artefact to appear more mature than the design behind it.

## Decision

Emit a versioned `ResolvedBoardDesign` contract and compute its maturity from
evidence and verification results. The initial ordered states are:

```text
draft → source-backed → geometry-verified → netlist-resolved
      → routed → checks-passed → human-reviewed → fabrication-approved
```

Code must not set a later state directly. A maturity evaluator derives the
highest valid state and records every unmet gate. The manifest, review portal
and manufacturing export consume the same result and schema version. A schema
change requires an explicit migration or a new version.

## Alternatives

- **Keep independent status booleans** — rejected because contradictory states
  such as `routed: true` and `unroutedNets: 4` remain representable.
- **Use documentation prose as the release gate** — rejected because generated
  outputs cannot enforce or consistently display it.
- **Let each adapter calculate status** — rejected because portal, verifier and
  export could disagree.

## Consequences

Positive:

- status language has one precise meaning across all artefacts;
- fabrication approval cannot be inferred from a green render;
- reviewers see both achieved and unmet gates;
- schema versioning makes generated-output changes reviewable and migratable.

Trade-offs:

- maturity rules require tests and deliberate versioning;
- human review and fabrication approval remain external inputs with recorded
  identity/date, never automated conclusions;
- old generated artefacts need compatibility handling during migration.
