import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const portal = resolve(root, "review-portal")
const output = resolve(portal, "export")
await rm(output, { recursive: true, force: true })
await mkdir(resolve(output, "assets"), { recursive: true })

const files = [
  "evidence/photos/rp2040-zero-vl53ldk-labels-2026-09-01.jpg",
  "evidence/photos/rp2040-zero-vl53ldk-components-2026-09-01.jpg",
  "evidence/evidence.md", "evidence/pin-truth-table.json", "evidence/source-register.json", "hardware-spec.md",
  "mechanical-constraints.md", "visual-fit-checklist.md", "design-prompt.md",
  "review-findings.md", "CHANGELOG.md", "protocol.md", "src/carrier.tsx",
  "src/variant-candidates.tsx", "src/library-preview.tsx", "src/component-assets.md", "src/design-assumptions.json", "exports/manifest.json",
  "variants/variant-a-bom.json", "variants/variant-b-bom.json", "variants/variant-c-bom.json", "variants/variant-d-bom.json",
  "artifacts/candidate-proof/circuit.json", "artifacts/candidate-proof/pcb.svg", "artifacts/candidate-proof/schematic.svg",
  "artifacts/verification/board-verification.json", "artifacts/verification/board-verification.md",
  "artifacts/pipeline-proof/circuit.json", "artifacts/pipeline-proof/pcb.svg", "artifacts/pipeline-proof/schematic.svg",
  "artifacts/library-preview/circuit.json", "artifacts/library-preview/pcb.svg", "artifacts/library-preview/schematic.svg",
  ...["A", "B", "C", "D"].flatMap((id) => [
    `artifacts/variants/${id}/circuit.json`,
    `artifacts/variants/${id}/schematic.svg`,
    `artifacts/variants/${id}/pcb.svg`,
  ]),
]
for (const file of files) {
  const destination = resolve(output, "assets", file)
  await mkdir(resolve(destination, ".."), { recursive: true })
  if (file === "hardware-spec.md") {
    const source = await readFile(resolve(root, file), "utf8")
    await writeFile(destination, source.replace("../../research/hardware-v2-spec.md", "https://github.com/zentala/desk.zentala.io/blob/dev/research/hardware-v2-spec.md"))
  } else {
    await cp(resolve(root, file), destination)
  }
}
for (const file of ["index.html", "hardware.html", "visual-fit.html", "variants.html"]) {
  const source = await readFile(resolve(portal, file), "utf8")
  await writeFile(resolve(output, file), source.replaceAll("../", "assets/"))
}
for (const file of ["index.html", "hardware.html", "visual-fit.html", "variants.html"]) {
  const html = await readFile(resolve(output, file), "utf8")
  const urls = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1])
  for (const url of urls) {
    if (/^(?:https?:|mailto:|#|data:)/.test(url)) continue
    await access(resolve(output, url.split("#")[0]))
  }
}
await writeFile(resolve(output, "README.txt"), "Open index.html locally. This export contains only review material; fabrication remains blocked.\n")
console.log(`Portable review portal written to ${output}`)
