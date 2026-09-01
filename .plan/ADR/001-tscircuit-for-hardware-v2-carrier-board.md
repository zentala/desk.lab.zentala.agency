# ADR-001: Use TS Circuit for the Hardware v2 carrier board

- Status: accepted
- Date: 2026-09-01

## Context

Hardware v2 must permanently connect an RP2040-Zero and a ToF sensor module on a
small, durable carrier board. The previous plan was to outsource the initial PCB
design. The owner wants to retain the design as versioned project source and is
prepared to make the first iteration directly.

## Decision

Use TS Circuit as the carrier board's design source. Keep the design in the
repository, export manufacturing artefacts from it, and manually review placement,
routing and Gerbers before fabrication.

The design is organized as three explicit variants; see
[ADR-003](003-three-hardware-board-variants.md). Variant A retains the received
modules, while Variants B/C are JLCPCB chip-down candidates.

## Consequences

Positive:

- the circuit is reviewable and reproducible as TypeScript source;
- later revisions do not depend on an external contractor's private project;
- a small two-module I2C board is a constrained first use case.

Trade-offs:

- TS Circuit requires explicit placement and its autorouting remains under active
  development; it cannot replace electrical and manufacturing review;
- the team must validate the actual breakout-board geometry and pinout before
  treating generated artefacts as fabrication-ready;
- a fallback to KiCad remains available if TS Circuit cannot express or export a
  correct manufacturing package.

## Alternatives considered

- **Outsource the PCB:** faster access to specialist experience, but less direct
  control and weaker repeatability for a simple first board.
- **KiCad from the start:** mature and widely supported, but does not meet the
  owner’s goal of maintaining this small design as TypeScript source.
