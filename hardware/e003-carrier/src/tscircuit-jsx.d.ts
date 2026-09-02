import type {
  BoardProps,
  ChipProps,
  CirclePlatedHoleProps,
  FootprintProps,
  HoleProps,
  PcbKeepoutProps,
  PcbNoteRectProps,
  PcbNoteTextProps,
  SilkscreenRectProps,
  SilkscreenTextProps,
  SchematicSheetProps,
  SmtPadProps,
  ResistorProps,
  CapacitorProps,
  TestpointProps,
  TraceProps,
} from "@tscircuit/props"

interface TscircuitElements {
  board: BoardProps
  chip: ChipProps
  footprint: FootprintProps
  platedhole: CirclePlatedHoleProps
  trace: TraceProps
  hole: HoleProps
  schematicsheet: SchematicSheetProps
  testpoint: TestpointProps
  keepout: PcbKeepoutProps
  pcbnoterect: PcbNoteRectProps
  pcbnotetext: PcbNoteTextProps
  silkscreenrect: SilkscreenRectProps
  silkscreentext: SilkscreenTextProps
  smtpad: SmtPadProps
  resistor: ResistorProps
  capacitor: CapacitorProps
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends TscircuitElements {}
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends TscircuitElements {}
  }
}
