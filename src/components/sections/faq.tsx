'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const faqs = [
  {
    category: 'General',
    items: [
      { q: 'What is face yoga?', a: 'Face yoga is a series of targeted facial exercises designed to tone and strengthen the muscles in your face. Consistent practice can help define facial contours, improve skin elasticity, and create a more youthful appearance naturally.' },
      { q: 'How long until I see results?', a: 'Most users notice subtle improvements within 2-4 weeks of consistent practice. Significant results typically appear after 8-12 weeks, depending on your starting point and consistency.' },
      { q: 'Is face yoga safe?', a: 'Yes, face yoga is completely safe when done correctly. Our exercises are designed by experts and include detailed video instructions to ensure proper form.' },
    ],
  },
  {
    category: 'About The Plan',
    items: [
      { q: "What's included in my plan?", a: 'Your plan includes a comprehensive facial analysis, customized exercise routines, HD video tutorials, a daily schedule, progress tracking tools, and access to our support team.' },
      { q: 'How is my plan personalized?', a: 'We analyze your facial structure using 160+ parameters to identify your unique characteristics and target areas, creating a routine specifically designed for your face.' },
      { q: 'Can I access on mobile?', a: 'Yes! Your plan is fully accessible on any device - desktop, tablet, or smartphone. Practice wherever and whenever convenient.' },
    ],
  },
  {
    category: 'Pricing & Payment',
    items: [
      { q: 'What are the pricing options?', a: 'We offer flexible pricing including one-time purchase and subscription options. All plans include full access to your personalized routine and video tutorials.' },
      { q: 'Can I get a refund?', a: "Yes, we offer a 14-day satisfaction guarantee. If you're not happy with your plan, contact our support team for a full refund." },
      { q: 'Is my payment secure?', a: 'Absolutely. We use Razorpay, a trusted payment gateway that encrypts all transactions. Your financial information is never stored on our servers.' },
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
    <div className="border-b border-[#eee] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="text-[14px] font-medium text-[#111] group-hover:text-[#555] transition-colors pr-4">
          {question}
        </span>
        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f5f5f5] flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-3 h-3 text-[#666]" strokeWidth={2} />
          ) : (
            <Plus className="w-3 h-3 text-[#666]" strokeWidth={2} />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[13px] text-[#666] leading-relaxed pr-8">
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
    <section id="faq" className="section bg-[#fafafa]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="text-[12px] text-[#999] uppercase tracking-[0.1em] mb-3">
            FAQ
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] md:text-base text-[#666] leading-relaxed">
            Everything you need to know about Face Yoga
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
              <p className="text-[11px] font-medium text-[#999] uppercase tracking-[0.1em] mb-4">
                {category.category}
              </p>
              <div className="bg-white rounded-xl border border-[#eee] px-5">
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
          className="mt-12 text-center text-[14px] text-[#666]"
        >
          Still have questions?{' '}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#111] font-medium hover:underline">
            Contact support
          </a>
        </motion.p>
      </div>
    </section>
  )
}
