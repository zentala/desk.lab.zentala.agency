# RP2040-Tiny Firmware Specification

## Hardware

- **MCU**: Waveshare RP2040-Tiny
- **Sensor**: VL53L0X (ToF laser distance, I2C)
- **Connection to PC**: USB via FFC cable + USB adapter daughterboard
- **Optional**: vibration/accelerometer sensor on desk surface (presence detection)

---

## Communication protocol: USB Serial (JSON Lines)

- **Baud rate**: 115200
- **Format**: one JSON object per line, newline-terminated (`\n`)
- **Direction**: bidirectional (firmware → host and host → firmware)

### Why USB Serial over HID

- Simpler firmware (no HID descriptor design)
- Easier to debug (readable with any serial monitor)
- No driver needed on modern OS (CDC ACM class, built-in)
- Sufficient bandwidth for 1 reading/second

---

## Messages: Firmware → Host

### Height reading (sent every 1 second)

```json
{"t":"height","v":620,"ts":1719432000}
```

| Field | Type | Description |
|---|---|---|
| `t` | string | message type: `"height"` |
| `v` | integer | distance in millimeters (sensor to floor or reference point) |
| `ts` | integer | unix timestamp (seconds) — from host clock, see SYNC |

**Height values:**
- Desk in sitting position: typically 600–750 mm
- Desk in standing position: typically 950–1200 mm
- Calibration required per user (see CALIBRATE command)
- Value `-1` means sensor read error (out of range, I2C failure)

### Vibration / presence reading (optional, if sensor present)

```json
{"t":"vibe","v":12,"ts":1719432000}
```

| Field | Type | Description |
|---|---|---|
| `t` | string | `"vibe"` |
| `v` | integer | vibration magnitude 0–100 (0 = still, 100 = heavy typing) |

### Device ready

```json
{"t":"ready","fw":"0.1.0"}
```

Sent once on USB connect / power-on. Host waits for this before trusting readings.

### Error

```json
{"t":"error","code":"SENSOR_TIMEOUT","msg":"VL53L0X not responding"}
```

---

## Messages: Host → Firmware

### Time sync (sent after receiving `ready`)

```json
{"cmd":"sync","ts":1719432000}
```

Firmware uses this to timestamp its readings correctly.
RP2040 has no RTC — time comes from host.

### Calibrate sitting position

```json
{"cmd":"cal_sit"}
```

Firmware saves current height reading as `SITTING_HEIGHT_MM` in flash.
Response:

```json
{"t":"cal_ok","pos":"sit","v":680}
```

### Calibrate standing position

```json
{"cmd":"cal_stand"}
```

Same — saves current height as `STANDING_HEIGHT_MM`.

### Request status

```json
{"cmd":"status"}
```

Response:

```json
{
  "t":"status",
  "fw":"0.1.0",
  "sensor":"ok",
  "cal_sit":680,
  "cal_stand":1050,
  "last_height":682
}
```

---

## Firmware behavior

### Startup sequence

```
1. Init USB Serial (CDC ACM)
2. Init I2C bus
3. Init VL53L0X
4. If sensor OK: send {"t":"ready","fw":"0.1.0"}
5. If sensor FAIL: send {"t":"error","code":"SENSOR_INIT_FAILED"}
6. Wait for {"cmd":"sync","ts":...} from host
7. Begin sending height readings every 1 second
```

### Main loop (1Hz)

```
read VL53L0X distance
if read OK:
    send {"t":"height","v":<mm>,"ts":<ts>}
else:
    send {"t":"height","v":-1,"ts":<ts>}

if vibration sensor present:
    read vibration magnitude
    send {"t":"vibe","v":<mag>,"ts":<ts>}

check for incoming commands
process if any
```

### Calibration storage

Calibration values stored in RP2040 flash (persistent across power cycles).
Default values used if not calibrated:
- `SITTING_HEIGHT_MM = 700`
- `STANDING_HEIGHT_MM = 1000`

---

## I2C wiring (VL53L0X → RP2040-Tiny)

| VL53L0X pin | RP2040-Tiny pin | Notes |
|---|---|---|
| VCC | 3V3 | 3.3V power |
| GND | GND | Ground |
| SDA | GP4 | I2C0 SDA |
| SCL | GP5 | I2C0 SCL |
| XSHUT | GP6 | Optional: sensor enable/disable |

VL53L0X I2C address: `0x29` (default)

---

## MicroPython implementation notes

```python
# main.py skeleton
import json
import time
from machine import I2C, Pin
import usb_cdc
from vl53l0x import VL53L0X

i2c = I2C(0, sda=Pin(4), scl=Pin(5))
sensor = VL53L0X(i2c)
serial = usb_cdc.data  # secondary CDC channel for data

host_ts_offset = 0  # set by SYNC command

def now():
    return int(time.time()) + host_ts_offset

def send(obj):
    serial.write(json.dumps(obj) + '\n')

def handle_command(line):
    global host_ts_offset
    cmd = json.loads(line)
    if cmd['cmd'] == 'sync':
        host_ts_offset = cmd['ts'] - int(time.time())
    elif cmd['cmd'] == 'cal_sit':
        v = sensor.range
        # save to flash...
        send({'t': 'cal_ok', 'pos': 'sit', 'v': v})
    elif cmd['cmd'] == 'status':
        send({'t': 'status', 'fw': '0.1.0', 'sensor': 'ok'})

# startup
send({'t': 'ready', 'fw': '0.1.0'})

while True:
    # read sensor
    try:
        v = sensor.range
    except:
        v = -1
    send({'t': 'height', 'v': v, 'ts': now()})

    # check for commands
    if serial.in_waiting:
        line = serial.readline().decode().strip()
        if line:
            handle_command(line)

    time.sleep(1)
```

---

## Open questions

- [ ] VL53L0X MicroPython library — which one? (`micropython-vl53l0x` on PyPI)
- [ ] USB CDC secondary channel vs primary — which port does `usb_cdc.data` map to?
- [ ] Flash storage for calibration — use `micropython-storage` or raw flash write?
- [ ] Vibration sensor model — which accelerometer? ADXL345? MPU6050? (I2C, cheap)
- [ ] Power: USB-powered only (from host) — no battery needed
