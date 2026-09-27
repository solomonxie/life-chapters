# Interface: Life Chapters — walking a life as a timeline

Every screen is drawn in [`uiux/`](uiux/) — this file is the map, the flows, and
the rules that cross screens. Product reasoning is in [`DESIGN.md`](DESIGN.md).

Drawn against the `uiux` skill: `references/notation.md` for glyphs,
`references/text-figma.md` for the per-screen files, `references/mobile.md` for
gestures, in-place pickers, and the ⓘ rule.

## Screens & surfaces

| Surface | Kind | Drawing |
|---|---|---|
| Timeline — the one page | root, home | [`uiux/timeline.md`](uiux/timeline.md) |
| Person dropdown | unfolds under the title | [`uiux/people.md`](uiux/people.md) |
| Plans | section of the page | [`uiux/plans.md`](uiux/plans.md) |
| Settings | section of the page, at the bottom | [`uiux/settings.md`](uiux/settings.md) |
| Anchor editor | modal | [`uiux/anchors.md`](uiux/anchors.md) |
| Person (new / link / rename / lives in) | modal | [`uiux/people.md`](uiux/people.md) |
| Chapter detail | pushed page | [`uiux/timeline.md`](uiux/timeline.md) |
| Step detail | pushed page | [`uiux/step.md`](uiux/step.md) |
| Document detail | pushed page | [`uiux/documents.md`](uiux/documents.md) |
| Playbook library / detail | pushed page | [`uiux/plans.md`](uiux/plans.md) |
| Reminders / Backups / Playbooks / About | pushed from Settings | [`uiux/settings.md`](uiux/settings.md) |
| Components | reused parts | [`uiux/components.md`](uiux/components.md) |

One page, no tab bar, no ⚙: life line, then Plans, then Settings, in one
scroll. Everything else pushes on one stack. The old tabs (Radar, Tracks,
Docs, Journal) are gone — Radar and Tracks became the Plans section, expiring
documents moved into it, and the journal became a Notes field on each date.
"Tracks" are called **Plans** wherever the user sees them.

The title, `Life Chapters ▾`, switches whose board the page shows.

## Screen map

```
  Launch ──first run──▶ Born ─▶ one more date ─▶ Pick a plan
        │
        ▼
  ┌─ Timeline, one page ────────────────────┐
  │ Life Chapters ▾ ─▶ dropdown ─▶ Person ◆ │
  │ NOW card ─────────▶ Chapter detail      │
  │ life line ─● past ─▶ Anchor editor ◆    │
  │            ○ / (n) ─▶ Chapter detail    │
  │ + Add a date ─────▶ Anchor editor ◆     │
  │ Plans ─ step row ─▶ Step detail ─┐      │
  │       ─ expiring ─▶ Document ◀───┘      │
  │       ─ plan row ─▶ Playbook detail     │
  │       ─ + Add a plan ─▶ Library ─▶ …    │
  │ Settings ─▶ Reminders · Backups         │
  │          ─▶ Playbooks · About           │
  │          ─▶ [share sheet] [doc picker]  │
  └─────────────────────────────────────────┘

  ◆ = modal    [brackets] = OS-owned surface
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
                                              │ → Submit PR  │
                                              │   Oct 3 (was │
                                              │   Jan 12) ▲  │
                                              └──────────────┘
    ⌐ Done. 3 later steps moved earlier.  ( Undo ) ¬
```

Changing an anchor is the same engine, bigger blast radius:

```
  Anchor editor ── save ──▶ ⚠ confirm ──▶ reflow ──▶ Timeline
                             │
                  "Moving 'Relocated' by 4 months
                   reschedules 41 steps.
                   12 already-done steps keep
                   their real dates."
                      ( Cancel )  [[ Move it ]]
```

Moving a shared date moves it everywhere it lives — linked events share a
`linkId` across boards ([`uiux/people.md`](uiux/people.md)):

```
  my "Ava born" ── save ──▶ her "Born" moves too ──▶ plans on both boards
                                                      reflow
```

First run, because an empty graph has nothing to draw:

```
  Launch ──▶ "When were you born?"  ──▶ "One more." ──▶ "Pick a plan"
                                                          │
                                   Timeline (dates, maybe a plan) ◀─┘
```

## Cross-screen states

Drawn per screen; these are the rules behind them.

```
empty       no anchors      → first-run prompt, not a blank list
            new person      → "When was {name} born?"
            no plans        → dates only; Plans shows [[ Browse plans ]]
loading     none            → the store is local; a spinner would be a lie.
                              Reflow is synchronous under ~2k instances
error       bad playbook    → import rejected with the failing step named
            notif denied    → one dismissible banner atop Plans, with [ Allow ]
partial     stale playbook  → "reviewed Mar 2026" badge, never hidden
            wrong place     → plan's rules ≠ its date's place: red line
                              "Ontario rules · Married in British
                              Columbia", switch to the twin on detail
moment      visit, trip     → on the stem with its plans; cuts no chapter
start now   past start-by   → Act now in Plans, calm: "start now", no red
overdue     past due-by     → the only red: ⚠ on the row, "n days late",
                              and one "⚠ n steps are late" line on the stem
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
- "Plan", never "track", in anything the user reads.
- China plans are English; the Chinese term follows in parentheses
  (`旅行证`, `中考`) so it can be matched to a form or a counter.
- Nationality steps say what each route requires, never which to take.
- "Applies if" lines are descriptions ("Only if they plan to go to university
  in Ontario"), never eligibility verdicts.

Full strings live per screen, under each drawing's `Copy` table.

## Deviations from the `uiux` skill

- None in v1. Two of its mobile rules are load-bearing here and cited where
  used: the **in-place unfolding picker** for the anchor editor's kind/date rows
  ([`uiux/anchors.md`](uiux/anchors.md)) and the person dropdown
  ([`uiux/people.md`](uiux/people.md)), and **explanations behind an ⓘ** for
  the validity-window and notification-cap explainers
  ([`uiux/step.md`](uiux/step.md), [`uiux/settings.md`](uiux/settings.md)).
