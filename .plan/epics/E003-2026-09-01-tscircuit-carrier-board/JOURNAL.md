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
