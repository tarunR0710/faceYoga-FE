# MapMyFace Homepage — Blueprint Build Audit

Build record for implementing **MapMyFace_Website_Visual_Blueprint_FINAL (1).pdf** (32 pages) as the
homepage, against [`docs/apple-scroll-playbook.md`](./apple-scroll-playbook.md) and
[`docs/scroll-pacing-audit.md`](./scroll-pacing-audit.md).

**Status:** all 23 blueprint sections live in blueprint order · `tsc` clean · `next build` clean ·
0 runtime errors · no duplicate IDs · every nav/CTA anchor resolves.
**Not committed, not pushed.**

---

## 1. Sections added / rewritten

Order per [`src/app/page.tsx`](../src/app/page.tsx).

| # | Blueprint spread | File | Status |
|---|---|---|---|
| 01 | Hero — *Understand your face. Discover what suits you.* | `sections/hero.tsx` | rewritten — eyebrow, blueprint copy, trust line, CTAs → **Start My Plan / See How It Works**, desktop scroll-away exit |
| 01b | LIVE / TEAM / MAP / HELP strip | `sections/trust-bar.tsx` | rewritten — static 4-up from `lg`, marquee below |
| 02 | The Problem | **`sections/problem.tsx`** ✨ | new — replaces `old-vs-new` |
| 03 | What is MapMyFace? (6 pillars) | **`sections/what-is-mapmyface.tsx`** ✨ | new |
| 04 | The Outcome (7 questions + Protocol) | **`sections/outcome.tsx`** ✨ | new |
| 05 | The MapMyFace Method (5 steps) | `sections/how-it-works.tsx` | rewritten |
| 06 | Face Mapping Session | **`sections/face-mapping-session.tsx`** ✨ | new |
| 07 | What the Expert Understands (6 × 3) | **`sections/expert-understands.tsx`** ✨ | new — replaces `personalization-factors` |
| 08 | Expert Mapping Review | **`sections/expert-review.tsx`** ✨ | new |
| 09 | The Expert Panel (4 roles) | `sections/experts.tsx` | rewritten — hover-video treatment kept |
| 10 | Your Face Map | `sections/facial-analysis.tsx` | rewritten — kept as the single pinned moment |
| 11 | Inside Your Face Map (12 chapters) | **`sections/inside-face-map.tsx`** ✨ | new |
| 12 | Your Appearance Protocol (6 tiles) | **`sections/appearance-protocol.tsx`** ✨ | new |
| 13 | The Main Offer (₹2,699 + 13 inclusions) | **`sections/main-offer.tsx`** ✨ | new |
| 14–15 | Hair Map + Style & Colour Map | `sections/add-ons.tsx` | rewritten — both blueprint pages in one section |
| 16 | The Methodology (9 factors) | **`sections/methodology.tsx`** ✨ | new |
| 17 | Why MapMyFace Is Different (7 rows) | **`sections/why-different.tsx`** ✨ | new |
| 18 | Who It Is For (6 cases) | **`sections/who-its-for.tsx`** ✨ | new |
| 19 | Beta Client Experiences | **`sections/beta-experiences.tsx`** ✨ | new — replaces `testimonials` |
| 20 | Pricing (main + 2 add-ons + bundle) | `sections/pricing-preview.tsx` | rewritten |
| 21 | After Payment (8 steps) | **`sections/after-payment.tsx`** ✨ | new |
| 22 | Privacy & Trust (6 commitments) | **`sections/privacy-trust.tsx`** ✨ | new |
| 23 | FAQ (all 15) | `sections/faq.tsx` | rewritten |
| 24 | Final CTA | `sections/cta.tsx` | rewritten |
| — | Header nav (blueprint order) | `layout/header.tsx` | rewritten |
| — | Footer — Explore · Support · Legal · Connect | `layout/footer.tsx` | rewritten |

### Supporting files

