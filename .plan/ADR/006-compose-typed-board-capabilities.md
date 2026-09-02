# ADR-006: Compose typed board capabilities

- **Status**: accepted
- **Date**: 2026-09-02
- **Epic**: E004

## Context

E003 represents each candidate as a separate JSX function. The functions repeat
board size, controller placement, sensor placement, support parts and review
labels. Adding a capability risks changing one variant while silently leaving
the other variants inconsistent. Classical inheritance would make the problem
worse because the meaningful differences are combinations: received module or
bare IC, USB or wireless transport, accelerometer, buzzer and different
mechanical constraints.

## Decision

Use TypeScript discriminated unions, immutable configuration objects and pure
factory functions. A board is composed from typed capabilities:

```ts
type CarrierVariant = {
  id: VariantId
  controller: ControllerSpec
  sensor: DistanceSensorSpec
  feedback: FeedbackSpec
  transport: TransportSpec
  mechanics: MechanicsSpec
}
```

Reusable components expose named ports, geometry, pad maps and provenance.
Board-specific electrical and mechanical rules stay in the carrier domain.
React/tscircuit JSX is an output adapter from the resolved model, not the
storage format for variant decisions.

## Alternatives

- **Copy each variant JSX tree** — rejected because changes drift and parity is
  difficult to test.
- **Class inheritance (`BaseBoard`, `WirelessBoard extends BaseBoard`)** —
  rejected because capabilities cross-cut the hierarchy and create fragile
  override behaviour.
- **One untyped JSON file** — rejected because invalid pin names and missing
  capabilities become runtime-only failures.

## Consequences

Positive:

- adding a fifth variant is mostly configuration and composition;
- shared placement, netlist and verification logic runs uniformly;
- TypeScript catches invalid variant shapes before rendering;
- components can be replaced without rewriting board recipes.

Trade-offs:

- the domain types and adapters must be designed before migration;
- some tscircuit prop details cannot be fully type-safe and require a narrow
  adapter declaration;
- variant-specific exceptions must be explicit instead of hidden in overrides.

## Invariants

- every variant identifies one controller and one distance sensor;
- feedback capabilities are optional but their required nets are not;
- transport does not change the sensor domain contract;
- a component cannot be considered reusable without source/provenance data.
