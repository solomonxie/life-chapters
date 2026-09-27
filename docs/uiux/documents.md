# Docs

Every document any step ever asked for, in one list, sorted by what dies first.
Fourth tab — the one screen you open without a step in mind.

```
  Docs                          🔍 Search
 ──────────────────────────────────────────
  ⚠ EXPIRING                            (2)
 ╭────────────────────────────────────────╮
 │ AFP police check                       │
 │ expires Dec 26, 2026 · in 91 days    ! │
 │ needed by Lodge EOI · Jan 12          ›│  ← the conflict, stated
 ├────────────────────────────────────────┤
 │ IELTS result                           │
 │ expires Mar 02, 2027 · in 157 days     │
 │ not needed again                      ›│
 ╰────────────────────────────────────────╯

  HELD                                  (6)
  Passport · CN         exp 2031-08    ›
  Birth certificate     no expiry      ›
  Driver licence · AU   exp 2029-01    ›
  ⋮
 ──────────────────────────────────────────
  MISSING                               (4)
  [ ] Overseas police cert · China   ›
  [ ] Skills assessment              ›
  ⋮
```

## Document detail

```
 ‹ Docs        AFP police check          ⋯
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
  ⚠ Expires 17 days before "Lodge EOI"
    needs it.                            ›
    ( Plan a redo )
 ──────────────────────────────────────────
  ASKED FOR BY
  Police check          ✓ done Sep 26  ›
  Lodge EOI             Jan 12         ›
```

## States

```
empty        ┌────────────────────────────────────────┐
             │       Nothing to keep track of         │
             │  Documents appear as steps ask for      │
             │  them.                                  │
             └────────────────────────────────────────┘

no scan      ┌────────────────────────────────────┐
             │   ( + Add a scan or photo )        │
             └────────────────────────────────────┘

no expiry    expires    doesn't expire           ›

expired      ⚠ Expired Aug 01, 2026
             [[ Plan a redo ]]

clash        ⚠ Expires 17 days before "Lodge EOI"
               needs it.                 ›
               ( Plan a redo )                     ← inserts a repeat step

long name    Overseas police certificate · Chi…  ›
```

## Interactions

| Target | Action | Result |
|---|---|---|
| `⚠ EXPIRING` row | tap | → detail, scrolled to the clash |
| `( Plan a redo )` | tap | inserts a repeat of the originating step, dated to land inside the validity window, then reflows |
| `👁` | tap | reveals the number; re-masks on leaving the screen |
| `kept in` | tap | `[ Files app ]` at the app's own folder |
| `+ Add a scan` | tap | `[ camera / photo picker / Files ]` |
| `⋯` | tap | `Share…` `Replace scan` `Forget this document`! |

## Copy

| Key | String |
|---|---|
| `docs.group.expiring` | ⚠ EXPIRING |
| `docs.group.held` | HELD |
| `docs.group.missing` | MISSING |
| `docs.expires` | expires {Mon d, yyyy} · in {n} days |
| `docs.noExpiry` | doesn't expire |
| `docs.neededBy` | needed by {step} · {Mon d} |
| `docs.notNeeded` | not needed again |
| `docs.clash` | ⚠ Expires {n} days before "{step}" needs it. |
| `docs.planRedo` | Plan a redo |
| `docs.empty` | Documents appear as steps ask for them. |

## Notes

The clash line — *expires before the step that needs it* — is the single most
useful sentence in the app, and it is only computable because steps carry
validity windows. It belongs at the top of the screen, not in a settings-like
detail row.

Scans are files in the app's own folder, visible in Files. No vault, no
encryption promise the app can't keep: see [`../DESIGN.md`](../DESIGN.md) — no
server, so nothing leaves the device unless the user shares it.
