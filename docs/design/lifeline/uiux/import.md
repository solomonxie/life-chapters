# Import preview · Row detail · Imports · Export

Preview: full-screen modal from Settings › Import events, "Open in Life
Line", AirDrop, or first run.

```
 Cancel        Import             Add 45
 ──────────────────────────────────────────
  lifeline-events-2026-10-18.json
  lifeline-desktop 0.1 · Oct 18, 2026
  42 new · 3 updates · 18 already there
  ⚠ 2 can't be read                     ›   → errors section
 ──────────────────────────────────────────
  PEOPLE
  ☑ Add Ava as a person
 ──────────────────────────────────────────
  NEW                           Untick all
  2024
  ☑ ✈ Trip to Kyoto      Apr 3 – 11     ›
      photos · mail
  ☑ ⌂ Moved to Vancouver   Aug 2024     ›
      location · lease
  ☐ ? Something big · Hangzhou  May 2019 ›  ← confidence low: starts unticked
      photos
  ☑ + Looks like Relocated to Canada    ›  ← match: adds evidence, no new event
      3 mails · 1 file
        ⋮
 ──────────────────────────────────────────
  UPDATES
  ☑ Trip to Lisbon    end Sep 9 → Sep 10 ›
  ☐ Married · Sam     date changed      ›  ← edited in app: starts unticked
       You edited this on your phone
 ──────────────────────────────────────────
  ▸ 18 already there                        ← folded
 ──────────────────────────────────────────
  CAN'T BE READ
  ⚠ row 14 · no date
  ⚠ row 37 · kind "gap-year" unknown,       ← warning, still importable
      added as an event
 ──────────────────────────────────────────
  DOCUMENTS
  ☑ Passport · expires May 9, 2031
```

`tap` a row's checkbox = toggle · `tap` the row = row detail.

## States

```
parsing    Cancel        Import
           ⟳ Reading lifeline-events-…json

nothing    All 63 events are already on your line.
new                      [[ Done ]]

not ours   alert  This isn't a Life Line events file
                  It needs "format": "lifeline-events".
                  [ OK ]

too new    alert  Made for a newer Life Line
                  Update the app to import this file.

too big    alert  This file is too big
                  Up to 20,000 rows or 10 MB.

after      toast  Added 45 events · Undo        ← 5 s, removes the batch
```

## Row detail

```
 ‹              Trip to Kyoto
 ──────────────────────────────────────────
  Kind                           Trip ▾     ← editable before adding
  Detail                         Kyoto
  From                     Apr 3, 2024
  To                      Apr 11, 2024
  Where             Kyoto, Japan    ›
  Who                         Me ▾
 ──────────────────────────────────────────
  EVIDENCE
  photos · 212 photos in Kyoto · Apr 3
  mail   · Your flight to Osaka · Mar 2
 ──────────────────────────────────────────
  id  trip-2024-04-03-kyoto                 ← small, secondary
  ☑ Add this event
```

## Imports (Settings › Imports)

```
 ‹              Imports
 ──────────────────────────────────────────
  lifeline-events-2026-10-18.json        ›
  Oct 18 · 45 added · 3 updated
  my-moves.csv                           ›
  Sep 30 · 7 added
```

Batch page: file, date, generator, counts, then `( Remove this import ! )`.

```
 alert  Remove this import?
        Removes 42 events added by this file.
        3 you edited stay.
        [ Cancel ]  [ Remove ! ]
```

## Settings rows

```
  DATA
  Import events                          ›   → Files picker → preview
  Export events                          ⋯   → menu: JSON · CSV → share sheet
  Imports                              2 ›
```

## Copy

| Key | String |
|---|---|
| `import.add` | Add {n} |
| `import.summary` | {new} new · {upd} updates · {same} already there |
| `import.errors` | {n} can't be read |
| `import.match` | Looks like {anchor} |
| `import.edited` | You edited this on your phone |
| `import.none` | All {n} events are already on your line. |
| `import.done` | Added {n} events |
| `import.notOurs` | This isn't a Life Line events file |
| `import.tooNew` | Made for a newer Life Line |
| `import.remove.body` | Removes {n} events added by this file. {k} you edited stay. |
