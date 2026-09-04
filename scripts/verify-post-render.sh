#!/usr/bin/env bash
# In-session render check for DoD-7. Builds the site, starts a local server, and
# curls all four language pages plus the OG route, asserting HTTP 200 for each.
# This is the in-session check per decision D8, never a Coolify preview.
#
# Note: bun 1.2.4 local vs bun@1.2.5 pinned in package.json is expected and
# non-blocking. Only investigate a version mismatch if the build itself fails in
# a version shaped way.
#
# Usage: scripts/verify-post-render.sh <slug>
set -euo pipefail

SLUG="${1:-}"
if [ -z "$SLUG" ]; then
  echo "usage: scripts/verify-post-render.sh <slug>" >&2
  exit 2
fi

PORT=3000
BASE="http://localhost:${PORT}"
LANGS="pl en de fr"
SERVER_PID=""

cleanup() {
  # Always stop the background server. Guarded so a missing process never fails
  # the run.
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
  fi
  pkill -f "next start" 2>/dev/null || true
}
trap cleanup EXIT

echo "==> bun install"
bun install

echo "==> bun run build"
bun run build

echo "==> starting local server on :${PORT}"
bun run start >/tmp/verify-post-render-server.log 2>&1 &
SERVER_PID=$!

# Wait for readiness (up to ~60 seconds).
ready=""
for _ in $(seq 1 60); do
  if curl -sf -o /dev/null "http://localhost:3000/blog/pl/${SLUG}"; then
    ready="yes"
    break
  fi
  sleep 1
done
if [ -z "$ready" ]; then
  echo "FAIL: server did not become ready on ${BASE}" >&2
  exit 1
fi

fail=0

check_url() {
  url="$1"
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || true)
  if [ "$code" = "200" ]; then
    echo "  ok   200  $url"
  else
    echo "  FAIL ${code}  $url" >&2
    fail=1
  fi
}

frontmatter_value() {
  # $1 file, $2 key. First matching frontmatter line, key and surrounding quotes
  # stripped.
  grep -m1 "^${2}:" "$1" 2>/dev/null | cut -d: -f2- | sed 's/^[[:space:]]*//; s/^"//; s/"$//' || true
}

echo "==> checking the four language pages"
for lang in $LANGS; do
  check_url "http://localhost:3000/blog/${lang}/${SLUG}"
done

echo "==> checking the OG route per language"
for lang in $LANGS; do
  file="content/posts/${SLUG}/${lang}.mdx"
  title="bpaczesny's blog"
  tags=""
  if [ -f "$file" ]; then
    t=$(frontmatter_value "$file" "title")
    [ -n "$t" ] && title="$t"
    tags=$(frontmatter_value "$file" "tags")
  fi
  code=$(curl -s -G -o /dev/null -w "%{http_code}" \
    --data-urlencode "title=${title}" \
    --data-urlencode "lang=${lang}" \
    --data-urlencode "tags=${tags}" \
    "http://localhost:3000/og/post" || true)
  if [ "$code" = "200" ]; then
    echo "  ok   200  ${BASE}/og/post (lang=${lang})"
  else
    echo "  FAIL ${code}  ${BASE}/og/post (lang=${lang})" >&2
    fail=1
  fi
done

if [ "$fail" -ne 0 ]; then
  echo "RENDER CHECK FAILED" >&2
  exit 1
fi

echo "RENDER CHECK PASSED: all four pages and the OG route returned 200"
