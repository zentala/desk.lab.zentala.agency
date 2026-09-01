# E003 physical evidence record

Status: **partially captured — design and fabrication are still blocked** (2026-09-01).

This record is intentionally explicit about what is not known. The supplied
boards must be photographed and measured before a custom footprint is accepted.
Listing photographs are context only and are not evidence of the received
revision.

## Required capture set

For each module, add an image beside a metric ruler or caliper, a top view, a
bottom view, and a side view showing the USB/optical orientation. Store images
under `evidence/photos/` with no EXIF/GPS metadata. Record the board marking and
purchase variant in the table below.

| Module | Received marking | Measured size | Pad pitch/offset | Connector/optic direction | Status |
| --- | --- | --- | --- | --- | --- |
| RP2040-Zero | [labels view](photos/rp2040-zero-vl53ldk-labels-2026-09-01.jpg), [components view](photos/rp2040-zero-vl53ldk-components-2026-09-01.jpg) | **PENDING RULER/CALIPER** | **PENDING RULER/CALIPER** | USB-C at board top; BOOT/RESET side visible | photo-captured |
| `VL53LDK`-marked ToF breakout | [labels view](photos/rp2040-zero-vl53ldk-labels-2026-09-01.jpg), [components view](photos/rp2040-zero-vl53ldk-components-2026-09-01.jpg) | **PENDING RULER/CALIPER** (vendor candidate: 10.5 × 13.3 mm) | **PENDING RULER/CALIPER** | optical package and one corner hole visible; four labelled pads VIN/GND/SCL/SDA plus auxiliary pad area | photo-captured |

The two photos show both boards together. They are useful for markings and
orientation, but they do not contain a scale reference, so no dimension or pad
pitch is inferred from pixels.

## Observed markings from the supplied photos

- The larger board is visibly marked `RP2040-Zero`, has a USB-C connector, and
  exposes numbered GPIO pads plus `5V`, `GND`, `RESET` and `BOOT`/programming
  controls. The exact revision string is not yet legible enough to freeze a
  footprint.
- The smaller blue board is visibly marked `VL53LDK` and has pads labelled
  `VIN`, `GND`, `SCL`, and `SDA`, plus an auxiliary pad area. The regulator and
  logic-level circuitry are visible but their electrical behaviour is not proven
  by a photo. Marketplace listings commonly call this geometry GY-530 or
  `VL53L0X`, but that does not identify the silicon on the received board.
  The owner confirms the GY-530-style distance-meter family match; exact
  coordinates and electrical topology remain to be measured. The component
  photograph also shows a probable `662K`-marked SOT-23 LDO, but its output
  voltage and manufacturer are not identifiable from the image.

## Authoritative references

- [Waveshare RP2040-Zero drawing](https://files.waveshare.com/upload/4/4c/RP2040_Zero.pdf)
- [JLCPCB manufacturer-linked RP2040-Zero CAD resource](https://jlcpcb.com/partdetail/Waveshare-RP2040Zero/C5350143)
- [EasyEDA RP2040-Zero module](https://easyeda.com/modules/RP2040-Zero_7b24158791074d248c4530b7d4e6639c)
- [`dj505` independent KiCad footprint (untested; comparison only)](https://github.com/dj505/RP2040-Zero-KiCAD)
- [KiCad library index listing the `dj505` package](https://pcbsync.com/kicad-raspberry-pi-library/)
- [Raspberry Pi RP2040 datasheet](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf)
- [GY-530/VL53LDK vendor listing](https://robocraze.com/products/robocraze-vl53ldk-time-of-flight-tof-lidar-laser-distance-sensor)
- [GY-530 dimensions and pin claims](https://www.sunfounder.com/products/distance-measurement-sensor)
- [ST note that VL53LDK is not an ST product](https://community.st.com/t5/imaging-sensors/vl53ldk-can-be-used-for-toys-6-age-and-pass-ul-ce-toys/td-p/247612)
- [JLCPCB position-sensor catalogue (bare IC entries)](https://jlcpcb.com/parts/2nd/Sensors/Position_Sensors_2187)
- [JLCPCB Waveshare VL53L0X sensor-module record C431944](https://jlcpcb.com/partdetail/Waveshare-VL53L0X_DistanceSensor/C431944)
- [JLCPCB Waveshare VL53L1X sensor-module record C431945](https://jlcpcb.com/partdetail/Waveshare-VL53L1X_DistanceSensor/C431945)
- [JLCPCB bare VL53L0X IC C2929940](https://jlcpcb.com/partdetail/-VL53L0X/C2929940)
- [JLCPCB bare VL53L1X IC C2924337](https://jlcpcb.com/partdetail/STMicroelectronics-VL53L1X/C2924337)
- [662K LDO family reference](https://www.lcsc.com/product-detail/Linear-Voltage-Regulators-LDO_Shenzhen-Fuman-Elec-662K_C841298.html)

The exact schematic and silicon identity of the `VL53LDK`-marked breakout and
the exact RP2040-Zero board revision must still be identified. Until then,
`pin-truth-table.json` records candidates, not verified connections.

## Proposed electrical interface (review candidate)

The candidate uses RP2040 I2C0 (`GP4=SDA`, `GP5=SCL`) at 3.3 V, with shared
ground and sensor power. Whether the sensor board accepts 3.3 V directly or
contains a regulator/level shifter is unresolved. No pull-up value is asserted
until that inspection is complete.
