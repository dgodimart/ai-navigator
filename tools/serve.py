#!/usr/bin/env python3
"""Serve site/ locally, approximating how Render will serve it.

`python -m http.server` almost works, but it guesses MIME types from the
Windows registry, which reports .js as text/plain on some machines and has no
entry for .woff2 at all. Both break the page. This pins the types that matter
and disables caching so a rebuild shows up on refresh.

    python tools/serve.py [port]
"""

import functools
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".html": "text/html",
        ".css": "text/css",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".woff2": "font/woff2",
        ".woff": "font/woff",
        ".webp": "image/webp",
    }

    def end_headers(self):
        # Render sets immutable caching on /assets/*; locally we always want
        # the freshest rebuild instead.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        status = str(args[1]) if len(args) > 1 else ""
        # Only surface problems; a clean load is ~60 lines of 200s.
        if not status.startswith("2"):
            super().log_message(fmt, *args)


def main():
    if not os.path.isdir(SITE):
        raise SystemExit("site/ does not exist - run 'python tools/unbundle.py' first")
    handler = functools.partial(Handler, directory=SITE)
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as httpd:
        print("serving %s at http://127.0.0.1:%d  (ctrl-c to stop)" % (SITE, PORT))
        print("non-200 responses are logged below; silence means a clean load")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped")


if __name__ == "__main__":
    main()
