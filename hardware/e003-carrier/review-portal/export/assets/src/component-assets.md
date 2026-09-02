# E003 component asset map

`variant-candidates.tsx` deliberately keeps the board source readable while
the source register in [`../evidence/source-register.json`](../evidence/source-register.json)
holds provenance and unresolved fields for every asset.

| Asset | Source kind | Geometry in source | Review datum | Status |
| --- | --- | --- | --- | --- |
| RP2040-Zero A | received module | 23 plated pads, local module envelope | module centre; USB-C/access direction | provisional until measured |
| ToF breakout A | received module | 4 plated pads, corner hole, X/e reference marks | lower labelled edge; optical package direction | provisional until measured |
| RP2040 B/C | JLCPCB `C2040` | 57 SMT pads including exposed GND | catalogue orientation | candidate; recheck before order |
| VL53L0X B/C/D | JLCPCB `C2929940` | 12 SMT pads | catalogue orientation; optical package | selected hypothesis |
| LIS2DW12TR C/D | JLCPCB `C189624` | 12 SMT pads | catalogue orientation; pin 9/10 supply | candidate; interrupt review open |
| ESP32-C3 D | JLCPCB `C2838502` | 61 SMT pads | antenna end right; explicit RF keep-out | candidate; RF review open |
| Buzzer C | JLCPCB candidate `C781856` + local body | 2 plated leads, 12 mm body | positive lead marked on silkscreen | candidate; drawing/current open |

The custom USB, regulator, flash, crystal, transistor and passive geometries
are intentionally named `*-provisional`. They are complete review geometry,
not evidence of a selected orderable part. Their exact manufacturer package,
source URL and assembly status must be resolved before fabrication.

No candidate uses `pinrow4_p2.54mm`. A's X/e features are not pins, test nets or
carrier holes; they are reference-only marks inside the received-module asset.
