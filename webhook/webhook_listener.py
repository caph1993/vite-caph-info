#!/usr/bin/env python3
import hmac, hashlib, os
from http.server import BaseHTTPRequestHandler, HTTPServer
from webhook_executor import main

SECRET = os.environ["WEBHOOK_SECRET"].encode()  # same secret as in GitHub
PORT = int(os.environ.get("PORT", "") or "9000")


def valid_signature(body: bytes, sig_header: str) -> bool:
    if not sig_header or not sig_header.startswith("sha256="):
        return False
    digest = hmac.new(SECRET, body, hashlib.sha256).hexdigest()
    expected = "sha256=" + digest
    try:
        return hmac.compare_digest(expected, sig_header)
    except Exception:
        return False


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        sig = self.headers.get("X-Hub-Signature-256", "")
        if not valid_signature(body, sig):
            self.send_response(403)
            self.end_headers()
            self.wfile.write(b"invalid signature")
            return
        # signature ok -> run deploy script
        main()
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *_):  # silence logs
        return


if __name__ == "__main__":
    HTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
