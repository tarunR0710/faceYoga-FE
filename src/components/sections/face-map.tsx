'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Info } from 'lucide-react'
import { EASE_OUT, REVEAL, VIEWPORT, VIEWPORT_TIGHT, stagger } from '@/lib/motion'
import { SectionTag } from '@/components/ui/section-tag'
import { DetailSheet } from '@/components/ui/detail-sheet'
import { TabRail, TabPanel } from '@/components/ui/tab-rail'
import { FACE_MAP_REPORT } from '@/lib/content'
import { FACE_MAP_CORE } from '@/lib/constants'

/**
 * The deliverable.
 *
 * This section answers the single biggest objection to a pre-launch, pay-first
 * purchase: I am paying ₹2,699 before I see the report. The answer is to show
 * the report.
 *
 * Two structural decisions. The twelve chapters are grouped into FOUR buckets —
 * nobody reads a flat list of twelve, and the old build printed all twelve as
 * dotted-leader rows. And the preview is labelled as a sample everywhere it
 * appears: the findings inside are placeholders, and presenting them as a real
 * client's report would be the same class of object as a fabricated
 * testimonial. See HANDOFF.md — real spreads replace these with no rework.
 */
export function FaceMapSection() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const railId = useId()
  const [spread, setSpread] = useState<string>(FACE_MAP_REPORT.spreads[0].id)

  const current =
    FACE_MAP_REPORT.spreads.find((s) => s.id === spread) ?? FACE_MAP_REPORT.spreads[0]

  return (
    <section id="face-map" className="section bg-white">
      <div className="container-main">
        {/* Centred header above the copy/report split. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={REVEAL}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="mb-5">
            <SectionTag>{FACE_MAP_REPORT.eyebrow}</SectionTag>
          </div>
          <h2
            className="text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.5rem]"
            style={{ fontWeight: 300 }}
          >
            {FACE_MAP_REPORT.title} <span className="text-ink/40">{FACE_MAP_REPORT.muted}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-ink-muted md:text-[16px]">
            {FACE_MAP_REPORT.lede}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-16">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={REVEAL}
          >
            {/* Twelve chapters as four buckets. */}
            <ul className="space-y-0">
              {FACE_MAP_REPORT.buckets.map((b, i) => (
                <motion.li
                  key={b.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 + stagger(i, 0.06) }}
                  className="grid grid-cols-[46px_minmax(0,1fr)] items-baseline gap-x-3 border-t border-border-soft py-3 last:border-b"
                >
                  <span className="font-mono text-[10px] tabular-nums tracking-[0.1em] text-ink/30">
                    {b.range}
                  </span>
                  <span>
                    <span className="block text-[14.5px] text-ink">{b.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-muted">
                      {b.summary}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-ink/90"
            >
              {FACE_MAP_REPORT.cta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </motion.div>

          {/* ── The report as an object ─────────────────────────────────── */}
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...REVEAL, delay: 0.12 }}
            aria-label={FACE_MAP_REPORT.cta}
            className="group relative mx-auto block w-full max-w-[360px] text-left outline-none"
          >
            <div className="absolute inset-x-6 -top-3 h-full rounded-[20px] border border-border-soft bg-white/70 transition-transform duration-500 group-hover:-translate-y-1" />
            <div className="absolute inset-x-3 -top-1.5 h-full rounded-[20px] border border-border-soft bg-white/85 transition-transform duration-500 group-hover:-translate-y-0.5" />

            <div
              className="relative overflow-hidden rounded-[20px] border border-border-soft p-7 md:p-8"
              style={{
                background:
                  'linear-gradient(155deg, rgba(0,0,0,0.11) 0%, rgba(0,0,0,0.045) 48%, #ffffff 100%)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* The single permitted contour motif on the whole page. It was
                  repeated in five places; a recurring flourish stops reading as
                  a brand mark and starts reading as filler. */}
              <svg
                viewBox="0 0 220 220"
                className="pointer-events-none absolute -bottom-14 -right-12 h-64 w-64 opacity-[0.18]"
                fill="none"
                aria-hidden="true"
              >
                <ellipse cx="110" cy="110" rx="98" ry="86" stroke="#0a0a0a" />
                <ellipse cx="110" cy="110" rx="74" ry="63" stroke="#0a0a0a" />
                <ellipse cx="110" cy="110" rx="50" ry="41" stroke="#0a0a0a" />
                <ellipse cx="110" cy="110" rx="26" ry="20" stroke="#0a0a0a" />
              </svg>

              <div className="relative">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45">
                  MapMyFace
                </p>
                <p
                  className="mt-14 text-[1.35rem] leading-tight tracking-[-0.02em] text-ink md:text-[1.5rem]"
                  style={{ fontWeight: 300 }}
                >
                  Your Face Map
                </p>
                <p className="mt-1.5 text-[13px] text-ink/55">Made around one person: you.</p>

                <div className="mt-10 flex items-baseline justify-between border-t border-ink/[0.09] pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                    {FACE_MAP_REPORT.chapterCount} chapters
                  </span>
                  <span className="text-[12px] text-ink/55 underline decoration-ink/20 underline-offset-2 transition-colors group-hover:decoration-ink/60">
                    Look inside
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        </div>

      </div>

      {/* ── The sample, on demand ─────────────────────────────────────────── */}
      <DetailSheet
        open={open}
        onOpenChange={setOpen}
        eyebrow="Sample"
        title="Inside a Face Map"
        lede={`${FACE_MAP_REPORT.chapterCount} chapters, delivered ${FACE_MAP_CORE.deliveryShort}.`}
      >
        {/* Stated before anything else, and again under every spread. */}
        <div className="mb-6 flex items-start gap-2.5 rounded-[14px] border border-brand/25 bg-brand-soft/30 px-4 py-3">
          <Info className="mt-[2px] h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={2} />
          <p className="text-[12.5px] leading-relaxed text-ink/70">
            {FACE_MAP_REPORT.sampleNotice}
          </p>
        </div>

        <TabRail
          items={FACE_MAP_REPORT.spreads.map((s) => ({ id: s.id, label: s.label }))}
          active={spread}
          onChange={setSpread}
          idBase={railId}
          ariaLabel="Sample spreads"
          className="mb-6"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <TabPanel id={current.id} railId={railId}>
              <Spread spread={current} />
            </TabPanel>
          </motion.div>
        </AnimatePresence>
      </DetailSheet>
    </section>
  )
}

type SpreadData = (typeof FACE_MAP_REPORT.spreads)[number]

const STATE_STYLE: Record<string, { label: string; cls: string }> = {
  start: { label: 'Start', cls: 'border-brand/40 bg-brand-soft text-brand-ink' },
  stop: { label: 'Stop', cls: 'border-ink/20 bg-ink/[0.06] text-ink/70' },
  continue: { label: 'Continue', cls: 'border-[rgb(var(--g1))]/50 bg-[rgb(var(--g1))]/15 text-ink/70' },
}

function Spread({ spread }: { spread: SpreadData }) {
  const chapter = 'chapter' in spread ? spread.chapter : undefined

  return (
    <div className="rounded-[16px] border border-border-soft bg-mist p-5 md:p-6">
      {chapter ? (
        <p className="mb-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45">
          {chapter}
        </p>
      ) : null}

      {spread.kind === 'cover' && 'fields' in spread && (
        <div>
          <p
            className="text-[1.5rem] leading-tight tracking-[-0.02em] text-ink"
            style={{ fontWeight: 300 }}
          >
            {spread.title}
          </p>
          <p className="mt-1.5 text-[13.5px] text-ink/55">{spread.subtitle}</p>
          <dl className="mt-7 space-y-0">
            {spread.fields.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-t border-ink/[0.09] py-2.5"
              >
                <dt className="text-[12.5px] text-ink/50">{k}</dt>
                <dd className="text-[13px] text-ink/75">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {spread.kind === 'analysis' && 'observations' in spread && (
        <div>
          <ul className="space-y-0">
            {spread.observations.map(([area, finding], i) => (
              <motion.li
                key={area}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_TIGHT}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: stagger(i, 0.05) }}
                className="grid grid-cols-[92px_minmax(0,1fr)] items-baseline gap-x-4 border-t border-ink/[0.09] py-3"
              >
                <span className="text-[12.5px] text-ink/50">{area}</span>
                <span className="text-[13px] leading-relaxed text-ink/80">{finding}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] leading-relaxed text-ink/45">{spread.note}</p>
        </div>
      )}

      {spread.kind === 'protocol' && 'actions' in spread && (
        <div className="space-y-4">
          {['First', 'Next', 'Later'].map((phase) => {
            const rows = spread.actions.filter((a) => a.phase === phase)
            if (!rows.length) return null
            return (
              <div key={phase}>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
                  {phase}
                </p>
                <ul className="space-y-1.5">
                  {rows.map((a) => {
                    const st = STATE_STYLE[a.state]
                    return (
                      <li
                        key={a.action}
                        className="flex items-start gap-2.5 rounded-[12px] bg-white px-3 py-2.5"
                      >
                        {/* Start / Stop / Continue as a chip ON the action, so
                            both axes of the Protocol live in one object. */}
                        <span
                          className={`mt-[1px] shrink-0 rounded-full border px-2 py-[3px] font-mono text-[8.5px] uppercase tracking-[0.12em] ${st.cls}`}
                        >
                          {st.label}
                        </span>
                        <span className="text-[13px] leading-snug text-ink/80">{a.action}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      {spread.kind === 'clarify' && 'text' in spread && (
        <div>
          <p className="text-[13.5px] leading-relaxed text-ink/80">{spread.text}</p>
          <ul className="mt-5 space-y-2">
            {spread.bullets.map((b) => (
              <li key={b} className="flex items-baseline gap-2.5">
                <span aria-hidden="true" className="mt-[8px] h-px w-2.5 shrink-0 bg-brand/60" />
                <span className="text-[13px] leading-snug text-ink-muted">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 border-t border-ink/[0.09] pt-3 text-[11px] text-ink/40">
        {FACE_MAP_REPORT.sampleNotice}
      </p>
    </div>
  )
}
