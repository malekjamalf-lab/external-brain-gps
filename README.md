# EXTERNAL BRAIN GPS (installable web app)

Static PWA. No build step on the server, and no project data inside these files.

- Open `index.html`. On first run it asks for a read-only GitHub key (Contents: Read, Pull requests: Read, this repository only). The founder creates the key; it stays in the phone's storage (`eb_gh_token_v1`) and is sent only to api.github.com.
- It reads `main` only, GET only: `ROOT.md`, `brain/STATE.md`, `brain/routes/` (`routes.json` and the route files), `brain/experiences/`, `brain/traces/`, `brain/tools/`, `brain/lessons/LESSONS.md`, and the open pull requests. Files are cached by blob sha; `main` is re-checked every 30 s while the app is open.
- Missions on the map are the traces in `brain/traces/`; counters and route status come from `brain/routes/routes.json`; experiences from `brain/experiences/`; the plan from `brain/STATE.md` and the open PRs.
- Send: the text is copied first, then the saved room link opens. Paste: an `eb-proof` reply is graded against main, an `eb-trace/v1` JSON is drawn on the map as REPORTED, anything else joins its thread.
- No write key exists in the app, and it never writes anywhere.
- `sw.js` caches the app shell for offline use; GitHub API calls are never cached by it.
