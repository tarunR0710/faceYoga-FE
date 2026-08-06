'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Target, History, Sun, Utensils, CloudSun, UserRound, ShieldAlert } from 'lucide-react'
import { REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { DetailAccordion, type DetailGroup } from '@/components/ui/detail-accordion'

const groups: DetailGroup[] = [
  {
    title: 'Your goals',
    icon: Target,
    items: [
      'What would you like to improve?',
      'What concerns you most?',
      'What result are you hoping to achieve?',
    ],
  },
  {
    title: 'Your skincare history',
    icon: History,
    items: [
      'Products currently used',
      'Products used during the previous year',
      'Reactions, sensitivities and what has or has not worked',
    ],
  },
  {
    title: 'Your daily routine',
    icon: Sun,
    items: [
      'Morning and evening routine',
      'Work environment, sleep and stress',
      'Sun exposure and physical activity',
    ],
  },
  {
    title: 'Your lifestyle',
    icon: Utensils,
    items: [
      'Food habits and water intake',
      'Travel frequency and daily schedule',
      'Smoking or alcohol where relevant',
    ],
  },
  {
    title: 'Your environment',
    icon: CloudSun,
    items: [
      'Location, climate and humidity',
      'Pollution and seasonal changes',
      'Regular travel locations',
    ],
  },
  {
    title: 'Relevant personal context',
    icon: UserRound,
    items: [
      'Existing concerns voluntarily disclosed',
      'Grooming and face-yoga history',
      'Budget and maintenance preferences',
    ],
  },
]

export function ExpertUnderstands() {
  const reduce = useReducedMotion()

  return (
    <section id="expert-understands" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="What the expert understands"
          title="Personal recommendations"
          muted="require personal context."
          note="The Face Mapping Session follows a structured conversation, while still giving the expert freedom to ask deeper questions where the customer's situation requires it."
        />

        {/* Mobile: accordion — six groups stay one screen instead of six */}
        <div className="md:hidden">
          <DetailAccordion groups={groups} />
        </div>

        {/* Desktop: the blueprint's 3 × 2 grid */}
        <div className="hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => {
            const Icon = g.icon!
            return (
              <motion.div
                key={g.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...REVEAL, delay: stagger(i) }}
                className="card-hover-accent group rounded-[22px] p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="icon-tile-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </span>
                  <h3 className="text-[16px] font-medium tracking-[-0.01em] text-ink">{g.title}</h3>
                </div>
                <ul className="space-y-3">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                      <span className="text-[13.5px] leading-relaxed text-ink/[0.72]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Professional boundary — kept visible, not buried in the legal page */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="mt-8 flex items-start gap-3 rounded-[18px] bg-mist px-4 py-4 md:mt-10 md:px-5"
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-analysis-teal" strokeWidth={1.6} />
          <p className="text-[12.5px] leading-relaxed text-analysis-teal md:text-[13.5px]">
            <span className="font-medium text-ink">Professional boundary.</span> MapMyFace provides
            appearance, routine and educational guidance. Medical concerns requiring diagnosis or
            treatment should be handled by an appropriately qualified medical professional.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
