# The Apple Scroll Playbook

How apple.com product pages (iPhone, AirPods Pro, Mac, Vision Pro, the "Mac" / "AirPods" landing pages) create their signature **slow, smooth, premium** scroll — and every technique translated into copy-pasteable patterns for **our stack**.

**Stack this is written for:** Next.js 14 (App Router, `src/`), Tailwind, Framer Motion v11 (`framer-motion@^11.5.4`), React 18. Path alias `@/*` → `./src/*`. We already ship a motion kit at [`src/lib/motion.ts`](../src/lib/motion.ts) — this playbook builds on it, it does not replace it.

> **Mental model — what "the Apple feel" actually is.** It is not one trick; it is **restraint + native scroll + one hero moment**. Apple does **not** hijack or replace the scrollbar. They let the OS scroll natively and *read* the scroll position to drive `transform`/`opacity` (and, on newer pages, a scrubbed `<video>` or a frame-by-frame `<canvas>`). The "expensive" feeling comes from four disciplines applied consistently: (1) **long, soft ease-out curves** with a gentle tail; (2) **generous spacing and slow pacing** so nothing is rushed; (3) **compositor-only animation** (`transform`/`opacity`) so it never stutters; and (4) **one signature pinned/scrubbed moment per page**, surrounded by calm, quiet reveals. Copying *all* of Apple's effects at once reads as noise. Copying their *discipline* reads as premium.
>
> Apple uses **native scroll + `position: sticky` + JS reading `scroll` events**, layering transparent canvas/PNG masks over video and driving `transform: scale()/translate()` from scroll — confirmed by reverse-engineering their pages (see Sources). No full-page scroll-snap on their long-form narrative pages.

---

## Table of contents

