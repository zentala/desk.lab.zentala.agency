import React from "react"

type VariantOptions = {
  name: string
  title: string
  controller: string
  controllerFootprint: string
  sensor: string
  sensorFootprint: string
  wireless?: boolean
  accelerometer?: boolean
  buzzer?: boolean
}

const Interface = ({ options }: { options: VariantOptions }) => (
  <>
    <chip name={options.controller} footprint={options.controllerFootprint} pcbX={-12} pcbY={0}
      pinLabels={{ 1: "3V3", 2: "GND", 3: "SDA", 4: "SCL" }}
      pinAttributes={{ "3V3": { providesPower: true, mustBeConnected: true }, GND: { providesGround: true, mustBeConnected: true }, SDA: { activeCapability: "i2c_sda", mustBeConnected: true }, SCL: { activeCapability: "i2c_scl", mustBeConnected: true } }} />
    <chip name={options.sensor} footprint={options.sensorFootprint} pcbX={12} pcbY={0}
      pinLabels={{ 1: "VDD", 2: "GND", 3: "SCL", 4: "SDA" }}
      pinAttributes={{ VDD: { requiresPower: true, mustBeConnected: true }, GND: { requiresGround: true, mustBeConnected: true }, SDA: { activeCapability: "i2c_sda", mustBeConnected: true }, SCL: { activeCapability: "i2c_scl", mustBeConnected: true } }} />
  </>
)

const SharedNets = ({ controller, sensor }: { controller: string; sensor: string }) => (
  <>
    <trace name="NET_3V3" width="0.4mm" from={`.${controller} > .3V3`} to={`.${sensor} > .VDD`} />
    <trace name="NET_GND" width="0.4mm" from={`.${controller} > .GND`} to={`.${sensor} > .GND`} />
    <trace name="NET_SDA" width="0.25mm" from={`.${controller} > .SDA`} to={`.${sensor} > .SDA`} />
    <trace name="NET_SCL" width="0.25mm" from={`.${controller} > .SCL`} to={`.${sensor} > .SCL`} />
  </>
)

const Extras = ({ accelerometer, buzzer, wireless }: Pick<VariantOptions, "accelerometer" | "buzzer" | "wireless">) => (
  <>
    {accelerometer && <>
      <pcbnotetext pcbX={0} pcbY={-9} text="U3 LIS2DW12TR / VIB_INT" fontSize="0.8mm" />
      <testpoint name="TP5_VIB_INT" footprintVariant="pad" padDiameter="1.5mm" pcbX={4} pcbY={-9} />
    </>}
    {buzzer && <>
      <pcbnotetext pcbX={0} pcbY={9} text="BZ1 ACTIVE 3V / Q1 DRIVER" fontSize="0.8mm" />
      <testpoint name="TP6_BUZZER_DRV" footprintVariant="pad" padDiameter="1.5mm" pcbX={4} pcbY={9} />
    </>}
    {wireless && <pcbnotetext pcbX={0} pcbY={-14} text="USB POWER ONLY — BLE/Wi-Fi DATA" fontSize="0.8mm" />}
  </>
)

const Candidate = (options: VariantOptions) => (
  <board name={options.name} title={options.title} width="48mm" height="32mm" thickness="1.6mm"
    layers={2} solderMaskColor="black" minTraceWidth="0.2mm" nominalTraceWidth="0.25mm"
    schSheetName="Main" pcbX={0} pcbY={0}>
    <schematicsheet name="Main" displayName={options.title} sheetSize="A4" />
    <Interface options={options} />
    <SharedNets controller={options.controller} sensor={options.sensor} />
    <Extras accelerometer={options.accelerometer} buzzer={options.buzzer} wireless={options.wireless} />
    <keepout shape="circle" pcbX={12} pcbY={4.5} radius="2.5mm" layers={["top", "bottom"]} excludeRefs={[`.${options.sensor}`]} />
    <hole name="H1" pcbX={-20} pcbY={-12} diameter="3.2mm" />
    <hole name="H2" pcbX={20} pcbY={-12} diameter="3.2mm" />
    <hole name="H3" pcbX={-20} pcbY={12} diameter="3.2mm" />
    <hole name="H4" pcbX={20} pcbY={12} diameter="3.2mm" />
  </board>
)

export const variantA = () => Candidate({
  name: "E003_VARIANT_A_RECEIVED_MODULES",
  title: "E003 Variant A — RP2040-Zero + received ToF breakout",
  controller: "U1_RP2040_ZERO",
  controllerFootprint: "pinrow4_p2.54mm",
  sensor: "U2_RECEIVED_VL53LDK_BREAKOUT",
  sensorFootprint: "pinrow4_p2.54mm",
})

export const variantB = () => Candidate({
  name: "E003_VARIANT_B_JLC_CHIP_DOWN",
  title: "E003 Variant B — JLCPCB chip-down candidate",
  controller: "U1_RP2040_C2040",
  controllerFootprint: "pinrow4_p2.54mm",
  sensor: "U2_VL53L0X_C2929940",
  sensorFootprint: "pinrow4_p2.54mm",
})

export const variantC = () => Candidate({
  name: "E003_VARIANT_C_JLC_FEEDBACK",
  title: "E003 Variant C — chip-down + vibration + buzzer",
  controller: "U1_RP2040_C2040",
  controllerFootprint: "pinrow4_p2.54mm",
  sensor: "U2_VL53L0X_C2929940",
  sensorFootprint: "pinrow4_p2.54mm",
  accelerometer: true,
  buzzer: true,
})

export const variantD = () => Candidate({
  name: "E003_VARIANT_D_ESP32_WIRELESS",
  title: "E003 Variant D — ESP32-C3 wireless candidate",
  controller: "U1_ESP32_C3_MINI_1_N4_C2838502",
  controllerFootprint: "pinrow4_p2.54mm",
  sensor: "U2_TOF_SENSOR_SHARED_CONTRACT",
  sensorFootprint: "pinrow4_p2.54mm",
  wireless: true,
  accelerometer: true,
})
