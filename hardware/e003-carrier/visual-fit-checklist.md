# Visual-fit checklist

Status: **pending physical photographs and measured footprints**.

| Check | RP2040-Zero | `VL53LDK` breakout | Evidence |
| --- | --- | --- | --- |
| Top and bottom silkscreen match | pending | pending | photos |
| Pad count and pitch match source | pending | pending | ruler/caliper + datasheet |
| USB direction / connector clearance | pending | n/a | side photo + render |
| BOOTSEL/programming access | pending | n/a | installed render |
| Optical opening unobstructed | n/a | pending | installed render |
| Mounting and cable-load clearance | pending | pending | overlay sheet |

The checklist cannot be marked passed from the placeholder source alone.

For the RP2040-Zero footprint comparison, use this evidence order:

1. Official Waveshare dimensions/drawing as the geometry authority.
2. Waveshare's manufacturer-linked JLCPCB/EasyEDA CAD resource as the package
   to export and overlay.
3. The independent `dj505/RP2040-Zero-KiCAD` footprint as a second geometry
   opinion only. Its README says it is untested and its pin numbering is not
   authoritative.

The received board still needs a ruler/caliper overlay before fabrication.
