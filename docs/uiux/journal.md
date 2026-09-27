# Journal

The stories side: what happened, in your words, filed under the chapter it
happened in. Text only — photos stay in the user's photo library.

```
  Journal                          + 
  🔍 Search stories
 ──────────────────────────────────────────
  SETTLING IN · AUSTRALIA          (4)   ← current chapter first
 ╭────────────────────────────────────────╮
 │ Sep 2026                               │
 │ First winter in Sydney                 │
 │ Nobody warned us the houses have no…  ›│
 ├────────────────────────────────────────┤
 │ Sep 14, 2024 · Migrated to Australia   │  ← linked to a date
 │ Landing day                            │
 │ Two suitcases and a borrowed car…     ›│
 ╰────────────────────────────────────────╯

  EARLY CAREER                     (7) ›    ← older chapters fold
  GROWING UP · XI'AN              (12) ›
```

Reached from: tab bar · `✎ 3` on a Timeline row · a chapter's STORIES section

## Entry

Pushed as a modal, same frame as the anchor editor.

```
 ( Cancel )     A story          [[ Save ]]
 ──────────────────────────────────────────
 ╭────────────────────────────────────────╮
 │ When        Sep 2024               ›  │  ← date wheels + precision
 │ About       Migrated to Australia  ›  │  ← optional link to a date
 ╰────────────────────────────────────────╯
  Chapter: Settling in · Australia           ← derived, not picked

  Title (optional)
  ─────────────────────────────────────────
  Two suitcases and a borrowed car. The
  first night we slept on the floor of…▌
                                             ← grows; keyboard-aware
 ──────────────────────────────────────────
  [ Delete this story ]!                     ← edit mode only
```

## States

```
empty        ┌────────────────────────────────────────┐
             │           No stories yet               │
             │  Write down what happened, filed under │
             │  the chapter it happened in.            │
             │         [[ Write the first one ]]       │
             └────────────────────────────────────────┘

future date  When   Mar 2030                  ›
             ⌐ That's ahead — a letter to later. ¬

no results   Nothing matches "wedding".
```

## Timeline and chapter

```
  2024  ● Migrated to Australia   ✎ 2  (10) ›   ← ✎ = stories in this chapter

  Chapter detail
  STORIES                              (4)
  Sep 2026   First winter in Sydney      ›
  Sep 2024   Landing day                 ›
  ( + Write a story )
```

## Interactions

| Target | Action | Result |
|---|---|---|
| `+` / `Write a story` | tap | entry modal, date = today (or the chapter's start, from a chapter) |
| entry row | tap | entry modal, edit mode |
| chapter header | tap | fold / unfold, remembered |
| `✎ n` on Timeline | tap | → that chapter's detail, scrolled to STORIES |
| `About` | tap | unfolds the list of your dates in place; `None` clears |

## Copy

| Key | String |
|---|---|
| `journal.title` | Journal |
| `journal.empty` | Write down what happened, filed under the chapter it happened in. |
| `journal.write` | Write a story |
| `entry.title.add` | A story |
| `entry.title.edit` | Edit story |
| `entry.future` | That's ahead — a letter to later. |
| `entry.chapter` | Chapter: {chapter} |

## Notes

Chapters are the same intervals the Timeline already draws between dates — a
story is never filed by hand, it falls into whichever chapter its date lands
in. Move a date and its stories re-file with it; nothing is lost.

A story's date carries precision like an anchor's: "summer 2003" is a real
memory, and forcing a day out of it would be a lie.
