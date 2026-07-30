'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Stethoscope, Activity, Scissors, Palette, Microscope } from 'lucide-react'
import { EXPERT_PANEL, PLACEHOLDER } from '@/lib/showcase'
import { EASE_OUT_SOFT } from '@/lib/motion'

const disciplines = [
  {
    icon: Stethoscope,
    name: 'Dermatology & skin',
    description: 'Reads skin health, texture and tone to ground every recommendation in clinical reality.',
  },
  {
    icon: Activity,
    name: 'Face yoga & movement',
    description: 'Assesses muscle tone and expression to guide what movement can genuinely change.',
  },
  {
    icon: Scissors,
    name: 'Hair & framing',
    description: 'Considers how hairline, length and shape frame and balance your features.',
  },
  {
    icon: Palette,
    name: 'Styling & colour',
    description: 'Matches palette, contrast and styling choices to your natural colouring.',
  },
  {
    icon: Microscope,
    name: 'Research & method',
    description: 'Keeps the analysis honest, measured and grounded in evidence rather than trend.',
  },
]

export function Experts() {
  const reduce = useReducedMotion()
  const CENTER = Math.floor(disciplines.length / 2)
  return (
    <section id="experts" className="py-24 bg-ivory">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
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
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon
            return (
              <motion.div
                key={discipline.name}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: Math.abs(index - CENTER) * 0.08 }}
                whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.2, ease: EASE_OUT_SOFT } }}
                className="group card-hover-accent rounded-[22px] p-6"
              >
                <div className="icon-tile-accent flex h-11 w-11 items-center justify-center rounded-full mb-5">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] text-ink mb-2" style={{ fontWeight: 550 }}>
                  {discipline.name}
                </h3>
                <p className="text-[14px] text-ink/65 leading-relaxed">
                  {discipline.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Founding panel — REAL named experts go here (placeholder headshots for now) */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-[12px] uppercase tracking-[0.15em] text-analysis-teal">Founding panel</h3>
            {PLACEHOLDER && (
              <span className="inline-flex items-center h-5 px-2 rounded-full bg-accent-soft text-[10px] font-medium text-accent-foreground">
                Placeholder — real experts to be onboarded
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {EXPERT_PANEL.map((expert, index) => (
              <motion.div
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: index * 0.06 }}
                className="group card-hover-accent rounded-[20px] p-5 text-center"
              >
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-mist ring-1 ring-border">
                  <Image src={expert.image} alt={expert.name} fill sizes="80px" className="object-cover" />
                </div>
                <p className="text-[14px] font-medium text-ink">{expert.name}</p>
                <p className="text-[12px] text-analysis-teal mt-0.5">{expert.credential}</p>
                <p className="text-[11px] text-ink/50 mt-1">{expert.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.1 }}
          className="mt-10 max-w-2xl text-[13px] md:text-[14px] text-analysis-teal leading-relaxed"
        >
          Every expert appears with their full name, qualification and written consent —
          published as we onboard our founding panel.
        </motion.p>
      </div>
    </section>
  )
}
