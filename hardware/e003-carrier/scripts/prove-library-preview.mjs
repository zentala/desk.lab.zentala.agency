import { mkdir, readFile, unlink, writeFile } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import { resolve } from "node:path"
import ts from "typescript"
import { CircuitRunner } from "@tscircuit/eval"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const sourcePath = resolve(root, "src/library-preview.tsx")
const source = await readFile(sourcePath, "utf8")
const transpiled = ts.transpileModule(source, {
  compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  fileName: "library-preview.tsx",
}).outputText
const temp = resolve(root, ".library-preview-runtime.mjs")
await writeFile(temp, transpiled)
try {
  const runner = new CircuitRunner()
  const { libraryPreview } = await import(pathToFileURL(temp).href)
  await runner.executeComponent(libraryPreview)
  await runner.renderUntilSettled()
  const circuitJson = await runner.getCircuitJson()
  const sourceNames = new Map(circuitJson
    .filter((item) => item.type === "source_component")
    .map((item) => [item.source_component_id, item.name]))
  const pcbNames = new Map(circuitJson
    .filter((item) => item.type === "pcb_component")
    .map((item) => [item.pcb_component_id, sourceNames.get(item.source_component_id)]))
  const padsByComponent = {}
  for (const pad of circuitJson.filter((item) => item.type === "pcb_smtpad")) {
    const name = pcbNames.get(pad.pcb_component_id) ?? "<unassigned>"
    padsByComponent[name] = (padsByComponent[name] ?? 0) + 1
  }
  const expectedPads = {
    U1_RP2040_C2040_LIBRARY: 57, // 56 signal pads + exposed pad
    U2_VL53L0X_C2929940_LIBRARY: 12,
  }
  for (const [name, expected] of Object.entries(expectedPads)) {
    if (padsByComponent[name] !== expected) {
      throw new Error(`Library footprint ${name} generated ${padsByComponent[name] ?? 0} pads; expected ${expected}`)
    }
  }
  const output = resolve(root, "artifacts/library-preview")
  await mkdir(output, { recursive: true })
  await writeFile(resolve(output, "circuit.json"), JSON.stringify(circuitJson, null, 2))
  const circuit = runner._executionContext.circuit
  await writeFile(resolve(output, "schematic.svg"), await circuit.getSvg({ view: "schematic" }))
  await writeFile(resolve(output, "pcb.svg"), await circuit.getSvg({ view: "pcb" }))
  console.log(`Library preview generated in ${output}`)
} finally {
  await unlink(temp).catch(() => {})
}
