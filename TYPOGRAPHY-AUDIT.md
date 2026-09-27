# Typography, contrast and spacing audit
**2026-09-27 · homepage, measured at 360 / 390 / 1280 / 1440px**

> **Status 2026-09-27: Tiers 1, 2 and 3 applied.** Measured contrast failures
> went **38 → 5 at mobile** and **34 → 6 at desktop**, with the six remaining
> sitting at 4.33–4.50 against a 4.5 bar. Tier 3 (the 21 near-whites, the
> hairline and shadow tokens, the half-pixel sizes) and Tier 4 (touch targets)
> are partly done — see below. Tier 4 (touch targets) is **not** done.
> Notes on what was deliberately left alone are at the foot of the
> Recommended order.
>
> **Tier 3 as executed, and where it differs from what this document
> originally proposed.** The "21 near-whites → 2 tokens" figure was too blunt:
> most of those values are stops inside deliberate accent gradients (the
> context-fit scenario cards, the before/after plate, the difference plate,
> the pricing ramp), and collapsing them would have destroyed real designs.
> What actually collapsed was the six **flat** panel and band grounds, onto
> `--c-band-bg` and a new `--c-panel-bg`. Likewise the shadows: most are
> per-interaction glows and active-state lifts, not card surfaces, so only the
> pricing card's sky-blue haze moved to `--shadow-card`. And the half-pixel
> collapse was limited to a 10px floor plus two off-scale one-offs — 13.5,
> 12.5 and 14.5px are 55 uses of legitimate steps, and rewriting them would
> churn line-wrapping across the page for no legibility gain.

## How this was produced

Two independent passes, then cross-checked against each other:

1. **Instrumented the running page.** Every distinct text style on the homepage
   (145 at mobile, 144 at desktop) was probed in headless Chrome. Backgrounds
   came from Chrome's own `CSS.getBackgroundColors` — the API DevTools uses —
   not from my own ancestor-walking, which got it wrong twice before I caught
   it. Ratios are WCAG relative luminance, computed, not eyeballed.
2. **Read every section's source**, in four parallel passes.

Where the two disagreed I re-measured. Three claims from the source pass did
not survive that and are listed under **Corrected** at the end, so you don't
act on them.

**Confidence key** — `MEASURED` = read off the live page. `SAMPLED` = computed
against the actual image/video asset. `COMPUTED` = arithmetic from the CSS,
layout not observed.

---

## The finding, in one line

**Everything small on this page is also everything light.** Ten greys carry
text; the five that fail contrast are attached to the five smallest sizes, so
the two problems compound instead of trading off. 38 of 145 text styles at
mobile fail WCAG AA, and almost all of them are labels, indices and
disclaimers — the tier that explains what everything else is.

---

## 1. Contrast — the systemic one

`MEASURED`. Worst offenders on solid grounds, mobile. Every row is real text,
not decoration.

| Ratio | Size | Colour | Where | What it is |
|---|---|---|---|---|
| **1.69** | 10px | `ink/25` | believe | card index `01`–`04` |
| **1.90** | 10px | `ink/30` | face-map | the ledger numbering, `01`–`05` |
| **2.42** | 10px | `#94A3B8` | journey | the **"Where we stop"** label |
| **2.45** | 9.5px | `ink/40` | footer | `Explore` / column headings |
| **2.45** | 11.5px | `ink/40` | proof | *"Non-surgical changes only…"* — the legal line |
| **2.45** | 14px | `ink/40` | guidance | *"Not just 'wear sunscreen.'"* — half of every row |
| **2.51** | 10.5px | `#98A6AB` | trust-bar | the four things every plan includes |
| **2.56** | 10px | `#94A3B8` | before-after | `4 WEEKS` durations |
| **2.81** | 11px | `ink/45` | believe | the vertical spine word on closed cards |
| **2.85** | 11px | `#999999` | **every section** | the eyebrow pill |
| **3.15** | 12.5–14px | `#7E959B` | what-we-map, context-factors | every row summary |
| **3.68** | 13px | `ink/55` | believe | inactive tab labels |

Same band, in the offer and close sections `MEASURED`:

| Ratio | Size | Colour | Where | What it is |
|---|---|---|---|---|
| **1.69** | 10px | `ink/25` | faq | category index numerals |
| **2.81** | 10.5px | `ink/45` | pricing | `UPI` / payment labels |
| **3.12** | 10px | `rgba(61,107,118,.7)` | pricing | *"Your Map so far"* — the running-total label |
| **3.24** | 12.5px | `ink/50` | cta | *"Full refund before your session"* |
| **3.76** | 10px | `ink/55` | guidance | the row category labels |

Two that need naming specially:

