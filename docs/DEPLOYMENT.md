# Deployment process

The app runs on [Render](https://render.com) as a free web service, connected to this repository. Render deploys automatically every time something is merged into `main`. The service settings are also written down in `render.yaml`.

Anyone on the team should be able to follow these five phases.

## 1. Before

Check these before you merge or deploy anything:

- [ ] The pull request has a green `test` check.
- [ ] `npm ci && npm test` passes on your machine from a clean clone.
- [ ] No secrets in the diff (no `.env`, no tokens, no keys).
- [ ] You know which commit is live right now (Render dashboard → service → Events). If the deploy goes bad, that's the one you go back to.
- [ ] If the app needs a new environment variable, it's added in the Render dashboard first (Environment tab), not in the code.

## 2. Deploy

1. Merge the pull request into `main` (Squash and merge or Merge commit, both are fine).
2. Render sees the push and starts a new deploy by itself. It runs `npm ci`, then `npm start`.
3. Watch it in the Render dashboard → service → **Events** / **Logs** until it says **Live**.

Manual deploy (if auto deploy is off or stuck): Render dashboard → **Manual Deploy** → **Deploy latest commit**.

## 3. Verify

Do all of these once the deploy says Live:

1. Health check:
   ```bash
   curl -s https://REPLACE-WITH-YOUR-RENDER-URL.onrender.com/health
   ```
   Expected: `{"status":"ok","version":"..."}`
2. Open the site in the browser. Add a task, mark it done, delete it.
3. Look at the Render logs for errors.

Note: on the free plan the service sleeps after about 15 minutes without traffic, so the first request can take up to a minute. That's normal, wait and try again.

If any check fails, go to phase 4.

## 4. Roll back

Option A (fastest): Render dashboard → service → **Events** → find the last good deploy → **Rollback**. This puts the old version live without a new build.

Option B (keeps git in sync): revert the bad change in git and let Render deploy it.

```bash
git checkout main && git pull
git revert <bad-commit-sha>        # or -m 1 <sha> for a merge commit
git checkout -b revert-bad-change
git push -u origin revert-bad-change
```

Open a pull request, wait for CI, merge. Render deploys the revert.

If you used option A, auto deploy may pause until you re-enable it or push a fix. Check the dashboard.

After rolling back, run the checks from phase 3 again.

## 5. Record

Every deploy or rollback gets a line in the table below and an entry in `docs/DEV_LOG.md` if something interesting happened.

| Date | Commit / PR | Who | Result | Notes |
|------|-------------|-----|--------|-------|
| YYYY-MM-DD | #__ (`abc1234`) | name | OK / rolled back | what you checked, any problems |

## Clean up

When the assignment is graded and you don't need the app anymore, delete the Render service (Dashboard → service → Settings → Delete Service). The brief asks for unused cloud resources to be deleted.
