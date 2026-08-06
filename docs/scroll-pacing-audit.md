# Scroll & Entrance Animation Pacing Audit

Read-only audit of every rendered homepage section (order per [`src/app/page.tsx`](../src/app/page.tsx)) against our own [`docs/apple-scroll-playbook.md`](./apple-scroll-playbook.md) — especially §6 "Pacing & feel" — and the shared kit in [`src/lib/motion.ts`](../src/lib/motion.ts).

**The gold-standard numbers (playbook §6):**

| Parameter | Apple-feel target |
|---|---|
| Reveal travel | **16–32px** (kit says 20–32) |
| Reveal duration | **0.6–1.0s** (kit says 0.55–0.7) |
| Easing | `EASE_OUT` `[0.16,1,0.3,1]` or `EASE_OUT_SOFT` `[0.22,1,0.36,1]`; `EASE_IN_OUT` for scroll-linked only |
| Stagger between siblings | **0.06–0.14s** |
| Scrub smoothing | `useSpring` **stiffness 60–100, damping ≥26** |
| Viewport trigger | fire ~80px early → `VIEWPORT = { once: true, margin: '-80px' }` |
| Animate | **transform + opacity only** |
| Reduced motion | respected in every animated component |

---

## TL;DR — the headline findings

1. **One easing language is not being used.** Only 4 of 13 sections route through the kit's `EASE_OUT`/`EASE_OUT_SOFT`. The rest use raw `'easeOut'` strings, ad-hoc beziers (`[0.22,0.61,0.36,1]`, `[0.4,0,0.2,1]`), or **locally re-declared copies** of `EASE_OUT_SOFT`. This is the single biggest, cheapest fix (playbook §9 "consistency fix worth doing first").
2. **~18 reveals fire with no `transition` at all** → Framer defaults (~0.3s, a spring on `y`), which is faster and curvier than our 0.6–0.7s ease-out. They read subtly "cheaper" than the kitted sections next to them.
3. **`VIEWPORT` is almost never used.** 18 reveals use `{ once: true }` with **no `margin`**, so they trigger at the fold edge instead of ~80px early. Others use ad-hoc `-40px`/`-60px`.
4. **3 sections have no reduced-motion at all**: `living-analysis`, `testimonials`, `faq` (plus continuous `scan-spin`/`pulse-ring` loops that ignore it).
5. **Both raw scroll scrubs run 1:1 with the wheel** — `useSpring` is used in **zero** sections. The marquee `transformations` wipe and the `facial-analysis` face-draw both track the scroll mechanically.
6. **`transformations` empty-space-at-bottom** = a unit mismatch (`section` sized in `vh`, pin sized in `svh`) plus an over-generous 360vh budget with a dead hold-tail on the last slide. Diagnosis + fix below.
7. **Restraint is over budget.** The playbook wants **one** signature pinned moment. We ship three scroll-heavy beats back-to-back: `how-it-works` (pinned, 425vh), `facial-analysis` (scrub), `transformations` (pinned, 360vh).

---

## Section-by-section

### Header — [`layout/header.tsx`](../src/components/layout/header.tsx)
1. **Now:** Mount `initial={{ y:-10, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration: 0.3 }}` (`header.tsx:45-47`) — no easing curve. On scroll past 50px it toggles a "solid" pill via `className="… transition-all duration-500"` animating `padding`, `width`, `maxWidth`, `backgroundColor`, `backdropFilter`, `borderRadius`, `height` (`header.tsx:39,48-62,66-70`). Mobile-menu items stagger `delay: index * 0.1` with no duration/ease (`header.tsx:167-169`).
2. **Verdict:** Mount is fine but curveless and a hair fast (0.3s). The scroll-morph animates **layout properties** (`width`/`maxWidth`/`padding`/`height`) via `transition-all` — against §8 "transform + opacity only." It's a one-shot toggle (not per-frame), so jank is limited to the 50px threshold, but `transition-all` also re-transitions layout on every property change. No `useReducedMotion`.
3. **Fix:** Add `ease: EASE_OUT` to the mount and bump to `0.4`. Narrow `transition-all` to `transition-[background-color,backdrop-filter,border-radius]` so layout props snap instead of animating; keep the pill geometry change instant. Gate the mount `y` behind `useReducedMotion`.

