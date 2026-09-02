import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"
import { runAllChecks } from "@tscircuit/checks"

const root = resolve(fileURLToPath(new URL("../", import.meta.url)))

const BOARD_PROFILES = [
  {
    id: "A",
    artifact: "artifacts/candidate-proof",
    source: "src/carrier.tsx",
    description: "canonical received-module carrier",
    board: { width: 52, height: 38 },
    components: [
      { pattern: /^U1_RP2040_ZERO/, exactPads: 23, rejectFootprints: [/^pinrow4/] },
      { pattern: /^U2_GY530_STYLE_TOF/, exactPads: 4, rejectFootprints: [/^pinrow4/] },
    ],
    minTraces: 4,
  },
  {
    id: "B",
    artifact: "artifacts/variants/B",
    source: "src/variant-candidates.tsx",
    description: "JLCPCB chip-down candidate",
    board: { width: 48, height: 32 },
    components: [
      { pattern: /^U1_RP2040_C2040$/, exactPads: 57, rejectFootprints: [/^pinrow4/] },
      { pattern: /^U2_VL53L0X_C2929940$/, exactPads: 12, rejectFootprints: [/^pinrow4/] },
    ],
  },
  {
    id: "C",
    artifact: "artifacts/variants/C",
    source: "src/variant-candidates.tsx",
    description: "chip-down candidate with feedback hardware",
    board: { width: 48, height: 32 },
    components: [
      { pattern: /^U1_RP2040_C2040$/, exactPads: 57, rejectFootprints: [/^pinrow4/] },
      { pattern: /^U2_VL53L0X_C2929940$/, exactPads: 12, rejectFootprints: [/^pinrow4/] },
      { pattern: /^U5_LIS2DW12TR_C189624$/, exactPads: 12, rejectFootprints: [/^pinrow4/] },
      { pattern: /^BZ1_TMB12D03_ACTIVE_3V_PROVISIONAL$/, exactPads: 2, rejectFootprints: [/^pinrow4/] },
      { pattern: /^Q1_BUZZER_LOW_SIDE_DRIVER_PROVISIONAL$/, exactPads: 3, rejectFootprints: [/^pinrow4/] },
    ],
  },
  {
    id: "D",
    artifact: "artifacts/variants/D",
    source: "src/variant-candidates.tsx",
    description: "ESP32-C3 wireless candidate",
    board: { width: 48, height: 32 },
    components: [
      { pattern: /^U1_ESP32_C3_MINI_1_N4/, exactPads: 61, rejectFootprints: [/^pinrow4/] },
      { pattern: /^U2_VL53L0X_C2929940$/, exactPads: 12, rejectFootprints: [/^pinrow4/] },
      { pattern: /^U3_LIS2DW12TR_C189624$/, exactPads: 12, rejectFootprints: [/^pinrow4/] },
    ],
  },
]

// Catalogue/local provisional assets intentionally lack finalized courtyard
// and pin-attribute metadata. Keep those as visible warnings in the report;
// only generated errors fail a candidate at this stage.
const BLOCKING_WARNING_TYPES = new Set()

function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

function sourceNamesByPcbComponent(circuit) {
  const sourceNames = new Map(circuit
    .filter((item) => item.type === "source_component")
    .map((item) => [item.source_component_id, item.name]))
  return new Map(circuit
    .filter((item) => item.type === "pcb_component")
    .map((item) => [item.pcb_component_id, sourceNames.get(item.source_component_id)]))
}

function cadFootprintsByPcbComponent(circuit) {
  return new Map(circuit
    .filter((item) => item.type === "cad_component")
    .map((item) => [item.pcb_component_id, item.footprinter_string ?? "unknown"]))
}

export function collectComponentStats(circuit) {
  const names = sourceNamesByPcbComponent(circuit)
  const footprints = cadFootprintsByPcbComponent(circuit)
  const padsByName = new Map()
  for (const pad of circuit.filter((item) => ["pcb_plated_hole", "pcb_smtpad"].includes(item.type))) {
    const name = names.get(pad.pcb_component_id) ?? "<unassigned>"
    const current = padsByName.get(name) ?? { pads: 0, footprints: new Set() }
    current.pads += 1
    current.footprints.add(footprints.get(pad.pcb_component_id) ?? "unknown")
    padsByName.set(name, current)
  }
  return Object.fromEntries([...padsByName.entries()].map(([name, value]) => [name, {
    pads: value.pads,
    footprints: [...value.footprints].sort(),
  }]))
}

export function checkProfile(circuit, profile) {
  const issues = []
  const board = circuit.find((item) => item.type === "pcb_board")
  if (!board) issues.push(`missing pcb_board`)
  else {
    for (const dimension of ["width", "height"]) {
      if (board[dimension] !== profile.board[dimension]) {
        issues.push(`board ${dimension}=${board[dimension]}mm, expected ${profile.board[dimension]}mm`)
      }
    }
  }

  const stats = collectComponentStats(circuit)
  for (const expected of profile.components) {
    const matches = Object.entries(stats).filter(([name]) => expected.pattern.test(name))
    if (matches.length !== 1) {
      issues.push(`component ${expected.pattern} matched ${matches.length} times`)
      continue
    }
    const [name, actual] = matches[0]
    if (expected.exactPads !== undefined && actual.pads !== expected.exactPads) {
      issues.push(`${name} exposes ${actual.pads} pads, expected ${expected.exactPads}`)
    }
    if (expected.minPads !== undefined && actual.pads < expected.minPads) {
      issues.push(`${name} exposes ${actual.pads} pads, minimum is ${expected.minPads}`)
    }
    for (const forbidden of expected.rejectFootprints ?? []) {
      for (const footprint of actual.footprints) {
        if (forbidden.test(footprint)) issues.push(`${name} uses forbidden placeholder footprint ${footprint}`)
      }
    }
  }

  const traces = circuit.filter((item) => item.type === "pcb_trace").length
  if (profile.minTraces !== undefined && traces < profile.minTraces) {
    issues.push(`has ${traces} PCB traces, minimum is ${profile.minTraces}`)
  }
  return { stats, issues }
}

