import React from "react"

const RP2040_ZERO_PINS = [
  "GPIO0", "GPIO1", "GPIO2", "GPIO3", "GP4_SDA", "GP5_SCL",
  "GPIO6", "GPIO7", "GPIO8", "GPIO9", "GPIO10", "GPIO11", "GPIO12",
  "GPIO13", "GPIO14", "GPIO15", "GPIO26", "GPIO27", "GPIO28", "GPIO29",
  "3V3", "GND", "VSYS",
] as const

const RP2040_ZERO_PAD_POSITIONS = [
  ...Array.from({ length: 9 }, (_, index) => ({ pin: index + 1, x: 7.62, y: 10.16 - index * 2.54 })),
  ...Array.from({ length: 6 }, (_, index) => ({ pin: index + 10, x: 5.08 - index * 2.54, y: -10.16 })),
  ...Array.from({ length: 8 }, (_, index) => ({ pin: index + 16, x: -7.62, y: -7.62 + index * 2.54 })),
]

const RP2040ZeroFootprint = () => (
  <footprint name="rp2040-zero-received-23-pad">
    {RP2040_ZERO_PAD_POSITIONS.map(({ pin, x, y }) => (
      <React.Fragment key={`rp2040-pad-${pin}`}><platedhole name={`PAD${pin}`} shape="circle"
        holeDiameter="0.8mm" outerDiameter="1.8mm" pcbX={x} pcbY={y}
        portHints={[`pin${pin}`]} /></React.Fragment>
    ))}
  </footprint>
)

const TOF_PAD_POSITIONS = [
  { pin: 1, x: -3.81, y: -6.0 },
  { pin: 2, x: -1.27, y: -6.0 },
  { pin: 3, x: 1.27, y: -6.0 },
  { pin: 4, x: 3.81, y: -6.0 },
]

// The received board shows two opposite-edge plated vias marked X/e. They are
// not module pins and must not become carrier-board holes or routed nets.
const TOF_AUX_VIA_POSITIONS = [
  { x: -1.27, y: 5.55 },
  { x: 1.27, y: 5.55 },
]

const TofBreakoutFootprint = () => (
  <footprint name="tof-breakout-received-4-pin-plus-aux-vias">
    {TOF_PAD_POSITIONS.map(({ pin, x, y }) => (
      <React.Fragment key={`tof-pad-${pin}`}><platedhole name={`PAD${pin}`} shape="circle"
        holeDiameter="0.8mm" outerDiameter="1.6mm" pcbX={x} pcbY={y}
        portHints={[`pin${pin}`]} /></React.Fragment>
    ))}
    {TOF_AUX_VIA_POSITIONS.map(({ x, y }, index) => (
      <React.Fragment key={`tof-aux-via-${index}`}>
        <silkscreenrect pcbX={x} pcbY={y} width="0.8mm" height="0.8mm"
          filled={false} stroke="solid" strokeWidth="0.15mm" layer="top" />
      </React.Fragment>
    ))}
  </footprint>
)

/** Variant A uses explicit received-module geometry; measurements remain provisional. */
const ModuleInterfaces = () => (
  <>
    <chip
      name="U1_RP2040_ZERO_PENDING_FOOTPRINT"
      footprint={<RP2040ZeroFootprint />}
      pcbX={-12}
      pcbY={0}
      pinLabels={Object.fromEntries(RP2040_ZERO_PINS.map((label, index) => [index + 1, label]))}
      pinAttributes={{
        "3V3": { providesPower: true, providesVoltage: "3.3V", mustBeConnected: true },
        GND: { providesGround: true, mustBeConnected: true },
        GP4_SDA: { activeCapability: "i2c_sda", mustBeConnected: true },
        GP5_SCL: { activeCapability: "i2c_scl", mustBeConnected: true },
      }}
    />
    <chip
      name="U2_GY530_STYLE_TOF_FOUR_PIN_INTERFACE"
      footprint={<TofBreakoutFootprint />}
      pcbX={10.5}
      pcbY={0}
      pinLabels={{ 1: "VIN", 2: "GND", 3: "SCL", 4: "SDA" }}
      pinAttributes={{
        VIN: { requiresPower: true, requiresVoltage: "3.3V", mustBeConnected: true },
        GND: { requiresGround: true, mustBeConnected: true },
        SCL: { activeCapability: "i2c_scl", mustBeConnected: true },
        SDA: { activeCapability: "i2c_sda", mustBeConnected: true },
      }}
    />
  </>
)

