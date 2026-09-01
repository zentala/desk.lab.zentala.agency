# Review finding register

No external review has been received. Fabrication is blocked.

| ID | Severity | Artefact | Finding | Owner decision | Closure evidence |
| --- | --- | --- | --- | --- | --- |
| E003-F001 | high | Evidence / footprint | Actual module revision, dimensions and pad map are not recorded. | open — capture physical evidence first | pending |
| E003-F002 | high | Schematic | `VL53LDK`-marked breakout regulator, silicon identity and I2C voltage domain are unknown. | open — inspect board and datasheet | pending |
| E003-F003 | medium | Export pipeline | TS Circuit CLI cannot currently run in this Windows environment because its native Rollup addon is blocked by application policy. | accepted as environment blocker; re-run on approved runtime before export claims | pending |
| E003-F004 | high | Variants B/C/D | JLCPCB source IDs, package orientation, assembly eligibility and RF/optical footprints are catalogue candidates, not verified library exports. | open — recheck current library and attach source exports | pending |
| E003-F005 | high | Review gate | No qualified external electronics review has been received. | open — source reviewer and record written feedback | pending |
| E003-F006 | medium | Variant renders | The B–D proof renders use registered TS Circuit pin-row placeholders so the pipeline is reproducible; they are not fabrication footprints. | parked for architecture comparison only; replace before fabrication | source and manifest status |
| E003-F007 | critical | Previous Variant A render | The earlier candidate used a generic 4-pad footprint for both modules, omitted the RP2040 pads, represented X/e as loose testpoints, and routed no real PCB traces in the variant matrix. | rejected; replaced in Variant A source with explicit 23-pad + 6-pad geometry and four routed nets | current source, candidate Circuit JSON, zero generated error diagnostics |
| E003-F008 | high | Previous mechanical layout | The earlier 48 × 32 mm carrier placed assumed carrier holes against RP2040 pads and did not model the ToF corner hole. | rejected; Variant A enlarged to 52 × 38 mm and models the 3 mm ToF hole separately | current source, generated placement/footprint checks |
| E003-F009 | high | Variant D | Variant D is an ESP32-C3 alternative study, not a second representation of Variant A. Its footprint remains placeholder geometry and is explicitly parked. | do not use for current review; revisit only after Variant A is accepted | portal label and variant source status |
