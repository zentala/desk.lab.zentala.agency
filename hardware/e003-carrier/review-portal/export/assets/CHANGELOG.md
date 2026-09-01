# Change log

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
