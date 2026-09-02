# E004 architecture hardening review

Date: 2026-09-02

## Finding

The original E004 plan correctly separates components, variants, netlists,
placement, routing and verification. Three additional boundaries are needed to
make the system resilient rather than merely reusable.

## Added decisions

### Functional core and adapters

Most design work is deterministic transformation. It should run as pure domain
code so tscircuit, autorouter, filesystem and portal failures remain isolated at
the edge. This also makes unit tests fast and keeps provider APIs replaceable.

### Typed physical units and coordinate datums

Raw numbers and mixed unit strings allow a valid TypeScript value to represent
the wrong physical concept. Branded units, named datums and one transform path
reduce orientation, scale and copied-coordinate failures.

### Versioned resolved design and maturity gates

PASS currently means different things in different reports. One versioned
resolved model must compute the highest valid maturity state and list every
unmet gate. Human review and fabrication approval remain recorded external
facts, not automated labels.

## Further improvements included in tasks

- Runtime validation at evidence and provider boundaries, because TypeScript
  types disappear at runtime.
- Semantic design diffs that explain which variants, nets, placements, routes
  and artefacts changed after an input change.
- Dependency-direction checks so domain code cannot import adapters.
- Stable IDs and schema versions for deterministic review and migration.
- A fifth-variant fixture proving reuse with a real second composition path.

## Deliberately deferred

- Publishing a general-purpose package before a second real project consumes it.
- A full mechanical/3D constraint solver before measured component heights exist.
- Manufacturer-specific DFM profiles before the fab and assembly process are selected.
- KiCad as primary source unless TS Circuit fails the explicit routing/export gates.

These deferrals prevent the reusable core from becoming a speculative framework.
The current scope remains local to `hardware/e003-carrier` until reuse is proved.
