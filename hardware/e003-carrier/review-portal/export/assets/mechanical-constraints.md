# Mechanical constraints

These constraints are review inputs, not a claim that the current placeholder
layout fits the received modules.

- Two-layer carrier, nominal 1.6 mm FR-4.
- USB connector must remain reachable after installation and tolerate a cable
  pull without transferring the load through sensor solder joints.
- BOOTSEL and any programming/test pads must remain reachable.
- `VL53LDK`-marked ToF optical aperture faces vertically downward, with no silkscreen,
  enclosure wall, adhesive, or copper obstruction in the field of view.
- Four mounting points are shown as a starting assumption; final positions must
  be derived from measured module keep-outs and the enclosure.
- No loose jumper wires in the installed assembly. Module solder joints need
  strain relief and a reviewable cable-load path.