| File | Purpose |
|---|---|
| **`ui/section-heading.tsx`** ✨ | One eyebrow + two-tone h2 + lede + margin-note for every section (one type scale, one reveal) |
| **`ui/card-rail.tsx`** ✨ | Swipe rail on mobile → grid from `md`; thin scroll-progress bar instead of dots |
| **`ui/detail-accordion.tsx`** ✨ | Radix accordion for grouped bullet lists (mobile density) |
| **`ui/count-up.tsx`** ✨ | Controlled number animation; SSR renders the **final** value (never `₹0`); `live` mode for the pricing total |
| **`layout/scroll-progress.tsx`** ✨ | 2px reading indicator at the top edge |
| `lib/constants.ts` | Rebuilt — offer, add-ons, bundle, nav, all 15 FAQs with groups |
| `lib/motion.ts` | Added playbook presets `REVEAL` / `REVEAL_CRISP` / `REVEAL_SLOW` / `STAGGER` / `SCRUB_SPRING` / `TAP_SPRING` and a capped `stagger()` helper |
| `lib/showcase.ts` | Added `MEDIA` block — every placeholder image path in one place, all local (see §2c) |
| `app/globals.css` | Reduced-motion rule for accordion animations (only change) |

### Content verified in the rendered DOM

12/12 chapters · 15/15 FAQs · 13/13 inclusions · 9/9 methodology factors · 7/7 comparison rows ·
8/8 after-payment steps · 6/6 in each of the three 6-card sections · 5 FAQ filter groups + All.

### Now dormant (kept in git, not rendered — none appear in the blueprint's section order)

`old-vs-new` · `personalization-factors` · `living-analysis` · `transformations` · `testimonials` ·
`community` · `comparison` · `muscle-map` · `features` · `science` · `what-youll-learn` ·
`progress-tracking` · `research-stats` · `stats-grid` · `gallery` · `social-proof`

---

## 2. Interactions & animation

No new dependencies — everything uses `framer-motion` and `@radix-ui/react-accordion`, both already
installed.

| Section | Interaction |
|---|---|
| Problem | Four noise cards drift in, then collapse into one Face Map panel; First/Next/Later ladder writes itself in. **Replay** button |
| What is MapMyFace | "Explore" expands to reveal which Face Map chapter covers that area |
| Outcome | Questions surface one at a time (blur → sharp); tap-through Appearance Protocol stepper with a progress rail |
| Method | Journey line draws once across the five stops (horizontal desktop / vertical mobile spine) |
| Face Mapping Session | Live session clock + three question bubbles arriving one by one over the call frame |
| Expert Understands | Accordion on mobile; 3 × 2 grid on desktop |
| Expert Mapping Review | Four connectors draw to the centre; hover/tap a specialist and the medallion switches to "Reviewing …" |
| Expert Panel | Poster at rest → clip fades in on hover (existing treatment preserved) |
| Your Face Map | The one pinned scrollytelling moment: self-drawing face map holds while three chapters cross-fade (**desktop only**) |
| Inside Your Face Map | Contents index ↔ live report-page preview; swipeable chapter deck on mobile |
| Appearance Protocol | Two-lens toggle (what changes / in what order) with a sliding pill |
| Main Offer | ₹2,699 counts up; 13 inclusions wipe in |
| Add-ons | Annotation callouts (Parting/Length/Volume, Colour/Neckline/Presentation) pop in one by one |
| Methodology | **Interactive radial factor map** — nine nodes, spokes draw on scroll, hover/tap to read each factor |
| Why Different | Side-switcher on mobile; full table wipes down row by row on desktop |
| Who It Is For | Tap the cases that sound like you → running verdict + CTA reveal |
| Pricing | **Live order summary** — animated total, bundle discount applied automatically |
| After Payment | Eight-segment journey meter fills in order; swipe deck on mobile |
| FAQ | Category filter chips + Radix accordion |
| Global | Top scroll-progress bar; swipe rails with their own progress indicator |

**Pacing discipline:** all reveals route through `EASE_OUT` / `EASE_OUT_SOFT`, 0.55–0.7s, 16–32px
travel, `VIEWPORT` (`-80px`), `once: true`. Sibling stagger capped at 0.06–0.14s via `stagger()`.
Both scrubs use `SCRUB_SPRING`. Every animated component respects `useReducedMotion`, and no looping
animation autoplays under reduced motion.

### Mobile length strategy

Swipe rails for the 6 / 4 / 12 / 3 / 8-card grids · accordion for the 6 × 3 expert block ·
segmented toggles for Appearance Protocol and the comparison table · 2-col compaction on Expert
Review, Methodology and add-on bullets · Face Map pin is desktop-only (phones get the calm stack) ·
shorter hero line on mobile · scroll-progress bar so the reader knows how far is left.

---

## 2b. Horizontal-overflow fix (post-build)

The page scrolled sideways on mobile — 199px wider than the viewport.

