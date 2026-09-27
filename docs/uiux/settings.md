# Settings

The bottom of the one page ([`timeline.md`](timeline.md)), under Plans — not a
screen of its own, and no ⚙. Its children (Reminders, Backups, Playbooks,
About) still push. Explanations sit behind ⓘ popovers, per the `uiux` skill
(`references/mobile.md`) — the controls stay above the fold.

```
  ⋮  (Plans above)
  Settings
  REMINDERS  ⓘ                              ← ⓘ = the 64-cap explainer
  Only the steps you haven't started.        ← the one sentence that stays out
  Remind me before start-by    14 days  ›
  Weekly digest                Sun 9am  ›
  Nearest reminders queued        18/64  ›    → Reminders child
 ──────────────────────────────────────────
  BACKUP  ⓘ
  On this iPhone          today 21:05 · 14  ›   → Backups child
  iCloud Drive                           ─●
  One file a day · last today 21:05
  Last export       Sep 12, 2026 · 41 KB
  ( Export… )        ( Import… )
 ──────────────────────────────────────────
  PLAYBOOKS
  Sources                  bundled only ›    → Playbooks child
  Check review dates        all current ›
 ──────────────────────────────────────────
  Calendar export                     ○─
  Start-by dates in a "Life Chapters"
  calendar
  Haptics                             ─●
 ──────────────────────────────────────────
  About                                ›
  Life Chapters 1.0 · not advice
```

Settings are app-wide, not per person. Reminders and backups cover every
board.

## Reminders child

```
 ‹              Reminders
 ──────────────────────────────────────────
  Remind me before start-by     14 days  ⌄   ← unfolds in place
 ╭────────────────────────────────────────╮
 │ ( ) same day                            │
 │ ( ) 3 days before                       │
 │ ( ) 7 days before                       │
 │ (•) 14 days before                      │
 │ ( ) 30 days before                      │
 ╰────────────────────────────────────────╯
  Weekly digest                        ─●
  Day                            Sunday  ›   ← unfold in place, like above
  Time                              9am  ›
 ──────────────────────────────────────────
  QUEUED WITH IOS                     18/64
  [██████░░░░░░░░░░░░░░]                    ⓘ
  Through Mar 2027. The rest queue up as
  these fire.
  ( Rebuild the queue )
```

`ⓘ` popover, the thing that isn't needed every visit:

```
 ⌐ iOS holds at most 64 pending reminders per
   app. Your plan has 312 steps, so only the
   nearest ones are handed over; the queue
   refills each time you open the app or one
   fires. Nothing is lost — it just means a
   step 5 years out has no alarm set yet. ¬
```

## Playbooks child

```
 ‹              Playbooks
 ──────────────────────────────────────────
  Oldest review first. A playbook over two
  years old is labelled, never hidden.
  BUNDLED WITH THE APP                 (10)
  Skilled migration · CA       Sep 2026 ›
  Citizenship · CA             Sep 2026 ›
  ⋮
  YOURS                                 (1)
  My citizenship copy        ⚠ Mar 2023 ›
```

## Backups child

Every change updates today's copy and adds a line to the change log. Nothing
to press.

```
 ‹               Backups
 ──────────────────────────────────────────
  ON THIS IPHONE  ⓘ                    (31)
  Today                                 (2) ⌄
    latest                                  ›
    before restore                          ›   ← counts shown on tap, in the confirm
  Yesterday                             (1) ›
  Thu, Sep 24                           (1) ›
 ──────────────────────────────────────────
  ICLOUD DRIVE  ⓘ                       (5)
  Today          one copy, replaced all day ›
  Yesterday                                 ›
  ⋮
 ──────────────────────────────────────────
  CHANGE LOG  ⓘ                 (latest 30)
 ╭────────────────────────────────────────╮
 │ 2026-09-27 14:03 · Me                  │
 │ Ava born moved · 3 steps rescheduled.  │
 │ 2026-09-27 13:40 · Ava                 │
 │ 12-month vaccines done                 │
 │ ⋮                                      │
 ╰────────────────────────────────────────╯
  ( Show in Files )
```

