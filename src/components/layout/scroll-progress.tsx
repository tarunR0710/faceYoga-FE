'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { SCRUB_SPRING } from '@/lib/motion'

/**
 * A 2px reading indicator at the very top edge. Knowing how much of a long page
 * is left is what keeps someone scrolling. Informational rather than decorative,
 * so it stays on under reduced motion — it is a position readout, not an
 * animation.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, SCRUB_SPRING)

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-ink/70"
      style={{ scaleX }}
    />
  )
}