### 01 Hero — [`sections/hero.tsx`](../src/components/sections/hero.tsx) ✅ gold standard
1. **Now:** Orchestrated mount: container `delayChildren 0.15, staggerChildren 0.14` (`hero.tsx:26`); headline line-mask `y:'115%'→'0%'`, `duration 0.7, EASE_OUT`, inner stagger 0.12 (`hero.tsx:30,34`); subhead/CTA `rise` `y:20, 0.6s, EASE_OUT` (`hero.tsx:38`); background `scale 1.06→1` over `1.6s, EASE_OUT` (`hero.tsx:58`). `initial={reduce ? false : …}` throughout.
2. **Verdict:** Matches §5a + §6 exactly — transform/opacity only, long-tail ease-out, reduced-motion safe. This is the reference. **Leave it alone.**
3. **Fix (optional polish only):** The big background `scale` could use `EASE_OUT_SOFT` (§6: "gentler, for large elements") instead of `EASE_OUT` (`hero.tsx:58`). Optionally add the desktop-only scroll-away exit from playbook §9 (`useScroll` `offset:['start start','end start']`, content `opacity 1→0`). Neither is a defect.

### 02 OldVsNew — [`sections/old-vs-new.tsx`](../src/components/sections/old-vs-new.tsx)
1. **Now:** Header `duration: 0.6, ease: 'easeOut'` (raw string) + `viewport={{ once: true }}` (`old-vs-new.tsx:29-30`). Cards correctly use `EASE_OUT_SOFT`, `x: ∓32`, `margin:'-60px'`, second card `delay:0.08` (`old-vs-new.tsx:49-53,84-88`). Radar `animate-pulse-ring` loops (`:104-111`).
2. **Verdict:** Cards are on-kit (x:32 is at the top of the 16–32 band). The **header is the outlier** — raw `'easeOut'` ≠ the kit curve, and no `-80px` margin. `pulse-ring` loops regardless of reduced-motion.
3. **Fix:** `old-vs-new.tsx:30` — `ease: 'easeOut'` → `ease: EASE_OUT_SOFT`; `old-vs-new.tsx:29` → `viewport={VIEWPORT}`. Suppress the radar pulse under reduced-motion.

### 03 HowItWorks — [`sections/how-it-works.tsx`](../src/components/sections/how-it-works.tsx)
1. **Now (desktop pin):** `height: steps.length * 85vh` = **425vh** (`how-it-works.tsx:60`); `useScroll offset:['start start','end end']` (`:48`); active index via `useMotionValueEvent(… floor(v*steps.length))` (`:50-52`); giant number `key={active}` swap `y:30→0, duration 0.45, EASE_OUT` (`:78`); content swap `y:18, duration 0.4, EASE_OUT` (`:95`). **Mobile stack:** header `duration 0.5, ease:'easeOut'`, `{once:true}` (`:133-134`); cards `delay i*0.08, duration 0.5, ease:'easeOut'`, `{once:true}` (`:155-156`).
2. **Verdict:** 425vh ≈ 5 screens for the pinned stepper — over the playbook's "~4 screens per chapter feels slow" ceiling (§2). Swap durations `0.4`/`0.45` sit just under the 0.6–1.0 reveal band (defensible for a re-swap, but on the fast side). Discrete `floor()` stepping has no hysteresis → the number can flicker at band edges. Mobile branch uses raw `'easeOut'`, `0.5s`, and no `-80px` margin.
3. **Fix:** `:60` — `85vh` → `~78vh` (5×78 = 390vh, back under 400). `:78,:95` — nudge durations `0.45/0.4` → `0.5`. `:134,:156` — `ease:'easeOut'` → `ease: EASE_OUT`, bump `0.5` → `0.6`; `:133,:155` — `{ once:true }` → `VIEWPORT`. Consider hysteresis on the index (only step when `v` crosses band center) to kill boundary flicker.

