# Timeline additions · Collections · Evidence

Changes to `../../../uiux/timeline.md`, `anchors.md` and the first run.

```
            Life Line ▾
 ──────────────────────────────────────────
  NOW · AGE 35
  ( NOW card unchanged )

  2016  ● Moved to Vancouver        ▣ ›   ← ▣ = has evidence (imported)
        │
  2019  ● Married · Sam             ✎ ›
        ⋮
 ──────────────────────────────────────────
  COLLECTIONS
 ┌────────────────────────────────────────┐
 │ ✈ Trips              23 · 9 countries ›│
 │ ⌂ Homes                          5    ›│
 │ ▤ Work                           3    ›│
 │ ✎ Study                          2    ›│
 │ ♥ Family                         4    ›│
 │ ▣ Papers             2 expiring       ›│ → Documents
 └────────────────────────────────────────┘
 ──────────────────────────────────────────
  PLANS (unchanged)
```

Collections with zero events are hidden; no events → section hidden.

| Collection | Kinds |
|---|---|
| Trips | `trip`, `visit` |
| Homes | `born`, `migrated`, `moved-city`, `home-bought`, `home-sold`, `cohabiting` |
| Work | `first-job`, `new-job`, `job-lost`, `business-started`, `retire` |
| Study | `school-start`, `graduated` |
| Family | `married`, `baby-due`, `child-born`, `separated`, `caregiving`, `parent-60`, `family-death` |
| Papers | documents, `visa-granted`, `visa-lodge`, `pr-landed` |

## Collection

```
 ‹              Trips
 ──────────────────────────────────────────
  23 trips · 9 countries · 148 days away
 ──────────────────────────────────────────
  2024
  Kyoto              Apr 3 – 11  · 9 d   ›
  Hangzhou          Jan 20 – 28  · 8 d   ›
  2023
  Lisbon            Sep 1 – 10  · 10 d   ›
  Mom and Dad visit  May 2 – Jun 1 · 30 d ›
        ⋮
```

Row → anchor editor. Homes rows: `Vancouver   Aug 2016 – now`.

## Evidence in the anchor editor

After NOTES; hidden when empty.

```
  EVIDENCE                 from my-moves.csv  ← the batch, tap → batch page
  photos · 212 photos in Kyoto · Apr 3
  mail   · Your flight to Osaka · Mar 2
  file   · Lease, 123 Main St          ↗     ← ↗ only when it has a url
```

## First run

```
 ┌────────────────────────────────────────┐
 │               Life Line                │
 │                                        │
 │   Two events and it starts drawing.    │
 │                                        │
 │        [[ When were you born? ]]       │
 │           Import a file                │ → Files picker → preview
 └────────────────────────────────────────┘
```

## Copy

| Key | String |
|---|---|
| `collections.trips.sub` | {n} · {c} countries |
| `collections.papers.sub` | {n} expiring |
| `evidence.from` | from {fileName} |
| `firstRun.import` | Import a file |
