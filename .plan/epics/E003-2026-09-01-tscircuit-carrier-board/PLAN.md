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

## Revision 2026-09-01 — Variant A post-visual review

### TL;DR

Variant A remains the only active implementation target. The generated candidate
now has the expected pad count and named routes, but the ToF footprint, optical
geometry and power input are not measured or electrically verified. The full
review and implementation sequence is recorded in
[`reports/2026-09-01-variant-a-post-visual-review-v0.2.md`](reports/2026-09-01-variant-a-post-visual-review-v0.2.md).

### Problem and current state

The browser review confirmed that the current render is internally coherent but
not a 1:1 representation of the received ToF board. `src/carrier.tsx` uses
provisional four-pin coordinates plus two auxiliary-via reference marks, a
provisional 10.5 × 13.3 mm envelope, a
generic circular optical keep-out and a long perimeter/centre routing scheme.
The carrier has only a generic `USB-C ACCESS` label. Generated DRC and
`npm run check` are green, but the evidence record explicitly says that board
dimensions, pad coordinates, regulator behaviour and pull-ups remain pending.

### Scope

In scope:

- measured ToF and RP2040-Zero geometry and electrical characterization;
- measured footprint, optical opening, access legend and mechanical clearances;
- deliberate two-layer placement and routing for Variant A;
- collision regression checks and review-portal clarity;
- regenerated artefacts followed by a qualified external review.

Out of scope:

- implementing or polishing Variants B–D in this loop;
- fabrication, ordering or assembly;
- changing the desktop software, firmware protocol or product architecture.

Constraints:

- fabrication remains blocked until evidence and human review close the gate;
- the two `X`/`E` features are treated as auxiliary vias, not schematic pins or
  carrier-board holes;
- no electrical assumption may be made true by changing a label or test.

### Implementation strategy

1. **Wave 0 — evidence.** Capture 1:1 board measurements and characterize the
   ToF VIN/rail and pull-ups. This precedes source edits because the current
   geometry and power path are the disputed facts.
2. **Wave 1 — footprint and mechanics.** Update evidence and assumptions, then
   rebuild the four-pin ToF footprint and optical/access model in `src/carrier.tsx`.
3. **Wave 2 — routing and readability.** Re-place from measured datums, route
   with explicit layer intent, and add a clear USB/power/I2C/control legend.
4. **Wave 3 — validation.** Extend `scripts/validation-lib.mjs` plus tests for
   hole, trace, keep-out, silkscreen and board-edge collisions; regenerate the
   portal and manifest.
5. **Wave 4 — gate.** Run the full check, browser review and 1:1 overlay, then
   send the package to a qualified electronics reviewer. Fabrication remains a
   separate follow-on decision.

Architecture impact: none. This is a stricter implementation of the existing
TS Circuit carrier-board architecture; no new component, data flow or
integration is introduced.

Test strategy:

- footprint/mechanics: a measured-coordinate fixture and 1:1 overlay must fail
  today because the current ToF values are marked provisional;
- routing: route endpoint, layer, clearance and no-backtracking assertions must
  fail on an injected trace/keep-out collision;
- collision checks: negative fixtures for hole/pad, trace/hole and silk/pad
  overlap must fail today because those relationships are not all asserted;
- review portal: browser inspection must show A active, D parked, all six ToF
  pads and the access legend, with zero console errors;
- release gate: `npm run check` must pass with zero generated Circuit errors and
  the fabrication flag must remain false until external feedback is recorded.

### Definition of done

- measured ToF pad centres, outline, hole and optical datum replace provisional
  coordinates in the source and evidence;
- the electrical record resolves the ToF input rail and pull-ups, while X/E are
  represented only as non-electrical auxiliary vias;
- the render shows all module outlines/pads, readable access legend, optical
  clearance, mounting holes and intentional two-layer routes;
- injected geometry collisions fail automated checks and the candidate passes;
- the portal and static export show only A as active and retain the blocked gate;
- qualified external feedback is recorded before any fabrication epic starts.

