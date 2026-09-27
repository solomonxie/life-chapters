# Step detail

One node of a playbook, bound to real dates. The screen where work gets marked
done and the reflow becomes visible.

```
 ‹                                       ⋯  ← nav bar empty
 ──────────────────────────────────────────
  Order police certificates                 ← full title, wraps if long
  Skilled migration · CA · step 14 of 19
                                           ← AppliesIf lines here, if any
  Reviewed Sep 2026 · not official advice

  start by   Nov 12, 2026   ·  in 47 days
  due by     Jan 10, 2027 · suggested
                                 Change ›   ← date wheel unfolds here
  valid      6 months from issue        ⓘ    ← popover: why not earlier
 ──────────────────────────────────────────
  [[ Mark done ]]        ( Snooze… )
 ──────────────────────────────────────────
  DOCUMENTS TO OBTAIN                   1/3
  [x] Passport · bio page scan           ›
  [ ] Police certificate · Canada        ›
  [ ] Police certificate · China         ›
 ──────────────────────────────────────────
  PREPARE                               0/2
  [ ] Address history, last 10 years
  [ ] Fingerprint appointment booked
 ──────────────────────────────────────────
  HOW TO                                  ⓘ
  1. One certificate per country lived
     in for 6+ months since age 18.
  2. Each country has its own process
     and wait.
  3. Scan each one into its document
     before it expires.
                              Read more  ›
 ──────────────────────────────────────────
  BLOCKS
  → Submit PR application starts Jan 12  ›
 ──────────────────────────────────────────
  WAITS FOR
  ✓ Receive an ITA          done Aug 02  ›
```

Reached from: [`plans.md`](plans.md) · chapter detail · playbook detail ·
another step's Blocks / Waits-for · a reminder (switching to its owner first)

## States

```
blocked     start by   — blocked                ← no date until the blocker lands
            [[ Mark done ]]·  ← waiting on "Receive an ITA"

done        ✓ Done · Sep 26, 2026  Change ›  ( Undo )
            valid until Dec 26, 2026            ← from validForDays
            ⌐ 3 later steps moved earlier. ( Undo ) ¬

expiring    ⚠ Expires Dec 26, 2026 — 11 days
               before Submit PR needs it.   ›

expired     ⚠ Expired Aug 01. Redo this step.
            [[ Redo ]]

snoozed     start by   Nov 12  ·  snoozed 2 weeks
                                       ( Clear )

skipped     Not for me                ( Restore )
            2 later steps no longer wait for it.

applies if  Take the literacy course (OSSLC)
            For ages 16–18
            • Only if they have had two chances
              at the OSSLT and were unsuccessful
              at least once                   ← AppliesIf, components.md

no how-to   HOW TO
            Nothing written yet.   ( Add a note )
```

## Interactions

| Target | Action | Result |
|---|---|---|
| `[[ Mark done ]]` | tap | pins today, reflows successors, toast with `( Undo )` |
| `[[ Mark done ]]` | long-press | date picker — done on a past date |
| document row | tap | → [`documents.md`](documents.md) detail |
| document `[ ]` | tap | checks it; last one checked offers `Mark step done` |
| prepare `[ ]` | tap | checks it, no reflow — prep isn't a dependency |
| `ⓘ` beside `valid` | tap | popover: validity window, why starting early wastes it |
| `Blocks` row | tap | → that step, and its dates now reflect this one |
| `⋯` | tap | action sheet: `Not for me` `Add a note` `Move due date…` `View in playbook` |
| `( Snooze… )` | tap | action sheet: 1 week · 2 weeks · 1 month · 3 months |
| `Move due date…` | pick | date wheels unfold under the buttons; `( Reset )` drops the override |

## Copy

| Key | String |
|---|---|
| `step.of` | {playbook} · step {n} of {total} |
| `step.startBy` | start by |
| `step.dueBy` | due by |
| `step.dueBy.source` | · suggested · · moved by you |
| `step.change` | Change › |
| `step.move` | Move the due date to · Move it · Reset |
| `step.doneOn` | Done on · Save |
| `step.valid` | valid |
| `step.markDone` | Mark done |
| `step.blockedBy` | waiting on "{step}" |
| `step.reflowed` | {n} later steps moved earlier. |
| `step.reflowedLater` | {n} later steps moved later. |
| `step.expiring` | ⚠ Expires {Mon d, yyyy} — {n} days before {step} needs it. |
| `step.skip` | Not for me |
| `step.skipped` | {n} later steps no longer wait for it. |
| `step.validInfo` | {step} is usually accepted for {duration} from issue. Starting before {date} risks it expiring before {Mon d} — paying for it twice. |
| `appliesIf.ages` | For {age n+ \| ages n–m} |
| `appliesIf.condition` | • {condition} |
| `step.howToEmpty` | Nothing written yet. |

## Notes

`BLOCKS` and `WAITS FOR` are the graph made visible, and they're the reason the
reflow doesn't feel like magic — after marking one step done you can see exactly
which two rows moved and by how much. That's cheaper to trust than an
explanation.

`AppliesIf` lines are plain text the user judges, not rules the app enforces.
A step that doesn't apply is swiped or marked `Not for me` — the app never
guesses eligibility.

`PREPARE` deliberately does not gate anything. If prep items blocked successors,
every playbook author would be forced to model "think about it" as a dependency.

## Title and dates

```
  due by     Mar 01, 2027 · moved by you
                                 Change ›
 ╭────────────────────────────────────────╮
 │ Move the due date to                   │
 │   ░ March ░    ░ 01 ░    ░ 2027 ░      │
 │ ( Cancel )   ( Reset )   [[ Move it ]] │  ← Reset only when moved
 ╰────────────────────────────────────────╯
```

The step's full title is the first line of the page, wrapping as needed; the
nav bar stays empty so nothing is cut off. `due by` shows `· suggested` or
`· moved by you` and `Change ›`: tapping unfolds the date wheel under the dates
(`Move it`, `Reset` when moved). The new date replaces the suggestion, the
step's start-by and every step waiting on it reflow, and the lists follow. A
done step's `✓ Done · date  Change ›` corrects when it was really done.
