---
id: E004-T13
title: Expose source, net and route status in the review portal
status: pending
priority: medium
effort: medium
type: feature
dependencies: [E004-T12]
tags: [portal, review, reporting]
epic: E004
branch: feat/E004-T13-portal-routing-status
commit: "feat(hardware): expose net and route status in portal"
created: 2026-09-02
completed_at: null
---
# E004-T13: Expose source, net and route status in the review portal

## Objective
Make the portal show component provenance, endpoint connectivity, route class,
unrouted nets, locked traces, computed maturity, semantic design impact,
warnings and fabrication status for each variant.

## Acceptance criteria
- [ ] A reviewer can identify what is source-backed, provisional, unrouted or blocked.
- [ ] Portal is generated from the same resolved report as verification.
- [ ] A reviewer can compare the current design with the previous resolved
      version and identify affected variants, nets, routes and artefacts.
- [ ] Static export remains self-contained and has zero console errors.

## Tests
- Portal packaging, link/image checks and browser QA for A/B/C/D.
