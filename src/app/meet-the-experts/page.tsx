'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SectionTag } from '@/components/ui/section-tag'

const easeOut = [0.22, 1, 0.36, 1] as const

// Locked discipline vocabulary — mirrors the homepage Experts section.
// Pre-launch: disciplines only. No named doctors until consented onboarding.
const disciplines = [
  {
    initial: 'Dr',
    name: 'Dermatology & skin',
    description: 'Reads skin health, texture and tone to ground every recommendation in clinical reality.',
    tone: 'bg-accent-soft',
  },
  {
    initial: 'Fy',
    name: 'Face yoga & movement',
    description: 'Assesses muscle tone and expression to guide what movement can genuinely change.',
    tone: 'bg-sand',
  },
  {
    initial: 'Hr',
    name: 'Hair & framing',
    description: 'Considers how hairline, length and shape frame and balance your features.',
    tone: 'bg-accent-soft',
  },
  {
    initial: 'St',
    name: 'Styling & colour',
    description: 'Matches palette, contrast and styling choices to your natural colouring.',
    tone: 'bg-sand',
  },
  {
    initial: 'Rs',
    name: 'Research & method',
    description: 'Keeps the analysis honest, measured and grounded in evidence rather than trend.',
    tone: 'bg-accent-soft',
  },
]

// How the panel coordinates a single, non-contradictory Face Map.
const panelFlow = [
  {
    step: '01',
    role: 'Session expert',
    description: 'Meets you first, understands your goals and frames what your case is really asking.',
  },
  {
    step: '02',
    role: 'Specialist reviewers',
    description: 'The disciplines relevant to your needs each review your case in their own field.',
  },
  {
    step: '03',
    role: 'Case integrator',
    description: 'Reconciles every reviewer into one coherent direction, resolving any tension between them.',
  },
  {
    step: '04',
    role: 'Quality lead',
    description: 'Signs off that your Face Map is coordinated, non-contradictory and honestly scoped.',
  },
]

export default function Page() {
  return (
    <>
      <Header />
      <main className="bg-ivory">
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="max-w-3xl"
            >
              <div className="mb-5">
                <SectionTag>The MapMyFace expert panel</SectionTag>
              </div>
              <h1
                className="text-[2.25rem] md:text-[3rem] leading-[1.1] tracking-[-0.02em] text-ink mb-6"
                style={{ fontWeight: 450 }}
              >
                Different specialists.{' '}
                <span className="text-analysis-teal/70">One coordinated answer.</span>
              </h1>
              <p className="text-[16px] md:text-[18px] text-ink/70 leading-relaxed max-w-2xl">
                Your case is reviewed by the experts relevant to your needs, then brought
                together into one Face Map.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Five discipline cards */}
        <section className="pb-20 md:pb-24">
          <div className="container-main">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {disciplines.map((discipline, index) => (
                <motion.div
                  key={discipline.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: easeOut, delay: index * 0.06 }}
                  className="rounded-[22px] border border-ink/10 bg-white p-7 shadow-sm transition-colors duration-300 hover:bg-mist/40"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${discipline.tone} text-teal text-[13px] tracking-[0.02em] mb-5`}
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
          </div>
        </section>

        {/* How the panel works */}
        <section className="py-20 md:py-24 border-t border-ink/10">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="max-w-2xl mb-14"
            >
              <div className="mb-4">
                <SectionTag>How the panel works</SectionTag>
              </div>
              <h2
                className="text-[1.9rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ink mb-5"
                style={{ fontWeight: 450 }}
              >
                Reviewed separately.{' '}
                <span className="text-analysis-teal/70">Delivered as one Face Map.</span>
              </h2>
              <p className="text-[14px] md:text-[17px] text-ink/70 leading-relaxed">
                No conflicting opinions to reconcile yourself. Each specialist works in their
                own field, then their views are integrated into one coordinated,
                non-contradictory answer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {panelFlow.map((stage, index) => (
                <motion.div
                  key={stage.role}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: easeOut, delay: index * 0.06 }}
                  className="rounded-[22px] border border-ink/10 bg-white p-7 shadow-sm"
                >
                  <span className="text-[13px] text-teal tracking-[0.06em]" style={{ fontWeight: 600 }}>
                    {stage.step}
                  </span>
                  <h3 className="text-[16px] text-ink mt-3 mb-2" style={{ fontWeight: 550 }}>
                    {stage.role}
                  </h3>
                  <p className="text-[14px] text-ink/65 leading-relaxed">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust line — named at launch */}
        <section className="pb-20 md:pb-24">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="rounded-[22px] border border-ink/10 bg-accent-soft p-8 md:p-10 max-w-3xl"
            >
              <p className="text-[14px] md:text-[17px] text-ink leading-relaxed">
                Every expert appears with their full name, qualification and written consent —
                published as we onboard our founding panel.
              </p>
              <p className="mt-3 text-[13px] md:text-[14px] text-analysis-teal leading-relaxed">
                We are pre-launch. Until our founding panel is named, we describe the
                disciplines that review your case rather than showing people we have not yet
                onboarded.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-ink">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2
                className="text-[1.75rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ivory mb-10"
                style={{ fontWeight: 450 }}
              >
                One coordinated answer, from the specialists your case actually needs.
              </h2>

              <Link
                href="/form"
                className="inline-flex items-center justify-center h-14 px-9 bg-ivory text-ink text-[14px] font-semibold rounded-full hover:bg-mist transition-colors duration-300 ease-smooth group"
              >
                Start My Face Map
                <ArrowRight
                  className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
