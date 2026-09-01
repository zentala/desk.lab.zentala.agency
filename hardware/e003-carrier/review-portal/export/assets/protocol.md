# Shared application-level prototype protocol

This protocol compares sensor and transport behaviour without hiding failures
inside the desktop notification state machine. It is a test contract, not a
claim that any board has been fabricated.

## Payload

```json
{"v":1,"device":"e003-A","seq":42,"ts_ms":1234,"distance_mm":730,"distance_status":"valid","accel_mg":{"x":0,"y":0,"z":1000},"vibration":false,"vbus_mv":5000}
```

Required fields are `v`, `device`, monotonically increasing `seq`, device time,
raw distance/status, and supply telemetry where the hardware exposes it.
Accelerometer fields are required for C/D and optional-but-reserved for A/B.
Unknown or stale data must be observable; a missing packet must never become a
standing or sitting event.

## Shared test gates

1. Record firmware revision, board variant, sensor hypothesis and source-BOM revision.
2. Verify power-off continuity: no short between 3V3 and GND; verify rail voltage.
3. Verify I2C scan and sensor identity/initialisation without a desk attached.
4. Log readings at three known heights, then repeat ten transitions while noting
   desk height independently. Preserve raw logs, not only derived state.
5. Run a 30-minute soak with USB enumeration/reconnect checks and timestamp gaps.
6. Compare invalid readings, packet loss and resets against the application log.

## Variant gates

| Variant | Additional test | Pass evidence |
| --- | --- | --- |
| A | USB Serial + physical module fit | enumeration, I2C log, 1:1 overlay |
| B | chip-down power tree and USB Serial | ERC/netlist, rail/current log, serial smoke |
| C | isolate `VIB_INT` and `BUZZER_DRV` | interrupt count, tone/current log, no brown-out |
| D | USB power with USB data disconnected | BLE/Wi-Fi latency, reconnect, packet loss and current log |

The protocol promotes no assumption to product truth. A result is safe to
promote only when it is reproducible on the named variant and its source revision.
