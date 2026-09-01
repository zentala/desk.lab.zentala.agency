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
