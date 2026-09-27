# Components

Anything drawn twice. Variants in one block so they can be compared.

## Step row

Used in Plans buckets, chapter detail, attached playbook detail.

```
 normal     Police check            Nov 12   ›
 start now  Book a language test  start now  ›   ← start-by passed; calm
 late     ⚠ Book a language test 5 days late ›   ← past due-by; red
 blocked    Submit PR application  blocked   ›
 done     ✓ Receive an ITA        Aug 02     ›
 moved      Renew passport         Dec 20 ▼  ›
 snoozed    Address history    snoozed 2w    ›
 skipped    Skills assessment   not for me   ›
 truncated  Overseas police certific…  Dec 01 ›

 ACT NOW    Book a language test
            start now · due Oct 30         ›     ← two-line form, calm
          ⚠ Book a language test
            due Sep 20 · 5 days late       ›     ← red only past due

 props: step · now · move(▲▼, tap → "was Jan 12" popover) · subtitle · detailed
```

`blocked` means a step it waits for is itself late, so no date can be promised.
A step whose prerequisites are merely unfinished still shows its projected date.

## Swipe row

Plans buckets only. Horizontal once the finger has clearly chosen horizontal.

```
 ← swipe    Police check      Nov 12 [ Done ][ Snooze ]
 → swipe  [ Not for me ] Police check      Nov 12
```

VoiceOver gets the same three as custom actions.

## Date wheels

The in-place picker for any date: month · day · year columns, snapping, a
highlight band on the chosen row. Columns follow precision.

```
 day       ░ September ░  ░ 14 ░  ░ 2024 ░
 month     ░ September ░          ░ 2024 ░
 year                             ░ 2024 ░
```

## Timeline stem

```
 past      1991  ● Born                     ›
 past      2013  ● Graduated                ›
 noted     2024  ● Relocated to Canada    ✎ ›   ← the date has notes
 current         ┃
 today     ══════ TODAY · Sep 26, 2026 ══════
 late            ┃  ⚠ 2 steps are late     ›   ← scrolls to Plans
 moment    2027  ○ Mom and Dad arrive (14) ›   ← same row; cuts no chapter
 future    2028  ○ Apply for perma…  (19) ›   ← (19) opens the chapter
 more            ⋮
 fuzzy     2013  ◍ Graduated · 2013         ›   ← year-precision anchor
```

## Progress bar

```
 empty   [░░░░░░░░░░░░░░░░]  0/19
 part    [██████░░░░░░░░░░]  8/22
 full    [████████████████]  4/4   ✓
 tiny    [██░░░░░░░░░░░░░░]  2/14
```

## Date pair

Everywhere a date shows. Absolute and relative, always both.

```
 soon      Nov 12, 2026   ·  in 47 days
 late      Sep 20, 2026   ·  5 days late
 today     Sep 26, 2026   ·  today
 far       Feb 2030       ·  in 3 years
 fuzzy     2013           ·  13 years ago
 none      —              ·  blocked
```

## Applies if

Who a playbook or step is for. On playbook detail, step detail, and (ages
only) Library rows. Hidden when there's neither.

```
 both      For ages 14–19
           • For a young person living in
             Ontario, from 14 to 19
 ages      For age 18+
 one age   For age 1
 library   from "Born" · ages 1–4               ← second line of the row
```

Plain text the user judges. The app filters on `ages.to` in one place only:
`Fits your dates` hides a birth-counted plan the person has outgrown.

## Person chips

Under `Who` in the anchor editor, for `Married` and `Child born`. One per
person other than the board's owner.

```
 none      ( Sam )  ( Ava )
 picked    ( Sam )  (( Ava ))                   ← (( )) = tinted, selected
```

## Inline explainer

```
 heading   REMINDERS  ⓘ
 popover   ⌐ Up to two sentences of the real
             reason, anchored under the ⓘ. ¬
```

One sentence may live outside, and only if it's the thing you'd read every
visit. Everything else goes in the popover — `uiux` skill, `references/mobile.md`.

## Unfolding picker

```
 closed    Precision   to the day          ›
 open      Precision   to the day          ⌄
          ╭────────────────────────────────╮
          │ ( ) just the year               │
          │ ( ) month and year              │
          │ (•) to the day                  │
          ╰────────────────────────────────╯
```

Row doesn't move, everything below does, one open at a time, no Cancel/Done.

## Reflow toast

```
 earlier   ⌐ Done. 3 later steps moved
             earlier.        ( Undo ) ¬     ← dark pill at the bottom, 5s
 later     ⌐ 41 steps rescheduled.
                             ( Undo ) ¬
 none      ⌐ Done.                      ¬
```

## Disclaimer strip

On every playbook and step surface. Never dismissible, never a modal.

```
  Reviewed Mar 2026 · not official advice
  ⚠ Over 2 years old. Check the steps
    against the current rules.          ›
```

## Not this

```
 ✗   Police check                   ⚠ 87%
     Steps don't get a completion percentage —
     a step is done or it isn't, and a
     percentage invites "mostly done", which
     the scheduler can't use.

 ✗   [ ACT NOW | 90 DAYS | YEAR | LATER ]
     Plans buckets as a segmented control:
     hides three of the four buckets, and the
     one thing you must see is that ACT NOW
     has something in it.
```
