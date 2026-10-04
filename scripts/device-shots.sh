#!/bin/sh
# Captures listing screenshots straight from the paired iPhone, using the
# LC_QA launch hook: a throwaway qa.db with a sample plan, never the real one.
# The phone must be unlocked and not in use — each shot relaunches the app.
#
# Usage: scripts/device-shots.sh [out-dir]     then: make screenshots SHOTS=<out-dir>
# README copies: sips --resampleWidth 390 <out-dir>/0*.png into docs/screenshots/
set -e
OUT=${1:-/tmp/lifechapters-shots}
DEVICE=${DEVICE:-$(xcrun devicectl list devices 2>/dev/null | awk '/physical/ && /connected/ {print $3; exit}')}
[ -n "$DEVICE" ] || { echo "no connected iPhone"; exit 1; }
APP_ID=$(sed -n 's/^PRODUCT_BUNDLE_IDENTIFIER *= *//p' "$(dirname "$0")/../ios/Local.xcconfig" 2>/dev/null)
[ -n "$APP_ID" ] || { echo "PRODUCT_BUNDLE_IDENTIFIER not set in ios/Local.xcconfig"; exit 1; }
mkdir -p "$OUT"

shot() { # <name> <qa-spec>
  xcrun devicectl device process launch --device "$DEVICE" --terminate-existing \
    -e "{\"LC_QA\":\"$2\"}" "$APP_ID" >/dev/null
  sleep 7
  xcrun devicectl device capture screenshot --device "$DEVICE" --destination "$OUT/$1.png" >/dev/null
  echo "$1"
}

shot 01-timeline "sample>Timeline@light"
shot 02-plan "sample>Playbook@light"
shot 03-step "sample>Step:0@light"
shot 04-chapter "sample>Chapter@light"
shot 05-event "sample>AnchorEdit:migrated@light"
shot 06-library "sample>Library@light"
shot 07-child-board "sample>Timeline:Ava@light"
shot 08-timeline-dark "sample>Timeline@dark"
