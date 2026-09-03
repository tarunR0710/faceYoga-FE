# MapMyFace — homepage handoff

Rebuilt from the approved Website Visual Blueprint. **23 sections → 12.** Desktop
height 20,252px → 11,827px; mobile 31,806px → 16,055px. Roughly half the
blueprint's content now sits behind a tab, accordion, stepper or modal rather
than printed on the page surface.

## Section order, and the question each one answers

| # | Section | File | Mechanic | Answers |
|---|---------|------|----------|---------|
| 1 | Hero | `hero.tsx` | — | What is this, what does it cost |
| 2 | Too much advice | `problem.tsx` | — | Do I recognise myself |
| 3 | Small, correct decisions | `proof.tsx` | sliders | Does it visibly work |
| 4 | Why believe us yet | `believe.tsx` | tabs ×4 | Who are you |
| 5 | How it works | `journey.tsx` | stepper + modal | How does it happen |
| 6 | The Face Map | `face-map.tsx` | modal | What do I receive |
| 7 | Appearance Protocol | `protocol.tsx` | — | In what order |
| 8 | Built for your context | `context-fit.tsx` | matrix + toggle | Will it apply to ME |
| 9 | Pricing | `pricing-preview.tsx` | modal | The money |
| 10 | Your face stays yours | `privacy-trust.tsx` | none, deliberately | Can I trust you |
| 11 | Questions | `faq.tsx` | rail + accordion | Anything unresolved |
| 12 | Is it vain to care | `cta.tsx` | — | Permission to want this |

## BLOCKING — needs the founder before launch

1. **Sample Face Map is a placeholder.** `FACE_MAP_REPORT.spreads` in
   `src/lib/content.ts` contains illustrative structure with invented findings.
   Every surface renders `sampleNotice` alongside it, twice. **Replace with an
   anonymised real report** (cover + one analysis spread + one populated
   Appearance Protocol + clarification page) once one exists with client consent
   and expert sign-off. Do NOT remove the notice while the content is invented —
   a fabricated report presented as real is the same class of object as a
   fabricated testimonial.
2. **Nobody is named.** The panel is four role plates (MS / FA / FY / HS). Every
   reviewer flagged that four anonymous initials asking for ₹2,699 plus
   photographs of someone's face reads as "the team isn't hired yet". Fix is one
   real, checkable human — ideally the founder, with a real photograph, a short
   first-person note and a linkable Instagram or LinkedIn. Content lives at
   `BELIEVE.people.roles`. The self-undermining "published after verification"
   line has been removed.
3. **Retention period and grievance officer.** `PRIVACY_PATH.pending` currently
   says these are published with the full data policy. India's Consumer
   Protection (E-Commerce) Rules require a named grievance contact — supply the
   legal entity name, address, grievance officer and an Indian phone number with
   stated hours.
4. **`SITE_CONFIG.email`** is `support@mapmyface.in` — confirm it exists.
   `SITE_CONFIG.phone` is still a placeholder (`+91 9876543210`).
5. **Hero video subject is a white woman.** The blueprint's imagery rule asks for
   real Indian men and women. The three before/after pairs are Indian; the video
   is not. Needs replacing, or re-cropping to non-identifying detail.
6. **Before/after provenance.** Confirm written consent and no retouching for
   `public/transformations/*`. Labelled `BEFORE`/`AFTER` on the basis that these
   are real clients — if they are renders, the label must change to `PROJECTION`.

## Decisions taken this pass

- **Theme: dusty sage-teal accent, not achromatic** (founder decision,
  2026-08-24 — reverses the earlier "cold clinical" call below). Surface stays
  mostly white/near-black, but `brand` now carries a real hue (`#ADC7CE`
  family) instead of resolving to the same near-black as `ink` — the old
  all-achromatic pass made every accent call-site (checkmarks, active tabs,
  quote rules, selected states) invisible by construction, which read as
  lifeless rather than clinical. Tokens live in `globals.css` `:root`
  (`--c-brand`, `--c-brand-ink`, `--c-brand-soft`); the Problem section
  (`problem.tsx`) also uses `#ADC7CE` directly as a solid section background,
  plus a few local `--po-*` tokens for its illustration/cards that are scoped
  to that file only.
  - Previously this rule was "cold clinical / achromatic — do not reintroduce
    a hue." That replaced an earlier warm palette (cream `#fdfcf9`, amber
    `#C8862B`, warm ink `#211d18`, teal/sand gradient bands) that read
    boutique-spa. Kept here as history, not as the current rule.
  - Red (form validation) and green (success confirmation) are kept in
    `lead-form.tsx`, `otp-input.tsx`, `form/page.tsx` and `success/page.tsx`.
    Those are semantic state colours, not theme, and monochrome error states are
    worse UX. Change them only if you want the funnel fully achromatic too.
