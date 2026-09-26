# Interface: walking a life as a timeline

Every screen is drawn in [`uiux/`](uiux/) — this file is the map, the flows, and
the rules that cross screens. Product reasoning is in [`DESIGN.md`](DESIGN.md).

Drawn against the `uiux` skill: `references/notation.md` for glyphs,
`references/text-figma.md` for the per-screen files, `references/mobile.md` for
gestures, in-place pickers, and the ⓘ rule.

## Screens & surfaces

| Surface | Kind | Drawing |
|---|---|---|
| Timeline | tab, home | [`uiux/timeline.md`](uiux/timeline.md) |
| Radar | tab | [`uiux/radar.md`](uiux/radar.md) |
| Tracks | tab | [`uiux/tracks.md`](uiux/tracks.md) |
| Docs | tab | [`uiux/documents.md`](uiux/documents.md) |
| Anchor editor | pushed page | [`uiux/anchors.md`](uiux/anchors.md) |
| Phase detail | pushed page | [`uiux/timeline.md`](uiux/timeline.md) |
| Step detail | pushed page | [`uiux/step.md`](uiux/step.md) |
| Playbook library / detail | pushed page | [`uiux/tracks.md`](uiux/tracks.md) |
| Settings | pushed from Timeline ⚙ | [`uiux/settings.md`](uiux/settings.md) |
| Components | reused parts | [`uiux/components.md`](uiux/components.md) |

Four tabs, not five: Settings earns a ⚙ in the Timeline nav bar, not a tab —
nobody navigates to it twice a month. Docs earns a tab because an expiring
document is the one thing you check without having a step in mind.

## Screen map

```
      Launch ──first run──▶ Anchors (empty) ──▶ Playbook library
        │
        ▼
  ┌───────────┬─────────┬──────────┬────────┐
  │ Timeline  │  Radar  │  Tracks  │  Docs  │
  └───────────┴─────────┴──────────┴────────┘
        │          │          │         │
        │          │          │         └─▶ Document detail
        │          │          │
        │          │          ├─▶ Playbook library ─▶ Playbook detail
        │          │          └─▶ Track detail ──┐
        │          │                             │
        │          └────────────────────────────▶ Step detail ─┐
        │                                            │  ▲      │
        ├─▶ Anchor editor                             │  └──────┘
        ├─▶ Phase detail ────────────────────────────▶┘   (blocks → next step)
        │
        └─▶ ⚙ Settings ──▶ Notifications
                       ├──▶ Backup ──▶ [share sheet]
                       └──▶ Playbook sources

  [brackets] = OS-owned surface
```

## Flows

Marking a step done is the app's whole thesis, so it is the flow that must feel
right:

```
  Step detail          tap [[ Mark done ]]        reflow
  ┌──────────────┐                            ┌──────────────┐
  │ Police check │                            │ Police check │
  │ start Nov 12 │  ──▶  engine recomputes ──▶│ ✓ Sep 26     │
  │ [[ Mark done]]│       successors from      │              │
  └──────────────┘       the REAL date         │ BLOCKS       │
                                              │ → Lodge EOI  │
                                              │   Oct 3 (was │
                                              │   Jan 12) ▲  │
                                              └──────────────┘
    ⌐ Done. 3 later steps moved earlier.  ( Undo ) ¬
```

Changing an anchor is the same engine, bigger blast radius:

```
  Anchor editor ── save ──▶ ⚠ confirm ──▶ reflow ──▶ Timeline
                             │
                  "Moving 'Migrated' by 4 months
                   reschedules 41 steps.
                   12 already-done steps keep
                   their real dates."
                      ( Cancel )  [[ Move it ]]
```

First run, because an empty graph has nothing to draw:

```
  Launch ──▶ "When were you born?"  ──▶ Timeline (1 anchor, no steps)
                                          │
                                          └─▶ "Add a track" ──▶ library
```

## Cross-screen states

Drawn per screen; these are the rules behind them.

```
empty       no anchors      → first-run prompt, not a blank list
            no tracks       → Timeline shows dates only, Radar shows the
                              "add a track" invitation
loading     none            → the store is local; a spinner would be a lie.
                              Reflow is synchronous under ~2k instances
error       bad playbook    → import rejected with the failing step named
            notif denied    → one dismissible banner in Radar, with [ Allow ]
partial     stale playbook  → "reviewed Mar 2026" badge, never hidden
overdue     past start-by   → ⚠ ACT NOW group in Radar, red only there
```

## Copy rules

- Never imperative-about-the-world: "Order a police check" (a step in a plan),
  never "You must order a police check" (advice).
- Dates as `Nov 12, 2026`, relative as `in 47 days` / `5 days late`. Both, always
  — the absolute date alone doesn't create urgency, the relative one alone
  can't be checked against a letter.
- A step never says "overdue". It says **`5 days late`** — the plan slipped, the
  user didn't fail.
- Every playbook screen carries `Reviewed <month year> · not official advice`.

Full strings live per screen, under each drawing's `Copy` table.

## Deviations from the `uiux` skill

- None in v1. Two of its mobile rules are load-bearing here and cited where
  used: the **in-place unfolding picker** for the anchor editor's kind/date rows
  ([`uiux/anchors.md`](uiux/anchors.md)), and **explanations behind an ⓘ** for
  the validity-window and notification-cap explainers
  ([`uiux/step.md`](uiux/step.md), [`uiux/settings.md`](uiux/settings.md)).
