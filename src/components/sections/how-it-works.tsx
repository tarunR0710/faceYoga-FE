'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ShoppingBag, Video, Users, FileText, MessageCircleQuestion } from 'lucide-react'
import { EASE_OUT_SOFT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

const steps = [
  {
    number: '01',
    icon: ShoppingBag,
    title: 'Choose Your Plan',
    description:
      'Select the Complete MapMyFace Plan and add a Hair Map or Style & Colour Map when required.',
  },
  {
    number: '02',
    icon: Video,
    title: 'Face Mapping Session',
    description: 'Meet a real expert through a scheduled video consultation.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Expert Mapping Review',
    description: 'The relevant specialists study your face, skin, routine, context and goals.',
  },
  {
    number: '04',
    icon: FileText,
    title: 'Receive Your Face Map',
    description: 'Receive your personalised analysis, recommendations and Appearance Protocol.',
  },
  {
    number: '05',
    icon: MessageCircleQuestion,
    title: 'Ask for Clarification',
    description: 'Contact the team when you need help understanding your Face Map.',
  },
]

export function HowItWorks() {
  const reduce = useReducedMotion()

  return (
    <section id="how-it-works" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="The MapMyFace method"
          align="center"
          title="A human-led process designed"
          muted="to understand the complete person."
          lede="Complex analysis happens behind the scenes. The customer experiences a clear, guided journey from booking to personal direction."
        />

        {/* ── Desktop: five stops on one drawn line ───────────────────────── */}
        <div className="relative hidden md:block">
          {/* the journey line — draws left to right once, behind the nodes */}
          <div className="absolute left-[10%] right-[10%] top-[22px] h-px overflow-hidden" aria-hidden>
            <motion.div
              initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
              whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.25, ease: EASE_OUT_SOFT, delay: 0.1 }}
              style={{ originX: 0 }}
              className="h-full w-full"
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
            </motion.div>
          </div>

          <ol className="relative grid grid-cols-5 gap-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.number}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ ...REVEAL, delay: 0.25 + stagger(i, 0.11) }}
                  className="group text-center"
                >
                  {/* node */}
                  <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 bg-surface transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_8px_20px_-10px_rgb(var(--c-accent)/0.5)]">
                    <Icon className="h-[18px] w-[18px] text-accent/75" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent/60">
                    {step.number}
                  </p>
                  <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink lg:text-[16px]">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[210px] text-[13px] leading-relaxed text-analysis-teal">
                    {step.description}
                  </p>
                </motion.li>
              )
            })}
          </ol>
        </div>

        {/* ── Mobile: vertical timeline, one drawn spine ──────────────────── */}
        <div className="relative md:hidden">
          <div className="absolute bottom-6 left-[19px] top-3 w-px overflow-hidden" aria-hidden>
            <motion.div
              initial={reduce ? { opacity: 0 } : { scaleY: 0 }}
              whileInView={reduce ? { opacity: 1 } : { scaleY: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.3, ease: EASE_OUT_SOFT }}
              style={{ originY: 0 }}
              className="h-full w-full bg-gradient-to-b from-accent/35 via-accent/25 to-transparent"
            />
          </div>

          <ol className="relative space-y-5">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.number}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ ...REVEAL, delay: stagger(i, 0.09) }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-surface">
                    <Icon className="h-[17px] w-[17px] text-accent/75" strokeWidth={1.5} />
                  </div>
                  <div className="pt-0.5">
                    <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-accent/60">
                      {step.number}
                    </p>
                    <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-analysis-teal">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
