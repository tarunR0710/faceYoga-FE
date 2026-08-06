'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  CreditCard,
  MailCheck,
  PhoneCall,
  CalendarCheck,
  Video,
  Users,
  FileText,
  MessageCircleQuestion,
} from 'lucide-react'
import { EASE_OUT_SOFT, REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { CardRail } from '@/components/ui/card-rail'

const steps = [
  { n: '01', icon: CreditCard, title: 'Complete payment', body: 'Choose the main plan and any add-ons.' },
  {
    n: '02',
    icon: MailCheck,
    title: 'Receive confirmation',
    body: 'See the next steps immediately after checkout.',
  },
  { n: '03', icon: PhoneCall, title: 'Personal contact', body: 'A MapMyFace team member explains the process.' },
  {
    n: '04',
    icon: CalendarCheck,
    title: 'Choose your slot',
    body: 'Book the earliest suitable Face Mapping Session.',
  },
  { n: '05', icon: Video, title: 'Attend the session', body: 'Meet the expert in a private video consultation.' },
  { n: '06', icon: Users, title: 'Expert review', body: 'Your complete case is studied by the relevant team.' },
  {
    n: '07',
    icon: FileText,
    title: 'Receive your Face Map',
    body: 'Get your report and Appearance Protocol.',
  },
  {
    n: '08',
    icon: MessageCircleQuestion,
    title: 'Ask for clarification',
    body: 'Contact the team when anything is unclear.',
  },
]

function StepCard({
  step,
  index,
  reduce,
}: {
  step: (typeof steps)[number]
  index: number
  reduce: boolean
}) {
  const Icon = step.icon
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...REVEAL, delay: stagger(index, 0.06, 0.42) }}
      className="card-hover-accent group relative flex h-full flex-col overflow-hidden rounded-[20px] p-4 md:p-5"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-2 text-[38px] leading-none tracking-[-0.04em] text-ink/[0.04] md:text-[44px]"
        style={{ fontWeight: 500 }}
      >
        {step.n}
      </span>
      <span className="icon-tile-accent mb-4 flex h-9 w-9 items-center justify-center rounded-xl">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </span>
      <h3 className="text-[14.5px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[15px]">
        {step.title}
      </h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/[0.7] md:text-[13px]">{step.body}</p>
      <span className="mt-auto pt-3 text-[9.5px] font-medium uppercase tracking-[0.14em] text-ink/25">
        Step {step.n} of 08
      </span>
    </motion.div>
  )
}

export function AfterPayment() {
  const reduce = useReducedMotion()
  const meterRef = useRef<HTMLDivElement>(null)
  const meterInView = useInView(meterRef, { once: true, margin: '-80px' })

  return (
    <section id="after-payment" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="After payment"
          title="From checkout"
          muted="to your Face Map."
          note="You should never have to wonder what happens next. Every step is explained before payment and repeated on the confirmation screen."
        />

        {/* Eight-segment meter — the whole journey at a glance, filling in order */}
        <div ref={meterRef} className="mb-8 flex items-center gap-1.5 md:mb-10 md:gap-2" aria-hidden>
          {steps.map((s, i) => (
            <motion.span
              key={s.n}
              initial={reduce ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
              animate={
                meterInView
                  ? reduce
                    ? { opacity: 1 }
                    : { scaleX: 1, opacity: 1 }
                  : undefined
              }
              transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: i * 0.08 }}
              style={{ originX: 0 }}
              className="h-[4px] flex-1 rounded-full bg-accent/35"
            />
          ))}
        </div>

        {/* Mobile: swipe the eight steps */}
        <div className="md:hidden">
          <CardRail cols={4} peek="sm" label="What happens after payment">
            {steps.map((s, i) => (
              <StepCard key={s.n} step={s} index={i} reduce={!!reduce} />
            ))}
          </CardRail>
        </div>

        {/* Desktop: the blueprint's 4 × 2 grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-4 md:gap-5">
          {steps.map((s, i) => (
            <StepCard key={s.n} step={s} index={i} reduce={!!reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}