1. [Scroll-linked reveals](#1-scroll-linked-reveals) ⭐ ship first
2. [Sticky / pinned "scrollytelling"](#2-sticky--pinned-scrollytelling) ⭐ the core Apple move
3. [Scroll-driven image sequences (canvas scrub)](#3-scroll-driven-image-sequences-canvas-scrub) — heavy; know the tradeoffs
4. [Layered parallax on scroll](#4-layered-parallax-on-scroll)
5. [Text transitions (word/line reveals, blur-in, color shift)](#5-text-transitions)
6. [Pacing & feel — the numbers that make it "slow and expensive"](#6-pacing--feel)
7. [Snap / section transitions](#7-snap--section-transitions)
8. [Performance discipline](#8-performance-discipline)
9. [Applying this to the face-yoga landing page](#9-applying-this-to-the-face-yoga-landing-page)
10. [Shared foundations & API cheat-sheet](#shared-foundations--api-cheat-sheet)
11. [Sources](#sources)

**Effort-to-payoff order:** ship **#1** everywhere (quiet reveals), do **#2 exactly once** (the signature moment), add **#5** to one or two big headlines, and treat **#3/#4** as optional polish. Reserve canvas image sequences for a showpiece only — they are the heaviest thing in this document.

---

## Shared foundations & API cheat-sheet

Read this first — every snippet below assumes it.

### Our existing easing kit (`src/lib/motion.ts`)

We already have the right curves. Use them; do not invent new ones per section.

```ts
export const EASE_OUT      = [0.16, 1, 0.3, 1]  as const // decisive arrival — reveal workhorse
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const // gentler, for large elements
export const EASE_IN_OUT   = [0.65, 0, 0.35, 1] as const // symmetric — parallax / scroll-linked
export const VIEWPORT      = { once: true, margin: '-80px' } as const
export function useIsDesktop(query = '(min-width: 768px)') { /* SSR-safe media-query gate */ }
```

These are **long-tailed ease-outs** — exactly the Apple shape: a quick start that decelerates into a long, soft settle. `EASE_OUT` `[0.16, 1, 0.3, 1]` overshoots toward 1 early then eases in gently; that "arrives and relaxes" motion is the premium tell. Keep them. (Apple's own UI famously leans on ease-out curves in the `cubic-bezier(0.4, 0, 0.2, 1)` family for the same reason — fast for responsiveness, slow settle for polish. Our curves are a softer, more luxurious variant of that idea.)

### The four Framer Motion v11 primitives you need

| Primitive | What it does | Import |
|---|---|---|
| `whileInView` + `viewport` | Fire an animation **once** when an element enters view (uses a pooled `IntersectionObserver`). | `motion` |
| `useScroll` | Returns `scrollYProgress` (0→1) for the page or a `target` element. Runs on the browser's native `ScrollTimeline` where available. | `framer-motion` |
| `useTransform` | Maps one motion value's range onto another (numbers, colors, strings like `blur(10px)`, `-15%`). | `framer-motion` |
| `useSpring` | Wraps a motion value in physics so scrubbed values **lag and glide** instead of snapping — the single biggest "buttery" upgrade. | `framer-motion` |

> **Package note.** Motion (formerly Framer Motion) is `motion/react` in its newest form, but **we are pinned to `framer-motion@^11.5.4`, so every import in this doc uses `from 'framer-motion'`.** Don't switch import paths.

### `useScroll` offset syntax (memorize this)

`useScroll({ target, offset: [enter, leave] })`. Each offset string is `"<target-edge> <container-edge>"`:

- Edges: `start` = `0`, `center` = `0.5`, `end` = `1`. Also accepts numbers `0`–`1`, `px`, `%`, `vh`/`vw`.
- `'start end'` → target's **top** meets viewport's **bottom** (element is *just entering* from below) → progress `0`.
- `'end start'` → target's **bottom** meets viewport's **top** (element has *fully left* upward) → progress `1`.
- Default is `['start start', 'end end']`.
- **`['start end', 'end start']`** tracks an element across its *entire* passage through the viewport — this is what our `facial-analysis.tsx` already uses for the face-map draw.
- **Gotcha:** any CSS `transform` on the target or its ancestors is **ignored** when measuring progress — measurement is layout-based only. Don't wrap a `useScroll` target in a transformed parent and expect correct numbers.

### Reduced-motion — non-negotiable

Every effect degrades. We already import Framer's hook in most sections:

```tsx
import { useReducedMotion } from 'framer-motion' // returns true when the user opts out (SSR-safe)
const reduce = useReducedMotion()
```

Rules when `reduce === true`:
- **Kill parallax entirely.** Differential-rate motion is the #1 vestibular-disorder trigger (nausea, dizziness) — web.dev and WCAG 2.3.3 both single it out.
- Replace `transform` reveals (`y`, `scale`) with a **plain opacity fade**, or show the final state instantly.
- No scrubbed video/canvas motion — show a **single static poster frame**.
- Never autoplay looping motion.

### Performance rules (see [§8](#8-performance-discipline))

Animate **only `transform` and `opacity`**. Add `will-change: transform` (Tailwind `will-change-transform`) *only* to continuously-moving layers, and gate heavy effects (pins, parallax, scrubbing) behind `useIsDesktop()` so mid-range Android runs the static fallback.

---

## 1. Scroll-linked reveals

**What it looks/feels like.** As you scroll, each block **fades up** a short distance (16–32px) and settles with a soft deceleration. On Apple pages the reveal is *slow* (0.6–1s), understated (small travel, sometimes a hair of blur or scale), and fires slightly **before** the element is fully on-screen so the page never feels like it's "catching up." Nothing bounces.

**When to use it.** The default for 90% of sections — headings, cards, lists, images. This is the quiet baseline that makes the loud moments ([§2](#2-sticky--pinned-scrollytelling), [§3](#3-scroll-driven-image-sequences-canvas-scrub)) land.

### 1a. One-shot reveal (`whileInView`) — the workhorse

Use for anything that just needs to appear once. This matches what `pricing-preview.tsx` and `facial-analysis.tsx` already do.

```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT_SOFT, VIEWPORT } from '@/lib/motion'

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}                     // { once: true, margin: '-80px' } → fires ~80px early, never re-triggers
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay }}
    >
      {children}
    </motion.div>
  )
}
```

- `viewport.margin: '-80px'` shrinks the trigger box so the reveal starts *before* the element reaches the fold edge — the Apple "already settling as it arrives" feel. Want it to wait until more of the element shows? Use `viewport={{ once: true, amount: 0.3 }}` (30% visible).
- `once: true` is what makes it feel calm — Apple never re-animates on scroll-up.

**Stagger a group** (cards, list items) — variants + `staggerChildren` beats manual `delay: i * 0.1` because timing lives in one place:

```tsx
const group = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const item  = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

<motion.ul variants={group} initial="hidden" whileInView="show" viewport={VIEWPORT}>
  {items.map((t) => <motion.li key={t} variants={item}>{t}</motion.li>)}
</motion.ul>
```

### 1b. Continuous reveal (`useScroll` scrub) — the premium upgrade

`whileInView` snaps from A→B on one trigger. For the Apple feel where an element **fades/rises in lockstep with the scroll wheel** (reversible, tied to exact position), scrub it with `useScroll` + `useTransform`. This is strictly nicer for hero-adjacent, large elements.

```tsx
'use client'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function ScrubReveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  // Smooth the raw progress so it glides instead of tracking the wheel 1:1.
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  const opacity = useTransform(p, [0, 1], [0, 1])
  const y       = useTransform(p, [0, 1], [40, 0])
  const blur    = useTransform(p, [0, 1], ['blur(6px)', 'blur(0px)'])

  if (reduce) return <div ref={ref}>{children}</div>
  return <motion.div ref={ref} style={{ opacity, y, filter: blur }}>{children}</motion.div>
}
```

- `offset: ['start end', 'center center']` → fully revealed by the time the element reaches the vertical center. Reveal completes mid-screen, not at the very top edge — feels intentional.
- The `useSpring` wrap is the difference between "fine" and "expensive." Lower `stiffness` (60–90) = more luxurious lag.

**Perf / mobile / reduced-motion.** `whileInView` uses a *pooled* IntersectionObserver — cheap even with dozens on a page. `useScroll` is more work per element (it measures layout + samples scroll), so prefer `whileInView` as the default and reserve `useScroll` scrubs for a handful of showpiece blocks. `filter: blur()` is GPU-composited but **not free on low-end Android** — drop the blur channel (keep opacity + y) on mobile, or gate it behind `useIsDesktop()`. When `reduce`, render children plain (done above).

---

## 2. Sticky / pinned "scrollytelling"

**This is the core Apple move.** ⭐

**What it looks/feels like.** A media element (a device, a render, the AirPods) **pins in place** and stays put for a screen or two while text/steps advance over or beside it — or the inverse: the copy pins while media scrolls past. The pinned element often *transforms* (scales, rotates, cross-fades) as scroll progresses. It reads as a short, self-contained "chapter."

**When to use it.** Once per page, for your single most important story beat. On our site that's the **Face Map / analysis console** ([§9](#9-applying-this-to-the-face-yoga-landing-page)). Overusing pins makes a page feel like it's fighting the user.

**The mechanism.** No JS pinning, no scroll-jacking. It's pure CSS `position: sticky` + Framer reading progress:

1. A **tall outer container** (e.g. `h-[300vh]`) with a `ref`. Its height *is* the scroll budget for the chapter — taller = slower.
2. An **inner `sticky top-0 h-screen`** wrapper. It sticks to the top of the viewport and stays there until the tall parent scrolls past — that's the "pin."
3. `useScroll({ target: outerRef, offset: ['start start', 'end end'] })` → `scrollYProgress` goes `0`→`1` across the whole pinned run.
4. `useTransform` slices that `0→1` into per-step opacities / positions / transforms.

```tsx
'use client'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useIsDesktop } from '@/lib/motion'

const STEPS = [
  { title: 'Overview',            body: 'Your three biggest strengths, in plain language.' },
  { title: 'Facial Map',          body: 'Your features read across 9 zones, with clear labels.' },
  { title: 'Appearance Protocol', body: 'What to start, stop, continue and do first.' },
]

export function PinnedStory() {
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // The pinned media can react to overall progress (e.g. a slow scale from 1 → 1.08).
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  // MOBILE / reduced-motion fallback: no pin — just stack the steps as normal reveals.
  if (!isDesktop || reduce) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-md rounded-3xl bg-mist aspect-[4/5]" />
        <div className="mt-8 space-y-10">
          {STEPS.map((s) => (
            <div key={s.title}>
              <h3 className="text-xl">{s.title}</h3>
              <p className="text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[300vh]">     {/* scroll budget = 3 screens */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 px-8 w-full">
          {/* LEFT: pinned media that subtly transforms across the whole run */}
          <motion.div style={{ scale: mediaScale }} className="rounded-3xl bg-mist aspect-[4/5]" />

          {/* RIGHT: steps that cross-fade as progress passes each band */}
          <div className="relative">
            {STEPS.map((s, i) => {
              // Divide 0→1 into equal bands; each step fades in, holds, fades out.
              const start = i / STEPS.length
              const end   = (i + 1) / STEPS.length
              const mid   = (start + end) / 2
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(
                scrollYProgress,
                [start, mid - 0.04, mid + 0.04, end],
                [0, 1, 1, 0],
              )
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(scrollYProgress, [start, mid], [24, 0])
              return (
                <motion.div key={s.title} style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
                  <span className="text-analysis-teal text-sm">{`0${i + 1}`}</span>
                  <h3 className="mt-2 text-2xl">{s.title}</h3>
                  <p className="mt-2 text-ink/70">{s.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

> **Hooks-in-map caveat.** Calling `useTransform` inside `.map()` works only because `STEPS` is a stable, constant-length array (the Rules of Hooks require a fixed count and order per render). If your steps are dynamic, precompute the transforms in a fixed-length parent or extract each step into its own `<Step>` component that calls the hook once. Never map over a variable-length list with hooks inside.

**The inverse (pin the copy, scroll the media).** Same skeleton, swap which column is `sticky`: put `className="sticky top-0 h-screen ..."` on the text column and let a tall stack of images/cards scroll past it. Apple uses both directions.

**Perf / mobile / reduced-motion.** `position: sticky` is GPU-cheap and the correct primitive (Motion's own docs say to pin with sticky, not JS). But **pinning eats vertical scroll distance**, which is disorienting on small screens — so we **disable the pin on mobile and for reduced-motion** and fall back to a normal vertical stack (shown above). Keep the tall container to `h-[250vh]`–`h-[400vh]`; more than ~4 screens per chapter feels slow in a bad way.

---

## 3. Scroll-driven image sequences (canvas scrub)

**The famous one** — and the one to think hardest before shipping.

**What it looks/feels like.** A product "video" that plays forward and backward *exactly* as fast as you scroll — AirPods rotating, an iPhone unfolding a feature. It's not a video element; it's **pre-rendered PNG/JPG frames drawn to a `<canvas>`**, one frame per scroll position. Because it's frames, scrubbing is perfectly smooth in both directions with no seek lag.

**When to use it.** A single hero showpiece where the *product itself* is the story and you can afford the bytes. For a conversion-focused landing page on Indian mobile networks, this is usually **the wrong tool** — see the tradeoffs, then the lighter alternative.

**The technique.**
1. Export N frames named `0001.jpg … 0148.jpg` (Apple's **AirPods Pro sequence is 148 frames**).
2. **Preload** every frame into an `Image[]` array so scrubbing never hits the network.
3. Read `scrollYProgress` → map to a **frame index** → `ctx.drawImage(frames[index], 0, 0)` inside `requestAnimationFrame`.

```tsx
'use client'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useIsDesktop } from '@/lib/motion'

const FRAME_COUNT = 148
const frameSrc = (i: number) => `/sequence/${String(i).padStart(4, '0')}.jpg` // 0001.jpg … 0148.jpg

export function CanvasSequence() {
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop()
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frames = useRef<HTMLImageElement[]>([])
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  // Preload + paint frame 0. Skip entirely on mobile / reduced-motion (static poster instead).
  useEffect(() => {
    if (!isDesktop || reduce) return
    const ctx = canvasRef.current?.getContext('2d')
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameSrc(i)
      frames.current[i - 1] = img
    }
    frames.current[0].onload = () => ctx?.drawImage(frames.current[0], 0, 0)
  }, [isDesktop, reduce])

  // Map scroll → frame index → drawImage, inside rAF so we never paint more than once per frame.
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!isDesktop || reduce) return
    const ctx = canvasRef.current?.getContext('2d')
    const index = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT))
    const img = frames.current[index]
    if (ctx && img?.complete) requestAnimationFrame(() => ctx.drawImage(img, 0, 0))
  })

  if (!isDesktop || reduce) {
    // Static hero frame — one request, no scrubbing.
    return <img src={frameSrc(1)} alt="" className="mx-auto w-full max-w-2xl" />
  }

  return (
    <div ref={wrapRef} className="relative h-[400vh]">      {/* tall = scroll budget for the sequence */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <canvas ref={canvasRef} width={1158} height={770} className="w-full max-w-3xl" />
      </div>
    </div>
  )
}
```

- `useMotionValueEvent(value, 'change', cb)` is the v11 way to run imperative side-effects (like `drawImage`) off a motion value.
- The tall wrapper + `sticky` canvas is the same pin skeleton as [§2](#2-sticky--pinned-scrollytelling).
- **Match `canvas width/height` to the source frame's pixel size** and size the display with CSS, so you draw at native resolution without stretching.

**The heavy tradeoffs — read before shipping.**
- **Asset weight is brutal.** CSS-Tricks' unoptimized demo of this exact technique made **1,609 requests totalling 55.8 MB.** Even a lean 148-frame sequence at reasonable quality is multiple MB. That competes directly with LCP and murders slow connections.
- **Apple's own mitigation:** they serve a **single fallback image** (not the sequence) on slow connections and mobile. Copy that discipline — the mobile branch above does exactly this.
- **Memory:** 148 decoded images held in an array is real RAM; low-end Android can evict them, causing re-decode jank.

**Lighter alternative — scrub a muted `<video>` instead.** Ship one small MP4 and drive its `currentTime` from scroll. One request, far fewer bytes, but seeking can micro-stutter on some browsers (frames aren't all keyframes) and iOS Safari is picky about programmatic playback.

```tsx
'use client'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'

export function VideoScrub() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v = videoRef.current
    if (v?.duration) v.currentTime = p * v.duration      // scrub, don't play
  })

  return (
    <div ref={wrapRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center">
        {/* muted + playsInline + preload are required for programmatic seek, esp. iOS */}
        <video ref={videoRef} muted playsInline preload="auto" className="w-full">
          <source src="/product-scrub.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
```

> **Encoding tip for scrub-video:** export with a **short GOP / many keyframes** (e.g. `-g 4` in ffmpeg) so `currentTime` seeks land on nearby keyframes and scrubbing stays smooth. Otherwise the browser decodes from the last keyframe and stutters. Wrap the whole effect in a `useSpring`-smoothed progress value for extra glide.

**Verdict for us:** skip full canvas sequences; if we ever want product-scrub drama, use the video-scrub variant on desktop only, with a static poster on mobile.

---

## 4. Layered parallax on scroll

**What it looks/feels like.** Foreground and background move at **different rates** as you scroll, creating depth — a headline drifting slowly while a photo behind it drifts slower (or opposite). Apple keeps this *subtle*: a few percent of differential travel, never a carnival.

**When to use it.** Background media behind a section, decorative accents, a hero that "sinks" as you leave it. Keep amplitude small (±5–15%).

**The mechanism.** `useTransform(scrollYProgress, [0, 1], [from, to])` with **different `to` ranges per layer** — bigger range = "closer / faster."

```tsx
'use client'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function ParallaxBand() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 })

  // Percent strings scale with element size and are GPU-friendly. Different ranges = different depths.
  const bgY = useTransform(smooth, [0, 1], ['-8%', '8%'])    // slow / far
  const fgY = useTransform(smooth, [0, 1], ['-18%', '18%'])   // fast / near

  if (reduce) {
    return <div ref={ref} className="relative h-[70vh] overflow-hidden"> {/* static: no differential motion */} </div>
  }

  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 bg-mist" />        {/* background */}
      <motion.h2 style={{ y: fgY }} className="relative flex h-full items-center justify-center text-4xl">
        Move differently
      </motion.h2>
    </div>
  )
}
```

- `offset: ['start end', 'end start']` gives a full-passage `0→1` so the drift spans the whole time the band is on screen.
- Use **`%` strings** (relative to element box) rather than fixed `px` so it behaves across breakpoints. Animate `y` (a `transform`), never `top`/`margin`.
- `useSpring` again for glide.

**Perf / mobile / reduced-motion.** Parallax is the single **most nausea-inducing** effect for vestibular-sensitive users — web.dev and WCAG 2.3.3 call it out by name. **Disable it whenever `reduce` is set** (shown) and consider disabling on mobile too (small screens make differential motion more jarring and the payoff is smaller). Keep every parallax layer on `transform` only.

---

## 5. Text transitions

**What it looks/feels like.** Big headlines assemble themselves: **line-by-line** rising out of a mask, or **word-by-word** fading/blurring in, sometimes with a **color shift** (muted → full, or a second clause staying grey). Apple uses this sparingly on marquee headlines, never on body copy.

**When to use it.** The hero headline and *maybe* one section headline. We already do the best-in-class version of this in [`hero.tsx`](../src/components/sections/hero.tsx) — a **line-mask reveal** on mount. This section shows the scroll-triggered variants.

### 5a. Line-by-line mask reveal (our hero pattern, scroll-triggered)

Each line sits in `overflow-hidden`; the inner span translates from `115%` up to `0`. The mask is what makes it feel like the words *emerge* rather than just slide.

```tsx
'use client'
import { motion } from 'framer-motion'
import { EASE_OUT, VIEWPORT } from '@/lib/motion'

const line = { hidden: { y: '115%' }, show: { y: '0%', transition: { duration: 0.7, ease: EASE_OUT } } }

export function MaskHeadline() {
  return (
    <motion.h2
      initial="hidden" whileInView="show" viewport={VIEWPORT}
      transition={{ staggerChildren: 0.12 }}
      className="text-4xl leading-[1.1]"
    >
      {['Understand your face.', 'Know what suits you.'].map((t) => (
        <span key={t} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]"> {/* mask + descender fix */}
          <motion.span variants={line} className="block">{t}</motion.span>
        </span>
      ))}
    </motion.h2>
  )
}
```

> The `pb-[0.15em] -mb-[0.15em]` pair keeps letter descenders (g, y, p) from being clipped by the `overflow-hidden` mask — copied straight from our working hero.

### 5b. Word-by-word blur/opacity in

```tsx
'use client'
import { motion } from 'framer-motion'
import { EASE_OUT, VIEWPORT } from '@/lib/motion'

const word = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(4px)' },
  show:   { opacity: 1, y: '0em',  filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_OUT } },
}

export function WordReveal({ text }: { text: string }) {
  return (
    <motion.p initial="hidden" whileInView="show" viewport={VIEWPORT} transition={{ staggerChildren: 0.05 }} className="text-3xl">
      {text.split(' ').map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={word} className="inline-block mr-[0.25em]">{w}</motion.span>
      ))}
    </motion.p>
  )
}
```

### 5c. Color shift on scroll (fill-as-you-read)

A headline whose text color animates from muted to full as it crosses the viewport — Apple's "text brightens into focus." Scrub `color` with `useTransform`:

```tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ColorShiftHeadline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.35'] })
  const color = useTransform(scrollYProgress, [0, 1], ['#a8b3b0', '#152421']) // muted → ink
  return <motion.h2 ref={ref} style={{ color }} className="text-4xl">{children}</motion.h2>
}
```

**Perf / mobile / reduced-motion.** Splitting into many `inline-block` word spans is fine for a headline (a dozen nodes) but **don't do it to paragraphs** — it bloats the DOM and hurts text selection/SEO reflow. `filter: blur()` per word is heavier than opacity; drop the blur channel on mobile. When `reduce`, render the plain heading (skip the split entirely, or set variants so `hidden` already equals the final state). Keep the real text in the DOM as normal characters so screen readers and SEO see it.

---

## 6. Pacing & feel

The techniques above are commodities. **This section is why Apple feels expensive and a bootcamp clone feels cheap.** It's all in the numbers.

### The number ranges that read as "premium"

| Parameter | Cheap / generic | **Apple-feel target** | Why |
|---|---|---|---|
| Reveal travel distance | 60–120px | **16–32px** | Small movement reads as confident; big movement reads as a slideshow. (Our kit: 20–32px.) |
| Reveal duration | 0.2–0.4s | **0.6–1.0s** | Slow = luxurious. Under ~0.5s feels snappy/cheap for a *reveal*. |
| Easing | `ease` / `ease-in-out` | **long-tail ease-out** `[0.16,1,0.3,1]` / `[0.22,1,0.36,1]` | Quick start, long soft settle — the core premium tell. |
| Stagger between siblings | 0.15–0.3s | **0.06–0.14s** | Tight enough to feel like one gesture, loose enough to read sequence. |
| Scroll-scrub smoothing | none (1:1) | `useSpring` **stiffness 60–100, damping 26–30** | The lag/glide that makes scrubbing feel weighted, not mechanical. |
| Viewport trigger | at the edge (`amount: 0`) | **fire ~80px early** (`margin: '-80px'`) *or* `amount: 0.25` | Content is mid-settle by the time you notice it. |
| Section vertical padding | `py-10` | **`py-20 md:py-28`+** | Whitespace *is* pacing. Cramped sections feel rushed and cheap. |
| Re-trigger on scroll up | re-animate | **`once: true`** | Apple animates once. Re-triggering feels twitchy. |
| Simultaneous effects | many | **one hero moment + quiet reveals** | Restraint. The loud thing lands because everything around it is calm. |

### The five feel-disciplines

1. **Ease-out, always, for reveals.** Motion should decelerate *into* place. Reserve symmetric `ease-in-out` (`[0.65,0,0.35,1]`) for continuous/scroll-linked/parallax motion only — our kit already encodes this split.
2. **Slow > fast.** When unsure, add 100–200ms. Apple's motion is unhurried; that patience is the luxury signal.
3. **Momentum via spring, sparingly.** `useSpring` on scrubbed values adds physical weight. Don't add bounce (`stiffness` high + low `damping`) — overshoot reads as playful, not premium. Keep `damping ≥ 26`.
4. **Space everything out.** Generous margins/padding and large type with tight tracking (`tracking-[-0.02em]` on headlines, as we already do) is half the "expensive" impression before anything even moves.
5. **Restraint is the technique.** One pinned/scrubbed moment. Everything else is a quiet fade-up. A page where *everything* animates feels like a demo reel; a page with one perfect moment feels like a product.

### Reusable "Apple transitions" to drop in `src/lib/motion.ts`

```ts
// Consistent transition presets — pair with EASE_* from this same file.
export const REVEAL      = { duration: 0.7, ease: EASE_OUT_SOFT } as const
export const REVEAL_SLOW = { duration: 0.9, ease: EASE_OUT_SOFT } as const
export const STAGGER     = { staggerChildren: 0.1, delayChildren: 0.05 } as const
export const SCRUB_SPRING = { stiffness: 90, damping: 28, restDelta: 0.001 } as const
```

---

## 7. Snap / section transitions

**Does Apple use scroll-snap?** For their long-form narrative product pages — **no.** Reverse-engineering confirms Apple uses **native scroll + `sticky` + JS-driven `transform`**, not full-page CSS scroll-snap and not scroll-jacking. Forcing one screen at a time fights the user's scroll momentum and is exactly the "over-produced" feeling Apple avoids. So: **do not** put `scroll-snap` on the whole landing page.

**Where snap *is* legitimately useful:** a **horizontal media gallery / carousel** (a strip of cards you flick through), or a small "one card at a time" showcase — not the vertical page spine.

**CSS scroll-snap (preferred — zero JS, native momentum):**

```tsx
<div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  {items.map((it) => (
    <div key={it.id} className="snap-center shrink-0 w-[80vw] md:w-[420px]">{/* card */}</div>
  ))}
