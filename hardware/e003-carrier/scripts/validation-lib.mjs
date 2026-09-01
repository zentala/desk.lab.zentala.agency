const REQUIRED_FUNCTIONS = ["power", "ground", "SDA", "SCL"]
const MODULES = {
  "rp2040-zero": "U1_RP2040_ZERO_PENDING_FOOTPRINT",
  "vl53ldk-breakout": "U2_VL53LDK_BLUE_PENDING_FOOTPRINT",
}
const NETS = {
  power: "NET_3V3_PENDING",
  ground: "NET_GND",
  SDA: "NET_I2C0_SDA",
  SCL: "NET_I2C0_SCL",
}

function sourceBlock(source, startMarker) {
  const start = source.indexOf(startMarker)
  const end = source.indexOf("/>", start)
  if (start < 0 || end < 0) throw new Error(`Missing source block: ${startMarker}`)
  return source.slice(start, end)
}

function validateModule(rows, source, moduleId, marker) {
  const moduleRows = rows.filter((row) => row.moduleId === moduleId)
  const functions = moduleRows.map((row) => row.function)
  const pins = moduleRows.map((row) => row.placeholderPin)
  for (const fn of REQUIRED_FUNCTIONS) {
    if (functions.filter((value) => value === fn).length !== 1) {
      throw new Error(`${moduleId} must define exactly one ${fn} row`)
    }
  }
  const allowedPins = moduleId === "vl53ldk-breakout" ? [1, 2, 3, 4, 5, 6] : [5, 6, 21, 22]
  if (new Set(pins).size !== allowedPins.length || !pins.every((pin) => allowedPins.includes(pin))) {
    throw new Error(`${moduleId} must map unique placeholder pins ${allowedPins.join("-")}`)
  }
  const block = sourceBlock(source, `name="${marker}"`)
  for (const row of moduleRows) {
    const represented = moduleId === "rp2040-zero"
      ? source.includes(`"${row.sourceLabel}"`)
      : source.includes(`${row.placeholderPin}: "${row.sourceLabel}"`)
    if (!represented) throw new Error(`${moduleId} pin ${row.placeholderPin} must be ${row.sourceLabel}`)
  }
}

function validateAuxiliaryPads(rows, source) {
  for (const row of rows.filter((item) => item.function === "auxiliary")) {
    if (row.moduleId !== "vl53ldk-breakout" || row.status !== "unresolved") {
      throw new Error("ToF auxiliary X/E pads must remain unresolved")
    }
    const block = sourceBlock(source, 'name="U2_VL53LDK_BLUE_PENDING_FOOTPRINT"')
    if (!source.includes(`${row.placeholderPin}: "${row.sourceLabel}"`)) {
      throw new Error(`ToF auxiliary pad ${row.sourceLabel} is missing from the source`)
    }
  }
}

function validateNets(rows, source) {
  for (const fn of REQUIRED_FUNCTIONS) {
    const trace = sourceBlock(source, `<trace name="${NETS[fn]}"`)
    for (const row of rows.filter((item) => item.function === fn)) {
      if (!trace.includes(`> .${row.sourceLabel}"`)) {
        throw new Error(`${NETS[fn]} must connect ${row.moduleId}.${row.sourceLabel}`)
      }
    }
  }
}

export function validateContract(rows, source) {
  if (!Array.isArray(rows)) throw new Error("Pin truth table must be an array")
  const unknown = rows.filter((row) => !MODULES[row.moduleId])
  if (unknown.length) throw new Error(`Unknown moduleId: ${unknown[0].moduleId}`)
  for (const [moduleId, marker] of Object.entries(MODULES)) {
    validateModule(rows, source, moduleId, marker)
  }
  validateAuxiliaryPads(rows, source)
  validateNets(rows, source)
}

export function validateAssumptions(assumptions) {
  if (assumptions.status !== "owner-accepted-provisional") {
    throw new Error("Design assumptions must remain owner-accepted-provisional")
  }
  if (assumptions.fabricationAllowed !== false) {
    throw new Error("Design assumptions must keep fabrication blocked")
  }
  const { carrier, modules } = assumptions
  if (carrier.widthMm !== 52 || carrier.heightMm !== 38 || carrier.thicknessMm !== 1.6) {
    throw new Error("Carrier geometry drifted from the accepted provisional contract")
  }
  if (modules.rp2040Zero.interfacePitchMm !== 2.54 || modules.tofBreakout.interfacePitchMm !== 2.54) {
    throw new Error("Both provisional module interfaces must retain 2.54 mm pitch")
  }
}

function validateSchematicSheet(circuit) {
  const sheets = circuit.filter((item) => item.type === "schematic_sheet")
  if (sheets.length !== 1) throw new Error("Candidate must contain one schematic sheet")
  const sheetId = sheets[0].schematic_sheet_id
  for (const type of ["schematic_component", "schematic_trace"]) {
    const items = circuit.filter((item) => item.type === type)
    if (items.length === 0 || items.some((item) => item.schematic_sheet_id !== sheetId)) {
      throw new Error(`Every ${type} must be assigned to the candidate schematic sheet`)
    }
  }
}

