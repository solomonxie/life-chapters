# Design: Life Chapters — the life behind you, and the plan ahead

Product/business reasoning only. Interface lives in [`UIUX_DESIGN.md`](UIUX_DESIGN.md),
build order in [`IMPLEMENT_PLAN.md`](IMPLEMENT_PLAN.md).

## Problem

A life has two halves that nobody keeps in one place. Behind you: what
happened, when, and what it was like — scattered across memory, chat logs and
old documents. Ahead of you: transitions with paperwork attached.

Big life transitions — migrating, starting a school year, buying a home,
retiring — have long lead times and ordered prerequisites with their own
expiry: a police check good for 3 months, a language test good for 2 years, a
visa stream that closes at a birthday. People find out about a requirement
after the window to satisfy it has passed.

Generic to-do and calendar apps can't help, because the deadlines aren't dates
you pick. They're *derived* from other dates — and when one date moves, or one
step finishes early, every downstream date should move with it.

## Core idea

You enter a handful of **anchors** (born, graduated, relocated, child born).
Everything else is computed: chapters, upcoming events, and each step's
*start-by* date, scheduled **backward** from the event it serves. Mark a step
done and its successors reflow from the real completion date, not the estimate.

So this is a backward-scheduled dependency graph over life anchors — not a
checklist app with a due-date field.

The same anchors cut the life into **chapters**. Behind today, a date carries
**notes** — what happened, in your own words. Ahead of today, a chapter holds
steps. One timeline, one set of dates, both halves.

## Goals

- 5-20 anchor dates in, a walkable life timeline out, cut into chapters
- **Notes** on any date: what happened, who was there, what it meant
- **People**: a board per person (me, a partner, a child), joined by the
  events they share
- Attach a **playbook** per life track; it instantiates into dated steps
- Each step carries: prerequisites, documents to obtain, prep actions, how-to
  notes, lead time, and validity window
- Completing a step, or editing an anchor, reflows every dependent date
- **Plans**: each with its next step; on its page, what to start now and the
  next few — the alarm fires at *start-by*, not at the deadline
- Local notification ahead of each step; weekly digest
- Fully offline, no account, no server

## Non-goals

- **No media in notes.** Photos and video already live in the user's photo
  library; duplicating them costs storage and a sync problem for no gain.
- **No journal.** A separate list of stories duplicated the timeline; one notes
  field per date says the same with no second place to look.
- **Not advice.** Not legal, immigration, tax, or financial advice. Playbooks
  are user-owned content with a visible "last reviewed" date.
- No backend, accounts, or sync service — backup is a file you export
- iPhone only. No Android, no iPad-specific layout, no web
- No shared/collaborative plans in v1 — other people are boards on this
  phone, not accounts
- Not a general task manager — an undated task has no place here
- No live requirement lookup or scraping of government sites in v1

## Options considered

| Option | Deciding factor |
|---|---|
| Checklist app, manual due dates | Rejected — the pain *is* that dates are derived and reflow |
| Calendar-first (write into iOS Calendar) | Free reminders, but no dependency graph and no validity windows; pollutes a real calendar. Kept as optional export |
| **Backward-scheduled graph + own store** | Chosen |
| LLM generates the plan at runtime | Needs key + network, non-reproducible, and the reflow engine still has to exist. Possible later as an offline *authoring* aid |

## Decision

Deterministic scheduling engine over declarative playbook JSON.

Why: "mark one done and it adjusts the next series" is only expressible if
steps carry *relative* offsets and dependencies instead of absolute dates. And
keeping content as data — not code — means a playbook can be written, edited,
and shared as a file without an app release, which is the only way a one-person
app covers more than one country's paperwork.

## Product decisions

**One page, no tabs.** Life line, then Plans, then Settings, in one scroll.
- Tabs split one idea (dates → steps) into five apps; the late-steps line on
  the stem and the plans under it are the same fact at two zoom levels.
- Radar and Tracks were two views of the same plans; merged into one section.
- Expiring documents join Plans — they run out on their own schedule, next to
  the steps they threaten. The rest stay on the steps that ask for them.
- Settings sit at the bottom: visited twice a year, not worth a tab or a ⚙.

**Per-person boards, linked by events.**
- A family's paperwork is several lives, each with its own clock. A child's
  school plan counts from *her* birth; mixing it into mine breaks "age", "Fits
  your dates" and the chapters.
