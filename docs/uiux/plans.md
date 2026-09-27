# Plans

The plans of the person on screen, each with its next step; the steps
themselves, grouped by when you must *start* them, live on each plan's page.
A section of the one page, under the life line
([`timeline.md`](timeline.md)); the library and playbook detail push from it.
Code calls a plan a *track*; the user never sees that word.

```
  PLANS                                 (3)
 ⌐ Reminders are off, so nothing will        ← only when denied, dismissible
   warn you.            ( Allow )  ( ✕ ) ¬
  ⚠ EXPIRING                            (1)
 ╭────────────────────────────────────────╮
 │ Passport                               │
 │ expires Feb 23, 2027 · in 150 days     │  ← red + "needed by …" on a clash
 ╰────────────────────────────────────────╯
 ╭────────────────────────────────────────╮
 │ Skilled migration · CA                 │
 │ [██████░░░░░░░░░░░░░░░]           2/15 │›
 │ Next: Book a language test · now       │  ← nearest open step, one line
 ├────────────────────────────────────────┤
 │ Citizenship · CA                       │
 │ [███░░░░░░░░░░░░░░░░░░]           2/14 │›
 │ Next: Record days outside · Sep 28     │
 ╰────────────────────────────────────────╯
  DONE                                  (1)
  ✓ Getting married · Ontario       14/14 ›
  ( + Add a plan )                         → Library
```

## States

```
no plans     PLANS
             [[ Browse plans ]]            ← primary, → Library

all done     Next: Nothing left to start

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
don't match says so on its row, in amber, naming why:

```
  Ontario rules · Married in British Columbia
  Ontario rules · lives in China
```

and on its detail:

```
 ╭────────────────────────────────────────╮
 │ This plan follows British Columbia     │  ← calm, names the event and its
 │ rules, but your "Relocated to Canada"  │    place, so a wrong pick shows
 │ event is in Vancouver, Washington,     │
 │ United States.                         │
 │ ( Edit event )  ( Switch to … )        │  ← switch replaces the plan with
 ╰────────────────────────────────────────╯    its twin; one undo
```

Which event decided: the plan's own date when it has a place (not Born), else
`Lives in` set by hand (`your Lives in is set to China`, no Edit), else the
latest move. With no twin for that place, the switch doesn't show.
Unattached, the button reads `See British Columbia`.

`Fits your events` hides a plan that counts from a birth once the person on
screen is past its `ages.to` — the newborn plan doesn't fit a 35-year-old, but
fits Ava on her own board.

## Playbook detail

```
 ‹                                       ⋯  ← nav bar empty
 ──────────────────────────────────────────
  Citizenship · CA                          ← full title, wraps
  13 steps · anchored on "Became a
  permanent resident" · Canada
  Paperwork plan for citizenship by grant  ← 2 lines, tap to unfold with
  as an adult permanent resident, from…       AppliesIf (components.md)
  More
  Reviewed Sep 2026 · not official advice
 ──────────────────────────────────────────
  [[ Attach to my plan ]]                   ← hidden once attached
 ──────────────────────────────────────────
  Anchored on        Mar 01, 2025        ›
  Became a permanent resident
  First step         would start Sep 2024
  Last step          would finish Oct 2027
 ──────────────────────────────────────────
  ACT NOW                               (1)  ← attached only; calm, no red
  Record days spent outside Canada
  start now · due Oct 30                    ← red only once past due
  NEXT STEPS                                ← the nearest 3 after Act now
  Work out the earliest date     Nov 12  ›
  Gather language proof          Dec 01 ▼›  ← ▼ = moved later by a reflow
  ⋮
    Swipe a step left for Done or Snooze,
    right for Not for me.
  STEPS · ALL STEPS once attached      (13)
  1  Start a log of days spent outside
     Canada
     └  Work out the earliest date
        └  Gather language proof
     ⋮
 ──────────────────────────────────────────
  SOURCES  ⓘ                               ← open in Safari
  Canadian citizenship: Who can apply    ›
  canada.ca
  ⋮                                         ← 3 shown
  ( Show all 7 )
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
| summary | tap | unfold / fold the description and who it's for |
| `Edit event` | tap | → the event that decided the place |
| `Show all n` (sources) | tap | the rest of the sources |
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
| `plan.now` | Act now |
| `plan.next` | Next steps |
| `plan.all` | All steps |
| `plans.done` | Done |
| `plans.startBy` | start by {Mon d} |
| `plans.late` | {n} days late |
| `plans.next` | Next: {step} · now · {Mon d} · {Mon yyyy} |
| `plans.clear` | Nothing left to start |
| `plans.swipeHint` | Swipe a step left for Done or Snooze, right for Not for me. |
| `plans.add` | + Add a plan · Browse plans |
| `plans.notif.denied` | Reminders are off, so nothing will warn you. |
| `library.fits` | Fits your events |
| `library.fitsInfo` | Plans that hang off a kind of event this person already has, fit where that event happened, and that they haven't aged past. |
| `library.here` | {Country} and {Province} · {Country} · Everything |
| `library.livesIn` | Lives in {place} · Plans for other places are below |
| `library.livesIn.unknown` | Where do they live? · Pick a place to see only the plans that apply |
| `library.others` | Other places |
| `library.soon` | Coming soon |
| `library.soonInfo` | Plans for Canada and China, for now. |
| `plan.flag` | {Rules} rules · {Kind} in {place} · {Rules} rules · lives in {place} |
| `plan.flag.switch` | Switch to {place} · See {place} |
| `plan.flag.detail` | This plan follows {Rules} rules, but {whose} "{event}" event is in {place}. · … but {whose} Lives in is set to {place}. |
| `plan.flag.edit` | Edit event |
| `playbook.reviewed` | Reviewed {Mon yyyy} · not official advice |
| `playbook.stale` | Over {n} years old. Check the steps against the current rules. |
| `playbook.needsAnchor` | Needs a "{kind}" date first. |
| `playbook.attach` | Attach to my plan |

## Notes

`ACT NOW` is anything to start within 14 days, late ones included; `NEXT
STEPS` the nearest 3 after that. A snoozed step groups by the day its snooze
ends. They sit on the plan's page, not the one page, so the page stays a list
of plans, not a list of every step.

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
