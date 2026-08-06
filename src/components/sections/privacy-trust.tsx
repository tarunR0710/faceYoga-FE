'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Lock, UserCog, ImageOff, ShieldCheck, Stethoscope, Trash2, ArrowRight } from 'lucide-react'
import { REVEAL, VIEWPORT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'

// The blueprint states these as internal rules; here they are stated back to the
// customer as commitments, which is the whole point of the section — privacy
// explained in plain sight rather than buried in a legal page.
const commitments = [
  {
    icon: Lock,
    title: 'Private by default',
    body: 'Your report and everything you submit are treated as confidential.',
  },
  {
    icon: UserCog,
    title: 'Purpose-limited access',
    body: 'Only the team members needed to deliver your service can access your information.',
  },
  {
    icon: ImageOff,
    title: 'Separate marketing consent',
    body: 'Your photos, clips or words are never used publicly without separate permission.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure payment',
    body: 'Trusted payment infrastructure, with the final amount shown clearly before you pay.',
  },
  {
    icon: Stethoscope,
    title: 'Clear professional boundaries',
    body: 'We do not promise diagnosis or treatment through general appearance analysis.',
  },
  {
    icon: Trash2,
    title: 'Customer control',
    body: 'Clear contact routes for privacy questions and data-deletion requests.',
  },
]

export function PrivacyTrust() {
  const reduce = useReducedMotion()

  return (
    <section id="privacy" className="section">
      <div className="container-main">
        <SectionHeading
          eyebrow="Privacy & trust"
          align="center"
          title="Your face and personal information"
          muted="remain yours."
          lede="Customers share personal images, routines and concerns because they trust the process. Privacy should be explained clearly, not hidden inside legal pages."
        />

        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
          {commitments.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...REVEAL, delay: stagger(i) }}
                className="card-hover-accent group rounded-[20px] p-4 md:p-6"
              >
                <span className="icon-tile-accent mb-4 flex h-10 w-10 items-center justify-center rounded-2xl transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.5} />
                </span>
                <h3 className="text-[14px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[15.5px]">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/[0.7] md:text-[13.5px]">
                  {c.body}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:mt-8"
        >
          {[
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms' },
            { href: '/refund', label: 'Refund Policy' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-1 text-[12.5px] font-medium text-analysis-teal transition-colors hover:text-ink"
            >
              {l.label}
              <ArrowRight
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
