#!/usr/bin/env python3
"""Unpack the Claude-artifact bundle in Client/ into a plain static site.

The draft is self-extracting: one 22 MB HTML file whose assets live as
base64+gzip blobs in a <script type="__bundler/manifest"> island. At load time
a loader gunzips ~55 assets in the browser, mints blob: URLs, string-replaces
UUID references in a stored template, and swaps the document. Fine for handing
someone a file; poor for hosting — nothing is cacheable, nothing is editable,
and the whole 22 MB is parsed before first paint.

This does the same unpacking ahead of time and writes real files:

    manifest blobs      ->  site/assets/{js,fonts,img,components}/<name>-<hash>.<ext>
    template UUID refs  ->  relative paths to those files
    ext_resources map   ->  window.__resources injected into <head>

That last piece is what makes it safe. The dc runtime resolves external
resources through window.__resources and falls back to fetch(url) on a miss —
in cdnScriptFor, in the stylesheet loader, and in the sibling-component loader
— as does the app's own code:

    mapSrc: (window.__resources && window.__resources.regionMap) || '...'

Given relative paths it behaves exactly as it did with blob: URLs.

Re-running is how you rebuild: site/assets is cleared and regenerated. Note
that after this import, site/index.html is the file you edit — not the bundle.

Usage:
    python tools/unbundle.py [bundle.html] [outdir]
"""

import base64
import gzip
import hashlib
import json
import os
import re
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from optimize_images import optimize, HAVE_PILLOW  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    ROOT, "Client", "ThoughtLab AI City Navigator.html")
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "site")

# The bundle's template carries no <title>; without this the tab reads as an
# untitled document and link previews come up blank.
TITLE = "ThoughtLab AI City Navigator"
DESCRIPTION = ("Benchmarking AI maturity across 200 cities worldwide - "
               "a ThoughtLab research program.")

EXT = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "font/woff2": ".woff2",
    "font/woff": ".woff",
    "text/javascript": ".js",
    "application/javascript": ".js",
    "text/css": ".css",
    "text/html": ".html",
    "application/json": ".json",
}

SUBDIR = {
    ".woff2": "fonts", ".woff": "fonts",
    ".jpg": "img", ".png": "img", ".svg": "img", ".webp": "img", ".gif": "img",
    ".js": "js", ".css": "js",
    ".html": "components", ".json": "components",
}

UUID_RE = r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"


def island(html, name):
    """Pull one <script type="__bundler/NAME"> payload out of the bundle."""
    m = re.search(r'<script type="__bundler/%s">(.*?)\n\s*</script>' % name,
                  html, re.S)
    return m.group(1) if m else None


def slug(text, fallback):
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or fallback


def friendly_names(template, uuid_to_id):
    """Best-effort readable filenames, so site/assets stays browsable.

    Fonts take family + weight from the @font-face block that references them,
    images take their alt text, external resources take their URL basename.
    Anything left unnamed falls back to a content hash at the call site — the
    four JPEGs land there, since they are CSS backgrounds with no alt.
    """
    names = {}

    for block in re.findall(r"@font-face\s*\{(.*?)\}", template, re.S):
        url = re.search(r'url\("(%s)"\)' % UUID_RE, block)
        fam = re.search(r"font-family:\s*'([^']+)'", block)
        wgt = re.search(r"font-weight:\s*(\d+)", block)
        if url and fam and url.group(1) not in names:
            names[url.group(1)] = slug(
                fam.group(1) + "-" + (wgt.group(1) if wgt else "400"), "font")

    for tag in re.findall(r"<img\b[^>]*>", template):
        url = re.search(r'src="(%s)"' % UUID_RE, tag)
        alt = re.search(r'alt="([^"]*)"', tag)
        if url and alt and alt.group(1).strip() and url.group(1) not in names:
            names[url.group(1)] = slug(alt.group(1), "image")

    for uuid, rid in uuid_to_id.items():
        base = rid.split("?")[0].rstrip("/").split("/")[-1]
        base = re.sub(r"\.(js|html|css|json)$", "", base)
        names[uuid] = slug(base, "resource")

    return names


