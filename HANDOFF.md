# HANDOFF — session 2026-07-15

Full context dump. Read this before touching anything. Nothing below is speculation —
every claim was verified this session against the repo.

**Where work stopped:** the plan for E001 (site rebuild) is approved but **the epic files
and the article were not written yet**. That is the next session's first job. See
[What to do next](#what-to-do-next).

---

## 1. What happened this session

### 1.1 Five docs commits moved from `master` to `dev`

They were committed to `master` by mistake. Moved by cherry-pick onto `dev`; `master` was
reset to its base and force-pushed.

| Was on master | Now on dev |
|---|---|
| `fd776dd` docs: add strategic vision, research and session handoff | `40c7a07` |
| `a015594` docs: add notification algorithm, repo architecture and firmware spec | `c00a102` |
| `9e0fb70` docs: rewrite CLAUDE.md with full project context | `5f70994` |
| `f0c218a` chore: add standalone data logger task | `8bb30b5` |
| `cbb93ec` docs: add PRD, sensor-daemon architecture | `501f7a7` |

`research/**` and `PRD.md` are byte-identical to the originals (verified with `git diff`).

**`TASKS.md` and `CLAUDE.md` were hand-merged** — the two branches had grown separate,
incompatible versions of both (one describing the website, one describing the product).
They are now two-track documents covering both. This was the only place where editorial
judgement was applied; review it if something reads wrong.

**Backup:** tag `backup/master-pre-move` → `51839b5` (local only, unpushed). Safe to delete
once the above is confirmed good.

### 1.2 A force-push nearly destroyed an unrelated commit

`--force-with-lease` rejected the first push because `origin/master` had gained
`51839b5 "Update CNAME"` (made via GitHub web UI on 2026-07-07), which changed the domain
to `desk.lab.zentala.agency`. A plain `--force` would have deleted it silently. It was
rebased onto master's new base and survives as `5e72388`.

**Lesson worth keeping: always `--force-with-lease`, never `--force`.**

### 1.3 The Astro deploy had been broken since inception

`@astrojs/tailwind@6` pins peer `tailwindcss@^3`; the project runs `tailwindcss@4`. So
`npm ci` failed with ERESOLVE — and the Cloudflare workflow runs exactly `npm ci`. **The
site had never once deployed.** The package was dead weight (unused; `astro.config.mjs`
even says Tailwind v4 needs no integration). Removed → build is green, 4 pages, ~2s.

### 1.4 The site was pointed at a preview domain and closed to indexing

All 19 references to the abandoned `desk.zentala.io` were repointed to
`lp.desk.labs.zentala.agency`, and the app was made `noindex` (`robots.txt` `Disallow: /`
+ meta on all three page templates). **This is now temporary** — see §4 and the noindex
inversion in §5.

Side effect to fix later: the blanket rename turned the waitlist endpoint into
`waitlist.lp.desk.labs.zentala.agency/api/signup`, which is nonsense (the old host was
dead too — the form reports success on failure regardless). Tracked in `TASKS.md`.

### 1.5 `astro-desk` mystery — resolved, nothing was lost

`astro-desk` was **never in this repo**. It was an accidental gitlink
(`160000 commit 97939bf…`) with **no `.gitmodules`** — someone `git add`ed a directory
containing its own `.git/`. The object `97939bf` does not exist here; for anyone cloning,
the directory was always empty. Cursor Agent removed the dead pointer on 2025-07-01
(`1 file changed, 1 deletion`). The code only ever existed on one machine's disk.
`astro/` on `dev` is a real, tracked directory — the proper rebuild.

---

## 2. Current repo state

```
master  5e72388  Update CNAME          ← LIVE on GitHub Pages @ desk.lab.zentala.agency
                                         Static Bootstrap site: index.html + style.css
                                         + images/ + enclosure/v1. FROZEN — do not commit.
dev     fe1ae01  (3 commits unpushed)  ← Everything real: astro/, legacy/, research/,
                                         PRD.md, .plan/, .arch/, CI
```

**Unpushed on `dev`:** `a8948d2` (dep fix), `d56cb83` (domain + noindex), `fe1ae01` (STATE.md)
— plus whatever this handoff commit adds. **Pushing triggers a public Cloudflare deploy.**

**Two branches = two different websites.** This is the root cause of nearly every problem
above and is what E001 exists to end.

### The product track has zero code

`PRD.md` + `research/**` are fully designed. The `smart-desk` repo does not exist. Priority
#1 in `TASKS.md` remains: build the sensor-daemon and collect 30 days of your own data
before writing anything else.

---

## 3. Decisions made this session (fixed — do not relitigate)

| # | Decision |
|---|---|
| 1 | **One Astro app, one domain.** No second app, no `lp.` subdomain, no second Cloudflare project. |
| 2 | Homepage `/` becomes the **project status report**. |
| 3 | The **pre-order funnel moves to `/lp`**, unchanged, **gated behind Cloudflare Access** (owner's email only). Not deleted. |
| 4 | Language: **English**. |
| 5 | Article form: **engineering report with explicit decision records** (Context → Considered → Rejected → Why → Decision → Trade-off → Mitigation). |
| 6 | **BOM stays, with its images** (13 of 14 are vendor hotlinks — accepted rot risk). |
| 7 | Audience is **CTOs / eng directors / hiring managers**. The site is a portfolio of *thinking*, to help land a senior/lead/product/architect role — not a product page. |
| 8 | Repo consolidates to **one branch**; `master` gets frozen, not deleted. |

---

## 4. The site today, honestly

`npm run build` in `astro/` → green. `npm run preview` → `localhost:4321`.

**It cannot go public as-is.** It fabricates:

- **Invented testimonials** — `src/components/SocialProof.tsx` (Marcus W./Lisa K./Erik N.).
  Marked `TEMPLATE` in code; renders as real. There are no users.
- **Invented results** — the "Real Results" 8% → 22% table in the same file, presented as
  measured.
- **Fake scarcity** — `public/preorder-count.json` hardcodes `{basic: 34, pro: 12, founder: 5}`
  → renders "Only 166 spots left", "Total raised: €3,359".
- **Placeholder payments** — `STRIPE_LINKS` in `Pricing.tsx` → `checkout.stripe.com/placeholder-*` (404).

**Decision 3 (Access gate) is the mitigation.** Once `/lp` needs a login, none of this is
public. The `TASKS.md` → *Pre-launch blockers* list stays valid, but its meaning changes:
those are now conditions on **ever un-gating `/lp`**, not on shipping the site.

The site also contradicts `PRD.md`: it sells a cloud subscription, smartwatch integration
and a phone display — all three explicitly ruled out in the PRD — plus `VL53L1X` where the
spec says `VL53L0X`.

---

## 5. Approved plan — E001 site rebuild

Full plan: `~/.claude/plans/strona-ma-by-artyku-em-keen-hopcroft.md` (outside the repo).
Summary below is sufficient to execute.

**Epic folder:** `.plan/epics/E001-2026-07-15-site-rebuild/`
**Files:** `PLAN.md`, `ORCHESTRATOR.md`, `IMPRO.md`, `JOURNAL.md`, `tasks/`, `reports/`
**Must be linked from** `.plan/BACKLOG.md` (docs-linking rule). Next free epic number is
**E001** (only `E000-maintenance` exists).

### Wave 1 — consolidation (sequential)

`master` and `dev` share ancestor `e1a248e`, so this is a **plain `git merge master`** — no
`--allow-unrelated-histories`, no subtree merge. `dev` has no competing
`index.html`/`style.css`/`images/`/`enclosure/` paths, so they land as clean adds with
history intact.

- **T01** Rehearse the merge in a throwaway worktree; document conflicts (expected: `CNAME`,
  `README.md`, `CLAUDE.md`, `.editorconfig`, `.gitignore`).
- **T02** Merge on branch `consolidate/site-rebuild`. **Resolve by hand — never `--ours`/`--theirs`
  wholesale.** (This session that shortcut was correctly blocked; it is how work gets lost.)
- **T03** Rescue `legacy/notes/*.md`, then `git rm -r legacy/` — it is a hand-copied,
  history-disconnected duplicate of master's content.
- **T04** `images/` → `astro/src/assets/`, `enclosure/` → `astro/public/enclosure/`, keep
  `index.html` as `astro/legacy-source/` for a parity check.
- **T05** Resolve canonical domain (**blocked**); delete root `CNAME` (GitHub Pages mechanism;
  Cloudflare Pages ignores it).
- **T06** `.arch/ARCHITECTURE.md` → `.plan/ARCH.md`; update `STATE.md`/`BACKLOG.md`/`CLAUDE.md`/`TASKS.md`.

### Wave 2 — app changes (T08/T09 parallelizable)

- **T07** Add `@astrojs/mdx` + `mdx()`; widen content glob to `**/*.{md,mdx}`. **Do not** re-add
  `@astrojs/tailwind`.
- **T08** Write `astro/design.md` — long-form type scale (65–75ch measure), DecisionRecord spec,
  figure/caption spec, status/version header spec, and **explicit restraint rules**: no pricing,
  no CTAs, no scarcity, no brand-green glow on the report. The funnel lives one import away;
  this doc is the guardrail.
- **T09** EXIF/GPS strip + downscale the 6 raw phone JPEGs.
- **T10** Add an `updates` collection to `src/content.config.ts`: real `z.coerce.date()` (unlike
  `blog`'s string dates) + `version`/`status`/`supersedes`.
- **T11** Revive + re-theme the `ui/` primitives.
- **T12** `DecisionRecord` MDX component.
- **T13** Status/version header component.
- **T14** Move funnel `src/pages/index.astro` → `src/pages/lp/index.astro`; report takes `/`.
  **Invert noindex**: keep it on `/lp` only, remove elsewhere, restore `robots.txt` to `Allow: /`.

### Wave 3 — content + cutover

- **T15** Article → `astro/src/content/updates/`, wire components.
- **T16** Standing pages: Mission → `/about`, BOM → `/hardware`, `/licensing`, `/roadmap`.
- **T17** Nav/footer/RSS for `updates`.
- **T18** **Cloudflare Access** on `/lp*`, owner's email only. Verify a logged-out browser gets
  challenged. (`cloudflare-one` skill covers this.)
- **T19** Delete `astro/legacy-source/` after parity check.
- **T20** CI: one job, one project (`desk-zentala-io`), builds `astro/`; drop the `master` trigger.
- **T21** Cutover **without going dark** — `desk.lab.zentala.agency` is live on GH Pages *now*:
  verify on `*.pages.dev` → add custom domain → flip DNS (instant, instantly revertible) → wait
  24–48h → **disable GH Pages in repo settings** (DNS alone leaves `*.github.io` serving forever)
  → tag `archive/master-static-site-final`, freeze `master`.

### Test strategy

Release-blocking: **(1)** no GPS/EXIF on any committed image (scripted CI gate, not a one-time
pass); **(2)** `noindex` on `/lp` and absent from every public page; **(3)** `/lp` challenges when
logged out.

Quality: `astro build` exits 0 · internal link check · orphan-image scan · per-image budget
(~500 KB) · RSS parses · Lighthouse/a11y on home + article + hardware.

Not tested: prose quality — the five editorial questions in `legacy/notes/article-draft.md` are
the manual review checklist.

---

## 6. The article (not written yet)

**Draft path:** `.plan/epics/E001-2026-07-15-site-rebuild/reports/2026-07-15-status-update-v0.2.mdx`
**Frontmatter:** `title`, `description`, `version: "0.2"`, `statusDate: 2026-07-15`,
`status: current`, `supersedes` (empty), `tags`.

**Structure:** Context → What v0.1 actually did → Evidence → **Decision 1: split into modules**
→ **Decision 2: radical reduction to two components** → What I got wrong → Open questions.

**Decision 2's substance:** RP2040-Tiny + VL53L0X over USB, everything delegated to the computer.
*Trade-off:* breaks when you switch machines or have a company laptop you cannot or will not plug
a sensor into. *Mitigation:* flash your own sensor — you don't have to buy it from me.
*Justification:* cost-effectiveness beat the alternative, in hardware and in the owner's own labour.

### The arc that makes it worth publishing

**Decision 1 and Decision 2 contradict each other, and that is the point.**
`src/data/postmortem.ts` still asserts *"Protocol standardization is the real product"* — the May
position (MQTT, Home Assistant, open protocol, mDNS). The current position is the opposite: the
sensor plugs into the computer, and **UX is the real product**. The owner's words: *"wtedy
wymyśliłem, że to jest dobry pomysł, a teraz w ogóle nie podchodzę do tego w ten sposób"*.
Showing that reversal, with reasoning, is exactly the evidence the audience came for. **The article
must supersede that claim, not quietly copy it.**

Note the tension inside the source notes: the diagnosis is *"v0.1 was over-engineered"*, yet the
proposed v2 there is a modular MQTT ecosystem with an open standard — arguably the same trap in a
new costume. Decision 2 is the escape.

### Two corrections to the source material (verified)

- The notes say the desk controller *"never happened — the contractor did not deliver"*. **The
  photos show otherwise**: the PCB physically exists and is partially assembled — Arduino Pro Micro,
  SN74HC595 shift register, 3-digit 7-segment display, silkscreen reads `© 2023 Pawel Zentala`. The
  accurate claim is *"it was built and never finished or integrated"*. For an article about
  decision-making, that distinction matters.
- `20230628_033806.jpg` and `20230628_043425.jpg` (User Panel) are the **only uncaptioned images**
  — their `<figcaption>`s are commented out in `master:index.html`. Captions can be written from
  direct inspection; no need to ask what is in them.

---

## 7. Assets — what exists and must be reused

**An earlier abandoned attempt already built most of the article scaffolding. It sits orphaned
with zero imports. Do not rewrite it.**

| Asset | State | Use |
|---|---|---|
| `astro/src/data/postmortem.ts` | **English, structured Worked/Failed/Learned** | Evidence + "What I got wrong" |
| `astro/src/data/stats.ts` | **Real, honest numbers** (`~700 PLN / 200 USD`, `W1 archived`) | Status header |
| `astro/src/data/parts.ts` | 16 typed BOM entries + vendor links | The kept BOM |
| `astro/src/components/ui/{Section,SectionHeader,InfoCard,StatCard,FigureSwap}.tsx` | Structure good, theming broken | Article primitives |
| `astro/src/components/{HardwareAppendix,PostMortem,Stats,Goals,Licensing,Software,Architecture,Background}.tsx` | Same | Standing sections |
| `legacy/notes/article-draft.md` | Polish; 10 sections + 5 open editorial questions | Primary article source |
| `legacy/notes/voice-stream.md` | Polish; adds work rhythms (45/10 → 30/10 → 15), scoring | Source |
| `.cursor/vision/0001-NOTE-init.md` | Raw Polish transcript, ~19 KB | **Richest source** for Decision 2 |

**Caveat:** every revived component references tokens that **do not exist** — `text-ink`, `.card`,
`shadow-soft`, `bg-fog` (themed for an abandoned light design). `astro/src/styles/global.css`
defines only `--color-dark-*`, `--color-brand-green*`, `--color-muted`, `--shadow-glow`,
`--shadow-card`. Re-theming needed; structure is not.

**Also verified:** `@astrojs/mdx` is **not installed** and the content glob is `**/*.md` only — MDX
needs both. `@tailwindcss/typography` is **not installed** either, yet `BlogPost.astro` uses
`prose prose-invert prose-lg` — those classes are **dead no-ops**; real typography is hand-rolled
arbitrary variants (`[&_h2]`, `[&_p]`…) in that layout. `astro:assets`/`<Image />` is used nowhere —
no image optimization exists.

**Master's images:** 11 files, 20 MB. The 6 raw phone JPEGs (`20230628_*.jpg`) are ~19 MB of it —
3472×3472 or 4624×2084, displayed at a few hundred px, **carrying home GPS coordinates in EXIF**.
7 of 9 project photos already have good author-written captions worth lifting verbatim.

---

## 8. Blockers — owner decisions required

1. **Canonical domain.** Three strings live in the repo: `desk.lab.zentala.agency` (master CNAME,
   singular, **currently serving**), `desk.zentala.io` (abandoned zone), `lp.desk.labs.zentala.agency`
   (app config, **plural**). `lab` vs `labs` is unresolved. Blocks T05/T21.
2. **Are the numbers real?** If a measured figure enters the article (e.g. "8% standing time" from
   the funnel's Story section), it must be genuinely measured — the neighbouring "Real Results" table
   is fabricated. **For a credibility piece aimed at CTOs, one invented number is fatal.** Confirm or cut.
3. **Analytics.** `master` runs Google Analytics (`G-BZ6M9DBGYJ`); the app runs Plausible. One app
   now — pick one.
4. **Push `dev`?** 3+ commits unpushed; pushing deploys publicly (to `*.pages.dev`; the custom domain
   is not wired).
5. **Repo has moved.** GitHub answers every push with *"This repository moved to
   desk.lab.zentala.agency"* — the remote URL still says `desk.zentala.io.git`. Update it.

---

## What to do next

1. Answer the blockers in §8 (at minimum: `lab` vs `labs`, and whether "8%" is real).
2. Write the **E001 epic** file set → §5.
3. Write the **article MDX** → §6. Sources in §7. Translate and restructure; **do not invent**.
4. Then execute Wave 1.

**Parked by the owner:** shrinking images on the master page and improving it in place — superseded
by E001. The `/impro` and `.plan/IMPROVEMENTS.md` backlog is untouched.
