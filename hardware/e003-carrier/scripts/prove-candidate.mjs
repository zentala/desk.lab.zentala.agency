import { readFile, writeFile, mkdir } from "node:fs/promises"
import { fileURLToPath, pathToFileURL } from "node:url"
import { resolve } from "node:path"
import ts from "typescript"
import { Circuit } from "@tscircuit/core"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const source = await readFile(resolve(root, "src/carrier.tsx"), "utf8")
const transpiled = ts.transpileModule(source, {
  compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  fileName: "carrier.tsx",
}).outputText
const temp = resolve(root, ".candidate-runtime.mjs")
await writeFile(temp, transpiled)
try {
  const { default: candidate } = await import(pathToFileURL(temp).href)
  const circuit = new Circuit()
  circuit.add(candidate())
  await circuit.renderUntilSettled()
  const output = resolve(root, "artifacts/candidate-proof")
  await mkdir(output, { recursive: true })
  await writeFile(resolve(output, "circuit.json"), JSON.stringify(circuit.getCircuitJson(), null, 2))
  await writeFile(resolve(output, "schematic.svg"), await circuit.getSvg({ view: "schematic" }))
  await writeFile(resolve(output, "pcb.svg"), await circuit.getSvg({ view: "pcb" }))
  console.log(`Candidate proof generated in ${output}`)
} finally {
  await import("node:fs/promises").then(({ unlink }) => unlink(temp).catch(() => {}))
}
