# Implementation plan

Build order. Reasoning in [`DESIGN.md`](DESIGN.md), screens in
[`UIUX_DESIGN.md`](UIUX_DESIGN.md) and [`uiux/`](uiux/).

Every UI task cites the drawing it builds. A task with no drawing to point at
isn't specified yet.

## Phase 1: Engine before everything

The scheduler is the product; screens are a view of it. It's pure TypeScript
with no React, no native module, and no I/O, so it can be finished and tested
before a single pixel exists — and every later phase depends on its types.

- [x] T1.1 Bare React Native scaffold, iOS only — RN 0.87 via `@react-native-community/cli`, no Expo, Metro as the bundler, `android/` removed — see `ios`, `package.json` — depends: none
- [x] T1.2 Design, UI/UX, and plan docs — see `docs` — depends: none
- [x] T1.3 Domain types — `Anchor`, `Event`, `Phase`, `Playbook`, `Step`, `Instance`, `Document`, all dates as `CivilDate` (`YYYY-MM-DD`) strings — see `src/domain/types.ts` — depends: none
- [x] T1.4 Civil-date arithmetic — add/diff days and months, no `Date` timezone exposure, precision-aware resolution (year → mid-year, month → mid-month) — see `src/domain/dates.ts` — depends: T1.3
- [x] T1.5 Phase derivation — sort events, fold into contiguous phases, mark the one containing today — see `src/domain/phases.ts` — depends: T1.4
- [x] T1.6 Backward scheduler — `dueBy`/`startBy`/`earliest` per the formula in `DESIGN.md#data--integrations`, topological order, cycle rejection, completed instances pinned to real dates, expiry-clash detection — see `src/domain/schedule.ts` — depends: T1.4
- [x] T1.7 Scheduler test suite — reflow on complete, reflow on anchor move, validity-window clamp, blocked-until-dependency, cycle rejection, pinned-done invariance — see `__tests__` — depends: T1.6
- [ ] T1.8 Radar bucketing — group instances into act-now / 90d / year / later by `startBy`, and the `▲▼` delta against the previous schedule — see `src/domain/radar.ts` — depends: T1.6

## Phase 2: Content and storage

The engine needs real playbooks to schedule and somewhere to keep the result.
Both are schema work that the screens then read — doing them after the engine
means the schema is shaped by what the scheduler actually consumes, not guessed.

- [x] T2.1 Repository interface + in-memory implementation — lets Phase 3 screens run before SQLite lands — see `src/data/repository.ts` — depends: T1.3
- [ ] T2.2 Playbook JSON schema + validator — required fields, offset/duration/validity sanity, cycle and dangling-dependency rejection with the failing step named (drawing: `uiux/tracks.md` → import error) — see `src/domain/playbook.ts` — depends: T1.6
- [ ] T2.3 Seed playbooks, researched and dated — start with two: `skilled-migration-au`, `start-primary-school`. Each carries `reviewedAt` and a not-advice note — see `src/content` — depends: T2.2
- [x] T2.4 Seed playbook fixture — one small hand-written playbook so tests and screens have data before T2.3 research lands — see `src/content` — depends: T2.2
- [ ] T2.5 SQLite persistence — `@op-engineering/op-sqlite`, migrations table, repository implementation behind T2.1's interface, pods installed — see `src/data` — depends: T2.1
- [ ] T2.6 Store wiring — zustand store over the repository, reflow-on-mutate, undo of the last reflow — see `src/state` — depends: T2.1, T1.6

## Phase 3: The screens

Navigation shell first, then screens in the order a new user meets them. Each
one reads the store from Phase 2 and draws what `uiux/` already specifies, so
these are largely parallel — one task per screen file, disjoint by construction.

- [x] T3.1 Navigation shell — four-tab bar + native stacks, ⚙ in the Timeline nav bar (drawing: `uiux/README.md`) — see `src/navigation` — depends: none
- [x] T3.2 Shared UI primitives — step row, timeline stem, progress bar, date pair, unfolding picker, ⓘ popover, reflow toast (drawing: `uiux/components.md`) — see `src/ui` — depends: none
- [ ] T3.3 Timeline screen + phase detail (drawing: `uiux/timeline.md`) — see `src/screens/TimelineScreen.tsx` — depends: T2.6, T3.1, T3.2, T1.5
- [ ] T3.4 Anchor editor + first run, in-place pickers (drawing: `uiux/anchors.md`) — see `src/screens/AnchorEditScreen.tsx` — depends: T2.6, T3.2
- [ ] T3.5 Radar screen with the four groups and swipe actions (drawing: `uiux/radar.md`) — see `src/screens/RadarScreen.tsx` — depends: T1.8, T2.6, T3.2
- [ ] T3.6 Step detail with documents, prepare, how-to, blocks/waits-for (drawing: `uiux/step.md`) — see `src/screens/StepScreen.tsx` — depends: T2.6, T3.2
- [ ] T3.7 Tracks tab, playbook library, playbook detail with projected dates (drawing: `uiux/tracks.md`) — see `src/screens/TracksScreen.tsx` — depends: T2.2, T2.6, T3.2
- [ ] T3.8 Docs tab + document detail, expiry-clash line (drawing: `uiux/documents.md`) — see `src/screens/DocsScreen.tsx` — depends: T2.6, T3.2
- [ ] T3.9 Settings and children (drawing: `uiux/settings.md`) — see `src/screens/SettingsScreen.tsx` — depends: T2.6, T3.2

