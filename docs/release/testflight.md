# TestFlight external testing

App Store Connect → TestFlight → External Testing → **+** group → add the build. First build of a version goes through Beta App Review (~1 day).

## Test Information

Beta App Description (≤4000):

```
Paper Works gets the paperwork for life's big moves ready on time. Add an event and it lays out every form and document in order, from bundled playbooks (Canada federal, Ontario, BC, and China) for life stages, immigration (Express Entry, PR, citizenship), visitors and travel. Plans become dated steps scheduled backward from the event they serve, and marking one done reflows what follows.

No account, no server. On first launch enter a birth date (or tap Later). To see a filled-in plan: Settings (bottom of the home page) → Demo data (a sample family in a separate store; your plan is not read or changed while it's on).

What's in this beta:
• Home page: paperwork summary, then events coming up and past
• Plans from playbooks, with step reflow on completion
• Boards for partner and children
• Document expiry warnings and local reminders
• Optional calendar mirror
• Daily backups with change log, optional iCloud

Plan content is reviewed reference material, not official or legal advice.
```

Feedback Email: `you@example.com`

## Contact Information

| Field | Value |
|---|---|
| First Name | TODO |
| Last Name | TODO |
| Phone number | TODO — yours, with country code (`+1 …`) |
| Email | `you@example.com` |

## Sign-In Information

Sign-in required: **off** (no account in the app). Leave User Name / Password blank.

Review Notes: paste the App Review Notes block from [listing.md](listing.md) if present.

## Per build: What to Test

```
Enter a birth date, pick a plan (e.g. "Skilled migration · CA") about a year ahead and attach it; mark an early step done and check later steps reflow. Add a note on a past date. Add a document with an expiry and confirm the warning. Turn on Demo data from Settings and off again. Report anything confusing or any wrong date with a screenshot via TestFlight.
```
