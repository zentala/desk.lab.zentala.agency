# E003 journal

## 2026-09-01 — Epic created

Owner chose a repository-owned TS Circuit design path for the Hardware v2 carrier
board instead of outsourcing the initial PCB design. Planning has started; no
board design or fabrication work has been performed.

## 2026-09-01 — Review-first workflow chosen

The owner refined the approach: AI and TS Circuit will create the board candidate,
but an electronics firm or qualified community reviewer will review it before any
fabrication. E003 now includes a complete internal review portal and shareable
static review pack, with `board.desk.zentala.internal` as the preferred portal
hostname. No outreach, fabrication, or board implementation has been performed.

## 2026-09-01 — Future board family captured

The owner identified later variants: a vibration/presence experiment, a small
haptic actuator, and an up/down button-panel board. They are recorded in the
global backlog as separate future work. E003 remains limited to the simple v2
carrier-board candidate and its human-review workflow, while documenting an
interface that later variants can reuse.

## 2026-09-01 — Implementation started

Added `hardware/e003-carrier/` with pinned TS Circuit dependencies, a
placeholder carrier source, physical-evidence and pin-truth-table templates,
mechanical constraints, controlled AI context, export manifest and a portable
seven-section review portal. A minimal core render proof generated Circuit JSON
and independent schematic/PCB SVG files. The actual module footprint remains
deliberately unresolved until photographs and measurements are supplied; no
fabrication or professional approval is implied.

## Session 2026-09-01 (auto — session ended without done.)
- **Note**: Session ended without `done.` command. No journal was written.
- **State at exit**: see STATE.md for last known state
- **Action needed**: next session should review what happened and write proper journal

## 2026-09-01 — Three validation variants and JLCPCB catalogue research

The received blue distance board is accepted as the Variant A physical reference
under its marketplace `UL53LDK`/`VL53LDK` marking. The visible `662K` SOT-23
device is recorded as a probable LDO, but its output and exact manufacturer are
unresolved. JLCPCB catalogue research found Waveshare sensor-module records
`C431944` (VL53L0X) and `C431945` (VL53L1X), bare RP2040 `C2040`, bare sensor IC
entries, ST `LIS2DW12TR` accelerometer `C189624`, and multiple buzzer entries.
These records are PCBA/CAD inputs, not proof of the die or regulator on the
received module.

ADR-003 and `hardware/e003-carrier/board-variants.md` define Variant A (received
modules), Variant B (JLCPCB chip-down), and Variant C (JLCPCB chip-down plus
vibration and buzzer). Tasks E003-T08 through E003-T12 cover BOM provenance,
the three designs and a shared prototype test protocol. Source implementation
is intentionally deferred to the execution session after plan handoff.

## 2026-09-01 — Variant D wireless ESP32 board

Owner added a fourth candidate: an ESP32 board powered from USB but sending the
same raw sensor payload wirelessly to the computer. The desktop remains the
owner of buffering policy, posture state and notifications; the board may only
keep a short diagnostic/sample buffer. JLCPCB research identified the
dual-core ESP32-S3 as the strongest general-purpose option. After separating
compute from transport, the selected first RF prototype is the simpler
`ESP32-C3-MINI-1-N4` (`C2838502`); S3 remains the high-compute alternative and
ESP32-C6 remains the Wi-Fi 6/Thread/Zigbee alternative. Variant D now includes
the LIS2DW12TR so distance and vibration data are both sent wirelessly; it has
no local buzzer.

## 2026-09-01 — Review blocker remediation started

The E003 audit found two implementation blockers in the existing T01/T02 work:
the placeholder sensor pin order contradicted the photographed module labels,
and a clean npm install could not run either proof script because
`@tscircuit/checks` was not installed at the workspace root. This execution
session is limited to correcting the physical pin contract, strengthening the
automated checks and restoring clean-install reproducibility. The separate
scope problem between pre-fabrication design and post-fabrication prototype
testing remains deferred for a dedicated planning session.

## 2026-09-01 — Review blockers remediated

