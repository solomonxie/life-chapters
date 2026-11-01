# Implementation plan: Life Line

Design: [`DESIGN.md`](DESIGN.md) · format: [`FORMAT.md`](FORMAT.md) ·
desktop: [`DESKTOP.md`](DESKTOP.md) · UI: [`UIUX_DESIGN.md`](UIUX_DESIGN.md).
After Phase 1, the app track (Phases 2–3) and the desktop track (Phase 4) run
in parallel: they share only `format/`.

## Phase 0: Rename
Standalone and user-visible; ships before or alongside anything else.

- [ ] T0.1 Display + store name "Life Line" — check name availability first; listing copy — see `ios/`, `docs/release/` — depends: none
- [ ] T0.2 In-app copy and docs — titles, About, README, `docs/*.md` headings — see `src/screens/`, `README.md` — depends: none
- [ ] T0.3 iCloud backup folder `Life Line`, still read `Life Chapters` — see `src/state/autobackup.ts` — depends: none

## Phase 1: The format
The one contract. Both tracks build against it, so it's fixed first.

- [ ] T1.1 JSON Schema + valid/invalid example files — see `FORMAT.md`, `format/` — depends: none
- [ ] T1.2 `event` kind (generic moment, no chapter, no plans) — see `src/domain/kinds.ts` — depends: none

## Phase 2: App import engine
Pure TS first (testable like the scheduler), then storage that commits it.

- [ ] T2.1 Parser — JSON + hand-rolled RFC 4180 CSV → rows with per-row errors/warnings; size limits; precision from date length; tests against `format/examples/` — see `src/domain/import/parse.ts` — depends: T1.1, T1.2
- [ ] T2.2 Plan an import — classify rows new / update / already there / looks-like-existing; edited-since-import rule; people matching — tests — see `src/domain/import/plan.ts` — depends: T2.1
- [ ] T2.3 Storage — `import_batches`, `skips`; anchor/document `import` fields + `editedSinceImport`; in backups — see `src/data/` — depends: T1.2
- [ ] T2.4 Commit, undo, remove batch — store actions; one reflow toast — see `src/state/store.ts` — depends: T2.2, T2.3
- [ ] T2.5 Export events — same format, JSON + CSV writer, round-trip test — see `src/domain/import/export.ts` — depends: T2.1

## Phase 3: App screens
Consume Phase 2; each task owns its own screen files.

- [ ] T3.1 Import preview + row detail + error alerts — see `uiux/import.md` — depends: T2.4
- [ ] T3.2 Entry points — Files picker, "Open in" (alternate handler for `public.json`/`public.comma-separated-values-text` + `.lifeline.json`), AirDrop — see `ios/LifeChapters/Info.plist`, `src/platform/` — depends: T3.1
- [ ] T3.3 Settings: Import / Export / Imports + batch page + Remove — see `uiux/import.md` → Imports — depends: T2.4, T2.5
- [ ] T3.4 Evidence section + `▣` on the timeline — see `uiux/collections.md` — depends: T2.3
- [ ] T3.5 Collections section + Collection page — see `uiux/collections.md` — depends: T1.2
- [ ] T3.6 First run "Import a file"; demo sample file — see `uiux/collections.md` → First run, `src/state/demo.ts` — depends: T3.1

## Phase 4: Desktop kit
Independent of the app code; validated by the shared schema. Extractors are
the parallel batch.

- [ ] T4.1 Scaffold — `desktop/` Makefile, venv, requirements, gitignored `inbox/` `out/`, README, signals schema, `validate.py` — see `DESKTOP.md` → Layout — depends: T1.1
- [ ] T4.2 `extract/calendar.py` (.ics) — depends: T4.1
- [ ] T4.3 `extract/mail.py` (.mbox + IMAP, env-var password) — depends: T4.1
- [ ] T4.4 `extract/photos.py` (osxphotos or EXIF folder) — depends: T4.1
- [ ] T4.5 `extract/location.py` (Takeout Location History) — depends: T4.1
- [ ] T4.6 `extract/files.py` (PDF text, doc hints; S3 via `aws s3 sync` into a folder) — depends: T4.1
- [ ] T4.7 `detect.py` — trip, flight, home, birthday rules; `to-read.jsonl`; tests on fixture signals — see `DESKTOP.md` → Rule detectors — depends: T4.1
- [ ] T4.8 `build.py` — merge, dedupe vs `existing.json`, stable ids, JSON + CSV out — depends: T4.7
- [ ] T4.9 `desktop/AGENTS.md` + `.claude/skills/lifeline-import/SKILL.md` — see `DESKTOP.md` → Agent instructions — depends: T4.8

## Phase 5: End to end + release
Needs both tracks.

- [ ] T5.1 Run the kit on a real Mac, import on the paired iPhone; log false events and fix rules — depends: T3.2, T4.9
- [ ] T5.2 Release notes, listing, screenshots with the import preview — see `docs/release/` — depends: T0.1, T5.1
