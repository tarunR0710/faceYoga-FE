# FaceYoga — Upgrade Report

**Compiled:** 2026-07-21
**Sources:** qoves.com teardown · current codebase audit · Indian-user conversion research · [living-image-playbook.md](./living-image-playbook.md)

This is the "what to build next" report. It's organised so you can work top-down: the prioritised roadmap is at the end, everything before it is the evidence.

---

## 0. TL;DR — the five things that matter most

1. **Kill the tiny horizontal-scroll cards** (`gallery.tsx`) and replace with a real results section using your *already-built-but-unused* `ui/comparison-slider.tsx` at full size + a proper testimonial block. You currently have **zero written testimonials** anywhere on the live site.
2. **Bring the facial-analysis section to life** — it's a flat PNG today. This is where the qoves "cool moving layers" effect goes. The technique is documented and ready in the playbook.
3. **Break the animation monotony** — every section uses the identical `opacity+y whileInView` fade. Add count-ups, hover-lift, parallax, and a scan/annotation overlay so scrolling has variety.
4. **Add the missing funnel + pages** — a free "Face Analysis quiz" as the Meta-ad entry, a post-OTP **results/upsell page** (you jump straight to `/payment` today — this is the qoves upsell page you noticed is missing), plus About / Science / Results / Program pages.
5. **Make it convert for Indian users** — ₹ price anchoring (struck MRP + per-day + No-Cost EMI), UPI-first single-page checkout, real Indian before/afters, WhatsApp-style testimonials with names & cities, sticky mobile CTA, <3s mobile load.

---

## 1. How you compare to qoves (the reference)

qoves is a Next.js long-form landing page (~21 sections). Your site already mirrors its **skeleton** well — hero, press logos, transformations, tabbed "appearance matters" stats, old-vs-new, facial analysis, region accordion, experts, FAQ, CTA. The gaps are in **depth, interactivity, and the funnel**, not structure.

### What qoves does that you don't (by impact)

| qoves element | What it is | Your status |
|---|---|---|
| **`Affects` layered face** (`affects-v4.webp`) | Face photo with floating glass HUD panels + percentile bars whose markers **glide** on reveal. The effect from your screenshot. | ❌ Static PNG |
| **Interactive before/after slider** (`Visualization`) | Full-size draggable slider with feature toggles ("darken eyebrows", risk level) | ⚠️ You have `ui/comparison-slider.tsx` built but **unused**; `transformations.tsx` uses an inferior inline copy |
| **Reveal-on-hover cards** (`AppearanceMatters__card`) | Card swaps to cover image + white text + big shadow on hover | ❌ Your research cards are flat `#fafafa`, no hover |
| **Hover-wipe stat reveal** (`ConcernReveal`) | Hover a concern photo → `clip-path` wipes to the "after" state + a stat bar grows | ❌ None |
| **Metric dashboards / score charts** (`LifetimeTracking`) | Line charts projecting progress with-vs-without the program | ❌ None (your `stats-grid.tsx` exists but is dead code) |
| **"See detailed transformation" modal** (`SurgeryFree`) | Click opens a modal of recommendations | ❌ None |
| **Multi-step checkout wizard** (`/welcome/checkout`) | Value-prop → email → payment, with a **report teaser** unlocked only after paying | ⚠️ You go form → OTP → straight to `/payment`. No results teaser, no upsell |
| **Testimonials fused with the advisory board** | Customer quotes + star sit *inside* the 10-doctor credential grid, so proof + authority read as one block | ❌ No testimonials at all |
| **Spinning globe, scan ring, skeleton shimmers, marquee** | Ambient "this is analysing" motion | ⚠️ You have a scan-free static experience |

### The important technical insight about the qoves effect

**qoves does NOT use Framer Motion parallax for the moving-image effect.** The "elements moving within the image" is achieved with:
- **CSS custom properties** driving position — `--value`, `--percentage-x`, `--reveal`, `--bar-width` — plus a plain `transition`. A single JS value or a `:hover` animates the whole overlay.
- **IntersectionObserver scroll-reveal** (`data-scroll-reveal="true"` / `data-animation="1|2"`) toggles a reveal class as sections enter the viewport.
- **Absolutely-positioned glass panels** (`background:#0000004d`, `border:.7px solid #ffffff1a`, `border-radius:.8rem`) layered over an `overflow:hidden` frame with the face pinned `left:50%; transform:translate(-50%)`.

This is *cheaper and more performant* than the Framer parallax route. **Your playbook covers the richer Framer approach (mouse/scroll parallax); for a faithful qoves clone, the CSS-variable + IntersectionObserver approach is lighter.** Use Framer for mouse-depth drift, CSS-vars for the diagnostic gauges/bars. Both are documented — see §4 and the playbook.

---

## 2. Current codebase audit — what's weak

Full detail with `file:line` refs is in the roadmap; highlights:

