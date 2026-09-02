# ADR-009: Keep a functional core behind edge adapters

- **Status**: accepted
- **Date**: 2026-09-02
- **Epic**: E004

## Context

The current board source mixes product decisions, tscircuit JSX, generated
geometry and filesystem-oriented proof scripts. That makes domain rules hard to
test without rendering and risks leaking provider syntax into every component.
The system also needs to tolerate a future router or export-tool replacement.

## Decision

Use a functional core with imperative adapters:

- the core owns immutable part, variant, netlist, placement, routing-request,
  validation and maturity models;
- the core consists of pure functions and does not import React, tscircuit,
  filesystem, network or portal types;
- adapters load evidence, render tscircuit JSX/Circuit JSON, invoke a router,
  write artefacts and package the review portal;
- every adapter translates to or from one versioned resolved-design contract.

## Alternatives

- **Use tscircuit JSX as the domain model** — rejected because connectivity and
  validation would remain coupled to one renderer.
- **Create class-based services for every layer** — rejected because most work
  is deterministic transformation without mutable lifecycle state.
- **One orchestration script** — rejected because it is difficult to test and
  replace individual providers safely.

## Consequences

Positive:

- most architecture tests run without rendering or network access;
- tscircuit, autorouter and portal changes stay at the edge;
- deterministic inputs produce deterministic resolved models;
- failures can be attributed to evidence, domain resolution, routing or output.

Trade-offs:

- adapters require explicit mapping code;
- the resolved contract must remain small and versioned;
- integration tests are still required because pure-core tests cannot prove a
  provider renders or exports correctly.
