# UI/UX: Life Line

Interface only. Product reasons: [`DESIGN.md`](DESIGN.md). Existing screens
stay as drawn in [`../../uiux/`](../../uiux/); this adds to them.

## Stories

| # | Story |
|---|---|
| S1 | As a user with a generated file, I want to bring it in from Files or AirDrop, so my past appears without typing |
| S2 | As a user, I want to see what a file will add before it's added, so nothing wrong lands on my line |
| S3 | As a user, I want to re-import an updated file without duplicates |
| S4 | As a user, I want to undo an import, now or weeks later |
| S5 | As a user, I want to see what an imported event was based on |
| S6 | As a user, I want my trips, homes and jobs as lists |
| S7 | As a desktop-kit user, I want to export what's in the app, so my tools skip it |

Scenarios:

```
S1  AirDrop file ─▶ "Open in Life Line" ─▶ preview
    Settings › Import events ─▶ Files picker ─▶ preview
    ✗ not our format   ─▶ alert "This isn't a Life Line events file"
    ✗ newer version    ─▶ alert "Made for a newer Life Line. Update the app."

S2  preview: 42 new · 3 updates · 18 already there · 2 errors
    ─▶ untick what's wrong ─▶ Add 45 ─▶ toast "Added 45 · Undo"
    ✗ row error ─▶ shown, unticked, can't be ticked; others still add

S3  same ids ─▶ "Already there" (hidden under a fold)
    changed  ─▶ "Update" row, changed fields shown; edited-in-app starts unticked

S4  toast Undo (5 s) · Settings › Imports › a batch › Remove this import
    ─▶ alert: "Removes 42 events added by this file. 3 you edited stay."

S5  event ─▶ EVIDENCE section ─▶ "212 photos in Kyoto · photos · Apr 3"
S6  COLLECTIONS ─▶ Trips ─▶ list by year ─▶ event
S7  Settings › Export events ─▶ JSON · CSV ─▶ share sheet
```

## Screen map

```
  ┌─ one page ─────────────────────────────────┐
  │ Life Line ▾                                │
  │ life line ─▶ anchor editor + EVIDENCE      │ uiux/collections.md
  │ COLLECTIONS ─▶ Collection ─▶ event         │ uiux/collections.md
  │ PLANS (unchanged)                          │
  │ Settings ─▶ Import events ─▶ Preview       │ uiux/import.md
  │          ─▶ Imports ─▶ batch               │ uiux/import.md
  │          ─▶ Export events (menu)           │ uiux/import.md
  └────────────────────────────────────────────┘
  Open in / AirDrop ─────────▶ Preview
  first run ─▶ "Import a file" ─▶ Preview
```

| Surface | Kind | Why |
|---|---|---|
| Preview | full-screen modal | arrives from outside the app; Cancel / Add |
| Row detail | pushed in the modal | fields + evidence + warnings |
| Imports | page | Settings child, a history list |
| Batch | page | counts, file, Remove |
| Export events | menu | two choices |
| Errors, Remove | alert | |

## States

| State | Shows |
|---|---|
| parsing | `⟳ Reading lifeline-events-2026-10-18.json…` in the preview |
| nothing new | `All 63 events are already on your line.` + Done |
| all errors | the errors list + `Nothing to add` |
| new person | `Add Ava as a person` row at the top |
| demo data | Import disabled: `Turn off demo data to import` |

## Copy rules

- Counts first, then the rows
- "Already there", not "duplicate"; "Update", not "conflict"
- Buttons: `Add 45` (live count) · `Cancel` · `Remove this import` ·
  `Import events` · `Export events`

## Deviations from the `uiux` skill

None.
