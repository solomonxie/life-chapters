#!/bin/sh
# Captures listing screenshots straight from the paired iPhone, using the
# LC_QA launch hook: a throwaway qa.db with a sample plan, never the real one.
# The phone must be unlocked and not in use — each shot relaunches the app.
#
# Usage: scripts/device-shots.sh [out-dir]     then: make screenshots SHOTS=<out-dir>
set -e
OUT=${1:-/tmp/lifechapters-shots}
DEVICE=${DEVICE:-$(xcrun devicectl list devices 2>/dev/null | awk '/physical/ && /connected/ {print $3; exit}')}
[ -n "$DEVICE" ] || { echo "no connected iPhone"; exit 1; }
mkdir -p "$OUT"

shot() { # <name> <qa-spec>
  xcrun devicectl device process launch --device "$DEVICE" --terminate-existing \
    -e "{\"LC_QA\":\"$2\"}" com.example.lifechapters >/dev/null
  sleep 7
  xcrun devicectl device capture screenshot --device "$DEVICE" --destination "$OUT/$1.png" >/dev/null
  echo "$1"
}

shot 01-timeline "sample>Timeline@light"
shot 02-radar    "sample>Radar@light"
shot 03-step     "sample>Step:0@light"
shot 04-journal  "sample>Journal@light"
shot 05-chapter  "sample>Chapter@light"
shot 06-playbook "sample>Playbook@light"
shot 07-docs     "sample>Docs@light"
shot 08-timeline-dark "sample>Timeline@dark"