</div>
```

- `snap-mandatory` forces a settle on each item; use `snap-proximity` if you want it optional/softer.
- `snap-center` (vs `snap-start`) centers the focused card — nicer for a showcase.
- Pair with `scroll-smooth`, but guard smooth scrolling behind `@media (prefers-reduced-motion: no-preference)` so reduced-motion users get instant jumps.

**JS-controlled snapping** (Framer): only reach for it if you need to *drive* which item is active from state (e.g. dots that scroll the strip) — animate a horizontal `x` with a spring toward the target index. For pure "flick and settle," CSS scroll-snap is lighter and feels more native than any JS version.

**Reduced-motion:** disable `scroll-smooth` (fall back to instant), keep snapping (snapping itself isn't a motion-sickness trigger; the *animated glide* to the snap point is the part to soften).

---

## 8. Performance discipline

The whole illusion collapses the instant it drops frames. This is what keeps it at 60fps, including on mid-range Android.

**The one rule:** animate **only `transform` and `opacity`** (and `filter`/`clip-path`, which are also compositor-friendly). These run on the GPU and skip layout + paint. Never animate `top`, `left`, `width`, `height`, or `margin` on scroll — each frame triggers a layout reflow and you'll drop to ~20fps on a phone.

**Checklist:**
- **`will-change: transform`** (`will-change-transform`) *only* on layers that move **continuously** (parallax, pinned-media scale, scrub canvas). It promotes them to their own compositor layer. **Remove it when idle** — over-applying creates too many layers and *increases* memory pressure on mobile, causing the opposite of what you want.
- **Prefer `whileInView` over `useScroll` for one-shot reveals.** `whileInView` shares a pooled `IntersectionObserver` (cheap at scale). `useScroll` measures layout and samples scroll per instance — fine for a handful, wasteful for 40 list items.
- **Gate heavy effects behind `useIsDesktop()`** (we already have this hook, SSR-safe). Pins, parallax, canvas/video scrub → desktop only; phones get the static/stacked fallback. This is the same thing Apple does (single image on mobile/slow connections).
- **Lazy-load media.** `loading="lazy"` on below-the-fold `<img>`; keep `priority`/`preload` only for the LCP hero (as `hero.tsx` already does). For scrub video, `preload="auto"` *only* when it's about to enter view — otherwise it competes with LCP.
- **Debounce nothing, rAF everything.** Frame-driven work (canvas `drawImage`) goes inside `requestAnimationFrame`; Framer already batches motion-value reads to a single rAF-aligned render loop, so `useTransform`/`useMotionValueEvent` are already frame-coalesced.
- **Cap concurrent scrubs.** One `useScroll`-driven canvas/video per screen. Two heavy scrubbers fighting for the main thread on Android is instant jank.
- **Respect `useReducedMotion`** at the top of every animated component (kills parallax, swaps scrubs for static). It's also a *perf* win — skipped animations improve INP because transitions no longer delay visual feedback.
- **Test on a throttled device profile** (Chrome DevTools → Performance → 4× CPU throttle + "Slow 4G"). If the pinned moment isn't smooth there, cut it to desktop-only.

**Forward-looking (progressive enhancement):** native **CSS scroll-driven animations** (`animation-timeline: view()` / `scroll()`) run scroll animations off the main thread entirely — the lightest possible version of §1/§4. Support is good in Chromium but still partial in Safari/Firefox as of 2026, so treat it as an enhancement layered under a Framer fallback, always inside `@media (prefers-reduced-motion: no-preference)`:

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal { animation: fade-up linear both; animation-timeline: view(); animation-range: entry 0% cover 40%; }
    @keyframes fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
  }
}
```