### Subtasks

| # | Task | Files | Depends on | Points | Tests | Commit |
| --- | --- | --- | --- | ---: | --- | --- |
| E003-T14 | Capture measured module and electrical evidence | `evidence/*`, `hardware-spec.md` | owner measurements | 5 | evidence completeness check | `docs(hardware): record measured module evidence` |
| E003-T15 | Replace provisional ToF footprint and optical model | `src/carrier.tsx`, `src/design-assumptions.json` | T14 | 8 | exact pad/hole/optical fixture | `fix(hardware): align Variant A ToF geometry` |
| E003-T16 | Resolve power path and four-pin interface truth table | `src/carrier.tsx`, `evidence/pin-truth-table.json`, `hardware-spec.md` | T14 | 5 | rail and four-pin contract tests | `fix(hardware): resolve Variant A sensor interface` |
| E003-T17 | Re-place, route and add access legend | `src/carrier.tsx`, `mechanical-constraints.md` | T15, T16 | 8 | route endpoint/layer/clearance checks | `fix(hardware): simplify Variant A placement and routing` |
| E003-T18 | Add geometry collision regression checks | `scripts/validation-lib.mjs`, `scripts/validation.test.mjs` | T17 | 5 | injected overlap fixtures | `test(hardware): cover carrier geometry collisions` |
| E003-T19 | Refresh portal, docs and generated review package | `review-portal/*`, `visual-fit-checklist.md`, `CHANGELOG.md` | T18 | 3 | browser/manifest/package checks | `docs(hardware): refresh Variant A review package` |
| E003-T20 | Run 1:1 review and obtain external feedback | review report, reviewer response | T19 | 5 | full `npm run check` + manual review | `docs(hardware): record Variant A external review` |

### Revision 2026-09-01 — reusable tscircuit component research

The project now has a repository-level guide at
[`research/hardware/tscircuit-ecosystem.md`](../../../research/hardware/tscircuit-ecosystem.md)
and a reusable agent skill at
[`.claude/skills/tscircuit-hardware/SKILL.md`](../../../.claude/skills/tscircuit-hardware/SKILL.md).
This resolves the process gap that caused the ToF board to be treated as a
generic four-pad GY-530. The ecosystem has reusable packages and import paths,
but no exact ToF package with the received board's complete geometry was found
during the 2026-09-01 search.

| ID | Task | Deliverable | Depends on | Estimate | Acceptance gate |
|---|---|---|---|---:|---|
| E003-T21 | Search registry, JLCPCB, KiCad and GitHub for exact module assets | candidate register with URLs, licenses and source confidence | T14 | 3 | every candidate compared against received-board evidence |
| E003-T22 | Extract a reusable four-pin ToF component with auxiliary-via reference geometry from the best verified evidence | isolated TSX footprint/component with outline, hole, optical keep-out and evidence metadata | T21 | 8 | four electrical pads plus non-electrical auxiliary-via marks; no generic geometry substitution |
| E003-T23 | Integrate and validate reusable component in Variant A | updated carrier, checks, front/back render and 1:1 review package | T22, T18 | 5 | `npm run check`, collision tests and manual overlay review pass |

Each task has an observable acceptance condition above and must be committed
independently after its checks pass. T20 is not complete without written
qualified feedback; no task author may self-approve fabrication.

### Revision 2026-09-01 — full board review

The cross-variant review is recorded in
[`reports/2026-09-01-full-board-review-v0.3.md`](reports/2026-09-01-full-board-review-v0.3.md).
It confirms that only Variant A received the latest four-pin ToF correction;
B and C remain candidate studies and D remains parked. The next work is
measured evidence, power characterization, reusable-component comparison,
measured mechanical overlay, deliberate routing and collision regression tests.
Fabrication remains blocked.

### Risks and GAPS

