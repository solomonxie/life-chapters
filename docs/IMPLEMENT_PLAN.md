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
- [x] T1.8 Bucketing for Plans — group instances into act-now / 90d / year / later by `startBy`, and the `▲▼` delta against the previous schedule — see `src/domain/radar.ts` — depends: T1.6

## Phase 2: Content and storage

The engine needs real playbooks to schedule and somewhere to keep the result.
Both are schema work that the screens then read — doing them after the engine
means the schema is shaped by what the scheduler actually consumes, not guessed.

- [x] T2.1 Repository interface + in-memory implementation — lets Phase 3 screens run before SQLite lands — see `src/data/repository.ts` — depends: T1.3
- [x] T2.2 Playbook JSON schema + validator — required fields, offset/duration/validity sanity, cycle and dangling-dependency rejection with the failing step named (drawing: `uiux/plans.md` → import error) — see `src/domain/playbook.ts` — depends: T1.6
- [x] T2.3 (replaced by the Canada set, T6.16) Seed playbooks, researched and dated — start with two: `skilled-migration-au`, `start-primary-school`. Each carries `reviewedAt` and a not-advice note — see `src/content` — depends: T2.2
- [x] T2.4 Seed playbook fixture — one small hand-written playbook so tests and screens have data before T2.3 research lands — see `src/content` — depends: T2.2
- [x] T2.5 SQLite persistence — `@op-engineering/op-sqlite`, migrations table, repository implementation behind T2.1's interface, pods installed — see `src/data/sqlite.ts` — depends: T2.1
- [x] T2.6 Store wiring — zustand store over the repository, reflow-on-mutate, undo of the last reflow — see `src/state` — depends: T2.1, T1.6

## Phase 3: The screens

Navigation shell first, then screens in the order a new user meets them. Each
one reads the store from Phase 2 and draws what `uiux/` already specifies, so
these are largely parallel — one task per screen file, disjoint by construction.

- [x] T3.1 (tabs replaced in T6.7) Navigation shell — four-tab bar + native stacks, ⚙ in the Timeline nav bar (drawing: `uiux/README.md`) — see `src/navigation` — depends: none
- [x] T3.2 Shared UI primitives — step row, timeline stem, progress bar, date pair, unfolding picker, ⓘ popover, reflow toast (drawing: `uiux/components.md`) — see `src/ui` — depends: none
- [x] T3.3 Timeline screen + phase detail (drawing: `uiux/timeline.md`) — see `src/screens/TimelineScreen.tsx` — depends: T2.6, T3.1, T3.2, T1.5
- [x] T3.4 Anchor editor + first run, in-place pickers (drawing: `uiux/anchors.md`) — see `src/screens/AnchorEditScreen.tsx` — depends: T2.6, T3.2
- [x] T3.5 (now the Plans section, T6.8) Radar screen with the four groups and swipe actions (drawing: `uiux/plans.md`) — see `src/screens/PlansSection.tsx` — depends: T1.8, T2.6, T3.2
- [x] T3.6 Step detail with documents, prepare, how-to, blocks/waits-for (drawing: `uiux/step.md`) — see `src/screens/StepScreen.tsx` — depends: T2.6, T3.2
- [x] T3.7 (now the Plans section, T6.8) Tracks tab, playbook library, playbook detail with projected dates (drawing: `uiux/plans.md`) — see `src/screens/PlanList.tsx`, `LibraryScreen.tsx`, `PlaybookScreen.tsx` — depends: T2.2, T2.6, T3.2
- [x] T3.8 (Docs tab removed in T6.8) Docs tab + document detail, expiry-clash line (drawing: `uiux/documents.md`) — see `src/screens/DocumentScreen.tsx` — depends: T2.6, T3.2
- [x] T3.9 (a section since T6.9) Settings and children (drawing: `uiux/settings.md`) — see `src/screens/SettingsSection.tsx` — depends: T2.6, T3.2

## Phase 4: Reminders