Commit `c7ee828` corrected the photographed sensor edge order to
`VIN/GND/SCL/SDA`, made the pin truth table machine-checkable, and added
regression tests for pin and net drift. It also pinned the missing
`@tscircuit/checks` peer, expanded `npm run check` to cover tests, typechecking,
both render proofs, diagnostics and manifest generation, and added deterministic
source/artifact hashes plus independent JSON/SVG format checks.

A clean `npm ci --ignore-scripts` followed by `npm run check` passes with zero
Circuit JSON errors. Seven placeholder-related warnings and six unresolved
physical-evidence rows remain visible in the manifest; fabrication stays
blocked. Planning corrections for epic scope, review-gate dependencies and the
RP2040-Tiny/RP2040-Zero source-of-truth conflict are recorded in `IMPRO.md` for
a separate planning session.

## 2026-09-01 — Owner accepts provisional inputs for T03

The owner directed the project to proceed using the evidence and assumptions
already recorded in the repository instead of waiting for new ruler, caliper or
electrical measurements. T03 may therefore develop a review candidate using the
documented RP2040-Zero and GY-530-style envelopes, 2.54 mm interface pitch and
the photographed `VIN/GND/SCL/SDA` order.

This is an execution waiver for a provisional design, not a claim that the
received modules were measured or electrically characterized. The source,
manifest and review material must preserve that distinction. ADR-002 remains
unchanged: fabrication is blocked until a qualified reviewer accepts the
electrical assumptions, mechanical fit and manufacturing outputs.

## 2026-09-01 — RP2040-Zero selected as Hardware v2 source of truth

The owner explicitly selected RP2040-Zero, not RP2040-Tiny. ADR-004 makes the
choice product-wide: Variant A uses the received RP2040-Zero and its onboard
USB-C connector, with GP4/GP5 as the provisional I2C0 pair. Active PRD,
hardware, firmware, architecture, roadmap and repository guidance documents
were synchronized. Historical session and superseded epic narratives retain
Tiny only when describing the earlier decision.

## 2026-09-01 — T03 provisional carrier candidate completed

The RP2040-Zero carrier candidate now records the owner-accepted 48 × 32 mm
board, module envelopes, USB-C and optical keep-outs, four mounting holes and
four diagnostic test points. Generated PCB and schematic SVGs are non-empty,
the circuit has no error diagnostics, and all schematic components and traces
are assigned to the `Main` sheet.

The clean-worktree workflow passed `npm ci --ignore-scripts` and the final
`npm run check` passed eight tests, typecheck, both proof generators,
validation and manifest hashing. Six warnings remain visible in the manifest;
fabrication remains blocked. Commits: `bbe2721`, `7ca9b80`.

## 2026-09-01 — A–D variant review package implemented

Added four machine-readable BOM/source contracts, a shared raw-sensor payload and
prototype test protocol, and a single TS Circuit source that generates independent
Circuit JSON, schematic and PCB proof artefacts for variants A, B, C and D. Variant
C exposes separate vibration-interrupt and buzzer-driver test points; Variant D
uses the same sensor contract with USB power-only and no local buzzer.

Added a photo/render visual-fit page, variant matrix and a packaging script that
creates `review-portal/export/` with copied assets and relative links. Extended
validation and the deterministic manifest to cover the variant contracts and 18
proof artefacts. `npm run check` passes. The work remains a provisional review
candidate: measured module geometry, JLC library/package verification, native CLI
manufacturing exports and qualified external review are still open gates.

## 2026-09-01 — Variant A post-visual review and remediation plan

The browser review of the current Variant A render confirms progress over the
previous four-pad placeholder: all 23 RP2040-Zero pads, four ToF interface pads
and two auxiliary via features,
module outlines, a ToF clearance hole and four named nets are present. It also
confirms that the ToF is still only a provisional envelope. The optical area is
modelled as a generic circle, the USB/access legend is insufficient for a human
review, the power input is electrically unresolved, and the routes are
connected but visually indirect.

Findings E003-F010 through E003-F017 were added to the review register. The
implementation plan is appended to `PLAN.md` and expanded in
`reports/2026-09-01-variant-a-post-visual-review-v0.2.md`. The next loop is
ordered as measured evidence and electrical characterization, measured ToF
footprint/optics, placement and routing, collision regression tests, portal
refresh and qualified external review. Variant D remains parked; fabrication
remains blocked.

