# E003 board verification report

Generated: 2026-09-02T00:40:47.432Z

This is a release-blocking report. A green tscircuit render is not enough: every board must pass the Circuit JSON checks and the project-specific component contract.

| Board | Artifact | Status | Component-contract issues | TS-Circuit errors | Blocking warnings |
| --- | --- | --- | ---: | ---: | ---: |
| A | `artifacts/candidate-proof` | **PASS** | 0 | 0 | 0 |
| B | `artifacts/variants/B` | **PASS** | 0 | 0 | 0 |
| C | `artifacts/variants/C` | **PASS** | 0 | 0 | 0 |
| D | `artifacts/variants/D` | **PASS** | 0 | 0 | 0 |

## Findings

### A — canonical received-module carrier

No blocking findings.


### B — JLCPCB chip-down candidate

No blocking findings.


### C — chip-down candidate with feedback hardware

No blocking findings.


### D — ESP32-C3 wireless candidate

No blocking findings.


## Visual gate

The script proves that distinct PCB and schematic SVGs exist and records their hashes. An agent must still open the generated PCB render/screenshot and inspect: every physical pad, board outline, mounting hole, optical keep-out, connector access and route endpoint. The visual inspection is not allowed to be replaced by a green script result.
