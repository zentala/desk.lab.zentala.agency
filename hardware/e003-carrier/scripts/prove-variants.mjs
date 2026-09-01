import { mkdir, readFile, unlink, writeFile } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import { resolve } from "node:path"
import ts from "typescript"
import { Circuit } from "@tscircuit/core"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const sourcePath = resolve(root, "src/variant-candidates.tsx")
const source = await readFile(sourcePath, "utf8")
const transpiled = ts.transpileModule(source, {
  compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  fileName: "variant-candidates.tsx",
}).outputText
const temp = resolve(root, ".variant-runtime.mjs")
await writeFile(temp, transpiled)
try {
  const candidates = await import(pathToFileURL(temp).href)
  for (const [id, factory] of Object.entries({ A: candidates.variantA, B: candidates.variantB, C: candidates.variantC, D: candidates.variantD })) {
    const circuit = new Circuit()
    circuit.add(factory())
    await circuit.renderUntilSettled()
    const output = resolve(root, `artifacts/variants/${id}`)
    await mkdir(output, { recursive: true })
    await writeFile(resolve(output, "circuit.json"), JSON.stringify(circuit.getCircuitJson(), null, 2))
    await writeFile(resolve(output, "schematic.svg"), await circuit.getSvg({ view: "schematic" }))
    await writeFile(resolve(output, "pcb.svg"), await circuit.getSvg({ view: "pcb" }))
    console.log(`Variant ${id} proof generated in ${output}`)
  }
} finally {
  await unlink(temp).catch(() => {})
}
