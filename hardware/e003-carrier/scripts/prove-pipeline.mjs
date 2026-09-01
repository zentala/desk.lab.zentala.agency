import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import React from "react"
import { Board, Circuit, Led, Resistor, Trace } from "@tscircuit/core"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))
const output = resolve(root, "artifacts/pipeline-proof")
await mkdir(output, { recursive: true })

// Minimal, dependency-local test design. This proves the core render path
// independently of the unresolved E003 module footprints.
const circuit = new Circuit()
const board = new Board({ width: "12mm", height: "8mm", name: "PIPELINE_TEST" })
const resistor = new Resistor({ name: "R1", resistance: "1k", footprint: "0402", pcbX: -2 })
const led = new Led({ name: "D1", footprint: "0402", pcbX: 2 })
board.add(resistor)
board.add(led)
board.add(new Trace({ from: "R1.pin1", to: "D1.pos" }))
circuit.add(board)
await circuit.renderUntilSettled()
await writeFile(resolve(output, "circuit.json"), JSON.stringify(circuit.getCircuitJson(), null, 2))
await writeFile(resolve(output, "schematic.svg"), await circuit.getSvg({ view: "schematic" }))
await writeFile(resolve(output, "pcb.svg"), await circuit.getSvg({ view: "pcb" }))
console.log(`Pipeline proof generated in ${output}`)
