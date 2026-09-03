'use client'

import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'

type DetailSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Small mono label above the title. */
  eyebrow?: string
  title: string
  /** One line under the title. */
  lede?: string
  /** Right-aligned figure in the header — a price, usually. */
  figure?: string
  children: ReactNode
  /** Sticky action row pinned to the bottom of the sheet. */
  footer?: ReactNode
}

/**
 * Deep detail, on demand.
 *
 * The add-on deliverable lists, the report chapter breakdowns and the assessment
 * factors are all content a buyer wants ONCE, at a specific moment, and that
 * wrecks the page when printed inline. This is where that content lives.
 *
 * Bottom sheet under `sm`, centred dialog above it: most of this traffic is
 * Indian mobile, and a sheet rising from the thumb edge is both easier to reach
 * and easier to dismiss than a centred box.
 */
export function DetailSheet({
  open,
  onOpenChange,
  eyebrow,
  title,
  lede,
  figure,
  children,
  footer,
}: DetailSheetProps) {
  const reduce = useReducedMotion()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[100] bg-ink/45 backdrop-blur-[3px]"
              />
            </Dialog.Overlay>

            {/* Centring is done by flex, NOT by `-translate-x-1/2`.
                framer-motion writes the element's `transform` to animate y and
                scale, which silently overwrites a translate-based centring
                offset — the panel then hangs off the bottom-right of the
                screen on desktop while still reporting itself visible. The
                wrapper is pointer-events-none so clicks fall through to the
                overlay and still dismiss. */}
            <Dialog.Content asChild>
              <div className="pointer-events-none fixed inset-0 z-[101] flex items-end justify-center outline-none sm:items-center sm:p-6">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.99 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="pointer-events-auto flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.28)] sm:max-h-[86vh] sm:w-[min(620px,92vw)] sm:rounded-[24px] sm:shadow-[0_40px_90px_-30px_rgba(0,0,0,0.32)]"
              >
                {/* Grab handle — mobile affordance only */}
                <div className="flex justify-center pt-3 sm:hidden">
                  <span className="h-1 w-10 rounded-full bg-ink/15" />
                </div>

                <header
                  className="relative shrink-0 px-6 pb-5 pt-5 sm:px-8 sm:pt-7"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.03) 55%, #ffffff 100%)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      {eyebrow ? (
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/45">
                          {eyebrow}
                        </p>
                      ) : null}
                      <Dialog.Title
                        className="mt-2 text-[1.3rem] leading-tight tracking-[-0.02em] text-ink sm:text-[1.5rem]"
                        style={{ fontWeight: 300 }}
                      >
                        {title}
                      </Dialog.Title>
                      {lede ? (
                        <Dialog.Description className="mt-2 text-[13.5px] leading-relaxed text-ink/65">
                          {lede}
                        </Dialog.Description>
                      ) : null}
                    </div>

                    {figure ? (
                      <span
                        className="shrink-0 pt-6 text-[17px] tabular-nums text-ink"
                        style={{ fontWeight: 500 }}
                      >
                        {figure}
                      </span>
                    ) : null}
                  </div>

                  <Dialog.Close
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-ink/50 transition-colors hover:bg-white hover:text-ink sm:right-5 sm:top-5"
                  >
                    <X className="h-4 w-4" strokeWidth={1.8} />
                  </Dialog.Close>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">{children}</div>

                {footer ? (
                  <footer className="shrink-0 border-t border-border-soft bg-white px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
                    {footer}
                  </footer>
                ) : null}
              </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
