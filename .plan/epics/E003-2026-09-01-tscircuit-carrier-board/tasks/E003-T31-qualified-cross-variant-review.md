---
id: E003-T31
title: Run qualified cross-variant engineering review
status: pending
priority: critical
effort: medium
type: docs
dependencies: [E003-T30]
tags: [hardware, review, manufacturing, gate]
epic: E003
commit: "docs(hardware): record cross-variant engineering review"
created: 2026-09-02
---
# E003-T31: Run qualified cross-variant engineering review

## Objective

Send the complete portal and review package to a qualified electronics
reviewer, with special attention to the compact outline, mounting method,
component sourcing, footprints, routing and all variant boundaries.

## Acceptance criteria

- [ ] Review scope asks explicitly about frameless mounting versus narrow-frame
      fallback and direct solder versus removable headers.
- [ ] Feedback covers every variant's pad counts, electrical nets, power,
      optics/antenna, routing, clearances and manufacturability.
- [ ] Every finding is marked resolved, accepted or deferred by the owner.
- [ ] Fabrication remains blocked while any critical finding is open.

## Tests

- Full local check and browser review before sending.
- Independent written engineering feedback; AI output is not approval.
