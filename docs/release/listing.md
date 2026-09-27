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
`com.example.lifechapters`:

- [ ] **iCloud** checked (iCloud Documents), container `iCloud.com.example.lifechapters`
  assigned. Automatic signing created both on the first device build; this is a check,
  not a step. Nothing else to tick — notifications, calendar and pickers need no
  capability.

## 4. Run on the iPhone

- [ ] `make ios` → Release build on the paired iPhone. Smoke test:
  - first run: born date → one more date → pick a plan
  - Plans (below the timeline): swipe a step left → **Done**; the toast says what moved; **Undo** puts it back
  - Step: long-press **Mark done** → pick a past date
  - a date → Notes: write some; the chapter shows them and the stem gets a ✎
  - title **Life Chapters ▾** → **Link a person to me** → Child, a name, a date; her board opens with "Born"; move the date on either board and both move
  - a step's document → add a scan from Photos; **kept in** opens Files at the app's folder
  - make any change → Settings (bottom of the page) → Backup → **On this iPhone** lists a snapshot; tap it → Restore
  - turn **iCloud Drive** on → Files → iCloud Drive → **Life Chapters** holds today's file
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
- [ ] Same smoke test as step 4, on the TestFlight build (this is the exact binary Apple reviews). iCloud is the production environment now: turn it on, confirm the Life Chapters folder appears in iCloud Drive, delete and reinstall, restore today's file from Settings › Backup › On this iPhone › iCloud Drive. Check reminders specifically: set lead time to **same day** on a step starting tomorrow and confirm the notification opens that step.

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
(Xi'an → Canada, Express Entry and citizenship plans, a wedding with Sam, Ava's birth with
her early-years and school plans, notes on two dates) in `qa.db`. Your real plan is never
opened. Keep the phone unlocked and untouched while it runs; check the
status bar (battery, no banners) and re-run any shot that caught a notification.

**Stale:** what sits in `docs/release/screenshots/` now was captured before the one-page
redesign — `02-radar` and `04-journal` show removed tabs, and the rest show Australian
content. Re-run `make device-shots` + `make screenshots` before uploading, and drop the
old `02-radar.jpg` / `04-journal.jpg`.

Upload order (3 minimum, 10 maximum — the first two are what people actually see):

1. **Timeline** (`01-timeline`) — the life line, chapters, TODAY, what's ahead
2. **Plans** (`02-plans`) — expiring documents, your plans, ⚠ Act now with a late step
3. **Step** (`03-step`) — start-by / due-by / valid, documents, prep, how-to
4. **Chapter** (`05-chapter`) — a chapter's active steps and its notes
5. **Playbook** (`06-playbook`) — who it's for, projected first and last dates, sources, not-advice line
6. **Timeline, dark** (`08-timeline-dark`) — the same line at night

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
| App Review → Phone | TODO (with country code, e.g. `+1 …`) |
| App Review → Email | TODO |
| App Review → Notes | below |
| App Review → Attachment | none |
| Version Release | **Manually release this version** |

Promotional Text (155/170):

```
Your past and your plans on one timeline. Keep notes on the dates behind you, and let the paperwork ahead schedule itself backward from the date it serves.
```

Description:

```
Life Chapters puts your whole life on one line. The dates that matter — born, married, migrated, a child's birth — cut it into chapters. Behind today, dates hold your notes. Ahead of today, chapters hold the steps to get where you're going.

No account. No subscription. Nothing leaves your iPhone unless you choose to: export a file, or turn on the iCloud Drive backup or the calendar mirror.

YOUR LIFE, IN CHAPTERS
• A timeline you can walk: every date you enter, the chapter you're in now, and what's coming
• Notes on any date — what happened, who was there, what it meant
• Dates as precise as your memory: "2013" is enough; nothing pretends to know the day

YOUR FAMILY
• A timeline each for you, your partner, your children — switch with one tap
• A wedding or a birth sits on both timelines; move the date on one and both move
• A child's plans count from the child's own birthday

A PLAN THAT RESCHEDULES ITSELF
• Pick a plan — Express Entry, citizenship, getting married, a new baby, school, retirement — and it becomes dated steps
• Each plan says who it's for: an age range and "applies if" lines
• Steps are scheduled backward from the event they serve, so a slow step shows up years early
• Mark one done and everything after it moves, with a note saying what moved and from which date
• Results that expire — a police certificate, a language test — are timed so they're still valid when needed

WHAT TO START NOW
• Right under your timeline: what to start now, in the next 90 days, this year, later — grouped by when you must start, not when it's due
• Swipe to mark done, snooze, or set aside a step that isn't for you

DOCUMENTS
• Documents about to expire, at the top of your plans
• A warning when something expires before the step that needs it — and a one-tap redo
• Scans kept in the app's own folder in Files

REMINDERS, ON YOUR TERMS
• A local reminder before each start-by date, for everyone in the family, plus a weekly digest
• Optional: mirror start-by dates into a calendar of their own

NOT ADVICE
Plans describe paperwork, for Canada (Ontario where rules are provincial); more countries are coming. They are not legal, immigration, tax, medical or financial advice; each one shows when it was last reviewed and links its sources. Duplicate one, export it, edit it — it's your plan.

Backed up on your iPhone after every change, and optionally to your own iCloud Drive. Free, with no ads and no analytics.
```

