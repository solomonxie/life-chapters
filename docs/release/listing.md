# Publishing Life Chapters — step by step

Every field below is ready to paste. `TODO` = only you can supply it.
App Store Connect paths start at **Apps → Life Chapters → Distribution →**.

| | |
|---|---|
| Bundle ID | `com.example.lifechapters` |
| SKU | `lifechapters-ios` |
| Version | `1.0` (`MARKETING_VERSION`) |
| Build | timestamp, set by `make release` |
| Devices | iPhone only (`TARGETED_DEVICE_FAMILY = 1`) — no iPad screenshots needed |
| Min iOS | 15.1 |
| Privacy Policy URL | `https://github.com/solomonxie/life-chapters/blob/master/docs/release/privacy-policy.md` |
| Support URL | `https://github.com/solomonxie/life-chapters/issues` |

---

## 1. Apple Developer account

- [ ] developer.apple.com → Account → membership **active** (paid, Individual is fine).
- [ ] App Store Connect → **Business** (Agreements, Tax, and Banking) → no pending agreement banner. Free app: no Paid Apps agreement or banking needed.

## 2. Xcode

- [ ] Xcode → Settings → **Accounts** → signed in with the developer Apple ID; the team shows under it.
- [ ] `cp ios/Local.xcconfig.example ios/Local.xcconfig`, set your Team ID (developer.apple.com → Membership). Gitignored — never commit it; the repo is public.
- [ ] `npm run pods` succeeds. CocoaPods will warn that the target's base configuration is not its own — that is `ios/Debug.xcconfig` / `ios/Release.xcconfig`, which `#include` the Pods one and then `Signing.xcconfig` → `Local.xcconfig`. Leave it.

## 3. Bundle ID

Created by automatic signing on the first device build. Verify at
developer.apple.com → Certificates, Identifiers & Profiles → Identifiers →
`com.example.lifechapters`. No capabilities to tick: local notifications,
the calendar and the document picker need none.

## 4. Run on the iPhone

- [ ] `make ios` → Release build on the paired iPhone. Smoke test:
  - first run: born date → one more date → pick a track
  - Radar: swipe a step left → **Done**; the toast says what moved; **Undo** puts it back
  - Step: long-press **Mark done** → pick a past date
  - Journal: write a story, check it lands under the right chapter
  - Docs: add a scan from Photos; **kept in** opens Files at the app's folder
  - Settings → Backup → **Export…** → save to Files → **Import…** the same file
  - allow notifications; Settings → Reminders shows `n/64` queued

## 5. Create the app in App Store Connect

**Apps → + → New App**

| Field | Value |
|---|---|
| Platforms | iOS |
| Name | `Life Chapters: Story & Plan` |
| Primary Language | English (U.S.) |
| Bundle ID | `com.example.lifechapters` (dropdown) |
| SKU | `lifechapters-ios` |
| User Access | Full Access |

