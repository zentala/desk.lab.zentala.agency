import React from "react"

/**
 * B/C/D are review candidates, not fabrication releases. The controller,
 * ToF IC, accelerometer and ESP32 footprints resolve to named JLCPCB library
 * parts. Support parts whose final JLCPCB number is still open use explicit
 * local geometry so a four-pad placeholder cannot hide an incomplete design.
 */

const RP2040_PIN_LABELS: Record<number, string> = {
  1: "IOVDD6", 2: "GPIO0", 3: "GPIO1", 4: "GPIO2", 5: "GPIO3",
  6: "GPIO4_SDA", 7: "GPIO5_SCL", 8: "GPIO6", 9: "GPIO7", 10: "IOVDD5",
  11: "GPIO8", 12: "GPIO9", 13: "GPIO10", 14: "GPIO11", 15: "GPIO12",
  16: "GPIO13", 17: "GPIO14", 18: "GPIO15", 19: "TESTEN", 20: "XIN",
  21: "XOUT", 22: "IOVDD4", 23: "DVDD2", 24: "SWCLK", 25: "SWD",
  26: "RUN", 27: "GPIO16", 28: "GPIO17", 29: "GPIO18", 30: "GPIO19",
  31: "GPIO20", 32: "GPIO21", 33: "IOVDD3", 34: "GPIO22", 35: "GPIO23",
  36: "GPIO24", 37: "GPIO25", 38: "GPIO26_ADC0", 39: "GPIO27_ADC1",
  40: "GPIO28_ADC2", 41: "GPIO29_ADC3", 42: "IOVDD2", 43: "ADC_AVDD",
  44: "VREG_IN", 45: "VREG_VOUT", 46: "USB_DM", 47: "USB_DP",
  48: "USB_VDD", 49: "IOVDD1", 50: "DVDD1", 51: "QSPI_SD3",
  52: "QSPI_SCLK", 53: "QSPI_SD0", 54: "QSPI_SD2", 55: "QSPI_SD1",
  56: "QSPI_SS", 57: "GND",
}

const VL53L0X_PIN_LABELS: Record<number, string> = {
  1: "AVDDVCSEL", 2: "AVSSVCSEL", 3: "GND", 4: "GND2", 5: "XSHUT",
  6: "GND3", 7: "GPIO1", 8: "DNC", 9: "SDA", 10: "SCL", 11: "AVDD", 12: "GND4",
}

const LIS2DW12_PIN_LABELS: Record<number, string> = {
  1: "GND", 2: "CS", 3: "GND2", 4: "GND3", 5: "NC", 6: "GND4",
  7: "RES", 8: "GND1", 9: "VDD", 10: "VDDIO", 11: "INT2", 12: "INT1",
}

const ESP32_C3_PIN_LABELS: Record<number, string> = {
  1: "GND1", 2: "GND2", 3: "3V3", 4: "NC1", 5: "IO2", 6: "IO3",
  7: "NC2", 8: "EN", 9: "NC3", 10: "NC4", 11: "GND3", 12: "IO0",
  13: "IO1", 14: "GND4", 15: "NC5", 16: "IO10", 17: "NC6", 18: "IO4",
  19: "IO5", 20: "IO6", 21: "IO7", 22: "IO8", 23: "IO9", 24: "NC7",
  25: "NC8", 26: "IO18", 27: "IO19", 28: "NC9", 29: "NC10", 30: "RXD0",
  31: "TXD0", 32: "NC11", 33: "NC12", 34: "NC13", 35: "NC14", 36: "GND5",
  37: "GND6", 38: "GND7", 39: "GND8", 40: "GND9", 41: "GND10", 42: "GND11",
  43: "GND12", 44: "GND13", 45: "GND14", 46: "GND15", 47: "GND16",
  48: "GND17", 49: "GND22", 50: "GND18", 51: "GND19", 52: "GND20",
  53: "GND21", 54: "GND23", 55: "GND24", 56: "GND25", 57: "GND26",
  58: "GND27", 59: "GND28", 60: "GND29", 61: "GND30",
}

const namedPinAttributes = (labels: Record<number, string>, required: Record<string, Record<string, string | boolean>>) => ({
  ...Object.fromEntries(Object.values(labels).map((label) => [label, {}])),
  ...required,
})

