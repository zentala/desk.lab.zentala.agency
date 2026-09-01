# Variant source contract

The four JSON files are the review-time BOM contract. A `catalogue-candidate` is
not a verified source: the part ID, package, orientation and assembly eligibility
must be checked again before export. `unresolved` entries are intentionally not
fabrication-ready.

Variant A is anchored to the received modules. Variants B and C are independent
JLCPCB chip-down candidates. Variant D is independent of USB data and uses the
same raw sensor payload over BLE or Wi-Fi; application state remains computer-side.
