'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Instrument_Serif } from 'next/font/google'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionTag } from '@/components/ui/section-tag'
import { PROBLEM } from '@/lib/content'

// Same italic-serif flourish the static version used for its one soft line —
// reused here for both "random advice." and the answer card's quote.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
})

const DISMISS_EASE = [0.2, 0.7, 0.2, 1] as const

/**
 * "Noise → Clarity" — the interactive redesign of the recognition beat
 * (design handoff, option 1b). Replaces the static portrait + four identical
 * cards with a small state machine: the portrait sits blurred behind six
 * "advice" bubbles; clearing them (tap each, or the CTA) sharpens the face
 * and lights up the answer card underneath.
 *
 * Teal-on-light (design handoff option 2a) — uses the site's own brand
 * tokens (#3D6B76 · #2C4F58 · #ADC7CE) rather than an off-palette accent, so
 * this section ties back into the rest of the page's colour system.
 * Spacing, copy and motion follow the handoff 1:1; type stays on the site's
 * own Geist Sans rather than the handoff's DM Sans.
 */
export function Problem() {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const remaining = PROBLEM.bubbles.length - dismissed.size
  const allCleared = remaining === 0

  const dismiss = (id: string) => setDismissed((prev) => new Set(prev).add(id))
  const onCta = () => {
    if (allCleared) {
      router.push('/form')
    } else {
      setDismissed(new Set(PROBLEM.bubbles.map((b) => b.id)))
    }
  }

  return (
    <section
      className="relative overflow-hidden pb-10 pt-[70px]"
      style={{
        background:
          'linear-gradient(160deg,rgba(173,199,206,.22) 0%,rgba(247,244,239,.55) 45%,#ffffff 100%)',
      }}
    >
      {/* Two blurred blobs behind the glass card — without them the backdrop
          blur has nothing to diffuse. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[60px] -top-10 h-[288px] w-[288px] rounded-full opacity-40 blur-[64px]"
        style={{ background: '#ADC7CE' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[70px] bottom-20 h-[256px] w-[256px] rounded-full opacity-30 blur-[64px]"
        style={{ background: '#E6C9AF' }}
      />

      <div className="relative mx-auto flex max-w-[420px] flex-col gap-[26px]">
        <div className="flex justify-center px-6">
          <SectionTag>{PROBLEM.eyebrow}</SectionTag>
        </div>

        {/* ── Portrait + bubbles stage ────────────────────────────────── */}
        <div className="relative mx-4 my-6 h-[300px]">
          {/* Dashed ring — static, just fades in once cleared. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: '1px dashed rgba(61,107,118,.35)',
              opacity: allCleared ? 1 : 0,
              transition: `opacity 600ms ease ${allCleared ? '200ms' : '0ms'}`,
            }}
          />
          {/* Soft glow behind the portrait, same fade-in. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(173,199,206,.45), rgba(173,199,206,0) 70%)',
              opacity: allCleared ? 1 : 0,
              transition: 'opacity 600ms ease',
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
            style={{
              boxShadow:
                '0 0 0 6px #ffffff, 0 0 0 7px #ADC7CE, 0 24px 48px -20px rgba(44,79,88,.35)',
            }}
          >
            {/* Confused expression — fades out once the last bubble is
                dismissed. */}
            <Image
              src="/problem/confused.png"
              alt="A person's face, slightly furrowed in thought"
              fill
              sizes="200px"
              className="object-cover"
              style={{
                filter: reduce ? 'none' : 'grayscale(0.6)',
                opacity: allCleared ? 0 : 1,
                // A slight right tilt while the noise is still up — the
                // photo straightens out along with everything else once it's
                // cleared. Scaled up a touch so the rotated square still
                // covers the circular crop with no gap at the corners.
                transform: reduce
                  ? undefined
                  : `rotate(${allCleared ? 0 : 6}deg) scale(1.12)`,
                transition: 'opacity 500ms ease, transform 600ms ease',
              }}
            />
            {/* Smiling expression — the payoff, crossfaded in once cleared. */}
            <Image
              src="/problem/clear.png"
              alt="The same person, smiling, at ease"
              fill
              sizes="200px"
              className="object-cover"
              style={{
                opacity: allCleared ? 1 : 0,
                transition: 'opacity 500ms ease',
              }}
            />
          </div>

          {/* Annotation badges — fade + rise in, staggered, once cleared. */}
          {PROBLEM.markers.map((m) => (
            <div
              key={m.text}
              className="pointer-events-none absolute flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{
                left: m.left,
                top: m.top,
                background: 'rgba(255,255,255,.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(61,107,118,.18)',
                boxShadow: '0 8px 20px -12px rgba(44,79,88,.35)',
                opacity: allCleared ? 1 : 0,
                transform: allCleared ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 500ms ease ${allCleared ? `${m.delay}s` : '0s'}, transform 500ms ease ${
                  allCleared ? `${m.delay}s` : '0s'
                }`,
              }}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-brand-soft"
                style={{ boxShadow: '0 0 0 1px rgba(61,107,118,.25)' }}
              />
              <span className="flex flex-col leading-[1.15]">
                <span
                  className="whitespace-nowrap text-[12px] text-brand-ink"
                  style={{ fontWeight: 500 }}
                >
                  {m.text}
                </span>
                <span className="whitespace-nowrap text-[10.5px] text-ink-muted">{m.sub}</span>
              </span>
            </div>
          ))}

          <AnimatePresence>
            {PROBLEM.bubbles
              .filter((b) => !dismissed.has(b.id))
              .map((b) => (
                <motion.button
                  key={b.id}
                  type="button"
                  onClick={() => dismiss(b.id)}
                  aria-label={`Dismiss: ${b.text}`}
                  exit={reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.35, ease: DISMISS_EASE }}
                  className="absolute whitespace-nowrap rounded-full px-[13px] py-[9px] text-[13px] font-medium shadow-[0_10px_30px_-12px_rgba(44,79,88,0.4)]"
                  style={{
                    left: b.left,
                    top: b.top,
                    rotate: b.rotate,
                    background: b.bg,
                    color: b.fg,
                  }}
                >
                  {b.text}
                </motion.button>
              ))}
          </AnimatePresence>
        </div>

        {/* ── Headline block ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-[10px] px-6">
          <h2
            className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem]"
            style={{
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: '#1E353B',
            }}
          >
            Stop following <span style={{ color: '#3D6B76' }}>random advice.</span>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#5C7278' }}>
            {PROBLEM.body}
          </p>
        </div>

        {/* ── Answer card — glass, matches the design's updated 2a ──────── */}
        <motion.div
          className="mx-4 flex flex-col gap-4 rounded-[22px] border px-5 py-[22px] backdrop-blur-[18px]"
          animate={{
            backgroundColor: allCleared ? 'rgba(173,199,206,.14)' : 'rgba(255,255,255,.6)',
            borderColor: allCleared ? 'rgba(173,199,206,.4)' : 'rgba(61,107,118,.14)',
          }}
          transition={{ duration: 0.5 }}
          style={{ color: '#1E353B', boxShadow: '0 20px 40px -24px rgba(44,79,88,.25)' }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-[10px] w-[10px] shrink-0 items-center justify-center">
              {!reduce && (
                <span
                  aria-hidden="true"
                  className="animate-pulse-ring absolute h-[10px] w-[10px] rounded-full"
                  style={{ border: '2px solid rgba(61,107,118,0.65)' }}
                />
              )}
              <span className="relative h-[10px] w-[10px] rounded-full bg-[#3D6B76]" />
            </span>
            <span
              className="text-[12px] uppercase tracking-[0.12em] text-[#3D6B76]"
              style={{ fontWeight: 600 }}
            >
              {PROBLEM.answer.label}
            </span>
          </div>

          <p
            className={`${instrumentSerif.className} text-ink`}
            style={{ fontStyle: 'italic', fontSize: '20px', lineHeight: 1.25 }}
          >
            {PROBLEM.answer.quote}
          </p>

          <div className="grid grid-cols-3 gap-2">
            {PROBLEM.answer.grid.map((cell) => (
              <div key={cell.title} className="rounded-[12px] bg-[#3D6B76]/[0.08] px-[10px] py-3">
                <p className="text-[14px] leading-[1.35] text-ink" style={{ fontWeight: 500 }}>
                  {cell.title}
                </p>
                <p className="mt-1 text-[12px] leading-[1.35] text-ink-muted">{cell.text}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onCta}
            className="flex h-[50px] w-full items-center justify-center gap-1.5 rounded-full bg-ink text-[15px] text-white transition-all duration-200 hover:bg-ink/90 active:scale-[0.98]"
            style={{ fontWeight: 600 }}
          >
            {allCleared ? PROBLEM.answer.ctaCleared : PROBLEM.answer.ctaDefault}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
