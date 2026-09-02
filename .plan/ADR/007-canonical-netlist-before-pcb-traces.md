# ADR-007: Resolve a canonical netlist before PCB traces

- **Status**: accepted
- **Date**: 2026-09-02
- **Epic**: E004

## Context

Variant A currently creates four `<trace>` elements with hand-written paths.
Variants B–D have no PCB traces because their electrical intent was not yet
resolved at pin level. If traces remain the primary source, a route can look
connected while the schematic, pin map or support circuit is wrong. A green
render is not sufficient evidence of connectivity.

## Decision

Define a canonical typed netlist for each resolved variant before generating
PCB traces. A net contains a stable name, electrical role, required endpoints,
optional endpoints, allowed layers, width/clearance policy and review status.
Endpoint references resolve through component ports and physical pad numbers.
The resolver must reject missing, duplicate or incompatible endpoints.

The tscircuit schematic and PCB trace elements are generated outputs of this
netlist. Explicit routes and autorouter routes both consume the same route
requests. Required unconnected pins must be represented as reviewed `NC`, not
silently omitted.

## Alternatives

- **Keep JSX `<trace>` elements as the source of truth** — rejected because
  connectivity, geometry and route shape become inseparable and hard to test.
- **Infer nets from physical proximity** — rejected because it cannot prove
  electrical intent and fails for multi-layer routing.
- **Use only a schematic netlist from an external CAD tool** — deferred; it
  would weaken the TypeScript source-of-truth requirement in ADR-001.

## Consequences

Positive:

- missing connections become deterministic test failures;
- route generation can change without changing electrical intent;
- reports can show endpoint, net and route status separately;
- all four variants can share the same contracts and verification rules.

Trade-offs:

- the first implementation needs explicit endpoint and pin-map modelling;
- tscircuit naming/selector syntax must be isolated in an adapter;
- generated traces may need stable IDs for reproducible artefact hashes.

## Required gate

No variant is `routed` or eligible for fabrication review if a required net has
no resolved endpoints, no route, a route error, or an endpoint not touched by a
PCB trace.
