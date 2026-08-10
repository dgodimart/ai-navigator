#!/usr/bin/env python3
"""Shrink oversized raster assets.

The source artwork in the draft bundle is print-resolution — the hero image is
7464x4976 (7.6 MB) and renders into a 330 px-wide CSS panel with
`background: center / cover`. All four JPEGs together are 14.6 MB, which is the
overwhelming majority of the site's weight. Render serves Brotli, but JPEG
bytes are already entropy-coded and do not compress further, so the only lever
is fewer pixels.

MAX_EDGE is deliberately generous: ~660 px covers the widest panel on a 2x
display, and 1600 px leaves room for the layout to grow without another
re-import.

This is a library, not an in-place batch tool. `unbundle.py` calls `optimize()`
on the decoded bytes *before* hashing them into a filename, so the content hash
always describes the bytes actually served. Optimizing files in place under
site/assets/ afterwards would silently desync the two and hand cached clients
stale images under an `immutable` header.

Run directly for a dry-run report on a directory:

    python tools/optimize_images.py site/assets/img
"""

import io
import os
import sys

MAX_EDGE = 1600
JPEG_QUALITY = 78

try:
    from PIL import Image
    HAVE_PILLOW = True
except ImportError:  # pragma: no cover - environment dependent
    HAVE_PILLOW = False

RASTER = {"image/jpeg", "image/png"}


def optimize(raw, mime):
    """Return re-encoded bytes, or the original when there is nothing to gain.

    Never returns something larger than what it was given — a small, already
    well-compressed source stays untouched rather than being round-tripped.
    """
    if not HAVE_PILLOW or mime not in RASTER:
        return raw

    try:
        img = Image.open(io.BytesIO(raw))
        img.load()
    except Exception as exc:  # corrupt or an unsupported variant; ship as-is
        print("  ! could not decode %s (%s), leaving unchanged" % (mime, exc))
        return raw

    if max(img.size) > MAX_EDGE:
        img.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)

    buf = io.BytesIO()
    if mime == "image/jpeg":
        # Drop EXIF/ICC along the way; these are decorative background tiles.
        img.convert("RGB").save(buf, "JPEG", quality=JPEG_QUALITY,
                                optimize=True, progressive=True)
    else:
        img.save(buf, "PNG", optimize=True)

    out = buf.getvalue()
    return out if len(out) < len(raw) else raw


def main():
    if not HAVE_PILLOW:
        raise SystemExit("Pillow is not installed: pip install -r requirements.txt")
    target = sys.argv[1] if len(sys.argv) > 1 else "site/assets/img"
    total_before = total_after = 0
    for name in sorted(os.listdir(target)):
        path = os.path.join(target, name)
        if not os.path.isfile(path):
            continue
        mime = {".jpg": "image/jpeg", ".jpeg": "image/jpeg",
                ".png": "image/png"}.get(os.path.splitext(name)[1].lower())
        if not mime:
            continue
        raw = open(path, "rb").read()
        out = optimize(raw, mime)
        total_before += len(raw)
        total_after += len(out)
        flag = "" if len(out) < len(raw) else "  (already optimal)"
        print("%-34s %8.1f KB -> %8.1f KB%s"
              % (name, len(raw) / 1e3, len(out) / 1e3, flag))
    if total_before:
        print("\ndry run, nothing written. %.1f MB -> %.1f MB (%.0f%% smaller)"
              % (total_before / 1e6, total_after / 1e6,
                 100 * (1 - total_after / total_before)))
        print("re-run 'python tools/unbundle.py' to actually rebuild site/")


if __name__ == "__main__":
    main()