- Each person is a namespace: dates, plans, steps, documents. The page shows
  one board; the title switches.
- The tie between two people is the event they share, not a relation field.
  "Ava born" on mine is "Born" on hers; a wedding is on both. Copies share a
  `linkId`: moving one moves all and reflows every plan on them; deleting one
  deletes all, people stay.
- Reminders, backups and the calendar mirror cover every board — a reminder
  switches to the step's owner.

**Canada and China.**
- Content is the product and each country is real research. Two countries a
  family actually moves between, done properly, beat five done thinly.
- Canada: federal plans (Express Entry, provincial nomination, citizenship,
  retirement) plus Ontario and British Columbia for provincial ones. China:
  every life stage, plus the paperwork between the two countries — visitors
  to Canada, travelling to China, a child born in Canada to a Chinese parent,
  relocating to China.
- A life-course set per place — expecting, newborn, early years, school, high
  school, growing up, retirement — so one family has plans from due date to
  pension.
- The Library shows the United States as "Coming soon". The earlier
  Australian playbooks are gone.

**Where a person lives: country, then province.**
- Marriage, school, health cards and licences differ by country and, in
  Canada, by province. Each plan has a `country`, a `province` when
  provincial, and a `family` — the same life stage elsewhere is its twin.
- A person's `where` is never picked: it's read from the latest past
  *residence* event with a Place — Born, Relocated, Moved city, Bought a home. A wedding
  or a trip says where something happened, not where they live.
- A place typed in Chinese with no country counts as China: a village isn't
  in the city list, and the script says enough.
- The Library shows the person's country and province first ("Canada and
  British Columbia", "China", or "Everything" when unknown); other places sit
  collapsed.

**A date's own place decides.**
- Plans on a date follow the date's Place: a wedding in Ontario runs Ontario
  rules even for someone living in BC, and a due date follows where the birth
  happens.
- Born is the exception: its plans run for years, so they follow where the
  person lives now, not the birthplace.
- A plan whose rules don't match is flagged ("Ontario rules · Married in
  British Columbia") with a one-tap switch to its twin; progress doesn't
  carry, since the steps differ.

**Relocation: temporary status, then PR, then citizenship.**
- Many newcomers arrive on a work or study permit, not as permanent residents.
  "Relocated to a country" opens the arrival plan (permit, SIN, bank, housing,
  health, licence, extending status); "Apply for permanent residence" opens
  Express Entry and provincial nomination; "Became a permanent resident" opens
  citizenship.
- Each stage hangs off its own date, so a delay at one moves only what follows.

**Moments.**
- A visit or a trip has paperwork (visa, eTA, super visa) but doesn't change
  the chapter you're in. Moment kinds sit on the line and open plans, but cut
  no chapter.

**China plans in English, with Chinese terms.**
- Written for someone reading in English, dealing with offices that name
  things in Chinese. The term goes in parentheses (中考, 旅行证) so it can be
  matched to a form or a sign.

**Nationality plans state the law, never recommend.**
- Dual heritage touches nationality, where the stakes are highest and the
  choice is personal. The plans say what the law and each office require for
  each route (visa, travel document, residence, nationality) and never which
  one to take.

**Ages and conditions.**
- Playbooks and steps may carry `ages` (`{from, to?}`) and `conditions` —
  plain "applies if" lines.
- Shown, not enforced: eligibility is exactly the advice the app refuses to
  give. The user reads "Only if they plan to go to university in Ontario" and
  swipes the step away if it isn't them.
- One filter uses them: "Fits your events" hides a birth-counted plan the person
  has aged past. A 35-year-old isn't offered the newborn plan; Ava is.

## Data & integrations

```
Person      a board: one life's namespace       Me · Sam · Ava
Where       whose rules apply                   {country, province}, from the
                                                latest residence event
Anchor      a dated fact the user entered       born · married · baby due; note;
                                                location; personId, withPersonId, linkId
AnchorKind  what a date is                      born · relocated · pr-landed · …;
                                                a moment (visit, trip) cuts no chapter
Event       a dated point, entered or derived   turns 40 · applied for PR
Chapter     the interval between two events     "Settling in" · "Young family"
Playbook    template for one life track         "Skilled migration · CA"; country,
            (a "plan" in the UI)                province, family, ages, conditions,
                                                reviewedAt, sources
Step        template node in a playbook         offset, deps, docs, prep, how-to,
                                                ages, conditions
Instance    a Step bound to real dates          status, startBy, dueBy, notes
Document    a thing you must hold               issued, expires, where it lives
```