### 04 PersonalizationFactors — [`sections/personalization-factors.tsx`](../src/components/sections/personalization-factors.tsx)
1. **Now:** Header `y:20` with **no `transition`** (Framer default) + `{ once:true }` (`:83-86`); headline is a `<Typewriter … speed={70}>` char-by-char JS reveal (`:95`). Context tags "bubble up" with shuffled `delay = i * 0.45` (`:70-77`), `scale 0.5→1, y:22`, spring `stiffness 80, damping 26` (`:18-21`). Feature cards `y:20, scale:0.96, duration 0.5, EASE_OUT, delay i*0.06, margin:'-60px'` (`:130-133`).
2. **Verdict:** Tag spring is in-band (stiffness 80/damping 26 ✓, no overshoot ✓) but the **0.45s stagger is 3–4× the 0.06–0.14 target** — ten tags surface over ~4.5s, which reads sluggish rather than premium, and if the user scrolls on they animate against an empty gap. `scale 0.5` start is a large inflate. Header uses the default transition (too fast/curveless). Typewriter animates via ~35 React re-renders (not transform/opacity) at 70ms/char (~2.5s). Cards `0.5s` slightly fast.
3. **Fix:** `:70-77` — reduce the slot spacing `i * 0.45` → `i * 0.12` (or keep the ambient feel but cap total to ~1.5s); raise `scale 0.5` → `0.8` (`:14`). `:83-86` — add `transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}` and `viewport={VIEWPORT}`. `:133` — `duration 0.5` → `0.6`. Consider swapping `Typewriter` for the §5a line-mask or §5b word reveal (transform/opacity, keeps SEO text) or at least drop `speed` to ~45ms.

### 05 FacialAnalysis — [`sections/facial-analysis.tsx`](../src/components/sections/facial-analysis.tsx)
1. **Now:** Local `const ease = [0.22, 0.61, 0.36, 1]` (`:25`) — an **ad-hoc curve that is in no kit** — applied to header (`:86`) and cards (`:119-120`). Header `y:16, duration 0.6, margin:'-80px'` ✓. Cards `y:20, scale:0.97, duration 0.55, delay i*0.1, margin:'-60px'`. Self-drawing face map: `useScroll offset:['start end','end start']` (`:75`) → `drawScrub = useTransform(scrollYProgress, [0.28,0.62], [0,1])` (`:76`) driving `pathLength`. **No `useSpring`.** `reduce` sets `draw = 1` (`:77`).
2. **Verdict:** Values are close to the band, but the **bespoke `[0.22,0.61,0.36,1]` bezier breaks the "one easing language" rule** — it's neither `EASE_OUT` nor `EASE_OUT_SOFT`. The scroll-linked draw tracks the wheel 1:1; a self-drawing line is exactly the case §1b/§6 say to smooth. Reduced-motion is handled. Card `delay 0.1` is at the top of the stagger band.
3. **Fix:** `:25` — delete the local `ease`; import and use `EASE_OUT_SOFT` (header/cards) and `EASE_OUT` where crisper. `:76` — wrap progress: `const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })` then `useTransform(p, [0.28,0.62],[0,1])`. `:118` — `margin:'-60px'` → `VIEWPORT`.

### 05a LivingAnalysis — [`sections/living-analysis.tsx`](../src/components/sections/living-analysis.tsx) ⚠ no reduced-motion
1. **Now:** **No `useReducedMotion` imported.** Header `y:20`, no transition, `{once:true}` (`:52-56`). Console `scale:0.97, duration:0.6` with **no `ease`**, `{once:true}` (`:84-88`). Discover cards `y:20, delay i*0.1`, **no duration/ease** (Framer default), `{once:true}` (`:248-253`). Continuous `animate-scan-spin` ring (`:112`) and `animate-pulse-ring` dots (`:137`) run forever.
2. **Verdict:** Worst reduced-motion offender: nothing here degrades, and the scan-ring/pulse loops violate §8's "never autoplay looping motion" under reduced-motion. Every reveal is either curveless (`0.6` with no ease) or a bare default (~0.3s). No `-80px` early trigger.
3. **Fix:** Import `useReducedMotion`; gate `initial` transforms and the CSS loops (`scan-spin`, `pulse-ring`) off when `reduce`. `:56,:88,:253` — add `transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}` (and `delay` where present) + `viewport={VIEWPORT}`. `:84-88` console `duration 0.6` needs an explicit `ease: EASE_OUT_SOFT`.

