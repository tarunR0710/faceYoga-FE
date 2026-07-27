'use client'

import Link from 'next/link'
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  const reduce = useReducedMotion()
  // Spotlight: a soft coral radial follows the cursor across the dark panel.
  // Driven by motion values (no React re-render on mousemove); fades in on hover.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgb(var(--c-accent) / 0.20), transparent 68%)`

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section
      className="group relative overflow-hidden py-24 md:py-32"
      onMouseMove={reduce ? undefined : handleMove}
      style={{ background: 'linear-gradient(180deg, rgb(var(--c-accent)) 0%, rgb(var(--c-accent-ink)) 55%, rgb(var(--c-ink)) 100%)' }}
    >
      {/* Top ramp — ease the white section above into the dark band (no hard edge) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-24"
        style={{ background: 'linear-gradient(180deg, rgb(var(--c-bg)) 0%, rgb(var(--c-bg) / 0.55) 35%, transparent 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 90% at 50% 115%, rgb(var(--c-accent) / 0.20) 0%, transparent 65%)' }}
      />
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      <div className="relative container-main">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[12px] text-ivory/80 uppercase tracking-[0.15em] mb-4">
            Get started today
          </p>
          <h2 className="text-[1.75rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.02em] text-ivory mb-10" style={{ fontWeight: 450 }}>
            You do not need more random advice. You need to know what suits you.
          </h2>

          <Link
            href="/form"
            className="inline-flex items-center justify-center h-14 px-9 bg-ivory text-ink text-[15px] font-semibold rounded-full hover:bg-mist transition-colors duration-300 ease-smooth group"
          >
            Start My Face Map
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>

          <p className="mt-5 text-[13px] text-ivory/55">
            No commitment required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