`ⓘ` on this iPhone: "One copy a day, replaced on every change that day and
kept 30 days. What changed, and when, goes into a change log that is only ever
added to." `ⓘ` change log: "Every change, one line each: when, whose board,
what happened. Added to, never rewritten or cleared — one file a year." `ⓘ` iCloud: "One
file a day in iCloud Drive › Life Chapters, replaced on every change that day.
Survives losing the phone."

Tap a row → confirm, then the plan is replaced with that copy — after the plan
you had a moment ago is saved as `before restore`, so a restore can be undone
from the same list.

```
  ┌──────────────────────────────────────┐
  │ Restore from 20:58?                  │
  │ It has 9 dates, 3 plans.             │
  │ What you have now stays in Backups.  │
  │   ( Cancel )        [[ Restore ]]!   │
  └──────────────────────────────────────┘
```

## States

```
permission denied
  REMINDERS  ⓘ
  ⚠ Turned off in iOS Settings.
                        ( Open Settings )
  Remind me before start-by   14 days  ›·    ← disabled until allowed

export running
  ( Exporting… ⟳ )     ( Import… )·

import, would replace
  ┌──────────────────────────────────────┐
  │ Replace your plan?                   │
  │ This file has 9 dates and 4 plans.   │
  │ Your current 7 dates and 3 plans     │
  │ are overwritten.                     │
  │   ( Cancel )        [[ Replace ]]!   │
  └──────────────────────────────────────┘

icloud unavailable
  iCloud Drive                         ─●·
  ⌐ iCloud Drive is off for this iPhone.   ¬   ← toggle disabled
                         ( Open Settings )

never exported
  Last export       never                      ← no warning: daily copies
                                                 already cover the phone

stale playbooks
  Check review dates             2 old  ›
```

## Interactions

| Target | Action | Result |
|---|---|---|
| `ⓘ` | tap | popover, not a pushed page — `uiux` skill, mobile |
| `Export…` | tap | writes JSON, then `[ share sheet ]` |
| `Import…` | tap | `[ document picker ]` → confirm → reflow |
| `Rebuild the queue` | tap | clears and re-registers the nearest 64 |
| `Calendar export` | toggle on | asks calendar permission, then mirrors start-by dates into a `Life Chapters` calendar |
| `Sources` / `Check review dates` | tap | → Playbooks child: bundled and imported playbooks, review dates |

## Copy

| Key | String |
|---|---|
| `settings.reminders.lead` | Remind me before start-by |
| `settings.reminders.oneLine` | Only the steps you haven't started. |
| `settings.reminders.queued` | Nearest reminders queued |
| `settings.reminders.through` | Through {Mon yyyy}. The rest queue up as these fire. |
| `settings.reminders.capInfo` | iOS holds at most 64 pending reminders per app… |
| `settings.reminders.denied` | Turned off in iOS Settings. |
| `settings.backup.never` | Nothing is backed up. |
| `settings.import.replace` | This file has {n} dates and {m} plans. Your current {n2} dates and {m2} plans are overwritten. |
| `settings.restore` | It has {n} dates, {m} plans. What you have now stays in Backups. |
| `settings.about.tagline` | Life Chapters {version} · not advice |

## Notes

`Nearest reminders queued 18/64` is on the page itself on purpose. The
64-item cap ([`../DESIGN.md`](../DESIGN.md#constraints)) is the one place where
the app silently does less than the user assumes, and a counter is cheaper than
a support conversation.

Settings sit at the bottom because nobody navigates to them twice a month; a
tab or a ⚙ gave them more weight than they earn.

A backup file carries every person's board. An old file (from before people)
imports with everything on Me; its journal stories are ignored.

Calendar export is off by default. Writing 312 dates into someone's real
calendar without asking is the fastest way to get an app deleted.
