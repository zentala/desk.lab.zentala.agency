# E003: TS Circuit carrier board — handoff

Status: in progress. Candidate source, output proof and static review portal are
present; physical evidence and qualified external review remain hard gates.

## Mental model

This work produces an AI-authored carrier-board candidate and a complete human
review pack, not a new microcontroller design. The RP2040-Zero remains responsible
for USB and firmware; the received `VL53LDK`-marked GY-530-style board remains a
separate sensor breakout. Marketplace listings sometimes call this family
`VL53L0X`, but that is not proof of the silicon on the received board. The carrier
board makes their I2C and power connection mechanically robust and mountable
under a desk.

The source of truth must be the physical modules on hand. Do not copy a generic
AliExpress pinout into a manufacture-ready PCB without measuring and validating
the supplied boards.

The candidate family now has four variants: A uses the received modules, B is
JLC chip-down, C adds vibration and buzzer feedback, and D uses an ESP32-C3
wireless module. D is USB-powered but sends raw distance and accelerometer
data wirelessly; the computer still owns application state and notifications.

No AI-generated board may be fabricated merely because it renders or exports
Gerbers. An electronics professional or firm must review the candidate first.

## Where work will happen

- TS Circuit project: location to be chosen during task breakdown.
- Product constraints: `research/hardware-v2-pcb-commission-brief.md`.
- Electrical protocol expectations: `research/architecture/FIRMWARE-SPEC.md`.
- Epic decisions and acceptance criteria: `PLAN.md`.
- Review portal: preferred target `board.desk.zentala.internal`; it must be
  reproducible as a static export for reviewers outside the internal network.

## Do not change

- Do not add motor control, relays or mains-voltage circuitry.
- Do not move product software into this website/research repository.
- Do not order boards before the manufacturing review defined in `PLAN.md`.
- Do not represent AI output as reviewed, certified, or fabrication-ready before
  a qualified reviewer has supplied feedback.

## Execution waves

### Wave 1 — establish facts

- [ ] E003-T01 — Capture physical module evidence and pin truth table.
- [x] E003-T02 — Prove TS Circuit output pipeline.

No circuit layout may start until both tasks are complete. A photographed label
or measured dimension always beats a marketplace listing.

### Wave 2 — candidate design and review material

- [x] E003-T03 — Author AI-assisted carrier-board candidate in TS Circuit.
- [ ] E003-T04 — Produce visual-fit comparison and review-pack artefacts. Provisional photo/render comparison and four variant proof sets now exist; measured 1:1 fit remains open.
- [ ] E003-T05 — Publish internal review portal and shareable static export.
- [ ] E003-T08 — Freeze separate BOMs and source contracts for variants A/B/C. Review-time JSON contracts for A–D now exist; current-library verification remains open.
- [ ] E003-T09 — Design Variant A around the received physical modules. Provisional TS Circuit source and proof render exist; measured footprint remains open.
- [ ] E003-T10 — Design Variant B as a JLCPCB-only chip-down board. Candidate source/BOM exist; source-backed footprints and power-tree review remain open.
- [ ] E003-T11 — Add the JLCPCB accelerometer and buzzer to Variant C. Isolated test-point contract exists; driver/current review remains open.
- [ ] E003-T12 — Compare all variants with one application-level test protocol. Shared protocol exists; prototype logs remain open.
- [ ] E003-T13 — Design Variant D around an ESP32-C3 wireless module and a
      transport-neutral sensor payload. Candidate source/BOM exist; RF and transport tests remain open.

### Next implementation loop — Variant A remediation

The latest visual review is recorded in
`reports/2026-09-01-variant-a-post-visual-review-v0.2.md`; findings
E003-F010–F017 are in the hardware review register. Work in this order:

1. E003-T14 — capture 1:1 ToF/RP2040 geometry and characterize VIN and pull-ups; record X/E as auxiliary vias.
2. E003-T15/T16 — replace the provisional ToF/optical model and resolve the power/interface truth.
3. E003-T17 — re-place, route with explicit layer intent and add the USB/access legend.
4. E003-T18/T19 — add collision regression tests and regenerate the review package.
5. E003-T20 — run 1:1 overlay and obtain qualified external feedback.

Do not polish or fabricate Variant D during this loop. Do not treat a green
generated DRC as proof of physical fit or electrical safety.

### Reusable component research

The repository guide [`research/hardware/tscircuit-ecosystem.md`](../../../research/hardware/tscircuit-ecosystem.md)
and local skill [`.claude/skills/tscircuit-hardware/SKILL.md`](../../../.claude/skills/tscircuit-hardware/SKILL.md)
now define the source-search/import workflow. Use E003-T21 before changing the
ToF geometry: the received module has four interface pads, matching most online
GY-530 references, plus two auxiliary vias. No exact package with the
same optical/hole geometry was found in the initial registry/GitHub search, so
a local reusable component may be needed, but it must retain source evidence
and provisional status until verified.

### Wave 3 — human review gate

- [ ] E003-T06 — Source a reviewer/firm and send the review pack.
- [ ] E003-T07 — Record feedback, resolve it, and make the fabrication decision.

No fabrication, order or assembly work is included in this epic. If Wave 3
passes, create a dedicated follow-on epic for prototype fabrication and testing.

## Review questions that the portal must ask

1. Do the physical-module pin map, voltage domains and I2C pull-ups match the
   proposed schematic?
2. Do module footprints, board outline, USB clearance and sensor orientation fit
   the real boards shown in the evidence photos?
3. Are the chosen copper widths, clearances, mounting points and cable-load path
   suitable for a continuously installed under-desk device?
4. Is the export package sufficient and manufacturable by the intended PCB house?
5. What must change before a first prototype is ordered?

## Full board review — 2026-09-01

The cross-variant review is recorded in
[`reports/2026-09-01-full-board-review-v0.3.md`](reports/2026-09-01-full-board-review-v0.3.md).
Only Variant A received the current four-pin ToF correction. B and C remain
placeholder/candidate studies, and D remains a parked ESP32-C3 alternative.
The next implementation loop is measured geometry and power characterization,
then reusable-component comparison, optical/access correction, deliberate
routing, collision regression tests and qualified external review. The browser
review is open at `http://127.0.0.1:4173/visual-fit.html?rev=20260901-v03`.

## Execution checkpoint — 2026-09-02

The initial placeholder state described above has been superseded by the
current source in `hardware/e003-carrier/src/variant-candidates.tsx`:

- B/C use JLCPCB `C2040` (57 pads including exposed GND) and `C2929940`
  (12-pad VL53L0X) footprints.
- C adds the 12-pad `C189624` LIS2DW12TR, a two-lead buzzer body and a
  three-pad low-side driver body.
- D uses all 61 pads of `C2838502` ESP32-C3, the accelerometer and an antenna
  keep-out.
- A remains the received-module reference with 23 RP2040-Zero pads, four ToF
  pads and X/e reference-only geometry.

`npm run check` passes with A–D verification PASS, zero generated TS-Circuit
errors, complete source-register validation and a packaged static portal. B–D
still have no claimed copper routes until the pin-level netlist and exact
support-part sources are reviewed. Physical measurements, power
characterization, manufacturing exports and qualified external review remain
open; fabrication is blocked.
