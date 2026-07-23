'use client'

import { motion } from 'framer-motion'
import { Dna, CalendarClock, Activity, Target, Scan } from 'lucide-react'

const factors = [
  {
    icon: Dna,
    title: 'Your muscle baseline',
    description: 'Your doctor assesses the current tone and activation of each of your 57 facial muscles before recommending a single exercise.',
  },
  {
    icon: CalendarClock,
    title: 'Your age & skin elasticity',
    description: 'Collagen and skin behave differently at 25 than at 45. Your plan adapts to how your face actually ages.',
  },
  {
    icon: Activity,
    title: 'Your lifestyle & habits',
    description: 'Sleep, screen time, stress and posture all shape your face. We factor in your real daily routine.',
  },
  {
    icon: Target,
    title: 'Your personal goals',
    description: 'Lift, definition, symmetry or a softer look — we build toward what you actually want, not a generic ideal.',
  },
  {
    icon: Scan,
    title: 'Your bone structure',
    description: 'Your underlying proportions decide what is realistic. Every recommendation is grounded in your unique anatomy.',
  },
]

export function PersonalizationFactors() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">Built around you</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-[#111]" style={{ fontWeight: 450 }}>
            Every plan is shaped by{' '}
            <span className="text-black/30">your face, not an average one.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {factors.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group rounded-2xl p-6 bg-[#fafafa] border border-[#f0f0f0] transition-all duration-200 hover:bg-white hover:shadow-[0_20px_32px_-20px_rgba(0,0,0,0.25)] hover:border-transparent hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-[#eee] flex items-center justify-center mb-5 transition-colors group-hover:bg-[#111] group-hover:border-[#111]">
                  <Icon className="w-5 h-5 text-[#111] transition-colors group-hover:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-medium text-[#111] mb-2 tracking-[-0.01em]">{f.title}</h3>
                <p className="text-[14px] text-[#666] leading-relaxed">{f.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
