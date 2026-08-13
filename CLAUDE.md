# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page static site (ThoughtLab AI City Navigator) benchmarking AI maturity
across 200 cities. Deployed on Render as a static site with **no build step**.

There is no Node toolchain, no bundler, no test suite, and no linter. Python 3 is
the only tooling, and it is used solely for the one-off import and a local server.

## Commands

```powershell
# setup (once)
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt

# local preview -> http://127.0.0.1:8080
.\.venv\Scripts\python tools\serve.py [port]

# re-import from a fresh artifact bundle -- DESTRUCTIVE, see below
.\.venv\Scripts\python tools\unbundle.py [bundle.html] [outdir]

# dry-run report on image weight (writes nothing)
.\.venv\Scripts\python tools\optimize_images.py site\assets\img
```

Git Bash: `source .venv/Scripts/activate`, then plain `python`.

`serve.py` exists instead of `python -m http.server` because the stdlib server
reads MIME types from the Windows registry, which reports `.js` as `text/plain`
on some machines and has no `.woff2` entry at all. Both break the page. It logs
only non-200 responses — silence means a clean load.

## Architecture

### Two trees, one of which is an archive

- **`site/`** — the deployable *and* the source. This is what you edit.
- **`Client/ThoughtLab AI City Navigator.html`** — the original 22 MB
  self-extracting Claude-artifact bundle. Provenance only. Editing it does
  nothing.

**`tools/unbundle.py` overwrites `site/index.html` and wipes `site/assets/`.**
Once anyone has hand-edited the site, re-running it destroys that work. It is a
one-off importer for a fresh artifact export, not part of any normal loop.

### Everything lives in one file

`site/index.html` is ~190 KB and holds the entire app: inline `<style>` blocks,
the markup, and near the bottom a `<script type="text/x-dc">` block containing
all data and view logic (`REGIONS`, `RAW`, `CITIES`, `TIERS`, `PILLARS`,
`CHAPTERS`, `CUT_DIMS`, `FINDINGS`).

No modules, no imports, no compile. Save and refresh.

### The `dc` runtime

The app runs on a custom runtime vendored into `site/assets/js/` (the ~69 KB
`asset-*.js`), not on a mainstream framework. It provides an `<x-dc>` custom
element with `sc-for` / `sc-if` / `{{ expr }}` templating, plus React 18 UMD.

This runtime came from the artifact tooling and is **undocumented vendor code**.
Do not try to modify it. Treat the templating idioms already in `index.html` as
the spec for how to write more of them.

### `window.__resources` — why unbundling works

The runtime resolves external resources through `window.__resources[id]` and
falls back to `fetch(id)` when a lookup misses — in `cdnScriptFor`, in the
stylesheet loader, and in the sibling-component loader. The app's own code does
the same:

```js
mapSrc: (window.__resources && window.__resources.regionMap) || 'world-region-map-v2.html'
```

`unbundle.py` injects that map into `<head>`, pointing the two CDN URLs and two
sibling components at local files. **The unpkg URLs in that object are lookup
keys, not requests** — their values are local paths, so nothing is fetched from
a CDN at runtime. Do not "clean up" those keys; changing them breaks resolution.

### Three coupled invariants

These three must move together. Breaking one silently breaks the others:

1. `unbundle.py` names every asset `<name>-<sha1[:8]>.<ext>`, hashing the **final**
   bytes (after image optimization).
2. `render.yaml` serves `/assets/*` with `immutable, max-age=31536000` on the
   strength of that hash. `index.html` is `no-cache` so clients always re-resolve.
3. `.gitattributes` marks `site/assets/** -text` so git never rewrites line
   endings in files whose names claim to be a hash of their contents.

Also load-bearing: `unbundle.py` injects its `<head>` block **after**
`<meta charset>`, not after `<head>`. The injected resource map is ~450 bytes and
the charset declaration is only honoured within the first 1024 — pushing it down
would mojibake every non-ASCII city name (São Paulo, Córdoba, Côte d'Ivoire).

## Verifying a change

There are no automated tests. Verification is loading the page and checking it.
Beyond visual inspection, this catches the failure modes that matter:

```js
// in the browser console after a load
const r = performance.getEntriesByType('resource');
({ external: r.filter(e => !e.name.startsWith(location.origin)).map(e => e.name),
   failed: r.filter(e => e.responseStatus >= 400).map(e => e.name),
   totalKB: Math.round(r.reduce((s, e) => s + e.transferSize, 0) / 1024) })
```

`external` must be empty — the site is self-contained, and anything appearing
there is an accidental runtime dependency on a third party. `unbundle.py` runs
the same check over the markup at import time and prints what it finds.

Exercise all five nav groups. The region map (a 264 KB separate HTML component
in an iframe) and the City index are the two screens most likely to break, since
they load `site/assets/components/` at runtime.

Expect ~2 MB transferred and ~26 requests for a full click-through.

## Known quirks

- Each load makes one **failing request for the literal `{{ mapSrc }}`** —
  `site/index.html:1305` has `<iframe src="{{ mapSrc }}">`, and the browser
  fetches the unresolved placeholder before the runtime hydrates it. Inherited
  from the original draft. The map renders correctly; this is not a bug to chase.
- **All survey data is placeholder.** Maturity tiers and scores are deterministic
  hashes of city names, and most findings render as `xx%`. Do not treat any
  number on screen as a finding, and do not "fix" the hashing — it is intentional
  scaffolding awaiting real results.
- `Server/` is empty and unused. Nothing here needs a backend; an API would be a
  separate Render Web Service, not part of this site.

## Deploying

`render.yaml` sets no build command — Render just publishes the committed `site/`
directory, so the deploy path has no dependency on Python existing in Render's
build image. Push to the deployed branch to trigger a redeploy.
