# Document detail

One document a step asked for: its scan, dates, number, and the steps that
need it. Pushed from a step's document row, or an `⚠ Expiring` row in Plans
([`plans.md`](plans.md)). There is no documents list of its own — expiring
ones surface in Plans, the rest live on the steps that ask for them.

```
 ‹       Police certificate · Canada      ⋯
 ──────────────────────────────────────────
  ┌────────────────────────────────────┐
  │        [ scan · 1 page ]           │     ← thumbnail, tap to view
  └────────────────────────────────────┘
 ──────────────────────────────────────────
  issued     Sep 26, 2026             ›
  expires    Dec 26, 2026             ›
  number     ••••••••  👁              ›     ← masked by default
  kept in    Files › Life Chapters      ›
 ──────────────────────────────────────────
  ⚠ Expires 17 days before "Submit
    application" needs it.               ›
    ( Plan a redo )
 ──────────────────────────────────────────
  ASKED FOR BY
  Police certificates   ✓ done Sep 26  ›
  Submit application    Jan 12         ›
```

## States

```
no scan      ┌────────────────────────────────────┐
             │   ( + Add a scan or photo )        │
             └────────────────────────────────────┘

no expiry    expires    doesn't expire           ›

expired      ⚠ Expired Aug 01, 2026
             [[ Plan a redo ]]

clash        ⚠ Expires 17 days before "Submit
               application" needs it.    ›
               ( Plan a redo )                     ← inserts a repeat step

long name    Overseas police certificate · Chi…  ›
```

## Interactions

| Target | Action | Result |
|---|---|---|
| clash line | tap | → the step that needs it |
| `( Plan a redo )` | tap | inserts a repeat of the originating step, dated to land inside the validity window, then reflows |
| `👁` | tap | reveals the number; re-masks on leaving the screen |
| `kept in` | tap | `[ Files app ]` at the app's own folder |
| `+ Add a scan` | tap | `[ camera / photo picker / Files ]` |
| `⋯` | tap | `Share…` `Replace scan` `Forget this document`! |

## Copy

| Key | String |
|---|---|
| `docs.expires` | expires {Mon d, yyyy} · in {n} days |
| `docs.noExpiry` | doesn't expire |
| `docs.neededBy` | needed by {step} |
| `docs.clash` | ⚠ Expires {n} days before "{step}" needs it. |
| `docs.planRedo` | Plan a redo |

## Notes

The clash line — *expires before the step that needs it* — is the single most
useful sentence in the app, and it is only computable because steps carry
validity windows. It sits at the top of the detail and, in short, on the
`⚠ Expiring` row in Plans.

Documents belong to one person's board, like dates and plans.

Scans are files in the app's own folder, visible in Files. No vault, no
encryption promise the app can't keep: see [`../DESIGN.md`](../DESIGN.md) — no
server, so nothing leaves the device unless the user shares it.
