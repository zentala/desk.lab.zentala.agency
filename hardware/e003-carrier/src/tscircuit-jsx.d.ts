/** Local JSX declarations keep source validation independent from tscircuit's
 * bundled implementation sources. The tsci CLI supplies the runtime schema. */
declare namespace JSX {
  interface IntrinsicElements {
    board: Record<string, unknown>
    chip: Record<string, unknown>
    trace: Record<string, unknown>
    hole: Record<string, unknown>
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      board: Record<string, unknown>
      chip: Record<string, unknown>
      trace: Record<string, unknown>
      hole: Record<string, unknown>
    }
  }
}
