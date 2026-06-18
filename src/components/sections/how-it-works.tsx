'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Complete the questionnaire',
    description: 'Tell us about your facial concerns and goals. This helps us understand your unique needs.',
  },
  {
    number: '02',
    title: 'Get your facial analysis',
    description: 'Our experts analyze your facial structure using 160+ parameters to identify target areas.',
  },
  {
    number: '03',
    title: 'Receive your personalized plan',
    description: 'Get your complete face yoga protocol with video tutorials and progress tracking.',
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
