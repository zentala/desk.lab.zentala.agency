# E003 review pack specification

## Purpose

Let an electronics reviewer assess the proposed carrier board without needing
access to the author's private messages, browser history or physical desk.

## Required inputs: physical evidence

For both RP2040-Zero and the `VL53LDK`-marked ToF breakout, capture:

- high-resolution photographs of front and back, with all silkscreen readable;
- one photograph beside a ruler and, where available, a caliper measurement;
- photos of the connector and sensor orientation from the side;
- exact board markings, seller listing URL, order variant and received quantity;
- an authoritative datasheet or manufacturer page;
- a pin truth table: physical label, claimed function, voltage domain, evidence
  source, and validation status.

If physical markings contradict a listing or documentation, stop and mark the
pin as unresolved. Do not design around a guessed mapping.

## Required outputs: TS Circuit candidate

- TypeScript source and lockfile/tool version;
- schematic render (SVG or PDF);
- PCB top and bottom render (PNG/SVG/PDF);
- 3D render/screenshot when the selected TS Circuit version supports it;
- net list and component-to-pin mapping;
- board outline, mounting-hole coordinates and mechanical keep-out notes;
- generated fabrication files, BOM and placement data only after E003-T02 has
  demonstrated the exact supported export path.

## Visual-fit verification

Create a comparison sheet for each module:

1. photo of the actual module, top and bottom;
2. annotated dimensions and connector/sensor orientation;
3. carrier-board footprint/render at the same scale;
4. overlay or side-by-side comparison;
5. checklist confirming pad count, pitch, orientation, silkscreen alignment,
   USB clearance, optical opening and mounting clearance.

## Portal structure

The preferred internal target is `board.desk.zentala.internal`. It may be a
static page; it does not require authentication, accounts or a database for this
first iteration. It must have a portable static export for external reviewers.

1. **Overview** — problem, non-goals, architecture and review request.
2. **Evidence** — actual component photographs, dimensions and pin truth tables.
3. **Design** — TS Circuit source, schematic, PCB/3D renders and constraints.
4. **Manufacturing candidate** — export manifest and generated files.
5. **AI context** — the controlled design prompt, assumptions, model/tool version
   and design decisions; never private credentials or unrelated conversation.
6. **Review checklist** — concrete questions and a place to record findings.
7. **Change log** — revision, reviewer feedback, disposition and links to diffs.

## Reviewer feedback format

Every finding receives an ID, severity, affected artefact, reviewer rationale,
owner decision and closure evidence. Suggested statuses: `open`, `resolved`,
`accepted-risk`, `not-applicable`. Fabrication remains blocked while a critical
or high-severity finding is open.
