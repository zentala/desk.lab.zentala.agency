# E004 execution cheatsheet

## Target shape

```text
src/domain/       typed PartSpec, VariantConfig, NetContract, units, maturity
src/components/   reusable footprints and named ports
src/boards/       variant recipes and placement anchors
src/routing/      route policy, router adapter, locked critical paths
src/adapters/     tscircuit, router and generated-output boundaries
scripts/          resolve, verify, diff, report and package
```

## Non-negotiables

- Netlist first; PCB traces are generated output.
- No copied A/B/C/D board trees.
- Pure core; provider code stays in adapters.
- Typed units and named datums; no ambiguous raw geometry.
- No required endpoint without a named pin and test.
- Autorouter output is a proposal until DRC and visual review pass.
- Maturity is computed from gates and cannot be promoted by a label.
- Provisional evidence blocks fabrication.

## Exit signal

`npm run check` passes, every variant has real routed copper and zero required
unrouted nets, negative fixtures fail correctly, and the portal shows source,
net and route status for A–D.
