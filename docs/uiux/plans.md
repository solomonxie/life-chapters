# Plans

Everything ahead for the person on screen, grouped by when you must *start*
it. A section of the one page, under the life line
([`timeline.md`](timeline.md)); the library and playbook detail push from it.
Code calls a plan a *track*; the user never sees that word.

```
  PLANS
 ⌐ Reminders are off, so nothing will        ← only when denied, dismissible
   warn you.            ( Allow )  ( ✕ ) ¬
  ⚠ EXPIRING                            (1)
 ╭────────────────────────────────────────╮
 │ Passport                               │
 │ expires Feb 23, 2027 · in 150 days     │  ← red + "needed by …" on a clash
 ╰────────────────────────────────────────╯
  YOUR PLANS                            (2)
 ╭────────────────────────────────────────╮
 │ Skilled migration · CA                 │
 │ [██████░░░░░░░░░░] 2/15    next Sep 28│›
 ├────────────────────────────────────────┤
 │ Citizenship · CA                       │
 │ [███░░░░░░░░░░░░░] 2/14    next Nov 12│›
 ╰────────────────────────────────────────╯
  ⚠ ACT NOW                             (2)
 ╭────────────────────────────────────────╮
 │ Book a language test                   │
 │ start by Sep 21 · 5 days late        ! │
 │ Skilled migration · CA                ›│
 ├────────────────────────────────────────┤
 │ Record days spent outside Canada       │
 │ start by Sep 28 · in 2 days            │
 │ Citizenship · CA                      ›│
 ╰────────────────────────────────────────╯
  NEXT 90 DAYS                          (3) ⌄
 ╭────────────────────────────────────────╮
 │ Police certificates     Nov 12        ›│
 │ Address history, 10 yr  Dec 01        ›│
 │ Renew passport          Dec 20    ▼   ›│  ← ▼ = moved later by a reflow
 ╰────────────────────────────────────────╯
  THIS YEAR                             (9) ›
  LATER                                (37) ›
    Swipe a step left for Done or Snooze,
    right for Not for me.
  DONE                                  (1)
  ✓ Getting married · Ontario       14/14 ›
  ( + Add a plan )                         → Library
```

## States

```
no plans     PLANS
             [[ Browse plans ]]            ← primary, → Library

all clear    Nothing to start yet ✓ Next is
             Police certificates, Nov 12.

broken       CAN'T SCHEDULE                (1)   ← red
             Step "Lodge" depends on "Test",
             which depends back on it.

clash        │ Police certificate              │
             │ expires Dec 26, 2026 · in 91    │
             │ days · needed by Submit profile │  ← red line
```

## Playbook library

Pushed from `+ Add a plan`, a first-run pick, or `Browse plans`. Sorted by life
stage (`ages.from`); playbooks with no age range sort last.

```
 ‹              Library
  🔍 Search
 ──────────────────────────────────────────
  FITS YOUR DATES  ⓘ                    (4)  ← their date kinds, their
  Skilled migration · CA      ✓ attached ›     province, not aged past
  from "Lodge a visa application" · age 18+
  Citizenship · CA            ✓ attached ›
  from "Migrated to a country" · age 18+
  Getting married · British C… 14 steps ›
  Retirement · British Colum…  12 steps ›
  from "Born" · ages 55–72
 ──────────────────────────────────────────
  CANADA AND BRITISH COLUMBIA          (10)
  Newborn · first year · Bri…  17 steps ›
  from "Born" · ages 0–1
  Early years · ages 1–4 · B…  10 steps ›
  ⋮
  Expecting a baby · British…  14 steps ›
  from "Baby due"
  Lives in British Columbia            ›  ← accent; opens Lives in
  Plans for other provinces are below
 ──────────────────────────────────────────
  OTHER PROVINCES                  (8) ›  ← collapsed; opens on search
 ──────────────────────────────────────────
  COMING SOON  ⓘ                            ← "Playbooks for Canada only,
  United States                               for now."
  China
 ──────────────────────────────────────────
  ( Import a playbook file… )
```

Provincial plans carry a `province` and a `family` (the same life stage in
every province). With the province unknown, everything shows under
`Everything` and the row reads `Which province?`.

A plan attached for another province — after a move, say — says so on its row
(`Ontario rules · lives in British Columbia`, red) and on its detail:

```
 ╭────────────────────────────────────────╮
 │ ⚠ Ontario rules. You live in British   │
 │ Columbia.       ( Switch to British    │  ← replaces the plan with its
 │                   Columbia )           │    twin on the same date; one
 ╰────────────────────────────────────────╯    undo; progress doesn't carry
```

`Fits your dates` hides a plan that counts from a birth once the person on
screen is past its `ages.to` — the newborn plan doesn't fit a 35-year-old, but
fits Ava on her own board.

## Playbook detail

