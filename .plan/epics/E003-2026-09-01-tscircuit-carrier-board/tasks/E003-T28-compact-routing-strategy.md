---
id: E003-T28
title: Route compact variants with explicit layer and service strategy
status: pending
priority: critical
effort: large
type: improvement
dependencies: [E003-T23, E003-T25, E003-T26, E003-T27]
tags: [hardware, routing, pcb, serviceability]
epic: E003
commit: "fix(hardware): route compact carrier variants clearly"
created: 2026-09-02
---
# E003-T28: Route compact variants with explicit layer and service strategy

## Objective

Produce short, readable routes for each implemented variant, with a deliberate
two-layer strategy and a mechanically safe underside. Direct pad-to-pad paths
must be preferred where they improve inspection and do not compromise power,
ground or serviceability.

## Acceptance criteria

- [ ] Every trace endpoint is verified against the real pad and net contract.
- [ ] SDA/SCL, power and ground have documented layer intent and no unexplained
      route-to-centre-and-back detours.
- [ ] No trace crosses a hole, optical keep-out, antenna keep-out, solder tail,
      tape-contact zone or board edge margin.
- [ ] Routing remains compatible with direct soldering and the selected
      removable-mount option.
- [ ] The render clearly distinguishes traces, module outlines, pads and
      non-electrical reference vias.

## Tests

- Endpoint, layer, clearance and backtracking assertions.
- Visual review of top and underside routing at readable scale.
