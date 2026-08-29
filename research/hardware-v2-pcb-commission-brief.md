# Open Smart Desk — PCB and Test Kit Commission Brief (v2)

> Copy-ready material for a marketplace listing or direct outreach to a contractor.  
> Status: 29 August 2026. This is the next, simplified iteration of an existing prototype project.

## Listing text — copy-ready version

I am looking for someone who can take ownership of the next hardware iteration of **Open Smart Desk**: a small, robust desk-height sensor that connects to a computer over USB.

The device is installed underneath a height-adjustable desk. It measures the distance to the floor with a time-of-flight (ToF) sensor, and a microcontroller sends the height reading over USB Serial. A desktop application will use this signal to remind the user to alternate between sitting and standing. This is **not** a desk motor-control project and does not involve mains voltage or 230 V wiring.

I have working prototypes and the core modules already in hand. I need somebody to take care of the next iteration end to end: validate the supplied components, design a simple PCB that permanently and cleanly connects the two modules, arrange a PCB prototype, assemble it, and test the first units. In the future, I would also like to be able to order additional small batches from the same person, potentially including packing and shipping.

### Components already available

- **RP2040-Zero** — compact RP2040 microcontroller board with USB, 2 MB Flash, approximately 18 × 23.5 mm; purchased without pin headers and suitable for soldering to a carrier PCB.
- **VL53L0X Blue Board** — laser time-of-flight distance-sensor breakout using I2C; powered from 3–5 V and marketed with a range of up to approximately 2 m.
- I have several units of both components, so the first prototype and basic tests can start without waiting for a delivery.

An earlier concept mentioned the **VL6180X**, but the module currently owned and planned for this iteration is the **VL53L0X**. Please quote for the VL53L0X version unless you can justify a different sensor.

### Scope of the first commission

1. Inspect and bring up the supplied modules; confirm their actual pinout, voltage requirements, I2C operation, and USB operation.
2. Design a small carrier / hub PCB on which the two modules are **permanently soldered**. The goal is not loose wires or removable hobby connectors.
3. Create the schematic and PCB in a tool that provides editable source files (KiCad preferred), Gerbers, and a bill of materials.
4. Order a first small PCB batch (for example through JLCPCB or PCBWay), or provide the complete manufacturing package and clear ordering instructions.
5. Assemble and test the first units: VL53L0X readings over I2C, stable USB operation, and height data sent to a computer.
6. Produce a short assembly, test, and firmware-flashing guide for anyone assembling a later batch.
7. Optional after the PCB works: design a simple 3D-printable enclosure or protective cover (STL + STEP).

### Design requirements

- USB provides both power and the connection to the host computer.
- Data must be available through **USB Serial/UART**. A simple text protocol is preferred, for example JSON Lines containing `height_mm`.
- The PCB must permanently connect RP2040-Zero and VL53L0X via I2C (SDA, SCL, GND, and power). The contractor must confirm the correct pins for the supplied module revisions before laying out the PCB.
- The device is intended to run almost continuously underneath a desk for years. Mechanical reliability matters: USB strain relief, no loose wiring, reliable solder joints, practical mounting, and resistance to accidental knocks.
- Initial mounting is with strong double-sided tape. Screw-mounting holes are welcome if they do not make the device unnecessarily large.
- The sensor must retain a clear optical path facing downward. Any enclosure must avoid internal reflections and allow the optical window to be cleaned.
- A clean, compact appearance is important but secondary to reliability. Black solder mask is welcome, not mandatory.

### Expected deliverables

- editable schematic and PCB project files;
- Gerbers, drill files, BOM, pick-and-place file where applicable, and schematic PDF;
- documented pinout and interconnections;
- a working, tested first unit or short test batch;
- firmware/source code, or an unambiguous procedure for flashing and testing USB Serial;
- a brief test report covering distance reads, USB stability, and basic mechanical mounting;
- rights that allow publication of the entire design as open source under the Open Smart Desk name. The quote should clearly state the ownership or licence terms for PCB, firmware, and enclosure files.

### Longer-term collaboration

There is no requirement to rush this. I value quality, documentation, and someone I can return to for later small production runs: assembly, quality control, packing, and possibly shipping. The end result should be a simple DIY/test kit that can be assembled easily from supplied parts.

Please include in your reply:

- examples of previous PCB and/or mechanical design work;
- the design tools you would use;
- an approximate cost split for PCB design, prototype/assembly, testing, enclosure, and repeat units;
- risks or changes you recommend before work begins.

## Technical note for the contractor

### Architecture

```text
VL53L0X (ToF, I2C) ── I2C ── RP2040-Zero ── USB Serial ── computer
                                                   │
                                           desktop app reminds the
                                           user to change posture
```

The sensor faces vertically downward and measures the distance to the floor. A shorter distance means the desk is lower (normally the sitting position); a longer distance means it is raised (normally standing). Thresholds and calibration belong in firmware/the desktop application; the PCB must provide robust, repeatable sensing.

### Items to verify before ordering

- Verify physical dimensions, pad layout, and pinout of the received modules. AliExpress listings can differ even when the product name is the same.
- Confirm whether the particular VL53L0X breakout includes a voltage regulator and logic-level conversion, and determine the required I2C voltage. Do not assume this from the listing alone.
- Confirm RP2040-Zero I2C pins and boot/debug access. Firmware programming should remain convenient through the existing USB connection; do not obstruct BOOTSEL if present.
- Consider compact test pads for SWD, SDA, SCL, 3V3, and GND without turning the product into a development board.
- Test the sensor on a real desk: actual floor material, sitting and standing distances, daylight, and at least several days of continuous operation.
- Design the mechanics so the sensor module cannot detach after a USB-cable tug. If the USB-C connector is on the RP2040 module, the carrier PCB must not obstruct it or transfer cable load directly to its module pads.

### First-iteration acceptance criteria

1. A computer enumerates the device over USB after every reconnect.
2. The device sends distance readings over USB Serial at least once per second for a minimum of 8 hours without manual intervention.
3. The reading clearly distinguishes the actual sitting and standing heights of the target desk.
4. Both modules are secured without loose wires or an accidental-disconnect path.
5. The owner receives every file required to reorder the PCB and assemble another batch.

## Important boundary

The project does not include desk control, relays, or mains voltage. It is a low-voltage USB sensor. Distributing it as a DIY/open-source kit may affect the applicable compliance obligations, but does **not** automatically remove them if complete devices are later sold. Legal and product-compliance requirements should be reviewed separately for the eventual distribution model.

## Related repository material

- [Hardware v2 specification](hardware-v2-spec.md) — broader product description; some component references predate the modules currently in hand.
- [PRD](../PRD.md) — product problem and operating model.
- [Firmware and protocol specification](architecture/FIRMWARE-SPEC.md) — target USB Serial interface.