```
 ‹           Citizenship · CA            ⋯
 ──────────────────────────────────────────
  14 steps · anchored on "Migrated to a
  country" · Canada
  Paperwork track for citizenship by grant
  as an adult permanent resident, from
  landing to the oath.
  For age 18+                               ← AppliesIf, components.md
  • You're a permanent resident
  • 1,095 days physically in Canada in the
    5 years before you apply
  Reviewed Sep 2026 · not official advice
 ──────────────────────────────────────────
  [[ Attach to my plan ]]                   ← hidden once attached
 ──────────────────────────────────────────
  Anchored on        Sep 14, 2024        ›
  Migrated to Canada
  First step         would start Sep 2024
  Last step          would finish Oct 2027
 ──────────────────────────────────────────
  STEPS                                (14)
  1  Record the permanent residence date
     └  Track days spent outside Canada
        └  Gather language proof
     ⋮
 ──────────────────────────────────────────
  SOURCES  ⓘ                               ← open in Safari
  Canadian citizenship: Who can apply    ›
  canada.ca
```

Attached, the steps list turns into dated step rows and `would start` /
`would finish` read `starts` / `finishes`.

## States

```
can't attach  [[ Attach to my plan ]]·
              ⌐ Needs a "Migrated to a country"
                date first.         ( Add it ) ¬

stale         Reviewed Mar 2023 · not official advice
              ⚠ Over 2 years old. Check the steps
                against the current rules.

import bad    ┌──────────────────────────────┐
              │ Can't import                 │
              │ Step "Submit" depends on     │
              │ "Book test", which depends   │
              │ back on it.                  │
              │                 [[ OK ]]     │
              └──────────────────────────────┘

detaching     │ Detach "Retirement · CA"?    │
              │ 12 steps go, including 2     │
              │ done.                        │
              │  ( Cancel )  [[ Detach ]]!   │
```

## Interactions

| Target | Action | Result |
|---|---|---|
| step row | tap | → [`step.md`](step.md) |
| step row | swipe ← | `[ Done ]` `[ Snooze ]` |
| step row | swipe → | `[ Not for me ]` — detaches just this step |
| bucket header | tap | collapse / expand, remembered; `⚠ ACT NOW` never collapses |
| `▲` / `▼` | tap | popover: what moved it, and from which date |
| expiring row | tap | → [`documents.md`](documents.md) detail |
| plan row | tap | → playbook detail, steps dated |
| `Allow` | tap | asks iOS; if already refused, opens iOS Settings |
| `[[ Attach ]]` | tap | instantiate + reflow, then back to the page |
| `Anchored on` | tap | when the person has two dates of that kind: pick one; dates update |
| `Import a playbook file…` | tap | `[ document picker ]`, then validate |
| `⋯` | tap | `Duplicate` `Export…` `Detach`! |

## Copy

| Key | String |
|---|---|
| `plans.title` | Plans |
| `plans.expiring` | ⚠ Expiring |
| `plans.yours` | Your plans |
| `plans.group.now` | ⚠ Act now |
| `plans.group.d90` | Next 90 days |
| `plans.group.year` | This year |
| `plans.group.later` | Later |
| `plans.done` | Done |
| `plans.startBy` | start by {Mon d} |
| `plans.late` | {n} days late |
| `plans.next` | next {Mon d} · next {Mon yyyy} |
| `plans.clear` | Nothing to start yet ✓ Next is {step}, {Mon d}. |
| `plans.swipeHint` | Swipe a step left for Done or Snooze, right for Not for me. |
| `plans.add` | + Add a plan · Browse plans |
| `plans.notif.denied` | Reminders are off, so nothing will warn you. |
| `library.fits` | Fits your dates |
| `library.fitsInfo` | Plans that hang off a kind of date this person already has, and that they haven't aged past. |
| `library.soon` | Coming soon |
| `library.soonInfo` | Playbooks for Canada only, for now. |
| `playbook.reviewed` | Reviewed {Mon yyyy} · not official advice |
| `playbook.stale` | Over {n} years old. Check the steps against the current rules. |
| `playbook.needsAnchor` | Needs a "{kind}" date first. |
| `playbook.attach` | Attach to my plan |

## Notes

`ACT NOW` is anything to start within 14 days, late ones included. `THIS YEAR`
and `LATER` start collapsed. A snoozed step groups by the day its snooze ends.

Grouping is by **start-by**, not due date — the point is being warned while
there's still time. A step due in 2 years whose paperwork takes 14 months
belongs in ACT NOW, and that's the case a due-date sort gets wrong.

Red appears only in ACT NOW, Expiring and Can't schedule. If every group had a
colour, none would mean anything.

The detail screen shows the projected first and last dates **before**
attaching. Committing to a plan without seeing that it runs until 2030 is the
kind of surprise that gets it detached the same day.

`Duplicate` + `Export…` is the whole content strategy: a shipped playbook is a
starting point the user forks — export, edit the JSON, import it back — not a
rule they obey.

Expiring documents live here, not in a tab: they run out on their own schedule
and belong next to the steps they threaten.
