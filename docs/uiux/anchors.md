# Anchor editor

Where a critical date goes in, with its notes. A modal over the page
(`+ Add a date`, a past date, a chapter's `+ Add notes` / `Edit this date`),
and the whole of first run. It edits the board on screen.

```
 ( Cancel )     Add a date        [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ What          Migrated to a country  › │
 │ Detail                        Canada   │  ← "Who" + chips for linked kinds
 │ Place     Toronto, Ontario, Canada   › │  ← "optional" when empty
 │ When          Sep 14, 2024           › │
 │ Precision     to the day             › │
 ╰────────────────────────────────────────╯
  NOTES
 ╭────────────────────────────────────────╮
 │ What happened, who was there, what it  │  ← multi-line, grows with text
 │ meant                                  │
 ╰────────────────────────────────────────╯

  PLANS THIS UNLOCKS                        ← live, updates as What changes
  [ ] Citizenship · CA                  ›
      14 steps · attaches on Save
 ──────────────────────────────────────────
  [ Delete this date ]!                     ← edit mode only
```

`Married` and `Child born` swap `Detail` for `Who`, with a chip per existing
person — drawn in [`people.md`](people.md#who-in-the-anchor-editor).

## The `Place` picker

Unfolds in place like `What`. Searches a bundled city list (GeoNames: every
Canadian and Chinese town of 1,000+, cities of 50,000+ elsewhere), English or
Chinese, biggest first; `london, ontario` narrows after the comma. Offline.

```
 │ Place     optional                   ⌄ │
 │ ┌────────────────────────────────────┐ │
 │ │ toro▌                              │ │
 │ └────────────────────────────────────┘ │
 │ Toronto  多伦多                         │
 │ Ontario, Canada                        │
 │ Katoro                                 │  ← "toro" inside the name ranks lower
 │ Geita, Tanzania                        │
 │ Use "toro"                             │  ← free text: a village isn't listed
 ╰────────────────────────────────────────╯
```

Empty field with a place set shows `Remove the place`. Linked events share it.
The stem row shows the town dim after the label (`Migrated to Canada · Toronto`);
chapter detail shows the full place.

## The `What` picker unfolds in place

Per the `uiux` skill (`references/mobile.md`): the row stays, everything below
it moves down. Nothing gets covered, so there's nothing to dismiss.

```
        tap What                  unfolded in place
 ╭────────────────────────╮   ╭────────────────────────╮
 │ What      Migrated   › │   │ What      Migrated   ⌄ │
 │ Detail    Canada       │   │┌──────────────────────┐│
 │ When      Sep 14     › │ → ││ ┌──────────────────┐ ││
 │ Precision to the day › │   ││ │ mig▌             │ ││ ← autofocused
 ╰────────────────────────╯   ││ └──────────────────┘ ││
                              ││ MOVING               ││
  PLANS THIS UNLOCKS          ││ ✓ Migrated to a      ││
  [ ] Citizenship · CA     ›  ││   country            ││
                              ││   Moved city         ││
                              ││   Visa granted       ││
                              ││ SCHOOL               ││
                              ││   Started school   ▓ ││
                              │└──────────────────────┘│
                              │ Detail    Canada       │
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
 │ Life Chapters │      │ One more.    │      │ Pick a plan  │
 │              │      │              │      │              │
 │ When were    │      │ Anything big │      │ Skilled      │
 │ you born?    │      │ already      │      │ migration ›  │
 │              │      │ behind you?  │      │ Citizenship ›│
 │ ┌──────────┐ │      │              │      │ Getting      │
 │ │ 1991-04▌ │ │      │ ( Skip )     │      │ married ›    │
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
                   │ 2 plans lose their date and  │
                   │ detach.                      │
                   │  ( Cancel )   [[ Delete ]]!  │

future date        When      Sep 14, 2029        ›
                   ⌐ That's ahead — it'll show as
                     a plan, not a fact. ¬

linked event       moving or deleting "Ava born" moves or
                   deletes her "Born" too, and reflows
                   the plans on both boards

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
| `Who` chip | tap | fills `Who` with that person |
| `Notes` | type | free text; shows on the chapter screen, `✎` on the stem |
| unlocked plan `[ ]` | tap | attaches it on Save, no second trip to the library |
| `Save` | tap | reflow (linked copies too), then back to the page |
| `Delete this date` | tap | confirm naming the plans that detach; linked copies go too |

## Copy

| Key | String |
|---|---|
| `anchor.title.add` | Add a date |
| `anchor.title.edit` | Edit date |
| `anchor.field.what` | What |
| `anchor.field.detail` | Detail |
| `anchor.field.when` | When |
| `anchor.field.precision` | Precision |
| `anchor.field.who` | Who |
| `anchor.notes` | NOTES |
| `anchor.notes.placeholder` | What happened, who was there, what it meant |
| `anchor.unlocks` | PLANS THIS UNLOCKS |
| `anchor.unlocks.detail` | {n} steps · attaches on Save |
| `anchor.delete` | {n} plans lose their date and detach. |
| `anchor.future` | That's ahead — it'll show as a plan, not a fact. |
| `anchor.moveConfirm` | {n} steps get rescheduled. {m} already done keep their real dates. |
| `anchor.firstRun.1` | When were you born? |
| `anchor.firstRun.2` | Anything big already behind you? |
| `anchor.firstRun.3` | Pick a plan |

## Notes

`Precision` exists because "graduated in 2013" is real knowledge and forcing a
day out of it makes every derived date falsely exact. A year-precision anchor
schedules from mid-year and the Timeline prints `2013`, not `Jun 30, 2013`.

`Detail` is free text, not just a place: "Xi'an", "BSc", "Ava". It reads into
the Timeline label per kind — `Migrated to Canada`, `Born · Xi'an`,
`Ava born`.

`Notes` is where the past gets its words: what the day was like, not just when
it was. It replaced the journal — one text per date, no separate list.

`PLANS THIS UNLOCKS` is the only place the app suggests anything, and it does it
from the date just typed — no recommendation engine, no remote list.