type PadProps = { pin: number; x: number; y: number; width?: string; height?: string }

const LocalPad = ({ pin, x, y, width = "0.9mm", height = "0.9mm" }: PadProps) => (
  <smtpad name={`PAD${pin}`} shape="rect" pcbX={x} pcbY={y} width={width} height={height} portHints={[`pin${pin}`]} />
)

const Local2Pad = ({ name, body = "0603", pitch = 1.6 }: { name: string; body?: string; pitch?: number }) => (
  <footprint name={`${name.toLowerCase()}-${body}-provisional`}>
    <LocalPad pin={1} x={-pitch / 2} y={0} />
    <LocalPad pin={2} x={pitch / 2} y={0} />
    <silkscreenrect pcbX={0} pcbY={0} width={body === "0603" ? "1.6mm" : "3mm"} height={body === "0603" ? "0.8mm" : "2mm"} filled={false} stroke="solid" strokeWidth="0.12mm" layer="top" />
  </footprint>
)

const RegulatorFootprint = () => (
  <footprint name="regulator-sot23-5-provisional">
    <LocalPad pin={1} x={-1.5} y={-1.2} /><LocalPad pin={2} x={-1.5} y={1.2} />
    <LocalPad pin={3} x={1.5} y={1.2} /><LocalPad pin={4} x={1.5} y={0} /><LocalPad pin={5} x={1.5} y={-1.2} />
    <silkscreenrect pcbX={0} pcbY={0} width="3.2mm" height="3.4mm" filled={false} stroke="solid" strokeWidth="0.12mm" layer="top" />
  </footprint>
)

const UsbPowerFootprint = () => (
  <footprint name="usb-c-power-debug-16-pad-provisional">
    {Array.from({ length: 12 }, (_, index) => <LocalPad key={`usb-${index + 1}`} pin={index + 1} x={-3.5 + (index % 6) * 1.4} y={index < 6 ? -2 : 2} width="0.8mm" height="1.2mm" />)}
    <LocalPad pin={13} x={-5.5} y={-2.5} width="1mm" height="1mm" /><LocalPad pin={14} x={5.5} y={-2.5} width="1mm" height="1mm" />
    <LocalPad pin={15} x={-5.5} y={2.5} width="1mm" height="1mm" /><LocalPad pin={16} x={5.5} y={2.5} width="1mm" height="1mm" />
    <silkscreenrect pcbX={0} pcbY={0} width="12mm" height="6mm" filled={false} stroke="solid" strokeWidth="0.15mm" layer="top" />
  </footprint>
)

const FlashFootprint = () => (
  <footprint name="qspi-flash-soic8-provisional">
    {Array.from({ length: 4 }, (_, index) => <LocalPad key={`flash-top-${index + 1}`} pin={index + 1} x={-2.7 + index * 1.8} y={-2.1} />)}
    {Array.from({ length: 4 }, (_, index) => <LocalPad key={`flash-bottom-${index + 5}`} pin={index + 5} x={2.7 - index * 1.8} y={2.1} />)}
    <silkscreenrect pcbX={0} pcbY={0} width="7.2mm" height="4.2mm" filled={false} stroke="solid" strokeWidth="0.12mm" layer="top" />
  </footprint>
)

const CrystalFootprint = () => (
  <footprint name="crystal-2pad-3225-provisional">
    <LocalPad pin={1} x={-1.25} y={0} /><LocalPad pin={2} x={1.25} y={0} />
    <silkscreenrect pcbX={0} pcbY={0} width="3.2mm" height="2.5mm" filled={false} stroke="solid" strokeWidth="0.12mm" layer="top" />
  </footprint>
)

const BuzzerFootprint = () => (
  <footprint name="active-buzzer-tmb12d03-12mm-provisional">
    <platedhole name="PAD1" shape="circle" holeDiameter="0.9mm" outerDiameter="1.8mm" pcbX={-3.75} pcbY={0} portHints={["pin1"]} />
    <platedhole name="PAD2" shape="circle" holeDiameter="0.9mm" outerDiameter="1.8mm" pcbX={3.75} pcbY={0} portHints={["pin2"]} />
    <silkscreenrect pcbX={0} pcbY={0} width="12mm" height="12mm" filled={false} stroke="solid" strokeWidth="0.18mm" layer="top" />
    <silkscreentext pcbX={0} pcbY={0} text="+ BZ" fontSize="0.8mm" layer="top" />
  </footprint>
)

