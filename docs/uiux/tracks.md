# Tracks

The playbooks you've attached, and the library you attach them from. Third tab.

```
  Tracks                              + 
 ──────────────────────────────────────────
  RUNNING                               (3)
 ╭────────────────────────────────────────╮
 │ Skilled migration · AU                 │
 │ [██████░░░░░░░░░░] 8/22    next Sep 28│›
 ├────────────────────────────────────────┤
 │ Ava · primary school                   │
 │ [██░░░░░░░░░░░░░░] 2/14    next Dec 15│›
 ├────────────────────────────────────────┤
 │ Retirement                             │
 │ [░░░░░░░░░░░░░░░░] 0/19    next 2031  │›
 ╰────────────────────────────────────────╯

  DONE                                  (1)
  ✓ Renew passport · 2025           4/4  ›
 ──────────────────────────────────────────
  ( Browse the library )
```

## Playbook library

```
 ‹ Tracks         Library          Search…
 ──────────────────────────────────────────
  FITS YOUR DATES                       (3)  ← matched on existing anchors
  Skilled migration · AU      ✓ attached ›
  Citizenship · AU                  22 steps ›
  First home buyer · AU             15 steps ›
 ──────────────────────────────────────────
  EVERYTHING                           (11)
  Ava · primary school        ✓ attached ›
  Retirement                  ✓ attached ›
  Start a company · AU              18 steps ›
  Move country                      26 steps ›
  ⋮
 ──────────────────────────────────────────
  ( Import a playbook file… )
```

## Playbook detail

```
 ‹ Library    Citizenship · AU          ⋯
 ──────────────────────────────────────────
  22 steps · anchored on "Migrated"
  Reviewed Mar 2026 · not official advice
 ──────────────────────────────────────────
  [[ Attach to my plan ]]
 ──────────────────────────────────────────
  Anchored on   Migrated · Sep 14, 2024  ›
  First step    would start Sep 2027
  Last step     would finish Feb 2030
 ──────────────────────────────────────────
  STEPS
  1  Confirm residency start date
     ├─ 2  4-year residency clock
     │     └─ 3  Book citizenship test
     │           ├─ 4  Gather ID documents
     │           └─ 5  Application form
     ⋮
```

## States

```
no tracks     ┌────────────────────────────────────────┐
              │           No tracks yet                │
              │  A track turns your dates into steps.  │
              │        [[ Browse the library ]]        │
              └────────────────────────────────────────┘

can't attach  [[ Attach to my plan ]]·
              ⌐ Needs a "Migrated" date first.
                                    ( Add it ) ¬

stale         Reviewed Mar 2023 · not official advice
              ⚠ Over 2 years old. Check the steps
                against the current rules.       ›

import bad    ┌──────────────────────────────┐
              │ Can't import                 │
              │ Step "Lodge EOI" depends on  │
              │ "Book test", which depends   │
              │ back on it.                  │
              │                 [[ OK ]]     │
              └──────────────────────────────┘

detaching     │ Detach "Retirement"?         │
              │ 19 steps go, 0 done are kept │
              │ as history.                  │
              │  ( Cancel )  [[ Detach ]]!   │
```

## Interactions

| Target | Action | Result |
|---|---|---|
| track row | tap | → detail, same layout, steps now dated |
| `[[ Attach ]]` | tap | instantiate + reflow, then → [`radar.md`](radar.md) |
| `Anchored on` | tap | pick a different anchor; preview dates update live |
| step in tree | tap | → [`step.md`](step.md) (template view when not attached) |
| `Import a playbook file…` | tap | `[ document picker ]`, then validate |
| `⋯` | tap | `Duplicate & edit` `Export…` `Detach`! |

## Copy

| Key | String |
|---|---|
| `tracks.running` | RUNNING |
| `tracks.progress` | {done}/{total} |
| `tracks.next` | next {Mon d} |
| `tracks.empty` | A track turns your dates into steps. |
| `tracks.fits` | FITS YOUR DATES |
| `playbook.reviewed` | Reviewed {Mon yyyy} · not official advice |
| `playbook.stale` | Over {n} years old. Check the steps against the current rules. |
| `playbook.needsAnchor` | Needs a "{anchor}" date first. |
| `playbook.attach` | Attach to my plan |

## Notes

The detail screen shows the projected first and last dates **before** attaching.
Committing 22 steps to a plan without seeing that it runs until 2030 is the kind
of surprise that gets a track detached the same day.

`Duplicate & edit` is the whole content strategy: a shipped playbook is a
starting point the user forks, not a rule they obey.
