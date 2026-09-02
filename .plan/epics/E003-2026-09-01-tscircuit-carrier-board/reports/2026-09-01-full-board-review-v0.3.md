# E003 full board review — 2026-09-01

Status: review complete, fabrication blocked

## Executive conclusion

Variant A is the only implementation that should continue into the next
engineering loop. It now represents the intended received-module interface:
the ToF breakout has four electrical pads in the order `VIN`, `GND`, `SCL`,
`SDA`. The two opposite-edge `X`/`E` features are represented as auxiliary
plated-via reference marks only; they are not carrier-board holes, schematic
pins or routed nets.

This is a meaningful correction, but it is not a fabrication-ready PCB. The
current source is a reproducible review candidate with provisional ToF
dimensions, optical geometry, power assumptions and route topology. Variants B
and C remain architecture/candidate studies using placeholder or catalogue
contracts. Variant D is explicitly parked as an ESP32-C3 alternative and is
not comparable to A as a completed board.

## Artefacts reviewed

- `hardware/e003-carrier/src/carrier.tsx`
- `hardware/e003-carrier/scripts/validation-lib.mjs`
- `hardware/e003-carrier/evidence/pin-truth-table.json`
- `hardware/e003-carrier/review-portal/visual-fit.html`
- generated review portal export and candidate Circuit JSON
- `hardware/e003-carrier/review-findings.md`
- `research/hardware/tscircuit-ecosystem.md`
- `.claude/skills/tscircuit-hardware/SKILL.md`

The full local check passes: tests, TypeScript, pipeline, candidate
validation, four variant BOM contracts and portal packaging. Candidate
diagnostics report zero errors and four warnings. This proves source and
review-pipeline consistency; it does not prove physical fit, electrical
compatibility or manufacturing readiness.

## Variant status

| Variant | Current status | What is usable now | What must happen next |
| --- | --- | --- | --- |
| A — received RP2040-Zero + ToF breakout | Active review target | Explicit RP2040 module geometry, four ToF electrical pads, two auxiliary-via marks, named I2C/power routes, optical keep-out and mounting-hole model | Measure the received boards, resolve power/voltage behaviour, replace provisional geometry, then re-place and route |
| B — JLCPCB chip-down | Candidate / placeholder | Useful architecture comparison and reproducible variant contract | Select exact JLC parts, import inspectable footprints, verify orientation/assembly, then create real schematic and routing |
| C — chip-down + vibration/buzzer | Candidate / placeholder | Captures the extra feedback concept and separate variant scope | Verify accelerometer and buzzer parts, driver/current limits, interrupt net, acoustic/mechanical constraints and real layout |
| D — ESP32-C3 wireless | Parked alternative | Documents the wireless architecture direction | Keep out of the A fabrication loop; either formally close it as a comparison study or restart it with a verified ESP32-C3 module and complete routing |

The correction was therefore not applied to B, C or D as if they were finished
boards. Only A has received the current four-pin ToF interpretation and the
corresponding routed candidate update. Applying generic changes to the other
variants would hide their different electrical and mechanical assumptions.

## Verified improvements

1. Variant A no longer invents two electrical ToF pins for X/e.
2. The four interface labels are explicit and match the received module's
   reported order: `VIN`, `GND`, `SCL`, `SDA`.
3. The two X/e locations remain visible in the footprint as reference geometry,
   so the physical board is not visually reduced to a misleading four-feature
   drawing.
4. RP2040-Zero is represented with its full 23-pad module contract rather than
   a four-pad approximation.
5. The portal states which variant is active and which variants are parked or
   provisional.
6. Validation now checks the four electrical ToF pads and separately checks the
   auxiliary-via markers.
7. The reusable tscircuit workflow is documented in the repository guide and
   local skill. It requires source/geometry provenance before reusing a package.

## Findings and proposed improvements

### High priority — required before calling A a real PCB candidate

**F019 — received-board geometry is still provisional.** The 10.5 × 13.3 mm
envelope, four pad centres, corner-hole datum and board edge are assumptions.
The photos have no 1:1 scale reference. Capture orthogonal ruler/caliper
photos and a coordinate table tied to one explicit datum. Replace every
provisional value in the source and evidence.

**F020 — optical geometry is not yet trustworthy.** The current optical
keep-out is a generic circular approximation. Measure the actual sensor package,
aperture, board edge relationship, component height and installed downward
clearance. Render the optical opening and cleanable path in the orientation in
which the desk will use it.

**F021 — the ToF power contract is unresolved.** `VIN` is currently routed from
RP2040 3V3, but the breakout regulator, pull-ups, rail output and logic-level
compatibility are not proven. Check continuity with power off, rail voltage
under load, pull-up destinations and the module's actual operating range.
Record the result in the truth table and add only the required adaptation.

**F022 — routing is connected but not yet deliberately engineered.** The
current candidate uses long perimeter/centre detours. Re-place from measured
pad coordinates and define layer intent for power and I2C. Keep I2C short,
parallel and easy to inspect; avoid unnecessary backtracking and make the
power return path obvious. Add route-length, endpoint, layer and clearance
checks where the TS Circuit representation permits it.

