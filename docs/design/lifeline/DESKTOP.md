# Desktop kit: `desktop/`

Runs on the user's Mac. Turns exports and folders into a `lifeline-events`
file ([`FORMAT.md`](FORMAT.md)). Python in a local `desktop/venv/`; Makefile
targets; agent instructions for the parts rules can't do.

## Pipeline

```
 desktop/inbox/  (gitignored: the user's exports)
   calendar/*.ics ──┐
   mail/*.mbox ─────┤  (or IMAP: make mail-imap)
   photos ──────────┤  (Mac Photos library via osxphotos, or a folder: EXIF)
   takeout/ ────────┤  (Location History / Timeline JSON)
   files/ ──────────┤  (PDFs, scans; a synced Drive / S3 folder)
   existing.json ───┘  (exported from the app: ids to skip)
        │
        ▼ make extract          one script per source
   out/signals.jsonl            {source, ref, at, end?, place?, hint, text≤280}
        │
        ▼ make detect           rules, no AI
   out/draft.json               trips, moves, flights, birthdays
   out/to-read.jsonl            prose signals rules flagged but can't settle
        │
        ▼ agent pass            AGENTS.md: read to-read + source files,
        │                       write events with evidence
   out/agent.json
        │
        ▼ make build            merge, dedupe (vs existing.json), stable ids
   out/lifeline-events-2026-10-18.json   (+ .csv on request)
        │
        ▼ make validate         same JSON Schema as the app
   AirDrop / Files → Life Line → Import
```

## Layout

```
format/
  lifeline-events.schema.json   shared with the app's tests
  examples/                     small valid + invalid files
desktop/
  README.md         compact: setup, the 5 make targets, where exports go
  AGENTS.md         instructions for a coding agent (Claude Code or any)
  Makefile          setup · extract · detect · build · validate · clean
  requirements.txt  icalendar, osxphotos (optional), pypdf, jsonschema
  extract/          calendar.py · mail.py · photos.py · location.py · files.py
  detect.py         rule detectors (table below)
  build.py          merge + dedupe + ids + JSON/CSV writer
  validate.py
  inbox/  out/      gitignored
.claude/skills/lifeline-import/SKILL.md   points at desktop/AGENTS.md
```

## Extractors

| Script | Input | How | Signals |
|---|---|---|---|
| `calendar.py` | `.ics` (Calendar.app / Google export) | `icalendar` | all-day ≥2 days, far locations, birthdays, keyword titles |
| `mail.py` | `.mbox` (Takeout, Apple Mail) or IMAP (app password via env, never saved) | stdlib `mailbox` / `imaplib`; sender + subject filters first | flight/hotel JSON-LD, offers, admissions, leases, gov mail; ≤280-char snippet |
| `photos.py` | Mac Photos library, or a folder | `osxphotos` metadata, or EXIF via `exiftool` | date, coarse place, counts per day; no pixels |
| `location.py` | Takeout Location History | JSON | place visits, nights per city |
| `files.py` | a folder (synced Drive, `aws s3 sync` output) | `pypdf` text; images left for the agent | title, dates, doc type hints (passport MRZ, lease, diploma) |

Dates: every instant becomes a civil date where it happened (EXIF offset,
event zone), before anything else sees it.

## Rule detectors (`detect.py`)

| Detector | Rule | Kind |
|---|---|---|
| trip | ≥2 days ≥100 km from home (photos/location/calendar); gaps ≤1 day join | `trip` |
| flight | airline JSON-LD; pair outbound + return | `trip` end points |
| home | dominant night city changes and holds ≥3 months | `moved-city` / `migrated` if the country changed |
| birthday | calendar/contacts birthdays of named people | `born` on that person |
| big day | photo count ≥5× daily median at one place | → `to-read.jsonl` (needs a human or the agent) |
| prose | mail/file keyword hits (offer, admission, lease, permit, diploma) | → `to-read.jsonl` |

Merge: same kind + dates overlap ±2 days + places ≤50 km → one event,
evidence combined. Confidence: `high` with ≥2 source types, `medium` one,
`low` agent-only guesses.

## Agent instructions (`desktop/AGENTS.md`, outline)

- Goal: turn `out/to-read.jsonl` (and the files it points to) into events per
  `FORMAT.md`; write `out/agent.json`
- Use only the listed kind ids; unsure → `event` with `confidence: low`
- Every event needs evidence a person would recognise; no event without one
- Never invent dates: month or year precision when that's all the source says
- Skip anything in `inbox/existing.json`
- Don't paste mail bodies into notes; notes are for the user
- Run `make build validate` and fix until it passes
- Never commit `inbox/` or `out/`; never print secrets

## Privacy

Everything stays on the Mac unless the user's own agent sends it to its
model vendor; `README.md` says so in one line. IMAP passwords come from an
env var per run, never written to disk.
