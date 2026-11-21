# Merge rules

## Settings used on `main`

GitHub → repository → **Settings → Branches → Add branch ruleset** (or *Add classic branch protection rule*), target branch `main`:

- [x] Require a pull request before merging
  - [x] Required approvals: **1**
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
  - Required check: **`test`** (the job name in `.github/workflows/ci.yml`. It only shows up in the list after the workflow has run at least once.)
- [x] Block force pushes
- [x] Restrict deletions

Add a screenshot of the settings page here: `docs/img/branch-protection.png`

> Note: GitHub free plan allows branch protection on **public** repos. On a private repo you need GitHub Pro/Team, or a student pack. Make the repo public if rules are unavailable.
> Note: you can't approve your own pull request, so the teammate must be the reviewer.

## Blocked pull request (evidence)

Fill this in with the real pull request. Steps to produce it:

1. `git checkout -b feature/trim-title-bug`
2. In `src/tasks.js`, break something on purpose. For example, in `validateTask` remove `.trim()` from `input.title.trim()`.
3. Commit and push. Open a pull request to `main`.
4. CI runs and the `test` check goes **red** (the "trims the title" test fails). The **Merge** button is blocked. Take a screenshot.
5. Fix it: put `.trim()` back, commit, push to the same branch. CI goes green.
6. Teammate approves, then merge. Take a screenshot of the merged PR.

| Item | Link / screenshot |
|------|-------------------|
| Pull request | `https://github.com/damianolvs/EV4/pull/__` |
| Failing run (red) | `docs/img/pr-blocked.png` |
| Fix commit | `https://github.com/damianolvs/EV4/commit/__` |
| Green run + merged | `docs/img/pr-merged.png` |

What happened: _write 2 or 3 sentences here, in your words._
