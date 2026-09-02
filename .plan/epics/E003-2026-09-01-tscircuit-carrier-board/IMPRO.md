# E003 improvements

- [ ] Run a dedicated planning session to split post-fabrication prototype
      execution out of E003, make the fabrication decision depend on all four
      variant review gates, and give wireless Variant D transport-specific
      acceptance tests instead of mandatory USB Serial tests.
- [x] Reconcile the repository-wide Hardware v2 source of truth. The owner
      selected RP2040-Zero; ADR-004 records the decision and the active product,
      firmware, architecture and roadmap documents now use it consistently.
- [ ] Variant A remediation from the post-visual review: measured ToF
      footprint/optics, resolved power interface, access legend, deliberate
      routing, geometry collision tests, portal refresh and external review.
      Tracked as E003-T14 through E003-T20 and findings E003-F010 through
      E003-F017.
- [ ] Parametric component, netlist and routed-variant architecture. Promoted
      to [E004](../E004-2026-09-02-tscircuit-parametric-routing-system/PLAN.md),
      which owns the generator refactor and B–D routing system.
