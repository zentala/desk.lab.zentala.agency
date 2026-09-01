---
epic: E003
created: 2026-09-01
status: in_progress
---

# E003: TS Circuit carrier board for Hardware v2

## Goal

Produce an AI-authored, professionally reviewable family of four carrier-board
candidates in TS Circuit: (A) the supplied RP2040-Zero plus received
`VL53LDK`-marked GY-530-style ToF breakout, (B) a JLCPCB-only chip-down board,
 (C) that same JLCPCB board with vibration sensing and a buzzer, and (D) an
ESP32-C3 wireless board using USB power only.

## Scope

In scope:

- establish a reproducible TypeScript/TS Circuit board-design workspace;
- inspect the exact physical modules before committing to a footprint or pin map;
- capture the electrical design: USB-powered RP2040-Zero, `VL53LDK`-marked
  breakout I2C connection,
  programming/test access, and any required level or power adaptation;
- create a compact two-layer carrier-board layout with mounting and mechanical
  constraints for under-desk use;
- keep the four variants electrically comparable so the same application test
  can distinguish module, chip-down, vibration and buzzer failures;
- prepare an electronics-review pack: architecture, measured module data,
  TS Circuit source, rendered board, prompt/context, open questions and exports;
- publish that pack as an internal review portal, preferably at
  `board.desk.zentala.internal`, with a shareable static export if a reviewer
  cannot access the internal hostname;
- find an electronics professional or firm for a paid review, or invite a
  qualified community reviewer through channels such as LinkedIn;
- incorporate review feedback and obtain an explicit pre-fabrication decision.

Out of scope:

- desk motor control, relays, mains voltage, or a custom USB controller;
- redesigning the RP2040-Zero or sensor breakout modules themselves;
- the Electron app, sensor daemon, notification algorithm, or production shipping;
- assuming a 1.5 m measurement range before testing on the target desk and floor;
- treating the marketplace `VL53LDK`/`UL53LDK` marking as proof of a specific
  silicon die or regulator output;
- ordering, assembling, or self-certifying a PCB before qualified review.

## Decision

Use TS Circuit as the source of truth for an AI-assisted carrier-board candidate.
Before fabrication, a qualified electronics reviewer—not the AI—must review the
design and provide actionable feedback or approval. The review context must be
available as a dedicated internal portal and static review pack. These decisions
are recorded in [ADR-001](../../ADR/001-tscircuit-for-hardware-v2-carrier-board.md)
and [ADR-002](../../ADR/002-external-review-before-pcb-fabrication.md).