### 05b Transformations — [`sections/transformations.tsx`](../src/components/sections/transformations.tsx) ⭐ the reported bug
1. **Now:** Pinned scrollytelling for the before→after wipe. `section` `height: ${count * 90}vh` = **360vh** (count = 4, `showcase.ts:43-48`) at `transformations.tsx:174`; pin is `sticky top-0 h-[100svh]` (`:175`). `useScroll target:ref, offset:['start start','end end']` (`:150`) drives every slide. Per slide: `opacity = useTransform(progress, [start, inDone, outStart, end], [opFrom,1,1,opTo])` with `inDone = start + span*0.18`, `outStart = start + span*0.82` (`:52-59`); `scale 1.05→1` (`:60`); before-layer `clipPath inset` wipe over `[inDone, outStart]` (`:63-65`). First slide `opFrom=1`, last slide `opTo=1` (holds). **No `useSpring`.** Fallback grid card `y:18, duration 0.5, delay i*0.06, margin:'-40px'`, **no ease** (`:134`).
2. **Verdict — the "too much empty space at the bottom":** two compounding causes.
   - **(a) Unit mismatch → a held/blank tail.** The section is sized in **`vh`** (`${count*90}vh`) while the pin is sized in **`svh`** (`h-[100svh]`). `useScroll`'s `['start start','end end']` measures progress over `sectionHeight − viewport`, and the sticky releases after traveling `sectionHeight − pinHeight`. Those two coincide **only when pinHeight === viewport**. On mobile where `svh < vh` (dynamic toolbar), progress can hit **1 while the element is still pinned**, so the last slide sits frozen for the extra ~`(vh − svh)` ≈ one toolbar height (~8–10vh) of dead scroll before the section ends — reads as empty space at the bottom. The comment at `:170-171` deliberately chose `svh` for the pin but never matched the section unit.
   - **(b) Over-generous budget + dead hold.** 360vh with `offset` progress spread over ~260vh = ~65vh of scroll per slide, but each slide's actual wipe animates over only `outStart − inDone` = 64% of its band; the last slide reaches full opacity by progress ≈0.80 and its wipe finishes ≈0.955, leaving the remainder a static hold. Combined with a small centered stage (`max-w-[420px]`, `flex items-center`), the tail shows a still, mostly-empty viewport.
3. **Fix:**
   - **Match units** so pin-release lands exactly at progress 1: `:174` — `height: ${count * 90}vh` → `height: ${count * 90}svh` (or set the pin to `h-screen`/`min-h-[100svh]` and keep the section in `vh`, but pick **one** unit for both). This alone removes the blank tail.
   - **Tighten the budget:** `count * 90` → `count * 72`vh/svh (≈0.6 screen/slide) so pacing is brisk and the hold-tail shrinks — still inside §2's 250–400vh guidance for 4 slides.
   - **Extend the last slide's wipe closer to the end** so scroll never "does nothing": for the final index let `outStart` reach ~`start + span*0.95`.
   - **Smooth the scrub:** `:150` — `const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })` and pass `smooth` to `PinnedSlide`/`ProgressBar` so the wipe and cross-fades glide (§3/§6).
   - `:134` — add `ease: EASE_OUT_SOFT` and switch `-40px` → `VIEWPORT` on the fallback card.

### 06 Experts — [`sections/experts.tsx`](../src/components/sections/experts.tsx)
1. **Now:** Local `const easeOut = [0.22, 1, 0.36, 1]` (`:36`) — a **verbatim re-declaration of `EASE_OUT_SOFT`** — used at `:49,:78,:79,:113,:132`. Header `y:16, duration 0.6, margin:'-80px'` ✓. Discipline cards `y:18, duration 0.55, center-out stagger delay abs(i-CENTER)*0.08, margin:'-60px'` (`:75-78`). Panel `y:16, duration 0.5, delay i*0.06, margin:'-40px'` (`:110-113`). Trust line `y:12, duration 0.6, delay 0.1, margin:'-40px'`.
2. **Verdict:** Values are all in-band and the center-out stagger is a nice touch — the only real issues are the **duplicated ease const** (should import) and **three different margins** (`-80/-60/-40`). Reduced-motion respected.
3. **Fix:** `:36` — delete local `easeOut`, `import { EASE_OUT_SOFT }` and replace usages. `:77,:112,:131` — standardize all to `VIEWPORT`.

