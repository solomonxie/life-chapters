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

You enter a handful of **anchors** (born, graduated, migrated, child born).
Everything else is computed: chapters, upcoming events, and each step's
*start-by* date, scheduled **backward** from the event it serves. Mark a step
done and its successors reflow from the real completion date, not the estimate.

So this is a backward-scheduled dependency graph over life anchors — not a
checklist app with a due-date field.

The same anchors cut the life into **chapters**. Behind today, a chapter holds
**stories** — dated journal entries in your own words. Ahead of today, it holds
steps. One timeline, one set of dates, both halves.

## Goals

- 5-20 anchor dates in, a walkable life timeline out, cut into chapters
- A **journal**: text stories with fuzzy-able dates, filed into chapters
  automatically
- Attach a **playbook** per life track; it instantiates into dated steps
- Each step carries: prerequisites, documents to obtain, prep actions, how-to
  notes, lead time, and validity window
- Completing a step, or editing an anchor, reflows every dependent date
- **Radar**: what needs starting now, in 90 days, this year, later — the alarm
  fires at *start-by*, not at the deadline
- Local notification ahead of each step; weekly digest
- Fully offline, no account, no server

## Non-goals

- **No media in the journal.** Photos and video already live in the user's
  photo library; duplicating them costs storage and a sync problem for no gain.
- **Not advice.** Not legal, immigration, tax, or financial advice. Playbooks
  are user-owned content with a visible "last reviewed" date.
- No backend, accounts, or sync service — backup is a file you export
- iPhone only. No Android, no iPad-specific layout, no web
- No shared/collaborative plans in v1
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

## Data & integrations

```
Anchor      a dated fact the user entered       born · graduated · migrated
Event       a dated point, entered or derived   turns 18 · visa expires · term 1 starts
Chapter     the interval between two events     "Pre-migration" · "Settling in"
Playbook    template for one life track         "Skilled migration AU" · "Start school"
Step        template node in a playbook         offset, deps, docs, prep, how-to
Instance    a Step bound to real dates          status, startBy, dueBy, notes
Document    a thing you must hold               issued, expires, where it lives
Entry       a story, dated like an anchor       title, body, optional linked date
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
- **Backup**, three layers, all the same JSON file format:
  - *Snapshots on the phone* — written after every change into the app's
    Files-visible `Backups` folder, never overwritten. Each day keeps its
    latest 20; anything older than 7 days is cleared. Undo for mistakes the
    in-app Undo can't reach.
  - *iCloud Drive* — opt-in. One file a day in the user's own iCloud Drive
    (`Life Chapters` folder), replaced on every change that day. Survives a
    lost phone. It is the user's storage under their Apple account; the app
    talks to the file system, iOS does the syncing, and nothing reaches us.
  - *Export* — the same file out via the share sheet, in by the picker.
- **Notifications**: local only, one per instance at `startBy − leadDays`, plus
  a weekly digest. Rescheduled on every reflow.
- **Cost**: zero. No service, no API key, no subscription.

## Constraints

- **iOS allows 64 pending local notifications.** A 30-year plan has thousands,
  so the scheduler registers only a rolling nearest-N window and refills it as
  time passes and on every app foreground.
- One-handed use: the Radar's primary action sits within thumb reach.

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
- **Dependencies.** Runtime deps: navigation (3), safe-area, screens, zustand,
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
