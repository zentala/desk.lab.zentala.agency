# desk.zentala.io Tasks

## Current Status

- The actively developed website lives in `astro/`.
- The older static website has been moved into `legacy/`.
- The Astro build works locally, but the Astro website is not yet confirmed as the live production site.
- The repository structure is now separated, but deployment and some documentation decisions are still unresolved.

## Immediate Priorities

### 1. Repository split and cleanup

- [x] Move the old root website into `legacy/`.
- [x] Define the repository structure for two tracks:
  - legacy website in `legacy/`
  - new Astro website in `astro/`
- [x] Move old root-website documentation into legacy-focused docs.
- [ ] Mark every remaining old root-website reference as legacy in docs.
- [x] Make `astro/` the clearly documented active product surface.
- [ ] Decide whether the root website stays as archival source, fallback deployable site, or migration input only.

### 2. Deployment clarification

- [ ] Confirm what is currently live on `desk.zentala.io`.
- [ ] Confirm whether the Astro site is deployed anywhere right now.
- [ ] If Astro is not production-ready, define a temporary preview target such as `dev.desk.zentala.io` or `demo.desk.zentala.io`.
- [ ] Align GitHub workflow, docs, and domain strategy with the real deployment model.

### 3. Documentation repair

- [x] Rewrite the root `README.md` so it explains the dual-state repository.
- [x] Remove or rewrite starter docs in `astro/README.md`.
- [x] Update agent-facing docs so they describe the current state instead of the historical one.
- [x] Add a short architecture note describing legacy root site vs active Astro app.

### 4. Product integration

- [ ] Replace the placeholder waitlist flow with a real backend or a documented temporary capture flow.
- [ ] Stop reporting false-positive signup success on waitlist submission errors.
- [ ] Audit placeholder content such as testimonials, metrics, and OG image references.

### 5. Quality pipeline

- [ ] Add linting and a documented code-quality workflow for `astro/`.
- [ ] Add unit tests for shared logic and critical UI behavior.
- [ ] Add end-to-end coverage for the landing page and waitlist flow.
- [ ] Define the minimum DX pipeline: install, lint, build, test, preview.

## Recommended Order

1. Separate legacy vs Astro in repo structure and docs.
2. Clarify deployment target and preview domain.
3. Repair documentation to match reality.
4. Implement real waitlist behavior.
5. Add tests and DX pipeline.
