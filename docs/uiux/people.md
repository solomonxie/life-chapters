# People

Each person has a board of their own — dates, plans, steps and documents —
and the one page shows one board at a time. People are joined by the events
they share: a birth, a wedding.

## Person dropdown

Tap the title. It unfolds in place at the top of the page, pushing the life
line down — not a sheet, per the `uiux` skill (`references/mobile.md`).

```
            Life Chapters ▴
                 Ava                        ← shown when it isn't Me
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │    Me                                  │
 │    Sam                                 │
 │ ✓  Ava                                 │  ← the board on screen
 ├────────────────────────────────────────┤
 │ ＋ New person                        › │
 │ Link a person to Ava                 › │
 │ A child, partner or parent, joined by  │
 │ the date that ties you                 │
 │ Lives in          British Columbia   › │  ← a province, or China;
 │ from the latest place                  │    shown when inferred
 │ Rename Ava                           › │  ← Me too, e.g. to a real name
 │ Remove Ava                           ! │  ← not for Me
 ╰────────────────────────────────────────╯
  NOW · AGE 2
  ⋮
```

Picking a person folds the menu and redraws the whole page for them.

```
remove     ┌──────────────────────────────┐
           │ Remove Ava?                  │
           │ Their events and plans go.    │
           │ Events on other boards stay. │
           │  ( Cancel )   [[ Remove ]]!  │
           └──────────────────────────────┘
             → back to Me; "Ava born" stays on
               mine, no longer linked
```

## Person modal

One modal, three modes. `Save` / `Link` greys out until there's a name.

```
 ( Cancel )     Link to you       [[ Link ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ Name                              Ava▌ │
 │ Is your                        Child › │
 │ Born                    Mar 18, 2024 › │
 ╰────────────────────────────────────────╯
  WHAT HAPPENS
  "Ava born" goes on your timeline, and
  Ava get a board of their own that starts
  on that date.

 Is your = Partner
 │ Married                 Jun 01, 2019 › │
  The wedding goes on both timelines.
  Moving the date on one moves it on the
  other.

 Is your = Parent
 │ Solomon born            Aug 06, 1988   │  ← fixed if Born exists
  Mom gets a board with "Solomon born" on
  it, tied to your birth date.
```

```
 ( Cancel )     New person        [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ Name                       Their name▌ │
 ╰────────────────────────────────────────╯
  A separate board with its own dates and
  plans, not tied to anyone.

 ( Cancel )       Rename          [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ Name                              Ava▌ │
 ╰────────────────────────────────────────╯
```

`Is your` and the date unfold in place, like the anchor editor. After `Save`
(new) or `Link`, the page switches to the new person's board. Linking from
someone else's board reads `Link to Ava`, and the note says `Ava's timeline`.

## Who, in the anchor editor

For `Married` and `Child born`, the `Event name` row becomes `Who`, with a chip for
each other person.

```
 ( Cancel )     Add an event        [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ What          Child born             › │
 │ Place     optional                   › │
 │ When          Mar 18, 2024           › │
 │ Precision     to the day             › │
 │ Who                            Ava▌    │  ← free text, or a chip
 │ ( Sam )  (( Ava ))                     │  ← (( )) = picked
 ╰────────────────────────────────────────╯
```

On Save, the name finds that person (case-insensitive) or creates them, and
their board gets the same event.

## Linked events

```
  MY BOARD                    AVA'S BOARD
  2019  ● Married · Sam       2024  ● Born           ← same date, same linkId
  2024  ● Ava born  ─────────────────┘
                              SAM'S BOARD
  2019  ● Married · Sam ───── 2019  ● Married · Me
```

| Event | The other board gets |
|---|---|
| my `Child born` · Ava | her `Born` |
| my `Married` · Sam | his `Married`, naming me |
| a parent link | the parent's `Child born`, tied to this person's `Born` |

- **Move** one copy → every copy moves, and every plan hanging off any of them
  reflows. One confirm, on the board you edited.
- **Delete** one copy → every copy goes. The people stay.
- **Rename** a person → the events that name them follow (`Ava born` becomes
  `Eva born`).
- A child's plans (newborn, early years, school) attach to **her** `Born`, on
  her board, so they count from her birth and fit her age.

## Reminders

Reminders cover every board. Tapping one switches to the step's owner, then
opens the step.

## Copy

| Key | String |
|---|---|
| `people.me` | Me |
| `people.new` | ＋ New person |
| `people.link` | Link a person to {me \| name} |
| `people.link.detail` | A child or partner, joined by the event that ties you |
| `people.rename` | Rename {name} |
| `people.remove` | Remove {name} |
| `people.remove.body` | Their events and plans go. Events on other boards stay. |
| `person.title` | New person · Link to {you \| name} · Rename |
| `person.new.note` | A separate board with its own dates and plans, not tied to anyone. |
| `person.link.child` | "{name} born" goes on {your \| name's} timeline, and {name} get a board of their own that starts on that date. |
| `person.link.partner` | The wedding goes on both timelines. Moving the date on one moves it on the other. |
| `anchor.field.who` | Who |
| `people.livesIn` | Lives in · {place \| not set} · from the latest place · Picks the plans for where they live |
| `livesIn.inferred` | Now: {place}, from where {you \| they} last moved · Set a place on Born or a move to work it out |

## Notes

A board is a namespace, not a filter: nothing from Sam's board shows on mine
except the events we share. That keeps each page short enough to read and
lets a child's plans count from the child's own birth.

The link is by event, not by relation field. "Ava is my child" is only ever
stated as "Ava born" on my board — the date is what the plans need.

The Person modal offers Child, Partner and Parent. Parent reuses this
person's `Born` (created if missing, date fixed if present); two parents share
one birth event.

## Lives in

Decides whose rules a person's plans follow — country, and in Canada the
province. The first row keeps it inferred: the latest past *residence* date
with a Place (Born, Relocated, Moved city, Bought a home — not a wedding or a
trip). A Place typed in Chinese with no country counts as China. Any other row
pins it.

```
 ( Done )          Lives in
 ──────────────────────────────────────────
  School, health cards, licences, marriage
  and pensions follow where you live. A
  date with a place of its own — a wedding
  abroad, say — follows that place instead.
 ╭────────────────────────────────────────╮
 │ ✓ From my events                       │
 │   Now: British Columbia, from where    │  ← "Set a place on Born or a
 │   you last moved                       │    move to work it out"
 ╰────────────────────────────────────────╯
  CANADA
 ╭────────────────────────────────────────╮
 │   Alberta                              │
 │   British Columbia                     │
 │   ⋮                                    │
 │   Yukon                                │
 ╰────────────────────────────────────────╯
  CHINA
 ╭────────────────────────────────────────╮
 │   China                                │
 ╰────────────────────────────────────────╯
```

Changing it re-sorts the Library and re-checks every attached plan: one whose
rules no longer match gets the flag and a switch to its twin
([`plans.md`](plans.md#playbook-library)). Nothing is swapped on its own.