export function validateCandidateStructure(circuit, assumptions) {
  const board = circuit.find((item) => item.type === "pcb_board")
  const expected = assumptions.carrier
  if (!board || board.width !== expected.widthMm || board.height !== expected.heightMm) {
    throw new Error("Rendered board dimensions do not match design assumptions")
  }
  if (board.thickness !== expected.thicknessMm || board.num_layers !== expected.layers) {
    throw new Error("Rendered board stack does not match design assumptions")
  }
  const sourceComponents = circuit.filter((item) => item.type === "source_component")
  const moduleNames = sourceComponents.map((item) => item.name)
  for (const name of ["U1_RP2040_ZERO_PENDING_FOOTPRINT", "U2_VL53LDK_BLUE_PENDING_FOOTPRINT"]) {
    if (!moduleNames.includes(name)) throw new Error(`Missing received module: ${name}`)
  }
  const pcbComponents = new Map(circuit
    .filter((item) => item.type === "pcb_component")
    .map((item) => [item.pcb_component_id, item.source_component_id]))
  const sourceNames = new Map(sourceComponents.map((item) => [item.source_component_id, item.name]))
  const plated = circuit.filter((item) => item.type === "pcb_plated_hole")
  const u1 = plated.filter((item) => sourceNames.get(pcbComponents.get(item.pcb_component_id)) === "U1_RP2040_ZERO_PENDING_FOOTPRINT")
  const u2 = plated.filter((item) => sourceNames.get(pcbComponents.get(item.pcb_component_id)) === "U2_VL53LDK_BLUE_PENDING_FOOTPRINT")
  if (u1.length !== 23 || u2.length !== 6) {
    throw new Error(`Received footprints must expose 23 RP2040 pads and 6 ToF pads; got ${u1.length} and ${u2.length}`)
  }
  const u1Pins = new Set(u1.flatMap((item) => item.port_hints ?? []).filter((hint) => /^pin\d+$/.test(hint)))
  const u2Pins = new Set(u2.flatMap((item) => item.port_hints ?? []).filter((hint) => /^pin\d+$/.test(hint)))
  if (u1Pins.size !== 23 || [...u1Pins].some((pin) => !/^pin([1-9]|1[0-9]|2[0-3])$/.test(pin))) {
    throw new Error("RP2040 footprint pin map must contain physical pins 1 through 23")
  }
  if (u2Pins.size !== 6 || [...u2Pins].some((pin) => !/^pin[1-6]$/.test(pin))) {
    throw new Error("ToF footprint pin map must contain physical pins 1 through 6")
  }
  const moduleHole = circuit.find((item) => item.type === "pcb_hole" && item.x === 6.8 && item.y === 4.7)
  if (!moduleHole) throw new Error("ToF footprint must expose its measured/provisional corner mounting hole")
  const holeRadius = moduleHole.hole_diameter / 2
  for (const pad of u2) {
    const distance = Math.hypot(pad.x - moduleHole.x, pad.y - moduleHole.y)
    if (distance < holeRadius + pad.outer_diameter / 2 + 0.1) {
      throw new Error(`ToF mounting hole overlaps pad ${pad.port_hints?.join("/")}`)
    }
  }
  const opticalKeepout = circuit.find((item) => item.type === "pcb_keepout" && item.shape === "circle")
  const tofPcbId = [...pcbComponents.entries()].find(([, sourceId]) => sourceNames.get(sourceId) === "U2_VL53LDK_BLUE_PENDING_FOOTPRINT")?.[0]
  if (!opticalKeepout || !tofPcbId || !opticalKeepout.excluded_pcb_component_ids?.includes(tofPcbId)) {
    throw new Error("Optical keep-out must be explicit and scoped to the received ToF module")
  }
  if (circuit.filter((item) => item.type === "pcb_keepout").length !== 2) {
    throw new Error("Candidate must contain USB and optical keep-outs")
  }
  if (circuit.filter((item) => item.type === "pcb_hole").length !== 5) {
    throw new Error("Candidate must contain one sensor-module hole and four carrier mounting holes")
  }
  if (circuit.filter((item) => item.type === "pcb_silkscreen_rect").length < 2) {
    throw new Error("Candidate must show visible module envelope outlines")
  }
  validateSchematicSheet(circuit)
}

export function summarizeDiagnostics(circuit) {
  const types = circuit.map((item) => String(item.type ?? ""))
  const errors = types.filter((type) => type.includes("error")).length
  const warningTypes = types.filter((type) => type.includes("warning"))
  const byType = Object.fromEntries([...new Set(warningTypes)].sort().map((type) => [
    type,
    warningTypes.filter((value) => value === type).length,
  ]))
  return { errors, warnings: warningTypes.length, byType }
}

export function validateVariantContracts(contracts) {
  if (!Array.isArray(contracts) || contracts.length !== 4) {
    throw new Error("Variant contract must contain exactly A, B, C and D")
  }
  const ids = contracts.map((contract) => contract.id).sort().join("")
  if (ids !== "ABCD") throw new Error("Variant contract IDs must be A, B, C and D")
  for (const contract of contracts) {
    if (!contract.name || !Array.isArray(contract.items) || !Array.isArray(contract.gates)) {
      throw new Error(`Variant ${contract.id} is missing BOM items or test gates`)
    }
    if (contract.items.some((item) => item.confidence === "verified")) {
      throw new Error(`Variant ${contract.id} cannot claim unreviewed catalogue data is verified`)
    }
  }
  const variantC = contracts.find((contract) => contract.id === "C")
  const variantD = contracts.find((contract) => contract.id === "D")
  if (!variantC.items.some((item) => item.ref === "U5" && item.sourceId === "C189624")) {
    throw new Error("Variant C must include the LIS2DW12TR candidate")
  }
  if (!variantC.items.some((item) => item.ref === "Q1") || !variantC.items.some((item) => item.ref === "TP6")) {
    throw new Error("Variant C must isolate and expose the buzzer driver")
  }
  if (variantD.items.some((item) => /buzzer/i.test(item.part))) {
    throw new Error("Variant D must not include a local buzzer")
  }
  if (!/power/i.test(variantD.sourceContract ?? "")) {
    throw new Error("Variant D must state that USB is power-only")
  }
}
