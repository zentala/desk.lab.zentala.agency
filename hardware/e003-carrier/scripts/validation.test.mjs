import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { summarizeDiagnostics, validateContract } from "./validation-lib.mjs"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const rows = JSON.parse(await readFile(resolve(root, "evidence/pin-truth-table.json"), "utf8"))
const source = await readFile(resolve(root, "src/carrier.tsx"), "utf8")

function test(name, callback) {
  callback()
  console.log(`ok - ${name}`)
}

test("accepts the reviewed placeholder pin and net contract", () => {
  assert.doesNotThrow(() => validateContract(rows, source))
})

test("rejects a sensor SDA/SCL source swap", () => {
  const swapped = source
    .replace('3: "SCL"', '3: "SDA"')
    .replace('4: "SDA"', '4: "SCL"')
  assert.throws(() => validateContract(rows, swapped), /pin 3 must be SCL/)
})

test("rejects a missing per-module function", () => {
  const incomplete = rows.filter((row) => !(row.moduleId === "vl53ldk-breakout" && row.function === "SDA"))
  assert.throws(() => validateContract(incomplete, source), /exactly one SDA row/)
})

test("reports generated warning and error diagnostics", () => {
  const diagnostics = summarizeDiagnostics([
    { type: "source_warning" },
    { type: "pcb_error" },
    { type: "pcb_trace" },
  ])
  assert.deepEqual(diagnostics, { errors: 1, warnings: 1, byType: { source_warning: 1 } })
})
