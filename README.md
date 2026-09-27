# Life Chapters

The life behind you and the plan ahead, on one line. Past chapters hold your
stories; future ones hold the steps to get there — and the plan reschedules
itself.

Enter the dates that actually matter — born, graduated, migrated, a child's
birth — and the app works out the rest: the chapter you're in, what's coming, and
every step you need to start *now* for something years away to land on time.

Mark one step done and the whole downstream series moves with it.

```
  1991  ● Born · Xi'an                    ›
        │
  2013  ◍ Graduated · BSc                 ›
        │
  2024  ● Migrated to Australia           ›
        ┃
  ══════ TODAY · Sep 26, 2026 ═════════════
        ┃
  2027  ○ Citizenship eligible        (6) ›
        │
  2029  ○ Ava starts primary school  (11) ›
        ⋮
```

## Why it isn't a to-do app

Deadlines here are computed, never typed. A step declares how long it takes,
how long its result stays valid, and what it depends on — then it's scheduled
**backward** from the event it serves:

```
dueBy    = anchorDate + offsetDays
latest   = dueBy − durationDays
earliest = dueBy − validForDays − durationDays
startBy  = max(latest, when every dependency actually finishes)
```

So a police check good for only 3 months gets planned late on purpose, and a
skills assessment that takes 4 months shows up in **ACT NOW** two years before
the visa it belongs to. Finish something early and its successors reflow off the
real date, not the estimate.

## What's in it

- **Timeline** — the life line, anchors behind you and events ahead, cut into chapters
- **Journal** — stories in your own words, filed into the chapter they happened in
- **Radar** — what to start now / in 90 days / this year / later
- **Tracks** — playbooks you attach, each one a life track turned into dated steps
- **Docs** — every document a step asked for, sorted by what expires first
- Local reminders ahead of each step's start-by date

Fully offline. No account, no server, no subscription. Playbooks are plain data
you can edit, fork, and share as a file — and they are **not advice**, just a
plan you maintain.

## Docs

- [`docs/DESIGN.md`](docs/DESIGN.md) — problem, options, decision, constraints
- [`docs/UIUX_DESIGN.md`](docs/UIUX_DESIGN.md) — screen map and flows
- [`docs/uiux/`](docs/uiux/) — every screen and state, drawn
- [`docs/IMPLEMENT_PLAN.md`](docs/IMPLEMENT_PLAN.md) — build order, task by task

## Development

Bare React Native — **no Expo**, Metro as the bundler, iPhone only.

```sh
npm install
npm run pods          # bundle install first, once
npm test              # engine, store, reminder queue, content
npm run typecheck
npm run ios           # physical device
```

`ios/LifeChapters.xcworkspace` for Xcode. Signing is not committed — put your
team and bundle id in a gitignored `ios/Local.xcconfig`:

```
DEVELOPMENT_TEAM = ABCDE12345
PRODUCT_BUNDLE_IDENTIFIER = com.yourname.lifechapters
```

### Physical device only

QA runs on a real iPhone. Don't fall back to a simulator for anything but a
compile check.
