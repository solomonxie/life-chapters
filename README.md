# Life Chapters

The life behind you and the plan ahead, on one line. Past dates hold your
notes; future chapters hold the steps to get there — and the plan reschedules
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
  2024  ● Migrated to Canada              ›
        ┃
  ══════ TODAY · Sep 26, 2026 ═════════════
        ┃
  2028  ○ Lodge a visa application   (15) ›
        │
  2031  ○ Turns 40                        ›
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

One page, no tabs:

- **Timeline** — the life line, dates behind you and events ahead, cut into
  chapters; notes on any date
- **People** — a board each for you, a partner, a child; a shared birth or
  wedding sits on both boards and moves as one
- **Plans** — playbooks you attach, turned into dated steps, grouped by what
  to start now / in 90 days / this year / later; expiring documents on top
- **Settings** — at the bottom: reminders, backup, playbook sources
- Local reminders ahead of each step's start-by date, for everyone

Bundled playbooks are for Canada — federal, plus Ontario and British Columbia
where rules are provincial: Express Entry, citizenship, marriage, expecting a
baby, newborn, early years, school, high school, growing up, retirement. Each
says who it's for — an age range and "applies if" lines — and each person sees
their own province's, set by hand or read from where their latest date happened. United States and China: coming
soon.

Fully offline. No account, no server, no subscription — the only copy off the
phone is an optional daily backup file in your own iCloud Drive, or a file you
export. Playbooks are plain data you can edit, fork, and share as a file — and
they are **not advice**, just a plan you maintain.

Design, screen drawings, build plan and release kit: [`docs/`](docs/).

## Development

Bare React Native — **no Expo**, Metro as the bundler, iPhone only.

```sh
npm install
npm run pods          # bundle install first, once
npm test              # engine, store, reminder queue, content
npm run typecheck
npm run ios           # physical device
make help             # release build, App Store upload, screenshots
```

Releasing: [`docs/release/`](docs/release/) — every App Store Connect field ready to
paste, the privacy policy, and `make release` to archive and upload.

`ios/LifeChapters.xcworkspace` for Xcode. Signing is not committed — put your
team and bundle id in a gitignored `ios/Local.xcconfig`:

```
DEVELOPMENT_TEAM = ABCDE12345
PRODUCT_BUNDLE_IDENTIFIER = com.yourname.lifechapters
```

### Physical device only

QA runs on a real iPhone. Don't fall back to a simulator for anything but a
compile check.
