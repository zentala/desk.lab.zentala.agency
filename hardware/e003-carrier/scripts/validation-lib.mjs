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
  if (new Set(pins).size !== 4 || !pins.every((pin) => [1, 2, 3, 4].includes(pin))) {
    throw new Error(`${moduleId} must map unique placeholder pins 1-4`)
  }
  const block = sourceBlock(source, `name="${marker}"`)
  for (const row of moduleRows) {
    if (!block.includes(`${row.placeholderPin}: "${row.sourceLabel}"`)) {
      throw new Error(`${moduleId} pin ${row.placeholderPin} must be ${row.sourceLabel}`)
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
  if (carrier.widthMm !== 48 || carrier.heightMm !== 32 || carrier.thicknessMm !== 1.6) {
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
  const names = circuit.filter((item) => item.type === "source_component").map((item) => item.name)
  for (const name of ["TP1_3V3", "TP2_GND", "TP3_SDA", "TP4_SCL"]) {
    if (!names.includes(name)) throw new Error(`Missing review test point: ${name}`)
  }
  if (circuit.filter((item) => item.type === "pcb_keepout").length !== 2) {
    throw new Error("Candidate must contain USB and optical keep-outs")
  }
  if (circuit.filter((item) => item.type === "pcb_hole").length !== 4) {
    throw new Error("Candidate must contain four carrier mounting holes")
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
