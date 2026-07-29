# E001 — Journal

Live findings + session summaries. See [live-logging] rhythm: findings real-time, summary at `done.`.

## Session 2026-07-28 — epic formalized

- **Goal:** turn the approved-but-unwritten E001 plan into a proper epic file set, and
  capture the owner's refined article framing.
- **Done:** `PLAN.md`, `ORCHESTRATOR.md`, `IMPRO.md`, `JOURNAL.md`, `tasks/E001-T01..T21`,
  `reports/README.md`; linked from `.plan/BACKLOG.md`.
- **Decisions:**
  - Article language: **English** (owner).
  - Article framing narrowed: it is about *conclusions + next steps*, **not** about building an
    un-copyable moat. The May "protocol/standard is the real product" + data-monetization angle
    is deliberately excluded — shown only as the position the owner moved away from.
  - New reality since the 2026-07-15 plan: **the W2 hardware (RP2040-Tiny + VL53L0X over USB) is
    being built now.** The article's closing section reflects this in-progress status.
- **Next:** owner to answer §Blockers (`lab` vs `labs`, is any measured number real). Then draft
  the article MDX (T15 content), then execute Wave 1.

## Session 2026-07-28 — split into E001 (infra) + E002 (content)

- **Why:** the owner judged E001 too broad (*"Podziel E001/E002"*). Infra plumbing and the
  portfolio/article are independent concerns with different acceptance criteria.
- **Done:** E001 rescoped to infra only — `PLAN.md` and `ORCHESTRATOR.md` rewritten, tasks reduced
  from T01–T21 to **T01–T13** (old T14–T21 deleted; article/content tasks moved out). Added
  `.plan/ROADMAP.md` (program map). Created **[E002](../../E002-2026-07-28-status-report/PLAN.md)**
  with its own PLAN/ORCHESTRATOR/JOURNAL/IMPRO + T01–T10.
- **Cross-epic:** E001-T08 (funnel → `/lp`) pairs with E002-T07 (report at `/`); E001-T11/T12
  (drop `legacy-source`, cutover) depend on E002 content being live.
- **Correction:** product code lives in a **separate existing repo** (owner) — not created here;
  the old "`smart-desk` does not exist yet" note is retired.

## Session 2026-07-29 — T01 merge rehearsal

- **Goal:** rehearse `git merge master` into `dev` in a throwaway worktree and document the
  real conflict set before T02 touches a real branch.
- **Method:** `git worktree add --detach .claude/worktrees/E001-T01-merge-rehearsal dev`,
  `git merge --no-commit --no-ff master`, inspect, `merge --abort`, `worktree remove`.
- **Result:** merge is far smaller than planned. **Two conflicts, not five.**
- **Next:** T02 can proceed; see the two findings below for what changes in T02 and T04.

## Finding 2026-07-29 — the conflict set is `.gitignore` + `CLAUDE.md`, nothing else

Expected (PLAN/T01): conflicts in `CNAME`, `README.md`, `CLAUDE.md`, `.editorconfig`, `.gitignore`.
Actual, from `git ls-files -u` / `--diff-filter=U`:

| File | State | Note |
|---|---|---|
| `.gitignore` | `UU` | dev's hook-artifact + worktree blocks vs. master's `astro/dist,.astro,node_modules` block |
| `CLAUDE.md` | `AA` | both branches added their own: dev 144 lines (two-track), master 70 lines (stage-1 static) |
| `CNAME` | clean | takes master's value → **`desk.labs.zentala.agency`**, already the canonical one |

`README.md` and `.editorconfig` do not conflict at all. Merge-base is exactly `e1a248e` on both
sides (`git merge-base --is-ancestor` → 0), so a plain `git merge` is right — no
`--allow-unrelated-histories`, as planned.

→ **T02 resolution recommendations** (decide there, do not auto-apply):
  - `.gitignore` — take dev's version. Master's three `astro/*` entries exist only to keep
    master's working tree clean when switching branches; `astro/.gitignore` on dev already
    covers them, and the reason dies with the `master` freeze (T12).
  - `CLAUDE.md` — keep dev's as the root file. Master's is **newer than** dev's snapshot
    `legacy/CLAUDE.root-original.md` (77 insertions / 49 deletions apart — it is commit
    `40dba8b` "replace fictional CLAUDE.md with verified facts", which never reached dev).
    Land master's side as the refreshed `legacy/CLAUDE.root-original.md` instead of discarding it.

## Finding 2026-07-29 — master brings no assets; T04's premise is wrong

`git diff --name-status dev...master` returns exactly three paths: `.gitignore`, `CLAUDE.md`,
`CNAME`. The static-site assets (`index.html`, `style.css`, `images/`, `enclosure/`) are **not**
incoming adds — they predate the split, arriving from the shared ancestor `e1a248e`, and dev
already carries them under `legacy/` (moved by `a6d5b58` "split legacy site from astro app").
The merge keeps dev's rename; nothing is re-added at the root.

→ **[T04](tasks/E001-T04.md) must be rewritten.** There is nothing to "move master's assets into
the app". The real work is: rename the existing `legacy/` → `astro/legacy-source/` and copy the
images the app actually uses into `astro/public/`. Same for T07 — the raw JPEGs to strip live at
`legacy/images/`, not at a root `images/`.

## Finding 2026-07-29 — the 6 raw JPEGs are tracked twice, 19.7 MB per copy

`legacy/images/` and `astro/public/images/` each hold **11 files, byte-identical** (`git rev-parse`
on every blob pair returns the same SHA), 19.7 MB per directory — ~40 MB of the repo is one set of
photos stored twice. The `legacy/` split (`a6d5b58`) copied rather than moved.

→ [T04](tasks/E001-T04.md) now owns the dedup, and must run **before** [T07](tasks/E001-T07.md) —
otherwise EXIF stripping happens twice and the CI gate has to watch two paths for the same photos.

→ Blocker 1 (canonical domain) is already closed in the tree, not just on paper: master's `CNAME`
holds `desk.labs.zentala.agency` since `e4f3087`, and it merges in clean. **[T05](tasks/E001-T05.md)
shrinks to deleting the root `CNAME`** once GitHub Pages is retired.
