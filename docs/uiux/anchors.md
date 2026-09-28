# Anchor editor

Where a critical date goes in, with its notes. A modal over the page
(`+ Add an event`, a past date, a chapter's `+ Add notes` / `Edit this event`),
and the whole of first run. It edits the board on screen.

```
 ( Cancel )     Add an event        [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ What         Relocated to a country  › │
 │ Place     Toronto, Ontario, Canada   › │  ← "optional" when empty
 │ When          Sep 14, 2024           › │
 │ Precision     to the day             › │
 │ Event name                    Canada   │  ← "Who" + chips for linked kinds
 ╰────────────────────────────────────────╯
  NOTES
 ╭────────────────────────────────────────╮
 │ What happened, who was there, what it  │  ← multi-line, grows with text
 │ meant                                  │
 ╰────────────────────────────────────────╯

  PLANS THIS UNLOCKS                        ← live, follows What and Place
  [ ] Relocating · work or study · On…  ›
      26 steps · attaches on Save
 ──────────────────────────────────────────
  [ Delete this event ]!                     ← edit mode only
```

`Married` and `Child born` swap `Event name` for `Who`, with a chip per existing
person — drawn in [`people.md`](people.md#who-in-the-anchor-editor).

## The `Place` picker

Unfolds in place like `What`. Searches a bundled city list (GeoNames: every
Canadian and Chinese town of 1,000+, cities of 50,000+ elsewhere), biggest
first; `london, ontario` narrows after the comma. Offline. Names show in the
app's language, English (`Montreal`, `Sao Paulo`); Chinese places also match
their Chinese name (`南昌`).

```
 │ Place     optional                   ⌄ │
 │ ┌────────────────────────────────────┐ │
 │ │ toro▌                              │ │
 │ └────────────────────────────────────┘ │
 │ Toronto                                │
 │ Ontario, Canada                        │
 │ Katoro                                 │  ← "toro" inside the name ranks lower
 │ Geita, Tanzania                        │
 │ Use "toro"                             │  ← free text: a village isn't listed
 ╰────────────────────────────────────────╯
```

Empty field with a place set shows `Remove the place`. Linked events share it.
The stem row shows the town dim after the label (`Relocated to Canada · Toronto`);
chapter detail shows the full place.

## Kinds

Grouped as in the `What` picker. `○` = a moment: on the line, cuts no chapter.

| Group | Kind | Opens |
|---|---|---|
| Life | Born | every life stage, counted from it; adult paperwork (BC, Ontario, China) |
| School | Starts primary school | School years (counted from their Born) |
| School | Graduated | After graduation (Canada, China) |
| Work | First job · New job | Starting a job (Canada, China) |
| Work | Job ended | Job ended (BC, Ontario, China) |
| Work | Started a business | Self-employed or starting a business (BC, Ontario, China) |
| Work | Retire | Leaving work (Canada); Retirement (counted from their Born) |
| Moving | Relocated to a country | Relocating (BC, Ontario) · Relocating to China; leaving: Leaving Canada · Leaving China |
| Moving | Permit or visa granted | On a work or study permit (Canada) |
| Moving | Moved city | Moving home (BC, Ontario, China) |
| Moving | Apply for permanent residence | Express Entry · Provincial nomination (BC, Ontario) |
| Moving | Became a permanent resident | Life as a permanent resident · Citizenship |
| Moving | ○ Trip abroad | Visiting {country} · {passport} for its Place (US, Canada, China, Philippines, Japan, UK, Schengen; Chinese and Philippine passports); Travelling to China; leaving: Travelling abroad from Canada · from China |
| Family | Married · Moved in together | Getting married · Moving in together (BC, Ontario) |
| Family | Baby due | Expecting a baby |
| Family | Child born | Newborn · Early years, on the child's board, counted from her Born |
| Family | Bought a home · ○ Sold a home | Buying a home · Selling a home (BC, Ontario, China) |
| Family | ○ Bought a car | Buying a car (BC, Ontario, China) |
| Family | Separated or divorced | Separation and divorce (BC, Ontario, China) |
| Family | Caring for a family member | Caring for a family member (BC, Ontario) |
| Family | ○ Parent turns 60 | A parent turns 60 (China) |
| Family | ○ Death in the family | Death in the family (BC, Ontario, China) |
| Family | ○ Visitors arrive | Visitors to Canada; every passport's visa plan for where they're coming |

Visa plans carry `citizen` (the passport) and `country` (the destination;
`SCHENGEN` fits any Schengen country). For your own trip only your passport's
plan shows — read from your Born place; for visitors, every passport's.

"leaving" plans (`leaving: true`) match where the person lived *before* the
event and show only when it takes them to another country: moving from China
to BC opens Leaving China and Relocating · BC.

`PLANS THIS UNLOCKS` lists them as the event is filled in. A plan counted from
Born reads `counts from Born` and only shows once that Born exists; a child's
reads `on Ava's board` once her name is typed. `alsoOpens` on the kind says
which.

Relocated is a move on a permit, for work or study; permanent residence has
its own two dates. Older saved dates labelled `Migrated to a country`, `Lodge a
visa application` or `Visa granted` take the new labels on load.

Which of the opened plans shows follows the date's Place, else where the
person lives ([`people.md`](people.md#lives-in)).

## Moments

A visit or a trip has paperwork but doesn't change the chapter you're in.
`Event name` names who (a visit) or where (a trip); for a trip, `Place` is the
destination, so the plan follows it.

```
 ( Cancel )     Add an event        [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ What          Visitors arrive        › │
 │ Place     optional                   › │  ← empty: where you live
 │ When          Jun 12, 2027           › │
 │ Event name              Mom and Dad▌   │  ← "who: Mom and Dad…"
 ╰────────────────────────────────────────╯
  PLANS THIS UNLOCKS
  [ ] Visitors to Canada · visa, supe…  ›
      14 steps · attaches on Save
```

```
 ╭────────────────────────────────────────╮
 │ What          Trip abroad            › │
 │ Place     Shanghai, China            › │  ← the destination
 │ When          Jan 20, 2027           › │
 │ Event name                    China▌   │  ← "a country"
 ╰────────────────────────────────────────╯
  PLANS THIS UNLOCKS
  [ ] Travelling to China · visa and …  ›
      14 steps · attaches on Save
```

On the stem: `Mom and Dad arrive`, `Trip to China` — drawn in
[`timeline.md`](timeline.md).

## The `What` picker unfolds in place

Per the `uiux` skill (`references/mobile.md`): the row stays, everything below
it moves down. Nothing gets covered, so there's nothing to dismiss.

```
        tap What                  unfolded in place
 ╭────────────────────────╮   ╭────────────────────────╮
 │ What      Relocated  › │   │ What      Relocated  ⌄ │
 │ When      Sep 14     › │   │┌──────────────────────┐│
 │ Precision to the day › │ → ││ ┌──────────────────┐ ││
 │ Event name   Canada    │   ││ │ rel▌             │ ││ ← autofocused
 ╰────────────────────────╯   ││ └──────────────────┘ ││
                              ││ MOVING               ││
  PLANS THIS UNLOCKS          ││ ✓ Relocated to a     ││
  [ ] Relocating · work…   ›  ││   country            ││
                              ││   Moved city         ││
                              ││   Permit or visa     ││
                              ││   granted          ▓ ││
                              │└──────────────────────┘│
                              │ When      Sep 14     › │
                              │ Precision to the day › │
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
changed, leaving   ┌──────────────────────────────┐
(untouched: closes │ Discard this event?          │
 with no prompt)   │    ( Keep editing )          │
                   │            [[ Discard ]]!    │
                   └──────────────────────────────┘

editing a date
with attached      ┌──────────────────────────────┐
steps              │ Move "Relocated" to Jan 2025?│
                   │ 41 steps get rescheduled.    │
                   │ 12 already done keep their   │
                   │ real dates.                  │
                   │  ( Cancel )   [[ Move it ]]  │
                   └──────────────────────────────┘

deleting           │ Delete "Relocated"?          │
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
| `Delete this event` | tap | confirm naming the plans that detach; linked copies go too |

## Copy

| Key | String |
|---|---|
| `anchor.title.add` | Add an event |
| `anchor.title.edit` | Edit event |
| `anchor.field.what` | What |
| `anchor.field.name` | Event name |
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

`Event name` is free text, not just a place: "Xi'an", "BSc", "Ava". It reads into
the Timeline label per kind — `Relocated to Canada`, `Born · Xi'an`,
`Ava born`, `Mom and Dad arrive`, `Trip to China`.

`Notes` is where the past gets its words: what the day was like, not just when
it was. It replaced the journal — one text per date, no separate list.

`PLANS THIS UNLOCKS` is the only place the app suggests anything, and it does it
from the date just typed — no recommendation engine, no remote list.
