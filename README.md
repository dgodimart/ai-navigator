# ThoughtLab AI City Navigator

Static site benchmarking AI maturity across 200 cities worldwide. Deployed on
Render as a static site with no build step.

```
Client/    original artifact bundle, kept for provenance (do not edit)
site/      the deployable — this is what you edit and what Render publishes
tools/     one-off import + local dev scripts
```

## Quick start

```powershell
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
.\.venv\Scripts\python tools\serve.py
```

Then open http://127.0.0.1:8080. The server logs only non-200 responses, so
silence means a clean load.

Git Bash: `source .venv/Scripts/activate` instead of the PowerShell activation.

## Where the app lives

**`site/index.html` is the source you edit.** Everything is in that one file:
the markup, and a `<script type="text/x-dc">` block near the bottom holding the
data and view logic (`REGIONS`, `CITIES`, `TIERS`, `PILLARS`, `CHAPTERS`,
`FINDINGS`).

Editing is plain text editing — there is no compile step. Save, refresh.

The app runs on a `dc` runtime vendored into `site/assets/js/`: a custom
`<x-dc>` element with `sc-for` / `sc-if` / `{{ }}` templating, plus React 18.
The runtime came with the artifact export and is pinned in the repo, so nothing
is fetched from a CDN at runtime.

### The data is still placeholder

Worth knowing before anyone reads numbers off the screen. Maturity tiers,
scores, and pillar values are deterministic hashes of city names, and most
findings render as `xx%`. Replacing them with real survey results means editing
the `text/x-dc` block in `site/index.html`.

## Deploying

Render publishes `site/` directly — `render.yaml` sets no build command, so
deploys are just a file copy and nothing depends on Python being present in
Render's build image.

1. Push to GitHub.
2. Render → **New** → **Static Site** → connect the repo.
3. It reads `render.yaml`; confirm and deploy.

Pushing to the deployed branch triggers a redeploy.

Asset filenames carry a content hash, so `render.yaml` marks `/assets/*`
immutable for a year while `index.html` stays `no-cache`. A changed asset is
always a changed URL, so clients never hold a stale file.

## Re-importing from a bundle

Only needed if a fresh artifact export arrives. `tools/unbundle.py` converts
one of those self-extracting bundles into `site/`:

```powershell
.\.venv\Scripts\python tools\unbundle.py
```

It clears and regenerates `site/assets/`, rewrites `site/index.html`, and
prints a warning if anything in the output still points off-origin.

**This overwrites `site/index.html`.** Any hand edits are lost, so commit
first.

What it does: decodes the base64+gzip manifest, shrinks oversized images
(`tools/optimize_images.py`), writes assets under content-hashed names, swaps
every UUID reference for a relative path, and injects `window.__resources` so
the runtime resolves React and the sibling components locally.

The original 22 MB bundle unpacks to roughly 3.2 MB, most of the saving from
resizing four print-resolution JPEGs (7464×4976 in a 330 px panel) down to
1600 px. Dry-run report:

```powershell
.\.venv\Scripts\python tools\optimize_images.py site\assets\img
```

## Known quirks

- Each page load makes one failing request for `{{ mapSrc }}` — the browser
  fetches the literal placeholder before the runtime hydrates the region-map
  iframe. Inherited from the draft, harmless (the map renders), but it is a
  stray 404 in the network log if you go looking.
- `Server/` is empty and unused. Nothing here needs a backend; if an API is
  added later it becomes a separate Render Web Service, not part of this site.
- No Node toolchain is involved anywhere.
