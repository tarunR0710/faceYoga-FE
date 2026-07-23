'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Shield, Clock, CheckCircle, Star } from 'lucide-react'
import { LeadForm } from '@/components/forms/lead-form'
import { SITE_CONFIG } from '@/lib/constants'

const perks = [
  'A personal doctor who reviews your face 1-on-1',
  'A daily face-yoga routine prescribed for your face',
  'Direct answers to your doubts — no chatbots',
  'Progress tracking with regular doctor check-ins',
]

export default function FormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-[#eee] bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-[#888] hover:text-[#111] transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[13px]">Back</span>
            </Link>
            <Link href="/" className="text-[17px] text-[#111]" style={{ fontWeight: 500 }}>
              {SITE_CONFIG.name}
            </Link>
            <div className="w-16" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Left — value panel */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:flex flex-col justify-between rounded-2xl p-8 text-white overflow-hidden relative"
            style={{ background: 'linear-gradient(160deg, #201c19 0%, #14110f 100%)' }}
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(167,232,207,0.5), transparent 70%)' }} />
            <div className="relative">
              <span className="inline-block text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase mb-5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                Step 1 of 3 · takes 2 minutes
              </span>
              <h1 className="text-[1.9rem] leading-[1.15] tracking-[-0.02em] mb-3" style={{ fontWeight: 450 }}>
                Your personalized face-yoga plan starts here
              </h1>
              <p className="text-[14px] text-white/55 leading-relaxed mb-8 max-w-sm">
                Enter your details to get matched with your doctor. No surgery, no AI guesswork — just a real doctor and a plan built around your face.
              </p>
              <ul className="space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(167,232,207,0.15)' }}>
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: '#a7e8cf' }} />
                    </span>
                    <span className="text-[13px] text-white/70 leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[13px] text-white/70">4.9 · 12,000+ reviews</span>
              </div>
              <p className="text-[13px] text-white/50 italic leading-relaxed">
                &ldquo;I finally understood what my face actually needed instead of guessing.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col"
          >
            <div className="rounded-2xl bg-white border border-[#eee] p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_40px_-24px_rgba(0,0,0,0.2)]">
              <div className="text-center mb-6">
                <h2 className="text-[1.5rem] md:text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-2" style={{ fontWeight: 450 }}>
                  Create your account
                </h2>
                <p className="text-[14px] text-[#666]">Get your personalized plan in minutes</p>
              </div>
              <LeadForm />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#999]">
              <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /><span>Secure &amp; Private</span></div>
              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-500" /><span>Takes 2 minutes</span></div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /><span>No spam, ever</span></div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
