import React from "react"

/** Provisional module interfaces; neither placeholder is fabrication-ready. */
const ModuleInterfaces = () => (
  <>
    <chip
      name="U1_RP2040_ZERO_PENDING_FOOTPRINT"
      footprint="pinrow4_p2.54mm"
      pcbX={-12}
      pcbY={0}
      pinLabels={{ 1: "3V3", 2: "GND", 3: "GP4_SDA", 4: "GP5_SCL" }}
      pinAttributes={{
        "3V3": { providesPower: true, providesVoltage: "3.3V", mustBeConnected: true },
        GND: { providesGround: true, mustBeConnected: true },
        GP4_SDA: { activeCapability: "i2c_sda", mustBeConnected: true },
        GP5_SCL: { activeCapability: "i2c_scl", mustBeConnected: true },
      }}
    />
    <chip
      name="U2_VL53LDK_BLUE_PENDING_FOOTPRINT"
      footprint="pinrow4_p2.54mm"
      pcbX={12}
      pcbY={0}
      pinLabels={{ 1: "VIN_OR_3V3_PENDING", 2: "GND", 3: "SCL", 4: "SDA" }}
      pinAttributes={{
        VIN_OR_3V3_PENDING: { requiresPower: true, requiresVoltage: "3.3V", mustBeConnected: true },
        GND: { requiresGround: true, mustBeConnected: true },
        SCL: { activeCapability: "i2c_scl", mustBeConnected: true },
        SDA: { activeCapability: "i2c_sda", mustBeConnected: true },
      }}
    />
  </>
)

const ModuleNets = () => (
  <>
    <trace name="NET_3V3_PENDING" width="0.4mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .3V3" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .VIN_OR_3V3_PENDING" />
    <trace name="NET_GND" width="0.4mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GND" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .GND" />
    <trace name="NET_I2C0_SDA" width="0.25mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP4_SDA" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .SDA" />
    <trace name="NET_I2C0_SCL" width="0.25mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP5_SCL" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .SCL" />
  </>
)

const ReviewAccess = () => (
  <>
    <testpoint name="TP1_3V3" footprintVariant="pad" padDiameter="1.5mm" pcbX={-3} pcbY={9} />
    <testpoint name="TP2_GND" footprintVariant="pad" padDiameter="1.5mm" pcbX={-1} pcbY={9} />
    <testpoint name="TP3_SDA" footprintVariant="pad" padDiameter="1.5mm" pcbX={1} pcbY={9} />
    <testpoint name="TP4_SCL" footprintVariant="pad" padDiameter="1.5mm" pcbX={3} pcbY={9} />
    <trace name="NET_TP_3V3" width="0.4mm" from=".TP1_3V3 > .pin1" to=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .3V3" />
    <trace name="NET_TP_GND" width="0.4mm" from=".TP2_GND > .pin1" to=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GND" />
    <trace name="NET_TP_SDA" width="0.25mm" from=".TP3_SDA > .pin1" to=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP4_SDA" />
    <trace name="NET_TP_SCL" width="0.25mm" from=".TP4_SCL > .pin1" to=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP5_SCL" />
  </>
)

const MechanicalConstraints = () => (
  <>
    <pcbnoterect pcbX={-12} pcbY={0} width="18mm" height="23.5mm" isFilled={false} color="#60a5fa" />
    <pcbnotetext pcbX={-12} pcbY={-13} text="RP2040-Zero 18x23.5 PROVISIONAL" fontSize="0.8mm" />
    <pcbnoterect pcbX={12} pcbY={0} width="10.5mm" height="13.3mm" isFilled={false} color="#22c55e" />
    <pcbnotetext pcbX={12} pcbY={-8} text="ToF 10.5x13.3 PROVISIONAL" fontSize="0.8mm" />
    <keepout shape="rect" pcbX={-12} pcbY={13.25} width="12mm" height="5mm" layers={["top", "bottom"]} excludeRefs={[".U1_RP2040_ZERO_PENDING_FOOTPRINT"]} />
    <keepout shape="circle" pcbX={12} pcbY={4.5} radius="2.5mm" layers={["top", "bottom"]} excludeRefs={[".U2_VL53LDK_BLUE_PENDING_FOOTPRINT"]} />
    <pcbnotetext pcbX={-12} pcbY={14} text="USB-C ACCESS" fontSize="0.8mm" />
    <pcbnotetext pcbX={12} pcbY={4.5} text="OPTICAL PATH" fontSize="0.7mm" />
    <hole name="H1" pcbX={-20} pcbY={-12} diameter="3.2mm" />
    <hole name="H2" pcbX={20} pcbY={-12} diameter="3.2mm" />
    <hole name="H3" pcbX={-20} pcbY={12} diameter="3.2mm" />
    <hole name="H4" pcbX={20} pcbY={12} diameter="3.2mm" />
  </>
)

/** Owner-accepted provisional candidate; external review remains mandatory. */
export default () => (
  <board
    name="E003_CARRIER_VARIANT_A_PROVISIONAL"
    title="Open Smart Desk Hardware v2 — Variant A"
    width="48mm"
    height="32mm"
    thickness="1.6mm"
    layers={2}
    solderMaskColor="black"
    minTraceWidth="0.2mm"
    nominalTraceWidth="0.25mm"
    schSheetName="Main"
    pcbX={0}
    pcbY={0}
  >
    <schematicsheet name="Main" displayName="Variant A interface" sheetSize="A4" />
    <ModuleInterfaces />
    <ModuleNets />
    <ReviewAccess />
    <MechanicalConstraints />
  </board>
)