- **`#999999` in `section-tag.tsx:58` is 2.85:1 and it labels every section on
  the page.** One value, fixed once, pays across the whole site.
- **`face-map.tsx:386`** — the sample disclaimer the file's own header comment
  calls load-bearing (*"every surface that renders it must carry the
  sampleNotice verbatim"*) is `ink/40` at 11px = **2.42:1**. Present but
  unreadable is the worst of both outcomes.

`SAMPLED` — two cases where the background is an asset, so arithmetic alone
couldn't answer it:

- **proof.tsx BEFORE/AFTER labels.** I sampled all six webps at the label
  position: every one averages `#B2C2C8`. `text-white/85` over that is
  **1.70:1**, and the `drop-shadow` is Tailwind's default (black/10), which
  contributes nothing. Invisible on the one asset the section exists to sell.
- **voices.tsx over real video frames.** The headline is fine — worst frame
  4.9:1 desktop, 7.67:1 mobile. But the `white/70`-band text bottoms out at
  **2.89:1 on the mobile clip**, so the city label (`white/.72`, 10px) fails
  against bright frames.

### Recommendation — adopt a floor, then apply it mechanically

> **Nothing below 13px goes lighter than `ink/65` (5.16:1). Nothing at all goes
> lighter than `ink/60` (4.39:1). The `ink/25`–`ink/45` band is reserved for
> rules, glyphs and ornament.**

That single rule resolves 30 of the 38 failures. It is a find-and-replace, not
a redesign, and the hierarchy survives — body text at `ink/80` is 8.6:1, still
plainly dominant over a 5.16:1 label.

---

## 2. Two layout bugs I could reproduce

**`VERIFIED` — the Believe filmstrip clips its own content.**
Predicted by the source pass as 360px-only; I measured it and it is worse:

| viewport | cards clipped | worst overflow |
|---|---|---|
| 360px | 2 of 4 | **19px** — *"Leads the session, connects the findin…"* |
| 390px | 1 of 4 | **10px** — *"Reviews relevant skin, routine and app…"* |

The open card is 217×402 at 360px holding 421px of content, under
`overflow-hidden`. The last Expertise row is silently cut on the most common
phone widths. Fix: give the text block `flex-1 min-h-0` instead of `flex-none`
and drop the photo floor to `min-h-[104px]`.

**`MEASURED` — hero headline never scales.**
`hero.tsx:86` is `text-[34px]` with no responsive step. An arbitrary-value
utility beats the `@layer base` `h1` rule regardless of media query, so the
hero stays 34px at 1920px while every section `h2` below it reaches 40px. The
page's largest promise is the smallest heading on the screen.
Fix: `text-[34px] md:text-[44px] lg:text-[56px]`.

---

## 3. Ungoverned palette

`MEASURED`. Counted across all section and layout files:

- **21 distinct near-white hex values** are hard-coded as grounds — `#F6F8F9`,
  `#FAFAFA`, `#FDFDFD`, `#F8FAFA`, `#F7FAF2`, `#F7F9FA`, `#F7F9F9`, `#F7F6FA`,
  `#F6F7F9`, `#F4F7F8`, `#F4F6F6`, `#F4F5F6`, `#F1F4EC`, `#F1F3F5` and more —
  while `--c-band-bg` (`#EFF4F5`) and `mist` (`#f5f5f5`), the two tokens
  written for exactly this job, go **completely unused**. Adjacent sections
  therefore read as slightly different whites rather than one surface. This is
  the source of the "dirty" impression.
- **Ten greys carry text**: `#999999`, `#98A6AB`, `#7E959B`, `#5C7278`,
  `#8C9096`, `#666666`, `ink/40`, `/45`, `/55`, `/60`, plus a slate family
  (`#94A3B8`/`#64748B`/`#475569`) in journey and facial-expertise.
- **Four different hairlines** in four adjacent sections — `rgba(61,107,118,.1)`,
  `rgba(10,10,10,.045)`, `rgba(30,53,59,.08)`, `rgba(30,53,59,.1)` — teal-black,
  pure black and two blue-blacks, while `--shadow-card` and `border-soft` go
  unused by all of them.

Worst single instance: `difference.tsx:42`, `border-[#f0f0f0]` on `bg-[#fafafa]`
= **1.09:1**. The left comparison card has no perceptible edge at all, which is
why it reads as a smudge beside the right card's crisp lip.

---

## 4. Type scale

`MEASURED`. **19 distinct px sizes** in body copy, including six half-pixel
values (8.5, 10.5, 11.5, 13.5, 15.5) that exist nowhere else in the system.

- `facial-expertise.tsx` alone runs **eight sizes in one four-card set**:
  8.5 / 9 / 10.5 / 11.5 / 12 / 13 / 14 / 16px. Four are below 13px.
- `face-map.tsx` has **nine micro-labels in five sizes and six trackings**
  (0.1 / 0.12 / 0.16 / 0.18 / 0.2 / 0.22em) — no scale at all.
- Three adjacent sections size the same object three ways: a card title is
  16px (facial-expertise), 15.5px (what-we-map), 21px (context-factors).
- Believe's four tab panels swap into one slot at 14.5 / 14 / 15.5px, so
  **tapping between tabs visibly re-sizes the page**.

`face-map.tsx:357` sets an **8.5px** chip — the smallest type on the site,
below any practical floor on a phone.

---

## 5. Spacing

`MEASURED` at 390px. Vertical rhythm is actually good — 17 of 21 sections are
a clean 56/56. The outliers:

| Section | padding t/b | note |
|---|---|---|
| problem | **70 / 40** | asymmetric, doesn't scale with breakpoint, only section using neither `.section` nor `container-main` |
| journey | **80 / 80** | 40% taller than neighbours at desktop |
| difference | 56 / **96** | deliberate (added this week) |
| cta | **16** / 64 | top padding is a quarter of everything else |
| sell-one-thing | 40 / 40 | connector, probably fine |

Header-to-content gap is the inconsistent one: `SectionHeading` uses 48/64px,
but `what-we-map` and `context-factors` hand-roll it at 32/40px, and
`guidance.tsx:29` uses 32px — roughly half its neighbours.

**Two dead-class bugs found by the source pass, both the same mistake:** in
`context-fit.tsx:451` and `what-we-map.tsx:65`, type classes sit on a `<Reveal>`
wrapper around a bare `<p>`. The `p` base rule in `globals.css:126` beats
inheritance, so the intended `text-[14px]` and the intended tonal step are both
dead — those paragraphs render at 15px/`#666` by coincidence.

`MEASURED` — tight leading on real wrapping copy: `context-factors` folded rows
at 11.5px/1.35, `context-fit` at 13.5px/1.35, `journey` meta at 13px/1.4, and
`what-we-map` summaries at 12.5px/1.35. All below the 1.5 body floor.

---

## 6. Phone-specific dimensions

`MEASURED` at 360/390px. Good news first: **no horizontal page overflow at any
width**, and no clipped fixed-height boxes outside the Believe bug above.

**Touch targets under 44px** — 14 distinct, including:

| Target | Size |
|---|---|
| `Start My Plan` (header) | 108 × **34** |
| Believe tab rail (×4) | ~110 × **36** |
| Problem advice bubbles (×6) | ~115 × **25–40** |
| context-factors rail arrows | **32 × 32** |
| Footer social buttons | **32 × 32** |
| context-fit pagination dots | **6 × 6** |
| Believe closed spines | **28–31** wide |

The pagination dots at 6×6px are the worst. The Problem bubbles are the
section's primary interaction — tap to dismiss — at ~25px tall, rotated.

**Cramped columns at 360px** `MEASURED`: money's cost lines run 20–21 characters
over 3–4 lines; `plan.tsx:86`'s `grid-cols-[90px_1fr]` leaves ~28 characters for
the text column.

**Over-long measure at desktop** `COMPUTED`: `SectionHeading`'s lede inherits
`max-w-3xl` (768px), giving **~96 characters** per line at 16px — well past the
75 ceiling. `face-map` hand-rolls the same header and caps at 576px (~72 chars).
Same job, two measures, 33% apart.

---

## 7. Three more verified bugs — offer and close sections

**`VERIFIED` — the white sheen on the Our way card broke its own labels.**
This is a regression introduced 2026-09-26. Computing the label against the
composited ground, before and after that change:

| Label | before the sheen | after |
|---|---|---|
| `Our way` (10px, `white/.7`) | 4.33:1 | **2.58:1** |
| `Paid once` (10px, solid white on `white/.14`) | ~3.6:1 | **2.88:1** |

The sheen is strongest at `0%` — exactly where the card's two smallest labels
sit. Fix: drop the sheen's top stop to `rgba(255,255,255,.12)` **and** raise
the muted whites from `.7` to `.85`. Together that puts the mono label near
4.4:1 and the GST line near 5.6:1 while keeping the lit-top look.

**`VERIFIED` — the pricing card's decorative rings are drawn over live copy.**
Measured at 390px:

- the top-right ring overlaps **"Complete MapMyFace Plan"** by 50 × 18px
- the bottom-left ring overlaps the summary paragraph by 29 × 29px

A 1px circle is drawn straight through three lines of text on the card that
takes the money. Fix: `hidden md:block` on both ring wrappers.

**`VERIFIED` — `border-ink/12` does not compile.** `12` is not on Tailwind's
opacity scale, so the class emits nothing and the element falls back to the
global `* { @apply border-border }` — I read the computed value off the live
page and it is `rgb(229,229,229)`, the fallback, not an ink alpha. The
intended stronger cap on the FAQ accordion simply does not exist. Three
occurrences: `faq.tsx:130`, `privacy-trust.tsx:68`, `privacy-trust.tsx:90`.
Fix: `/10` or `/15`, both of which compile.

Also in this group, worth knowing but lower:

- **The plan price scale runs backwards.** `money.tsx` renders it at
  **52px/weight 200 on mobile** and **29.6px/weight 300 on desktop** — the
  small screen gets the display size, and the two layouts read as different
  products. The same section also flips the refund `head`/`when` order between
  its two layouts.
- **Three "Start My Plan" buttons, three shapes**: navbar 13px pill, pricing
  `.btn-primary` 14px/radius 10, CTA 14.5px/radius 9999. Same label, same
  `/form` destination.
- **`voices.tsx:88` uses `100vh`** — on iOS that is the URL-bar-expanded
  height, so the arrows, counter and CTA sit under the Safari toolbar on first
  paint. `100svh` fixes it.
- **The pricing card's sky-blue rings** (`#38BDF8`/`#7DD3FC`) and its blue
  `shadow-[rgba(56,189,248,0.12)]` are off-palette against the sage-teal
  `--c-brand`. Flagging for completeness only — you explicitly asked for that
  sky gradient to be restored on 2026-09-26, so treat it as a decision, not a
  defect.

---

## Corrected — claims that did not survive measurement

Listed so you don't act on them:

1. **"The context-fit rail's first card is permanently unreachable at ≥1280px"**
   — overstated. `xl:justify-center` on an overflowing rail does push content
   past the origin, but measured at 1440px it clips card 0 by **2px**, and the
   scroll origin is reachable. Real, cosmetic, low priority.
2. **"`#5C7278` body text fails at 2.19:1"** — my own first probe said this and
   it was wrong. It sits on white: **5.08:1, passes.**
3. **"`#666666` fails at 1.28:1"** — same bug in my probe. Actually **5.74:1,
   passes.** `ink-muted` is fine and is the right target for the fixes above.

---

## Recommended order

**Tier 1 — highest value, lowest risk.** Mechanical, no layout moves.

1. `section-tag.tsx:58`, `#999999` → `ink-muted` `#666666`. One line, fixes the
   eyebrow on every section. **2.85:1 → 5.74:1.**
2. Apply the contrast floor: every `ink/25`–`ink/45` that carries *text* → `ink/65`;
   `#7E959B`/`#98A6AB` → `#5C7278` (already present in both files). ~30 failures.
3. `journey` "Where we stop" label and `before-after` durations: `#94A3B8` →
   `#64748B`. Keep `#94A3B8` for the crop marks — that's the one place it's
   genuinely decorative.
4. proof BEFORE/AFTER labels: give them a ground —
   `rounded-full bg-black/55 px-2 py-0.5 text-white` → **8.0:1**.

**Tier 2 — bugs, all verified on the live page.**

5. Pricing card rings drawn over live copy at 390px — `hidden md:block`.
6. The Our way sheen regression — two stops and two alphas.
7. `border-ink/12` in three places — does not compile.
8. Believe filmstrip clipping (verified at both 360 and 390).
9. Hero headline responsive step.
10. The two dead-class `<p>` wrappers.

**Tier 3 — the system, worth doing before the page grows further.**

8. Adopt `--c-band-bg` and `mist`; retire the 21 hard-coded near-whites.
9. One hairline token, one `--shadow-card`, everywhere.
10. Set a type floor of 11px and collapse the half-pixel sizes.
11. Cap the lede measure at `62ch` in `section-heading.tsx`.

**Tier 4 — touch targets.** 44px minimum, cheapest via transparent `::before`
hit areas so nothing visually moves.

### Left alone on purpose

- **journey's `SLATE_500` body text** (4.50:1, i.e. on the line) — you asked
  for slate-600/slate-500 in that timeline specifically on 2026-09-26, so it
  stays. Only its 10px "Where we stop" label moved, to slate-600.
- **Icons, chevrons, ticks and dot separators** keep their `ink/25`–`ink/40`.
  That band is what the floor reserves for ornament; six such uses remain and
  all of them are glyphs, not text.

---

*Sections audited: hero, trust-bar, proof, problem, difference, plan,
facial-expertise, believe, what-we-map, context-factors, context-fit, journey,
face-map, guidance, before-after, voices, pricing-preview, money, faq, cta,
header, footer.*
