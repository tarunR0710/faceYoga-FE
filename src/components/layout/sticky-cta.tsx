'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import { FACE_MAP_CORE } from '@/lib/constants'

/**
 * Mobile buy bar.
 *
 * This page is long and most of its traffic arrives from Instagram on a phone.
 * Without a persistent action, the only way to buy from the middle of the page
 * is to scroll back to the hero or all the way to the closing CTA — so the
 * price and the button follow the reader instead.
 *
 * Appears once the hero is out of view and retires over the footer, so it never
 * covers the closing CTA it would otherwise compete with.
 */
export function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const doc = document.documentElement
      const nearEnd = y + window.innerHeight > doc.scrollHeight - 900
      setShow(y > window.innerHeight * 0.9 && !nearEnd)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          // Light bar, dark button. A near-black bar pinned across the bottom of
          // a light page is the single most visually intrusive element on it,
          // and it does not need to be: separation comes from the hairline and
          // the shadow, and the contrast that matters is the button.
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
          style={{ boxShadow: '0 -8px 28px -12px rgba(0,0,0,0.14)' }}
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
                {FACE_MAP_CORE.label}
              </p>
              <p className="text-[15px] tabular-nums text-ink" style={{ fontWeight: 500 }}>
                {FACE_MAP_CORE.priceDisplay}
                <span className="ml-1.5 text-[11px] font-normal text-ink-muted">
                  all-inclusive
                </span>
              </p>
            </div>
            <Link
              href="/form"
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 text-[14px] font-medium text-white"
            >
              Start My Plan
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