Notifications are the feature that makes the app matter when it isn't open, but
they can only be scheduled once instances have real `startBy` dates and a store
to read them from. The 64-pending cap makes this a scheduler of its own, not a
one-line call.

- [x] T4.1 Notifier interface + no-op implementation — see `src/notify/notifier.ts` — depends: none
- [x] T4.2 Local notifications, hand-rolled `UNUserNotificationCenter` module (no notifee — see `DESIGN.md` Risks) — permission request, deep link into the page / the step — see `src/notify`, `ios/LifeChapters/Native` — depends: T4.1, T3.5
- [x] T4.3 Rolling 64-window queue — register nearest N, refill on foreground and on every reflow, expose the `18/64` counter (drawing: `uiux/settings.md` → Reminders child) — see `src/notify` — depends: T4.2, T2.6
- [x] T4.4 Weekly digest notification — one summary at the configured day/time — see `src/notify` — depends: T4.2
- [x] T4.5 Permission-denied banner in Plans and disabled rows in Settings (drawings: `uiux/plans.md`, `uiux/settings.md`) — see `src/screens` — depends: T4.2, T3.9

## Phase 5: Documents, backup, and the ways data leaves

Everything here writes files or touches OS pickers. It comes after the screens
because each piece hangs off a surface that must already exist, and none of it
is needed for the app to be useful on one device.

- [x] T5.1 JSON export/import of the whole plan, with the replace-confirm (drawing: `uiux/settings.md`) — see `src/data` — depends: T2.5, T3.9
- [x] T5.2 Document scans — camera/photo/Files picker into the app's own Files-visible folder — see `src/screens/DocumentScreen.tsx` — depends: T3.8
- [x] T5.3 Plan-a-redo action — insert a repeat of a step so its output lands inside the validity window, then reflow (drawing: `uiux/documents.md`) — see `src/domain/schedule.ts` — depends: T1.6, T3.8
- [x] T5.4 Playbook file import + export via the share sheet — see `src/screens/playbookFiles.ts` — depends: T2.2, T3.7
- [x] T5.5 Optional calendar mirror of `startBy` dates into a `Life Chapters` calendar, off by default — see `src/integrations` — depends: T3.9

## Phase 6: Chapters and the journal

The rebrand to Life Chapters widens the app from plan-ahead to the whole life:
the intervals between dates become chapters, and past chapters hold stories (since T6.10, notes on each date).
Stories are text only (photos stay in the photo library — `DESIGN.md`).

- [x] T6.1 Rename to Life Chapters — display name, bundle id, Xcode target, repo, folder; phase → chapter in code and copy — see everything — depends: none
- [x] T6.2 (removed in T6.10) `Entry` type, chapter filing, search — pure, tested — see `src/domain/journal.ts` — depends: T1.5
- [x] T6.3 (removed in T6.10) Journal tab + story entry modal (drawing: `uiux/journal.md`) — see `src/screens/JournalScreen.tsx`, `EntryScreen.tsx` — depends: T6.2, T2.6
- [x] T6.4 (removed in T6.10) Stories on the Timeline (`✎ n`) and in chapter detail (drawings: `uiux/journal.md`, `uiux/timeline.md`) — depends: T6.3
- [x] T6.5 (removed in T6.10) Entries in the backup file — see `src/data/plan.ts` — depends: T6.2, T5.1

- [x] T6.6 Auto-backup: a snapshot per change in the app's `Backups` folder (20 a day, 7 days), opt-in iCloud Drive copy per day, restore list (drawing: `uiux/settings.md` → Backups child) — see `src/data/snapshots.ts`, `src/state/autobackup.ts`, `ios/LifeChapters/Native` — depends: T5.1

## Phase 6, continued: one page, people, Canada and China

Five tabs read as five apps, and one board couldn't hold a family: a child's
plans must count from the child's birth. So the tabs fold into one page, each
person gets a board, the journal shrinks to notes on dates, and the content
restarts in Canada, then adds China and the paperwork between the two.
Reasoning in `DESIGN.md` → Product decisions.

