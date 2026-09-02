---
id: E003-T21
title: Register authoritative component and footprint sources
status: in-review
priority: high
effort: medium
type: improvement
dependencies: [E003-T14]
tags: [hardware, library, footprint, evidence]
epic: E003
commit: "docs(hardware): register authoritative component sources"
created: 2026-09-02
---
# E003-T21: Register authoritative component and footprint sources

## Objective

Create a source register for every selected module, IC, sensor, buzzer,
connector and support part. Separate a reusable library asset from a visual
preview and record confidence against the received hardware or datasheet.

## Acceptance criteria

- [ ] Each part has manufacturer/orderable identifier, package, pad count,
      source URL, license/provenance and confidence level.
- [ ] RP2040-Zero and the received ToF breakout are identified as module
      geometry, not silently replaced by bare-chip footprints.
- [ ] JLCPCB `C2040` and the selected ToF IC are recorded as chip-down parts
      with their complete support circuitry requirements.
- [ ] Any missing exact library asset is marked as an authoring task; no
      `pinrow4_p2.54mm` placeholder remains in a release candidate.

## Tests

- Source-register completeness check.
- Manual comparison against datasheets, received-board photos and 1:1 print.
