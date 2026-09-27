# Anchor editor

Where a critical date goes in. Pushed from Timeline (`+ Add a date` or tapping
an anchor), and the whole of first run.

```
 ( Cancel )     Add a date        [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ What          Migrated to a country  › │
 │ Detail        Australia                │
 │ When          Sep 14, 2024           › │
 │ Precision     to the day             › │
 ╰────────────────────────────────────────╯

  TRACKS THIS UNLOCKS                       ← live, updates as What changes
  [ ] Skilled migration · AU            ›
  [ ] Citizenship · AU                  ›
  [ ] First home buyer · AU             ›
 ──────────────────────────────────────────
  [ Delete this date ]!                     ← edit mode only
```

## The `What` picker unfolds in place

Per the `uiux` skill (`references/mobile.md`): the row stays, everything below
it moves down. Nothing gets covered, so there's nothing to dismiss.

```
        tap What                  unfolded in place
 ╭────────────────────────╮   ╭────────────────────────╮
 │ What      Migrated   › │   │ What      Migrated   ⌄ │
 │ Detail    Australia    │   │┌──────────────────────┐│
 │ When      Sep 14     › │ → ││ ┌──────────────────┐ ││
 │ Precision to the day › │   ││ │ mig▌             │ ││ ← autofocused
 ╰────────────────────────╯   ││ └──────────────────┘ ││
                              ││ MOVING               ││
  TRACKS THIS UNLOCKS         ││ ✓ Migrated to a      ││
  [ ] Skilled migration    ›  ││   country            ││
                              ││   Moved city         ││
                              ││   Visa granted       ││
                              ││ SCHOOL               ││
                              ││   Started school   ▓ ││
                              │└──────────────────────┘│
                              │ Detail    Australia    │
                              │ When      Sep 14     › │
                              ╰────────────────────────╯
                                Save pushed below the fold
```

`›` → `⌄` on the open row. One row open at a time. No Cancel/Done inside the
panel — picking folds it.

## First run

Three screens, no skip, because one anchor draws nothing.

```
  ①                      ②                      ③
 ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
 │ Life Planner │      │ One more.    │      │ Pick a track │
 │              │      │              │      │              │
 │ When were    │      │ Anything big │      │ Skilled      │
 │ you born?    │      │ already      │      │ migration ›  │
 │              │      │ behind you?  │      │ Start school │
 │ ┌──────────┐ │      │              │      │ Buy a home › │
 │ │ 1991-04▌ │ │      │ ( Skip )     │      │ Retirement › │
 │ └──────────┘ │      │ [[ Add ]]    │      │              │
 │ [[ Next ]]   │      │              │      │ ( Later )    │
 └──────────────┘      └──────────────┘      └──────────────┘
```

## States

```
unsaved, leaving   ┌──────────────────────────────┐
                   │ Discard this date?           │
                   │    ( Keep editing )          │
                   │            [[ Discard ]]!    │
                   └──────────────────────────────┘

editing a date
with attached      ┌──────────────────────────────┐
steps              │ Move "Migrated" to Jan 2025? │
                   │ 41 steps get rescheduled.    │
                   │ 12 already done keep their   │
                   │ real dates.                  │
                   │  ( Cancel )   [[ Move it ]]  │
                   └──────────────────────────────┘

deleting           │ Delete "Migrated"?           │
                   │ 2 tracks lose their anchor   │
                   │ and detach.                  │
                   │  ( Cancel )   [[ Delete ]]!  │

future date        When      Sep 14, 2029        ›
                   ⌐ That's ahead — it'll show as
                     a plan, not a fact. ¬

precision open     Precision  to the day         ⌄
                   │ ( ) just the year            │
                   │ ( ) month and year           │
                   │ (•) to the day               │
```

## Interactions

| Target | Action | Result |
|---|---|---|
| any row | tap | unfolds its options in place, folds whichever was open |
| `What` | type | filters the kind list; a kind not in the list is kept as free text |
| unlocked track `[ ]` | tap | attaches it on Save, no second trip to Tracks |
| `Save` | tap | reflow, then back to Timeline scrolled to the new anchor |
| `Delete this date` | tap | confirm naming the tracks that detach |

## Copy

| Key | String |
|---|---|
| `anchor.title.add` | Add a date |
| `anchor.title.edit` | Edit date |
| `anchor.field.what` | What |
| `anchor.field.detail` | Detail |
| `anchor.field.when` | When |
| `anchor.field.precision` | Precision |
| `anchor.unlocks` | TRACKS THIS UNLOCKS |
| `anchor.future` | That's ahead — it'll show as a plan, not a fact. |
| `anchor.moveConfirm` | {n} steps get rescheduled. {m} already done keep their real dates. |
| `anchor.firstRun.1` | When were you born? |
| `anchor.firstRun.2` | Anything big already behind you? |
| `anchor.firstRun.3` | Pick a track |

## Notes

`Precision` exists because "graduated in 2013" is real knowledge and forcing a
day out of it makes every derived date falsely exact. A year-precision anchor
schedules from mid-year and the Timeline prints `2013`, not `Jun 30, 2013`.

`Detail` is free text, not just a place: "Xi'an", "BSc", "Ava". It reads into
the Timeline label per kind — `Migrated to Australia`, `Born · Xi'an`,
`Ava starts primary school`.

`TRACKS THIS UNLOCKS` is the only place the app suggests anything, and it does it
from the date just typed — no recommendation engine, no remote list.
