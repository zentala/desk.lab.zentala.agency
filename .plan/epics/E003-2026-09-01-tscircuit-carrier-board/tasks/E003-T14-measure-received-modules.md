---
id: E003-T14
title: Measure received modules and capture electrical evidence
status: pending
priority: critical
effort: medium
type: improvement
dependencies: []
tags: [hardware, evidence, tof, rp2040]
epic: E003
commit: "docs(hardware): record measured module evidence"
created: 2026-09-01
---
# E003-T14: Measure received modules and capture electrical evidence

## Objective

Replace visual/vendor assumptions with repeatable physical measurements and a
safe electrical evidence record for the received RP2040-Zero and ToF breakout.

## Acceptance criteria

- [ ] Each board has separate top, bottom and side photos with a metric scale.
- [ ] ToF outline, six pad centres and sizes, corner hole and optical datum are
      recorded from a stated datum and repeated measurements agree.
- [ ] RP2040-Zero outline, edge pitch, USB/BOOT/RESET access and I2C pads are
      checked against the official drawing and received board.
- [ ] VIN rail, regulator output, pull-up rail and X/E continuity are recorded
      under safe, current-limited conditions or explicitly marked unresolved.
- [ ] Evidence links and uncertainty are recorded in `evidence.md` and the
      pin truth table; no value is inferred from pixels.

## Tests

- Manual: 1:1 print/overlay and independent repeat measurement.
- Electrical: power-off continuity first; powered checks only with current
  limiting and reviewer-approved voltage.
