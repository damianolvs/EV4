# Task Tracker

A small task tracker web app (Node.js + Express). Built for Integral Web Development, Unit 4, Evidence 4: test and release a web app.

**Live app:** `https://REPLACE-WITH-YOUR-RENDER-URL.onrender.com`
**Health check:** `https://REPLACE-WITH-YOUR-RENDER-URL.onrender.com/health`

## What it does

You can add tasks with a priority (low, medium, high), mark them done, delete them, and see how many are finished. Data is kept in memory, so it resets when the server restarts. That's fine for this assignment.

## Requirements

- Node.js 20 or newer (22 recommended)
- npm

## Install

```bash
git clone https://github.com/REPLACE-USER/REPLACE-REPO.git
cd REPLACE-REPO
npm ci
```

## Run

```bash
npm start
```

Open http://localhost:3000. To use another port: `PORT=4000 npm start`. See `.env.example`.

## Test

```bash
npm test
```

This runs the unit tests (validation, stats, store) and the API tests with Node's built-in test runner. No extra tools are needed.

## API

| Method | Route | What it does |
|--------|-------|--------------|
| GET | `/health` | Returns `{ status: "ok" }` |
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create a task. Body: `{ "title": "...", "priority": "low|medium|high" }` |
| PATCH | `/api/tasks/:id/toggle` | Mark done / not done |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/stats` | Totals and completion percentage |

## Continuous integration

GitHub Actions (`.github/workflows/ci.yml`) runs `npm ci` and `npm test` on every pull request to `main` and on every push to `main`.

## Merge rules

`main` is protected. Changes only get in through a pull request with one approval and a passing `test` check. Details and settings: [docs/BRANCH_PROTECTION.md](docs/BRANCH_PROTECTION.md). The blocked pull request is documented there too.

## Deploy

The app is deployed on Render from `main`. Full process (before, deploy, verify, roll back, record): [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Development log

See [docs/DEV_LOG.md](docs/DEV_LOG.md).

## Secrets

No passwords, tokens or keys are stored in this repository. `.env` files are ignored by git.

## Team

- REPLACE: member 1
- REPLACE: member 2
