# The engine is the product

`src/domain/` is pure TypeScript — no React, no native module, no I/O — and it
decides every date the app shows. A feature that wants a date should get it from
`schedule()`, not compute one nearby. If the scheduler can't express something,
change the scheduler and its tests; don't work around it in a screen.

Anything that changes `src/domain/schedule.ts` or `dates.ts` lands with tests in
the same commit. The invariants worth breaking a build over:

- **A done step is pinned.** Its real completion date never gets recomputed, no
  matter how the anchor moves.
- **Dates are civil dates** (`YYYY-MM-DD` strings), compared lexically. Never a
  `Date` in a type, never a timezone in the math — a birthday must not shift
  because of a flight.
- **A cycle is an error, not a guess.** Reject the playbook and name the steps.
- **Reflow is visible.** Every schedule change the user didn't directly make
  gets a toast, a `▲▼`, or a "was Jan 12" — nothing moves silently.

# Draw it before you build it

Every screen is already drawn in `docs/uiux/`. Build the drawing; if the
drawing is wrong, fix the drawing in the same commit. A UI change with no
mockup update leaves the repo with two sources of truth, and the stale one wins
arguments it shouldn't.

Tasks and their order live in `docs/IMPLEMENT_PLAN.md` — check a box only when
the code is merged and tests pass.

# Never claim authority the app doesn't have

Playbook content describes paperwork; it is not legal, immigration, tax, or
financial advice, and the app never phrases it as an instruction about the
world. "Order a police check" is a step in a plan. "You must order a police
check" is advice, and wrong the moment a rule changes.

Every playbook carries `reviewedAt`, shown in the UI. Stale content is labelled
stale, never hidden.

# Bare React Native, iPhone only

- **No Expo.** Metro is the bundler (this was a deliberate choice, see
  `docs/DESIGN.md`); `@react-native-community/cli` drives builds.
- **No cloud builds.** Local `xcodebuild`/`devicectl` only.
- **Physical device for QA.** If the paired iPhone isn't reachable, say so —
  don't quietly switch to a simulator for anything beyond a compile check.
- **No `android/`.** It was removed on purpose; don't regenerate it.
- **Dependencies are a cost.** Four runtime deps today. Hand-roll a hundred
  lines before taking a package, and when you do take one, say why in
  `docs/DESIGN.md`'s Risks section.
- **No signing secrets in tracked files** — team ID goes in a gitignored
  `ios/Local.xcconfig`, per the `security` skill.

# Nothing leaves the device

No server, no analytics, no telemetry, no crash reporter that phones home. The
only data egress is a file the user explicitly exports through the share sheet.
Adding a network call to this app is a design decision, not an implementation
detail — it goes in `docs/DESIGN.md` first.