def main():
    with open(SRC, encoding="utf-8") as f:
        html = f.read()

    manifest = json.loads(island(html, "manifest"))
    ext_resources = json.loads(island(html, "ext_resources") or "[]")
    page_order = json.loads(island(html, "page_order") or "[]")
    template = json.loads(island(html, "template"))

    if page_order:
        # Nested page bundles arrive as about:blank#<uuid> iframe markers that
        # only the in-browser relay knows how to mount. This draft has none;
        # a future export with some would need real .html files per page and
        # rewritten frame srcs.
        raise SystemExit("bundle contains %d nested page(s); "
                         "unbundler does not handle those yet" % len(page_order))

    if not HAVE_PILLOW:
        print("! Pillow not installed - images will be copied at full size.")
        print("  pip install -r requirements.txt for a ~14 MB saving.\n")

    uuid_to_id = {e["uuid"]: e["id"] for e in ext_resources}
    names = friendly_names(template, uuid_to_id)

    assets_dir = os.path.join(OUT, "assets")
    if os.path.isdir(assets_dir):
        shutil.rmtree(assets_dir)
    os.makedirs(OUT, exist_ok=True)

    used = set()
    paths = {}
    written = []
    saved = 0

    for uuid, entry in manifest.items():
        raw = base64.b64decode(entry["data"])
        if entry.get("compressed"):
            raw = gzip.decompress(raw)

        mime = entry.get("mime", "")
        before = len(raw)
        raw = optimize(raw, mime)
        saved += before - len(raw)

        ext = EXT.get(mime, ".bin")
        # Hash the final bytes, so the cache-busting token in the filename
        # always describes what is actually served. This is what lets
        # render.yaml mark /assets/* immutable for a year.
        digest = hashlib.sha1(raw).hexdigest()[:8]
        stem = names.get(uuid) or ("photo" if ext == ".jpg" else "asset")
        name = "%s-%s%s" % (stem, digest, ext)
        while name in used:
            name = "%s-%s-%s%s" % (stem, digest, uuid[:4], ext)
        used.add(name)

        rel = "assets/%s/%s" % (SUBDIR.get(ext, "misc"), name)
        dest = os.path.join(OUT, rel.replace("/", os.sep))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as f:
            f.write(raw)

        paths[uuid] = rel
        written.append((rel, len(raw)))

    for uuid, rel in paths.items():
        template = template.replace(uuid, rel)

    # SRI hashes in the template cover the unpkg copies of React/ReactDOM. We
    # serve vendored copies from assets/js, so the hashes describe a file we no
    # longer request. crossorigin goes with them.
    template = re.sub(r'\s+integrity="[^"]*"', "", template, flags=re.I)
    template = re.sub(r'\s+crossorigin="[^"]*"', "", template, flags=re.I)

    # Every @font-face src is local now, so warming a connection to Google
    # Fonts just costs a DNS lookup and a TLS handshake for nothing.
    template = re.sub(
        r'\s*<link rel="preconnect" href="https://fonts\.(googleapis|gstatic)\.com"[^>]*>',
        "", template, flags=re.I)

    resource_map = {e["id"]: paths[e["uuid"]]
                    for e in ext_resources if e["uuid"] in paths}

    head = ("<title>%s</title>\n"
            '<meta name="description" content="%s">\n'
            '<meta property="og:title" content="%s">\n'
            '<meta property="og:description" content="%s">\n'
            '<meta property="og:type" content="website">\n'
            "<script>window.__resources = %s;</script>"
            % (TITLE, DESCRIPTION, TITLE, DESCRIPTION,
               json.dumps(resource_map).replace("</", "<\\/")))

    # Insert after <meta charset>, not merely after <head>. The charset
    # declaration is only honoured within the first 1024 bytes, and the
    # resource map alone is ~450 of them — pushing charset down would leave
    # the page one added meta tag away from mojibaking every non-ASCII city
    # name (Sao Paulo, Cordoba, Cote d'Ivoire).
    m = re.search(r'<meta[^>]+charset[^>]*>', template, re.I)
    if not m:
        m = re.search(r"<head[^>]*>", template, re.I)
    if not m:
        raise SystemExit("template has no <head>")
    template = template[:m.end()] + "\n" + head + template[m.end():]

    index = os.path.join(OUT, "index.html")
    # newline="" suppresses Windows' \n -> \r\n translation, so the output is
    # byte-identical whichever platform runs the import.
    with open(index, "w", encoding="utf-8", newline="") as f:
        f.write(template)

    total = sum(n for _, n in written) + len(template.encode("utf-8"))
    print("wrote %s" % index)
    print("%d assets, %.2f MB total" % (len(written), total / 1e6))
    if saved:
        print("image optimization saved %.2f MB" % (saved / 1e6))
    for rel, n in sorted(written, key=lambda x: -x[1])[:6]:
        print("  %8.1f KB  %s" % (n / 1e3, rel))

    # Anything still pointing off-origin is a runtime dependency on a third
    # party we did not intend to keep. Surfacing it here beats finding out
    # from the network tab after deploy.
    # The CDN urls in window.__resources are lookup KEYS the runtime matches
    # on; their values are local paths, so they are never fetched. Drop them
    # from the scan or they mask a real leak.
    keys_only = json.dumps(sorted(resource_map))
    external = sorted(set(re.findall(r"https?://[\w.-]+", template))
                      - set(re.findall(r"https?://[\w.-]+", keys_only)))
    ignorable = ("http://www.w3.org", "https://www.w3.org",
                 "https://thoughtlabgroup.com")
    leftover = [u for u in external if not u.startswith(ignorable)]
    if leftover:
        print("\n! external references remaining in index.html:")
        for u in leftover:
            print("   ", u)
    else:
        print("\nno unexpected external references - site is self-contained.")


if __name__ == "__main__":
    main()
