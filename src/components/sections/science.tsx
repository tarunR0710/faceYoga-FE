'use client'

import { motion } from 'framer-motion'
import { Stethoscope, Target, FlaskConical, MessageCircle } from 'lucide-react'

const pillars = [
  {
    icon: Stethoscope,
    stat: '1-on-1',
    title: 'A real doctor, not an app',
    description: 'You are matched with a qualified doctor who reviews your face personally. No AI verdicts — a human who actually looks at you.',
  },
  {
    icon: Target,
    stat: 'Specific',
    title: 'Your treatment, never generic',
    description: 'Your doctor prescribes exercises and care for your exact concerns and anatomy — not a one-size template everyone receives.',
  },
  {
    icon: MessageCircle,
    stat: 'Unlimited',
    title: 'Your questions, answered',
    description: 'Have a doubt about a technique or a result? Message your doctor and get a real, considered reply — never a chatbot.',
  },
  {
    icon: FlaskConical,
    stat: '450+',
    title: 'Evidence-based methods',
    description: 'Every technique your doctor draws from is grounded in reviewed facial-training and skin-health research.',
  },
]

export function Science() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">Our approach</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-[#111]" style={{ fontWeight: 450 }}>
            A real doctor behind your{' '}
            <span className="text-black/30">transformation.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl p-6 bg-[#fafafa] border border-[#f0f0f0] flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-[#111] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-[22px] leading-none text-[#111] mb-2" style={{ fontWeight: 450 }}>{p.stat}</p>
                <h3 className="text-[15px] font-medium text-[#111] mb-2">{p.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{p.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