- [x] T6.7 One page, no tab bar — Timeline hosts the life line, the Plans section and the Settings section; one native stack; the late-steps line scrolls to Plans; a node's `(n)` opens its chapter; bottom-tabs dependency dropped (drawings: `uiux/timeline.md`, `uiux/README.md`) — see `src/screens/TimelineScreen.tsx`, `src/navigation/RootNavigator.tsx` — depends: T3.3
- [x] T6.8 Plans section — Radar and Tracks merged: denied banner, ⚠ Expiring documents, Your plans with progress, the four buckets, Done, `+ Add a plan`; Radar filter and the Docs tab removed; "Tracks" → "Plans" in all copy (drawings: `uiux/plans.md`, `uiux/documents.md`) — see `src/screens/PlansSection.tsx`, `PlanList.tsx` — depends: T6.7
- [x] T6.9 Settings as the page's last section, children still pushed (drawing: `uiux/settings.md`) — see `src/screens/SettingsSection.tsx` — depends: T6.7
- [x] T6.10 Journal removed — `Entry`, Journal tab, story modal, `uiux/journal.md` gone; replaced by a multi-line Notes field per date, shown in chapter detail, `✎` on the stem (drawings: `uiux/anchors.md`, `uiux/timeline.md`) — see `src/screens/AnchorEditScreen.tsx`, `ChapterScreen.tsx` — depends: T6.7
- [x] T6.11 People domain — `Person`, per-person scoping of anchors/tracks/instances/documents (`personId` absent = Me), linked kinds and mirrored events sharing a `linkId`, tested — see `src/domain/people.ts`, `__tests__/people.test.ts` — depends: T1.3
- [x] T6.12 People in the store — `mine`, `switchPerson`, `addPerson`, `linkPerson`, `renamePerson`, `removePerson`; moving a linked date moves every copy and reflows their plans; deleting one deletes all copies, people stay — see `src/state/store.ts` — depends: T6.11, T2.6
- [x] T6.13 Person dropdown in the title, Person modal (new / link / rename), `Who` field with person chips in the anchor editor (drawings: `uiux/people.md`, `uiux/anchors.md`) — see `src/screens/TimelineScreen.tsx`, `PersonScreen.tsx`, `AnchorEditScreen.tsx` — depends: T6.12, T6.7
- [x] T6.14 Reminders across every board; a reminder tap switches to the step's owner first — see `App.tsx`, `src/state/sync.ts` — depends: T6.12, T4.2
- [x] T6.15 Storage — SQLite migrations drop `entries` and add `people`; the backup file carries `people`; older files import with stories ignored and everything on Me — see `src/data/sqlite.ts`, `src/data/plan.ts` — depends: T6.11, T5.1
- [x] T6.16 Canada content — Express Entry, citizenship, getting married (Ontario), expecting a baby (new `baby-due` kind), newborn, early years, school JK–Grade 8 (Ontario), high school (Ontario), growing up 14–19, retirement; Australian playbooks removed; child plans anchor on the child's own `Born` — see `src/content/playbooks`, `src/content/index.ts` — depends: T2.2
- [x] T6.17 Ages and conditions — `ages` and `conditions` on playbooks and steps, shown by `AppliesIf` on playbook and step detail and in Library rows; Library sorted by life stage, "Fits your events" hides outgrown birth plans, "Coming soon" for the United States and China (China shipped in T6.23) (drawings: `uiux/plans.md`, `uiux/step.md`, `uiux/components.md`) — see `src/ui/AppliesIf.tsx`, `src/screens/LibraryScreen.tsx` — depends: T6.16, T3.2
- [x] T6.18 Event place — `location` on anchors, searchable offline city list (GeoNames, CC BY 4.0, rebuilt by `scripts/build-cities.mjs`), English and Chinese names, free text for unlisted places; shared by linked events, shown on the stem and chapter detail (drawing: `uiux/anchors.md`) — see `src/domain/places.ts`, `src/ui/PlacePicker.tsx` — depends: T6.16
- [x] T6.19 Province per person — `province`/`family` on provincial playbooks, British Columbia twins for every Ontario plan, person's province set by hand or inferred from the latest Canadian Place, Library filtered with other provinces collapsed, wrong-province plans flagged with a one-undo switch to the twin; renamed ids migrate on load (drawings: `uiux/plans.md`, `uiux/people.md`) — see `src/domain/provinces.ts` (now `regions.ts`, T6.21) — depends: T6.17, T6.18
- [x] T6.20 Backups as a daily copy plus an append-only change log (`changes-YYYY.log`, one line per change); copies kept 30 days, the log never pruned; restores save `…-before-restore` first (drawing: `uiux/settings.md` → Backups child) — see `src/data/snapshots.ts`, `src/state/autobackup.ts`, `ios/LifeChapters/Native/Files.swift` — depends: T6.6
- [x] T6.21 Countries and regions — `country` on every playbook, `where` = {country, province} per person, set under "Lives in" (From my events · Canada's provinces · China) or inferred from the latest residence date (Born, Relocated, Moved city, Bought a home); Chinese-script places with no country read as China; `whereAt` lets a date's own Place decide (Born follows where they live now); Library by country and province, "Other places" collapsed, Coming soon = United States; flag reads "Ontario rules · Married in British Columbia" with a switch to `twinFor` (drawings: `uiux/plans.md`, `uiux/people.md`) — see `src/domain/regions.ts`, `__tests__/regions.test.ts`, `src/screens/LibraryScreen.tsx`, `PersonScreen.tsx` — depends: T6.19
- [x] T6.22 Relocation and PR — kinds relabeled (Relocated to a country, Apply for permanent residence, Permit or visa granted; old default labels relabeled on load) and new `pr-landed`; Relocating · work or study for BC and Ontario; Provincial nomination for BC and Ontario; Express Entry with CEC/FSW/FST routes and the +600 nomination; citizenship counts from `pr-landed` (drawing: `uiux/anchors.md`) — see `src/domain/kinds.ts`, `src/state/store.ts`, `src/content/playbooks/relocation-*.ts`, `pnp-*.ts` — depends: T6.21
- [x] T6.23 China life stages — marriage, expecting, newborn, early years, primary, secondary (中考/高考), growing up, retirement; English with Chinese terms in parentheses; each a `family` twin of the Canadian plans — see `src/content/playbooks/*-cn.ts` — depends: T6.21
- [x] T6.24 Nationality and China relocation — "Born in Canada to a Chinese parent" (nationality position, 旅行证 vs visa) and "Relocating to China · Canadian with Chinese family" (Q1 visa, PR, nationality, 旅行证 routes); state the law, never recommend — see `born-to-chinese-parent-ca.ts`, `relocation-cn.ts` — depends: T6.23
- [x] T6.25 Visits and trips as moments — `moment` kinds "Visitors arrive" (`visit`, Detail = who) and "Trip abroad" (`trip`, Place = destination) sit on the stem but cut no chapter; "Visitors to Canada" (eTA / TRV / super visa) and "Travelling to China" (visa-free, 240-hour transit, visa from outside vs extending inside) (drawings: `uiux/anchors.md`, `uiux/timeline.md`) — see `src/domain/kinds.ts`, `src/domain/plan.ts`, `visit-canada.ts`, `travel-cn.ts` — depends: T6.21
- [x] T6.26 Plans calm, Next steps — "Next 90 days" → "Next steps", nearest 3 then "Show all n"; Act now without ⚠ or red, a passed start-by reads "start now"; red only for past due-by, a document expiring before it's needed, and Can't schedule (drawing: `uiux/plans.md`) — see `src/screens/PlansSection.tsx`, `src/ui/StepRow.tsx`, `src/domain/plan.ts` — depends: T6.8
- [x] T6.28 Plans per plan — the one page lists plans with a progress bar and `Next: {step} · {when}`; Act now and Next steps (nearest 3) move to each plan's page above All steps; plan summary folds to 2 lines (tap for more, with AppliesIf); sources show 3 then `Show all n`; wrong-place flag names the event and its place with `Edit event`; place search ranks the country they live in first; event form: What, Place, When, Precision, then Event name; picker names in English (drawings: `uiux/plans.md`, `uiux/anchors.md`) — see `src/screens/PlaybookScreen.tsx`, `PlanList.tsx`, `src/domain/regions.ts` — depends: T6.26, T6.21
- [x] T6.29 Library by place — `Lives in` card on top naming the event that decided it; groups per country and, in Canada, nationwide and per province; where they live first and in full, the rest 3 then `Show all n` (drawing: `uiux/plans.md`) — see `src/screens/LibraryScreen.tsx` — depends: T6.21, T6.28
- [x] T6.30 Every event opens plans — `alsoOpens` on a kind: Starts primary school → School years and Retire → Retirement, counted from their Born; Child born → Newborn and Early years on the child's board; New job → Starting a job; new plans After graduation (CA, CN), Starting a job (CA, CN), Moving home (BC, ON, CN), Buying a home (BC, ON, CN); listed live in the event form (drawing: `uiux/anchors.md`) — see `src/domain/kinds.ts`, `people.ts` `countsFrom`, `__tests__/opens.test.ts` — depends: T6.21
- [x] T6.31 Where they live is only inferred — no Lives in picker; `livesIn` reads the latest residence event with a Place; the Library card and the plan flag open that event to fix it (drawings: `uiux/people.md`, `uiux/plans.md`) — see `src/domain/regions.ts`, `src/screens/LibraryScreen.tsx` — depends: T6.21
- [x] T6.32 Names open boards — the other person's name on a linked event is a link on the stem, and a linked event's page has `{name}'s life ›`; the person menu lists only Me, whoever is showing, and people with an event of their own (drawing: `uiux/people.md`) — see `src/ui/TimelineStem.tsx`, `src/domain/people.ts` `menuPeople` — depends: T6.10
- [x] T6.33 Whole-life coverage audit — Canada and China plans reviewed for missing paperwork; steps added across existing plans (社保 continuity, 公积金 rent/loan, rent and infant-care deductions, mortgage release; BSF186, T1135, Fair PharmaCare, mortgage renewal, CDCP, child passports; CGEB rename); new kinds Job ended, Started a business, Sold a home, Bought a car, Moved in together, Separated or divorced, Caring for a family member, Parent turns 60, Death in the family; `leaving` plans match where they lived before (Leaving Canada, Leaving China, travelling out); 33 new plans, 77 in all — see `src/content/playbooks`, `src/domain/regions.ts` `plansFor`, `__tests__/opens.test.ts` — depends: T6.30
- [x] T6.34 Visitor visa plans — Chinese and Philippine passports to the US, Canada, UK, Japan, the Schengen area, the Philippines / China; tourism and family visits; applying at home, from a third country of residence, or extending inside; `citizen` on a plan, passport read from Born; Visitors arrive offers every passport's plan (drawing: `uiux/anchors.md`) — see `src/domain/regions.ts` `citizenOf`, `__tests__/regions.test.ts` — depends: T6.33
- [ ] T6.35 Student and work visas for the same passports and destinations — depends: T6.34
- [x] T6.27 Step and plan titles, changeable dates — full title as the page's first line, wrapping, nav bar empty; due date shows "· suggested" / "· moved by you" and `Change ›`, which opens the date wheel in place (Move it / Reset); a done date is changeable too (drawings: `uiux/step.md`, `uiux/plans.md`) — see `src/screens/StepScreen.tsx`, `PlaybookScreen.tsx` — depends: T3.6, T3.7

## Phase 7: Ship it

Only meaningful once there's an app to sign. Grouped last because every item
here is a release chore, not a capability.

- [x] T7.1 App icon and launch screen — see `ios/LifeChapters/Images.xcassets` — depends: none
- [x] T7.2 Signing without secrets in tracked files — placeholder `DEVELOPMENT_TEAM`, gitignored `Local.xcconfig`, per the `security` skill — see `ios` — depends: none
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