**Cause:** the FAQ layout was `grid gap-8 lg:grid-cols-[…]`, so below `lg` it had a *single implicit
`auto` track*. An `overflow-x-auto` child still contributes its full **max-content** width to an
`auto` grid track, so the filter-chip rail (557px of chips) sized the track, which sized the grid,
which widened the document. `overflow-x-auto` clips painting; it does not stop intrinsic sizing.

**Fixes**
- `faq.tsx` — explicit `grid-cols-1` (`minmax(0,1fr)`, capped at the container) + `min-w-0` on the
  questions column. This was the actual 199px.
- Same latent pattern pre-empted with a base `grid-cols-1` in `problem`, `face-mapping-session`,
  `outcome`, `main-offer`, `pricing-preview`, `methodology`, `add-ons`, `facial-analysis`,
  `expert-understands`, `appearance-protocol` and `ui/section-heading`.
- `trust-bar.tsx` — the static 4-up band switched from `md` to `lg`; at exactly 768px
  "Multidisciplinary Expert Review" could not fit and pushed 112px out. Marquee now runs below `lg`.

**Verified** with headless Chrome (`puppeteer-core` against the system Chrome), full-page scroll at
each width:

| Viewport | 320 | 360 | 390 | 430 | 768 | 1024 | 1280 | 1440 |
|---|---|---|---|---|---|---|---|---|
| Overflow | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Page height: ~25.6k px at 390 · ~22.4k px at 1280.

> Rule of thumb for this codebase: **a responsive grid must declare its base column count.**
> `grid lg:grid-cols-2` is a bug waiting to happen; write `grid grid-cols-1 lg:grid-cols-2`.

---

## 2c. Placeholder media moved local

Hot-linking `images.unsplash.com` / `images.pexels.com` made `next dev` throw
`ENOTFOUND` → HTTP 500 from the image optimiser the moment the network blipped. All nine
placeholder stills are now committed under **`public/placeholder/`** (792 KB total), so the page
renders offline and the optimiser never reaches out.

| File | Used by |
|---|---|
| `session-customer.jpg`, `session-expert.jpg` | Face Mapping Session call tiles |
| `hair-map.jpg`, `style-map.jpg` | the two add-on panels |
| `report-cover.jpg` | reserved for a Face Map cover shot |
| `panel-medical.jpg`, `panel-research.jpg`, `panel-yoga.jpg`, `panel-hair.jpg` | expert panel cards (at-rest still) |
| `beta-note.jpg` | Beta client experiences pull-quote panel (CC0, StockSnap — safe to ship as-is) |

Every rendered section now references **zero** remote image hosts. The four expert-panel hover clips
are still remote — they are fetched only on hover, `preload="none"`, and a failed fetch is silent, so
they cannot break the page.

**To swap in real photography:** overwrite the files in `public/placeholder/` keeping the same
filenames — nothing in the code needs to change. Paths are declared once in `lib/showcase.ts` →
`MEDIA`.

Still remote and unchanged: the hero poster + video on the R2 bucket (`hero.tsx`), and the
`F()` stock URLs in `showcase.ts` that feed the dormant sections only.

---

## 2d. Problem-section gap fix

A tall blank hole sat between the resolution quote and the "One clear direction" card on mobile.

**Two causes, both in `problem.tsx`:**

1. **framer-motion clobbered a Tailwind transform.** The panel had
   `absolute top-1/2 -translate-y-1/2` *and* `animate={{ scale, y }}`. Framer writes the whole
   `transform` property on anything it animates, so the utility class was silently overwritten —
   measured `transform: none`. The panel therefore sat at `top: 50%` with **no** upward offset:
   175px of dead space above it, and it spilled 65px past the stage.
2. **The vanished noise cards kept their grid rows.** They were in-flow grid items, so fading them
   out left their space behind.

**Fix:** centring moved onto a plain, un-animated wrapper (`md:absolute md:top-1/2
md:-translate-y-1/2`), and the four noise cards moved into an `absolute inset-0` overlay layer. On
mobile the answer panel is now in normal flow and defines the stage height; the noise sits over it
and clears away leaving nothing behind. Desktop keeps the 430px stage with the panel centred.

| | before | after |
|---|---|---|
| Mobile panel offset from stage top | 473 → 648 (175px hole) | 0px |
| Mobile section height | 823px with a hole | 823px, filled |
| Desktop panel | overflowed the stage | centred in 430px |

> **Rule:** never put `translate-*` / `rotate-*` / `scale-*` utilities on an element framer-motion
> animates. Put them on a wrapper. A scan confirms no rendered section still does this.

### Pacing of the same beat

