# tscircuit ecosystem guide for hardware work

Status: researched 2026-09-01

This guide records how to find, import, reuse and validate circuit components in
the tscircuit ecosystem. “A tscircuit library” is not one single catalogue of
every breakout board. The ecosystem has several layers:

1. the TypeScript/React authoring library and built-in components;
2. reusable component packages published to the tscircuit registry, commonly
   under `@tsci/*` names;
3. manufacturer and format libraries, especially JLCPCB and KiCad footprints;
4. conversion tools for turning KiCad/Eagle/Circuit JSON assets into reusable
   tscircuit code;
5. independent GitHub component libraries and example projects.

## What exists

- [tscircuit documentation](https://docs.tscircuit.com/) — authoring,
  footprints, imports, packages and manufacturing workflow.
- [tscircuit main repository](https://github.com/tscircuit/tscircuit) — the
  umbrella package and ecosystem overview.
- [tscircuit core](https://github.com/tscircuit/core) — TypeScript-to-Circuit
  JSON rendering core.
- [tscircuit footprinter](https://github.com/tscircuit/footprinter) — a DSL
  and micro-builder for declaring custom footprints.
- [tscircuit organization](https://github.com/tscircuit) — official and
  community-facing repositories.
- [jlc100](https://github.com/tscircuit/jlc100) — an example reusable
  tscircuit/KiCad library for common JLCPCB components. It demonstrates that
  sharing is intended, but it is not a complete sensor-module catalogue.
- [circuit-json-to-tscircuit](https://github.com/tscircuit/circuit-json-to-tscircuit)
  — converts Circuit JSON into a starting point for tscircuit code.
- [circuit-json-to-kicad](https://github.com/tscircuit/circuit-json-to-kicad)
  — exports Circuit JSON to KiCad schematic/PCB formats.

## How to consume existing assets

### JLCPCB catalog footprints

Use the `jlcpcb:` prefix when a JLCPCB catalog footprint is the actual source
of truth, for example:

```tsx
<component footprint="jlcpcb:C2040" />
```

See [Using JLCPCB footprints](https://docs.tscircuit.com/footprints/jlcpcb-footprints).
For a complete symbol, footprint, pin map and 3D model, prefer an imported
component package rather than attaching only a footprint to a generic
`<component />`.

The CLI supports searching and importing catalog parts:

```text
tsci search --jlcpcb RP2040
tsci import --jlcpcb <query>
```

Verify exact flags with `tsci --help` in the project environment. If a local
CLI invocation fails, classify that as an environment/tooling problem, not as
evidence that the registry or catalog does not exist.

### KiCad libraries and community footprints

Use the `kicad:` prefix for official KiCad footprints where a matching library
entry exists. See [Using KiCad footprints](https://docs.tscircuit.com/footprints/kicad-footprints).

For a custom or community `.kicad_mod`, the supported path is:

1. inspect the source file and its license;
2. convert it with [kicad-component-converter](https://github.com/tscircuit/kicad-component-converter)
   or the newer converter path linked by that repository;
3. review pads, courtyard, holes, silkscreen and pin names;
4. wrap it in a small local or published tscircuit component;
5. keep the original source URL and revision beside the generated component.

Conversion is not validation. A converter can preserve incorrect source
geometry perfectly.

### Custom TypeScript footprints

When no exact reusable entry exists, write a small named component/footprint in
TypeScript using tscircuit primitives or `@tscircuit/footprinter`. Keep the
geometry isolated from the board so it can later be replaced by a measured or
vendor-supplied asset without rewriting routing.

Every custom footprint must record:

- board envelope and thickness, if known;
- pad count, numbering, names, pitch and coordinates;
- mounting-hole diameter and center coordinates;
- optical/mechanical keep-outs;
- orientation convention and datum corner;
- source evidence, confidence and unresolved questions.

## What this means for the E003 ToF board

The received blue board is not safe to identify as “the GY-530 footprint”
without qualification. Online GY-530 listings commonly describe the standard
four-pad interface (`VIN`, `GND`, `SCL`, `SDA`) and a roughly 10.5 x 13.3 mm
board with a 3 mm hole. For example, [Plexishop's GY-530 listing](https://www.plexishop.it/it/gy-530-sensore-di-misura-laser-tof-vl53l0x.html)
reports that envelope, hole and four-pin order.

The received board visibly exposes four lower-edge electrical pads and two
opposite-edge plated vias marked `X` and `e`. They are not module pins and do
not belong in the carrier schematic or netlist. They should only be retained as
reference geometry if the module outline is rendered. See the [ST VL53L0X datasheet](https://www.st.com/resource/en/datasheet/vl53l0x.pdf)
for the actual device functions; the markings on this breakout do not identify
the functions of its two vias.

The search found no trustworthy published tscircuit package or KiCad footprint
whose source explicitly matches this exact board, its hole datum and
its optical package position. Generic marketplace images are useful for
recognising the family, but are not enough to release a fabrication footprint.

## Required E003 workflow

For every board-level module:

1. Search tscircuit packages, JLCPCB, KiCad and GitHub by exact markings and
   board family, not only by the marketing name.
2. Save candidate URLs, images/CAD files, licenses and retrieval date in the
   evidence folder.
3. Compare candidates against the received board: outline, hole datum, pad
   count, labels, pitch, optical center and component keep-outs.
4. If no exact match exists, create a local reusable component with explicit
   provisional fields rather than silently using a similar part.
5. Route only after the module interface truth table is settled. Do not turn
   auxiliary vias into schematic pins or carrier-board holes.
6. Render front and back views at a useful scale, run tscircuit checks and
   geometry collision tests, then perform a physical 1:1 overlay review.
7. Block fabrication until the footprint source and unresolved assumptions are
   explicitly accepted.

## Review checklist for future agents

- Is this an exact component, a catalog footprint, a converted footprint or a
  local approximation?
- Can every pad be identified and located from a source or measurement?
- Are all board edges, holes, optical apertures, connector access areas and
  silkscreen labels visible in the review render?
- Does the schematic/netlist agree with the physical pad names?
- Are unconnected pads intentionally marked and explained?
- Do traces terminate on the intended pad numbers, without detours that hide a
  wrong endpoint?
- Are the source URL, source revision, confidence and remaining risks recorded?
