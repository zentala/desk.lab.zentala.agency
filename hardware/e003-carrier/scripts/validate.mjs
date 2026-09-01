import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const rows = JSON.parse(await readFile(resolve(root, "evidence/pin-truth-table.json"), "utf8"))
const required = ["power", "ground", "SDA", "SCL"]
const missing = required.filter((fn) => !rows.some((row) => row.function === fn))
if (missing.length) throw new Error(`Missing required functions: ${missing.join(", ")}`)

const source = await readFile(resolve(root, "src/carrier.tsx"), "utf8")
for (const marker of ["U1_RP2040_ZERO_PENDING_FOOTPRINT", "U2_VL53LDK_BLUE_PENDING_FOOTPRINT"]) {
  if (!source.includes(marker)) throw new Error(`Missing review marker: ${marker}`)
}

const unresolved = rows.filter((row) => row.status === "unresolved").length
console.log(`E003 validation passed: ${rows.length} pin rows; ${unresolved} unresolved evidence rows.`)
console.log("Fabrication gate: BLOCKED until physical evidence and external review are complete.")
