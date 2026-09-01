import type {
  BoardProps,
  ChipProps,
  HoleProps,
  PcbKeepoutProps,
  PcbNoteRectProps,
  PcbNoteTextProps,
  SilkscreenRectProps,
  SilkscreenTextProps,
  SchematicSheetProps,
  TestpointProps,
  TraceProps,
} from "@tscircuit/props"

interface TscircuitElements {
  board: BoardProps
  chip: ChipProps
  trace: TraceProps
  hole: HoleProps
  schematicsheet: SchematicSheetProps
  testpoint: TestpointProps
  keepout: PcbKeepoutProps
  pcbnoterect: PcbNoteRectProps
  pcbnotetext: PcbNoteTextProps
  silkscreenrect: SilkscreenRectProps
  silkscreentext: SilkscreenTextProps
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
