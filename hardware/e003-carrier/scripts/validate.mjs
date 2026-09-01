import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"
import {
  summarizeDiagnostics,
  validateAssumptions,
  validateCandidateStructure,
  validateContract,
  validateVariantContracts,
} from "./validation-lib.mjs"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const rows = JSON.parse(await readFile(resolve(root, "evidence/pin-truth-table.json"), "utf8"))
const assumptions = JSON.parse(await readFile(resolve(root, "src/design-assumptions.json"), "utf8"))
const source = await readFile(resolve(root, "src/carrier.tsx"), "utf8")
const circuit = JSON.parse(await readFile(resolve(root, "artifacts/candidate-proof/circuit.json"), "utf8"))
const variantIds = ["a", "b", "c", "d"]
const variants = await Promise.all(variantIds.map((id) => readFile(resolve(root, `variants/variant-${id}-bom.json`), "utf8").then(JSON.parse)))
validateContract(rows, source)
validateAssumptions(assumptions)
validateCandidateStructure(circuit, assumptions)
validateVariantContracts(variants)
const diagnostics = summarizeDiagnostics(circuit)
if (diagnostics.errors > 0) throw new Error(`Candidate contains ${diagnostics.errors} error diagnostics`)

const unresolved = rows.filter((row) => row.status === "unresolved").length
console.log(`E003 validation passed: ${rows.length} pin rows; ${unresolved} unresolved evidence rows; four variant BOM contracts.`)
console.log(`T03 structure passed: provisional geometry, 23 + 6 module pads, 2 keep-outs, 1 module hole and 4 mounting holes.`)
console.log(`Candidate diagnostics: ${diagnostics.errors} errors; ${diagnostics.warnings} warnings.`)
console.log("Fabrication gate: BLOCKED until physical evidence and external review are complete.")
