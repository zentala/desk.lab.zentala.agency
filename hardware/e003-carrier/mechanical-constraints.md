# Mechanical constraints

These constraints are review inputs. A and the catalogue/package candidates are
rendered for review, not released manufacturing footprints.

- Two-layer carrier, nominal 1.6 mm FR-4.
- Default outline is frameless: derive it from component bodies,
  connector/optical/RF access envelopes and a technical manufacturing margin.
  Do not add decorative perimeter space.
- Current compact review envelope for B–D is 48 × 32 mm. A remains 52 × 38 mm
  until received-module measurements replace the provisional envelope.
- The final edge margin must be checked against actual supplier courtyards,
  solder tails, cable bend radius and enclosure load path.
- USB connector must remain reachable after installation and tolerate a cable
  pull without transferring the load through sensor solder joints.
- BOOTSEL and any programming/test pads must remain reachable.
- `VL53LDK`-marked ToF optical aperture faces vertically downward, with no silkscreen,
  enclosure wall, adhesive, or copper obstruction in the field of view.
- Four mounting points are shown as a starting assumption; final positions must
  be derived from measured module keep-outs and the enclosure.
- No loose jumper wires in the installed assembly. Module solder joints need
  strain relief and a reviewable cable-load path.

## Mounting decision

The default installation is underside double-sided adhesive tape. The tape
contact zone must remain free of protruding solder tails, plated-hole burrs and
components that could peel the carrier under cable load. Direct soldering is
the smallest and lowest-stack option, but replacement requires desoldering and
transfers service risk to module pads. Low-profile removable headers improve
replacement and debug access, but add stack height, area, connector strain and
a second mating interface. Both options require a 1:1 mechanical review.

The narrow-frame fallback is allowed only if the frameless envelope fails a
documented edge-clearance, tape-peel, cable-pull, service-access or enclosure
load-path check. It must not be introduced merely to make the render look
balanced.

## Review table

| Constraint | Current candidate | Closure evidence |
| --- | --- | --- |
| A module envelope/pad datum | provisional local geometry | calibrated top/bottom measurement |
| B–D package footprints | catalogue-resolved pad geometry | current library orientation/DFM review |
| ToF optical path | explicit keep-out around sensor | optical stack and installed-height review |
| D antenna | explicit RF keep-out | Espressif layout guidance and enclosure review |
| underside tape | no underside components asserted in source | tape and solder-tail 1:1 check |
| direct solder vs removable header | decision intentionally open | height, replacement and cable-pull comparison |
