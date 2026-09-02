# E003 TS Circuit carrier board

This workspace contains the Open Smart Desk Hardware v2 carrier-board family
and its review pack. It is intentionally **not fabrication-ready**: received
module geometry, catalogue package orientation, support-part sourcing, power
behaviour and routing review remain open. A qualified electronics reviewer
must close the review gate before a prototype can be ordered.

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
- [Component/source register](evidence/source-register.json)
- [Reusable component asset map](src/component-assets.md)
- [Provisional design assumptions](src/design-assumptions.json)
- [Visual-fit checklist](visual-fit-checklist.md)
- [Export manifest](exports/manifest.json)
- [Review finding register](review-findings.md)
- [Four-variant BOM contract](variants/README.md)
- [Shared prototype protocol](protocol.md)
- [Portable review portal export](review-portal/export/index.html)

Variant A uses explicit provisional received-board geometry: all 23 RP2040-Zero
edge pads, all four lower ToF pads, both opposite-edge X/e auxiliary vias as
reference marks, the ToF corner hole, module outlines and four routed nets.
Variants B and C use complete catalogue footprints for RP2040 C2040 and
VL53L0X C2929940; C adds a complete LIS2DW12TR, buzzer body and low-side driver
geometry. D uses the complete 61-pad ESP32-C3 C2838502 module plus the
accelerometer and antenna keep-out. B–D expose placement and package contracts
but keep copper routing explicitly pending until pin-level net design and
support-part sourcing are reviewed. All module coordinates, power behaviour and
unresolved catalogue fields remain provisional.
