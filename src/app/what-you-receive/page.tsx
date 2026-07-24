'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const ease = [0.22, 0.61, 0.36, 1] as const

// The Face Map deliverable, section by section. Honest, plain-language copy —
// a plan, not a score. The highlighted card (Appearance Protocol) carries the
// single .card-glow allowed per page.
const contents = [
  {
    step: '01',
    title: 'Overview',
    body: 'Opens with your three biggest strengths, in plain language. We start with what already works before we touch anything else.',
    highlight: false,
  },
  {
    step: '02',
    title: 'Facial Map',
    body: 'Your features read across 9 zones, with clear labels. A calm, honest map of what is there — no ranking, no verdict.',
    highlight: false,
  },
  {
    step: '03',
    title: 'Skin & routine review',
    body: 'A look at your current skin and routine, with a shorter, sensible direction that fits your skin rather than a trend.',
    highlight: false,
  },
  {
    step: '04',
    title: 'Grooming direction',
    body: 'Practical grooming notes — brows, facial hair, everyday upkeep — tuned to your features rather than a generic template.',
    highlight: false,
  },
  {
    step: '05',
    title: 'Relevant face yoga',
    body: 'One supporting layer of five. A small set of movements that suit your face — an aid, never the whole plan.',
    highlight: false,
  },
  {
    step: '06',
    title: 'Appearance Protocol',
    body: 'What to start, stop and continue — and what to do first, next and later. This is where observations become a plan you can act on.',
    highlight: true,
  },
  {
    step: '07',
    title: 'Clarification support',
    body: 'Follow-up support to clarify anything in your Face Map, so you are never left guessing what a note means or where to begin.',
    highlight: false,
  },
]

export default function Page() {
  return (
    <>
      <Header />
      <main className="bg-ivory">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container-main relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease }}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-wide text-analysis-teal md:text-[13px]">
                What you receive
              </span>

              <h1
                className="text-[2rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.75rem] lg:text-[3.25rem]"
                style={{ fontWeight: 450 }}
              >
                Not just what we see.{' '}
                <span className="text-ink/40">What it means for you.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-analysis-teal md:text-[16px]">
                Your Face Map is a plan, not a score.
              </p>
            </motion.div>

            <motion.hr
              initial={{ opacity: 0, scaleX: 0.6 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="divider-accent mx-auto mt-14 max-w-md"
            />
          </div>
        </section>

        {/* ── The Face Map contents ──────────────────────────────── */}
        <section className="pb-4 md:pb-8">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease }}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-wide text-analysis-teal md:text-[13px]">
                Inside your Face Map
              </span>
              <h2
                className="text-[1.6rem] leading-[1.15] tracking-[-0.02em] text-ink md:text-[2rem]"
                style={{ fontWeight: 450 }}
              >
                Seven parts that work together.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-ink/78 md:text-[15px]">
                Each part connects expert observation to something you can
                actually do — read top to bottom, or jump to what you need.
              </p>
            </motion.div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {contents.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease, delay: (i % 3) * 0.08 }}
                  className={
                    item.highlight
                      ? 'card-glow flex flex-col rounded-[22px] border border-teal/20 p-7'
                      : 'flex flex-col rounded-[22px] border border-ink/10 bg-white p-7 shadow-sm'
                  }
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={
                        item.highlight
                          ? 'flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[12px] font-medium text-teal'
                          : 'flex h-8 w-8 items-center justify-center rounded-full bg-mist text-[12px] font-medium text-analysis-teal'
                      }
                    >
                      {item.step}
                    </span>
                    {item.highlight && (
                      <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-teal">
                        The plan
                      </span>
                    )}
                  </div>
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink md:text-[18px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink/78">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Optional add-ons note ──────────────────────────────── */}
        <section className="py-16 md:py-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease }}
              className="mx-auto max-w-3xl rounded-[22px] border border-ink/10 bg-white p-8 shadow-sm md:p-10"
            >
              <span className="mb-3 inline-block text-[11px] font-medium uppercase tracking-wide text-analysis-teal md:text-[13px]">
                Optional add-ons
              </span>
              <h3 className="text-[18px] font-medium tracking-[-0.01em] text-ink md:text-[20px]">
                A Hair Map and a Style &amp; Colour Map are optional specialist
                add-ons.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/78 md:text-[15px]">
                Your Face Map stands on its own. If you want to go further, these
                specialist layers can be added — but nothing here depends on them.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Closing CTA ────────────────────────────────────────── */}
        <section className="bg-ink py-24 md:py-32">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mx-auto max-w-2xl text-center"
            >
              <p className="mb-4 text-[12px] uppercase tracking-[0.15em] text-teal">
                Ready when you are
              </p>
              <h2
                className="text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-ivory md:text-[2.5rem]"
                style={{ fontWeight: 450 }}
              >
                A plan for your face, not a score.
              </h2>

              <Link
                href="/form"
                className="group mt-10 inline-flex h-14 items-center justify-center rounded-full bg-ivory px-9 text-[15px] font-semibold text-ink transition-colors duration-300 ease-smooth hover:bg-mist"
              >
                Start My Face Map
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>

              <p className="mt-5 text-[13px] text-analysis-teal">
                No commitment required.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
