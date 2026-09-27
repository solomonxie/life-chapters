# Radar

Everything ahead, grouped by how soon you must *start* it. Second tab. The
screen the notification opens.

```
  Radar                            Filter…
 ──────────────────────────────────────────
  ⚠ ACT NOW                            (2)
 ╭────────────────────────────────────────╮
 │ Book IELTS sitting                     │
 │ start by Sep 20 · 5 days late        ! │
 │ Skilled migration AU                  ›│
 ├────────────────────────────────────────┤
 │ Order birth certificate copy           │
 │ start by Sep 28 · in 2 days            │
 │ Skilled migration AU                  ›│
 ╰────────────────────────────────────────╯

  NEXT 90 DAYS                          (4)
 ╭────────────────────────────────────────╮
 │ Police check            Nov 12       ›│
 │ Address history, 10 yr  Dec 01       ›│
 │ Ava: school zone check  Dec 15       ›│
 │ Renew passport          Dec 20    ▼  ›│  ← ▼ = moved later by a reflow
 ╰────────────────────────────────────────╯

  THIS YEAR                             (9) ›
  LATER                                (37) ›
```

Reached from: tab bar · a `(n)` badge on Timeline · tapping a notification

## States

```
empty, no track
   ┌────────────────────────────────────────┐
   │              Nothing ahead              │
   │   Add a track and the dates fill in.    │
   │           [[ Browse tracks ]]           │
   └────────────────────────────────────────┘

empty, all clear
   ┌────────────────────────────────────────┐
   │        Nothing to start yet ✓           │
   │   Next is Police check, Nov 12.         │
   └────────────────────────────────────────┘

notifications denied                           ← one banner, dismissible
   ⌐ Reminders are off, so nothing will
     warn you.            ( Allow )  ( ✕ ) ¬

filter open
  Radar                            Filter ⌄   ← unfolds in place, pushes list
 ╭────────────────────────────────────────╮
 │ TRACK                                  │
 │ ✓ Skilled migration AU                 │
 │ ✓ Ava · primary school                 │
 │   Retirement                           │
 ├────────────────────────────────────────┤
 │ [ ALL | Blocked | Waiting on a doc ]   │
 ╰────────────────────────────────────────╯
```

## Interactions

| Target | Action | Result |
|---|---|---|
| step row | tap | → [`step.md`](step.md) |
| step row | swipe ← | `[ Done ]` `[ Snooze ]` |
| step row | swipe → | `[ Not for me ]` — detaches just this step |
| group header | tap | collapse / expand, remembered |
| `Filter…` | tap | unfolds in place (not a sheet) — `uiux` skill, mobile |
| `▲` / `▼` | tap | popover: what moved it, and from which date |

## Copy

| Key | String |
|---|---|
| `radar.group.now` | ⚠ ACT NOW |
| `radar.group.d90` | NEXT 90 DAYS |
| `radar.group.year` | THIS YEAR |
| `radar.group.later` | LATER |
| `radar.startBy` | start by {Mon d} |
| `radar.late` | {n} days late |
| `radar.soon` | in {n} days |
| `radar.empty.noTrack` | Add a track and the dates fill in. |
| `radar.empty.clear` | Nothing to start yet ✓ |
| `radar.notif.denied` | Reminders are off, so nothing will warn you. |

## Notes

`ACT NOW` is anything to start within 14 days, late ones included; it never
collapses. `THIS YEAR` and `LATER` start collapsed. A snoozed step groups by
the day its snooze ends. The Radar tab carries a red badge with the count of
late steps — the one place outside ACT NOW where red appears.

Grouping is by **start-by**, not due date — the whole point is being warned
while there's still time to act. A step due in 2 years whose paperwork takes 14
months belongs in ACT NOW, and that's the case a due-date sort gets wrong.

Red appears only in ACT NOW. If every group had a colour, none of them would
mean anything.
