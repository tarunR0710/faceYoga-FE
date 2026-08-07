'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { EASE_OUT_SOFT, REVEAL, SCRUB_SPRING, VIEWPORT, stagger, useIsDesktop } from '@/lib/motion'

// The three things the report opens with, in the blueprint's own labels.
const parts = [
  { step: '01', title: 'Facial Overview', body: 'How your features work together.' },
  { step: '02', title: 'Your Face Map', body: 'Made around one person: you.' },
  {
    step: '03',
    title: 'Appearance Protocol',
    body: 'First, next and later — foundation, targeted changes, review.',
  },
]

const promises = [
  'Clear explanations, not unexplained scores',
  'Visual analysis and context',
  'Prioritised recommendations',
  'Practical actions you can follow',
]

// Thin outline of a face with a few numbered points. `draw` (0→1) drives the
// self-draw; on the pinned version it's the (spring-smoothed) section scroll.
const mapLines = [
  { d: 'M120 32c40 0 66 30 66 74 0 30-6 52-18 74-12 22-30 46-48 46s-36-24-48-46c-12-22-18-44-18-74 0-44 26-74 66-74Z', o: 0.55 },
  { d: 'M120 40v190', o: 0.22 },
  { d: 'M60 108h120', o: 0.22 },
  { d: 'M60 156h120', o: 0.22 },
  { d: 'M72 204h96', o: 0.22 },
  { d: 'M84 116c8-6 20-6 28 0', o: 0.45 },
  { d: 'M128 116c8-6 20-6 28 0', o: 0.45 },
]
const mapPoints = [
  { cx: 78, cy: 108, n: '1' },
  { cx: 162, cy: 108, n: '2' },
  { cx: 120, cy: 156, n: '3' },
  { cx: 120, cy: 204, n: '4' },
]

function FaceMapMock({ draw }: { draw: MotionValue<number> | number }) {
  return (
    <svg viewBox="42 24 156 216" fill="none" className="h-full w-full text-teal" aria-hidden="true">
      {mapLines.map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity={l.o}
          style={{ pathLength: draw }}
        />
      ))}
      {mapPoints.map((p) => (
        <motion.g key={p.n} style={{ opacity: draw }}>
          <circle cx={p.cx} cy={p.cy} r="9" fill="rgb(var(--c-surface))" stroke="currentColor" strokeWidth="1.5" />
          <text x={p.cx} y={p.cy + 3.5} textAnchor="middle" fontSize="10" fontWeight="500" fill="rgb(var(--c-ink))">
            {p.n}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

function PromiseList({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? 'grid gap-2' : 'grid gap-2.5 sm:grid-cols-2'}>
      {promises.map((p) => (
        <li key={p} className="flex items-start gap-2.5">
          <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-soft">
            <Check className="h-2.5 w-2.5 text-accent-foreground" strokeWidth={2.5} />
          </span>
          <span className="text-[13px] leading-snug text-ink/[0.78] md:text-[13.5px]">{p}</span>
        </li>
      ))}
    </ul>
  )
}

function ExploreCta() {
  return (
    <Link
      href="#inside-face-map"
      className="group inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-[14px] font-semibold text-ink transition-colors duration-200 hover:bg-surface-2"
    >
      Explore Your Face Map
      <ArrowRight
        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </Link>
  )
}

export function FacialAnalysis() {
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop()
  // The single pinned "Apple moment" of the page — desktop only. Phones get the
  // calm stacked version so 23 sections do not become 40 screens of scroll.
  if (reduce || !isDesktop) return <StackedFaceMap reduce={!!reduce} />
  return <PinnedFaceMap />
}

/* ── Desktop: the one Apple pin — face map holds while the 3 parts cross-fade ── */
function PinnedFaceMap() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Spring-smooth the value that drives the drawing so the line glides.
  const smooth = useSpring(scrollYProgress, SCRUB_SPRING)
  const draw = useTransform(smooth, [0.05, 0.72], [0, 1])

  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(parts.length - 1, Math.max(0, Math.floor(v * parts.length))))
  })

  return (
    <section
      id="face-map"
      ref={ref}
      className="relative"
      style={{ height: `${parts.length * 90}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-main grid w-full grid-cols-2 items-center gap-12 lg:gap-20">
          {/* Face map */}
          <div className="flex justify-center">
            <div className="aspect-[156/216] w-[340px] lg:w-[420px]">
              <FaceMapMock draw={draw} />
            </div>
          </div>

          {/* Header + the 3 parts cross-fading on scroll */}
          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.16em] text-analysis-teal">
              Your Face Map
            </p>
            <h2
              className="mb-8 text-[1.9rem] leading-[1.14] tracking-[-0.02em] text-ink lg:text-[2.4rem]"
              style={{ fontWeight: 450 }}
            >
              Your complete analysis, <span className="text-ink/55">organised into one personal report.</span>
            </h2>

            <div className="relative min-h-[168px]">
              {parts.map((part, i) => (
                <PartText key={part.step} part={part} i={i} total={parts.length} progress={scrollYProgress} />
              ))}
            </div>

            {/* Progress — which chapter you're on */}
            <div className="mb-8 mt-2 flex items-center gap-2">
              {parts.map((s, i) => (
                <span
                  key={s.step}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === active ? 'w-9 bg-accent' : 'w-4 bg-ink/15'
                  }`}
                />
              ))}
            </div>

            <PromiseList />
            <div className="mt-7">
              <ExploreCta />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Each part fades in, holds, then cross-fades out to the next as scroll passes its band.
