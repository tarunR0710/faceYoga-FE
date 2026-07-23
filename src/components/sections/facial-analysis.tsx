'use client'

import { motion } from 'framer-motion'

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

const ease = [0.22, 0.61, 0.36, 1] as const

// Simple analysis-line mock: thin outline of a face with a few numbered points.
function FaceMapMock() {
  return (
    <svg
      viewBox="0 0 240 300"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Face outline */}
      <path
        d="M120 32c40 0 66 30 66 74 0 30-6 52-18 74-12 22-30 46-48 46s-36-24-48-46c-12-22-18-44-18-74 0-44 26-74 66-74Z"
        stroke="#55766f"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />
      {/* Vertical midline */}
      <path d="M120 40v190" stroke="#55766f" strokeWidth="1.5" strokeOpacity="0.22" />
      {/* Horizontal zone lines */}
      <path d="M60 108h120" stroke="#55766f" strokeWidth="1.5" strokeOpacity="0.22" />
      <path d="M60 156h120" stroke="#55766f" strokeWidth="1.5" strokeOpacity="0.22" />
      <path d="M72 204h96" stroke="#55766f" strokeWidth="1.5" strokeOpacity="0.22" />
      {/* Brow / eye line marks */}
      <path d="M84 116c8-6 20-6 28 0" stroke="#55766f" strokeWidth="1.5" strokeOpacity="0.45" />
      <path d="M128 116c8-6 20-6 28 0" stroke="#55766f" strokeWidth="1.5" strokeOpacity="0.45" />
      {/* Numbered points */}
      {[
        { cx: 78, cy: 108, n: '1' },
        { cx: 162, cy: 108, n: '2' },
        { cx: 120, cy: 156, n: '3' },
        { cx: 120, cy: 204, n: '4' },
      ].map((p) => (
        <g key={p.n}>
          <circle cx={p.cx} cy={p.cy} r="9" fill="#f7f4ef" stroke="#55766f" strokeWidth="1.5" />
          <text
            x={p.cx}
            y={p.cy + 3.5}
            textAnchor="middle"
            fontSize="10"
            fontWeight="500"
            fill="#152421"
          >
            {p.n}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function FacialAnalysis() {
  return (
    <section id="face-map" className="relative overflow-hidden bg-ivory py-20 md:py-28">
      <div className="container-main relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow */}
          <span className="mb-5 inline-block text-[11px] md:text-[13px] font-medium uppercase tracking-wide text-analysis-teal">
            Your Face Map
          </span>

          {/* Headline */}
          <h2
            className="text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.75rem]"
            style={{ fontWeight: 450 }}
          >
            Not just what we see.{' '}
            <span className="text-ink/40">What it means for you.</span>
          </h2>

          {/* Body */}
          <p className="mx-auto mt-5 max-w-lg text-[14px] leading-relaxed text-ink/78 md:text-[15px]">
            Your Face Map connects expert observations to an Appearance Protocol,
            so you know what to start, stop, continue and do first. It is not a
            score. It is a plan.
          </p>
        </motion.div>

        {/* Face Map parts */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:mt-16 md:grid-cols-3">
          {parts.map((part, i) => (
            <motion.div
              key={part.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease, delay: i * 0.08 }}
              className="flex flex-col rounded-[22px] border border-ink/10 bg-white p-7 shadow-[0_1px_2px_rgba(21,36,33,0.04)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-[12px] font-medium text-analysis-teal">
                  {part.step}
                </span>
                {i === 1 && (
                  <div className="ml-auto h-12 w-10 opacity-90">
                    <FaceMapMock />
                  </div>
                )}
              </div>
              <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink md:text-[18px]">
                {part.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/78">
                {part.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
