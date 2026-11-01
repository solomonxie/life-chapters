# Design: Life Line — import your life events from a file

Product reasoning only. Interface: [`UIUX_DESIGN.md`](UIUX_DESIGN.md). File
format: [`FORMAT.md`](FORMAT.md). Desktop tooling: [`DESKTOP.md`](DESKTOP.md).
Build order: [`IMPLEMENT_PLAN.md`](IMPLEMENT_PLAN.md). Builds on
[`../../DESIGN.md`](../../DESIGN.md); nothing there is undone.

## Problem

The app only knows what the user types in, and typing in a life is the
bottleneck. The evidence already exists (calendar, photos, mail, scanned
documents, location history), but reading it is heavy work: auth, parsing,
clustering, reading prose. A phone app with no server is the wrong place for
that work.

## Core idea

Split the job in two:

```
 DESKTOP (this repo, desktop/)                    PHONE (the app)
 ────────────────────────────                     ──────────────────────
 exports: .ics, .mbox, Takeout,     scripts +     Import a file
 Photos library, folders, S3   ──▶  an agent ──▶  .json / .csv  ──▶ preview
                                    (Claude Code    (one format)     ──▶ add
                                     or any)                         ──▶ anchors
```

- The **app** reads one universal format, JSON or CSV, and nothing else. No
  connectors, no AI, no network
- The **repo** ships `desktop/`: extract scripts, rule-based detectors, a
  validator, and agent instructions to read the prose. They produce the file
- The format is the only contract. Anything that can write it (a script, an
  agent, a spreadsheet) can feed the app

## Goals

- Rename: **Life Line**. Same app, same data, same bundle id
- Import events, people and documents from `.json` or `.csv`, via the Files
  picker, AirDrop, or "Open in Life Line"
- Preview before anything lands: new, updates, already there, errors
- Re-importing the same file is safe (stable ids)
- Every imported event keeps its **evidence**: what the generator saw
- Undo an import: right after, and later from import history
- Export the line in the same format, so desktop tools can skip what's already
  in the app
- Collections: Trips, Homes, Work, Study, Family, Papers, derived from kinds
- Desktop kit covers: Calendar (.ics), Mail (.mbox or IMAP), Photos (Mac
  library or a folder), Google Takeout location history, document folders
  (including a synced Drive), S3 (synced to a folder)

## Non-goals

- **No source connectors in the app.** No calendar, photos, mail or bucket access
- **No AI in the app,** on-device or cloud
- No network calls; "Nothing leaves the device" stays as written
- No other import formats (.ics, .vcf, XLSX). Desktop converts
- Not a diary. The bar is unchanged: an event starts, ends or marks a chapter,
  or needs paperwork
- No hosted converter service, no web uploader
- Personal data never enters git: `desktop/inbox/` and `desktop/out/` are
  gitignored

## Options considered

| Option | Deciding factor |
|---|---|
| Connectors + AI in the app | Auth, OAuth verification, Keychain, background scans, AI engine choice: big surface, all on a phone. Dropped |
| **File import + desktop kit** | Chosen: the app gains one parser and one screen; the heavy work runs where the tools, the disk and the agents already are |
| JSON only | Precise and nested (evidence, people), but nobody writes it by hand |
| CSV only | Spreadsheet-friendly, but flat: no nested evidence, no documents |
| **JSON canonical + CSV for events** | Chosen: JSON carries everything; CSV covers "I typed my moves into a sheet" |
| Reuse the backup file format | Carries steps, plans, settings: a full-state restore, not an "add these events". Kept separate |
| Desktop as a separate repo | The format and its schema would drift from the app. Same repo, one schema file both sides use |

## Decision

The app imports one versioned format (`lifeline-events`, v1) as JSON or CSV,
shows a preview, and adds what the user ticks as ordinary anchors, documents
and people, each tagged with the import it came from. Everything that reads
sources runs on the desktop, from `desktop/` in this repo.

Why:
- **Smallest app change** that removes manual entry: a parser, a preview, an
  import table. No new permissions, no network, no new runtime dependency
  (CSV parsing is hand-rolled, ~100 lines)
- **The desktop is better at this**: real files, `exiftool`/`osxphotos`,
  Python, a coding agent that can read PDFs and mail, no battery budget
- **One schema file** (`format/lifeline-events.schema.json`) validates on
  both sides, so a generator bug is caught on the desktop, not on the phone

## Product decisions

**Rename to Life Line.**
- Display name, store name, copy, README, docs. Bundle id, Xcode target,
  SQLite file and backup format stay: renaming them buys nothing visible
- iCloud backup folder: write to `Life Line`, still read `Life Chapters`

**Preview, then add.** Nothing lands without a tap, but a clean file is one
tap: "Add 42 events". Rows are ticked by default unless the generator said
`confidence: low`.

**Stable ids make re-import safe.** Each row has an `id` from the generator.
Seen before and unchanged → "Already there". Seen and changed → "Update",
with the changed fields shown. An anchor the user edited in the app is never
overwritten silently; its update row starts unticked.

**Matching events without ids.** A row with a new id but the same kind,
overlapping dates (±2 days) and the same place as an existing anchor shows as
"Looks like *Relocated to Canada*": tap to add its evidence there instead of
a duplicate.

**Unknown is allowed, not rejected.** An unknown `kind` imports as a plain
moment (`event`, cuts no chapter, opens no plan) with a warning on the row.
A bad row (no date) is an error. Errors never block the valid rows.

**An import is a batch.** Each import is recorded (file name, when, counts).
"Remove this import" deletes the anchors it added that haven't been edited
since; edited ones stay and lose the link.

**Evidence is text.** `source`, `title`, `date`, optional `url`. Desktop paths
mean nothing on the phone, so the generator writes what a person would
recognise ("212 photos, Kyoto", "Mail: Your flight to Osaka"). A `url` opens in
Safari only on tap (user-initiated, no data sent).

**Precision from the date string.** `2016` = year, `2016-08` = month,
`2016-08-14` = day. No timezones, ever (civil dates).

**People by name.** `person` / `with` match existing people by name; a new
name in `people[]` is offered as "Add Ava as a person" in the preview, never
created silently. No `person` = Me.

## Data & integrations

```
ImportBatch   one file imported        id, fileName, format json|csv, importedAt,
                                       counts {added, updated, skipped, errors}
Anchor        + import?                batchId, externalId, evidence[],
                                       editedSinceImport
Document      + import?                same
Skip          "Already there" memory   externalId, hash of the imported row
Kind          + event                  generic moment, no chapter, no plans
```

- Storage: same SQLite. Import fields ride in backups (they're the user's data)
- Export: Settings › Export events → same format, JSON or CSV, via share sheet
- Limits: 10 MB / 20,000 rows per file; bigger is a clear error, not a hang
- Cost: zero. No dependency added to the app

## Risks / open questions

- **Generator quality is outside the app.** A wrong "Married 2019" in a file
  is the user's tool's mistake, but the app shows it. The preview, the `low`
  confidence default-off, and Remove import are the guard
- **Format churn.** Every field added later must be optional; `version` bumps
  only for breaking changes, and the app keeps reading v1
- **Opening `.json`/`.csv` from other apps** registers Life Line as an
  "alternate" handler for generic types; it must not try to claim every JSON
  file. Fallback: a `.lifeline.json` extension
- **Name availability**: "Life Line" may be taken on the App Store; check
  before the rename ships
- Open: user-made collections in v1, or derived only? Currently derived
