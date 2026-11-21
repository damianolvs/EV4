# Development log

Rule: every entry needs a date, what we did, why, evidence (commit link or screenshot), and problems with fixes. Minimum 8 entries. Only write what actually happened.

The first entries are filled in from the initial setup. Replace the `REPLACE` parts with your real links and add your own details. Delete the template at the bottom when you're done.

---

### 1. 2026-11-20: Project setup and first app version
- **What:** Created the Express app (`src/app.js`, `src/tasks.js`, `src/server.js`) and a simple page in `public/index.html`.
- **Why:** We needed a small app with real logic (validation, stats) so the tests mean something.
- **Evidence:** commit `aec35a8` → https://github.com/damianolvs/EV4/commit/aec35a8
- **Problems / fixes:** None.

### 2. 2026-11-20: Unit and API tests
- **What:** Wrote 20 tests in `test/` using Node's built-in test runner: normal, edge (max title length, empty list) and invalid cases (empty title, bad priority, bad JSON, missing id).
- **Why:** The brief asks for at least five meaningful tests with normal, edge and invalid cases.
- **Evidence:** commit `aec35a8`; screenshot of `npm test` output: `docs/img/npm-test.png`
- **Problems / fixes:** `node --test test/` failed with `MODULE_NOT_FOUND` because Node 22 treated `test/` as a file. Changed the script to plain `node --test`, which finds the test files by itself.

### 3. 2026-11-__: GitHub Actions CI
- **What:** Added `.github/workflows/ci.yml` (runs `npm ci` and `npm test` on pull requests and pushes to `main`).
- **Why:** Tests need to run automatically on every pull request.
- **Evidence:** REPLACE (link to the green run in the Actions tab)
- **Problems / fixes:** REPLACE (or "None")

### 4. 2026-11-__: Branch protection on main
- **What:** Turned on the rules: pull request required, `test` check required, no bypass. No approval rule because I'm the only developer.
- **Why:** So nothing reaches `main` without review and passing tests.
- **Evidence:** `docs/img/branch-protection.png`
- **Problems / fixes:** REPLACE (for example: the `test` check wasn't in the list until CI had run once)

### 5. 2026-11-__: Blocked pull request
- **What:** Opened a PR with a deliberate bug; CI failed and the merge was blocked. Fixed it, CI went green and I merged.
- **Why:** The brief asks us to document a PR blocked by a failing test.
- **Evidence:** see `docs/BRANCH_PROTECTION.md` (PR link + screenshots)
- **Problems / fixes:** REPLACE

### 6. 2026-11-__: Deployment docs
- **What:** Wrote `docs/DEPLOYMENT.md` (before, deploy, verify, roll back, record) and `render.yaml`.
- **Why:** A teammate should be able to deploy without asking us.
- **Evidence:** REPLACE commit link
- **Problems / fixes:** REPLACE

### 7. 2026-11-__: First deploy to Render
- **What:** Connected the repo to Render, deployed, checked `/health` and the UI.
- **Why:** The brief asks for a working deploy path.
- **Evidence:** screenshot of the live app + Render "Live" status; URL
- **Problems / fixes:** REPLACE (for example: free plan sleeps, first request is slow)

### 8. 2026-11-__: Rollback test
- **What:** Practiced the rollback from `DEPLOYMENT.md` and wrote it in the record table.
- **Why:** To prove the rollback phase really works.
- **Evidence:** screenshot of Render Events + the record table row
- **Problems / fixes:** REPLACE

### 9. 2026-11-__: Final check and cleanup
- **What:** Cloned the repo fresh, ran `npm ci && npm test`, opened the link in a private window, deleted unused cloud resources.
- **Why:** Checklist from the brief.
- **Evidence:** REPLACE
- **Problems / fixes:** REPLACE

---

## Template

### N. YYYY-MM-DD: Title
- **What:**
- **Why:**
- **Evidence:**
- **Problems / fixes:**