Risks: the received ToF may use a different pad pitch or voltage topology than
the vendor family; the USB/BOOT/RESET access envelope may require a larger
carrier; TS Circuit may expose limitations in explicit two-layer or geometry
checks. Early signals are disagreement in the measured overlay, unexpected
rail continuity, or a generated diagnostic after re-routing.

GAPS: no new physical measurements, side photos or external review were
available during this planning pass; exact manufacturing export behaviour on
the current Windows policy remains unverified.

### Decisions and ADRs

ADR-001, ADR-002 and ADR-004 remain in force. No new architecture decision is
introduced by this revision; it records implementation gates for the existing
Variant A decision.

## Revision 2026-09-02 — accepted compact all-variant implementation wave

The owner accepted implementation of the variants and requested a materially
smaller board. ADR-005 records the resulting mechanical direction: the default
is a frameless compact carrier with a documented technical edge margin,
underside adhesive compatibility and an explicit comparison of direct
soldering versus low-profile removable mounting. A narrow frame is a fallback
only when a mechanical or serviceability review shows that the frameless design
is unsafe.

The implementation is ordered so that geometry and source truth precede
routing. The current generic `pinrow4_p2.54mm` previews are not acceptable
implementations: A must use the complete received RP2040-Zero and ToF module
geometry; B/C must use complete chip-down packages and support circuitry; D
must use the complete selected ESP32-C3 module/package. C must show real
accelerometer and buzzer footprints, not dots or test points.

### Accepted implementation sequence

1. **Source truth:** complete the authoritative component/source register and
   reusable measured/package assets (E003-T21–T22).
2. **Mechanical contract:** freeze the minimum envelope, edge/keep-out rules,
   underside tape clearance and serviceability options (E003-T24).
3. **Variant implementation:** compact received-module A, complete chip-down
   B, feedback C and wireless D (E003-T23, E003-T25–T27).
4. **Routing:** use explicit two-layer intent, short readable connections and
   no unexplained detours or mechanical conflicts (E003-T28).
5. **Verification:** enforce pad counts, outlines, holes, functional bodies,
   routes, collision fixtures and distinct generated renders (E003-T29).
6. **Review surface:** publish all variants on one progressive-disclosure page
   and run a qualified cross-variant engineering review (E003-T30–T31).

### Definition of done for this wave

- The page shows distinct, full-board renders for all implemented variants.
- No variant relies on a generic four-pad controller/sensor placeholder.
- A's ToF has four electrical pads plus the two auxiliary X/E vias, with the
  measured outline, optical opening and mounting hole represented separately.
- C's accelerometer and buzzer are real, dimensioned components with isolated
  nets and a documented driver path.
- Board size is justified by measured envelopes and keep-outs; decorative
  perimeter space is removed unless the fallback trigger is documented.
- Automated checks and browser review catch missing pads, duplicate images,
  collisions and routing regressions before external review.
- Fabrication remains blocked until ADR-002's qualified review gate closes.

### New tasks

See task files E003-T21 through E003-T31 in `tasks/`. Each task has an
independent proposed commit and acceptance checks. E003-T31 is the final gate
for this implementation wave; it does not authorize fabrication by itself.

### Decisions and ADRs

- [ADR-005: Compact frameless carrier with mechanical fallback](../../ADR/005-compact-carrier-mounting-strategy.md)
  — minimum compact geometry and mounting policy.
- ADR-003 remains the source of truth for the A/B/C/D electrical variant
  semantics; E003-T29 enforces that their physical assets are complete.

## Execution checkpoint — 2026-09-02

The implementation wave is in review state. The source register and asset map
are present, B/C/D no longer use `pinrow4` placeholders, and the generated
verification report passes all four candidates. C contains real accelerometer,
buzzer and driver geometry; D contains the complete 61-pad ESP32-C3 module and
antenna keep-out. The portal and static export include the current status and
source provenance.

E003-T28 remains open because B–D copper routing is intentionally not claimed
before the pin-level netlist and exact support-part selection are reviewed.
E003-T31, physical measurements, power characterization, manufacturing export
verification and qualified human review remain open. Fabrication is blocked.
