import assert from "node:assert/strict"
import { checkProfile, findDuplicateRenderHashes, summarizeCircuitChecks } from "./verify-boards.mjs"

const profile = {
  id: "fixture",
  board: { width: 10, height: 10 },
  components: [{ pattern: /^U1$/, exactPads: 23, rejectFootprints: [/^pinrow4/] }],
  minTraces: 1,
}

function fixture(padCount, footprint = "custom_23_pad") {
  const circuit = [
    { type: "pcb_board", width: 10, height: 10 },
    { type: "source_component", source_component_id: "source_1", name: "U1" },
    { type: "pcb_component", pcb_component_id: "pcb_1", source_component_id: "source_1" },
    { type: "cad_component", pcb_component_id: "pcb_1", footprinter_string: footprint },
    { type: "pcb_trace", pcb_trace_id: "trace_1", route: [] },
  ]
  for (let index = 0; index < padCount; index += 1) {
    circuit.push({
      type: "pcb_plated_hole",
      pcb_plated_hole_id: `pad_${index}`,
      pcb_component_id: "pcb_1",
    })
  }
  return circuit
}

const invalid = checkProfile(fixture(4), profile)
assert.ok(invalid.issues.some((issue) => issue.includes("exposes 4 pads, expected 23")))

const placeholder = checkProfile(fixture(23, "pinrow4_p2.54mm"), profile)
assert.ok(placeholder.issues.some((issue) => issue.includes("forbidden placeholder footprint")))

const valid = checkProfile(fixture(23), profile)
assert.deepEqual(valid.issues, [])

const duplicateRenders = findDuplicateRenderHashes([
  { renders: { pcbSha256: "same-pcb", schematicSha256: "a" } },
  { renders: { pcbSha256: "same-pcb", schematicSha256: "b" } },
])
assert.ok(duplicateRenders.includes("PCB render hash is duplicated between board artifacts"))
assert.deepEqual(findDuplicateRenderHashes([
  { renders: { pcbSha256: "a", schematicSha256: "b" } },
  { renders: { pcbSha256: "c", schematicSha256: "d" } },
]), [])

const summary = summarizeCircuitChecks([
  { type: "pcb_trace_error", error_type: "pcb_trace_error", message: "collision" },
  { type: "source_no_power_pin_defined_warning", warning_type: "source_no_power_pin_defined_warning", message: "power" },
])
assert.equal(summary.errors, 1)
assert.equal(summary.warnings, 1)
assert.equal(summary.blockingWarnings, 0)

console.log("ok - board verification catches pad-count and placeholder-footprint regressions")