---

## 9. Applying this to the face-yoga landing page

Grounded in our actual sections. **Do not apply everything.** The goal is one signature moment + consistent quiet reveals, not a Framer showreel.

### Section-by-section

| Section | File | Recommended treatment | Priority |
|---|---|---|---|
| **Hero** | `sections/hero.tsx` | Already excellent — orchestrated mount stagger + line-mask headline + bg scale-settle. **One addition:** a desktop-only **scroll-away** as you leave it (content `opacity 1→0`, slight `y`), via `useScroll` on the hero with `offset: ['start start', 'end start']`. Adds cinematic exit; costs almost nothing. | Polish |
| **Face Map / analysis console** | `sections/facial-analysis.tsx` | **The signature moment.** Already scrubs a self-drawing SVG face-map with `useScroll` — upgrade it into a full **§2 pinned scrollytelling**: pin the face-map/console visual while the three parts (Overview → Facial Map → Appearance Protocol) cross-fade over it. This is the one place to spend the "Apple pin." Desktop-only, stacked fallback on mobile (§2). | ⭐ **Do this** |
| **Before / After** | `sections/comparison.tsx`, `ui/comparison-slider.tsx`, `sections/transformations.tsx` | For real before/after *imagery*: a **scroll-driven clip-path wipe** revealing "after" over "before" as the section crosses center (`useTransform(scrollYProgress → clipPath inset)`) — very Apple, keeps the existing drag-slider for interaction. Separately, `comparison.tsx` currently uses bare `whileInView` with **no `ease`/`duration`** — bring it onto the kit (`EASE_OUT_SOFT`, `VIEWPORT`) for consistency. | ⭐ High |
| **Pricing** | `sections/pricing-preview.tsx` | Already tasteful (scale+rise on the card). **Leave it mostly alone** — pricing is conversion-critical; heavy motion here delays the CTA and hurts INP. At most, a gentle one-shot scale-in on the price number. Do **not** pin or parallax pricing. | Leave / minimal |
| **All other sections** (features, science, stats, testimonials, faq, etc.) | `sections/*` | Standardize on the **§1 quiet reveal** with our kit (`EASE_OUT_SOFT`, `VIEWPORT`, `staggerChildren: 0.08–0.12`). Consistency across all of these *is* the premium feel. No pins, no parallax, no scrubs. | Baseline |

