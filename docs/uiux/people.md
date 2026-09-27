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
 │ Lives in          British Columbia   › │  ← "from the latest place" when
 │ Rename Ava                           › │    inferred  ← Me too, e.g. to a real name
 │ Remove Ava                           ! │  ← not for Me
 ╰────────────────────────────────────────╯
  NOW · AGE 2
  ⋮
```

Picking a person folds the menu and redraws the whole page for them.

```
remove     ┌──────────────────────────────┐
           │ Remove Ava?                  │
           │ Their dates and plans go.    │
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

For `Married` and `Child born`, the `Detail` row becomes `Who`, with a chip for
each other person.

```
 ( Cancel )     Add a date        [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ What          Child born             › │
 │ Who                            Ava▌    │  ← free text, or a chip
 │ ( Sam )  (( Ava ))                     │  ← (( )) = picked
 │ When          Mar 18, 2024           › │
 │ Precision     to the day             › │
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
| `people.link.detail` | A child or partner, joined by the date that ties you |
| `people.rename` | Rename {name} |
| `people.remove` | Remove {name} |
| `people.remove.body` | Their dates and plans go. Events on other boards stay. |
| `person.title` | New person · Link to {you \| name} · Rename |
| `person.new.note` | A separate board with its own dates and plans, not tied to anyone. |
| `person.link.child` | "{name} born" goes on {your \| name's} timeline, and {name} get a board of their own that starts on that date. |
| `person.link.partner` | The wedding goes on both timelines. Moving the date on one moves it on the other. |
| `anchor.field.who` | Who |

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

Provincial plans follow it. The first row keeps it inferred: the province of
the latest past date whose Place is in Canada. Any other row pins it.

```
 ( Done )          Lives in
 ──────────────────────────────────────────
  Provincial plans — school, health cards,
  licences, marriage — follow the province
  you live in.
 ╭────────────────────────────────────────╮
 │ ✓ From my events                       │
 │   Now: British Columbia, from the      │
 │   latest place                         │
 │   Alberta                              │
 │   British Columbia                     │
 │   ⋮                                    │
 │   Yukon                                │
 ╰────────────────────────────────────────╯
```
