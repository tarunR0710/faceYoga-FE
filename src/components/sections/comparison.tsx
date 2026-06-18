'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const oldWay = [
  'Expensive surgical procedures (₹2-10 lakhs)',
  'Risk of complications and side effects',
  'Long recovery periods',
  'Unnatural results that fade',
  'Requires repeated treatments',
]

const newWay = [
  'Natural face yoga exercises (₹1,999 one-time)',
  'Completely safe and non-invasive',
  'Practice anytime, anywhere',
  'Natural, lasting improvements',
  'One investment, lifetime benefits',
]

export function Comparison() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            A Better Way to Transform
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Why thousands are choosing face yoga over traditional methods
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-900">The Old Way</h3>
              </div>
              <ul className="space-y-4">
                {oldWay.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-red-800">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* New Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-900">The FaceYoga Way</h3>
              </div>
              <ul className="space-y-4">
                {newWay.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-800">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            {/* Highlight badge */}
            <div className="absolute -top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              RECOMMENDED
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
