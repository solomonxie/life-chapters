# Timeline

The life line: anchors behind you, events ahead, the chapter you're in between
them. First tab, app's home.

```
             Life Chapters                 ⚙
 ──────────────────────────────────────────
  NOW · age 34                              ← computed from the Born anchor
 ╭────────────────────────────────────────╮
 │ Settling in · Australia                │
 │ Sep 2024 ───────●────────────  Sep 2029│  ← ● = today's position in chapter
 │ 4 steps running · next starts in 12d  ›│
 ╰────────────────────────────────────────╯

  1991  ● Born · Xi'an                    ›
        │
  2013  ● Graduated · BSc                 ›
        │
  2019  ● First job · Shenzhen            ›
        │
  2024  ● Migrated to Australia           ›
        ┃                                    ← thick stem = current chapter
  ══════ TODAY · Sep 26, 2026 ═════════════
        ┃
  2027  ○ Citizenship eligible        (6) ›
        │
  2029  ○ Ava starts primary school  (11) ›
        │
  2031  ○ Turns 40                        ›
        ⋮
        ( + Add a date )
```

Reached from: launch · back from any pushed page · tab bar

## States

```
first run  ┌────────────────────────────────────────┐
           │            Life Chapters                │
           │                                        │
           │   Two dates and it starts drawing.     │
           │                                        │
           │        [[ When were you born? ]]       │
           └────────────────────────────────────────┘
                                          → anchors.md

dates only   1991  ● Born · Xi'an                  ›
 (no track)        ⋮
             ══════ TODAY ═══════════════════════════
                   ⌐ Dates, but no plan yet. ¬
                   ( Add a track )    → tracks.md

late        2024  ● Migrated to Australia          ›
                  ┃
            ══════ TODAY ════════════════════════════
                  ┃  ⚠ 2 steps are late         (2) ›

long label  2029  ○ Ava starts primary sch…  (11) ›
                                                    ← truncate, never wrap
```

## Chapter detail

Pushed from the NOW card or any stem segment.

```
 ‹ Timeline      Settling in            ⋯
 ──────────────────────────────────────────
  Sep 2024 ───────●────────────── Sep 2029
  year 2 of 5                              ← from the two bounding events
 ──────────────────────────────────────────
  OPENS                                     ← what this chapter makes possible
  Permanent residency held           ✓
  Citizenship clock running          ✓
 ──────────────────────────────────────────
  ACTIVE STEPS                          (4)
  ⚠ Book IELTS sitting      5 days late  ›
    Police check            starts Nov 12 ›
    Order birth cert copy   starts Sep 28 ›
    Address history         starts Dec 01 ›
 ──────────────────────────────────────────
  ENDS WITH
  ○ Citizenship eligible · Sep 2029     ›
```

## Interactions

| Target | Action | Result |
|---|---|---|
| NOW card | tap | → chapter detail |
| anchor row `●` | tap | → [`anchors.md`](anchors.md) editor |
| event row `○` | tap | → chapter detail scoped to that event; `( Edit this date )` at its foot |
| `(6)` badge | tap | → [`radar.md`](radar.md), filtered to that event (a removable `Only …` chip) |
| `⚠ 2 steps are late` | tap | → [`radar.md`](radar.md) |
| `+ Add a date` | tap | → anchor editor, blank |
| ⚙ | tap | → [`settings.md`](settings.md) |
| list | flick, then touch | page stops, row does **not** open — `uiux` skill, mobile: brake-not-tap |

Derived events: only the next round birthday (`Turns 40`) from the Born date.
Every other row is a date the user entered.

## Copy

| Key | String |
|---|---|
| `timeline.now` | NOW · age {n} |
| `timeline.today` | TODAY · {Mon d, yyyy} |
| `timeline.chapter.progress` | year {n} of {total} |
| `timeline.firstRun.body` | Two dates and it starts drawing. |
| `timeline.firstRun.cta` | When were you born? |
| `timeline.noTrack` | Dates, but no plan yet. |
| `timeline.addDate` | + Add a date |
| `timeline.stepsRunning` | {n} steps running · next starts in {n}d |

## Notes

The stem is the design. A list of dated rows would read as a table; the
continuous `│`/`┃` line is what makes a 40-year span feel like one object you're
standing inside. `┃` is the only place the current chapter is marked — no badge,
no colour needed.
