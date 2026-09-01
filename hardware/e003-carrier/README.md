# E003 TS Circuit carrier board

This workspace contains the Open Smart Desk Hardware v2 carrier-board
candidate and its review pack. It is intentionally **not fabrication-ready**:
the exact received module revisions, dimensions and voltage behaviour still
need physical evidence, and a qualified electronics reviewer must close the
review gate before a prototype can be ordered.

## Reproduce the checks

From this directory:

```text
npm ci --ignore-scripts
npm run check
```

`check` runs contract tests, TypeScript checking, both render proofs, electrical
contract validation and deterministic manifest generation. `prove:pipeline`
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
- [Visual-fit checklist](visual-fit-checklist.md)
- [Export manifest](exports/manifest.json)
- [Review finding register](review-findings.md)

The source uses a standard `pinrow4_p2.54mm` placeholder footprint solely to
make the candidate render. Replace it with measured footprints and update the
truth table before treating any output as a board design.
