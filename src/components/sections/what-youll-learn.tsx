'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const items = [
  {
    title: 'Your facial biometrics',
    description: 'A clear read on your symmetry, proportions, muscle tone and skin — scored and easy to understand.',
  },
  {
    title: 'How each feature shapes your look',
    description: 'Which zones the eye is drawn to first, and how they influence your overall impression.',
  },
  {
    title: 'Your facial harmony',
    description: 'How your features balance one another today — and how training shifts that balance over time.',
  },
  {
    title: 'Where you have the most potential',
    description: 'The exercises and zones that will move the needle fastest for your specific face.',
  },
  {
    title: 'The reasoning behind every step',
    description: 'No blind routines. Each exercise comes with the why, so you understand exactly what it does.',
  },
]

export function WhatYoullLearn() {
  return (
    <section className="section bg-[#fafafa]">
      <div className="container-main">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-[12px] text-[#999] uppercase tracking-[0.15em] mb-3">In your report</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-4" style={{ fontWeight: 450 }}>
              What you&apos;ll actually understand about your face
            </h2>
            <p className="text-[15px] text-[#666] leading-relaxed max-w-md">
              Most people have never had a professional assess their face. Your doctor turns guesswork into a clear, personal picture.
            </p>
          </motion.div>

          <div className="space-y-3">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl bg-white p-5 border border-[#eee] transition-all duration-200 hover:shadow-[0_20px_32px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[15px] font-medium text-[#111] mb-1">{it.title}</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">{it.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