const ModuleNets = () => (
  <>
    <trace name="NET_3V3_PENDING" width="0.4mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .3V3" to=".U2_GY530_STYLE_TOF_FOUR_PIN_INTERFACE > .VIN" pcbPath={[{ x: -10, y: 5.08 }, { x: -10, y: -12.7 }, { x: 18.69, y: -12.7 }]} />
    <trace name="NET_GND" width="0.4mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GND" to=".U2_GY530_STYLE_TOF_FOUR_PIN_INTERFACE > .GND" pcbPath={[{ x: -11, y: 7.62 }, { x: -11, y: -14 }, { x: 21.23, y: -14 }]} />
    <trace name="NET_I2C0_SDA" width="0.25mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP4_SDA" to=".U2_GY530_STYLE_TOF_FOUR_PIN_INTERFACE > .SDA" pcbPath={[{ x: -2, y: 0 }, { x: 26.31, y: 0 }]} />
    <trace name="NET_I2C0_SCL" width="0.25mm" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP5_SCL" to=".U2_GY530_STYLE_TOF_FOUR_PIN_INTERFACE > .SCL" pcbPath={[{ x: 0, y: -2.54 }, { x: 0, y: -1.3 }, { x: 23.77, y: -1.3 }]} />
  </>
)

const ReviewAccess = () => (
  <>
    <silkscreentext pcbX={10.5} pcbY={-8.2} text="AUX VIAS — NO CONNECTION" fontSize="0.65mm" layer="top" />
  </>
)

const MechanicalConstraints = () => (
  <>
    <silkscreenrect pcbX={-12} pcbY={0} width="18mm" height="23.5mm" filled={false} stroke="solid" strokeWidth="0.3mm" layer="top" />
    <silkscreentext pcbX={-12} pcbY={-13.2} text="RP2040-ZERO 18 x 23.5 mm" fontSize="0.8mm" layer="top" />
    <silkscreenrect pcbX={10.5} pcbY={0} width="10.5mm" height="13.3mm" filled={false} stroke="solid" strokeWidth="0.3mm" layer="top" />
    <silkscreentext pcbX={10.5} pcbY={-7.8} text="TOF 10.5 x 13.3 mm" fontSize="0.8mm" layer="top" />
    <keepout shape="rect" pcbX={-12} pcbY={13.25} width="12mm" height="5mm" layers={["top", "bottom"]} excludeRefs={[".U1_RP2040_ZERO_PENDING_FOOTPRINT"]} />
    <keepout shape="circle" pcbX={11.8} pcbY={2.8} radius="2.0mm" layers={["top", "bottom"]}
      excludeRefs={[".U2_GY530_STYLE_TOF_FOUR_PIN_INTERFACE"]} />
    <hole name="U2_TOF_BREAKOUT_MOUNT" pcbX={6.8} pcbY={4.7} diameter="3.0mm" />
    <silkscreentext pcbX={-12} pcbY={14} text="USB-C ACCESS" fontSize="0.8mm" layer="top" />
    <silkscreentext pcbX={11.8} pcbY={2.8} text="OPTICAL PATH" fontSize="0.7mm" layer="top" />
    <hole name="H1" pcbX={-23} pcbY={-16} diameter="3.2mm" />
    <hole name="H2" pcbX={23} pcbY={-16} diameter="3.2mm" />
    <hole name="H3" pcbX={-23} pcbY={16} diameter="3.2mm" />
    <hole name="H4" pcbX={23} pcbY={16} diameter="3.2mm" />
  </>
)

/** Owner-accepted provisional candidate; external review remains mandatory. */
export default () => (
  <board
    name="E003_CARRIER_VARIANT_A_PROVISIONAL"
    title="Open Smart Desk Hardware v2 — Variant A"
    width="52mm"
    height="38mm"
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