TS Circuit is suitable for this limited board because it supports TypeScript-based
circuit design, browser previews, and exports for manufacturing. It requires
explicit component placement and its autorouter is still evolving, so routing
quality must be inspected manually before fabrication. [TS Circuit README](https://github.com/tscircuit/tscircuit)

## Acceptance criteria

- [ ] The board source is TypeScript, committed with a reproducible install and
      export command.
- [ ] The exact received RP2040-Zero and `VL53LDK`-marked breakout dimensions, pad spacing,
      pinouts and supply requirements are recorded with photos/measurements.
- [ ] Variants A, B, C and D have separate BOMs, source provenance and test gates;
      no JLCPCB-only claim depends on the received marketplace module.
- [ ] Variant C's accelerometer interrupt and buzzer driver have isolated nets,
      documented current limits and independent tests.
- [ ] Variant D sends the same raw sensor payload over a documented BLE/Wi-Fi
      transport while reserving USB for power and optional debug only.
- [ ] Each asserted pad and pin is verified against both the physical board's
      silkscreen and an authoritative source; discrepancies are recorded rather
      than silently resolved by guesswork.
- [ ] The schematic connects power, ground, SDA and SCL correctly and documents
      all unused or optional pins.
- [ ] The layout is a two-layer carrier board with no loose jumper wires in the
      finished assembly.
- [ ] USB, sensor optics, BOOTSEL/programming access and mounting are physically
      usable after both modules are installed.
- [ ] A reviewer can access one self-contained portal/page containing the problem,
      architecture, source links, module photos, measurements, schematic, layout,
      design prompt, manufacturing exports and explicit review questions.
- [ ] The portal has no secrets, private purchase data, or dependence on a public
      production launch; a static export is available for external reviewers.
- [ ] At least one qualified reviewer or electronics firm gives written feedback.
- [ ] Every review finding is recorded as accepted, resolved, or explicitly
      deferred by the owner before fabrication is considered.
- [ ] Gerbers, drill files, BOM, placement data if applicable and assembly notes
      are exported only as a candidate review package, not treated as an order.
- [ ] The output pipeline has been proved using a minimal TS Circuit test design:
      every promised artefact is generated, opened independently, and listed with
      its tool/version and verification status.

## Constraints

- Use the existing RP2040-Zero and `VL53LDK`-marked breakout modules; validate the actual revision,
  not marketplace screenshots alone.
- Variants B/C/D use only parts with a verified JLCPCB/EasyEDA source at the time
  of review; the selected RP2040, ToF IC, flash, regulator, accelerometer and
  buzzer and ESP32-C3 module IDs are recorded in the variant BOM.
- The final sensor faces downward and must retain an unobstructed, cleanable
  optical path.
- The board must tolerate continuous under-desk use, cable pulls and light knocks.
- Human review is a hard gate before fabrication; AI output is a draft, not an
  approval or a substitute for electrical engineering accountability.
- v2 must document its USB/wireless protocol, power budget and mechanical interfaces so
  later sensor, haptic-feedback and button-panel variants can share the desktop
  application where practical. Those variants are backlog items, not E003 scope.
- Keep project files and documentation in English; the repository remains the
  durable source of truth.

## Evidence and output contract

The project has three distinct artefact layers. They must not be conflated.

| Layer | Purpose | Required evidence/output |
|---|---|---|
| Physical evidence | Establish what was actually bought | Top/bottom photographs, ruler/caliper photos, board markings, connector orientation, pin labels, measurements and links to primary documentation |
| Design source | Describe the candidate board | Versioned TS Circuit source, net/pin truth table, schematic, PCB render, 3D render where supported, board outline and mechanical notes |
| Review/manufacturing package | Let an external person inspect it without private chat history | Rendered images/PDFs, export manifest, Gerbers/drills/BOM/placement data where supported, known assumptions, explicit questions and change log |

The evidence record is a prerequisite for the design source. A listing image is
useful context but never sufficient proof of a pin map. The visual-fit review
must overlay or compare the generated carrier-board layout with photographs of
the real modules, including the exact silkscreen labels and connector direction.

TS Circuit's official documentation describes PCB, schematic and 3D previews,
as well as fabrication-file, BOM and pick-and-place generation. The exact files,
formats and command sequence supported by the selected version are a discovery
task, not an assumption: E003-T02 must prove and record them before we promise
them to a reviewer or manufacturer. [TS Circuit documentation](https://docs.tscircuit.com/)

## Architecture impact

This is a product-research artefact in the current repository, not application
code. It updates the Hardware v2 implementation path from a contractor-designed
carrier board to a repository-owned TS Circuit design. It establishes the first
documented hardware interface for a future board family, but no database or
software architecture changes are required in this epic.

## Test strategy

1. **Review-pack completeness:** verify that a reviewer can understand the design
   without a private chat history or access to the author's machine.
2. **Professional design review:** request checks of power domains, I2C voltage
   compatibility, module footprints, board outline, mechanical load paths,
   copper clearances and manufacturability.
3. **Feedback closure:** track each finding to a source/design change or an
   explicit owner decision; obtain reviewer confirmation for material changes.
4. **Future prototype test:** only after review and fabrication, perform the
   electrical bring-up, USB soak test and under-desk field test.

## Planning sequence

1. Build the physical evidence record and freeze a source-backed pin truth table.
2. Bootstrap TS Circuit and prove its actual output pipeline using a minimal test.
3. Capture the schematic and mechanical constraints, then produce the candidate
   board using an AI-assisted workflow.
4. Create a visual fit check from real module photography and the generated board.
5. Build the internal review portal and static review export from the same source.
6. Identify and contact a suitable reviewer or firm with the review pack.
7. Record and resolve feedback. Only then decide whether to create a separate
   fabrication/prototype epic.

## Decisions and ADRs

- [ADR-001: TS Circuit for the Hardware v2 carrier board](../../ADR/001-tscircuit-for-hardware-v2-carrier-board.md)
  — repository-owned TypeScript design is preferred for this simple adapter;
  manual routing review is mandatory.
- [ADR-002: External review before PCB fabrication](../../ADR/002-external-review-before-pcb-fabrication.md)
  — AI-assisted output is a review candidate; qualified human feedback gates
  any fabrication decision.
- [ADR-003: Four hardware validation variants](../../ADR/003-three-hardware-board-variants.md)
  — separate received-module, JLC chip-down, JLC feedback and wireless candidates keep
  assumptions and failure modes attributable.

## References

- [Hardware v2 specification](../../../research/hardware-v2-spec.md)
- [PCB commission brief](../../../research/hardware-v2-pcb-commission-brief.md)
- [Firmware protocol specification](../../../research/architecture/FIRMWARE-SPEC.md)
