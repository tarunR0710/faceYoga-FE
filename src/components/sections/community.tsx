'use client'

import { motion } from 'framer-motion'
import { Stethoscope, ShieldCheck, Sparkles } from 'lucide-react'

const cards = [
  { icon: Stethoscope, title: 'Guided by real doctors', body: 'A qualified doctor reviews your face and answers your questions directly.' },
  { icon: ShieldCheck, title: 'Surgery-free', body: 'Every recommendation is non-invasive and grounded in evidence.' },
  { icon: Sparkles, title: 'Specific, not generic', body: 'No two plans are the same — yours is recommended only for your face.' },
]

export function Community() {
  return (
    <section className="py-16 md:py-20 bg-[#111] text-white overflow-hidden">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[12px] text-white/40 uppercase tracking-[0.15em] mb-4">The community</p>
            <h2 className="text-[2rem] md:text-[2.75rem] leading-[1.1] tracking-[-0.03em] mb-3" style={{ fontWeight: 450 }}>
              Built with experts. Tested with real people.
            </h2>
            <p className="text-[15px] text-white/55 leading-relaxed max-w-md">
              We are just getting started — real people, real routines, and honest guidance for your face.
            </p>
          </motion.div>

          <div className="space-y-3">
            {cards.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl p-5"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium text-white">{c.title}</h3>
                    <p className="text-[13px] text-white/50">{c.body}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
