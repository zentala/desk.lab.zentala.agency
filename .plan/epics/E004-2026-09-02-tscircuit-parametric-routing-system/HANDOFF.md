---
epic: E004
status: planned
---

# E004: execution handoff

This is the implementation handoff for a new session. Read `PLAN.md` and
ADR-006 through ADR-011 before touching `hardware/e003-carrier`. E003 is historical
input and must remain reproducible while the new architecture is introduced.

## Mental model

The board is a resolved product model, not a JSX drawing. Evidence defines
parts; components expose ports; a variant selects capabilities; a netlist
declares electrical intent; placement resolves geometry; routing creates PCB
traces; verification decides whether the result is internally consistent; the
portal only presents the resolved result.

```text
PartSpec → ComponentSpec → CarrierVariant → Netlist
                                      ↓
                              PlacementPlan
                                      ↓
                              RoutingPlan
                                      ↓
                         ResolvedBoardDesign v1
                        ↙        ↓          ↘
                  maturity   impact diff    adapters
                             ↙      ↓       ↘
                        checks   renders   portal
```

## Allowed write areas

- `hardware/e003-carrier/src/` — new typed domain, component, board and
  routing modules;
- `hardware/e003-carrier/scripts/` — resolver, verifier and report tooling;
- `hardware/e003-carrier/evidence/` — source/provenance updates only;
- `hardware/e003-carrier/review-portal/` — generated review presentation;
- `hardware/e003-carrier/artifacts/` and `exports/` — generated outputs;
- E004 task files, journal, reports and relevant ADR links.

Do not modify firmware, application code, Astro pages or the E003 historical
decision records except to link the new system where necessary.

## Waves and dependencies

### Wave 0 — baseline and contracts

- [ ] T01 baseline snapshots and invariants
- [ ] T02 architecture module boundaries
- [ ] T03 typed source/evidence contracts

### Wave 1 — reusable design system

- [ ] T04 reusable component library
- [ ] T05 typed variant configuration and factory
- [ ] T06 canonical netlist and endpoint resolver

### Wave 2 — physical generation

- [ ] T07 parametric placement and constraints
- [ ] T08 routing policy and adapter boundary
- [ ] T09 autorouter experiment and deterministic fallback

### Wave 3 — migration

- [ ] T10 migrate Variant A with parity checks
- [ ] T11 migrate and route Variants B/C/D
- [ ] T12 enforce electrical and geometry release gates

### Wave 4 — reviewable system

- [ ] T13 portal/report route-status integration
- [ ] T14 CI, reproducibility and extension fixture
- [ ] T15 architecture review and implementation handoff

Dependencies are encoded in task frontmatter. Do not start migration before
T06 has a resolved netlist contract, and do not call a route complete before
T12 passes with negative fixtures.

## Implementation rules

- Keep functions under 50 lines and files under 250 lines where practical.
- Use discriminated unions and pure functions for domain resolution.
- Keep the domain core free of React, tscircuit, filesystem and network imports.
- Use composition for capabilities: controller + sensor + feedback + transport.
- Use typed physical units and named board/component datums.
- Keep provider-specific tscircuit props at the adapter edge.
- Compute maturity from gate results; never assign a promotional status directly.
- Emit a semantic impact report before accepting regenerated artefact changes.
- Never infer a pin connection from physical proximity or a label alone.
- Never treat a green render as proof of connectivity or fabrication readiness.
- Every automatic route must be reproducible, inspectable and replaceable by an
  explicit locked route for critical nets.

## Verification commands

Run from `hardware/e003-carrier` after every migration wave:

```text
npm test
npm run test:verification
npm run typecheck
npm run prove:variants
npm run verify:boards
npm run validate
npm run package:portal
npm run check
```

The final review must inspect A/B/C/D PCB and schematic views, route status,
critical-net report, source register and portal console output. Fabrication is
not part of this epic's implementation authority.

## Rollback

Keep the E003 source entry point and generated artefacts until the new factory
passes parity and negative tests. If routing integration is unstable, retain
the canonical netlist and use explicit deterministic routes while the router
adapter is isolated behind its interface.