### 07 Community — [`sections/community.tsx`](../src/components/sections/community.tsx)
1. **Now:** Local `const ease = [0.22, 1, 0.36, 1]` (`:25`, again a copy of `EASE_OUT_SOFT`). Left column `y:20, duration 0.6, ease`, `{once:true}` (`:33-37`). Cards `x: ∓40, duration 1, delay i*0.15, ease: [0.4,0,0.2,1]` (Material curve), `margin:'-60px'` (`:69-72`). Caption `x:20, duration 0.5, delay cards.length*0.1` (`:87-91`).
2. **Verdict:** The cards break three numbers at once — **travel `x:40` > 32px band**, **stagger `0.15` > 0.14**, and an **ad-hoc `[0.4,0,0.2,1]`** instead of the kit. `duration:1` is fine (slow = luxurious) but with 40px alternating-direction travel it feels heavy. Left column uses the duplicated local `ease` and no early margin.
3. **Fix:** `:72` — `x: ∓40` → `∓24`; `delay i*0.15` → `i*0.1`; `ease:[0.4,0,0.2,1]` → `EASE_OUT_SOFT`; `duration 1` → `0.7`. `:25` — remove local const, import `EASE_OUT_SOFT`. `:36` — `{once:true}` → `VIEWPORT`.

### 08 Testimonials — [`sections/testimonials.tsx`](../src/components/sections/testimonials.tsx) ⚠ no reduced-motion
1. **Now:** **No `useReducedMotion`.** Rating band `y:16`, no transition, `{once:true}` (`:23-27`). Quote cards `y:20, delay i*0.08`, **no duration/ease** (Framer default), `{once:true}` (`:54-59`).
2. **Verdict:** Every reveal is a bare default (~0.3s spring on `y`), so it fires faster and with a different curve than the kitted sections around it. Nothing degrades for reduced-motion.
3. **Fix:** Import `useReducedMotion`; set `initial` to opacity-only when `reduce`. `:27,:59` — add `transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.08 }}` and `viewport={VIEWPORT}`.

### 09 PricingPreview — [`sections/pricing-preview.tsx`](../src/components/sections/pricing-preview.tsx) ✅ mostly good
1. **Now:** Header `y:16, duration 0.6, EASE_OUT` (`:15-19`). Card `y:24, scale:0.97, duration 0.7, EASE_OUT`, `reduce` → opacity-only (`:32-36`). Payment methods opacity-only, no transition (`:86-89`). All `{ once:true }`.
2. **Verdict:** Correctly on-kit and reduced-motion safe. Playbook §9 explicitly says **leave pricing minimal** (conversion-critical) — so this is right. Only nits: missing `-80px` margins and the payment row's default transition.
3. **Fix:** `:18,:35,:89` — `{ once:true }` → `VIEWPORT`. `:86-89` — add `transition={{ duration: 0.6, ease: EASE_OUT }}`. Do **not** add scale/pin/parallax here.

### 10 FAQ — [`sections/faq.tsx`](../src/components/sections/faq.tsx) ⚠ no reduced-motion
1. **Now:** **No `useReducedMotion`.** Header `y:16`, no transition, `{once:true}` (`:109-113`). Category columns `y:16, delay categoryIndex*0.1`, no duration/ease (`:130-135`). Accordion body animates `height: 0 → 'auto'` + opacity, `duration 0.25, ease:'easeOut'` (`:79-83`). Contact line opacity-only, no transition (`:156-159`).
2. **Verdict:** Bare-default reveals again; no reduced-motion. The accordion animates **`height`** (a layout property, against §8 transform-only) — acceptable/standard for an accordion and short (0.25s), but worth noting. No early margins.
3. **Fix:** Import `useReducedMotion` (gate the reveals; the accordion open/close is user-intent so it can stay). `:113,:135,:159` — add `transition={{ duration: 0.6, ease: EASE_OUT }}` (+ `delay`) and `viewport={VIEWPORT}`. Optionally use a `scaleY`/clip reveal instead of `height` for the accordion.

### 11 CTA — [`sections/cta.tsx`](../src/components/sections/cta.tsx)
1. **Now:** Content block `y:16, duration 0.6, ease: [0.4, 0, 0.2, 1]` (Material curve) + `{once:true}` (`:46-50`). Pointer spotlight is gated behind `!reduce` (`:38`) and uses `useMotionValue`/`useMotionTemplate` (no re-render).
2. **Verdict:** Spotlight is well-built and reduced-motion safe. The single reveal uses an **ad-hoc `[0.4,0,0.2,1]`** instead of the kit and fires at the fold edge.
3. **Fix:** `:50` — `ease: [0.4,0,0.2,1]` → `ease: EASE_OUT`; `:49` — `{once:true}` → `VIEWPORT`.

