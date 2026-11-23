# MedSpa Funnel — Improved v2

Repo cloned from: mfahadjbr/medspa-b2b-funnel-booking-adsthatconverts
App code is in `project/` (Next.js 15 / React 19, same as original). Run: `npm ci && npm run build && npm start`

## Design system — kept, not replaced
Navy #02103a · Blue #2786f8 · Action #1266d3 · Ink #35435e · Muted #54627a · Line #dce4ed · Pale #f3f7fc · Geist font · same logo, images, booking calendar (LeadConnector) and territory API.

## Skills installed & used (in .agents/skills/ and ~/workspace/custom-skills/)
- designing-beautiful-websites — tristanmanchester/agent-skills (requested, via `npx skills add`)
- animate — emilkowalski/skills@animate (canonical animate skill, 245k installs)
  NOTE: `npx skillfish add ibragimov-oasis/vibe-coder animate` was run twice. That repo is a mega-bundle with no skill named "animate" in its tree (verified via GitHub API), so skillfish only lists the bundle. The animate skill above is what was applied.
- storybrand-messaging — wondelai/skills (StoryBrand SB7)
- sales-funnel-blueprint — autonnel/autonnel-skills
- cro — coreyhaines31/marketingskills (successor to page-cro)
- landing-page-conversion-audit — autonnel/autonnel-skills

## StoryBrand restructure (SB7)
1. Character: MedSpa owner with empty weekday chairs (hero is the customer, not the agency)
2. One desire: booked consultations that show up — hero sub-copy cut from 70 words to 2 clear sentences
3. Problem: external (slow follow-up / no-shows), internal (frustration), in one dark section
4. Guide: NEW section — empathy first ("You should not have to chase leads at 9 PM"), then authority stats (7+ yrs, $5M+, 100+, 150+) which were moved out of the crammed hero trust bar
5. Plan: NEW 3-step plan (Check territory → Free growth plan call → We install it)
6. Calls to action: ONE direct CTA everywhere — "Check My Territory" (was 3 different long labels). Transitional CTA: "See how it works"
7. Failure / Success: NEW stakes section, side-by-side cards
Plus: call agenda kept, FAQ expanded 4 → 6 (team effort, territory taken)

## Design / UX fixes
- H1: removed the blue stat pill embedded inside the headline (broke reading flow + screen readers)
- Hero video: single 16/9 ratio (was 16/10 desktop vs 16/9 mobile), caption restored
- Play button: removed stacked double ripple (wave-rings + ::before/::after both animating) → one calm state
- Dead animation code fixed: Engine added .is-visible/.is-enhanced classes that no CSS used. New Reveal component actually implements it — transform+opacity, ease-out 420ms, content visible without JS, prefers-reduced-motion respected
- Sticky mobile CTA added (was none) — primary action always in thumb reach, safe-area aware
- Intake: Step 1 is ZIP only (city removed — ZIP alone decides the 8-mile territory; API validation updated to match), "About 60 seconds" expectation set, summary of earlier answers shown on the final step
- Agenda cards now show the minute ranges (1-10 / 11-20 / 21-30) that were in the data but never rendered
- New sections use only 2 breakpoints (900px / 640px) instead of adding to the original 9 overlapping ones

## Verified
- `npm ci` clean, `npm run build` passes (all routes, type-check included), `npm run lint` clean
- Served production build: / and /territory both 200, new sections present in HTML, old hero pill gone

## Not changed (deliberately)
- No new claims/stats invented — every number on the page existed in the original copy
- Booking calendar URL, territory API logic, intake fields (except optional city), images and logo untouched
- Visual check (headless Chromium, local): desktop 1280px and mobile 390px screenshots taken — no horizontal overflow at either width (scrollWidth = viewport width), H1 renders as clean plain text, sticky mobile CTA visible, Plan/Guide sections render correctly. Previews: preview-desktop.png, preview-mobile.png, preview-plan.png

## v3 — Anti-slop pass (anti-slop-design skill, wwewtech)
Installed via `npx skills add https://github.com/wwewtech/anti-slop-design`. landing.css rewritten from ~1,830 lines to ~200.
Removed (banned AI tropes found in v2/original):
- All gradients and glow shadows (audit radial-gradient blobs, video-cover glow, glassmorphism agenda cards)
- All pill badges (hero pill, strategy pill, compare pills, contract note pill, stage tags)
- Screaming uppercase tracked-out eyebrows on every section → sentence-case labels, used sparingly
- Button shine-sweep animation and hover-lift/glow on every card
- Ghost "01–04" numbers and decorative rings on problem cards; icon-in-a-box on every card
- The SVG wave journey with glow filter → plain numbered rows (01–04) with hairline dividers
- Card-grid-everything → editorial rows: Plan and Engine are now numbered lists, Agenda is a timetable (Minutes | Item | Detail), Guide stats are a plain divided list with tabular numbers
- Centered-everything → left-aligned section heads (title left, context right)
- Type scale disciplined: H1 48px max, H2 32px, H3 19px (was H2 up to 60px)
- Radius: cards 22px → 8px, buttons 7px; shadows → 1px hairline borders
- Buttons: 140ms ease-out, :active scale(.98), focus-visible ring kept
Verified again: build + lint clean, screenshots at 1280/390px, no overflow, header CTA label bug found in screenshots (both desktop/mobile labels showing) and fixed.
