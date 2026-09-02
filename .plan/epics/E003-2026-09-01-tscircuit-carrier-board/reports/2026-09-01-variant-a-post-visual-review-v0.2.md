# E003 Variant A — post-visual review v0.2

**Date:** 2026-09-01  
**Scope:** received RP2040-Zero + received blue `UL53LDK`/`VL53LDK` ToF breakout  
**Decision:** continue with Variant A only; keep B–D parked for this loop.  
**Fabrication:** blocked.

## TL;DR

Variant A is materially better than the previous four-pad placeholder: the
render contains all 23 RP2040-Zero pads, all six visible ToF pads, module
outlines, the ToF mounting clearance hole and four explicit nets. The current
render is still a provisional review candidate, not a manufacture-ready
footprint. The next implementation loop must start with measured ToF geometry
and electrical characterization, then rebuild the optical/mechanical model,
re-route the board and strengthen collision tests.

## Evidence reviewed

- `hardware/e003-carrier/src/carrier.tsx`
- `hardware/e003-carrier/src/design-assumptions.json`
- `hardware/e003-carrier/evidence/evidence.md`
- `hardware/e003-carrier/evidence/photos/*`
- `hardware/e003-carrier/artifacts/candidate-proof/pcb.svg`
- `hardware/e003-carrier/review-portal/visual-fit.html`
- `hardware/e003-carrier/scripts/validation-lib.mjs`
- Browser review at `http://127.0.0.1:4173/visual-fit.html?rev=20260901-final`

The last recorded verification passed `npm run check`; generated Circuit JSON
reported zero errors. That proves pipeline and internal consistency only. It
does not prove that a footprint matches the received boards or that the ToF
accepts 3.3 V on `VIN`.

## What is good enough to retain

1. Variant A is the only active visual-fit target. Variant D is explicitly
   parked and must not be used as a comparison or fabrication candidate.
2. The RP2040-Zero is represented with 23 physical through-hole pads and the
   current edge ordering is consistent with the photographed module family.
3. The ToF representation exposes the four labelled lower pads (`VIN`, `GND`,
   `SCL`, `SDA`) and the two opposite-edge pads (`X`, `E`) as physical pads.
4. `X` and `E` remain no-connects. Their electrical function is unresolved and
   must not be guessed from the label.
5. The board has visible module outlines, a separate ToF clearance hole,
   optical keep-out ownership, mounting holes and four named routes.
6. Fabrication remains blocked in the source contract.

## Findings requiring implementation

The canonical register is [`hardware/e003-carrier/review-findings.md`](../../../hardware/e003-carrier/review-findings.md).

| Priority | Finding | Why it matters | Closure evidence |
| --- | --- | --- | --- |
| P0 | E003-F010 — ToF footprint is unmeasured | Pad and hole errors are the primary user-visible problem; a plausible rectangle is not a footprint | 1:1 top/bottom ruler or caliper capture, datum table, updated source and render |
| P0 | E003-F012 — ToF power path unresolved | `VIN` may not equal 3.3 V; regulator, pull-ups and level shifting are unknown | continuity/voltage measurements, revised truth table, external review |
| P1 | E003-F011 — optical model is too generic | A circular keep-out does not describe the rectangular package/aperture in the photo or installed clearance | measured package/aperture, downward-view model, cleanable-path check |
| P1 | E003-F013 — access/USB legend is insufficient | The carrier says only `USB-C ACCESS`; a reviewer cannot see the intended USB, power, I2C and control access at a glance | readable 1:1 silkscreen with no collisions |
| P1 | E003-F014 — routing is connected but visually indirect | Perimeter power detours and centre-running I2C make inspection and assembly harder | deliberate two-layer route plan, net-length/clearance report, annotated render |
| P1 | E003-F015 — collision checks are incomplete | Zero generated DRC errors does not cover every custom mechanical/silkscreen relationship | negative tests for hole/pad/trace/keep-out/silk collisions |
| P2 | E003-F016 — nomenclature obscures status | `PENDING_FOOTPRINT` makes the render look broken rather than intentionally provisional | stable module names plus explicit unresolved-property labels |
| P2 | E003-F017 — D creates review noise | D has no routing and a placeholder footprint | A-only portal view and parked-D warning |

## Implementation plan

### Wave 0 — freeze facts before geometry

1. Capture each board separately with a metric ruler or caliper, top and bottom,
   with the USB/optical direction marked. Measure outline, all six ToF pad
   centres, pad diameters, hole centre/diameter, optical package/aperture
   centre and connector/control keep-outs. Use board bottom-left or a clearly
   marked datum; do not infer coordinates from the existing render.
