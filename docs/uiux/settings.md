# Settings

Pushed from the Timeline's ⚙. Explanations sit behind ⓘ popovers, per the `uiux`
skill (`references/mobile.md`) — the controls stay above the fold.

```
 ‹ Timeline       Settings
 ──────────────────────────────────────────
  REMINDERS  ⓘ
  Only the steps you haven't started.        ← the one sentence that stays out
  Remind me before start-by    14 days  ›
  Weekly digest                Sun 9am  ›
  Nearest reminders queued        18/64  ›    → notifications child
 ──────────────────────────────────────────
  YOUR PLAN
  Dates                              7  ›
  Tracks                             3  ›
  Documents                         12  ›
 ──────────────────────────────────────────
  BACKUP  ⓘ
  Last export       Sep 12, 2026 · 41 KB
  ( Export… )        ( Import… )
 ──────────────────────────────────────────
  PLAYBOOKS
  Sources                  bundled only ›
  Check review dates                 ›
 ──────────────────────────────────────────
  Calendar export                     ○─
  Haptics                             ─●
 ──────────────────────────────────────────
  About                                ›
  Life Planner 0.1.0 · not advice
```

## Reminders child

```
 ‹ Settings     Reminders
 ──────────────────────────────────────────
  Remind me before start-by     14 days  ⌄   ← unfolds in place
 ╭────────────────────────────────────────╮
 │ ( ) same day                            │
 │ ( ) 3 days before                       │
 │ ( ) 7 days before                       │
 │ (•) 14 days before                      │
 │ ( ) 30 days before                      │
 ╰────────────────────────────────────────╯
  Weekly digest                  Sun 9am  ›
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
  │ This file has 9 dates and 4 tracks.  │
  │ Your current 7 dates and 3 tracks    │
  │ are overwritten.                     │
  │   ( Cancel )        [[ Replace ]]!   │
  └──────────────────────────────────────┘

never exported
  Last export       never
  ⌐ Nothing is backed up. ¬   ( Export… )

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
| `Calendar export` | toggle on | asks calendar permission, then mirrors start-by dates into a `Life Planner` calendar |
| `Dates` / `Tracks` / `Documents` | tap | the matching tab, unfiltered |

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
| `settings.import.replace` | This file has {n} dates and {m} tracks. Your current {n2} dates and {m2} tracks are overwritten. |
| `settings.about.tagline` | Life Planner {version} · not advice |

## Notes

`Nearest reminders queued 18/64` is on the main Settings screen on purpose. The
64-item cap ([`../DESIGN.md`](../DESIGN.md#constraints)) is the one place where
the app silently does less than the user assumes, and a counter is cheaper than
a support conversation.

Calendar export is off by default. Writing 312 dates into someone's real
calendar without asking is the fastest way to get an app deleted.
