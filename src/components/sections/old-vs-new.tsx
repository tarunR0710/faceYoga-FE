'use client'

import { motion } from 'framer-motion'

const genericAdvice = [
  'The same answer for everyone',
  'Trend-led product choices',
  'Isolated features, no context',
  'No priority or sequence',
]

const mapMyFace = [
  'Your complete context, understood',
  'Real expert interpretation',
  'One coordinated plan',
  'A clear sequence: start, stop, continue',
]

export function OldVsNew() {
  return (
    <section id="why" className="pt-6 md:pt-10 pb-12 md:pb-16 bg-glow-tr">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] text-analysis-teal mb-4">
            The Problem
          </p>
          <h2 className="text-[2rem] md:text-[3rem] leading-[1.1] tracking-[-0.02em] text-ink" style={{ fontWeight: 400 }}>
            Generic advice sees a category.{' '}
            <span className="text-ink/40">We see a person.</span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-analysis-teal leading-relaxed mt-6">
            Beauty advice is everywhere. Clarity is not. Most advice answers a category — MapMyFace understands the person behind the face.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Generic advice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-[22px] p-6 md:p-8 bg-mist border border-ink/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-analysis-teal/40" />
              </div>
              <h3 className="text-[15px] font-medium text-ink">Generic advice</h3>
            </div>
            <div className="space-y-4">
              {genericAdvice.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeWidth="1.5"
                    className="text-analysis-teal/50 shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path d="M4 8h8" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                  <span className="text-[14px] text-analysis-teal leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MapMyFace - emphasised Map Teal tint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="rounded-[22px] p-6 md:p-8 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, rgb(var(--c-accent) / 0.18) 0%, rgb(var(--c-surface)) 44%, rgb(var(--c-surface)) 100%)',
              border: '1px solid rgb(var(--c-accent) / 0.28)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgb(var(--c-accent) / 0.30), rgb(var(--c-accent) / 0.08))' }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
              <h3 className="text-[15px] font-medium text-ink">MapMyFace</h3>
            </div>
            <div className="space-y-4">
              {mapMyFace.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeWidth="1.5"
                    className="text-analysis-teal shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 8.5l3 3 6-7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px] text-ink leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