The collapse also fired far too early — the four quotes were fully visible for only ~0.7s, which
reads as a flicker rather than a point being made, and the sequence could start above the fold and
be over before it was seen.

| | before | after |
|---|---|---|
| Trigger | `margin: '-120px'` (fires while mostly off screen) | `amount: 0.5` (half the stage actually visible) |
| Arrival stagger | 0.06s — all four land together | 0.24s — one voice at a time, last lands ~1.5s |
| Still, fully-readable hold | **~0.7s** | **~2.7s** |
| Collapse → panel → ladder | 0.62s / +0.18s / +0.34s | 0.7s / +0.3s / +0.5s |
| Control | "Replay" only, after the fact | **"Bring it together"** skips the wait; flips to **"Replay"** once resolved |

Measured end to end: cards arrive 0→1.5s, hold 1.5→4.2s, collapse 4.2→5.2s. Nobody has to sit
through the hold, and nobody who scrolled past misses the point.

---

## 2e. Theme experiment — "Clinic & Clay" (TRIED, REVERTED)

> **Status: reverted.** Built, reviewed, rejected — "looks sad". The muted sage + beige read as
> low-energy rather than calm. The site is back on `data-palette="aqua"` with the original
> `#FFFFFF` / `#FEFDFB` grounds. Kept here because the *measurements* below still hold and the
> `.tone-cool` / `.tone-warm` / `.tone-ink` machinery is still in `globals.css`, unused and inert —
> any future palette can reuse the rhythm without rebuilding it.
>
> **What to keep from it:** the diagnosis (ΔL\* 0.67 is invisible), the ladder concept, the
> role-splitting, and the fact that the section rhythm is palette-independent. **What to change:**
> the hues. The next attempt should hold more chroma in the accent and keep a brighter ground.

The page read as one endless white sheet because the two section grounds were `#FFFFFF` and
`#FEFDFB` — **ΔL\* 0.67**, below the ~2 threshold at which a surface step is even visible. Fixed
with a value ladder rather than more hues.

**The ladder** (all surfaces chroma < 6; only the spark exceeds C 40)

| Tone | Colour | L\* | Used for |
|---|---|---|---|
| Paper | `#FFFFFF` | 100.0 | cards only — never a section background |
| Base | Warm Ivory `#F7F4EF` | 96.3 | the default ground (~40%) |
| Cool | Map Mist `#DCE7E4` | 90.8 | analysis / method / report |
| Warm | Soft Sand `#E8DED5` | 89.0 | people / trust / money |
| Anchor | Deep Ink `#152421` | 12.8 | 3 bands only |

Cool and Warm sit **1.8 L\* apart but opposite in temperature** — variety without a false
hierarchy. Ink is the only real value jump, so it always reads as "this matters".

**Roles split by job, not by name** — the blueprint's own colours, made functional:

| Role | Colour | Why |
|---|---|---|
| ink | Deep Ink `#152421` | 14.65:1 on Ivory |
| secondary text | `#496761` | deepened Analysis Teal — 5.64 / 4.89 / 4.66 on the three grounds. The blueprint's `#55766F` is AA on Ivory (4.55) but **fails on Mist (3.94)** |
| graphic | Map Teal `#8FA9A3` | 2.29:1 on light — lines, rings, diagrams, **never text**. Becomes 6.41:1 (usable as text) inside an Ink band |
| spark | Terracotta `#9C5A2C` | 4.89:1 on Ivory, split-complement (~146°) to the teal |

**Ink bands re-scope the role tokens** (`--c-ink`, `--c-surface`, `--c-muted`, `--c-accent`,
`--c-primary`, shadows), so every descendant using `text-ink` / `bg-surface` / `border-border`
inverts with no component change. Only hardcoded `bg-white` / `fill="white"` had to be token-ised.

**Elevation follows the ground:** halo shadow on Base, hairline ring on Cool/Warm, lit top edge on
Ink. Three card textures for free. Gradient washes cut from 4 to 2 (Problem, Pricing).

**Rhythm** — Ivory 9 · Mist 5 · Sand 5 · Ink 3, never two tints adjacent:

```
hero·INK  strip  base  COOL  base  INK   base  WARM  base  WARM  INK   base
                                  method             experts  face-map
base  COOL  base  WARM  base  COOL  base  WARM  base  COOL  base  WARM  INK
      protocol    add-ons    why-diff   beta       after-pay    faq    cta
```

