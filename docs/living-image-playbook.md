# The Living Image Playbook

Techniques for making a **still image feel alive** — cinematic, layered, 3D-depth — the way qoves.com presents facial-analysis imagery (annotation dots, floating labels, gradient beams, drifting overlay layers reacting to scroll + mouse).

**Stack this is written for:** Next.js 14 (App Router, `src/`), Tailwind, Framer Motion v11 (`framer-motion@^11.5.4`), React 18. Path alias `@/*` → `./src/*`.

> **Mental model.** A "living image" is almost never one image. It is a **stack of absolutely-positioned layers** inside a `relative` container: a base photo, one or more overlay/gradient layers, and floating UI (dots, labels, lines). "Life" comes from moving those layers **independently** at different rates in response to two inputs — **mouse position** and **scroll position** — plus **ambient self-motion** (Ken Burns, shimmer) that runs regardless of input. Everything animates only `transform` and `opacity` (GPU-friendly), and everything respects `prefers-reduced-motion`.

---

## Table of contents

1. [Mouse-tracking parallax (multi-layer depth)](#1-mouse-tracking-parallax-multi-layer-depth) ⭐ high-impact
2. [Scroll-linked parallax](#2-scroll-linked-parallax)
3. [Annotated / diagnostic face overlay](#3-annotated--diagnostic-face-overlay) ⭐ high-impact
4. [Depth-map / 2.5D parallax from a single photo](#4-depth-map--25d-parallax-from-a-single-photo)
5. [Ken Burns / subtle zoom-drift](#5-ken-burns--subtle-zoom-drift) ⭐ high-impact
6. [Gradient / light-beam sweeps & shimmer](#6-gradient--light-beam-sweeps--shimmer)
7. [Cinemagraph approach (video / webp vs code)](#7-cinemagraph-approach)
8. [Shared foundations (reduced-motion hook, perf rules)](#shared-foundations)
9. [Recommended build order](#recommended-build-order)

**Priority for effort-to-payoff:** ship **#1, #3, #5** first. Together they produce ~80% of the qoves feel. Layer in #6 (beams/shimmer) for polish, #2 for full-section scroll storytelling, and reserve #4 for a single hero showpiece.

---

## Shared foundations

### `prefers-reduced-motion` hook

Every technique below must degrade gracefully. Put this in `src/hooks/useReducedMotion.ts`. (Framer Motion also ships its own `useReducedMotion` from `framer-motion` — either is fine; this one is dependency-free and reactive to changes.)

```tsx
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
```

> Framer Motion built-in equivalent: `import { useReducedMotion } from "framer-motion"`. Use that if you prefer one less file — it returns `true | null` and is SSR-safe.

### Non-negotiable performance rules

- **Only animate `transform` and `opacity`.** These are compositor-only (GPU) and never trigger layout/paint. Never animate `top/left/width/height/margin` in a loop.
- **`will-change: transform`** on layers that move continuously — but only on those, and remove it when idle. Overuse creates too many compositor layers and *hurts* memory on mobile. In Tailwind: `will-change-transform`.
- **Framer Motion `style={{ x, y }}`** compiles to `transform: translateX/Y` automatically — prefer motion values (`x`, `y`, `scale`, `rotate`) over animating raw CSS props.
- **Throttle nothing manually** — Framer Motion motion values + springs already run on rAF. Do *not* call `setState` on every mousemove; write to a `MotionValue` instead (no React re-render).
- **Mobile:** there is no hover/cursor. Disable mouse parallax on touch (media query `(hover: hover)` or pointer check) and lean on scroll parallax + ambient motion instead. Keep total moving layers ≤ 4–5 on mobile.
- **`'use client'`** — all these components are interactive; every file below is a Client Component. In App Router, keep them as leaf components imported into Server Components so the server tree stays server-rendered.
- **Images:** use `next/image` with `priority` for the hero, `sizes` set, and a low-res `placeholder="blur"` so the layered effect doesn't pop in.

---

## 1. Mouse-tracking parallax (multi-layer depth)

⭐ **Highest impact, lowest effort.**

**What it looks like.** As the cursor moves over the image, foreground elements (labels, dots) slide further than midground, which slides further than the background photo. The brain reads the differential motion as *depth* — the flat card becomes a shallow diorama. qoves uses this for its floating annotation labels over a still face.

**When to use it.** Desktop hero images, feature cards, any "showpiece" still. Skip on touch devices (no cursor).

**How it works.** Track normalized cursor offset from the container center (`-0.5 … 0.5`), pipe it through `useTransform` to a pixel range per layer, and smooth it with `useSpring`. Deeper layers (labels) get a bigger range; the base photo gets a small one (or moves opposite for a "counter-parallax" pop). Writing to `MotionValue`s means **zero React re-renders** on mousemove.

### Reusable `<ParallaxLayers>` component

```tsx
// src/components/ui/ParallaxLayers.tsx
"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LayerProps = {
  children: ReactNode;
  /** How far this layer travels, in px, at full cursor deflection.
   *  Bigger = closer to viewer. Negative = counter-parallax. */
  depth?: number;
  className?: string;
};

// Context-free: we pass the shared motion values down via a render helper.
function Layer({
  mx,
  my,
  depth = 20,
  className,
  children,
}: LayerProps & { mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div
      style={{ x, y }}
      className={`absolute inset-0 will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxLayers({
  children,
  className,
  /** spring stiffness/damping — lower stiffness = floatier */
  stiffness = 150,
  damping = 20,
}: {
  children: (Layer: (p: LayerProps) => JSX.Element) => ReactNode;
  className?: string;
  stiffness?: number;
  damping?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness, damping, mass: 0.5 });
  const my = useSpring(rawY, { stiffness, damping, mass: 0.5 });

  function handleMove(e: React.MouseEvent) {
    if (reduced) return;
    const rect = ref.current!.getBoundingClientRect();
    // normalized -0.5 .. 0.5 relative to element center
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  // Bind the shared spring values into a Layer factory the caller uses.
  const BoundLayer = (p: LayerProps) => <Layer {...p} mx={mx} my={my} />;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative overflow-hidden [transform-style:preserve-3d] ${className ?? ""}`}
    >
      {children(BoundLayer)}
    </div>
  );
}
```

**Usage:**

```tsx
// e.g. in a section component
import Image from "next/image";
import { ParallaxLayers } from "@/components/ui/ParallaxLayers";

export function HeroFace() {
  return (
    <ParallaxLayers className="aspect-[4/5] w-full max-w-md rounded-3xl">
      {(Layer) => (
        <>
          {/* Background: moves least (or opposite via negative depth) */}
          <Layer depth={-8}>
            <Image src="/face.jpg" alt="" fill className="object-cover" priority />
          </Layer>

          {/* Midground: soft gradient glow */}
          <Layer depth={16} className="pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent" />
          </Layer>

          {/* Foreground: floating label travels the most => reads as closest */}
          <Layer depth={40} className="pointer-events-none">
            <span className="absolute left-6 top-8 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow-lg backdrop-blur">
              Jawline symmetry 94%
            </span>
          </Layer>
        </>
      )}
    </ParallaxLayers>
  );
}
```

**Tuning cheatsheet**
- Background photo: `depth` −5 to +10. Labels/dots: `depth` 25–50. The *ratio* between layers sells the depth, not the absolute value.
- `stiffness` 120–180 + `damping` 18–26 → smooth, slightly floaty. Higher stiffness = snappier/tighter.
- For a **3D tilt** variant, replace `x/y` translation on the container with `rotateX/rotateY` (add `perspective` on the parent via Tailwind `[perspective:1000px]`). Tilt reads as even more dimensional but can induce motion sensitivity — gate it harder behind reduced-motion.

**Perf / mobile.** Zero re-renders (values written to MotionValues). `will-change-transform` on moving layers only. `reduced` short-circuits the handler so reduced-motion users get a static stack. On touch there's no `mousemove`, so it's naturally inert — but also add `@media (hover: hover)` gating if you attach heavy listeners.

---

## 2. Scroll-linked parallax

**What it looks like.** As the image scrolls up through the viewport, its inner layers drift at different speeds — background sinks, foreground rises — like a slow camera dolly. Great for long marketing pages where each section "comes alive" as you reach it.

**When to use it.** Full-width section imagery, storytelling scroll pages, hero → feature transitions. Pairs well with #1 (mouse handles hover, scroll handles the page journey) — they compose cleanly because both just write to `transform`.

**How it works.** `useScroll({ target, offset })` gives a `scrollYProgress` MotionValue (0→1) as the target passes through the viewport. `useTransform` maps that progress to per-layer `y` (or `scale`, `opacity`). The `offset` array defines the start/end anchor pair: `["start end", "end start"]` = "from when the element's top hits the viewport bottom, to when its bottom hits the viewport top" (the full pass-through).

```tsx
// src/components/ui/ScrollParallax.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // full pass through viewport
  });

  // Layers drift opposite directions => depth. Values are px.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const labelOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.85, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[70vh] w-full overflow-hidden rounded-3xl">
      <motion.div style={reduced ? undefined : { y: bgY }} className="absolute inset-0 scale-110 will-change-transform">
        <Image src="/face.jpg" alt="" fill className="object-cover" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: fgY, opacity: labelOpacity }}
        className="absolute inset-0 flex items-end p-8 will-change-transform"
      >
        <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium backdrop-blur">
          Analyzing 68 facial landmarks
        </span>
      </motion.div>
    </div>
  );
}
```

**Gotchas**
- **Scale the moving background** (`scale-110` above) so its edges never expose the container as it drifts. Rule of thumb: scale up by ~2× the max travel percentage.
- Use **percentage strings** for `y` when you want travel proportional to layer size; use plain numbers for fixed-px travel.
- `useScroll` is passive and cheap; it does not force re-renders. Keep transforms simple.
- Reduced motion: drop the `style` entirely (as above) → layers sit at their natural position.

**Perf / mobile.** Scroll parallax is safe on mobile (unlike mouse parallax) and is your primary "life" source there. Keep travel subtle on small screens (±5–8%) — big parallax over short mobile viewports looks janky. Avoid `background-attachment: fixed` (the old CSS trick) — it's a known mobile jank/perf trap; use transform-based parallax like above.

---

## 3. Annotated / diagnostic face overlay

⭐ **The signature qoves look. High impact.**

**What it looks like.** Over a still face: small **pulsing dots** at landmarks, thin **connector lines that draw themselves in**, and **floating labels** ("Canthal tilt +4°") that fade/slide in on scroll-into-view. Feels like a live diagnostic scan.

**When to use it.** Any "we analyze X" claim, before/after, feature explainers. This is what makes a product feel *intelligent*.

**Architecture.** One `relative` container. The image is the base. Annotations live in **one absolutely-positioned SVG** (for dots + lines, so coordinates share a viewBox) *plus* absolutely-positioned HTML labels (better text rendering/wrapping than SVG `<text>`). Positions are expressed in **percentages** so they track the image on resize.

### Pulsing points + line-draw + labels, staggered on view

```tsx
// src/components/ui/FaceAnnotations.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Point = { id: string; x: number; y: number; label: string };

// coordinates in % of the container (0-100)
const POINTS: Point[] = [
  { id: "brow", x: 38, y: 30, label: "Brow position" },
  { id: "canthal", x: 62, y: 38, label: "Canthal tilt +4°" },
  { id: "jaw", x: 50, y: 82, label: "Jaw symmetry 94%" },
];

// connector lines: pairs of points (in %) to draw between
const LINES = [
  { from: [38, 30], to: [62, 38] },
  { from: [62, 38], to: [50, 82] },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const dot = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

const label = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function FaceAnnotations() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }} // fire when 40% visible, only once
    >
      <Image src="/face.jpg" alt="Facial analysis" fill className="object-cover" priority />

      {/* Connector lines: single SVG sharing a 0-100 viewBox */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {LINES.map((l, i) => (
          <motion.line
            key={i}
            x1={l.from[0]} y1={l.from[1]} x2={l.to[0]} y2={l.to[1]}
            stroke="rgba(56,189,248,0.7)" strokeWidth={0.4}
            strokeLinecap="round" vectorEffect="non-scaling-stroke"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 + i * 0.2 }}
          />
        ))}
      </svg>

      {/* Dots + labels */}
      {POINTS.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          {/* pulsing ring (CSS animation, cheap) */}
          <motion.span variants={dot} className="relative block h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-cyan-400" />
            {!reduced && (
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/70" />
            )}
          </motion.span>

          {/* label offset from the dot */}
          <motion.span
            variants={label}
            className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-800 shadow backdrop-blur"
          >
            {p.label}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}
```

**Key techniques used here**
- **Line-draw animation** = animate SVG `pathLength` from `0`→`1`. Works on `<line>`, `<path>`, `<circle>`, etc. `vectorEffect="non-scaling-stroke"` keeps stroke width constant despite the `preserveAspectRatio="none"` stretch.
- **Pulsing dots** = Tailwind's built-in `animate-ping` (a scale+fade CSS keyframe) layered under a solid dot. Zero JS, GPU-friendly. For a custom pulse use a Framer `animate={{ scale:[1,1.4,1], opacity:[0.7,0,0.7] }}` with `repeat: Infinity`.
- **Staggered reveal** = parent `variants` with `staggerChildren`; children just declare `hidden`/`show`. Fires via `whileInView` + `viewport={{ once: true }}`.
- **Percentage positioning** = dots/lines stay glued to facial features across all screen sizes without media queries.

**Perf / mobile.** All GPU transforms + one CSS ping. `once: true` means it animates a single time then stops (no ongoing cost). Under reduced motion: lines render already-drawn (`pathLength:1`), no ping, dots simply present. On small screens, reduce the number of labels (they crowd) — consider showing 1–2 and tapping to reveal more.

**Combine with #1:** wrap this whole block in `<ParallaxLayers>` and put dots on a high-`depth` layer, the photo on a low one — the annotations then float *above* the face on mouse-move. This exact combination is the qoves hero effect.

---

## 4. Depth-map / 2.5D parallax from a single photo

**What it looks like.** The "Facebook 3D photo" effect: a single 2D photo appears to have real volume — the nose/foreground shifts against the background as you move the mouse or the phone tilts, with edges that wrap convincingly. Much stronger depth illusion than layer parallax (#1) because it displaces *per-pixel*, not per-layer.

**How it actually works.** You need two inputs:
1. **The RGB photo.**
2. **A depth map** — a grayscale image where white = near, black = far. You can generate one offline with a monocular depth model (MiDaS, Depth Anything, Marigold) or via services; you do *not* run this at runtime.

At runtime a **fragment shader displaces the photo's UV coordinates by the depth map**, driven by mouse/gyro offset. Near pixels move more than far pixels → parallax + subtle occlusion.

**Library options (and whether they're overkill):**

| Approach | What it is | Verdict for a landing page |
|---|---|---|
| **PixiJS `DisplacementFilter`** | 2D WebGL, feed photo + depth map, offset the filter by mouse. ~small footprint for WebGL. | **Best fit** if you want the real effect on one hero. Cleanest API, 2D-only, well documented. |
| **three.js** custom shader plane | Full 3D engine; a plane with a displacement shader. | **Overkill** unless you already ship three.js. Heavy bundle (~150kb+) for one image. |
| **depthy / depthy-style demos** | Older open-source depth-parallax viewers. | Reference/learning; not maintained enough to depend on. |
| **`@react-three/fiber` + drei** | React wrapper over three.js. | Overkill for one photo; justified only if you'll build several 3D scenes. |

**Honest recommendation.** For a marketing page, the true depth-map effect is a **single-showpiece** move. It costs: producing a depth map per image, shipping WebGL (bundle + a `<canvas>`), and a real mobile-perf/battery budget. Reach for it only on the ONE hero where the wow-factor justifies it. For everything else, the **multi-layer parallax (#1)** gives 70% of the perceived depth at 5% of the cost.

### Lighter-weight CSS-only approximations (use these first)

**(a) Two-layer cutout parallax.** Manually cut the subject from the background in an image editor (export a transparent PNG of the foreground). Now you have `bg.jpg` + `subject.png`. Feed them into `<ParallaxLayers>` (#1) at different depths. This is the "poor man's 3D photo" and looks shockingly good because the subject genuinely occludes the background. **This is the recommended path** — no shaders, no depth map at runtime, works everywhere.

```tsx
<ParallaxLayers className="aspect-square w-full max-w-lg">
  {(Layer) => (
    <>
      <Layer depth={-6}><Image src="/bg-blur.jpg" alt="" fill className="object-cover" /></Layer>
      <Layer depth={28}><Image src="/subject-cutout.png" alt="" fill className="object-contain" /></Layer>
    </>
  )}
</ParallaxLayers>
```

**(b) CSS `perspective` + `translateZ`.** Place layers at different `translateZ` inside a `[perspective:1000px]` parent; the browser produces true perspective parallax on tilt/scroll for free. Good for 2–3 planes.

**If you do commit to the real thing — PixiJS sketch:**

```tsx
// Conceptual. Load pixi.js dynamically (client only) to keep it out of the main bundle.
// const app = new PIXI.Application(...);
// const sprite = PIXI.Sprite.from("/face.jpg");
// const depth  = PIXI.Sprite.from("/face-depth.png");
// const filter = new PIXI.DisplacementFilter(depth);
// sprite.filters = [filter];
// onMouseMove: filter.scale.set(mouseX * 30, mouseY * 30);
```

Gate it behind `next/dynamic({ ssr:false })`, a `(hover:hover)` check, and `prefers-reduced-motion` (freeze displacement at 0).

---

## 5. Ken Burns / subtle zoom-drift

⭐ **Cheapest "always alive" effect. High impact, near-zero effort.**

**What it looks like.** The image slowly scales up (1.0 → ~1.08) while panning a few percent — a gentle, endless camera push. Adds ambient life to *any* photo even with no user input. Netflix/Apple use it constantly.

**When to use it.** Hero backgrounds, testimonial photos, anywhere a static photo feels dead. Combine with #6 (a light sweep over the drifting image) for a premium feel.

### CSS-keyframes version (lightest — no JS)

```css
/* globals.css */
@keyframes kenburns {
  0%   { transform: scale(1)    translate3d(0, 0, 0); }
  100% { transform: scale(1.08) translate3d(-2%, -1%, 0); }
}
.kenburns {
  animation: kenburns 20s ease-out infinite alternate;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .kenburns { animation: none; }
}
```

```tsx
<div className="relative aspect-video w-full overflow-hidden rounded-3xl">
  <Image src="/face.jpg" alt="" fill className="kenburns object-cover" priority />
</div>
```

`infinite alternate` ping-pongs so it never hard-cuts back. `overflow-hidden` on the parent hides the scaled overscan.

### Framer Motion version (composes with the rest)

```tsx
// src/components/ui/KenBurns.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function KenBurns({ src, alt = "" }: { src: string; alt?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl">
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={reduced ? undefined : { scale: [1, 1.08], x: ["0%", "-2%"], y: ["0%", "-1%"] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </motion.div>
    </div>
  );
}
```

**Perf / mobile.** One transform, cheap everywhere. Keep scale ≤ 1.1 and duration long (15–25s) — fast/large Ken Burns looks cheap and can nauseate. Always kill under reduced motion. Prefer the CSS version for background heroes (offloads from JS entirely).

---

## 6. Gradient / light-beam sweeps & shimmer

**What it looks like.** A soft band of light sweeps diagonally across the image every few seconds (like a reflection passing over glass); or a slow conic-gradient "scanner" rotates; or a fine grain/glow pulses. This is the "beam" layer in qoves imagery — it signals *technology / scanning*.

**When to use it.** Over diagnostic imagery, glass/card surfaces, CTAs. Use sparingly — one moving light per view. Great layered on top of a Ken Burns photo (#5) or annotation overlay (#3).

### Diagonal light sweep (CSS)

```css
/* globals.css */
@keyframes sweep {
  0%   { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(150%)  skewX(-20deg); }
}
.light-sweep::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.25) 50%,
    transparent 100%
  );
  width: 60%;
  animation: sweep 4s ease-in-out infinite;
  mix-blend-mode: overlay; /* reads as light on the photo, not paint */
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) { .light-sweep::after { animation: none; opacity: 0; } }
```

```tsx
<div className="light-sweep relative overflow-hidden rounded-3xl">
  <Image src="/face.jpg" alt="" fill className="object-cover" />
</div>
```

### Rotating conic "scanner" beam (Framer)

```tsx
<motion.div
  aria-hidden
  className="pointer-events-none absolute inset-0 rounded-full will-change-transform"
  style={{
    background:
      "conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.35) 40deg, transparent 80deg)",
    mixBlendMode: "screen",
  }}
  animate={{ rotate: 360 }}
  transition={{ duration: 8, ease: "linear", repeat: Infinity }}
/>
```

### Glow pulse

```tsx
<motion.div
  aria-hidden
  className="pointer-events-none absolute inset-0"
  animate={{ opacity: [0.25, 0.6, 0.25] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  style={{ background: "radial-gradient(circle at 50% 40%, rgba(56,189,248,0.5), transparent 60%)" }}
/>
```

### Grain (static, adds filmic texture)

Overlay a tiny tiling noise PNG (or an inline SVG `feTurbulence`) at low opacity with `mix-blend-mode: overlay`. Keep it **static** — animated grain is expensive and rarely worth it; a fixed grain layer already kills the "flat digital" look.

**Perf / mobile.** `mix-blend-mode` + a moving gradient is compositor work but generally fine for *one* element. Don't stack multiple blend-mode animations — it forces expensive re-compositing. `pointer-events-none` + `aria-hidden` on all decorative layers so they never block clicks or confuse screen readers. Kill sweeps under reduced motion.

---

## 7. Cinemagraph approach

**When code stops being worth it.** If the motion you want is *organic and pixel-level* — hair drifting, steam rising, an eye blinking, water rippling, a real "the photo is alive" cinemagraph — do **not** build it in code. Capture or author it as media.

**Options & trade-offs:**

| Option | Pros | Cons | Use when |
|---|---|---|---|
| **Muted looping `<video>` (MP4/WebM)** | Best quality/size for real footage; hardware-decoded; smooth | Needs `muted playsInline loop autoplay`; larger file; iOS Low Power Mode may block autoplay | You have real video/cinemagraph footage of the subject |
| **Animated WebP / AVIF** | Just an `<img>`; no video plumbing; loops automatically | Larger than video for long/complex motion; no scrub control | Short (1–3s), small loops (a shimmer, a subtle blink) |
| **Animated GIF** | Universal | Huge files, 256 colors, banding | Basically never in 2026 — use WebP instead |
| **Code (Framer/CSS, this playbook)** | Tiny payload, crisp at any resolution, interactive (reacts to mouse/scroll), themeable | Can't do organic per-pixel motion | Geometric/layer/light motion, anything interactive |

**Rule of thumb:**
- Motion is **geometric, interactive, or light-based** → code (#1–#6). Reacts to the user, scales infinitely, ~0 bytes.
- Motion is **organic and non-interactive** (hair, water, blink, smoke) → cinemagraph video/WebP.
- **Hybrid (recommended for a hero):** a looping cinemagraph video *base layer* + coded annotation/beam layers *on top* (#3, #6) + mouse parallax on the whole stack (#1). You get real organic life AND interactivity.

**Video implementation notes (matches your existing hero video setup):**

```tsx
<video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay muted loop playsInline
  poster="/face-poster.jpg"           // shows instantly, improves LCP/FCP
  preload="metadata"
>
  <source src="/loop.webm" type="video/webm" />
  <source src="/loop.mp4" type="video/mp4" />
</video>
```

- `muted` + `playsInline` are **required** for iOS autoplay.
- Always ship a `poster` (you already do this per your commit history) so there's no blank frame while the video loads.
- Keep loops **short (≤6s) and seamless** (first frame ≈ last frame). Encode at the display resolution, not source resolution.
- Respect reduced motion: swap the `<video>` for the `poster` image when `prefers-reduced-motion: reduce`.

---

## Recommended build order

For any image you want to bring to life, apply in this order and stop when it feels right:

1. **Ken Burns (#5)** — 5 minutes, instant ambient life. Do this to every hero photo.
2. **Annotations (#3)** — the "intelligent scan" signature. Highest brand payoff for a facial-analysis product.
3. **Mouse parallax (#1)** — wrap the annotated image in `<ParallaxLayers>`; dots on a deep layer, photo shallow. This is the qoves hero.
4. **Light sweep / glow (#6)** — one moving light for polish.
5. **Scroll parallax (#2)** — when the image lives in a long scroll narrative; also your primary mobile "life" source.
6. **Depth-map 2.5D (#4)** — only for a single showpiece, and prefer the **cutout two-layer approximation** before shipping any WebGL.
7. **Cinemagraph (#7)** — only when the motion must be organic; layer coded effects on top.

**The qoves hero, decomposed:** `<ParallaxLayers>` (mouse) → containing a Ken-Burns photo (ambient) → an SVG annotation overlay with pulsing dots + line-draw (on view) → floating labels on the deepest parallax layer → one diagonal light sweep + radial glow. Every layer transform-only, every effect gated behind `prefers-reduced-motion`, mouse parallax disabled on touch, scroll parallax carrying mobile.

### File placement in this repo

- Reusable primitives → `src/components/ui/` (`ParallaxLayers.tsx`, `ScrollParallax.tsx`, `FaceAnnotations.tsx`, `KenBurns.tsx`).
- The reduced-motion hook → `src/hooks/useReducedMotion.ts`.
- Global keyframes (`kenburns`, `sweep`) → your global stylesheet, or define them as Tailwind utilities in `tailwind.config.ts` under `theme.extend.keyframes` + `theme.extend.animation`.
- Compose them inside section components under `src/components/sections/`.
- All effect components are `"use client"`; import them into Server Components so the rest of the tree stays server-rendered.
```
