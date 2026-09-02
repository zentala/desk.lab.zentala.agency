# ADR-005: Compact frameless carrier with mechanical fallback

- **Status**: accepted
- **Date**: 2026-09-02
- **Epic**: E003

## Context

The current candidates leave excessive perimeter space and use inconsistent
module geometry. The owner wants the smallest practical board, with the PCB
attached to the desk from its underside using double-sided tape, while still
allowing the controller and sensor modules to be replaced or hacked. A visible
decorative frame is not useful and can make the design look larger than the
real mechanical envelope.

## Decision

Use a **frameless compact carrier** as the default mechanical direction:

- size the outline from measured component envelopes, connector access,
  optical keep-out and fabrication edge clearance;
- keep only a documented technical board-edge margin, not a decorative border;
- place the RP2040 module and ToF module from measured datums, with a compact
  rotated-RP2040 layout evaluated as the primary A candidate;
- keep the underside as the preferred adhesive-facing side and keep copper,
  solder tails and component protrusions compatible with the tape and desk;
- do not place mounting holes under pads, traces, optical openings or module
  bodies;
- evaluate low-profile removable headers/socket mounting separately from direct
  soldering, because serviceability must not be hidden inside the footprint;
- retain a narrow framed layout only as a fallback if edge strength, cable
  strain relief, adhesive peel, or external review makes frameless mounting
  unsafe.

This decision changes the implementation target, not the four-variant
electrical architecture in ADR-003. A remains the received-module reference;
B/C remain real chip-down candidates; D remains the wireless ESP32-C3
candidate. A generic four-pad placeholder is not an acceptable implementation
for any variant whose selected part has more pads.

## Consequences

- Board dimensions become a measured output, not a fixed 48 x 32 or 52 x 38 mm
  assumption.
- The mechanical review must include a 1:1 print or dimensioned overlay,
  underside tape clearance and connector/cable access.
- Direct soldering is likely the smallest option; removable headers are an
  explicit size and height trade-off.
- The fallback frame can be implemented without changing the electrical net
  contract if the compact outline fails the mechanical gate.
- Fabrication remains blocked by ADR-002 until the compact geometry, routing,
  electrical assumptions and qualified review pass.

## Rejected for the default

- A large perimeter frame added only for visual decoration.
- Mounting holes placed inside a module outline or in a solder-pad zone.
- Reusing the generic `pinrow4_p2.54mm` footprint for RP2040, ESP32 or a
  multi-pad ToF IC.
