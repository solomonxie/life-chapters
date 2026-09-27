# Timeline — the one page

The whole app is one scrolling page for whoever is on screen: header, life
line, Plans, Settings. No tab bar, no ⚙. Everything else pushes on top.

```
            Life Chapters ▾                     ← person dropdown, people.md
 ──────────────────────────────────────────
  NOW · AGE 35                              ← computed from the Born date
 ╭────────────────────────────────────────╮
 │ Settling in                            │
 │ Sep 2024 ───────●────────────  Apr 2028│  ← ● = today's position in chapter
 │ 4 steps running · next starts in 12d  ›│
 ╰────────────────────────────────────────╯

  1991  ● Born · Xi'an                    ›
        │
  2013  ◍ Graduated · BSc               ✎ ›  ← ✎ = the date has notes
        │
  2019  ● Married · Sam                   ›
        │
  2024  ● Ava born                        ›
        │
  2024  ● Relocated to Canada           ✎ ›
        ┃                                    ← thick stem = current chapter
  ══════ TODAY · Sep 26, 2026 ═════════════
        ┃  ⚠ 2 steps are late             ›  ← scrolls down to Plans
        ┃
  2027  ○ Mom and Dad arrive         (14) ›  ← a moment: the ┃ runs on
        ┃
  2028  ○ Apply for permanent resid… (19) ›
        │
  2031  ○ Turns 40                        ›
        ⋮
        ( + Add a date )
 ──────────────────────────────────────────
  PLANS                                     → plans.md
  ⚠ Expiring · Your plans · Act now ·
  Next steps · This year · Later · Done
  ( + Add a plan )
 ──────────────────────────────────────────
  Settings                                  → settings.md
  Reminders · Backup · Playbooks · About
  Life Chapters 1.0 · not advice
```

Reached from: launch · back from any pushed page · a reminder tap (after
switching to that step's owner)

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

new person ┌────────────────────────────────────────┐
 (empty)   │                 Ava                    │
           │   Two dates and it starts drawing.     │
           │        [[ When was Ava born? ]]        │
           └────────────────────────────────────────┘
             Settings still sits below it

someone     Life Chapters ▾
else             Ava                        ← whose board, under the title

dates only  1991  ● Born · Xi'an                  ›
 (no plan)        ⋮
            NOW card foot: No plans yet
            PLANS
            [[ Browse plans ]]             → plans.md

late        2024  ● Relocated to Canada           ›
                  ┃
            ══════ TODAY ═══════════════════════════
                  ┃  ⚠ 2 steps are late          ›

long label  2028  ○ Apply for permanent re…  (19) ›
                                                    ← truncate, never wrap
```

## Chapter detail

Pushed from the NOW card, any future event, or a node's `(n)` badge.

```
 ‹              Settling in
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ Sep 2024 ───────●──────────── Apr 2028 │
 │ year 3 of 4                            │  ← from the two bounding events
 ╰────────────────────────────────────────╯
  OPENS                                     ← plans hanging off this date
  Citizenship · CA              ✓ attached ›
 ──────────────────────────────────────────
  ACTIVE STEPS                          (4)
  ⚠ Book a language test    5 days late  ›
    Police certificates     starts Nov 12 ›
    Record days outside     starts Sep 28 ›
    Address history         starts Dec 01 ›
 ──────────────────────────────────────────
  NOTES
 ╭────────────────────────────────────────╮
 │ Two suitcases and a borrowed car. The  │  ← tap → anchor editor
 │ first night we slept on the floor of   │
 │ an empty flat.                         │
 ╰────────────────────────────────────────╯
 ──────────────────────────────────────────
  ENDS WITH
  ○ Apply for permanent resi…  Apr 2028  ›
 ──────────────────────────────────────────
  ( Edit this date )
```

```
moment      ‹         Mom and Dad arrive
            no chapter bar; "starts Jun 12,
            2027 · Vancouver, British Columbia,
            Canada", then OPENS, the steps of
            its plans, NOTES
no notes    NOTES
            ( + Add notes )                → anchors.md, Notes field
past        no ACTIVE STEPS header when nothing is open
nothing     Nothing to start in this stretch.
```

## Interactions

| Target | Action | Result |
|---|---|---|
| `Life Chapters ▾` | tap | unfolds the person dropdown in place — [`people.md`](people.md) |
| NOW card | tap | → chapter detail |
| past date `●` | tap | → [`anchors.md`](anchors.md) editor |
| future event `○` | tap | → chapter detail for that event; a moment's page has no chapter bar |
| `(15)` badge | tap | → that event's chapter detail |
| `⚠ 2 steps are late` | tap | scrolls the page down to Plans |
| `+ Add a date` | tap | → anchor editor, blank |
| list | flick, then touch | page stops, row does **not** open — `uiux` skill, mobile: brake-not-tap |

**Moments** (`Visitors arrive`, `Trip abroad`) sit on the stem like any date
and carry their plans' `(n)`, but don't cut the line: the chapter before them
runs on through, with the same stem, and the NOW card doesn't change. Their
page is the event and its plans, with no chapter bar
([`anchors.md`](anchors.md#moments)).

Derived events: only the next round birthday (`Turns 40`) from the Born date.
Every other row is a date the user entered, or the linked copy of one
([`people.md`](people.md)).

## Copy

| Key | String |
|---|---|
| `timeline.now` | NOW · AGE {n} |
| `timeline.today` | TODAY · {Mon d, yyyy} |
| `timeline.chapter.progress` | year {n} of {total} |
| `timeline.firstRun.body` | Two dates and it starts drawing. |
| `timeline.firstRun.cta` | When were you born? · When was {name} born? |
| `timeline.noPlan` | No plans yet |
| `timeline.addDate` | + Add a date |
| `timeline.stepsRunning` | {n} steps running · next starts in {n}d |
| `timeline.late` | ⚠ {n} steps are late |
| `chapter.notes.add` | + Add notes |
| `chapter.nothing` | Nothing to start in this stretch. |

## Notes

The stem is the design. A list of dated rows would read as a table; the
continuous `│`/`┃` line is what makes a 40-year span feel like one object you're
standing inside. `┃` is the only place the current chapter is marked — no badge,
no colour needed.

One page because the life line and the plan are the same thing at two zoom
levels. Tabs made them look like separate apps; one scroll keeps each step
under the date it serves.