- **Hero fold** uses the button pair and animated trust band carried over from
  the `mapmyface-blueprint-homepage` branch: equal-width (`flex-1`) buttons with
  a frosted-glass secondary, and a neutral shelf band that is static 4-up from
  `lg` and a seamless marquee below it (pauses on hover). The hero trust line
  ("Human-led. Research-informed…" + the refund promise) was cut — the refund
  promise still appears where it converts, next to the price.
- **`FACE_MAP_REPORT.meta`** ("Written in plain, respectful language" /
  "Reviewed before it reaches you") deleted — filler that claimed nothing.
- **Generic-advice vs MapMyFace** uses the paired-card layout from the same
  branch instead of a tab toggle. A toggle shows one side at a time, so the
  reader has to hold the other in memory; two cards make the contrast in one
  glance. Minus glyphs left, checks right — a minus reads as scope, a cross
  reads as failure.

- **Refund: session-contingent** (founder decision). Full refund before the
  session, non-refundable after because report work has begun, report portion
  refunded if we fail to deliver to scope. Single source of truth:
  `REFUND_POLICY` in `src/lib/constants.ts`. Previously the site stated three
  contradictory policies at once (`/refund` 14-day, `/payment` 7-day, plus a
  "50% of the content" exclusion written for a video course).
- **Delivery: 3–5 working days** (founder decision), replacing the unbounded
  "approximately 2 or more days".
- Session length is not published. A `38:24` call timer was removed — nothing in
  the offer commits to a duration, and a number on a marketing page becomes a
  promise. Publish one once the business commits.

## Removed, and why

- **24 research citations** — lifted wholesale and did not survive checking (the
  sentencing claim was credited to "Cornell Law Review, 2019"; the real work is
  Gunnell & Ceci 2010 in *Behavioral Sciences & the Law*). Replaced with three
  verified end to end: Hamermesh & Biddle 1994 (*AER* 84:1174–1194), Langlois et
  al. 2000 (*Psych Bulletin* 126:390–423), Gunnell & Ceci 2010.
- **`stats-grid.tsx`** and 5 other orphaned files — contained `89% noticed
  visible changes in 8 weeks — Internal Study` and `73% … Northwestern
  University`, both fabricated.
- **Hub-and-spoke circle diagram** — carried no information the sentence above it
  didn't.
- **Duplicate add-ons section** — Hair Map and Style & Colour Map were sold in
  two consecutive sections. Sold once now, deliverables behind a modal.
- **First / Next / Later** appeared four times; stated once, in section 7.
- **30 face-yoga exercises** — not blueprint content, largest section by word
  count, and it published prescriptive instructions. Face yoga is chapter 09 of
  the Face Map (`FACE_MAP_REPORT.buckets`).
- **Six pillars grid** — the same six territories were re-cut across four
  sections. Absorbed into the context matrix and report chapters.
- **`GST-inclusive final price shown at checkout`** — grammatically promises the
  real number arrives later, which is the shape of drip pricing.

## Bugs found and fixed (worth knowing about)

- `validations.ts` rejected `R. Sharma`, `D'Souza` and `Kaur-Singh` at the first
  field of the funnel (`/^[a-zA-Z\s]+$/`). Now accepts initials, apostrophes,
  hyphens and non-Latin scripts.
- `NAV_LINKS` pointed at `/#add-ons`, which no longer exists — dead nav item.
- **framer-motion writes `transform`**, silently overwriting Tailwind's
  `-translate-x-1/2 -translate-y-1/2` centring. It put the modal off-screen while
  reporting itself visible. Never combine motion transforms with translate-based
  centring — use flex.
- **`VIEWPORT` uses `margin: '-80px'`**, which *insets* the detection box, so any
  element resting within 80px of the viewport top never reveals and stays at
  `opacity: 0` forever. Use `VIEWPORT_TIGHT` for elements inside a figure.
- **`animate` + `whileInView` on one element conflict** — `whileInView` wins while
  in view, which silently killed the advice-slip settle.
- **`-z-10` on an active tab pill** pushes it behind the *section* background, not
  behind its label — the active tab rendered white-on-cream.

## Not done

- The **`/form` OTP gate**: name + email + 10-digit phone + a 6-digit SMS
  round-trip before the total is ever shown. Every reviewer called this the
  single largest drop-off in the funnel, and a priced CTA landing on an identity
  wall breaks the fixed-scope promise at the first tap. **Recommend: show the
  priced order summary first, gate identity after.** Same sprint, not IA.
- **No pixel event plan.** The sample-report modal open is the best mid-funnel
  signal this business will have; it should fire `ViewContent`, the add-on toggle
  `AddToCart`, the CTA `InitiateCheckout`. Without these the ad account optimises
  to landing-page views.
- **No second touch.** One conversion path, no save-for-later and no WhatsApp
  capture, so qualified traffic that isn't ready leaves untrackable.
- The blueprint's **12 inner pages** are not built. Homepage only.
- **Static images still ship from `public/`.** The hero video already moved to
  Cloudflare R2 (see commit history); the rest of `public/` — transformations,
  problem-section photos, full-picture images, logo mark — has not. Move these
  to R2 in the next phase, same as the video, for the CDN/caching benefit.
