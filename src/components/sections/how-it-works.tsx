'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Choose your plan',
    description: 'Select your Complete Face Map and any optional add-ons.',
  },
  {
    number: '02',
    title: 'Meet your expert',
    description: 'A live 45–60 minute Face Mapping Session with a real expert.',
  },
  {
    number: '03',
    title: 'We map the complete case',
    description: 'Five expert disciplines review your face, skin, routine and lifestyle.',
  },
  {
    number: '04',
    title: 'Receive your Face Map',
    description: 'Your personalised Face Map and Appearance Protocol, in 2–4 working days.',
  },
  {
    number: '05',
    title: 'Ask when you need clarity',
    description: 'A real person answers your questions about your Face Map.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-ivory">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.14em] mb-3">
            The MapMyFace Method
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink mb-4" style={{ fontWeight: 450 }}>
            A deeper process. <span className="text-ink/40">A clearer plan.</span>
          </h2>
          <p className="text-[15px] md:text-base text-analysis-teal leading-relaxed">
            The expertise happens behind the scenes. Your journey stays simple.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="relative rounded-[22px] bg-white p-5 md:p-6 border border-[rgba(21,36,33,0.12)] shadow-[0_1px_2px_rgba(21,36,33,0.04)] transition-all duration-300 hover:border-[rgba(21,36,33,0.2)] hover:shadow-[0_4px_16px_rgba(21,36,33,0.06)]"
            >
              {/* Number chip */}
              <span className="mb-4 inline-flex items-center justify-center rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium tracking-[0.08em] text-analysis-teal">
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
  )
}
