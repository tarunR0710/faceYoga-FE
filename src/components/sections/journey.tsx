'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Instrument_Serif } from 'next/font/google'
import { X, ChevronDown } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { JOURNEY } from '@/lib/content'

// Numerals and the sheet title use the upright cut; the quote keeps the
// italic the rest of the site already uses for its one soft line.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

/**
 * How a Face Map gets made (design handoff, option 3b). One accordion list
 * instead of the old desktop-timeline / mobile-accordion split — colours,
 * gradient and card layout come from the handoff; the heading/lede stay on
 * the site's own two-tone Geist treatment rather than the handoff's DM Sans.
 */
export function Journey() {
  const reduce = useReducedMotion()
  // Opens on the session, not step one: the session is what a buyer is
  // sceptical about, and step one is just paying.
  const [open, setOpen] = useState<string | null>('session')
  const [sheetOpen, setSheetOpen] = useState(false)

  const sessionNode = JOURNEY.nodes.find((n) => n.id === 'session')

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          'linear-gradient(160deg, rgba(173,199,206,0.22) 0%, rgba(247,244,239,0.55) 45%, #ffffff 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full opacity-50 blur-[80px]"
        style={{ background: '#ADC7CE' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-24 h-80 w-80 rounded-full opacity-60 blur-[80px]"
        style={{ background: '#E6C9AF' }}
      />

      <div className="container-main relative">
        <div className="mx-auto flex max-w-[460px] flex-col gap-4">
          <Reveal index={0} className="flex justify-center">
            <SectionTag>{JOURNEY.eyebrow}</SectionTag>
          </Reveal>

          <Reveal
            index={1}
            as="h2"
            className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem]"
            style={{ fontWeight: 300 }}
          >
            {JOURNEY.title} <span className="text-ink/40">{JOURNEY.muted}</span>
          </Reveal>

          <Reveal index={2} className="text-[15px] leading-relaxed text-ink-muted">
            <p>{JOURNEY.denial}</p>
          </Reveal>

          {/* ── Accordion cards ─────────────────────────────────────────── */}
          <div className="mt-3 flex flex-col gap-2.5">
            {JOURNEY.nodes.map((n, i) => {
              const on = n.id === open
              const hasQuestions = 'askedAbout' in n
              const quote = 'quote' in n ? n.quote : undefined

              return (
                <Reveal key={n.id} index={3 + i}>
                  <div
                    className="relative overflow-hidden rounded-[20px] border"
                    style={{
                      borderColor: 'rgba(255,255,255,.35)',
                      boxShadow: '0 4px 14px rgba(10,25,30,.1)',
                    }}
                  >
                    {/* Two stacked layers, cross-faded with a motion opacity
                        tween — a plain CSS colour transition can't animate
                        between a flat colour and a gradient (background-image
                        never interpolates), so the old version snapped
                        instantly and read as a flicker. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: 'rgba(247,244,239,.92)' }}
                    />
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(150deg,#067B9E 0%,#878787 100%)' }}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    />
                    <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpen(on ? null : n.id)}
                      aria-expanded={on}
                      className="grid w-full grid-cols-[38px_1fr_30px] items-center gap-3 px-[18px] py-4 text-left"
                    >
                      <span
                        className={instrumentSerif.className}
                        style={{ fontSize: '26px', lineHeight: 1, color: on ? '#ADC7CE' : '#3D6B76' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex flex-col gap-1">
                        <span
                          className="text-[1.1rem] leading-tight tracking-[-0.02em]"
                          style={{ fontWeight: 300, color: on ? '#FFFFFF' : '#2C4F58' }}
                        >
                          {n.title}
                        </span>
                        <span
                          className="flex items-center gap-2 text-[12px]"
                          style={{ color: on ? 'rgba(255,255,255,.85)' : '#5B6E74' }}
                        >
                          {n.when}
                          {n.kind === 'admin' && (
                            <span
                              className="rounded-full px-2 py-[2px] text-[11px]"
                              style={{
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                                background: 'rgba(61,107,118,.14)',
                                color: on ? '#ADC7CE' : '#3D6B76',
                              }}
                            >
                              Our team
                            </span>
                          )}
                        </span>
                      </span>
                      <span
                        className="flex h-[30px] w-[30px] items-center justify-center rounded-full border transition-transform duration-[400ms]"
                        style={{
                          borderColor: on ? 'rgba(255,255,255,.22)' : 'rgba(61,107,118,.35)',
                          color: on ? '#FFFFFF' : '#2C4F58',
                          transform: on ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        <ChevronDown className="h-3 w-3" strokeWidth={1.8} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-3.5 px-[18px] pb-5 pt-0.5">
                            <div className="h-px" style={{ background: 'rgba(255,255,255,.12)' }} />
                            <p className="text-[15px] leading-relaxed text-white">{n.text}</p>

                            {quote && (
                              <p
                                className={instrumentSerif.className}
                                style={{
                                  fontStyle: 'italic',
                                  fontSize: '19px',
                                  lineHeight: 1.35,
                                  color: '#FFFFFF',
                                  background: 'rgba(255,255,255,.1)',
                                  borderRadius: '14px',
                                  padding: '14px 16px',
                                }}
                              >
                                “{quote}”
                              </p>
                            )}

                            <div className="flex flex-col gap-2.5">
                              {n.detail.map((d) => (
                                <div key={d} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-white">
                                  <span
                                    aria-hidden="true"
                                    className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
                                    style={{ background: '#E6C9AF' }}
                                  />
                                  <span>{d}</span>
                                </div>
                              ))}
                            </div>

                            {hasQuestions && (
                              <button
                                type="button"
                                onClick={() => setSheetOpen(true)}
                                className="mt-0.5 flex h-[46px] items-center justify-between rounded-[12px] px-4 text-[14px] transition-colors hover:bg-[#E9F1F2]"
                                style={{ background: '#FFFFFF', color: '#2C4F58', fontWeight: 600 }}
                              >
                                <span>See the 18 things we ask about</span>
                                <span className="text-[16px]">↗</span>
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* ── Where we stop ────────────────────────────────────────────── */}
          <Reveal index={8} className="mt-6 grid grid-cols-[3px_1fr] gap-4">
            <div className="rounded-[2px] bg-brand" />
            <div className="flex flex-col gap-2">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand"
                style={{ fontWeight: 600 }}
              >
                Where we stop
              </p>
              <p className="text-[13.5px] leading-relaxed text-ink/70">{JOURNEY.boundary}</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── The 18 questions — cream sheet, gradient header band ─────────── */}
      <Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
        <AnimatePresence>
          {sheetOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="fixed inset-0 z-[100]"
                  style={{ background: 'rgba(10,25,30,.55)' }}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <div className="pointer-events-none fixed inset-0 z-[101] flex items-end justify-center outline-none sm:items-center sm:p-6">
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="pointer-events-auto flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-[28px] sm:max-h-[86vh] sm:w-[min(560px,92vw)] sm:rounded-[28px]"
                    style={{ background: '#F7F4EF', boxShadow: '0 -20px 50px rgba(10,25,30,.4)' }}
                  >
                    {/* Gradient header band — same gradient as the expanded cards */}
                    <div
                      className="flex shrink-0 flex-col gap-3.5 px-[22px] pb-[22px] pt-2.5"
                      style={{ background: 'linear-gradient(150deg,#067B9E 0%,#878787 100%)' }}
                    >
                      <div className="flex justify-center sm:hidden">
                        <span className="h-1 w-10 rounded-full" style={{ background: 'rgba(255,255,255,.5)' }} />
                      </div>

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-2">
                          <span
                            className="font-mono text-[11px] uppercase tracking-[0.16em]"
                            style={{ color: '#E6C9AF', fontWeight: 600 }}
                          >
                            Step 02 · Face Mapping Session
                          </span>
                          <Dialog.Title
                            className={instrumentSerif.className}
                            style={{ fontSize: '30px', lineHeight: 1.05, color: '#FFFFFF' }}
                          >
                            What the expert asks you
                          </Dialog.Title>
                          <Dialog.Description className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,.9)' }}>
                            A structured conversation, with room to go deeper wherever your situation needs it.
                          </Dialog.Description>
                        </div>
                        <Dialog.Close
                          aria-label="Close"
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors"
                          style={{ background: 'rgba(255,255,255,.2)' }}
                        >
                          <X className="h-4 w-4 text-white" strokeWidth={1.8} />
                        </Dialog.Close>
                      </div>

                      <div className="flex gap-2 text-[12px]" style={{ color: 'rgba(255,255,255,.9)' }}>
                        <span
                          className="rounded-full px-2.5 py-[3px]"
                          style={{ fontWeight: 600, background: 'rgba(255,255,255,.2)' }}
                        >
                          18 questions
                        </span>
                        <span className="rounded-full px-2.5 py-[3px]" style={{ background: 'rgba(255,255,255,.2)' }}>
                          6 areas
                        </span>
                      </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto px-[22px] py-[18px]">
                      <div className="flex flex-col gap-3">
                        {sessionNode?.askedAbout?.map(([group, items], ci) => (
                          <div
                            key={group as string}
                            className="flex flex-col gap-2.5 rounded-[16px] border bg-white px-4 py-3.5"
                            style={{ borderColor: 'rgba(61,107,118,.18)' }}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[11px] text-white"
                                style={{ background: '#067B9E', fontWeight: 600 }}
                              >
                                {String(ci + 1).padStart(2, '0')}
                              </span>
                              <span
                                className="text-[15px] tracking-[-0.01em]"
                                style={{ fontWeight: 600, color: '#2C4F58' }}
                              >
                                {group as string}
                              </span>
                            </div>
                            <div className="flex flex-col gap-2 pl-[36px]">
                              {(items as readonly string[]).map((it) => (
                                <div key={it} className="flex items-start gap-2.5 text-[14px] leading-snug" style={{ color: '#3A4A50' }}>
                                  <span
                                    aria-hidden="true"
                                    className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full"
                                    style={{ background: '#E6C9AF', boxShadow: '0 0 0 1px #C9A98A' }}
                                  />
                                  <span>{it}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  )
}
