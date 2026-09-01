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
