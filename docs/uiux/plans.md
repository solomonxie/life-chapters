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
  ACT NOW                               (2)  ← calm; no ⚠, no red
 ╭────────────────────────────────────────╮
 │ Book a language test                   │
 │ start now · due Oct 30                 │  ← red only once past due
 │ Skilled migration · CA                ›│
 ├────────────────────────────────────────┤
 │ Record days spent outside Canada       │
 │ start by Sep 28 · in 2 days            │
 │ Citizenship · CA                      ›│
 ╰────────────────────────────────────────╯
  NEXT STEPS                            (5) ⌄  ← within 90 days
 ╭────────────────────────────────────────╮
 │ Police certificates     Nov 12        ›│
 │ Address history, 10 yr  Dec 01        ›│
 │ Renew passport          Dec 20    ▼   ›│  ← ▼ = moved later by a reflow
 ╰────────────────────────────────────────╯
  ( Show all 5 )                            ← the nearest 3 by default
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
  FITS YOUR DATES  ⓘ                    (4)  ← their date kinds, fit where
  Skilled migration · CA      ✓ attached ›     each date happened, not
  from "Apply for permanent residence"         aged past
  · age 18+
  Relocating · work or s…    ✓ attached ›
  from "Relocated to a country" · age 18+
  Getting married · British C… 15 steps ›
  Retirement · British Colum…  14 steps ›
  from "Born" · ages 55–72
 ──────────────────────────────────────────
  CANADA AND BRITISH COLUMBIA          (14)  ← country-wide + the province
  Newborn · first year · Bri…  17 steps ›
  from "Born" · ages 0–1
  Early years · ages 1–4 · B…  12 steps ›
  ⋮
  Visitors to Canada · visa, … 14 steps ›
  from "Visitors arrive"
  Lives in British Columbia            ›  ← accent; opens Lives in
  Plans for other places are below
 ──────────────────────────────────────────
  OTHER PLACES                     (20) ›  ← collapsed; opens on search
 ──────────────────────────────────────────
  COMING SOON  ⓘ                            ← "Plans for Canada and China,
  United States                               for now."
 ──────────────────────────────────────────
  ( Import a playbook file… )
```

Each plan carries a `country`, a `province` when provincial, and a `family`
(the same life stage elsewhere — Ontario, British Columbia, China). The first
section is named for where the person lives: `Canada and British Columbia`,
`China`, or `Everything` when it's unknown — then the row reads `Where do they
live?` · `Pick a place to see only the plans that apply`. China plans are in
English with the Chinese term in parentheses (`Secondary school · 中考 and 高考
· China`).

Rules follow the date a plan hangs on, not only the person: a wedding follows
where it happens, a Born date follows where they live now. A plan whose rules
don't match says so on its row, in red, naming why:

```
  Ontario rules · Married in British Columbia
  Ontario rules · lives in China
```

and on its detail:

```
 ╭────────────────────────────────────────╮
 │ ⚠ Ontario rules; Married in British    │
 │ Columbia.       ( Switch to British    │  ← replaces the plan with its
 │                   Columbia )           │    twin on the same date; one
 ╰────────────────────────────────────────╯    undo; progress doesn't carry
```

With no twin for that place, the flag stays and the button doesn't show.
Unattached, the button reads `See British Columbia`.

`Fits your dates` hides a plan that counts from a birth once the person on
screen is past its `ages.to` — the newborn plan doesn't fit a 35-year-old, but
fits Ava on her own board.

## Playbook detail

```
 ‹                                       ⋯  ← nav bar empty
 ──────────────────────────────────────────
  Citizenship · CA                          ← full title, wraps
  13 steps · anchored on "Became a
  permanent resident" · Canada
  Paperwork plan for citizenship by grant
  as an adult permanent resident, from
  becoming one to the oath.
  For age 18+                               ← AppliesIf, components.md
  • You became a permanent resident
  • 1,095 days physically in Canada in the
    5 years before you apply
  Reviewed Sep 2026 · not official advice
 ──────────────────────────────────────────
  [[ Attach to my plan ]]                   ← hidden once attached
 ──────────────────────────────────────────
  Anchored on        Mar 01, 2025        ›
  Became a permanent resident
  First step         would start Sep 2024
  Last step          would finish Oct 2027
 ──────────────────────────────────────────
  STEPS                                (13)
  1  Start a log of days spent outside
     Canada
     └  Work out the earliest date
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
              ⌐ Needs a "Became a permanent
                resident" date first. ( Add it ) ¬

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
| bucket header | tap | collapse / expand, remembered; `ACT NOW` never collapses |
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
| `plans.group.now` | Act now |
| `plans.group.d90` | Next steps (3 shown, then "Show all n") |
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
| `library.fitsInfo` | Plans that hang off a kind of date this person already has, fit where that date happened, and that they haven't aged past. |
| `library.here` | {Country} and {Province} · {Country} · Everything |
| `library.livesIn` | Lives in {place} · Plans for other places are below |
| `library.livesIn.unknown` | Where do they live? · Pick a place to see only the plans that apply |
| `library.others` | Other places |
| `library.soon` | Coming soon |
| `library.soonInfo` | Plans for Canada and China, for now. |
| `plan.flag` | {Rules} rules · {Kind} in {place} · {Rules} rules · lives in {place} |
| `plan.flag.switch` | Switch to {place} · See {place} |
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

Nothing is urgent by default. A passed start-by reads "start now", in plain
text; red is kept for what is actually special — a step past its due date, a
document expiring before it's needed, a plan that can't schedule. If every
group had a colour, none would mean anything.

The detail screen shows the projected first and last dates **before**
attaching. Committing to a plan without seeing that it runs until 2030 is the
kind of surprise that gets it detached the same day.

`Duplicate` + `Export…` is the whole content strategy: a shipped playbook is a
starting point the user forks — export, edit the JSON, import it back — not a
rule they obey.

Expiring documents live here, not in a tab: they run out on their own schedule
and belong next to the steps they threaten.