Verified in the browser: every section ≥ AA (min body 4.66:1, min heading 12.13:1), steps of
4.5–7.3 L\*, 0px horizontal overflow at all 8 breakpoints.

**Reverting was not one word after all.** The palette attribute alone left the two `tone-ink`
sections dark (`--c-tone-ink` falls back to the ink token, not to a light one) and left
`.section-alt` inside the flattened-elevation selector, so alt sections kept losing their card halo.
A clean revert needed: the palette attribute, the 11 section background classes, the two restored
`divider-soft` seams, and dropping `.section-alt` from the elevation rule. **Lesson for the next
theme trial: put the section tone on a single source of truth (a map in `page.tsx`, or a
`data-tone` attribute) rather than editing 11 component files.**

One ordering note worth keeping: `:root` and `[data-palette]` have identical specificity, so a tone
default declared *after* a palette silently wins — that is exactly the bug that made Sand render as
Mist on the first pass.

---

## 2f. Theme — "Aurora" (CURRENT)

Built from the gradient already on the pricing card, which is the palette that actually landed.

**The three stops are surface colours, not text colours** — `#6BE9FF` is 1.43:1 on white,
`#69B4FF` 2.19:1. So they are split by job:

| Role | Colour | Contrast |
|---|---|---|
| surfaces | the stops composited on white at 10–28% | the `tone-*` bands |
| graphic | `#6BE9FF` full strength | 1.4:1 on white — rings/dots/lines only; **11.06:1 on the deep band** |
| action | `#1A5FA8` (the sky stop, deepened) | 6.47 white · 5.87 wash · 5.25 glow ✓ |
| ink | `#132734` cool near-black | 15.36:1 |
| muted | `#4A6377` slate | 6.28 · 5.71 · 5.10 ✓ |

**One recipe at four strengths:**

| Tone | What | L\* | Count |
|---|---|---|---|
| base | plain white | 100.0 | 10 |
| wash | the gradient @ 10–13% | 96.1 | 9 |
| glow | the gradient @ 22–28% + a cyan light-leak | 91.8 | 2 |
| deep | the gradient inverted (`#0a2536 → #103049`) + cyan/sky leaks | 13.6 | 2 |

`glow` lands on **The Outcome** (early hook) and **The Main Offer** (money). `deep` anchors **The
Method** and **Your Face Map**. Pricing stays `base` on purpose so the gradient *card* is the hero
of its own section rather than competing with a gradient ground.

Verified: deep bands 14.32 heading / 8.54 body, light bands 15.36 / 6.28 (5.10 worst case on glow),
0px horizontal overflow at all 8 breakpoints.

### Single source of truth

Sections no longer set their own background — `className="section"` only. The rhythm lives in one
array, `SECTIONS` in [`app/page.tsx`](../src/app/page.tsx), applied by
[`layout/tone.tsx`](../src/components/layout/tone.tsx). Re-tune or drop the whole rhythm by editing
that array; no section file is touched. This is the direct fix for §2e's lesson, where tone classes
were scattered across 11 files and the revert took a 12-file edit.

`.tone-deep` re-scopes the role tokens (`--c-ink`, `--c-surface`, `--c-muted`, `--c-accent`,
`--c-primary`, shadows) so every descendant inverts with no component change. It also declares a
flat `background-color` under the gradient layers, so a band can never fall back to white while its
text is light.

Also made palette-aware: the header pill, previously a hardcoded warm `rgba(33,29,24,.38)` that went
muddy grey-green over the cool bands, now uses `rgb(var(--c-ink) / .42)`.

**Switching themes:** `data-palette` in `app/layout.tsx` — `aurora` (current) · `clinic` (tried,
rejected) · `aqua` (original) · plus the pre-existing accent presets. Only `aurora` defines the
`--g1/--g2/--g3` stops; every other palette falls back to plain grounds and the tone classes become
inert.

---

## 3. Deviations from the PDF

1. **Fake testimonials removed.** The live site had three invented quotes and a "4.9 / Loved by
   members" rating. The blueprint specifies testimonial *slots*, not quotes, so the section renders
   labelled empty slots ("Awaiting verified feedback"). Add real approved words to
   `beta-experiences.tsx` and set `PLACEHOLDER = false`.
2. **Before/after Transformations dropped** — not in the blueprint order, and it is an unverified
   outcome claim, which the Developer Handoff forbids. Also dropped: `living-analysis`, `community`,
   `old-vs-new`. Nothing deleted; all dormant in git.
3. **Login removed from the nav** — the blueprint header shows it, but there is no customer account
   area to link to.
