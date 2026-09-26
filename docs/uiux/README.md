# Screens

Drawings for every surface. Overview, flows, and cross-screen rules are one
level up in [`../UIUX_DESIGN.md`](../UIUX_DESIGN.md).

```
  ┌───────────┬─────────┬──────────┬────────┐   tab bar, always visible
  │ Timeline  │  Radar  │  Tracks  │  Docs  │
  └───────────┴─────────┴──────────┴────────┘
     │            │          │          │
     ├─▶ anchors  └─▶ step ◀─┤          └─▶ document detail
     ├─▶ phase        ▲      └─▶ playbook library ─▶ playbook detail
     └─▶ settings     └──── blocks ────┘
```

| File | Surface |
|---|---|
| [`timeline.md`](timeline.md) | Timeline tab, phase detail |
| [`radar.md`](radar.md) | Radar tab |
| [`step.md`](step.md) | Step detail |
| [`anchors.md`](anchors.md) | Anchor editor, first run |
| [`tracks.md`](tracks.md) | Tracks tab, playbook library + detail |
| [`documents.md`](documents.md) | Docs tab, document detail |
| [`settings.md`](settings.md) | Settings and its children |
| [`components.md`](components.md) | Reused parts, all variants |

## Glyphs used here

Full alphabet in the `uiux` skill's `references/notation.md`. This app leans on:

```
●  anchor in the past, or a completed step
○  future event, not yet reached
┃  the phase you are in now        │  a phase already behind you
⋮  the timeline continues          ›  pushes a screen
(6) count of pending steps         ⚠  needs starting now, or already late
▲  a date moved earlier            ▼  a date moved later
!  destructive                     ⓘ  popover with the long explanation
```

Width: 43 columns inside every frame, so stacked mocks compare column by column.
