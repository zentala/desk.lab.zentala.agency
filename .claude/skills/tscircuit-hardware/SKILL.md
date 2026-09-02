---
name: tscircuit-hardware
description: Find, import, author and review reusable tscircuit hardware components and PCB footprints, especially breakout modules whose exact geometry is uncertain.
metadata:
  short-description: Reuse and verify tscircuit hardware footprints
---

# tscircuit hardware component workflow

Use this skill for circuit-board work in this repository whenever a component,
breakout module, footprint, hole, optical keep-out or reusable TypeScript
library is involved.

Read the repository guide first:
[`research/hardware/tscircuit-ecosystem.md`](../../../research/hardware/tscircuit-ecosystem.md).

## Operating rules

- Treat `tscircuit` as an ecosystem, not as one complete catalogue. Search the
  registry/packages, JLCPCB, KiCad, GitHub and vendor CAD independently.
- Match the exact received board. A common marketing name such as `GY-530`
  does not guarantee identical pad count, hole datum, outline or optical
  package placement.
- Prefer an existing reusable package or catalog footprint only after checking
  its source and geometry. Record the URL, revision, license and retrieval date.
- If no exact asset exists, create a named local TypeScript component/footprint
  with explicit coordinates and a source-evidence record. Do not hide a guess
  behind a generic component name.
- Keep mechanical facts, electrical facts and inferences separate. Auxiliary
  plated vias or holes marked `X/E` are not schematic pins: keep them out of
  the carrier netlist and routing, and show them only as reference geometry
  unless continuity testing proves an electrical function.
- Show all physical pads, board outlines, mounting holes, optical apertures,
  connector access and keep-outs in review renders.
- Validate both the electrical endpoint and the physical geometry. DRC-clean
  routing does not prove that a footprint matches the purchased board.
- Block fabrication when pad coordinates, hole datum, optical center or power
  rail are still provisional.

## Preferred source order

1. exact manufacturer/vendor CAD or datasheet;
2. exact received-board measurement and continuity test;
3. exact tscircuit package or KiCad/JLCPCB footprint with inspectable source;
4. high-resolution images used only as dimensional evidence when a scale/datum
   is available;
5. a local provisional footprint, clearly marked and isolated for replacement.

## Typical import paths

- JLCPCB: `footprint="jlcpcb:C2040"` or an imported package.
- KiCad: `kicad:` prefix or conversion from a reviewed `.kicad_mod`.
- Custom: a small component using tscircuit primitives or
  `@tscircuit/footprinter`.

For E003, use the received-board evidence as the identity constraint: four
electrical pads in the order `VIN`, `GND`, `SCL`, `SDA`, plus two opposite-edge
auxiliary plated vias marked `X`/`E`. Do not turn those vias into carrier-board
holes or electrical pins, and do not replace the measured geometry with a
generic GY-530 entry merely because the names are similar.
