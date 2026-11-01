# Home — the one page

The whole app is one scrolling page for whoever is on screen: header,
paperwork summary, events as a plain list, Plans, then a Settings link. No tab
bar, no ⚙. Everything else pushes on top.

```
            Paper Works ▾                       ← person dropdown, people.md
 ──────────────────────────────────────────
  PAPERWORK
 ╭────────────────────────────────────────╮
 │ ⚠ 2 steps are late                    ›│  ← only when late; scrolls to Plans
 │ 4 steps running · next starts in 12d  ›│  ← scrolls to Plans
 ╰────────────────────────────────────────╯
  COMING UP                                 ← soonest first
 ╭────────────────────────────────────────╮
 │ Mom and Dad arrive          14 to do  ›│
 │ Jun 12, 2027 · Vancouver · 30 days     │  ← date · place · length
 │ Apply for permanent resid…  19 to do  ›│
 │ Apr 2028                               │
 ╰────────────────────────────────────────╯
  PAST                                      ← newest first
 ╭────────────────────────────────────────╮
 │ Relocated to Canada ✎                 ›│  ← ✎ = the event has notes
 │ Sep 14, 2024 · Toronto                 │
 │ Ava born                              ›│  ← dim: nothing left to do
 │ Mar 2024                               │
 ╰────────────────────────────────────────╯
  ( + Add an event )
 ──────────────────────────────────────────
  PLANS                                     → plans.md
  ⚠ Expiring · plans, each with its next
  step · Done
  ( + Add a plan )
 ──────────────────────────────────────────
╭────────────────────────────────────────╮
│ Settings                   demo data ›  │  → settings.md; value only while
╰────────────────────────────────────────╯     demo data is on
```

Reached from: launch · back from any pushed page · a reminder tap (after
switching to that step's owner)

## States

```
first run  ┌────────────────────────────────────────┐
           │             Paper Works                 │
           │                                        │
           │  Add the event your paperwork is for — │
           │  a move, a trip, a new baby, a visa —  │
           │  and the forms it needs line up in     │
           │  order.                                │
           │                                        │
           │           [[ Add an event ]]           │
           └────────────────────────────────────────┘
                                          → anchors.md

new person   same, titled with their name; the Settings link still sits below it

someone     Paper Works ▾
else             Ava                        ← whose board, under the title

no plan     PAPERWORK
            No paperwork plans yet           ← dim
            PLANS
            [[ Browse plans ]]             → plans.md

no future   COMING UP section is left out; PAST alone

long label  Apply for permanent re…  19 to do ›
                                                    ← truncate at two lines
```

## Chapter detail

Pushed from any upcoming event on the home list.

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
  ( Edit this event )
```

```
moment      ‹         Mom and Dad arrive
            no chapter bar; "starts Jun 12,
            2027 · Vancouver, British Columbia,
            Canada", then OPENS, the steps of
            its plans, NOTES
with an end "Jun 12, 2027 – Jul 12, 2027 ·
            30 days · Vancouver, … · Visiting
            family or friends" in place of
            "starts …"; over 60 days reads
            "until Mar 2029"
no notes    NOTES
            ( + Add notes )                → anchors.md, Notes field
past        no ACTIVE STEPS header when nothing is open
nothing     Nothing to start in this stretch.
```

## Interactions

| Target | Action | Result |
|---|---|---|
| `Paper Works ▾` | tap | unfolds the person dropdown in place — [`people.md`](people.md) |
| paperwork rows | tap | scrolls the page down to Plans |
| past event | tap | → [`anchors.md`](anchors.md) editor |
| upcoming event | tap | → chapter detail for that event; a moment's page has no chapter bar |
| `+ Add an event` | tap | → anchor editor, blank |
| list | flick, then touch | page stops, row does **not** open — `uiux` skill, mobile: brake-not-tap |

Only events the user entered (or the linked copy of one, [`people.md`](people.md))
are listed; the derived round birthday is left off.

## Copy

| Key | String |
|---|---|
| `home.paperwork` | PAPERWORK |
| `home.upcoming` | COMING UP |
| `home.past` | PAST |
| `home.event.todo` | {n} to do |
| `home.firstRun.body` | Add the event your paperwork is for — a move, a trip, a new baby, a visa — and the forms it needs line up in order. |
| `home.firstRun.cta` | Add an event |
| `home.noPlan` | No paperwork plans yet |
| `home.addEvent` | + Add an event |
| `home.stepsRunning` | {n} steps running · next starts in {n}d |
| `home.late` | ⚠ {n} steps are late |
| `chapter.timeline.progress` | year {n} of {total} |
| `chapter.notes.add` | + Add notes |
| `chapter.nothing` | Nothing to start in this stretch. |

## Notes

Events are only there to hang paperwork on, so they read as a plain dated
list: what's coming up first, with how much is left to do, then what's
behind. The vertical life line went with the life-recording framing.
