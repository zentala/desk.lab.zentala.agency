---
id: E003-T19
title: Refresh Variant A review portal and package
status: pending
priority: high
effort: small
type: docs
dependencies: [E003-T18]
tags: [hardware, docs, portal, review]
epic: E003
commit: "docs(hardware): refresh Variant A review package"
created: 2026-09-01
---
# E003-T19: Refresh Variant A review portal and package

## Objective

Make the browser portal communicate the actual review state: A is active,
measured evidence is visible, D is parked and no provisional geometry is
mistaken for fabrication output.

## Acceptance criteria

- [ ] Portal shows all module outlines, pads, holes, optical clearance, routes
      and access legend at a readable scale.
- [ ] Variant D is visibly parked and excluded from the A implementation review.
- [ ] Review findings, evidence, assumptions, source and generated artefacts
      link correctly in the static export.
- [ ] Manifest hashes match regenerated artefacts and no secrets are packaged.

## Tests

- Browser: visual inspection, zero console errors and no failed document links.
- Package: manifest and portal packaging checks.
