# Components

Anything drawn twice. Variants in one block so they can be compared.

## Step row

Used in Radar groups, phase detail, track detail.

```
 normal     Police check            Nov 12   ›
 late     ⚠ Book IELTS sitting  5 days late  ›
 blocked    Lodge EOI              blocked   ›
 done     ✓ Choose visa subclass  Aug 02     ›
 moved      Renew passport         Dec 20 ▼  ›
 snoozed    Address history    snoozed 2w    ›
 skipped    Skills assessment   not for me   ›
 waiting    Medical exam       waiting on 2  ›
 truncated  Overseas police certific…  Dec 01 ›

 props: status · date · delta(▲▼) · badge · playbook(optional subtitle)
```

## Timeline stem

```
 past      1991  ● Born                     ›
 past      2013  ● Graduated                ›
 current         ┃
 today     ══════ TODAY · Sep 26, 2026 ══════
 future    2027  ○ Citizenship eligible (6) ›
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
             earlier.        ( Undo ) ¬
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
     Radar's groups as a segmented control:
     hides three of the four buckets, and the
     one thing you must see is that ACT NOW
     has something in it.
```
