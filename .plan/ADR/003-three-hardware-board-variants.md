# ADR-003: Maintain four hardware validation variants

- Status: accepted
- Date: 2026-09-01

## Context

The first prototype must answer two different questions at once: whether the
received RP2040-Zero plus blue `UL53LDK`/`VL53LDK` breakout works in the desk,
and whether the same product can later be assembled from parts available in the
JLCPCB library. A third experiment adds local vibration and audible feedback.
A fourth experiment tests wireless transport separately from local feedback.
Those questions have different failure modes and must not be collapsed into one
ambiguous BOM.

## Decision

Design four explicitly named, electrically comparable carrier variants:

1. **A — received modules:** use the physical RP2040-Zero and received distance
   module. This is the reference for mechanical fit and the fastest application
   test.
2. **B — JLC chip-down:** use the JLCPCB/Raspberry Pi RP2040 (`C2040`), a
   JLCPCB-listed VL53L0X or VL53L1X IC, external flash, USB, power and passives.
   No dependency on the two plug-in development modules remains.
3. **C — JLC chip-down + feedback:** variant B plus an accelerometer for
   vibration/motion detection and an active 3 V buzzer. Keep the sensor and
   buzzer on separately controllable nets so firmware can isolate failures.
4. **D — ESP32 wireless:** use a JLCPCB-assembled ESP32-C3 module with the
   same distance-sensor contract and the LIS2DW12TR vibration sensor. USB
   supplies power only; raw measurements and vibration data are sent to the
   computer over BLE or Wi-Fi, while application state and notifications remain
   computer-side. No local buzzer is included.

The distance-sensor identity remains a provisional engineering assumption in B
and C. Variant A treats the received module as the physical truth even if its
marketplace label is a clone or rebadge.

## Ownership and data flow

```text
Physical evidence / JLC catalogue / datasheets
                    │
          variant BOM + pin/voltage contract
                    │
       TS Circuit board variant source files
                    │
       renders, netlists, manufacturing exports
                    │
     firmware test harness + desktop application
```

- **Evidence layer owns:** observed markings, measured geometry and confidence.
- **Variant BOM owns:** source IDs, package/footprint, voltage limits and
  substitution policy for each board.
- **Board source owns:** placement, routing, keep-outs and test points.
- **Firmware/application owns:** USB protocol, sensor reading, vibration event
  interpretation and buzzer patterns; it must not infer electrical geometry.
- **JLCPCB is an external sourcing/assembly adapter:** catalog identifiers and
  availability are inputs, not domain truth.

## Invariants crossing boundaries

- RP2040 GPIO assignments and I²C electrical levels are recorded once per
  variant and tested at the connector/device boundary.
- Every sensor power rail has an explicit measured or datasheet voltage range.
- Variant A must remain usable without JLCPCB access.
- Variants B/C/D must have a complete BOM of JLCPCB-available parts at review
  time; no marketplace module is silently substituted.
- Variant D must keep the transport boundary separate from sensor sampling so
  BLE/Wi-Fi loss cannot silently change the desktop notification state.
- Buzzer drive current and vibration-sensor interrupt behavior are tested
  independently before they are coupled to notification logic.

## Consequences

- We can validate the application before chip-down assembly is solved.
- Mechanical and electrical failures can be attributed to a named variant.
- Four review packages and BOMs must be kept synchronized.
- Fabrication remains blocked until each candidate's exported footprint, power
  tree and external review pass the existing E003 gate.

## Alternatives rejected

- One universal BOM with optional parts: hides voltage and footprint differences.
- Treating the marketplace `VL53LDK` name as a guaranteed silicon part number:
  the label is not an ST ordering code.
- Adding vibration/buzzer hardware to the first reference board: it would make
  the initial mechanical and sensor validation harder to diagnose.
- Making the first wireless board chip-down: RF layout, flash and antenna
  failures would obscure the application transport experiment; use the
  ESP32-C3 module first.