### Consistency fix worth doing first

Several sections (`comparison.tsx` especially) use `whileInView` with default timing and no shared easing — so reveals fire at slightly different speeds/curves across the page, which subtly reads as "unpolished." **Route every reveal through the `src/lib/motion.ts` kit** (add the `REVEAL`/`STAGGER` presets from [§6](#6-pacing--feel)). One easing language across the whole page is the cheapest, highest-impact upgrade here.

### Recommended restrained subset (ship this, not everything)

1. **Standardize all reveals** on the existing kit — fix the outliers like `comparison.tsx`. *(§1, §6)*
2. **One pinned scrollytelling moment** — the Face Map / analysis console. This is the single Apple move for the whole page. *(§2)*
3. **One scroll-driven clip-path reveal** on before/after imagery. *(§3-adjacent, transform-only)*
4. **Line-mask / word-reveal** on the hero headline (already have it) + at most one other marquee headline. *(§5)*
5. **A subtle hero scroll-away** on desktop. *(§4-lite)*
6. **Everything desktop-gated and reduced-motion-safe**, animating transform/opacity only. *(§8)*

**Explicitly skip:** canvas image sequences (too heavy for a mobile-first conversion LP), full-page scroll-snap, multi-layer parallax stacks, and any second pinned section. Restraint is the point.

---

## Sources

- [Motion (Framer Motion) — React scroll animations](https://motion.dev/docs/react-scroll-animations) — `whileInView`, `useScroll`, `useTransform`, `useSpring`, native `ScrollTimeline` + pooled `IntersectionObserver`.
- [Motion — `useScroll` API](https://motion.dev/docs/react-use-scroll) — `container`/`target`/`axis`/`offset`, full offset-string syntax, transform-ignored-in-measurement caveat.
- [CSS-Tricks — "Let's Make One of Those Fancy Scrolling Animations Used on Apple Product Pages"](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/) — canvas image-sequence technique, `padStart` frame naming, preloading, `drawImage`, AirPods Pro = 148 frames, 1,609 requests / 55.8 MB weight, Apple's single-image fallback.
- [Ideas of Anders Åberg — Reverse-engineering the Apple iPhone X landing page](https://ideasof.andersaberg.com/development/reverse-engineering-apple-x-landing-page) — Apple uses native scroll + scroll-event listeners driving `transform: scale()/translate()`, layered canvas/video/z-index (not scroll-jacking, not full canvas scrub on that page).
- [Creating scroll animations similar to Apple's AirPods Pro page (Ankit Trehan, Medium)](https://ankittrehan2000.medium.com/creating-scroll-animations-similar-to-apples-airpods-pro-page-bc5c1c0814df) — scroll-fraction → frame-index mapping.
- [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) — CSS `@media` patterns, `matchMedia` JS pattern, guidance to drop decorative reveals/parallax and keep essential scroll.
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) & [W3C WCAG 2.2 — SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) — parallax as a vestibular-disorder trigger; provide a way to disable.
- [Motion — Create accessible animations in React](https://motion.dev/docs/react-accessibility) — `useReducedMotion` hook usage.
- [How Apple Perfected Animations (Vinayak Bharadwaz, Medium)](https://vinayakbharadwaz.medium.com/how-apple-perfected-animations-fee859a54625) & [Mobile App Animation Guide — timing & easing](https://www.appypie.com/blog/mobile-app-animation-guide) — Apple's reliance on custom `cubic-bezier` ease-out curves (the `cubic-bezier(0.4, 0, 0.2, 1)` family) for a fast-start / soft-settle feel.
- Internal: [`src/lib/motion.ts`](../src/lib/motion.ts) (existing easing kit + `useIsDesktop`), [`src/components/sections/facial-analysis.tsx`](../src/components/sections/facial-analysis.tsx) (existing `useScroll` scrub), [`src/components/sections/hero.tsx`](../src/components/sections/hero.tsx) (existing line-mask reveal), [`docs/living-image-playbook.md`](./living-image-playbook.md) (companion doc).
