# E003 board variants

This is the working design brief for four testable boards. Variants A-C expose
the same USB serial application contract; Variant D exposes the same sensor
data over a wireless transport while using USB for power only.

## Variant matrix

| Variant | Hardware source | Distance sensor | Extra feedback | Purpose |
| --- | --- | --- | --- | --- |
| **A — received modules** | Physical RP2040-Zero + received blue `UL53LDK`/`VL53LDK` breakout | Marketplace-labelled ToF module; exact die unresolved | None | Fastest fit, wiring and application test |
| **B — JLC chip-down** | JLCPCB parts and assembly only | Select one: bare VL53L0X `C2929940` or VL53L1X `C2924337` | None | Validate a reproducible production-oriented BOM |
| **C — JLC feedback** | Same as B | Same selected die as B | LIS2DW12TR `C189624` + active 3 V buzzer `C781856` | Test vibration sensing and local audio feedback |
| **D — ESP32 wireless** | JLCPCB-assembled Espressif ESP32-C3 module | Same ToF sensor contract as A/B | LIS2DW12TR `C189624`; no buzzer | Test wireless ToF and vibration transport; USB is power-only |

## Shared contract

- USB power and USB serial remain on the RP2040 side.
- I²C is the shared sensor bus; SDA/SCL pull-ups must be to the verified bus
  voltage, not blindly to USB 5 V.
- The distance sensor faces downward and keeps its optical opening clear.
- Variant C gives the accelerometer its own I²C address/interrupt net and the
  buzzer its own GPIO driver net.
- Variant D sends raw measurements and device health over BLE or Wi-Fi; the
  notification/state logic remains on the computer. USB is a 5 V power input,
  not the application data link.
- Variant D may stream the same raw accelerometer samples or derived vibration
  events as Variant C, but has no local audio actuator.
- Every candidate has test points for 3V3 (or the sensor rail), GND, SDA and
  SCL; C also has `VIB_INT` and `BUZZER_DRV` test points.

## JLCPCB candidates

JLCPCB lists the Raspberry Pi RP2040 bare IC as `C2040`, LQFN-56 7×7 mm, with
EasyEDA symbol and footprint. It lists bare ST VL53L0X and VL53L1X ICs as LGA-12
parts, and also has Waveshare module records `C431944` and `C431945`. The module
records are useful CAD/PCBA references but are not assumed to be shippable loose
modules.

For vibration, the preferred C candidate is ST `LIS2DW12TR` (`C189624`):
LGA-12 2×2 mm, 1.62–3.6 V, I²C/SPI, X/Y/Z and motion-event detection. This is a
real accelerometer, not the less diagnosable spring-switch module often sold as
SW-420.

For sound, the first experiment uses the active electromagnetic `TMB12D03 3v`
(`C781856`): 2–5 V, 2.7 kHz, approximately 85 dB, 30 mA, through-hole 12 mm.
Because 30 mA is above a GPIO-safe design target, drive it through a small
low-side transistor/MOSFET with a gate/base resistor and an appropriate energy
path for the selected buzzer. If the board must remain all-SMT, evaluate the
passive CUI `CSS-J4B20-SMT-TR` (`C95056`) instead and generate the tone with
PWM through a transistor.

For wireless Variant D, the recommended first prototype is the simpler
Espressif `ESP32-C3-MINI-1-N4` module (`C2838502`): single-core RISC-V up to
160 MHz, 400 KB SRAM, 4 MB flash, 2.4 GHz Wi-Fi 4, Bluetooth LE 5 and an
integrated PCB antenna. This is more than enough for a raw-sensor bridge and
avoids paying for unused compute and PSRAM. The strongest compute option found
is still ESP32-S3 (`ESP32-S3-WROOM-1U-N16R8`, `C3013946`: dual-core 240 MHz,
512 KB SRAM, 16 MB flash, 8 MB PSRAM), but it is deliberately not the default
for D. ESP32-C6 (`C5364646`) remains an alternative when Wi-Fi 6/Thread/Zigbee
is specifically required.

## Assumptions to test, not freeze

- Variant A's blue module is a ToF laser/IR module despite its non-official
  `UL53LDK`/`VL53LDK` marking.
- Its visible `662K` SOT-23 device is an LDO; output may be 2.8 V or another
  fixed variant voltage.
- The underlying die may be VL53L0X-compatible or VL53L1X-based. Firmware test
  harnesses must be able to try both drivers before selecting B/C.
- JLCPCB part availability, package orientation and assembly eligibility are
  checked again immediately before ordering.
- Variant D's wireless link is selected after the first transport test: BLE is
  the simplest direct computer link; Wi-Fi is preferable when the device should
  join the local network. The payload remains transport-neutral.

## Verification order

1. Freeze Variant A connector/pad measurements and test the current app.
2. Choose VL53L0X versus VL53L1X for B using a driver probe and JLC package
   review; keep the other as a documented alternative.
3. Build B's schematic, power tree and chip-down footprint overlay.
4. Copy B into C, add LIS2DW12TR and buzzer driver, then test interrupts,
   current draw and audible patterns independently.
5. Add D's wireless transport and compare all four boards using the same
   desk-height and application-level tests.