### Dead code to reclaim or delete
- **`comparison.tsx`, `social-proof.tsx`, `stats-grid.tsx`** — built, never imported into `page.tsx`, and use an *older* design language (`font-bold`, `text-5xl`, red/green blocks). Either restyle & use, or delete.
- **`ui/comparison-slider.tsx`** — the good slider, unused. `transformations.tsx` hand-rolls a worse one.
- **`ui/button.tsx`, `card.tsx`, `badge.tsx`, `accordion.tsx`** — used only by admin. The marketing page hand-rolls every button/card inline → **no shared design system**, styling drifts section-to-section.

### The "tiny horizontal-scroll cards" you hate
Confirmed: **`gallery.tsx:52-94`**. On mobile it's `overflow-x-auto` with `w-[140px]` cards (`:61`), each a cramped 2-up before/after with 9px labels; on desktop a 5-col grid of small tiles. This is the "Real results" section — the weakest proof on the page. Replace it (see roadmap).

### Animation gaps
- **Global monotony**: nearly every section = `initial/whileInView opacity + y:16-20`. `tailwind.config.ts:137-186` defines `float`, `scale-in`, `slide-in`, `fade-in-up` keyframes that are **almost entirely unused**.
- **Weak sections**: `old-vs-new` (static rows), `facial-analysis` (static PNG), `how-it-works` (no connector/number animation), `gallery` (no hover), `experts` (inert 80px avatars, no bios).
- **Strong sections** (keep as reference for the rest): `research-stats` (real tab crossfade + stagger), `features` (tactile accordion).
- **Missing site-wide**: no count-ups, no scroll-progress bar, no route transitions (`/` → `/form` → `/payment` are hard cuts), **no `prefers-reduced-motion` handling anywhere**.

### Bugs / polish
- **Broken nav anchor**: header "Why Face Yoga" → `#transformations`, but `transformations.tsx` has no `id` — scrolls nowhere.
- **Placeholder links**: footer social icons `href="#"`; form Terms/Privacy `href="#"` despite real `/terms` & `/privacy` pages existing.
- Hero CTAs have no press/active feedback; `+91` hardcoded (no country picker); inconsistent border radii & section spacing.

---

## 3. Missing pages

**Exist today:** `/`, `/form`, `/payment`, `/success`, `/privacy`, `/terms`, `/refund`, `/admin/*`.

**Should add (roughly in priority order):**
1. **Free "Face Analysis" quiz** (`/quiz` or `/analyze`) — 5-7 tap-only questions → personalised result. This is the **Meta-ad funnel entry** and the single biggest conversion lever (quizzes convert ~40% vs 5-10% static). Captures phone via OTP to "unlock your report."
2. **Post-OTP results / upsell page** — the qoves-style teaser between OTP and payment. Show a mock personalised analysis + the plan as the fix + the offer. (You currently skip straight to `/payment`.)
3. **Results / Transformations** (`/results`) — full page with the big comparison slider + real before/afters + testimonials.
4. **About / Our Story** — founder, mission, credibility.
5. **The Science / Research** (`/science`) — dedicated evidence page for the research stats with citations.
6. **Program / exercise-region pages** — the 6 `features.tsx` categories (Forehead, Eyes, Cheeks, Jawline, Lips, Neck) as standalone SEO pages.
7. **Contact** — real page/form (only `mailto:` today).
8. Optional: Blog/content hub (SEO), dedicated Experts/Team page.

---

## 4. The "living image" effect — how to build it

Full playbook (7 techniques, copy-paste code for your stack) is in **[docs/living-image-playbook.md](./living-image-playbook.md)**. Summary of the highest-impact three:

- **Ken Burns / subtle zoom-drift** (#5) — slow scale+pan for ambient life. Lowest effort, applies to *any* image (hero video poster, gallery shots).
- **Annotated / diagnostic face overlay** (#3) — the qoves signature: absolutely-positioned SVG dots + `pathLength` line-draw + pulsing points + labelled glass callouts that fade/glide in on scroll. **This is what goes on `facial-analysis.tsx`.**
- **Mouse-tracking parallax** (#1) — foreground/midground/background layers drifting at different rates on cursor move (`useMotionValue` + `useTransform` + spring, zero re-renders).

**Recommended hybrid for a faithful qoves look:**
- Diagnostic gauges/bars/markers → **CSS custom properties + `transition`** (what qoves actually does — lighter).
- Depth drift on the face → **Framer mouse-parallax** (playbook #1).
- Reveal on scroll → **`whileInView`** (you already use this) or IntersectionObserver.
- Always gate on `prefers-reduced-motion` (playbook has the hook; the site respects it nowhere today).

The qoves `Affects` panel structure to replicate: face pinned `left:50%; transform:translate(-50%)` in an `overflow:hidden` frame; glass panels (`bg #0000004d`, `border .7px #ffffff1a`, `radius .8rem`) in a flex column with `justify-content:space-between`; every marker positioned by `left: var(--value)` with `transition: left .3s`.

---

## 5. Indian-user conversion priorities

Ordered by expected impact (full detail + sources in the research deliverable):

**Tier 1 — do first**
1. **Real Indian before/afters** — same angle/lighting, week markers ("Meena, Pune · Day 1 vs Week 6"). Western stock reads as an ad; Indian faces read as real. Avoid over-retouched shots (scam pattern-match).
2. **UPI-first single-page Razorpay checkout** — UPI top & pre-selected (converts ~99% vs 90-95% cards); one screen (conversion drops 5-7% per extra step); all costs upfront; security badges at the pay button.
3. **₹ price anchoring** — `~~₹4,999~~ ₹1,499` "70% OFF — Launch Price" + per-day reframe ("just ₹5/day") + "No Cost EMI from ₹X/month" for prices >₹1,500. Festival/wedding hooks ("Shaadi-season ready", "Festive glow").
4. **Minimal OTP friction** — collect only phone (+name) before OTP; inline OTP (no new page); auto-focus, paste/auto-read, countdown + easy resend; never re-enter phone on failure. Capture the phone *before* the OTP wall so you can WhatsApp-retarget drop-offs.
5. **Trust cluster at the CTA** — "★4.8 (300+ reviews) · 50,000+ Indian women · 100% Safe · 7-Day Money-Back · Secure Razorpay" directly under the button. Show GST/registered-business + real support contact.
6. **Mobile <3s** — single column, ≥44px taps, compressed/lazy images, poster-first short muted video, **sticky bottom CTA bar** through scroll. Test on a mid-range Android over 4G.

**Tier 2 — strong lifts**
7. Free "Face Analysis / Find Your Face Type" quiz as lead magnet (see §3).
8. WhatsApp-style + short vertical **video testimonials** with real names + cities + specific results. Aim for 5+; realistic 4.7-4.8 beats a suspicious perfect 5.0.
9. Named, credentialed instructor + real dermatologist review (fake "as seen on" now actively signals scam in India).
10. "Join 50,000+ **Indian women**" counter near hero & CTA (specificity makes it relevant).
11. **Genuine** cohort/enrolment urgency ("Next batch closes in 2 days") — fake perpetual timers backfire with trust-sensitive Indian buyers.

**Tier 3 — polish**
12. English base with **Hinglish** accents; address Indian concerns explicitly (pigmentation, dullness, tanning, dark circles, double chin, jawline, "glow", "ghar baithe", "10 min a day").
13. Objection-handling FAQ + prominent easy-to-claim money-back guarantee.
14. Post-payment one-click upsell (peak-trust moment; ~28.5% spend lift).
15. Advertise the retention mechanics on the page (weekly milestones, daily routines, WhatsApp reminders, private community — the Habuild pattern).

---

## 6. Prioritised roadmap

### Phase 1 — Quick wins (hours each, high impact)
- [ ] **Fix bugs**: add `id="transformations"`, wire footer/form `href="#"` → real `/terms` `/privacy` & socials.
- [ ] **Add `prefers-reduced-motion`** hook (in playbook) and gate all Framer entrances.
- [ ] **Add a sticky mobile bottom CTA bar** ("Start My Plan — ₹1,499").
- [ ] **Price anchoring** on `pricing-preview.tsx`: struck MRP, per-day reframe, No-Cost EMI line, count-up on the price.
- [ ] **Hover-lift + tactility** on research / how-it-works / experts / pricing cards.

### Phase 2 — The big visual upgrades
- [ ] **Replace `gallery.tsx`** with a real Results section: full-size `ui/comparison-slider.tsx` + lightbox + real Indian before/afters with names/cities.
- [ ] **Add a real Testimonials section** — video + WhatsApp-style + text, fused with the experts/advisory block (qoves pattern). Restyle or retire dead `social-proof.tsx`.
- [ ] **Animate `facial-analysis.tsx`** with the diagnostic annotation overlay (playbook #3 + CSS-var gauges). This is the "cool effect" from your screenshot.
- [ ] **Upgrade `old-vs-new` & `how-it-works`** with staggered rows, connectors, count-ups, scan-ring on the "analysis" step.
- [ ] Consolidate onto the `ui/` primitives so there's one design system.

### Phase 3 — Funnel & pages (biggest conversion lever)
- [ ] **Free Face-Analysis quiz** (`/quiz`) as the Meta-ad entry + low-friction phone capture.
- [ ] **Post-OTP results/upsell page** (the missing qoves page) between form and payment.
- [ ] **UPI-first single-page checkout** rework.
- [ ] Add **About**, **Science**, **Results**, **Program-region**, **Contact** pages.

### Phase 4 — Polish & motion
- [ ] Route transitions (`AnimatePresence`) across `/` → `/form` → `/payment` → `/success`.
- [ ] Scroll-progress bar, ambient shimmer/scan motion, Ken Burns on hero/gallery images (playbook #5).
- [ ] Reduced-motion audit, focus-state audit over dark/video backgrounds.

---

*Companion file: [living-image-playbook.md](./living-image-playbook.md) — reusable code for the moving-image effect on any future image.*