const TransistorFootprint = () => (
  <footprint name="low-side-transistor-sot23-provisional">
    <LocalPad pin={1} x={-1.2} y={-0.95} /><LocalPad pin={2} x={-1.2} y={0.95} /><LocalPad pin={3} x={1.2} y={0} />
    <silkscreenrect pcbX={0} pcbY={0} width="2.4mm" height="2.4mm" filled={false} stroke="solid" strokeWidth="0.12mm" layer="top" />
  </footprint>
)

const Sensor = ({ name, x, y, pinMap, footprint }: { name: string; x: number; y: number; pinMap: Record<number, string>; footprint: string }) => (
  <chip name={name} footprint={footprint} pcbX={x} pcbY={y} pinLabels={pinMap}
    pinAttributes={namedPinAttributes(pinMap, { VDD: { requiresPower: true, requiresVoltage: "3.3V" }, AVDD: { requiresPower: true, requiresVoltage: "3.3V" }, GND: { requiresGround: true }, SDA: { activeCapability: "i2c_sda" }, SCL: { activeCapability: "i2c_scl" } })} />
)

const Controller = ({ name, x, y, wireless = false }: { name: string; x: number; y: number; wireless?: boolean }) => (
  <chip name={name} footprint={wireless ? "jlcpcb:C2838502" : "jlcpcb:C2040"} pcbX={x} pcbY={y} pcbRotation={0}
    pinLabels={wireless ? ESP32_C3_PIN_LABELS : RP2040_PIN_LABELS}
    pinAttributes={namedPinAttributes(wireless ? ESP32_C3_PIN_LABELS : RP2040_PIN_LABELS, wireless ? {
      "3V3": { providesPower: true, providesVoltage: "3.3V" }, GND1: { providesGround: true },
      IO4: { activeCapability: "i2c_sda" }, IO5: { activeCapability: "i2c_scl" },
    } : {
      IOVDD1: { providesPower: true, providesVoltage: "3.3V" }, GND: { providesGround: true },
      GPIO4_SDA: { activeCapability: "i2c_sda" }, GPIO5_SCL: { activeCapability: "i2c_scl" },
    })} />
)

const UsbInput = ({ x, y }: { x: number; y: number }) => (
  <chip name="J1_USB_C_POWER_DEBUG_PROVISIONAL" footprint={<UsbPowerFootprint />} pcbX={x} pcbY={y}
    pinLabels={{ 1: "VBUS", 2: "VBUS2", 3: "CC1", 4: "CC2", 5: "D+", 6: "D-", 7: "SBU1", 8: "SBU2", 9: "GND", 10: "GND2", 11: "GND3", 12: "GND4", 13: "SHIELD1", 14: "SHIELD2", 15: "SHIELD3", 16: "SHIELD4" }} />
)

const Passive = ({ name, x, y, value }: { name: string; x: number; y: number; value: string }) => <resistor name={name} resistance={value} footprint="0603" pcbX={x} pcbY={y} />
const Capacitor = ({ name, x, y, value = "100nF" }: { name: string; x: number; y: number; value?: string }) => <capacitor name={name} capacitance={value} footprint="0603" pcbX={x} pcbY={y} />
const Buzzer = () => <chip name="BZ1_TMB12D03_ACTIVE_3V_PROVISIONAL" footprint={<BuzzerFootprint />} pcbX={14} pcbY={8} pinLabels={{ 1: "POS", 2: "NEG" }} />