4. **Expert panel merged** — 5 discipline cards + 4 founding headshots → the blueprint's 4 panel
   roles, each with an "Approved expert name + credentials" placeholder.
5. **Internal instructions rewritten as customer copy** where the blueprint addressed the builder
   rather than the reader: Privacy & Trust ("Use trusted payment infrastructure…" → "Trusted payment
   infrastructure, with the final amount shown clearly"), the Methodology footnote, the Pricing lede,
   the FAQ intro, and the Experts / Beta Experiences margin notes.
6. **Chapter one-liners written.** The 12-chapter grid gives titles only. Each summary is lifted from
   the blueprint's own wording for that area elsewhere in the document — **except Ch. 12
   "Recommended Follow-Through"**, composed from the clarification-support FAQ. Worth a review.
7. **Appearance Protocol grouped into two lenses** (Start/Stop/Continue = what changes;
   First/Next/Later = in what order) instead of six flat tiles. Desktop still shows all six.
8. **No figures published in Methodology.** The blueprint bars technical numbers until the audit is
   signed off, so the interactive element is a non-numeric factor map, not a stat chart. The
   footnote is restated as a customer-facing commitment.
9. **Add-ons wrapper heading is original copy** ("Two specialist Maps, when you want the complete
   picture") — the blueprint gives two separate pages with no combined heading.
10. **Delivery wording is now blueprint-exact everywhere** ("approximately two or more days"),
    replacing the site's previous "2–4 working days".
11. **Hero sub-copy is responsive** — the blueprint's shorter mobile line below `md`, the full line
    above.

---

## 4. Open conflicts — needs a decision

1. **Brand colour system (the big one).** The blueprint locks Map Teal `#8FA9A3`, Deep Ink
   `#152421`, Map Mist `#DCE7E4`, Warm Ivory `#F7F4EF`, Skin Taupe `#B9A89E`, Soft Sand `#E8DED5`,
   and the Developer Handoff lists them as required tokens. The site runs `data-palette="aqua"`
   (cyan `#21AAC2` / blue `#2575C4`) on a pure-white base, plus a hardcoded blue gradient on the
   pricing card (`#69B4FF` / `#6BE9FF`). **No colour was changed, per instruction** — but the live
   palette is not the approved one. Switching is a one-line change in `app/layout.tsx`; the token
   system already supports it.
2. **Layout specs vs. current design** (also untouched for the same reason):
   | Blueprint handoff | Current |
   |---|---|
   | Desktop max width 1360px | 1200 / 1320px |
   | Section padding 104–132px desktop | 64–80px (`.section`) |
   | Desktop hero 72–84px | 56px at `lg` |
   | Body 17–19px desktop | 14–16px |
3. **Inner pages.** Blueprint p.30 requires 12. Existing: `/what-you-receive`, `/meet-the-experts`,
   `/research-and-method`, `/privacy`, `/terms`, `/refund`, `/form`, `/payment`.
   **Missing:** How It Works · Your Face Map · Methodology · Hair Map · Style & Colour Map ·
   Pricing · About MapMyFace · Beta Experiences · FAQ & Support.
4. **Checkout page.** Blueprint p.31 ("Build your Map", bundle row, customer fields) — `/payment` was
   not rebuilt. It inherits the correct plan name and terminology from `constants.ts` but not the
   blueprint layout.
5. **Consent & Image Policy.** Footer links to `/privacy#consent`; that anchor does not exist yet.
   Needs a real page or a section in the privacy page.
6. **Add-on selection does not survive the funnel.** Pricing links to
   `/form?addons=hair_map,style_colour_map`, but `/form` and `/payment` ignore the param.
7. **All media is placeholder** (Unsplash portraits, Pexels clips), tagged with visible "Placeholder
   visual" ribbons. Blueprint requires real Indian men and women, natural skin texture, neutral
   clothing, controlled Map Teal / Map Mist backgrounds — no salon imagery, over-retouching or
   generic AI visuals. Swap points are centralised in `lib/showcase.ts` → `MEDIA`.
8. **Expert names, credentials and photographs** are placeholders pending the approved roster.
9. **Delivery promise.** "Approximately two or more days" is intentionally soft in the blueprint; the
   old site promised 2–4 days. Confirm the operational truth before launch.
10. **Minor:** `Jost` is loaded for the wordmark and is not part of the blueprint's type system
    (Manrope + Newsreader, both correctly loaded). Package name is still `faceyoga`.