**F023 — collision validation is incomplete.** Current checks do not assert all
board-hole/module-pad, trace/hole, trace/keep-out, silkscreen/pad and
board-edge relationships. Add positive and injected-negative fixtures so a
known overlap fails automatically.

**F024 — USB-C and service access need a physical review.** `USB-C ACCESS` is
not enough for a person assembling or debugging the carrier. Add readable
orientation and signal legend for VBUS/5V, GND, 3V3, SDA/GP4, SCL/GP5, BOOTSEL
and RESET only where those labels are physically true. Confirm connector,
button and cable clearance after module placement.

**F025 — no qualified external electronics review has happened.** A green
software check is not an engineering sign-off. Send the self-contained portal
and static pack to an electronics reviewer after the measured-geometry and
power revisions. Record each response and closure decision.

**F026 — manufacturing output is not verified in this environment.** The
Windows native Rollup policy currently blocks the TS Circuit CLI path used for
manufacturing exports. Do not claim Gerber, drill, BOM or pick-and-place
readiness until the promised files are generated and opened independently on an
approved runtime.

### Medium priority — improve maintainability and review clarity

**F027 — distinguish physical reference names from unresolved facts.** Keep
stable names for the received module and its four-pin interface, while marking
only the unknown rail/optical/mechanical facts as provisional. Avoid captions
that make a deliberate auxiliary-via model look like an unresolved pin map.

**F028 — maintain a component candidate register.** For every reused asset,
record URL, package/version, license, source revision, retrieval date, geometry
comparison and why it was accepted or rejected. The tscircuit ecosystem has
reusable packages and JLCPCB/KiCad import paths, but it is not a complete
catalogue of every marketplace breakout.

**F029 — keep variant gates separate.** B, C and D should not inherit A's
acceptance status. Each needs its own verified BOM, source footprint, electrical
contract, placement, routing, tests and review gate. Until then, the portal
should label them as comparison studies, not board options ready to build.

**F030 — add a measured overlay to the portal.** The generated board render and
the module photograph should share a known scale and datum. A visual fit page
without scale can reveal obvious mistakes but cannot close a footprint review.

## Implementation roadmap

### Wave 0 — evidence freeze

1. Photograph both sides of the received ToF and RP2040-Zero boards with a
   ruler or calibration target in the same plane.
2. Measure outline, pad centres, pad size, hole centre/diameter, optical datum,
   component height and connector/button access.
3. Run continuity and powered measurements for `VIN`, `3V3`, pull-ups, ground,
   `SCL` and `SDA`.
4. Update the truth table and mark which facts are measured, sourced or still
   inferred.

### Wave 1 — reusable component and mechanical model

1. Complete E003-T21: search tscircuit registry/packages, JLCPCB, KiCad and
   GitHub; record candidates and licenses.
2. Complete E003-T22: isolate a reusable four-pin ToF component with the
   measured outline, corner hole, optical keep-out and two non-electrical
   auxiliary-via marks.
3. Complete E003-T23: integrate the component into A and produce a 1:1 overlay.
4. Replace provisional names and dimensions only after the evidence is attached.

### Wave 2 — electrical and layout correction

1. Freeze the power rail and pull-up topology.
2. Re-place the modules for cable access, optical clearance, mounting and a
   short two-layer fanout.
3. Route all four A nets with explicit endpoint and layer intent.
4. Add the service legend without overlapping pads, holes or connector access.

### Wave 3 — automated and visual review

1. Add collision regression fixtures for every high-priority relationship.
2. Run `npm run check`, inspect generated Circuit JSON and review all warnings.
3. Open the portal in a browser, check the A-only active state, the four pads,
   auxiliary-via marks, outlines, holes, optical path and access legend.
4. Regenerate the static export and verify each promised file independently.

### Wave 4 — human gate

1. Send the package to a qualified electronics reviewer.
2. Record findings in `review-findings.md` with owner decisions and evidence.
3. Resolve or explicitly defer all high findings.
4. Only after written review closure decide whether to start a separate
   fabrication/prototype epic.

## Current go/no-go decision

**GO:** continue measured evidence and Variant A engineering.

**NO-GO:** fabrication, ordering, assembly or claims that B/C/D are complete.

The most valuable next input is not another visual tweak: it is a calibrated
measurement set for the received ToF board plus power/continuity data. Those
facts determine whether the current footprint and routing can be corrected or
must be rebuilt.

## Reusable ecosystem references

- [tscircuit documentation](https://docs.tscircuit.com/)
- [tscircuit repository](https://github.com/tscircuit/tscircuit)
- [tscircuit core](https://github.com/tscircuit/core)
- [tscircuit footprinter](https://github.com/tscircuit/footprinter)
- [JLCPCB component examples](https://github.com/tscircuit/jlc100)
- [JLCPCB footprint documentation](https://docs.tscircuit.com/footprints/jlcpcb-footprints)
- [KiCad footprint documentation](https://docs.tscircuit.com/footprints/kicad-footprints)
- [GY-530 listing used as four-pin geometry cross-check](https://www.plexishop.it/it/gy-530-sensore-di-misura-laser-tof-vl53l0x.html)

