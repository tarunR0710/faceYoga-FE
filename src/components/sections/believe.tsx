'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT, REVEAL, VIEWPORT, VIEWPORT_TIGHT, stagger } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { TabRail, TabPanel } from '@/components/ui/tab-rail'
import { BELIEVE } from '@/lib/content'

/**
 * "Why believe us yet" — one section where four used to be.
 *
 * research-stats, experts, methodology and founding were four separate beats
 * all answering the same buyer question, and between them they printed roughly
 * forty flat items. They are peers, so they belong on a rail: the buyer picks
 * the kind of proof they personally need instead of scrolling past three kinds
 * they do not.
 *
 * The order of the tabs is deliberate — people first, because "who are you" is
 * the question a pre-launch business is actually being asked.
 */
export function Believe() {
  const reduce = useReducedMotion()
  const railId = useId()
  const [tab, setTab] = useState<string>(BELIEVE.tabs[0].id)

  return (
    <section id="experts" className="section bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow={BELIEVE.eyebrow}
          title={BELIEVE.title}
          muted={BELIEVE.muted}
        />

        <TabRail
          items={BELIEVE.tabs}
          active={tab}
          onChange={setTab}
          idBase={railId}
          ariaLabel="Kinds of proof"
          className="mb-8"
        />

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
              {tab === 'method' && <Method />}
              {tab === 'evidence' && <Evidence />}
            </TabPanel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function PanelLede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-7 max-w-2xl text-[14px] leading-relaxed text-ink-muted md:text-[15.5px]">
      {children}
    </p>
  )
}

/* ── Tab 1 · the panel of roles ──────────────────────────────────────────── */
function People() {
  const { people } = BELIEVE
  return (
    <div>
      <PanelLede>{people.lede}</PanelLede>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {people.roles.map((r, i) => (
          <motion.div
            key={r.mono}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_TIGHT}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.06) }}
            className="flex flex-col overflow-hidden rounded-[18px] border border-border-soft bg-white"
          >
            {/* Typographic plate, not a photograph. No stock faces stand in for
                people who have not signed on — that is the one placeholder that
                would undermine the whole page. */}
            <div
              className="flex h-[84px] items-end px-5 pb-3.5"
              style={{
                background:
                  'linear-gradient(150deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.04) 60%, #ffffff 100%)',
              }}
            >
              <span
                aria-hidden="true"
                className="font-mono text-[24px] leading-none tracking-[-0.02em] text-ink/25"
              >
                {r.mono}
              </span>
            </div>
            <div className="px-5 py-4">
              <h3 className="text-[14.5px] font-normal tracking-[-0.01em] text-ink">{r.role}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{r.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-7 max-w-xl text-[13.5px] leading-relaxed text-ink/60">{people.closing}</p>
    </div>
  )
}

/* ── Tab 2 · the nine assessment factors ─────────────────────────────────── */
function Method() {
  const { method } = BELIEVE
  return (
    <div>
      <PanelLede>{method.lede}</PanelLede>

      <dl className="grid grid-cols-1 gap-x-12 border-t border-ink/12 sm:grid-cols-2 lg:grid-cols-3">
        {method.factors.map(([title, text], i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_TIGHT}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: stagger(i, 0.04) }}
            className="border-b border-border-soft py-3.5"
          >
            <dt className="flex items-baseline gap-2.5">
              <span className="font-mono text-[9.5px] tracking-[0.14em] text-ink/25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[14px] text-ink">{title}</span>
            </dt>
            <dd className="mt-1 pl-[26px] text-[13px] leading-relaxed text-ink-muted">{text}</dd>
          </motion.div>
        ))}
      </dl>

      <p className="mt-6 max-w-3xl text-[12.5px] leading-relaxed text-ink/45">
        {method.closing}
      </p>
    </div>
  )
}

/* ── Tab 3 · three verified studies on a real time axis ──────────────────── */
function Evidence() {
  const { evidence } = BELIEVE
  const { from, to } = evidence.axis
  const span = to - from
  const pos = (year: number) => ((year - from) / span) * 100

  return (
    <div>
      <PanelLede>{evidence.lede}</PanelLede>

      {/* A dot plot rather than a list: three marks across thirty years read as
          a body of work, which is the honest answer to "only three?" after the
          twenty-four inherited citations failed checking. */}
      <div className="mb-9 pt-2">
        <div className="relative h-[52px]">
          <div className="absolute inset-x-0 top-[26px] h-px bg-ink/15" />
          {[from, 2000, 2010, to].map((y) => (
            <span
              key={y}
              className="absolute top-[34px] -translate-x-1/2 font-mono text-[10.5px] tabular-nums text-ink/45"
              style={{ left: `${pos(y)}%` }}
            >
              {y}
            </span>
          ))}
          {evidence.studies.map((st, i) => (
            <motion.span
              key={st.year}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_TIGHT}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
              className="absolute top-[26px] h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-mist bg-brand"
              style={{ left: `${pos(st.year)}%` }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <ol className="space-y-0">
        {evidence.studies.map((st, i) => (
          <motion.li
            key={st.year}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_TIGHT}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: stagger(i, 0.07) }}
            className="grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-border-soft py-4 md:grid-cols-[110px_minmax(0,1fr)]"
          >
            <div>
              <p className="font-mono text-[12px] tabular-nums text-ink">{st.year}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-ink/40">{st.scope}</p>
            </div>
            <div>
              <h3 className="text-[14.5px] text-ink">{st.claim}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{st.detail}</p>
              <p className="mt-2 text-[11.5px] italic text-ink/40">{st.source}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <p className="mt-7 max-w-2xl border-l-2 border-brand pl-5 text-[13.5px] leading-relaxed text-ink/70 md:text-[14.5px]">
        {evidence.turn}
      </p>
    </div>
  )
}