const SharedPowerAndClock = ({ wireless = false }: { wireless?: boolean }) => (
  <>
    <UsbInput x={-17.5} y={-8} />
    {!wireless && <>
      <chip name="U3_QSPI_FLASH_PROVISIONAL" footprint={<FlashFootprint />} pcbX={-1} pcbY={-11} pinLabels={{ 1: "CS", 2: "DO", 3: "WP", 4: "GND", 5: "DI", 6: "CLK", 7: "HOLD", 8: "VCC" }} />
      <chip name="Y1_12MHZ_CRYSTAL_PROVISIONAL" footprint={<CrystalFootprint />} pcbX={-1} pcbY={-6} pinLabels={{ 1: "XIN", 2: "XOUT" }} />
    </>}
    <chip name="U4_3V3_REGULATOR_PROVISIONAL" footprint={<RegulatorFootprint />} pcbX={-19} pcbY={4}
      pinLabels={{ 1: "VIN", 2: "GND", 3: "EN", 4: "VOUT", 5: "NC" }}
      pinAttributes={{ VIN: { requiresPower: true, requiresVoltage: "5V" }, GND: { requiresGround: true }, VOUT: { providesPower: true, providesVoltage: "3.3V" } }} />
    <Capacitor name="C1_VBUS_BYPASS" x={-10} y={-8} value="4.7uF" /><Capacitor name="C2_3V3_BYPASS" x={-7} y={-8} />
    <Passive name="R1_RUN_PULLUP" x={5} y={-13} value="10k" /><Passive name="R2_XSHUT_PULLUP" x={8} y={-13} value="10k" />
    <Passive name="R3_SDA_PULLUP" x={11} y={-13} value="4.7k" /><Passive name="R4_SCL_PULLUP" x={14} y={-13} value="4.7k" />
  </>
)

const Rp2040Connections = () => <pcbnotetext pcbX={0} pcbY={0} text="POWER / I2C ROUTING BLOCKED FOR PIN-LEVEL REVIEW" fontSize="0.55mm" />

const Rp2040SupportConnections = () => <pcbnotetext pcbX={0} pcbY={-1} text="USB / QSPI / CLOCK ROUTING PENDING" fontSize="0.55mm" />

const AccessAndMechanics = ({ title, controllerX, sensorX, wireless = false }: { title: string; controllerX: number; sensorX: number; wireless?: boolean }) => (
  <>
    <silkscreentext pcbX={0} pcbY={-14.3} text={title} fontSize="0.7mm" layer="top" />
    <silkscreentext pcbX={-18} pcbY={-14.3} text="USB POWER / DEBUG" fontSize="0.55mm" layer="top" />
    <silkscreentext pcbX={-9} pcbY={14.2} text={wireless ? "USB POWER ONLY · BLE/WI-FI" : "USB DATA · BOOT · RESET"} fontSize="0.65mm" layer="top" />
    <silkscreentext pcbX={sensorX} pcbY={-7.5} text="OPTICAL PATH" fontSize="0.6mm" layer="top" />
    <silkscreenrect pcbX={controllerX} pcbY={0} width={wireless ? "16mm" : "9mm"} height={wireless ? "12mm" : "9mm"} filled={false} stroke="solid" strokeWidth="0.2mm" layer="top" />
    <silkscreenrect pcbX={sensorX} pcbY={3} width="4mm" height="4mm" filled={false} stroke="solid" strokeWidth="0.2mm" layer="top" />
    <keepout shape="circle" pcbX={sensorX} pcbY={3} radius="2mm" layers={["top", "bottom"]} excludeRefs={[".U2_VL53L0X_C2929940", ".U2_TOF_SENSOR_SHARED_CONTRACT"]} />
    {wireless && <keepout shape="rect" pcbX={controllerX + 8} pcbY={0} width="8mm" height="16mm" layers={["top", "bottom"]} excludeRefs={[".U1_ESP32_C3_MINI_1_N4_C2838502"]} />}
    <hole name="H1" pcbX={-21} pcbY={-13.5} diameter="3.2mm" /><hole name="H2" pcbX={21} pcbY={-13.5} diameter="3.2mm" />
    <hole name="H3" pcbX={-21} pcbY={13.5} diameter="3.2mm" /><hole name="H4" pcbX={21} pcbY={13.5} diameter="3.2mm" />
  </>
)

const BaseBoard = ({ name, title, children }: { name: string; title: string; children: React.ReactNode }) => (
  <board name={name} title={title} width="48mm" height="32mm" thickness="1.6mm" layers={2} solderMaskColor="black" minTraceWidth="0.2mm" nominalTraceWidth="0.25mm" schSheetName="Main" pcbX={0} pcbY={0}>
    <schematicsheet name="Main" displayName={title} sheetSize="A4" />{children}
  </board>
)

