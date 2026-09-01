import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"
import {
  summarizeDiagnostics,
  validateAssumptions,
  validateCandidateStructure,
  validateContract,
} from "./validation-lib.mjs"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const rows = JSON.parse(await readFile(resolve(root, "evidence/pin-truth-table.json"), "utf8"))
const assumptions = JSON.parse(await readFile(resolve(root, "src/design-assumptions.json"), "utf8"))
const source = await readFile(resolve(root, "src/carrier.tsx"), "utf8")
const circuit = JSON.parse(await readFile(resolve(root, "artifacts/candidate-proof/circuit.json"), "utf8"))
validateContract(rows, source)
validateAssumptions(assumptions)
validateCandidateStructure(circuit, assumptions)
const diagnostics = summarizeDiagnostics(circuit)
if (diagnostics.errors > 0) throw new Error(`Candidate contains ${diagnostics.errors} error diagnostics`)

const unresolved = rows.filter((row) => row.status === "unresolved").length
console.log(`E003 validation passed: ${rows.length} pin rows; ${unresolved} unresolved evidence rows.`)
console.log(`T03 structure passed: provisional geometry, 4 test points, 2 keep-outs, 4 mounting holes.`)
console.log(`Candidate diagnostics: ${diagnostics.errors} errors; ${diagnostics.warnings} warnings.`)
console.log("Fabrication gate: BLOCKED until physical evidence and external review are complete.")