export function summarizeCircuitChecks(checks) {
  const errors = checks.filter((item) => String(item.type).includes("error") || String(item.error_type).includes("error"))
  const warnings = checks.filter((item) => String(item.type).includes("warning") || String(item.warning_type).includes("warning"))
  const blockingWarnings = warnings.filter((item) => BLOCKING_WARNING_TYPES.has(item.warning_type ?? item.type))
  return {
    errors: errors.length,
    warnings: warnings.length,
    blockingWarnings: blockingWarnings.length,
    messages: [...errors, ...warnings].map((item) => ({
      severity: errors.includes(item) || String(item.type).includes("error") ? "error" : "warning",
      type: item.error_type ?? item.warning_type ?? item.type,
      message: item.message ?? "",
    })),
  }
}

async function inspectProfile(profile) {
  const artifactRoot = resolve(root, profile.artifact)
  const circuit = JSON.parse(await readFile(resolve(artifactRoot, "circuit.json"), "utf8"))
  const pcbSvg = await readFile(resolve(artifactRoot, "pcb.svg"), "utf8")
  const schematicSvg = await readFile(resolve(artifactRoot, "schematic.svg"), "utf8")
  const checks = await runAllChecks(circuit)
  const checkSummary = summarizeCircuitChecks(checks)
  const profileResult = checkProfile(circuit, profile)
  const issues = [
    ...profileResult.issues,
    ...(checkSummary.errors ? [`@tscircuit/checks reported ${checkSummary.errors} error(s)`] : []),
    ...(checkSummary.blockingWarnings ? [`@tscircuit/checks reported ${checkSummary.blockingWarnings} blocking warning(s)`] : []),
    ...(pcbSvg.includes("<svg") && schematicSvg.includes("<svg") ? [] : ["one or more render artifacts is not a valid SVG"]),
  ]
  return {
    id: profile.id,
    artifact: profile.artifact,
    source: profile.source,
    description: profile.description,
    status: issues.length === 0 ? "PASS" : "FAIL",
    board: circuit.find((item) => item.type === "pcb_board") ?? null,
    components: profileResult.stats,
    checks: checkSummary,
    renders: {
      pcbBytes: Buffer.byteLength(pcbSvg),
      schematicBytes: Buffer.byteLength(schematicSvg),
      pcbSha256: sha256(pcbSvg),
      schematicSha256: sha256(schematicSvg),
      hasSvgRoot: pcbSvg.includes("<svg") && schematicSvg.includes("<svg"),
    },
    issues,
  }
}

function markdownReport(report) {
  const lines = [
    "# E003 board verification report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "This is a release-blocking report. A green tscircuit render is not enough: every board must pass the Circuit JSON checks and the project-specific component contract.",
    "",
    "| Board | Artifact | Status | Component-contract issues | TS-Circuit errors | Blocking warnings |",
    "| --- | --- | --- | ---: | ---: | ---: |",
  ]
  for (const item of report.boards) lines.push(`| ${item.id} | \`${item.artifact}\` | **${item.status}** | ${item.issues.length} | ${item.checks.errors} | ${item.checks.blockingWarnings} |`)
  lines.push("", "## Findings", "")
  for (const item of report.boards) {
    lines.push(`### ${item.id} — ${item.description}`, "")
    if (!item.issues.length) lines.push("No blocking findings.", "")
    else for (const issue of item.issues) lines.push(`- ${issue}`)
    lines.push("")
  }
  if (report.globalIssues.length) {
    lines.push("## Cross-board findings", "")
    for (const issue of report.globalIssues) lines.push(`- ${issue}`)
    lines.push("")
  }
  lines.push("## Visual gate", "", "The script proves that distinct PCB and schematic SVGs exist and records their hashes. An agent must still open the generated PCB render/screenshot and inspect: every physical pad, board outline, mounting hole, optical keep-out, connector access and route endpoint. The visual inspection is not allowed to be replaced by a green script result.", "")
  return lines.join("\n")
}

export function findDuplicateRenderHashes(boards) {
  const issues = []
  for (const [label, key] of [["PCB", "pcbSha256"], ["schematic", "schematicSha256"]]) {
    const hashes = boards.map((board) => board.renders[key])
    if (new Set(hashes).size !== hashes.length) {
      issues.push(`${label} render hash is duplicated between board artifacts`)
    }
  }
  return issues
}

export async function verifyBoards() {
  const boards = []
  for (const profile of BOARD_PROFILES) boards.push(await inspectProfile(profile))
  const globalIssues = findDuplicateRenderHashes(boards)
  const report = {
    generatedAt: new Date().toISOString(),
    boards,
    globalIssues,
    status: boards.every((board) => board.status === "PASS") && globalIssues.length === 0 ? "PASS" : "FAIL",
  }
  const output = resolve(root, "artifacts/verification")
  await mkdir(output, { recursive: true })
  await writeFile(resolve(output, "board-verification.json"), JSON.stringify(report, null, 2))
  await writeFile(resolve(output, "board-verification.md"), markdownReport(report))
  console.log(markdownReport(report))
  if (report.status !== "PASS") process.exitCode = 1
  return report
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await verifyBoards()