export const variantA = () => BaseBoard({ name: "E003_VARIANT_A_RECEIVED_MODULES_REFERENCE", title: "E003 Variant A reference — received modules", children: <silkscreentext pcbX={0} pcbY={0} text="A IS REVIEWED IN carrier.tsx" fontSize="1mm" layer="top" /> })

export const variantB = () => BaseBoard({ name: "E003_VARIANT_B_JLC_CHIP_DOWN", title: "E003 Variant B — complete JLCPCB chip-down candidate", children: <>
  <Controller name="U1_RP2040_C2040" x={-3} y={3} /><Sensor name="U2_VL53L0X_C2929940" footprint="jlcpcb:C2929940" pinMap={VL53L0X_PIN_LABELS} x={14} y={3} />
  <SharedPowerAndClock /><Rp2040Connections /><Rp2040SupportConnections />
  <AccessAndMechanics title="B · RP2040 + VL53L0X · JLC CHIP-DOWN" controllerX={-3} sensorX={14} />
</> })

export const variantC = () => BaseBoard({ name: "E003_VARIANT_C_JLC_FEEDBACK", title: "E003 Variant C — chip-down plus vibration and buzzer", children: <>
  <Controller name="U1_RP2040_C2040" x={-3} y={3} /><Sensor name="U2_VL53L0X_C2929940" footprint="jlcpcb:C2929940" pinMap={VL53L0X_PIN_LABELS} x={14} y={3} />
  <chip name="U5_LIS2DW12TR_C189624" footprint="jlcpcb:C189624" pcbX={4} pcbY={-10} pinLabels={LIS2DW12_PIN_LABELS}
    pinAttributes={{ VDD: { requiresPower: true, requiresVoltage: "3.3V" }, VDDIO: { requiresPower: true, requiresVoltage: "3.3V" }, GND: { requiresGround: true }, INT1: {} }} />
  <Buzzer /><chip name="Q1_BUZZER_LOW_SIDE_DRIVER_PROVISIONAL" footprint={<TransistorFootprint />} pcbX={8} pcbY={-8} pinLabels={{ 1: "GATE", 2: "SOURCE", 3: "DRAIN" }} /><Passive name="R5_BUZZER_GATE" x={12} y={-8} value="1k" />
  <SharedPowerAndClock /><Rp2040Connections /><Rp2040SupportConnections />
  <pcbnotetext pcbX={5} pcbY={-5} text="VIB_INT · 3V3 · GND · BUZZER_DRV ROUTING PENDING" fontSize="0.55mm" />
  <AccessAndMechanics title="C · CHIP-DOWN + LIS2DW12TR + BUZZER" controllerX={-3} sensorX={14} />
</> })

export const variantD = () => BaseBoard({ name: "E003_VARIANT_D_ESP32_WIRELESS", title: "E003 Variant D — ESP32-C3 wireless candidate", children: <>
  <Controller name="U1_ESP32_C3_MINI_1_N4_C2838502" x={-4.5} y={0} wireless /><Sensor name="U2_VL53L0X_C2929940" footprint="jlcpcb:C2929940" pinMap={VL53L0X_PIN_LABELS} x={14} y={3} />
  <chip name="U3_LIS2DW12TR_C189624" footprint="jlcpcb:C189624" pcbX={7} pcbY={-10} pinLabels={LIS2DW12_PIN_LABELS}
    pinAttributes={{ VDD: { requiresPower: true, requiresVoltage: "3.3V" }, VDDIO: { requiresPower: true, requiresVoltage: "3.3V" }, GND: { requiresGround: true }, INT1: {} }} />
  <SharedPowerAndClock wireless /><Rp2040Connections /><Rp2040SupportConnections />
  <pcbnotetext pcbX={5} pcbY={-5} text="WIRELESS SENSOR / 3V3 ROUTING PENDING" fontSize="0.55mm" />
  <AccessAndMechanics title="D · ESP32-C3 · USB POWER ONLY · BLE/WI-FI" controllerX={-4.5} sensorX={14} wireless />
</> })
