# Format: `lifeline-events` v1

The only contract between generators (desktop kit, agents, spreadsheets) and
the app. Machine version: `format/lifeline-events.schema.json` (JSON Schema),
used by the app's tests and by `desktop/validate.py`. Examples:
`format/examples/`.

## JSON (canonical)

```json
{
  "format": "lifeline-events",
  "version": 1,
  "generatedAt": "2026-10-18",
  "generator": "lifeline-desktop 0.1",
  "people": [{ "name": "Ava" }],
  "events": [
    {
      "id": "trip-2024-04-03-kyoto",
      "kind": "trip",
      "label": "Kyoto",
      "date": "2024-04-03",
      "end": "2024-04-11",
      "place": "Kyoto, Japan",
      "purpose": "leisure",
      "confidence": "high",
      "evidence": [
        { "source": "photos", "title": "212 photos in Kyoto", "date": "2024-04-03" },
        { "source": "mail", "title": "Your flight to Osaka (KIX)", "date": "2024-03-02" }
      ]
    },
    {
      "id": "moved-2016-08-vancouver",
      "kind": "moved-city",
      "label": "Vancouver",
      "date": "2016-08",
      "place": "Vancouver, British Columbia, Canada",
      "note": "First flat on Main St.",
      "confidence": "medium"
    }
  ],
  "documents": [
    { "id": "passport-me-2031", "kind": "passport", "label": "Passport",
      "issued": "2021-05-10", "expires": "2031-05-09" }
  ]
}
```

## Fields

Event:

| Field | Req | Rule |
|---|---|---|
| `id` | ✓ | stable across runs; `[a-z0-9._-]`, ≤80 chars. Same event → same id |
| `kind` | ✓ | an app kind id (below); unknown → imported as `event` + warning |
| `date` | ✓ | `YYYY` · `YYYY-MM` · `YYYY-MM-DD`; length sets precision |
| `label` | | detail for the kind's title ("Kyoto" → "Trip to Kyoto"); else the kind's label |
| `end` | | same forms; ≥ `date` |
| `place` | | free text; "City, Province, Country" matches the city list best |
| `person` | | name; absent = Me |
| `with` | | name of the other person in a shared event |
| `purpose` | | trips/visits: `leisure` · `visiting` · `business` |
| `note` | | the user's words, ≤2,000 chars |
| `confidence` | | `high` · `medium` · `low`; `low` starts unticked |
| `evidence[]` | | `{source, title, date?, url?}`; `source` free text (`photos`, `mail`, `calendar`, `file`, `location`) |

Document: `id`, `kind` (`passport` · `permit` · `visa` · `licence` · `card` ·
other), `label`, `issued?`, `expires?`, `person?`, `note?`.

Person: `name`, `born?`.

Kind ids (v1, from `src/domain/kinds.ts`):

```
born  graduated  school-start  first-job  new-job  job-lost
business-started  retire  migrated  moved-city  visa-granted  visa-lodge
pr-landed  married  baby-due  child-born  home-bought  home-sold
car-bought  cohabiting  separated  caregiving  parent-60  family-death
visit  trip  event (new: generic moment)
```

## CSV (events only)

UTF-8, RFC 4180 (quotes, embedded commas/newlines), header row required,
column order free, unknown columns ignored.

```
id,kind,date,end,label,place,person,with,purpose,note,confidence,evidence
trip-2024-04-03-kyoto,trip,2024-04-03,2024-04-11,Kyoto,"Kyoto, Japan",,,leisure,,high,"photos: 212 photos in Kyoto; mail: Your flight to Osaka"
moved-2016-08-vancouver,moved-city,2016-08,,Vancouver,"Vancouver, BC, Canada",,,,First flat on Main St.,medium,
```

- `evidence`: `source: title` pairs split by `; `
- Missing `id` (hand-typed sheets) → app derives `kind-date-label` and warns
  that re-import may duplicate if those change

## Rules both sides enforce

- Dates are civil dates; no times, no zones
- One file ≤10 MB, ≤20,000 rows
- New fields are always optional; `version` changes only for breaking changes
- The app exports in this same format (`generator: "Life Line <version>"`),
  so a generator can read it and skip ids already present
