import React from "react"

/**
 * E003 carrier-board candidate.
 *
 * This source deliberately models the modules as review placeholders until
 * E003-T01 records the exact received-board dimensions and pad map. The
 * electrical nets are the proposed 3V3/GND/SDA/SCL interface only; this file
 * must not be used to order a board until the evidence and review gates pass.
 */
export default () => (
  <board name="E003-Carrier" width="48mm" height="32mm" pcbX={0} pcbY={0}>
    {/* RP2040-Zero placeholder: replace with measured footprint after T01. */}
    <chip
      name="U1_RP2040_ZERO_PENDING_FOOTPRINT"
      footprint="pinrow4_p2.54mm"
      pcbX={-12}
      pcbY={0}
      pinLabels={{ 1: "3V3", 2: "GND", 3: "GP4_SDA", 4: "GP5_SCL" }}
    />

    {/* VL53LDK-marked GY-530-style breakout placeholder: exact labels and pitch are unresolved. */}
    <chip
      name="U2_VL53LDK_BLUE_PENDING_FOOTPRINT"
      footprint="pinrow4_p2.54mm"
      pcbX={12}
      pcbY={0}
      pinLabels={{
        1: "VIN_OR_3V3_PENDING",
        2: "GND",
        3: "SCL",
        4: "SDA",
      }}
    />

    {/* Named nets document the intended carrier interface for review. */}
    <trace name="NET_3V3_PENDING" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .3V3" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .VIN_OR_3V3_PENDING" />
    <trace name="NET_GND" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GND" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .GND" />
    <trace name="NET_I2C0_SDA" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP4_SDA" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .SDA" />
    <trace name="NET_I2C0_SCL" from=".U1_RP2040_ZERO_PENDING_FOOTPRINT > .GP5_SCL" to=".U2_VL53LDK_BLUE_PENDING_FOOTPRINT > .SCL" />

    {/* Four mechanical mounting holes; coordinates are a review assumption. */}
    <hole name="H1" pcbX={-20} pcbY={-12} diameter="3.2mm" />
    <hole name="H2" pcbX={20} pcbY={-12} diameter="3.2mm" />
    <hole name="H3" pcbX={-20} pcbY={12} diameter="3.2mm" />
    <hole name="H4" pcbX={20} pcbY={12} diameter="3.2mm" />
  </board>
)
