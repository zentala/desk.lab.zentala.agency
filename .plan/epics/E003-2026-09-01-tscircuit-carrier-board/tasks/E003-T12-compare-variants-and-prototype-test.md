---
id: E003-T12
title: Compare variants with a shared prototype test protocol
status: pending
priority: medium
effort: medium
type: docs
dependencies: [E003-T09, E003-T10, E003-T11, E003-T13]
tags: [hardware, testing, application]
epic: E003
commit: "docs(hardware): add shared three-variant prototype test protocol"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T12: Compare variants with a shared prototype test protocol

## Objective

Make the three boards comparable from the desktop application's point of view,
so a wrong sensor assumption can be isolated without blocking all experiments.

## Acceptance criteria

- [ ] USB enumeration and serial protocol are tested on every variant.
- [ ] Distance readings are logged against known desk heights and sensor state.
- [ ] Variant C records vibration events, buzzer events and supply current
      separately.
- [ ] Results identify which assumptions are safe to promote and which remain
      variant-specific.

## Tests

- Automated serial smoke test plus a repeatable manual height sequence.
- 30-minute USB soak test and power/current log for each assembled board.