> **Out of scope (not rendered on the homepage):** `progress-tracking.tsx`, `add-ons.tsx`, `muscle-map.tsx` are dormant/funnel-only but share the same `ease:'easeOut'` / ad-hoc-bezier anti-patterns — fold them into the same cleanup if they ever ship.

---

## Cross-cutting findings

### A. Easing/duration inconsistency — every offender
The kit intends **one** easing language. Offenders to unify onto `EASE_OUT` / `EASE_OUT_SOFT`:

| File:line | What it uses | Should be |
|---|---|---|
| `old-vs-new.tsx:30` | `ease: 'easeOut'` (raw) | `EASE_OUT_SOFT` |
| `how-it-works.tsx:134` | `ease: 'easeOut'` (raw) | `EASE_OUT` |
| `how-it-works.tsx:156` | `ease: 'easeOut'` (raw) | `EASE_OUT` |
| `facial-analysis.tsx:25` | local `[0.22,0.61,0.36,1]` (bespoke) | delete → `EASE_OUT_SOFT` |
| `experts.tsx:36` | local `easeOut = [0.22,1,0.36,1]` (dupe) | import `EASE_OUT_SOFT` |
| `community.tsx:25` | local `ease = [0.22,1,0.36,1]` (dupe) | import `EASE_OUT_SOFT` |
| `community.tsx:72` | `ease: [0.4,0,0.2,1]` (Material) | `EASE_OUT_SOFT` |
| `cta.tsx:50` | `ease: [0.4,0,0.2,1]` (Material) | `EASE_OUT` |
| `faq.tsx:83` | `ease: 'easeOut'` (raw) | `EASE_OUT` (accordion; low pri) |

**Missing-transition reveals** (Framer default ~0.3s, spring-on-`y` — no curve, too fast): `personalization-factors.tsx:83`, `living-analysis.tsx:52,84,248`, `testimonials.tsx:23,54`, `faq.tsx:109,130,156`, `pricing-preview.tsx:86`. Give each an explicit `duration 0.6–0.7 + EASE_OUT(_SOFT)`.

The playbook §6 presets are worth adding to `src/lib/motion.ts` so nobody re-invents timing:
```ts
export const REVEAL       = { duration: 0.7, ease: EASE_OUT_SOFT } as const
export const STAGGER      = { staggerChildren: 0.1, delayChildren: 0.05 } as const
export const SCRUB_SPRING = { stiffness: 90, damping: 28, restDelta: 0.001 } as const
```

### B. `whileInView` viewport settings
`VIEWPORT = { once: true, margin: '-80px' }` is used in **zero** rendered sections. Instead:
- **`{ once: true }` with no margin (18 reveals)** → fire at the fold edge, not ~80px early: `old-vs-new:29`, `how-it-works:133,155`, `personalization-factors:85`, `living-analysis:55,87,252`, `testimonials:26,58`, `community:36,90`, `faq:112,134,159`, `pricing-preview:18,35,89`, `cta:49`.
- **Ad-hoc margins** `-60px` (`old-vs-new`, `personalization-factors`, `facial-analysis`, `experts`, `community`) and `-40px` (`experts`, `transformations`).
- Correct `-80px` only in `facial-analysis:85` and `experts:49,50`.

Replace all with the shared `VIEWPORT`. `once: true` is at least respected everywhere (good — no twitchy re-triggers on scroll-up).

### C. Transformations empty-space diagnosis
See section 05b above. Root cause = **`vh` section height vs `svh` pin height** (release ≠ progress-1 on mobile) + **over-long 360vh budget with a static hold-tail**. Fix = unify the unit (`svh` on both), cut the budget to ~`count*72`, extend the last slide's wipe to ~0.95 of its band, and wrap progress in `useSpring`.

