'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ShieldCheck, Clock, UserRound, Map, ClipboardList } from 'lucide-react'
import { LeadForm } from '@/components/forms/lead-form'
import { SITE_CONFIG } from '@/lib/constants'

const steps = [
  {
    icon: UserRound,
    title: 'A live Face Mapping Session',
    body: 'You get matched into a session with a real expert who reviews your face with you — not a bot, not a form.',
  },
  {
    icon: Map,
    title: 'Your personalised Face Map',
    body: 'A detailed Face Map plus your Appearance Protocol, delivered in 2–4 working days after your Expert Mapping Review.',
  },
  {
    icon: ClipboardList,
    title: 'A real person to ask',
    body: 'Questions about your Face Map or protocol? You have an actual expert to reply — no chatbots in the loop.',
  },
]

export default function FormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory font-sans">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-ink/10 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-analysis-teal hover:text-ink transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[13px]">Back</span>
            </Link>
            <Link href="/" className="text-[17px] text-ink font-medium">
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
            className="hidden lg:flex flex-col justify-between rounded-2xl p-8 border border-ink/10 shadow-sm bg-glow-tr overflow-hidden relative"
          >
            <div className="relative">
              <span className="inline-block text-[10px] font-medium tracking-[0.2em] text-teal uppercase mb-5 px-3 py-1.5 rounded-full bg-accent-soft">
                Step 1 of 3 · takes 2 minutes
              </span>
              <h1 className="text-[1.9rem] leading-[1.15] tracking-[-0.02em] text-ink mb-3 font-medium">
                Start your Face Map
              </h1>
              <p className="text-[14px] text-analysis-teal leading-relaxed mb-8 max-w-sm">
                Enter your details to get matched into a live Face Mapping Session with a real expert. No surgery, no AI guesswork — just an honest review of your face and a plan built around it.
              </p>
              <ul className="space-y-5">
                {steps.map((s) => (
                  <li key={s.title} className="flex items-start gap-3.5">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-accent-soft">
                      <s.icon className="w-4.5 h-4.5 text-teal" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[13.5px] text-ink font-medium leading-snug mb-0.5">{s.title}</p>
                      <p className="text-[12.5px] text-analysis-teal leading-snug">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 pt-6 border-t border-ink/10">
              <p className="text-[11px] tracking-[0.12em] uppercase text-analysis-teal font-medium">
                5 expert disciplines · 9 zones · 70+ checkpoints · 0 surgery
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
            <div className="rounded-2xl bg-white border border-ink/10 p-6 md:p-8 shadow-md">
              <div className="text-center mb-6">
                <h2 className="text-[1.5rem] md:text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-ink mb-2 font-medium">
                  Create your account
                </h2>
                <p className="text-[14px] text-analysis-teal">Get matched into your Face Mapping Session in minutes</p>
              </div>
              <LeadForm />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-analysis-teal">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal" /><span>Secure &amp; private</span></div>
              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-teal" /><span>Takes 2 minutes</span></div>
              <div className="flex items-center gap-1.5"><UserRound className="w-4 h-4 text-teal" /><span>A real expert, not a bot</span></div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
