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
import { useRef, useState } from 'react'
import { EASE_OUT_SOFT } from '@/lib/motion'

const parts = [
  {
    step: '01',
    title: 'Overview',
    body: 'Your three biggest strengths, in plain language.',
  },
  {
    step: '02',
    title: 'Facial Map',
    body: 'Your features read across 9 zones, with clear labels.',
  },
  {
    step: '03',
    title: 'Appearance Protocol',
    body: 'What to start, stop, continue and do first.',
  },
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
          <circle cx={p.cx} cy={p.cy} r="9" fill="white" stroke="currentColor" strokeWidth="1.5" />
          <text x={p.cx} y={p.cy + 3.5} textAnchor="middle" fontSize="10" fontWeight="500" className="fill-ink">
            {p.n}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

export function FacialAnalysis() {
  const reduce = useReducedMotion()
  // Pin the scrollytelling at every width (it stacks to a single column when
  // narrow). Only reduced-motion falls back to the calm stacked cards.
  if (reduce) return <StackedFaceMap reduce={reduce} />

  return <PinnedFaceMap />
}

/* ── Desktop: the one Apple pin — face map holds while the 3 parts cross-fade ── */
function PinnedFaceMap() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Spring-smooth the value that drives the drawing so the line glides.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const draw = useTransform(smooth, [0.05, 0.72], [0, 1])

  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(parts.length - 1, Math.max(0, Math.floor(v * parts.length))))
  })

  return (
    <section
      id="face-map"
      ref={ref}
      className="section-alt relative"
      style={{ height: `${parts.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center w-full">
          {/* Face map — on top when narrow, on the left when wide */}
          <div className="flex justify-center">
            <div className="w-[210px] sm:w-[260px] md:w-[380px] lg:w-[440px] aspect-[156/216]">
              <FaceMapMock draw={draw} />
            </div>
          </div>

          {/* Header + the 3 parts cross-fading on scroll */}
          <div className="text-center md:text-left">
            <span className="mb-4 inline-block text-[11px] lg:text-[13px] font-medium uppercase tracking-wide text-analysis-teal">
              Your Face Map
            </span>
            <h2 className="hidden md:block text-[1.75rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink mb-10" style={{ fontWeight: 450 }}>
              Not just what we see. <span className="text-ink/40">What it means for you.</span>
            </h2>

            <div className="relative min-h-[210px]">
              {parts.map((part, i) => (
                <PartText key={part.step} part={part} i={i} total={parts.length} progress={scrollYProgress} />
              ))}
            </div>

            {/* Progress — which part you're on */}
            <div className="mt-8 flex items-center justify-center md:justify-start gap-2">
              {parts.map((s, i) => (
                <span
                  key={s.step}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === active ? 'w-9 bg-teal' : 'w-4 bg-ink/15'
                  }`}
                />
              ))}
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
  const w = 0.09 // cross-fade width
  const a = i / total
  const b = (i + 1) / total
  const range = i === 0 ? [0, b - w, b] : i === total - 1 ? [a - w, a, 1] : [a - w, a, b - w, b]
  const out = i === 0 ? [1, 1, 0] : i === total - 1 ? [0, 1, 1] : [0, 1, 1, 0]
  const opacity = useTransform(progress, range, out)
  const y = useTransform(progress, [a - w, a], [26, 0])
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center items-center md:items-start">
      <span className="text-[14px] font-medium tracking-[0.14em] text-analysis-teal">{part.step}</span>
      <h3 className="mt-3 text-[2rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.12] tracking-[-0.02em] text-ink" style={{ fontWeight: 450 }}>
        {part.title}
      </h3>
      <p className="mt-4 text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed text-analysis-teal max-w-md mx-auto md:mx-0">
        {part.body}
      </p>
    </motion.div>
  )
}

/* ── Mobile / reduced-motion: calm stacked layout ─────────────────────────── */
function StackedFaceMap({ reduce }: { reduce: boolean | null }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const drawScrub = useTransform(smooth, [0.28, 0.62], [0, 1])
  const draw = reduce ? 1 : drawScrub

  return (
    <section ref={sectionRef} id="face-map" className="relative overflow-hidden section-alt py-20 md:py-28">
      <div className="container-main relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-5 inline-block text-[11px] md:text-[13px] font-medium uppercase tracking-wide text-analysis-teal">
            Your Face Map
          </span>
          <h2 className="text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.75rem]" style={{ fontWeight: 450 }}>
            Not just what we see. <span className="text-ink/40">What it means for you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[14px] leading-relaxed text-ink/78 md:text-[15px]">
            Your Face Map connects expert observations to an Appearance Protocol, so you
            know what to start, stop, continue and do first. It is not a score. It is a plan.
          </p>
        </motion.div>

        {/* Face Map parts */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:mt-16 md:grid-cols-3">
          {parts.map((part, i) => (
            <motion.div
              key={part.step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: i * 0.1 }}
              whileHover={reduce ? undefined : { y: -6, boxShadow: '0 20px 40px -20px rgba(21,36,33,0.3)', transition: { duration: 0.2, ease: EASE_OUT_SOFT } }}
              className="card flex flex-col rounded-[22px] p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-[12px] font-medium text-analysis-teal">
                  {part.step}
                </span>
                {i === 1 && (
                  <div className="ml-auto h-12 w-10 opacity-90">
                    <FaceMapMock draw={draw} />
                  </div>
                )}
              </div>
              <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink md:text-[18px]">
                {part.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/78">{part.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
