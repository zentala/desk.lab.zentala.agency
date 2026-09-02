import React from "react"

// Visual comparison only: these are catalogue chip footprints, not received
// RP2040-Zero / GY-530 modules and not a fabrication candidate.
export const libraryPreview = () => (
  <board
    name="E003_LIBRARY_COMPONENT_PREVIEW"
    title="E003 library component preview — RP2040 C2040 + VL53L0X C2929940"
    width="42mm"
    height="28mm"
    thickness="1.6mm"
    layers={2}
    solderMaskColor="black"
    routingDisabled={true}
    schSheetName="Library preview"
    pcbX={0}
    pcbY={0}
  >
    <schematicsheet name="Library preview" displayName="Library component preview" sheetSize="A4" />
    <chip name="U1_RP2040_C2040_LIBRARY" footprint="jlcpcb:C2040" pcbX={-8} pcbY={0} />
    <chip name="U2_VL53L0X_C2929940_LIBRARY" footprint="jlcpcb:C2929940" pcbX={10} pcbY={0} />
    <silkscreentext pcbX={-8} pcbY={-11} text="RP2040 C2040 · LIBRARY" fontSize="0.8mm" layer="top" />
    <silkscreentext pcbX={10} pcbY={-7} text="VL53L0X C2929940 · LGA-12" fontSize="0.7mm" layer="top" />
    <silkscreentext pcbX={10} pcbY={7} text="BARE CHIPS — NOT MODULES" fontSize="0.7mm" layer="top" />
    <hole name="H1" pcbX={-18} pcbY={-11} diameter="3.2mm" />
    <hole name="H2" pcbX={18} pcbY={-11} diameter="3.2mm" />
    <hole name="H3" pcbX={-18} pcbY={11} diameter="3.2mm" />
    <hole name="H4" pcbX={18} pcbY={11} diameter="3.2mm" />
  </board>
)

export default libraryPreview
