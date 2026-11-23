# MedSpa B2B Funnel — Improved

Improved version of the Ads That Converts MedSpa booking funnel.
Original: mfahadjbr/medspa-b2b-funnel-booking-adsthatconverts

## What changed
- StoryBrand (SB7) structure: clinic owner as hero, Guide section, 3-step Plan, Failure/Success stakes, one CTA everywhere ("Check My Territory") plus a sticky mobile CTA
- Anti-slop professional design (v3): no gradients, glows, pill badges or glass cards; editorial numbered rows, hairline borders, disciplined type scale (H1 48 / H2 32), 8px radius. `src/app/landing.css` rewritten from ~1,830 lines to ~200
- Intake: Step 1 is ZIP only (about 60 seconds), summary shown before submit
- Same design system and behaviour underneath: navy #02103a, blue #2786f8, action #1266d3, Geist, same LeadConnector calendar and territory API

See CHANGES.md for the full audit and change list.

## Run locally
Node.js 22.13 or newer.

```sh
npm ci
npm run build
npm start
```

## Binary assets (not in this push)
The GitHub connector used for this push transfers text files only, so these binary assets are not in this repository yet. Copy them from the original repository (same paths) or from the delivered zip:
- `company-logo.png`
- `public/favicon-ads.ico.png`
- `public/media/attended-consultation.jpg`, `hero-walkthrough-thumb.jpg`, `lead-review.jpg`, `patient-reactivation-card.jpg`, `wordmark.webp`
- `public/fonts/geist-latin.woff2`
- `src/app/favicon.ico`

The site builds and runs without them, but images, logo, favicon and the Geist font will be missing until they are added.

## Territory requests
The intake endpoint records qualified submissions in the `territory_requests` table in `.medspa-intake/territory.sqlite` (private, git-ignored). Set `MEDSPA_INTAKE_DIR` to a persistent writable volume when deploying. The calendar handles availability and confirmation; reminder workflows are managed in the connected HighLevel account.
