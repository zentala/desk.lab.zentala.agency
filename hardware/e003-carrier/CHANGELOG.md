# Change log

## 0.3.0-review-candidate — 2026-09-02

- Added the component/source register and reusable asset map with provenance,
  package counts, orientation and unresolved review fields.
- Replaced B/C/D four-pad studies with complete catalogue package geometry:
  RP2040 C2040 (57 pads), VL53L0X C2929940 (12 pads), LIS2DW12TR C189624
  (12 pads) and ESP32-C3 C2838502 (61 pads).
- Added real C feedback bodies for the LIS2DW12TR, two-lead buzzer and
  three-pad low-side driver, plus D's antenna keep-out.
- Extended verification to variant-specific package contracts and added
  source-register regression coverage.
- Documented the compact frameless/underside-tape strategy and direct-solder
  versus removable-header trade-off in the mechanical contract and portal.
- B–D copper routing, exact support-part selection, measured fit, manufacturing
  exports and qualified external review remain open; fabrication is blocked.

## 0.2.1-provisional — 2026-09-01

- Reclassified the two opposite-edge X/e features on the ToF board as auxiliary
  plated vias rather than electrical pins.
- Reduced the Variant A ToF interface to the four confirmed pads: VIN, GND,
  SCL and SDA; retained X/e only as visual reference marks.
- Added the tscircuit ecosystem guide and reusable hardware skill to document
  registry, JLCPCB, KiCad, GitHub and custom-footprint workflows.

## 0.1.0-candidate — 2026-09-01

- Added a pinned TS Circuit workspace and placeholder carrier source.
- Added the physical-evidence template and candidate pin truth table.
- Added mechanical constraints, controlled design context and export manifest.
- Added a static review portal with explicit fabrication blockers.
- No PCB has been ordered or fabricated; no professional approval is implied.
# 0.2.0-provisional — 2026-09-01

- Replaced Variant A's generic 4-pad placeholders with explicit provisional
  received-board geometry: 23 RP2040-Zero pads and 6 ToF pads including X/e.
- Added the ToF corner mounting hole, optical keep-out, module outlines and
  four explicit routed nets.
- Enlarged the provisional carrier to 52 × 38 mm after DRC showed the old
  carrier holes colliding with RP2040 pads.
- Added structural checks for pad completeness, module-hole clearance,
  keep-out ownership and generated diagnostics. Variant D is parked.
