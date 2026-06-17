# Environment Issues Report

Date: 2026-05-24
Repository: `C:\code\desk.zentala.io`

## Summary

This session exposed multiple environment-level problems unrelated to the application code itself.
Several operations failed because of shell profile side effects, filesystem permission issues, Git index locking restrictions, and Vite cache access problems on Windows.

## Issue 1: PowerShell profile side effects

### Symptoms

Early shell commands produced unrelated startup noise before command output:

- `Show-SystemStats ... Cannot access system information`
- `Export-Clixml ... Access to the path ... is denied`

### Impact

- Polluted command output
- Made repository inspection harder
- Added noise that looked like project failures but was actually shell-profile behavior

### Workaround used

- Ran later PowerShell commands with `login: false`

### Likely scope

- Local shell environment
- Not specific to this repository

## Issue 2: File move failures in workspace

### Symptoms

Direct `Move-Item` operations from repository root into `legacy/` failed with:

- `Access to the path is denied`

Affected paths included:

- `index.html`
- `style.css`
- `images/`
- `enclosure/`
- `notes/`

### Impact

- Could not perform a straightforward directory move
- Forced a copy-then-delete flow instead of a simple rename

### Workaround used

- Copied files into `legacy/`
- Removed original files separately
- Git later recognized the result mostly as renames

### Likely scope

- Workspace/sandbox or Windows file-handle behavior
- Not an application-code issue

## Issue 3: File deletion failures in workspace

### Symptoms

`Remove-Item` on original root files also failed with repeated:

- `Access to the path ... is denied`

This affected both text files and binary assets.

### Impact

- Cleanup after migration was blocked
- Manual follow-up was required

### Workaround used

- Used an escalated deletion step outside the normal sandbox path

### Likely scope

- Filesystem permission/sandbox issue

## Issue 4: `apply_patch` cannot delete binary files

### Symptoms

Attempting to delete moved binary assets with `apply_patch` failed with:

- `invalid utf-8 sequence`

### Impact

- `apply_patch` was unsuitable for removing binary files from the original location

### Workaround used

- Used Git-aware filesystem operations instead

### Likely scope

- Tool limitation
- Expected behavior for binary content

## Issue 5: Git index lock creation blocked inside sandbox

### Symptoms

Normal Git write operations failed repeatedly:

- `git add ...`
- combined `git add && git commit ...`

Error:

- `fatal: Unable to create 'C:/code/desk.zentala.io/.git/index.lock': Permission denied`

### Impact

- Could not stage or commit changes inside the default sandbox
- Repository writes to `.git/` were blocked even though repository reads worked

### Workaround used

- Re-ran Git write operations with escalated permissions

### Likely scope

- Sandbox restriction on writing to Git internals
- Not a repository corruption signal by itself

## Issue 6: Local dev server failed because of Vite cache permissions

### Symptoms

`npm run dev -- --host 127.0.0.1 --port 4321` failed.

Observed errors:

- `[ERROR] [content] spawn EPERM`
- `EPERM: operation not permitted, unlink 'C:\code\desk.zentala.io\astro\node_modules\.vite\deps\@astrojs_react_client__js.js'`

Follow-up cleanup also failed:

- `Remove-Item node_modules\.vite ... Access to the path ... is denied`

### Impact

- Local Astro development server could not be started
- Hot-reload and local browser validation were blocked

### What still worked

- `npm run build` completed successfully

### Likely scope

- Windows file locking or local cache permission issue under `astro/node_modules/.vite`
- Possibly another process holding Vite cache files open

## Issue 7: `.plan/reports/` directory was missing

### Symptoms

Attempt to list report directory failed:

- `Cannot find path 'C:\code\desk.zentala.io\.plan\reports' because it does not exist`

### Impact

- No pre-existing location for formal environment reports

### Resolution

- Created this report under `.plan/reports/`

### Likely scope

- Missing project structure only
- Not an environmental malfunction

## Issue 8: Command quoting mismatch in `cmd`

### Symptoms

A combined `git add && git commit -m "docs(repo): split legacy site from astro app"` invocation was parsed incorrectly in `cmd`, producing:

- `error: pathspec 'split' did not match any file(s) known to git`
- similar pathspec errors for `site`, `from`, and `app`

### Impact

- Commit did not complete on the first escalated attempt

### Workaround used

- Ran `git commit` as a separate command

### Likely scope

- Shell quoting issue in command execution
- Not a repository problem

## Non-issues clarified during debugging

These looked risky at first but were not confirmed as data loss:

- Markdown notes were moved, not lost:
  - `notes/article-draft.md` -> `legacy/notes/article-draft.md`
  - `notes/voice-stream.md` -> `legacy/notes/voice-stream.md`
- The old root `README.md` and `CLAUDE.md` content was restored as archival copies:
  - `legacy/README.root-original.md`
  - `legacy/CLAUDE.root-original.md`
  - `legacy/README.astro-starter-original.md`
- Astro production build remained successful after the repository split

## Recommended next checks

1. Identify which process is locking `astro/node_modules/.vite`
2. Verify whether PowerShell profile startup scripts should be disabled for agent sessions
3. Confirm whether Git writes to `.git/` are always blocked in sandbox or only in this repository
4. Add a standard troubleshooting note for Windows `EPERM` issues in local frontend workflows
5. Consider separate repo-level guidance for sandbox-sensitive operations involving file moves and Vite cache cleanup

## Investigation addendum

Follow-up investigation was run in a clean PowerShell session with `login: false`
to avoid profile side effects. The findings below separate real environment issues
from repository-structure gaps and shell-invocation mistakes.

### Confirmed environment or tool constraints

- PowerShell profile noise is real:
  - startup emitted `Show-SystemStats`, `Export-Clixml`, oh-my-posh, and `fnm`
    permission errors before any repository command ran
  - this is external shell initialization noise, not repo behavior
- Git writes are blocked in the default sandbox:
  - `git add --intent-to-add .plan\reports\2026-05-24-environment-issues.md`
    reproduced `Unable to create ... .git/index.lock: Permission denied`
  - this is consistent with sandbox restrictions on writing Git internals
- Rename and delete operations are blocked in the writable workspace:
  - `Move-Item`, `Rename-Item`, and `Remove-Item` all reproduced `Access to the path is denied`
    even on fresh diagnostic files created during the same session
  - this points to an environment/sandbox limitation rather than application code
- `apply_patch` failing on binary deletions is a real tool limitation:
  - the earlier `invalid utf-8 sequence` result is consistent with the tool
    expecting text content, not arbitrary binary payloads

### Reclassified findings

- Vite `EPERM` is most likely a downstream symptom of the same delete/rename restriction:
  - `npm run build` succeeded
  - `npm run dev -- --host 127.0.0.1 --port 4321` failed only when Vite attempted
    to `unlink` a cache file under `astro/node_modules/.vite/deps/`
  - the target file is not read-only
  - because generic `Remove-Item` also fails in this environment, the stronger
    explanation is workspace deletion restrictions, not a Vite-specific bug
- The `cmd` issue should be narrowed:
  - direct `cmd` execution handled `docs(repo): ...` correctly
  - the failure came from nested quoting across shell layers (`PowerShell` -> `cmd /c`),
    not from `cmd` being broadly broken
- Missing `.plan/reports/` was not an environment issue:
  - it was simply absent before being created
  - this was a repo-structure gap only

### Practical conclusion

The main actionable environmental problems are:

1. shell profile side effects on startup
2. sandbox restrictions on `.git/` writes
3. sandbox restrictions on file rename/delete operations

The Vite failure is best treated as a consequence of item 3 unless reproduced
outside the sandbox in a normal user shell.
