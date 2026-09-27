# Screens

Drawings for every surface. Overview, flows, and cross-screen rules are one
level up in [`../UIUX_DESIGN.md`](../UIUX_DESIGN.md).

```
  ┌─ one page, no tab bar ──────────────────┐
  │ Life Chapters ▾ ─▶ dropdown ─▶ person   │
  │ life line       ─▶ anchor editor        │
  │                 ─▶ chapter              │
  │ Plans           ─▶ step ─▶ document     │
  │                 ─▶ library ─▶ playbook  │
  │ Settings        ─▶ reminders · backups  │
  │                    playbooks · about    │
  └─────────────────────────────────────────┘
```

| File | Surface |
|---|---|
| [`timeline.md`](timeline.md) | The one page, chapter detail |
| [`people.md`](people.md) | Person dropdown, Person modal, Who chips, linked events |
| [`anchors.md`](anchors.md) | Anchor editor (with Notes), first run |
| [`plans.md`](plans.md) | Plans section, playbook library + detail |
| [`step.md`](step.md) | Step detail |
| [`documents.md`](documents.md) | Document detail |
| [`settings.md`](settings.md) | Settings section and its children |
| [`components.md`](components.md) | Reused parts, all variants |

## Glyphs used here

Full alphabet in the `uiux` skill's `references/notation.md`. This app leans on:

```
●  anchor in the past, or a completed step
○  future event, not yet reached
┃  the chapter you are in now        │  a chapter already behind you
⋮  the timeline continues          ›  pushes a screen
(6) count of pending steps         ⚠  needs starting now, or already late
▲  a date moved earlier            ▼  a date moved later
!  destructive                     ⓘ  popover with the long explanation
✎  the date has notes              ▾  unfolds in place
```

Width: 43 columns inside every frame, so stacked mocks compare column by column.
