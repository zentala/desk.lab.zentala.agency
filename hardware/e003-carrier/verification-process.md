# E003 hardware verification process

This is the mandatory loop for every PCB change. A rendered image or a green
TypeScript build is not a hardware approval.

## The four gates

### 1. Source and library gate

Before editing a footprint, classify the part:

1. exact manufacturer/module CAD or datasheet;
2. measured received board and continuity test;
3. inspectable tscircuit package or KiCad/JLCPCB footprint;
4. image-only provisional geometry.

Use a reusable tscircuit component when its source and geometry match the exact
part. `@tscircuit/common` has a reusable `Microcontroller_RP2040` subcircuit,
which is useful for a bare RP2040 design with its support circuitry. It is not
automatically the footprint for a Waveshare RP2040-Zero module. The received
RP2040-Zero therefore needs its own measured module component unless the
official/module CAD is overlaid and accepted.

The received ToF board is a four-electrical-pad breakout (`VIN`, `GND`, `SCL`,
`SDA`) plus two auxiliary plated vias marked `X`/`E`. A bare VL53L0X is an
LGA-12 device, not a four-pad part. Never reuse the breakout footprint for the
bare IC, and never reuse a generic four-pin footprint for an RP2040 or ESP32
module.

Every selected asset records its source URL/revision, license, retrieval date,
package identity, pad count, pad names/order, outline, holes, optical keep-out
and confidence. A catalogue identifier is evidence of a catalogue record, not
proof that it matches the board in hand.

### 2. Circuit and geometry gate

After every source change, regenerate the Circuit JSON and SVGs for the
canonical board and every defined variant:

```text
npm run prove:pipeline
npm run prove:candidate
npm run prove:library
npm run prove:variants
npm run verify:boards
```

`prove:library` is a comparison render only. It resolves the catalogue
footprints through the TS-Circuit parts engine and asserts that the preview
contains 57 RP2040 C2040 pads (56 signal pads plus the exposed pad) and 12
VL53L0X pads. It does not silently replace the received modules in Variant A.

`verify:boards` runs `@tscircuit/checks` and project-specific checks for:

- exact board size and layer count;
- per-component pad count and forbidden placeholder footprints;
- all board/module outlines, mounting holes and optical keep-outs;
- pad/trace/hole/keep-out/board-edge collisions;
- trace endpoints, missing traces, off-board traces and clearance errors;
- complete PCB and schematic SVG artifacts with recorded hashes.

The command is release-blocking. It must fail when a named package is rendered
with the wrong number of pads, even if the picture looks tidy.

### 3. Visual gate

The agent must inspect an image after each meaningful placement or footprint
change. The repeatable visual loop is:

1. open the unified review portal or generate a browser screenshot;
2. inspect the PCB view at readable scale, not only a thumbnail;
3. inspect every board separately: A, B, C and D;
4. inspect front and back when both layers are used;
5. compare against the received-board photographs and, once available, a 1:1
   ruler/caliper overlay;
6. record PASS, FAIL or UNKNOWN with the reason.

The visual checklist is deliberately explicit:

- every physical pad is visible and labelled or mapped;
- no module is represented by a four-pad substitute unless it really has four
  electrical pads;
- the board outline matches the module outline and orientation;
- USB-C, BOOT/RESET and cable access are physically reachable;
- mounting holes do not land on pads, components or traces;
- the ToF optical opening and keep-out are in front of the actual sensor;
- routes terminate at the intended pad and do not take unexplained detours;
- silkscreen does not cover pads, holes or the optical path.

The agent has access to local image inspection through `view_image` and to
browser QA through Playwright. Those tools are a second pair of eyes, not a
substitute for measured geometry or an electronics engineer.

### 4. Electrical and release gate

Run the complete test set before considering a variant reviewable:

```text
npm test
npm run typecheck
npm run check
```

The following are hard failures:

- a required pin is missing or mapped to a different physical number;
- a source trace has no PCB trace, or a route does not touch its endpoint;
- any TS-Circuit error diagnostic;
- any pad/trace/via/hole/keep-out/board-edge collision;
- a controller or bare IC is represented by `pinrow4`;
- a fabrication export is presented as ready while geometry or power is
  provisional.

Warnings such as missing courtyards, unspecified power/ground attributes or
unresolved measurements remain visible and block fabrication until explicitly
closed or accepted by a qualified reviewer.

## Current implementation status

The initial run of this process was intentionally red and caught the actual
defect. The current implementation has removed that specific placeholder
failure:

- canonical A has the correct 23 RP2040 + 4 ToF electrical pad contract, but
  still has four blocking TS-Circuit warnings about incomplete component
  metadata;
- B/C now expose 57 RP2040 C2040 pads, including the exposed GND pad, and 12
  VL53L0X C2929940 pads.
- C/D now expose the complete 12-pad LIS2DW12TR C189624 package; C also has a
  2-lead through-hole buzzer body and a 3-pad low-side driver body.
- D now exposes all 61 pads of the ESP32-C3 C2838502 module and an explicit
  antenna keep-out.
- Generated B–D candidates intentionally contain no unreviewed copper routes.
  This keeps the checks honest while the pin-level power, USB, QSPI, clock,
  sensor and feedback netlist is reviewed. A remains the only candidate with
  generated routed nets.

The next implementation gate is pin-level net capture and deliberate two-layer
routing for B–D; a green footprint/collision report does not imply a finished
electrical board.

## Review status vocabulary

- **PASS** — generated, checked, visually inspected and source-backed.
- **PROVISIONAL** — rendered for discussion, but at least one measurement or
  authoritative source is missing.
- **FAIL** — an automated or visual gate found a concrete defect.
- **PARKED** — not an implementation target; must not influence Variant A.

Only PASS plus qualified external review can move a board toward fabrication.