## Phase 4: Reminders

Notifications are the feature that makes the app matter when it isn't open, but
they can only be scheduled once instances have real `startBy` dates and a store
to read them from. The 64-pending cap makes this a scheduler of its own, not a
one-line call.

- [x] T4.1 Notifier interface + no-op implementation — see `src/notify/notifier.ts` — depends: none
- [ ] T4.2 Local notifications, hand-rolled `UNUserNotificationCenter` module (no notifee — see `DESIGN.md` Risks) — permission request, deep link into `uiux/radar.md` / the step — see `src/notify`, `ios/LifeChapters/Native` — depends: T4.1, T3.5
- [ ] T4.3 Rolling 64-window queue — register nearest N, refill on foreground and on every reflow, expose the `18/64` counter (drawing: `uiux/settings.md` → Reminders child) — see `src/notify` — depends: T4.2, T2.6
- [ ] T4.4 Weekly digest notification — one summary at the configured day/time — see `src/notify` — depends: T4.2
- [ ] T4.5 Permission-denied banner in Radar and disabled rows in Settings (drawings: `uiux/radar.md`, `uiux/settings.md`) — see `src/screens` — depends: T4.2, T3.9

## Phase 5: Documents, backup, and the ways data leaves

Everything here writes files or touches OS pickers. It comes after the screens
because each piece hangs off a surface that must already exist, and none of it
is needed for the app to be useful on one device.

- [ ] T5.1 JSON export/import of the whole plan, with the replace-confirm (drawing: `uiux/settings.md`) — see `src/data` — depends: T2.5, T3.9
- [ ] T5.2 Document scans — camera/photo/Files picker into the app's own Files-visible folder — see `src/screens/DocumentScreen.tsx` — depends: T3.8
- [ ] T5.3 Plan-a-redo action — insert a repeat of a step so its output lands inside the validity window, then reflow (drawing: `uiux/documents.md`) — see `src/domain/schedule.ts` — depends: T1.6, T3.8
- [ ] T5.4 Playbook file import + export via the share sheet — see `src/screens/TracksScreen.tsx` — depends: T2.2, T3.7
- [ ] T5.5 Optional calendar mirror of `startBy` dates into a `Life Chapters` calendar, off by default — see `src/integrations` — depends: T3.9

## Phase 6: Chapters and the journal

The rebrand to Life Chapters widens the app from plan-ahead to the whole life:
the intervals between dates become chapters, and past chapters hold stories.
Stories are text only (photos stay in the photo library — `DESIGN.md`).

- [ ] T6.1 Rename to Life Chapters — display name, bundle id, Xcode target, repo, folder; phase → chapter in code and copy — see everything — depends: none
- [ ] T6.2 `Entry` type, chapter filing, search — pure, tested — see `src/domain/journal.ts` — depends: T1.5
- [ ] T6.3 Journal tab + story entry modal (drawing: `uiux/journal.md`) — see `src/screens/JournalScreen.tsx`, `EntryScreen.tsx` — depends: T6.2, T2.6
- [ ] T6.4 Stories on the Timeline (`✎ n`) and in chapter detail (drawings: `uiux/journal.md`, `uiux/timeline.md`) — depends: T6.3
- [ ] T6.5 Entries in the backup file — see `src/data/plan.ts` — depends: T6.2, T5.1

## Phase 7: Ship it

Only meaningful once there's an app to sign. Grouped last because every item
here is a release chore, not a capability.

- [ ] T7.1 App icon and launch screen — see `ios/LifeChapters/Images.xcassets` — depends: none
- [ ] T7.2 Signing without secrets in tracked files — placeholder `DEVELOPMENT_TEAM`, gitignored `Local.xcconfig`, per the `security` skill — see `ios` — depends: none
- [ ] T7.3 Physical-device QA pass over every drawing in `uiux/`, smallest supported width included — see `docs/uiux` — depends: Phase 3, Phase 4
- [ ] T7.4 Accessibility pass — Dynamic Type at largest setting, VoiceOver labels on every glyph-only control — see `src/ui` — depends: Phase 3
- [ ] T7.5 TestFlight build, local `xcodebuild` only, no cloud builds — see `docs` — depends: T7.1, T7.2, T7.3

## Running this in parallel

Current parallel batch is whatever in the active phase has `depends: none` or
all-satisfied dependencies. Phase 3's screen tasks are the widest fan-out — nine
tasks over nine mostly-disjoint files — but they all need T2.6 and T3.2 first, so
those two are the bottleneck worth doing well rather than fast.

One agent owns this file and checks the boxes. Agents report done; they don't
edit the checklist.