### D. Missing scrub smoothing (`useScroll` + `useTransform`, no `useSpring`)
`useSpring` appears in **no section**. Both scrubs would benefit:
- **`transformations.tsx:150`** — the marquee wipe/cross-fade tracks the wheel 1:1. Wrap `scrollYProgress` in `useSpring({ stiffness: 90, damping: 28 })`. Highest payoff (it's the signature scroll moment).
- **`facial-analysis.tsx:76`** — the self-drawing face map tracks 1:1. Same spring wrap before `useTransform`.
- `how-it-works.tsx:50` uses `useScroll` only to pick a **discrete** step index — a spring doesn't apply, but add center-crossing hysteresis to stop boundary flicker.

### E. prefers-reduced-motion coverage
- **Respect it:** hero, old-vs-new, how-it-works, personalization-factors, facial-analysis, transformations, experts, community, pricing-preview, cta.
- **Do NOT (fix these):** `living-analysis.tsx` (no hook at all — reveals + `scan-spin`/`pulse-ring` loops all run), `testimonials.tsx` (no hook), `faq.tsx` (no hook). Header also lacks it on its mount `y`.
- Even in sections that import the hook, continuous CSS loops ignore it: `old-vs-new` radar `pulse-ring` (`:104-111`), `living-analysis` `scan-spin`/`pulse-ring`. §8: no autoplaying loops under reduced-motion.

### F. Restraint / "one hero moment"
Playbook §9 designates the **Face Map / analysis console** as the single pinned Apple moment. Today the page stacks three scroll-heavy beats in a row — `how-it-works` (pinned 425vh), `facial-analysis` (scrub), `transformations` (pinned 360vh) — plus the `living-analysis` console. Consider demoting one pin to a quiet §1 reveal so the remaining pin lands.

---

## Prioritized punch-list (highest visual impact first)

1. **Unify all easings onto the kit** — `facial-analysis.tsx:25` delete `[0.22,0.61,0.36,1]`→`EASE_OUT_SOFT`; `community.tsx:72` & `cta.tsx:50` `[0.4,0,0.2,1]`→`EASE_OUT(_SOFT)`; `experts.tsx:36` & `community.tsx:25` delete local dupes → `import EASE_OUT_SOFT`; `old-vs-new.tsx:30`, `how-it-works.tsx:134,156` `'easeOut'`→`EASE_OUT`. *(One curve across the page = the cheapest premium upgrade.)*
2. **Give the ~18 default-transition reveals real timing** — add `transition={{ duration: 0.6–0.7, ease: EASE_OUT_SOFT, delay }}` to `living-analysis.tsx:52,84,248`, `testimonials.tsx:23,54`, `faq.tsx:109,130,156`, `personalization-factors.tsx:83`, `pricing-preview.tsx:86`.
3. **Fix the Transformations empty-space bug** — `transformations.tsx:174` `height: ${count*90}vh` → `${count*72}svh` (match the `svh` pin at `:175`), and extend the final slide's `outStart` (`:53`) to ~`start + span*0.95`. *(Removes the held/blank tail and tightens pacing.)*
4. **Smooth the two scrubs with `useSpring`** — `transformations.tsx:150` and `facial-analysis.tsx:76`: wrap `scrollYProgress` in `useSpring({ stiffness: 90, damping: 28, restDelta: 0.001 })` before `useTransform`.
5. **Add reduced-motion to the 3 sections missing it** — `living-analysis.tsx`, `testimonials.tsx`, `faq.tsx`: import `useReducedMotion`, gate `initial` transforms to opacity-only, and suspend the `scan-spin`/`pulse-ring` loops when `reduce`.
6. **Standardize every viewport onto `VIEWPORT`** — replace all `{ once: true }` (18 sites listed in §B) and ad-hoc `-40/-60px` margins with the shared `VIEWPORT` so reveals fire ~80px early everywhere.
7. **Tame the Community cards** — `community.tsx:72`: `x: ∓40`→`∓24` (into the ≤32 band), `delay i*0.15`→`i*0.1`, `duration 1`→`0.7`.
8. **Tighten the two slow outliers** — `personalization-factors.tsx:70-77` tag stagger `i*0.45`→`i*0.12` (and `scale 0.5`→`0.8` at `:14`); `how-it-works.tsx:60` pin height `85vh`→`~78vh` to drop under the ~4-screen ceiling, and nudge swap durations `0.4/0.45`→`0.5` (`:78,:95`).

*All references are read-only observations; no code or git state was modified.*
