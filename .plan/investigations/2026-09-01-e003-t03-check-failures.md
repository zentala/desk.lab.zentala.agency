# Investigation: E003-T03 check failures

## Attempt 1 — JSX type surface

- **Hypothesis:** the new TS Circuit primitives would typecheck through the
  repository's local JSX declarations.
- **Action:** ran `npm run check` after adding mechanical annotations and test
  points.
- **Result:** failed during typecheck because the declaration file listed only
  the four original primitives.
- **Learned:** local declarations must use `@tscircuit/props` types and enumerate
  every supported intrinsic element.

## Attempt 2 — keepout runtime name

- **Hypothesis:** the props package name `<pcbkeepout>` matched the pinned core
  runtime catalogue.
- **Action:** reran `npm run check` with typed JSX declarations.
- **Result:** proof rendering rejected `pcbkeepout` as unregistered.
- **Learned:** pinned core `0.0.1816` registers `<keepout>` while its prop type is
  still named `PcbKeepoutProps`.

## Attempt 3 — manifest source hashing

- **Hypothesis:** adding `src/design-assumptions.json` to `sourcePaths` would only
  hash it as provenance.
- **Action:** reran the complete check after fixing the runtime element name.
- **Result:** manifest generation tried to validate the assumptions object as a
  Circuit JSON array.
- **Learned:** `sourcePaths.map(describe)` passes the array index as the second
  `checkFormat` argument. Use an explicit one-argument callback for sources.
