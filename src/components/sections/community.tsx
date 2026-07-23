'use client'

import { motion } from 'framer-motion'
import { Stethoscope, ShieldCheck, Sparkles } from 'lucide-react'

const cards = [
  { icon: Stethoscope, title: 'Guided by real doctors', body: 'A qualified doctor reviews your face and answers your questions directly.' },
  { icon: ShieldCheck, title: 'Surgery-free, proven', body: 'Every recommendation is non-invasive and grounded in evidence.' },
  { icon: Sparkles, title: 'Specific, not generic', body: 'No two plans are the same — yours is prescribed only for your face.' },
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
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-[3rem] md:text-[4rem] leading-none tracking-[-0.03em]" style={{ fontWeight: 450 }}>2M+</span>
              <span className="text-[15px] text-white/50">followers &amp; growing</span>
            </div>
            <p className="text-[15px] text-white/55 leading-relaxed max-w-md">
              Join one of the world&apos;s largest natural-beauty communities. Real people, real routines, and results you can actually see.
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
