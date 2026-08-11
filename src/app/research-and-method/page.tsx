'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SectionTag } from '@/components/ui/section-tag'

// The five layers of the Face Mapping Method — plain, honest descriptions.
const layers = [
  {
    number: '01',
    title: 'Face Architecture',
    description:
      'The structure underneath — bone, proportion and balance — that shapes how your features read.',
  },
  {
    number: '02',
    title: 'Skin & Surface',
    description:
      'Texture, tone and condition of the skin, mapped as it looks today rather than as a promise.',
  },
  {
    number: '03',
    title: 'Routine & Products',
    description:
      'What you already do, and how each step is working for the face in front of us.',
  },
  {
    number: '04',
    title: 'Lifestyle & Environment',
    description:
      'Sleep, sun, stress and habits — the everyday inputs that show up on your face.',
  },
  {
    number: '05',
    title: 'Expression, Movement & Face Yoga',
    description:
      'How your face moves, and where mindful movement can gently support it.',
  },
]

// The delivery process, start to finish.
const process = [
  {
    number: '01',
    title: 'Live Face Mapping Session',
    description:
      'A real expert meets you and maps your face 1-on-1 in a live session.',
  },
  {
    number: '02',
    title: 'Expert Mapping Review',
    description:
      'A coordinated, multidisciplinary review of everything gathered in your session.',
  },
  {
    number: '03',
    title: 'Face Map + Appearance Protocol',
    description:
      'Your documented Face Map and personalised plan, delivered in 2–4 working days.',
  },
]

// What honesty means here — provable commitments only, no invented figures.
const commitments = [
  'We publish only what we can prove.',
  'Every recommendation is reviewed by the relevant experts.',
  '0 surgery — we do not perform or push surgical procedures.',
  'We refer you to in-person care when that is the right thing to do.',
]

export default function Page() {
  return (
    <>
      <Header />
      <main className="bg-ivory font-sans text-ink">
        {/* Hero */}
        <section className="section">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-3">
                <SectionTag>Research &amp; Method</SectionTag>
              </div>
              <h1
                className="text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.02em] text-ink mb-4"
                style={{ fontWeight: 450 }}
              >
                Human-led. <span className="text-ink/40">Research-informed.</span>
              </h1>
              <p className="text-[15px] md:text-[17px] text-analysis-teal leading-relaxed">
                Real experts, a documented method, and honesty as the standard.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Five-Layer Face Mapping Method */}
        <section className="section bg-ivory">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center max-w-xl mx-auto mb-12"
            >
              <div className="mb-3">
                <SectionTag>The Method</SectionTag>
              </div>
              <h2
                className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-4"
                style={{ fontWeight: 450 }}
              >
                The Five-Layer <span className="text-ink/40">Face Mapping Method.</span>
              </h2>
              <p className="text-[15px] md:text-base text-analysis-teal leading-relaxed">
                Five layers, reviewed together, to understand the whole face — not one part in isolation.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="relative rounded-[22px] bg-white p-5 md:p-6 border border-ink/10 shadow-sm transition-all duration-300 hover:border-ink/20 hover:shadow-md"
                >
                  <span className="mb-4 inline-flex items-center justify-center rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-medium tracking-[0.08em] text-teal">
                    {layer.number}
                  </span>
                  <h3 className="mb-2 text-[17px] font-medium tracking-[-0.01em] text-ink">
                    {layer.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-analysis-teal">
                    {layer.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The process */}
        <section className="section bg-ivory">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center max-w-xl mx-auto mb-12"
            >
              <div className="mb-3">
                <SectionTag>The Process</SectionTag>
              </div>
              <h2
                className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-4"
                style={{ fontWeight: 450 }}
              >
                From session to plan. <span className="text-ink/40">In days, not weeks.</span>
              </h2>
              <p className="text-[15px] md:text-base text-analysis-teal leading-relaxed">
                A live session, a coordinated expert review, and a documented result you can act on.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3 lg:gap-6">
              {process.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="relative rounded-[22px] bg-white p-5 md:p-6 border border-ink/10 shadow-sm transition-all duration-300 hover:border-ink/20 hover:shadow-md"
                >
                  <span className="mb-4 inline-flex items-center justify-center rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-medium tracking-[0.08em] text-teal">
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

        {/* Honesty */}
        <section className="section bg-ivory">
          <div className="container-main">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-lg"
              >
                <div className="mb-3">
                  <SectionTag>Honesty</SectionTag>
                </div>
                <h2
                  className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-4"
                  style={{ fontWeight: 450 }}
                >
                  Honesty is the <span className="text-ink/40">standard.</span>
                </h2>
                <p className="text-[15px] md:text-base text-analysis-teal leading-relaxed">
                  We would rather say less and mean it. No invented statistics, no borrowed
                  citations — just a method we can stand behind and experts who review what we
                  recommend.
                </p>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                className="rounded-[22px] bg-white p-6 md:p-8 border border-ink/10 shadow-sm space-y-4"
              >
                {commitments.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                    <span className="text-[15px] leading-relaxed text-ink">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-ivory">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="rounded-[28px] bg-white border border-ink/10 shadow-sm text-center max-w-2xl mx-auto px-6 py-12 md:px-10 md:py-14"
            >
              <div className="mb-4">
                <SectionTag>Ready when you are</SectionTag>
              </div>
              <h2
                className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-8"
                style={{ fontWeight: 450 }}
              >
                See the method applied to your face.
              </h2>
              <Link
                href="/form"
                className="inline-flex items-center justify-center h-14 px-9 bg-ink text-ivory text-[15px] font-semibold rounded-full hover:bg-accent-soft hover:text-ink transition-colors duration-300 ease-smooth group"
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
