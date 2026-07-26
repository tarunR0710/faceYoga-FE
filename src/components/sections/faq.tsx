'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const faqs = [
  {
    category: 'The approach',
    items: [
      {
        q: 'Is MapMyFace only face yoga?',
        a: 'No. Face yoga is one of five expert layers inside a broader, personalised Face Map.',
      },
      {
        q: 'Is this an AI face scan?',
        a: 'No. Technology may help visualise, but real experts lead the consultation, interpretation and recommendations.',
      },
      {
        q: 'Will you recommend surgery?',
        a: 'No. MapMyFace focuses on non-surgical appearance guidance — 0 surgery, ever.',
      },
    ],
  },
  {
    category: 'Your Face Map',
    items: [
      {
        q: 'How long does it take?',
        a: 'Your Face Map is delivered within 2–4 working days after your completed Face Mapping Session.',
      },
      {
        q: 'Can I ask questions after delivery?',
        a: 'Yes. When something in your Face Map is unclear, a real person answers.',
      },
      {
        q: 'Are Hair Map and Style & Colour Map included?',
        a: 'They are optional specialist add-ons you can select before payment (₹699 each).',
      },
    ],
  },
  {
    category: 'Privacy',
    items: [
      {
        q: 'How is my data handled?',
        a: 'Your face photos and session are private, used only to create your Face Map, and never used in marketing without your explicit written consent.',
      },
    ],
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-ink/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="text-[14px] font-medium text-ink group-hover:text-analysis-teal transition-colors pr-4">
          {question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mist flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-3 h-3 text-teal" strokeWidth={2} />
          ) : (
            <Plus className="w-3 h-3 text-teal" strokeWidth={2} />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[13px] text-analysis-teal leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section id="faq" className="section bg-ivory">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="text-[12px] text-analysis-teal uppercase tracking-[0.1em] mb-3">
            FAQ
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] mb-4" style={{ fontWeight: 450 }}>
            <span className="text-ink">Questions, </span>
            <span className="text-analysis-teal">answered honestly.</span>
          </h2>
          <p className="text-[15px] md:text-base text-analysis-teal leading-relaxed">
            What MapMyFace is, how your Face Map works, and how your data stays private.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <p className="text-[11px] font-medium text-analysis-teal uppercase tracking-[0.1em] mb-4">
                {category.category}
              </p>
              <div className="bg-ivory rounded-[18px] border border-ink/10 px-5">
                {category.items.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openItems[`${categoryIndex}-${index}`] || false}
                    onToggle={() => toggleItem(`${categoryIndex}-${index}`)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-[14px] text-analysis-teal"
        >
          Still have questions?{' '}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-ink font-medium hover:underline">
            Contact support
          </a>
        </motion.p>
      </div>
    </section>
  )
}
