'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { EASE_OUT, useIsDesktop } from '@/lib/motion'

const steps = [
  {
    number: '01',
    title: 'Choose your plan',
    description: 'Select your Complete Face Map and any optional add-ons.',
  },
  {
    number: '02',
    title: 'Meet your expert',
    description: 'A live 45–60 minute Face Mapping Session with a real expert.',
  },
  {
    number: '03',
    title: 'We map the complete case',
    description: 'Five expert disciplines review your face, skin, routine and lifestyle.',
  },
  {
    number: '04',
    title: 'Receive your Face Map',
    description: 'Your personalised Face Map and Appearance Protocol, in 2–4 working days.',
  },
  {
    number: '05',
    title: 'Ask when you need clarity',
    description: 'A real person answers your questions about your Face Map.',
  },
]

// Face-map zones — one lights up per method step (the face gets "mapped" as you advance).
const zones = [
  { cx: 78, cy: 110 },
  { cx: 162, cy: 110 },
  { cx: 120, cy: 152 },
  { cx: 96, cy: 200 },
  { cx: 150, cy: 205 },
]
const faceOutline =
  'M120 30c42 0 70 31 70 78 0 31-6 55-19 78-13 23-32 48-51 48s-38-25-51-48c-13-23-19-47-19-78 0-47 28-78 70-78Z'

export function HowItWorks() {
  const reduce = useReducedMotion()
  const desktop = useIsDesktop()

  // Mobile + reduced-motion: the calm stacked grid (no pin, no tall spacer).
  if (!desktop || reduce) return <StackedSteps />

  return <PinnedTimeline />
}

/* ── Desktop: Apple-style sticky pinned scroll-timeline ───────────────────── */
function PinnedTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))))
  })
  // The face map draws itself across the whole scroll of the section.
  const drawLen = useTransform(scrollYProgress, [0.04, 0.9], [0, 1])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-alt relative"
      style={{ height: `${steps.length * 85}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container-main grid grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* Left — pinned face map that gets mapped step by step */}
          <div className="flex justify-center">
            <div className="relative w-[300px] lg:w-[360px]">
              <svg viewBox="0 0 240 300" fill="none" className="w-full text-teal" aria-hidden="true">
                <motion.path d={faceOutline} stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" style={{ pathLength: drawLen }} />
                <motion.path d="M120 42v192" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.16" style={{ pathLength: drawLen }} />
                <motion.path d="M58 120h124" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.16" style={{ pathLength: drawLen }} />
                {zones.map((z, i) => (
                  <motion.g
                    key={i}
                    animate={{ opacity: i <= active ? 1 : 0.22, scale: i === active ? 1.2 : 1 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  >
                    <circle cx={z.cx} cy={z.cy} r="11" fill="white" stroke="currentColor" strokeWidth="1.5" />
                    <text x={z.cx} y={z.cy + 4} textAnchor="middle" fontSize="11" fontWeight="600" className="fill-teal">
                      {i + 1}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>
          </div>

          {/* Right — steps advancing as you scroll */}
          <div>
            <p className="text-[12px] text-analysis-teal uppercase tracking-[0.14em] mb-3">
              The MapMyFace Method
            </p>
            <h2 className="text-[1.75rem] lg:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-8" style={{ fontWeight: 450 }}>
              A deeper process. <span className="text-ink/40">A clearer plan.</span>
            </h2>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  animate={{ opacity: i === active ? 1 : i < active ? 0.5 : 0.32 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="relative pl-5"
                >
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-teal"
                    animate={{ opacity: i === active ? 1 : 0, scaleY: i === active ? 1 : 0.4 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    style={{ transformOrigin: 'top' }}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="text-[12px] font-medium tracking-[0.1em] text-analysis-teal">{step.number}</span>
                    <h3 className="text-[18px] lg:text-[20px] font-medium tracking-[-0.01em] text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-analysis-teal">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Mobile / reduced-motion: calm stacked grid ───────────────────────────── */
function StackedSteps() {
  return (
    <section id="how-it-works" className="section section-alt">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.14em] mb-3">
            The MapMyFace Method
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-4" style={{ fontWeight: 450 }}>
            A deeper process. <span className="text-ink/40">A clearer plan.</span>
          </h2>
          <p className="text-[15px] md:text-base text-analysis-teal leading-relaxed">
            The expertise happens behind the scenes. Your journey stays simple.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="relative card rounded-[22px] p-5 md:p-6"
            >
              <span className="mb-4 inline-flex items-center justify-center rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium tracking-[0.08em] text-analysis-teal">
                {step.number}
              </span>
              <h3 className="mb-2 text-[17px] font-medium tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-analysis-teal">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