2. Characterize the ToF breakout without soldering it to the carrier: identify
   VIN-to-rail continuity, regulator output, I2C pull-up rail, SCL/SDA
   continuity and the X/E pads. Record safe test conditions and results.
3. Confirm the RP2040-Zero edge coordinates against the official drawing and
   the received board. Treat the manufacturer CAD as a comparison input until
   the overlay agrees.

### Wave 1 — replace the provisional module model

4. Update `evidence/evidence.md`, `evidence/pin-truth-table.json` and
   `src/design-assumptions.json` with measured values and their evidence links.
5. Rebuild the ToF footprint in `src/carrier.tsx` from the measured datum. Use
   the exact six pad centres and pad shapes; model the board outline, corner
   mounting hole, optical package/aperture and solder-access side explicitly.
6. Replace the generic circular optical keep-out with the measured optical
   clearance model. Keep the opening free of copper, silkscreen, carrier holes
   and enclosure features in the installed downward orientation.
7. Resolve the power net from measurements. If `VIN` is not a safe 3.3 V input,
   stop and add the required regulator/level adaptation to the design instead
   of renaming the net to make validation pass.

### Wave 2 — make the carrier inspectable

8. Re-place the two modules using the measured edge and access constraints.
   Optimize the orientation so SCL/SDA leave the RP2040 cleanly and reach the
   ToF without routing through an avoidable footprint or turning back on the
   same layer.
9. Re-route explicitly on the two available layers: short parallel I2C
   tracks, a deliberate power/ground strategy, no vias unless their geometry
   is validated, and no trace through optical, USB or mechanical keep-outs.
10. Add a readable carrier legend for `USB-C`, `BOOT`, `RESET`, `5V/VBUS`,
    `3V3`, `GND`, `SDA / GP4` and `SCL / GP5`. This documents access; it does
    not pretend that the carrier exposes USB D+/D− separately from the
    RP2040-Zero module.

### Wave 3 — automate the review gate

11. Extend `scripts/validation-lib.mjs` and its tests to check every carrier
    hole against module pads/outlines, every trace against holes/keep-outs,
    silkscreen against pads/holes/connector keep-outs, board-edge clearances,
    exact route endpoints and X/E no-connect status.
12. Add negative fixtures proving that each injected collision fails. Keep
    generated DRC diagnostics as a second layer, not the only geometry test.
13. Regenerate the candidate artefacts, portal export and manifest. Make the
    portal show Variant A as active and D as parked; remove dense or misleading
    provisional labels from the fabrication-facing view.

### Wave 4 — verification and external review

14. Run `npm run check`, inspect the PCB and schematic renders in a browser,
    and verify zero console errors and zero generated Circuit errors.
15. Run a 1:1 print/overlay against both received modules. Record every
    mismatch rather than accepting visual similarity.
16. Send the self-contained package to a qualified electronics reviewer. Only
    after written feedback is recorded as resolved or accepted may a separate
    fabrication/prototype epic be created.

## Definition of done

- The ToF footprint coordinates, hole and optical aperture are traceable to
  measured evidence, not pixels or a marketplace envelope.
- The electrical record states whether `VIN` is safe at the selected rail and
  documents the breakout pull-ups, level shifting and X/E disposition.
- The carrier render clearly shows module outlines, all pads, access legend,
  optical opening, mounting holes and four intentional routes.
- The route report shows no avoidable backtracking, no crossing or collision,
  and valid clearances on both layers.
- Collision regression tests fail for injected overlaps and pass for the
  candidate; `npm run check` is green.
- The browser portal presents A as the active candidate and D as parked, with
  the provisional/fabrication-blocked status visible.
- A qualified human reviewer has written feedback, and every finding is
  marked resolved, accepted or deferred before fabrication is considered.

## Gaps

- No ruler/caliper measurements are present in the captured photos.
- The exact ToF silicon, regulator output, pull-up rail and X/E function are
  unknown.
- The precise USB-C connector body and BOOT/RESET access envelope has not been
  modeled from a measured side view.
- No qualified external electronics review has been received.
- Manufacturing exports are not claimed in this Windows environment until the
  approved runtime can run the native TS Circuit export path.

## Decisions and ADRs

- ADR-001 keeps TS Circuit as the source of truth, with manual routing review.
- ADR-002 keeps qualified external review as a hard fabrication gate.
- ADR-004 keeps RP2040-Zero as the canonical controller for this loop.
- No new architecture decision is triggered; this revision tightens the
  existing footprint, evidence and review gates.
