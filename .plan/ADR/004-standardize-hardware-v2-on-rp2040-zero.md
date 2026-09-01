# ADR-004: Standardize Hardware v2 on RP2040-Zero

- **Status**: accepted
- **Date**: 2026-09-01
- **Epic**: E003

## Context

The product documents still named RP2040-Tiny plus its FFC USB adapter, while
the received hardware, PCB commission brief and E003 carrier design use an
RP2040-Zero with onboard USB-C. Keeping both names as current created ambiguous
mechanical, USB and firmware contracts.

## Decision

RP2040-Zero is the canonical microcontroller module for the module-based
Hardware v2 reference design and Variant A. It connects to the computer through
its onboard USB-C port and uses GP4/GP5 as the provisional I2C0 SDA/SCL pair.

Product, firmware and architecture documents must use RP2040-Zero. Historical
session records and superseded epic narratives may retain RP2040-Tiny when they
describe the decision that existed at that time.

This decision does not identify the exact ToF silicon on the received breakout
and does not waive the external pre-fabrication review required by ADR-002.

## Alternatives

- **RP2040-Tiny:** rejected for Hardware v2 because it requires a separate FFC
  USB adapter and does not match the module received for E003.
- **Bare RP2040:** retained for chip-down Variants B/C, not the module-based
  reference design.
- **ESP32-C3:** retained for wireless Variant D, not the USB Variant A baseline.

## Consequences

- Hardware v2 has one module, USB and firmware source of truth.
- The carrier must preserve USB-C, BOOT and RESET access on RP2040-Zero.
- The previous FFC-adapter language is superseded.
- Existing Tiny-specific footprints or instructions must not be reused for
  Variant A.
