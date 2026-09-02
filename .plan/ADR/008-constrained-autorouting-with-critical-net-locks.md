# ADR-008: Use constrained autorouting with critical-net locks

- **Status**: accepted
- **Date**: 2026-09-02
- **Epic**: E004

## Context

Manual coordinate paths are reproducible but do not scale across four boards
and make ordinary signal routing expensive to maintain. tscircuit exposes local,
cloud and custom autorouter integration, but routing quality is still an
engineering concern. Power, USB, clock, QSPI and ESP32 antenna-adjacent routes
have constraints that a generic solver must not silently reinterpret.

## Decision

Introduce a routing adapter with three explicit classes of route:

1. **locked routes** — critical power, USB, clock, QSPI and RF-sensitive paths
   with declared layer, width, clearance and keep-out requirements;
2. **autorouted routes** — ordinary connections passed to a configured local or
   cloud/custom solver after obstacles and locked routes are known;
3. **fallback routes** — deterministic explicit paths used when the configured
   solver is unavailable or produces unsupported output.

The adapter returns a normalized `RoutingResult` containing all traces,
vias, warnings, unrouted nets and route provenance. DRC, endpoint and visual
review gates must pass after routing. Autorouter success never means
fabrication approval.

## Alternatives

- **Route every trace manually** — rejected as the default because it does not
  scale and encourages duplicated coordinate logic.
- **Fully trust the autorouter** — rejected because solver output can be
  electrically valid but mechanically poor, indirect or unsuitable for RF and
  power review.
- **Switch immediately to KiCad** — deferred as a fallback if the adapter,
  export or determinism gates fail; ADR-001 still governs the current source.

## Consequences

Positive:

- routing becomes repeatable and configurable;
- critical engineering decisions remain visible and reviewable;
- a router provider can be replaced without changing the netlist;
- route provenance is included in the portal and manifest.

Trade-offs:

- router versions and provider availability become recorded inputs;
- generated routes must be normalized for deterministic hashes;
- manual critical-route review remains mandatory.

## Exit criteria

E004 may claim routed candidates only when each required net has a normalized
route, no unsupported autorouter output remains, collision/clearance checks pass,
and the portal identifies locked, automatic and fallback routes separately.
