'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Share your photos & concerns',
    description: 'Tell us about your facial goals and send a few photos. This gives your doctor everything they need to start.',
  },
  {
    number: '02',
    title: 'Consult your own doctor',
    description: 'A qualified doctor personally reviews your face, answers your questions, and prescribes a routine specific to you — not an algorithm.',
  },
  {
    number: '03',
    title: 'Follow your plan & stay in touch',
    description: 'Get your face yoga protocol with video tutorials, track progress, and message your doctor whenever a doubt comes up.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-[#fafafa]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.1em] mb-3">
            Simple process
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            How it works
          </h2>
          <p className="text-[15px] md:text-base text-[#666] leading-relaxed">
            Get started in three simple steps and begin your transformation journey
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-xl p-5 md:p-6 border border-[#eee] hover:border-[#ddd] hover:shadow-sm transition-all duration-200"
            >
              {/* Number */}
              <span className="text-[11px] font-medium text-[#bbb] tracking-wider mb-4 block">
                {step.number}
              </span>

              <h3 className="text-[17px] font-medium text-[#111] mb-2 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-[14px] text-[#666] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