## 2026-09-01 — tscircuit ecosystem and reusable component workflow

Researched the official tscircuit documentation and repositories, including the
registry/package model, `@tsci/*` packages, JLCPCB and KiCad import prefixes,
`@tscircuit/footprinter`, Circuit JSON conversion and the `jlc100` example
library. The result is recorded in
`research/hardware/tscircuit-ecosystem.md` and encoded as the local
`.claude/skills/tscircuit-hardware` skill, linked from `CLAUDE.md` (and therefore
the repository's `AGENTS.md` symlink).

The search did not find an exact published tscircuit/KiCad asset for the
received ToF board. Most public GY-530 references describe the same four-pin
interface; the two extra markings on the received board are now treated as
auxiliary plated vias, not electrical pins. E003-T21/T22/T23 were added so
future work first searches and records candidate assets, then creates an
isolated reusable component only if no exact source exists. Fabrication remains
blocked until the geometry and electrical power path are verified.

## 2026-09-01 — full cross-variant review

Completed a second review pass across Variants A–D and recorded it in
`reports/2026-09-01-full-board-review-v0.3.md`. The result is intentionally
uneven: A is the only active implementation target; B and C are candidate
architecture studies; D is parked. The review identifies provisional ToF
geometry, unresolved power/pull-ups, indirect routing, incomplete collision
assertions, access-legend gaps, manufacturing-export limitations and the
missing qualified external review as the next gates. The portal was regenerated,
opened in the browser and checked with zero console errors.

## 2026-09-02 — owner accepts compact all-variant implementation

The owner accepted implementation of the variants and requested a materially
smaller board. The agreed default is a frameless compact carrier: the outline
must come from measured module/component envelopes, access and keep-outs, with
only a technical edge margin. A narrow frame is a fallback after mechanical
review, not a decorative default. Underside adhesive mounting and removable
module options must be evaluated explicitly against direct soldering.

The implementation wave is now planned as E003-T21–T31. It first fixes source
truth and real footprints, then freezes the mechanical contract, implements
complete A/B/C/D variants, routes them deliberately, verifies collisions and
pad counts, and publishes one progressive review portal. The current B/C/D
four-pad previews remain review blockers until replaced; fabrication remains
blocked by ADR-002.

## 2026-09-02 — all-variant footprint implementation

Implemented the first execution wave from E003-T21 through the package and
verification gates. The source register now records provenance, license,
package identity, pad counts, orientation and unresolved fields for received
modules, JLCPCB catalogue parts and local support geometries. B/C use the
complete 57-pad RP2040 C2040 and 12-pad VL53L0X C2929940 footprints. C adds the
12-pad LIS2DW12TR, a two-lead active-buzzer body and a three-pad low-side
driver. D uses all 61 pads of the ESP32-C3 C2838502 module and an explicit RF
keep-out. The LIS2DW12 pin map was aligned to the catalogue pad hints: VDD pin
9, VDDIO pin 10, INT2 pin 11 and INT1 pin 12.

The board verification report now checks those variant-specific pad contracts,
including C's feedback parts and D's complete module. A–D regenerate with zero
TS-Circuit errors after fixing compact-placement collisions. The compact
48 × 32 mm B–D envelope, frameless policy, underside tape constraints and
direct-solder versus removable-header trade-off are documented, and the portal
now exposes the implementation status and source register.

This is still a review candidate, not a fabrication release. B–D deliberately
do not claim copper routing until the pin-level netlist and exact support-part
sources are reviewed; received-module measurements, power characterization,
manufacturing exports and qualified external engineering review remain open.

## 2026-09-02 — session close

The implementation and review package were committed as `61fd3ae`
(`feat(hardware): implement E003 carrier variants`). `npm run check` passed:
Variants A–D PASS, zero TS-Circuit errors and zero blocking warnings. The
portable portal was opened and checked in Chrome; the local portal server was
stopped before session close. `review-log status` could not run in this
checkout because its wrapper reported that it was not inside a Git repository.

The worktree was explicitly committed in full at the owner's request,
including generated review artefacts, screenshots and browser logs. The
fabrication gate remains intentionally blocked by missing measured physical
evidence, exact component verification, copper routing for B–D, manufacturing
exports and qualified external engineering review.