If the name is taken, the runner-up list is in [App Store Connect pages](#app-store-connect-pages).

## 6. Listing content

Fill the pages in [App Store Connect pages](#app-store-connect-pages) below. Screenshots: see [Screenshots](#screenshots).

## 7. Archive and upload

```
make release
```

Runs `npm run check`, then archives Release, signs for the App Store and uploads —
no Xcode Organizer. `make release BUILD=202609261830` pins the build number; left off
it is a timestamp. (`npm run release:ios` is the same script without the checks.)

Upload authenticates as the Apple ID signed into Xcode → Settings → Accounts. If it asks
for credentials in a terminal, add an App Store Connect API key instead: download the
`.p8`, then append `-authenticationKeyPath <abs path> -authenticationKeyID <id>
-authenticationKeyIssuerID <issuer>` to the `-exportArchive` call in `scripts/release-ios.sh`.
Processing in App Store Connect: 15–60 min, then an email "build has completed processing".

Fallback, Xcode GUI: open `ios/LifeChapters.xcworkspace` → destination **Any iOS Device (arm64)** → Product → **Archive** → Organizer → **Distribute App** → App Store Connect → Upload.

## 8. TestFlight

- [ ] App Store Connect → **TestFlight** → the build shows no "Missing Compliance" (see [Export compliance](#export-compliance)).
- [ ] Internal Testing → **+** group `Me` → add your Apple ID → install via the TestFlight app on the iPhone.
- [ ] Same smoke test as step 4, on the TestFlight build (this is the exact binary Apple reviews). Check reminders specifically: set lead time to **same day** on a step starting tomorrow and confirm the notification opens that step.

## 9. Submit

- [ ] `iOS App → 1.0 Prepare for Submission` → **Build** → **+** → pick the build.
- [ ] Every page in [App Store Connect pages](#app-store-connect-pages) filled; App Privacy published.
- [ ] **Add for Review** → **Submit for Review**.

## 10. App Review

- Typical: 24–48 h. Status: Waiting for Review → In Review → Pending Developer Release.
- Rejection → **Resolution Center**: reply there, or fix and re-run `make release` (the build number is a fresh timestamp), attach the new build, resubmit. `MARKETING_VERSION` does not need bumping for a rejected version.
- Likely question: is the immigration content advice? Answered in the review notes — it isn't, and the app says so on every playbook screen (guideline 5.1.1 / 1.4 territory; the not-advice line and review date are the mitigation).

## 11. Release

- [ ] Status **Pending Developer Release** → `1.0` page → **Release This Version**. Live in the store within ~24 h.
- [ ] `git tag v1.0 && git push --tags`.

---

## Screenshots

Apple requires one set: **iPhone 6.9" Display**, exactly `1320 × 2868` (or `1290 × 2796`).
App Store Connect scales it down for every smaller phone. The 6.5" slot (`1284 × 2778`) is
optional and generated anyway.

The paired iPhone 14 (`1170 × 2532`) captures them directly — the aspect ratios differ by
0.4%, which is invisible:

```
make device-shots SHOTS=/tmp/lifechapters-shots     # sample plan in a throwaway qa.db
make screenshots  SHOTS=/tmp/lifechapters-shots     # → docs/release/screenshots/{6.9,6.5}
```

`device-shots` relaunches the app once per shot with the `LC_QA` hook — a sample life
(Xi'an → Australia, a visa track, a child starting school, four stories) in `qa.db`. Your
real plan is never opened. Keep the phone unlocked and untouched while it runs; check the
status bar (battery, no banners) and re-run any shot that caught a notification.

Upload order (3 minimum, 10 maximum — the first two are what people actually see):

1. **Timeline** — the life line, chapters, TODAY, what's ahead
2. **Radar** — ACT NOW with a late step, the next 90 days
3. **Step** — start-by / due-by / valid, documents, prep, how-to
4. **Journal** — stories filed under chapters
5. **Chapter** — a chapter's stories and its active steps
6. **Playbook** — projected first and last dates, sources, not-advice line
7. **Docs** — held, expiring, missing
8. **Timeline, dark** — the same line at night

App Preview video: skip for 1.0.

---

## App Store Connect pages

### `iOS App → 1.0 Prepare for Submission`

| Field | Value |
|---|---|
| Previews and Screenshots | [Screenshots](#screenshots) |
| Promotional Text | below |
| Description | below |
| Keywords | below |
| Support URL | `https://github.com/solomonxie/life-chapters/issues` |
| Marketing URL | leave blank |
| Version | `1.0` |
| Copyright | `2026 solomonxie` |
| Routing App Coverage File | leave blank |
| Build | the uploaded build (step 9) |
| App Review → Sign-In Required | Off |
| App Review → Contact First / Last Name | TODO |
| App Review → Phone | TODO (with country code, e.g. `+61 …`) |
| App Review → Email | TODO |
| App Review → Notes | below |
| App Review → Attachment | none |
| Version Release | **Manually release this version** |

Promotional Text (149/170):

```
Your past and your plans on one timeline. Write the stories behind you, and let the paperwork ahead schedule itself backward from the date it serves.
```

Description:

```
Life Chapters puts your whole life on one line. The dates that matter — born, graduated, migrated, a child's first day of school — cut it into chapters. Behind today, chapters hold your stories. Ahead of today, they hold the steps to get where you're going.

No account. No subscription. Nothing leaves your iPhone unless you export it.

YOUR STORY, IN CHAPTERS
• A timeline you can walk: every date you enter, the chapter you're in now, and what's coming
• A journal filed by chapter — write what happened and it lands in the right chapter by itself
• Dates as precise as your memory: "2013" or "summer 2003" is enough; nothing pretends to know the day
• Search every story you've written

A PLAN THAT RESCHEDULES ITSELF
• Pick a track — skilled migration, citizenship, starting school — and it becomes dated steps
• Steps are scheduled backward from the event they serve, so a slow step shows up years early
• Mark one done and everything after it moves, with a note saying what moved and from which date
• Results that expire — a police check, an English test — are timed so they're still valid when needed

RADAR
• What to start now, in the next 90 days, this year, later — grouped by when you must start, not when it's due
• Swipe to mark done, snooze, or set aside a step that isn't for you

DOCUMENTS
• Every document a step asks for, sorted by what expires first
• A warning when something expires before the step that needs it — and a one-tap redo
• Scans kept in the app's own folder in Files

REMINDERS, ON YOUR TERMS
• A local reminder before each start-by date, plus a weekly digest
• Optional: mirror start-by dates into a calendar of their own

NOT ADVICE
Tracks describe paperwork. They are not legal, immigration, tax or financial advice; each one shows when it was last reviewed and links its sources. Duplicate one, export it, edit it — it's your plan.

Backup is one file you export yourself. Free, with no ads and no analytics.
```

Keywords (98/100 — "life", "story", "plan" are in the name and subtitle already):

```
timeline,journal,memoir,diary,chapters,visa,migration,paperwork,deadline,reminder,documents,expiry
```

App Review Notes:

```
No account or login is needed. On first launch the app asks for a birth date, optionally one more past date, and offers a track; "Later" skips the track.

To see the planning side quickly: on the "Pick a track" screen choose "Skilled migration · AU", pick a date about a year ahead, and Attach. The Radar tab then shows dated steps; swipe one left to mark it done and a message states which later steps moved.

The bundled tracks (Australian skilled migration, Australian citizenship, starting primary school in NSW) describe common paperwork steps. They are not legal or immigration advice: every track and step screen shows "Reviewed <month> · not official advice", and each track lists the official pages it was checked against, which open in Safari.

Optional permissions, all user-initiated: notifications (reminders), calendar (off by default; Settings → Calendar export), camera / photo picker (adding a scan to a document).

The app makes no network requests. Everything is stored in a local SQLite database and local files. We operate no server and receive no user data.
```

What's New: not shown for a first version. From 1.1 on, write it here.

### `General → App Information`

| Field | Value |
|---|---|
| Name | `Life Chapters: Story & Plan` (27/30) |
| Subtitle | `Your story, and the plan ahead` (30/30) |
| Category — Primary | Lifestyle |
| Category — Secondary | Productivity |
| Content Rights | **No**, it does not contain, show, or access third-party content — bundled tracks are written for the app; source links open in Safari |
| Age Rating | **Edit** → answers below → result **4+** |
| License Agreement | Apple standard EULA (default) |
| Privacy Policy URL | `https://github.com/solomonxie/life-chapters/blob/master/docs/release/privacy-policy.md` |

If `Life Chapters: Story & Plan` is taken, in order of preference:
`Life Chapters Journal & Plan` (28), `Life Chapters — Life Timeline` (29), `Life Chapters`.
The name is what gets indexed; the subtitle can absorb whatever the name loses.

Age rating questionnaire — every answer:

| Section | Answer |
|---|---|
| Parental controls / age assurance | No |
| Unrestricted web access | **No** — there is no in-app browser; source links hand off to Safari |
| User-generated content | No — stories are the user's own, private to the device, not shared or published anywhere |
| Messaging and chat | No |
| Advertising | No |
| Violence, sexual content, profanity, horror, mature themes | None |
| Alcohol, tobacco, drugs | None |
| Medical or treatment information / health & wellness | None — the school track mentions an immunisation history statement as a document to collect; it gives no medical information |
| Gambling, simulated gambling, contests, loot boxes | None / No |
| Made for Kids | No |

Regional (Korea, China Mainland, Vietnam) — leave unset.
**Digital Services Act** trader status: **Not a trader** (free, no monetization) — if App Store Connect blocks EU availability without it, answer it in Business → Compliance.

### `App Store → Trust & Safety → App Privacy`

| Field | Value |
|---|---|
| Privacy Policy URL | same as above |
| Do you or your third-party partners collect data from this app? | **No, we do not collect data from this app** |

Then **Publish**. The label shows "Data Not Collected".

True only while there is no analytics or crash SDK and no network call — re-check before each submission:

```
grep -rniE "analytics|firebase|sentry|amplitude|mixpanel|posthog|bugsnag" package.json ios/Podfile.lock
grep -rnE "fetch\(|XMLHttpRequest|WebSocket" src
```

Data leaves the device only as files the user hands to the share sheet, and — if they
turn it on — as events in their own calendar. Neither reaches us, so neither is
"collected" in Apple's sense.

### `App Store → Trust & Safety → App Accessibility`

Skip for 1.0 rather than over-claim.

### `App Store → Monetization → Pricing and Availability`

| Field | Value |
|---|---|
| Base Country or Region | Australia (AUD) — or your own |
| Price | **Free** |
| Availability | All countries or regions |
| Tax Category | App Store software (default) |
| iPhone and iPad Apps on Apple Silicon Macs | **Off** for 1.0 (pickers and the Files hand-off are untested on Mac) |
| Apple Vision Pro | Off |

### Not needed for 1.0

In-App Purchases, Subscriptions, In-App Events, Custom Product Pages, Product Page Optimization, Promo Codes, Game Center, Featuring Nominations, Ratings and Reviews, History.

---

## Export compliance

No page for it in App Store Connect — nothing to fill in. `ITSAppUsesNonExemptEncryption = false`
in `Info.plist` answers it at upload (the app uses no encryption of its own).
Verify: TestFlight → the build is **not** marked "Missing Compliance".
Only if it is: **Manage** → **None of the algorithms mentioned above**.
