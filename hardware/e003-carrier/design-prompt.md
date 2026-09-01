# E003 controlled design context

This is the complete context supplied to an AI-assisted design pass. It is
versioned so a reviewer can reproduce the reasoning without private chat logs.

## Prompt

Create a small two-layer, USB-powered carrier board for the exact RP2040-Zero
and the `VL53LDK`-marked GY-530-style ToF breakout supplied by the owner. Permanently connect 3V3 (only after
the breakout power path is verified), GND, SDA and SCL. Preserve direct USB-C
access, BOOTSEL/programming access, a downward-facing unobstructed optical path,
and practical mounting holes. Do not add motor control, relays, mains wiring,
or an unverified voltage converter. Every footprint dimension and pin mapping
must come from the physical evidence record; unresolved data must remain a
visible review blocker.

## Assumptions (not approvals)

- Candidate board envelope: 48 mm × 32 mm, 1.6 mm FR-4, two copper layers.
- Candidate mounting-hole pattern: four 3.2 mm holes at ±20 mm / ±12 mm.
- Candidate RP2040 I2C pins: GP4/GP5.
- Sensor optical window points away from the carrier and remains cleanable.

All assumptions above require mechanical and electrical review. The source is a
candidate and is not fabrication-ready.

## Tool provenance

- TS Circuit package: `0.0.2462` (pinned in `package.json`)
- TypeScript: `5.9.2`
- Node/Bun runtime: record the runtime used in the export manifest
- Design source: `src/carrier.tsx`
