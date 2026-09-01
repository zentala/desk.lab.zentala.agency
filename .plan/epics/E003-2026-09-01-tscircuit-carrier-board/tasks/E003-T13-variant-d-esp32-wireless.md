---
id: E003-T13
title: Design Variant D ESP32 wireless board
status: pending
priority: high
effort: large
type: feature
dependencies: [E003-T08, E003-T09]
tags: [hardware, jlcpcb, esp32, wireless]
epic: E003
commit: "feat(hardware): add wireless carrier variant"
group: E003-2026-09-01-tscircuit-carrier-board
created: 2026-09-01
completed_at: null
---

# E003-T13: Design Variant D ESP32 wireless board

## Objective

Add a wireless hardware candidate that is powered from USB but sends the same
raw desk-height and accelerometer data to the computer over BLE or Wi-Fi.
Keep posture state, buffering policy and notifications on the computer.

## Scope

- use a JLCPCB/EasyEDA-sourceable ESP32-C3 module for the first RF prototype;
- record the selected JLCPCB ID, antenna choice, power budget and keep-out;
- reuse the ToF electrical contract from Variant A/B;
- add LIS2DW12TR on the shared sensor bus and stream its samples or vibration
  events; do not add a local buzzer;
- define a transport-neutral payload and distinguish BLE from Wi-Fi framing;
- expose USB power and optional debug only; do not make USB data required;
- allow only a short diagnostic/sample ring buffer on the ESP32.

## Acceptance criteria

- [ ] Variant D has a separate BOM and source provenance.
- [ ] The selected ESP32-C3 module footprint, antenna clearance and 3V3 rail
      are reviewed against the manufacturer data.
- [ ] The computer can receive distance samples without USB data connected.
- [ ] The computer can receive accelerometer data/events without USB data
      connected.
- [ ] Wireless loss is observable and cannot fabricate a standing/sitting event.
- [ ] A test records latency, reconnect behavior, current draw and packet loss.

## Candidate

Initial candidate: Espressif `ESP32-C3-MINI-1-N4`, JLCPCB `C2838502`.
ESP32-S3 `C3013946` remains the strongest-compute alternative, and ESP32-C6
`C5364646` remains the Wi-Fi 6/Thread/Zigbee alternative.
