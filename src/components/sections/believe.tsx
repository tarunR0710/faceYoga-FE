'use client'

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronRight } from 'lucide-react'
import { EASE_OUT, VIEWPORT_TIGHT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { TabRail, TabPanel } from '@/components/ui/tab-rail'
import { BELIEVE } from '@/lib/content'

/**
 * "The people behind your Map" — design 38a, in the site's own type.
 *
 * Four trust questions on one rail: who you are dealing with, what we believe,
 * how we read a face, and what the research actually says. They are peers, so
 * the buyer picks the kind of proof they personally need instead of scrolling
 * past three kinds they do not. People comes first, because "who are you" is
 * the question a pre-launch business is actually being asked.
 *
 * Layout and structure are 38a's, with the people panel refined to 42a; every
 * size, weight and colour is ours —
 * Geist at 300/400, mono labels at the house 10px / 0.16em, ink and ink-muted.
 */
export function Believe() {
  const reduce = useReducedMotion()
  const railId = useId()
  const [tab, setTab] = useState<string>(BELIEVE.tabs[0].id)

  return (
    <section id="experts" className="section bg-white">
      <div className="container-main">
        <SectionHeading eyebrow={BELIEVE.eyebrow} title={BELIEVE.title} muted={BELIEVE.muted} />

        <TabRail items={BELIEVE.tabs} active={tab} onChange={setTab} idBase={railId} ariaLabel="Kinds of proof" className="mb-8" />

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <TabPanel id={tab} railId={railId}>
              {tab === 'people' && <People />}
              {tab === 'philosophy' && <Philosophy />}
              {tab === 'method' && <Method />}
              {tab === 'evidence' && <Evidence />}
            </TabPanel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/** Panel lede. `leadIn` is the one phrase that carries ink; the rest is muted. */
function PanelLede({ leadIn, children }: { leadIn?: string; children?: React.ReactNode }) {
  return (
    <p className="mb-7 max-w-2xl text-[14px] leading-relaxed text-ink-muted md:text-[15.5px]">
      {leadIn ? <span className="text-ink">{leadIn} </span> : null}
      {children}
    </p>
  )
}

/* ── Tab 1 · the people ──────────────────────────────────────────────────── */

// The open card's share of the row is carried by one CSS property, flex-grow,
// so a single transition drives the whole motion. The ratio lives on the row as
// --open / --shut, because desktop wants a less extreme split than a phone
// does: 100/13 leaves the closed cards as spines, 100/20 keeps them readable
// once there is room.
//
// Slower and softer than the canvas's .55s — EASE_OUT_SOFT is the curve the
// rest of the site uses for large elements, and the extra 70ms keeps the width
// change from outrunning the cross-fade inside it.
const WIDTH_MS = 620
const EASE_SOFT = 'cubic-bezier(0.22,1,0.36,1)'

/**
 * Design 42a — the refined filmstrip. A closed card is a spine: an index, one
 * word set on its side, and a chevron, on a tinted ground. The open card turns
 * white and leads with a full-bleed portrait, the role sitting on a scrim over
 * it, then the description and a short list of what that person brings.
 */
function People() {
  const { people } = BELIEVE
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<string>(people.cards[0].id)
  const t = (props: string) => (reduce ? 'none' : props)

  // The open card's contents are pinned to the width the open card WILL have,
  // not to the card itself. Without this the portrait is re-scaled on every
  // frame of the width transition, which is what made the expansion stutter on
  // a phone: resampling a full-bleed bitmap 60 times a second is the whole
  // cost. Held at a fixed width the image is merely revealed, and the only
  // thing the browser recomputes per frame is the flex line itself.
  const railRef = useRef<HTMLUListElement>(null)
  const [openW, setOpenW] = useState(0)

  const measure = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const cs = getComputedStyle(rail)
    const grow = Number(cs.getPropertyValue('--open')) || 100
    const shut = Number(cs.getPropertyValue('--shut')) || 13
    const gap = parseFloat(cs.columnGap) || 0
    const n = people.cards.length
    const free = rail.clientWidth - gap * (n - 1)
    setOpenW(Math.max(0, Math.round((free * grow) / (grow + shut * (n - 1)))))
  }, [people.cards.length])

  useLayoutEffect(measure, [measure])
  useEffect(() => {
    const rail = railRef.current
    if (!rail || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(rail)
    return () => ro.disconnect()
  }, [measure])

  return (
    <div>
      <PanelLede>{people.lede}</PanelLede>

      <ul
        ref={railRef}
        className="flex h-[clamp(470px,120vw,570px)] max-w-[1120px] gap-1.5 [--open:100] [--shut:13] md:gap-2 lg:h-[540px] lg:[--shut:20]"
      >
        {people.cards.map((c, i) => {
          const on = c.id === open
          return (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_TIGHT}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.06) }}
              className="min-w-0"
              style={{
                flexGrow: on ? 'var(--open)' : 'var(--shut)',
                flexBasis: 0,
                transition: t(`flex-grow ${WIDTH_MS}ms ${EASE_SOFT}`),
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(c.id)}
                aria-expanded={on}
                aria-label={c.name}
                className="relative block h-full w-full overflow-hidden rounded-[22px] border text-left"
                style={{
                  // A closed capsule is white, like the open one. Any grey fill
                  // read as dust next to it, so the closed state is carried by
                  // the hairline, the index and the chevron instead — and the
                  // open state by its shadow and its contents.
                  borderColor: on ? 'rgba(10,10,10,.1)' : 'rgba(10,10,10,.11)',
                  background: '#FFFFFF',
                  boxShadow: on ? '0 24px 44px -30px rgba(10,10,10,.5)' : '0 0 0 0 rgba(10,10,10,0)',
                  // Paint containment keeps the repaint inside the card while
                  // the row re-flows.
                  contain: 'paint',
                  transition: t(`border-color ${WIDTH_MS}ms ease`),
                }}
              >
                {/* Closed — index, one word on its side, chevron. */}
                <span
                  aria-hidden={on}
                  className="absolute inset-0 flex flex-col items-center justify-between py-[18px]"
                  style={{
                    opacity: on ? 0 : 1,
                    pointerEvents: 'none',
                    transition: t(`opacity ${on ? 180 : 300}ms ease ${on ? '0ms' : '220ms'}`),
                  }}
                >
                  <span className="font-mono text-[10px] tabular-nums tracking-[0.16em] text-ink/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {c.spine}
                  </span>
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-ink/15">
                    <ChevronRight className="h-3 w-3 text-ink/50" strokeWidth={2} />
                  </span>
                </span>

                {/* Open — portrait, role on a scrim, description, expertise. */}
                <span
                  aria-hidden={!on}
                  className="absolute bottom-0 left-0 top-0 flex flex-col overflow-hidden"
                  style={{
                    // Before the first measurement, fall back to the card's own
                    // box so the server render and first paint are complete.
                    width: openW || '100%',
                    opacity: on ? 1 : 0,
                    visibility: on ? 'visible' : 'hidden',
                    transition: t(`opacity 400ms ease ${on ? '180ms' : '0ms'}, visibility 0ms linear ${on ? '0ms' : '400ms'}`),
                  }}
                >
                  {/* Full-bleed, and flexible so the card can never clip its
                      own text on a narrow phone — the photo absorbs the slack. */}
                  <span className="relative block min-h-[150px] flex-1 overflow-hidden bg-mist">
                    <Image
                      src={c.photo}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 640px, 78vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 26%' }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[120px]"
                      style={{ background: 'linear-gradient(180deg, rgba(16,16,16,0), rgba(16,16,16,.88))' }}
                    />
                    <span
                      className="absolute inset-x-5 bottom-4 flex flex-col gap-1.5"
                      style={{
                        transform: on ? 'translateY(0)' : 'translateY(8px)',
                        transition: t(`transform 480ms ${EASE_SOFT} 200ms`),
                      }}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">{c.spine}</span>
                      <span className="text-[1.15rem] leading-snug tracking-[-0.02em] text-white md:text-[1.3rem]" style={{ fontWeight: 400 }}>
                        {c.name}
                      </span>
                    </span>
                  </span>

                  <span
                    className="flex flex-none flex-col px-5 pb-5 pt-4"
                    style={{
                      transform: on ? 'translateY(0)' : 'translateY(10px)',
                      transition: t(`transform 520ms ${EASE_SOFT} 250ms`),
                    }}
                  >
                    <span className="text-[13.5px] leading-relaxed text-ink-muted">{c.desc}</span>

                    <span className="mt-4 flex flex-col">
                      {/* The label carries the block, so it is set a step up
                          from the items rather than a step down. */}
                      <span className="pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Expertise</span>
                      {c.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-2.5 border-t border-border-soft py-2.5 text-[13px] leading-tight text-ink/80">
                          <Check className="h-3.5 w-3.5 flex-none text-ink/30" strokeWidth={2} />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </button>
            </motion.li>
          )
        })}
      </ul>

      <div className="mt-7 flex max-w-xl flex-col gap-1.5">
        <h3 className="text-[1.05rem] leading-snug tracking-[-0.02em] text-ink md:text-[1.2rem]" style={{ fontWeight: 400 }}>
          {people.closing.title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-ink-muted md:text-[14px]">{people.closing.body}</p>
      </div>
    </div>
  )
}

/* ── Tab 2 · the philosophy ──────────────────────────────────────────────── */
function Philosophy() {
  const { philosophy } = BELIEVE
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">{philosophy.eyebrow}</p>
      <h3 className="mb-4 text-[1.35rem] leading-tight tracking-[-0.02em] text-ink md:text-[1.6rem]" style={{ fontWeight: 300 }}>
        {philosophy.title} <span className="text-ink/40">{philosophy.muted}</span>
      </h3>
      <PanelLede>{philosophy.lede}</PanelLede>

      <ol className="grid grid-cols-1 gap-x-10 md:grid-cols-3">
        {philosophy.principles.map(([title, text], i) => (
          <motion.li
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_TIGHT}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: stagger(i, 0.06) }}
            className="grid grid-cols-[32px_1fr] content-start gap-x-3 gap-y-1 border-t border-border-soft pt-3.5 md:pb-1"
          >
            <span className="row-span-2 font-mono text-[11.5px] tabular-nums text-ink/40">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-[14.5px] leading-snug tracking-[-0.01em] text-ink">{title}</span>
            <span className="text-[13px] leading-relaxed text-ink-muted">{text}</span>
          </motion.li>
        ))}
      </ol>

      <p className="mt-7 border-t border-border-soft pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70">
        {philosophy.mantra.join(' · ')}
      </p>
    </div>
  )
}

