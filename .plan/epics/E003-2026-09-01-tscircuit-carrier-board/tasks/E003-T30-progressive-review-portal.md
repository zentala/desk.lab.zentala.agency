---
id: E003-T30
title: Publish progressive all-variant review portal
status: pending
priority: high
effort: medium
type: improvement
dependencies: [E003-T29]
tags: [hardware, portal, browser, visual-review]
epic: E003
commit: "docs(hardware): publish progressive all-variant review portal"
created: 2026-09-02
---
# E003-T30: Publish progressive all-variant review portal

## Objective

Make one browser page the review entry point for A–D and the reusable library
preview. Use progressive disclosure so the overview stays readable while each
variant can open its full PCB, schematic, source, BOM, assumptions and test
results.

## Acceptance criteria

- [ ] A, B, C and D each show a distinct full-board render and status, with no
      copied image or misleading “complete” label.
- [ ] The page makes A's received-module reference, B/C chip-down scope and
      D wireless scope explicit.
- [ ] Full outlines, pads, holes, optical/antenna keep-outs and routes are
      reachable at readable scale for every implemented candidate.
- [ ] The page includes the frameless mounting decision, open blockers and
      fabrication gate without hiding uncertainty.
- [ ] Static packaging preserves relative links, hashes and source provenance.

## Tests

- Browser: zero console errors, no failed document/image links and distinct
  image URLs/hashes.
- Manual screenshot review at overview and expanded detail levels.
- Package/manifest verification.