Keywords (96/100 — "life", "story", "plan" are in the name and subtitle already):

```
timeline,family,memoir,notes,chapters,visa,immigration,canada,paperwork,deadline,reminder,expiry
```

App Review Notes:

```
No account or login is needed. On first launch the app asks for a birth date, optionally one more past date, and offers a plan; "Later" skips it.

The app is one scrolling page: the timeline, then Plans, then Settings at the bottom. To see the planning side quickly: on the "Pick a plan" screen choose "Skilled migration · CA", pick a date about a year ahead, and Attach. Plans, below the timeline, then shows dated steps; swipe one left to mark it done and a message states which later steps moved.

Tapping the "Life Chapters" title switches between people (for example a partner or a child); each has their own timeline, stored on the device like everything else.

The bundled plans (Canadian permanent residence through Express Entry, citizenship, retirement, and Ontario plans for marriage, a new baby, early years and school) describe common paperwork steps. They are not legal, immigration or medical advice: every plan and step screen shows "Reviewed <month> · not official advice", and each plan lists the official pages it was checked against, which open in Safari.

Optional permissions, all user-initiated: notifications (reminders), calendar (off by default; Settings → Calendar export), camera / photo picker (adding a scan to a document). iCloud Drive backup is off by default (Settings → Backup) and writes to the user's own iCloud Drive.

The app makes no network requests of its own. Everything is stored in a local SQLite database and local files. We operate no server and receive no user data.
```

What's New: not shown for a first version. From 1.1 on, write it here.

### `General → App Information`

| Field | Value |
|---|---|
| Name | `Life Chapters: Story & Plan` (27/30) |
| Subtitle | `Your story, and the plan ahead` (30/30) |
| Category — Primary | Lifestyle |
| Category — Secondary | Productivity |
| Content Rights | **No**, it does not contain, show, or access third-party content — bundled plans are written for the app; source links open in Safari |
| Age Rating | **Edit** → answers below → result **4+** |
| License Agreement | Apple standard EULA (default) |
| Privacy Policy URL | `https://github.com/solomonxie/life-chapters/blob/master/docs/release/privacy-policy.md` |

If `Life Chapters: Story & Plan` is taken, in order of preference:
`Life Chapters: Notes & Plan` (27), `Life Chapters — Life Timeline` (29), `Life Chapters`.
The name is what gets indexed; the subtitle can absorb whatever the name loses.

Age rating questionnaire — every answer:

| Section | Answer |
|---|---|
| Parental controls / age assurance | No |
| Unrestricted web access | **No** — there is no in-app browser; source links hand off to Safari |
| User-generated content | No — notes are the user's own, private to the device, not shared or published anywhere |
| Messaging and chat | No |
| Advertising | No |
| Violence, sexual content, profanity, horror, mature themes | None |
| Alcohol, tobacco, drugs | None |
| Medical or treatment information / health & wellness | TODO, decide — the expecting-a-baby, newborn and early-years plans schedule prenatal visits, check-ups and routine vaccines as dated steps and link Ontario.ca pages; they give no treatment advice. "None" was right for the old content; re-read the current question before answering |
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
turn them on — as a daily file in their own iCloud Drive and events in their own
calendar. Neither reaches us, so neither is
"collected" in Apple's sense.

### `App Store → Trust & Safety → App Accessibility`

Skip for 1.0 rather than over-claim.

### `App Store → Monetization → Pricing and Availability`

| Field | Value |
|---|---|
| Base Country or Region | Canada (CAD) — or your own |
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