/* ── Tab 3 · the method ──────────────────────────────────────────────────── */
function Method() {
  const { method } = BELIEVE
  return (
    <div>
      <PanelLede leadIn={method.leadIn}>{method.lede}</PanelLede>

      <dl className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {method.factors.map(([title, text], i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_TIGHT}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: stagger(i, 0.04) }}
            className="grid grid-cols-[32px_1fr] content-start gap-x-3 gap-y-0.5 border-b border-border-soft py-3"
          >
            <dt className="row-span-2 font-mono text-[11px] tabular-nums text-ink/40">{String(i + 1).padStart(2, '0')}</dt>
            <dd className="text-[14px] leading-snug tracking-[-0.01em] text-ink">{title}</dd>
            <dd className="text-[12.5px] leading-relaxed text-ink-muted">{text}</dd>
          </motion.div>
        ))}
      </dl>

      <div className="mt-7 flex max-w-xl flex-col gap-1.5">
        <h3 className="text-[1.05rem] leading-snug tracking-[-0.02em] text-ink md:text-[1.2rem]" style={{ fontWeight: 400 }}>
          {method.closing.title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-ink-muted md:text-[14px]">{method.closing.body}</p>
      </div>
    </div>
  )
}

/* ── Tab 4 · the evidence ────────────────────────────────────────────────── */
function Evidence() {
  const { evidence } = BELIEVE
  return (
    <div>
      <PanelLede leadIn={evidence.leadIn}>{evidence.lede}</PanelLede>

      <ol className="grid grid-cols-1 gap-x-10 lg:grid-cols-3">
        {evidence.studies.map((st, i) => (
          <motion.li
            key={st.year}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_TIGHT}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.07) }}
            className="flex flex-col gap-2 border-t border-border-soft pt-4"
          >
            <span className="flex items-baseline gap-2.5">
              <span className="font-mono text-[15px] tabular-nums text-ink">{st.year}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">{st.scope}</span>
            </span>
            <h3 className="text-[15.5px] leading-snug tracking-[-0.01em] text-ink" style={{ fontWeight: 400 }}>
              {st.claim}
            </h3>
            <p className="text-[13px] leading-relaxed text-ink-muted">{st.detail}</p>
            <p className="font-mono text-[10.5px] leading-relaxed text-ink/45">{st.source}</p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-8 flex max-w-2xl flex-col gap-2 rounded-[20px] bg-mist p-5 md:p-6">
        <h3 className="text-[1.05rem] leading-snug tracking-[-0.02em] text-ink md:text-[1.2rem]" style={{ fontWeight: 400 }}>
          {evidence.turn.title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-ink-muted md:text-[14px]">{evidence.turn.body}</p>
      </div>
    </div>
  )
}
