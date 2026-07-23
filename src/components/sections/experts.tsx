'use client'

import { motion } from 'framer-motion'

const disciplines = [
  {
    initial: 'Dr',
    name: 'Dermatology & skin',
    description: 'Reads skin health, texture and tone to ground every recommendation in clinical reality.',
  },
  {
    initial: 'Fy',
    name: 'Face yoga & movement',
    description: 'Assesses muscle tone and expression to guide what movement can genuinely change.',
  },
  {
    initial: 'Hr',
    name: 'Hair & framing',
    description: 'Considers how hairline, length and shape frame and balance your features.',
  },
  {
    initial: 'St',
    name: 'Styling & colour',
    description: 'Matches palette, contrast and styling choices to your natural colouring.',
  },
  {
    initial: 'Rs',
    name: 'Research & method',
    description: 'Keeps the analysis honest, measured and grounded in evidence rather than trend.',
  },
]

const easeOut = [0.22, 1, 0.36, 1] as const

export function Experts() {
  return (
    <section id="experts" className="py-24 bg-ivory">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-2xl mb-14"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.18em] mb-4">
            The MapMyFace expert panel
          </p>
          <h2
            className="text-[1.9rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink mb-5"
            style={{ fontWeight: 450 }}
          >
            Different specialists.{' '}
            <span className="text-analysis-teal/70">One coordinated answer.</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-ink/70 leading-relaxed">
            Your case is reviewed by the experts relevant to your needs, then brought
            together into one Face Map.
          </p>
        </motion.div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {disciplines.map((discipline, index) => (
            <motion.div
              key={discipline.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: easeOut, delay: index * 0.06 }}
              className="rounded-[22px] border border-ink/10 bg-white p-7 shadow-[0_1px_2px_rgba(21,36,33,0.04)] transition-colors duration-300 hover:bg-mist/40"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-analysis-teal text-[13px] tracking-[0.02em] mb-5"
                style={{ fontWeight: 600 }}
              >
                {discipline.initial}
              </div>
              <h3 className="text-[16px] text-ink mb-2" style={{ fontWeight: 550 }}>
                {discipline.name}
              </h3>
              <p className="text-[14px] text-ink/65 leading-relaxed">
                {discipline.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
          className="mt-10 max-w-2xl text-[13px] md:text-[14px] text-analysis-teal leading-relaxed"
        >
          Every expert appears with their full name, qualification and written consent —
          published as we onboard our founding panel.
        </motion.p>
      </div>
    </section>
  )
}