function PartText({
  part,
  i,
  total,
  progress,
}: {
  part: (typeof parts)[number]
  i: number
  total: number
  progress: MotionValue<number>
}) {
  const w = 0.05 // tighter cross-fade
  const a = i / total
  const b = (i + 1) / total
  const range = i === 0 ? [0, b - w, b] : i === total - 1 ? [a, a + w, 1] : [a, a + w, b - w, b]
  const out = i === 0 ? [1, 1, 0] : i === total - 1 ? [0, 1, 1] : [0, 1, 1, 0]
  const opacity = useTransform(progress, range, out)
  const y = useTransform(progress, [a, a + w], [16, 0])
  // Hide completely when opacity is near zero
  const visibility = useTransform(opacity, (v) => (v < 0.01 ? 'hidden' : 'visible'))
  return (
    <motion.div style={{ opacity, y, visibility }} className="absolute inset-0 flex flex-col justify-center">
      <span className="text-[13px] font-medium tracking-[0.16em] text-accent/70">{part.step}</span>
      <h3
        className="mt-2 text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-ink lg:text-[2.4rem]"
        style={{ fontWeight: 450 }}
      >
        {part.title}
      </h3>
      <p className="mt-3 max-w-md text-[16px] leading-relaxed text-analysis-teal lg:text-[18px]">
        {part.body}
      </p>
    </motion.div>
  )
}

/* ── Mobile / reduced-motion: calm stacked layout ─────────────────────────── */
function StackedFaceMap({ reduce }: { reduce: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, SCRUB_SPRING)
  const drawScrub = useTransform(smooth, [0.28, 0.62], [0, 1])
  const draw = reduce ? 1 : drawScrub

  return (
    <section ref={sectionRef} id="face-map" className="section relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 items-center gap-8">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={REVEAL}
          >
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-analysis-teal">
              Your Face Map
            </p>
            <h2
              className="text-[1.75rem] leading-[1.14] tracking-[-0.02em] text-ink"
              style={{ fontWeight: 450 }}
            >
              Your complete analysis, <span className="text-ink/55">organised into one personal report.</span>
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-analysis-teal">
              Your Face Map is created after the Face Mapping Session and Expert Mapping Review. It
              explains what the team observed, what the findings mean and what you should do next.
            </p>
          </motion.div>

          {/* The drawing map, kept small on phones */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.08 }}
            className="mx-auto aspect-[156/216] w-[150px]"
          >
            <FaceMapMock draw={draw} />
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.1 }}
            className="rounded-[20px] bg-surface p-5"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <PromiseList compact />
          </motion.div>
        </div>

        {/* The three opening chapters */}
        <div className="mt-8 grid grid-cols-1 gap-3">
          {parts.map((part, i) => (
            <motion.div
              key={part.step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...REVEAL, delay: stagger(i, 0.09) }}
              className="flex items-start gap-4 rounded-[18px] border border-border/50 bg-surface p-4"
            >
              <span className="pill-accent flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
                {part.step}
              </span>
              <div>
                <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink">{part.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-analysis-teal">{part.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.12 }}
          className="mt-8"
        >
          <ExploreCta />
        </motion.div>
      </div>
    </section>
  )
}
