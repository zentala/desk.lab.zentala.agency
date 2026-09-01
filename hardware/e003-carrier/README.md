# E003 TS Circuit carrier board

This workspace contains the Open Smart Desk Hardware v2 carrier-board
candidate and its review pack. It is intentionally **not fabrication-ready**:
the owner accepted documented vendor/visual dimensions as provisional design
inputs, while exact module revisions and voltage behaviour remain unresolved.
A qualified electronics reviewer must close the review gate before a prototype
can be ordered.

## Reproduce the checks

From this directory:

```text
npm ci --ignore-scripts
npm run check
```

`check` runs contract tests, TypeScript checking, the minimal and four-variant
render proofs, electrical contract validation, deterministic manifest generation
and the portable portal package. `prove:pipeline`
exercises a minimal TS Circuit design and writes independent
Circuit JSON, schematic SVG and PCB SVG files. `prove:candidate` transpiles the
placeholder candidate and renders the same artefacts. The manifest records
source/artifact hashes and all current Circuit JSON diagnostics. The `tsci
render` and `tsci export` scripts are retained for a machine where the CLI's
native Rollup dependency is permitted; this Windows environment currently
blocks that native addon, so Gerbers/BOM/placement exports are not claimed.

## Review materials

- [Static review portal](review-portal/index.html)
- [Physical evidence record](evidence/evidence.md)
- [Received-module hardware specification](hardware-spec.md)
- [Pin truth table](evidence/pin-truth-table.json)
- [Provisional design assumptions](src/design-assumptions.json)
- [Visual-fit checklist](visual-fit-checklist.md)
- [Export manifest](exports/manifest.json)
- [Review finding register](review-findings.md)
- [Four-variant BOM contract](variants/README.md)
- [Shared prototype protocol](protocol.md)
- [Portable review portal export](review-portal/export/index.html)

Variant A now uses explicit provisional received-board geometry: all 23
RP2040-Zero edge pads, all four lower ToF pads, both opposite-edge X/e pads,
the ToF corner hole, module outlines and four routed nets. The coordinates are
still blocked pending ruler/caliper capture, so this is a review candidate, not
a manufacturing footprint. Variants B–D remain separate placeholder studies;
they are not alternatives that Variant A depends on. External review must
accept or replace the geometry before any fabrication decision.
