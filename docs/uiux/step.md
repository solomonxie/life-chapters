# Step detail

One node of a playbook, bound to real dates. The screen where work gets marked
done and the reflow becomes visible.

```
 ‹ Radar         Police check            ⋯
 ──────────────────────────────────────────
  Skilled migration AU · step 4 of 22

  start by   Nov 12, 2026   ·  in 47 days
  due by     Jan 10, 2027
  valid      3 months from issue        ⓘ    ← popover: why not earlier
 ──────────────────────────────────────────
  [[ Mark done ]]        ( Snooze… )
 ──────────────────────────────────────────
  DOCUMENTS TO OBTAIN                   1/3
  [x] Passport · bio page scan           ›
  [ ] AFP national police check          ›
  [ ] Overseas police cert · China       ›
 ──────────────────────────────────────────
  PREPARE                               0/2
  [ ] Address history, last 10 years
  [ ] Fingerprint appointment booked
 ──────────────────────────────────────────
  HOW TO                                  ⓘ
  1. Apply on the AFP portal, purpose
     code 33 (visa / immigration).
  2. Pay, then wait 2-15 business days.
  3. Certificate arrives by post; scan
     it into Docs before it expires.
                              Read more  ›
 ──────────────────────────────────────────
  BLOCKS
  → Lodge EOI             starts Jan 12  ›
  → Medical exam          starts Jan 12  ›
 ──────────────────────────────────────────
  WAITS FOR
  ✓ Choose visa subclass    done Aug 02  ›
```

Reached from: [`radar.md`](radar.md) · phase detail · another step's Blocks /
Waits-for · a notification

## States

```
blocked     start by   — blocked                ← no date until the blocker lands
            [[ Mark done ]]·  ← waiting on "Choose visa subclass"

done        ✓ Done · Sep 26, 2026     ( Undo )
            valid until Dec 26, 2026            ← from validForDays
            ⌐ 3 later steps moved earlier. ( Undo ) ¬

expiring    ⚠ Expires Dec 26, 2026 — 11 days
               before Lodge EOI needs it.   ›

expired     ⚠ Expired Aug 01. Redo this step.
            [[ Redo ]]

snoozed     start by   Nov 12  ·  snoozed 2 weeks
                                       ( Clear )

skipped     Not for me                ( Restore )
            2 later steps no longer wait for it.

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
| `step.valid` | valid |
| `step.markDone` | Mark done |
| `step.blockedBy` | waiting on "{step}" |
| `step.reflowed` | {n} later steps moved earlier. |
| `step.reflowedLater` | {n} later steps moved later. |
| `step.expiring` | ⚠ Expires {Mon d, yyyy} — {n} days before {step} needs it. |
| `step.skip` | Not for me |
| `step.skipped` | {n} later steps no longer wait for it. |
| `step.validInfo` | A police check is only accepted for 3 months. Starting sooner means paying for it twice. |
| `step.howToEmpty` | Nothing written yet. |

## Notes

`BLOCKS` and `WAITS FOR` are the graph made visible, and they're the reason the
reflow doesn't feel like magic — after marking one step done you can see exactly
which two rows moved and by how much. That's cheaper to trust than an
explanation.

`PREPARE` deliberately does not gate anything. If prep items blocked successors,
every playbook author would be forced to model "think about it" as a dependency.