Scheduling, per step:

```
dueBy    = anchorDate + offsetDays        offset negative = before the event
latest   = dueBy − durationDays           how long the thing takes to obtain
earliest = dueBy − validForDays − durationDays
startBy  = max(latest, when every dependency actually finishes)
atRisk   = startBy > latest                a dependency ate the slack
```

`earliest` is the non-obvious one, and the reason police checks and language
tests get planned correctly instead of too early: start before it and the
result expires before `dueBy` needs it. It's advisory — the schedule is
just-in-time — so it shows up as the step screen's "starting sooner means
paying twice" explainer rather than as a date the app picks.

- **Storage**: SQLite on device, single source of truth. Dates are civil dates
  (`YYYY-MM-DD`), never instants — no timezone drift on a birthday.
- **Ownership**: anchors, tracks and documents may carry `personId`; absent
  means Me, so data from before people needs no rewrite. Migrations dropped the
  `entries` table and added `people`.
- **Kind ids are stable.** A renamed kind keeps its id (`migrated`,
  `visa-lodge`, `visa-granted`); a saved date still showing the old default
  label ("Migrated to a country", "Lodge a visa application", "Visa granted")
  takes the new one on load.
- **Backup**, three layers, all the same JSON file format:
  - *Daily copy on the phone* — one file a day (`2026-09-27.json`) in the
    app's Files-visible `Backups` folder, replaced on every change that day,
    kept 30 days. A restore first saves the current plan as
    `…-before-restore.json`, so it can't overwrite anything.
  - *Change log* — `changes-2026.log`, one plain-text line per change (time,
    whose board, what happened), only ever appended, never pruned. The daily
    copies say *what the plan was*; the log says *how it got there*. Chosen over
    a copy per change: as traceable, a fraction of the files.
  - *iCloud Drive* — opt-in. One file a day in the user's own iCloud Drive
    (`Life Chapters` folder), replaced on every change that day. Survives a
    lost phone. It is the user's storage under their Apple account; the app
    talks to the file system, iOS does the syncing, and nothing reaches us.
  - *Export* — the same file out via the share sheet, in by the picker.
  - The file carries `people`. An older file still imports: its stories are
    ignored and everything belongs to Me.
- **Notifications**: local only, one per instance at `startBy − leadDays`, plus
  a weekly digest. Rescheduled on every reflow.
- **Cost**: zero. No service, no API key, no subscription.

## Constraints

- **iOS allows 64 pending local notifications.** A 30-year plan has thousands,
  so the scheduler registers only a rolling nearest-N window and refills it as
  time passes and on every app foreground.
- One-handed use: a step's Done / Snooze is a swipe on its row in Plans.

## Risks / open questions

- **Content is the product.** An empty playbook library makes the app useless,
  and each real track needs genuine research. Requirements also go stale —
  playbooks are versioned and stamped with a review date, and the app never
  claims authority.
- Tone risk: must read as "a plan you maintain", never as advice. One wrong
  confident sentence about a visa is worse than the feature is worth.
- Cyclic or contradictory playbook graphs — validate at import, reject with a
  readable error rather than silently producing dates.
- A life anchor changing (a date the user got wrong) can reflow hundreds of
  instances. Completed instances must keep their real dates, not be recomputed.
- **Dependencies.** Runtime deps: navigation (2 — no tabs), safe-area, screens, zustand,
  and `@op-engineering/op-sqlite` — taken because SQLite is the store and a
  hand-rolled binding is not a hundred lines. Everything else that touches iOS
  is hand-rolled Swift in `ios/LifeChapters/Native/` (~400 lines): local
  notifications (instead of notifee — its RN 0.87 support is unproven and the
  API we use is four calls), document/photo/camera pickers and the share sheet,
  the EventKit calendar mirror, haptics. Date entry is JS wheels, not a native
  picker, so year- and month-precision dates get the right columns.
- **Links out.** Playbook sources open in Safari. That sends no user data and is
  user-initiated, so it doesn't break "nothing leaves the device".
- Open: does a playbook ever need a *branch* (visa stream A or B) in v1, or is
  attaching two playbooks and detaching one enough? Currently the latter.
