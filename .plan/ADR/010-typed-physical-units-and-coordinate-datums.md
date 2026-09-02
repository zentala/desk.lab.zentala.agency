# ADR-010: Use typed physical units and named coordinate datums

- **Status**: accepted
- **Date**: 2026-09-02
- **Epic**: E004

## Context

E003 mixes raw numeric coordinates with strings such as `"0.25mm"`. Component,
board and route coordinates are interpreted relative to different implicit
origins. A copied number can therefore be dimensionally valid TypeScript while
still referring to the wrong unit, orientation or datum.

## Decision

Represent physical values through constructors and branded domain types such as
`Mm`, `Degrees`, `PointMm`, `SizeMm` and `ClearanceMm`. Define one named board
datum and a local datum/orientation for every reusable component. Transform
local component geometry into board coordinates in one placement resolver.

Raw tscircuit unit strings and provider coordinate conventions are created only
inside output adapters. Every measurement records its source and tolerance or
explicitly carries provisional status.

## Alternatives

- **Continue using raw numbers and strings** — rejected because TypeScript
  cannot distinguish a pad number, millimetre coordinate or angle.
- **Adopt a full external constraint solver immediately** — deferred; named
  anchors and typed transforms cover the present two-layer boards with less
  complexity.
- **Use pixels or render coordinates as the shared unit** — rejected because
  manufacturing geometry must remain physical and renderer-independent.

## Consequences

Positive:

- unit and orientation mistakes fail earlier;
- placement, keep-outs and route obstacles share one coordinate model;
- 1:1 overlays can compare the same physical values used by the generator;
- changing a component datum does not require rewriting every board coordinate.

Trade-offs:

- adapter code must unwrap units for tscircuit;
- arithmetic helpers and tolerance-aware tests are required;
- branded units improve correctness but do not validate the underlying measurement.
