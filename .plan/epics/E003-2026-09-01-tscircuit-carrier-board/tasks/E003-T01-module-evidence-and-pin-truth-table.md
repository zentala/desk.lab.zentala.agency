---
id: E003-T01
title: Capture module evidence and pin truth table
status: in-progress
priority: critical
effort: medium
type: docs
dependencies: []
tags: [hardware, evidence, rp2040-zero, vl53ldk]
epic: E003
commit: "docs(hardware): record module evidence"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T01: Capture module evidence and pin truth table

## Objective

Create the evidence base for every later electrical and mechanical decision.
The actual modules—not an AliExpress image—are authoritative.

## Steps

1. Photograph front, back, side, labels and connector orientation of each module.
2. Measure board dimensions, pad pitch/position and any mounting holes.
3. Collect manufacturer documentation and the exact purchase/listing reference.
4. Build the pin truth table with physical label, function, voltage and source.
5. Flag every mismatch or unknown as unresolved.

## Acceptance criteria

- [ ] Both modules have legible top/bottom photos and dimension evidence.
- [ ] Every used pin has two forms of evidence: physical marking and an
      authoritative source, or is explicitly unresolved.
- [ ] USB connector and `VL53LDK`-marked breakout optical orientation are documented.
- [ ] The record is ready for an external reviewer to inspect.

## Tests

- Visual review: compare each physical board label with the truth table.
- Peer review: a second person can identify every used pin from the evidence.

## Implementation note

The evidence template and candidate truth table live in
`hardware/e003-carrier/evidence/`. The received-board photos are captured;
measured dimensions, continuity checks and authoritative module-revision
evidence remain required. A machine check now keeps placeholder pin order and
nets aligned with the truth table.
