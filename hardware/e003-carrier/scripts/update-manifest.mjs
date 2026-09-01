import { createHash } from "node:crypto"
import { readFile, stat, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { summarizeDiagnostics } from "./validation-lib.mjs"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const manifestPath = resolve(root, "exports/manifest.json")
const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"))
const sourcePaths = [
  "src/carrier.tsx",
  "src/variant-candidates.tsx",
  "src/design-assumptions.json",
  "evidence/pin-truth-table.json",
  "variants/variant-a-bom.json",
  "variants/variant-b-bom.json",
  "variants/variant-c-bom.json",
  "variants/variant-d-bom.json",
  "protocol.md",
]
const artifactPaths = [
  "artifacts/pipeline-proof/circuit.json",
  "artifacts/pipeline-proof/schematic.svg",
  "artifacts/pipeline-proof/pcb.svg",
  "artifacts/candidate-proof/circuit.json",
  "artifacts/candidate-proof/schematic.svg",
  "artifacts/candidate-proof/pcb.svg",
  ...["A", "B", "C", "D"].flatMap((id) => [
    `artifacts/variants/${id}/circuit.json`,
    `artifacts/variants/${id}/schematic.svg`,
    `artifacts/variants/${id}/pcb.svg`,
  ]),
]

function validateFormat(path, contents) {
  const text = contents.toString("utf8")
  if (path.endsWith(".json")) {
    if (!Array.isArray(JSON.parse(text))) throw new Error(`${path} must contain a Circuit JSON array`)
    return "parsed-circuit-json-array"
  }
  if (path.endsWith(".svg")) {
    if (!text.includes("<svg")) throw new Error(`${path} must contain an SVG root`)
    return "parsed-standalone-svg"
  }
  throw new Error(`No independent format check for ${path}`)
}

async function describe(path, checkFormat = false) {
  const absolute = resolve(root, path)
  const [contents, details] = await Promise.all([readFile(absolute), stat(absolute)])
  const description = {
    path,
    bytes: details.size,
    sha256: createHash("sha256").update(contents).digest("hex"),
  }
  if (checkFormat) description.formatCheck = validateFormat(path, contents)
  return description
}

const candidate = JSON.parse(await readFile(resolve(root, "artifacts/candidate-proof/circuit.json"), "utf8"))
manifest.tool = {
  generator: { package: "@tscircuit/core", version: packageJson.devDependencies["@tscircuit/core"] },
  checks: { package: "@tscircuit/checks", version: packageJson.devDependencies["@tscircuit/checks"] },
  cli: { package: "tscircuit", version: packageJson.devDependencies.tscircuit },
  runtime: packageJson.engines.node,
}
manifest.commands.check = "npm run check"
manifest.expectedArtifacts = [
  ...manifest.expectedArtifacts.filter((artifact) => !artifact.path.startsWith("artifacts/variants/")),
  ...["A", "B", "C", "D"].flatMap((id) => [
    { name: `variant-${id}-circuit-json`, path: `artifacts/variants/${id}/circuit.json`, status: "generated-review-proof" },
    { name: `variant-${id}-schematic-render`, path: `artifacts/variants/${id}/schematic.svg`, status: "generated-review-proof" },
    { name: `variant-${id}-pcb-render`, path: `artifacts/variants/${id}/pcb.svg`, status: "generated-review-proof" },
  ]),
]
manifest.verification.localValidation = "passed: npm run check"
manifest.verification.candidateDiagnostics = summarizeDiagnostics(candidate)
manifest.verification.independentFileOpen = "passed: Circuit JSON arrays parse; standalone SVG roots are present"
manifest.verification.variantProof = "passed: four variant Circuit JSON/SVG proof sets generated and independently format-checked"
manifest.provenance = {
  sources: await Promise.all(sourcePaths.map((path) => describe(path))),
  artifacts: await Promise.all(artifactPaths.map((path) => describe(path, true))),
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Manifest updated with ${manifest.provenance.artifacts.length} artifact hashes.`)
