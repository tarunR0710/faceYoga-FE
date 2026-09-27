'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Clock, RotateCcw, X } from 'lucide-react'
import { QUIZ } from '@/lib/content'
import { FACE_MAP_CORE } from '@/lib/constants'
import { EASE_OUT } from '@/lib/motion'

const TEAL = '#3D6B76'
const INK = '#1E353B'
const GREY = '#5C7278'

// Result view (2026-09-26): the same three greys as the "More than a scan."
// heading — headline, muted tail, description.
const R_HEAD = '#2E3033'
const R_MUTED = '#8C9096'
const R_TEXT = '#55585D'

// The chosen option lights up for a beat before the next question slides in,
// so the tap reads as registered rather than swallowed.
const ADVANCE_MS = 320

const QUESTIONS = QUIZ.questions
const COUNT = QUESTIONS.length

type Answers = Record<string, string>
// 0 … COUNT-1 are the questions, then the result. Booking is /form.
type View = number | 'result'

/**
 * Take the quiz — opened from the Problem section's CTA (2026-09-25), in
 * place of the answer card.
 *
 * Six one-tap questions, a result that names where the Face Map would start
 * (built only from the answers — see the honesty note on QUIZ in content.ts),
 * then "Book my Face Map" goes to the /form page (2026-09-26 — the booking
 * form no longer opens inside the sheet), so OTP, checkout data and the
 * redirect to /payment are exactly the ones every other CTA uses.
 *
 * Design 44a (2026-09-25): it is a sheet, not an inline card. The answer card
 * stays where it is and the quiz rises over it against a dimmed backdrop, so
 * the page never jumps and the reader keeps their place. On a phone it is a
 * bottom sheet with a grab handle; from `md` up a bottom sheet reads as a
 * phone affordance stranded on a desktop, so it centres as a dialog instead.
 *
 * One view at a time. Views cross-fade with a short sideways travel; the sheet
 * never tweens its height (iPhone rule — see journey.tsx), it simply takes the
 * new view's height. Back on the first question closes the quiz.
 */
export function QuizCard({ onClose, className = '' }: { onClose: () => void; className?: string }) {
  const reduce = useReducedMotion()
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Escape closes, and the page behind cannot scroll while the sheet is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])
  const [view, setView] = useState<View>(0)
  const [answers, setAnswers] = useState<Answers>({})
  // +1 moving forward, -1 moving back — sets which way the views travel.
  const [dir, setDir] = useState(1)
  const [picking, setPicking] = useState<string | null>(null)
  const advanceTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(advanceTimer.current), [])

  // A taller view (the result) replacing a shorter one should start at its
  // own top rather than halfway down.
  useEffect(() => { cardRef.current?.scrollTo({ top: 0, behavior: 'auto' }) }, [view])

  const goTo = (next: View, direction: number) => {
    setDir(direction)
    setView(next)
  }

  const pick = (qIndex: number, optionId: string) => {
    if (picking) return
    const q = QUESTIONS[qIndex]
    setAnswers((a) => ({ ...a, [q.id]: optionId }))
    setPicking(optionId)
    advanceTimer.current = setTimeout(
      () => {
        setPicking(null)
        goTo(qIndex + 1 < COUNT ? qIndex + 1 : 'result', 1)
      },
      reduce ? 0 : ADVANCE_MS,
    )
  }

  const back = () => {
    clearTimeout(advanceTimer.current)
    setPicking(null)
    if (view === 'result') goTo(COUNT - 1, -1)
    else if (view === 0) onClose()
    else goTo(view - 1, -1)
  }

  const retake = () => {
    setAnswers({})
    goTo(0, -1)
  }

  const travel = reduce ? 0 : 24
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * travel }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -travel }),
  }

  const step = typeof view === 'number' ? view : COUNT

  if (!mounted) return null

  return createPortal(
    <div className={`fixed inset-0 z-50 flex flex-col justify-end md:items-center md:justify-center ${className}`}>
      {/* Backdrop. Static, so its blur is painted once — the iPhone rule is
          about filters inside regions that change height, not a still sheet. */}
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-[6px]"
        style={{ background: 'rgba(22,30,46,.48)' }}
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
      />

      <motion.div
        ref={cardRef}
        id="quiz"
        role="dialog"
        aria-modal="true"
        aria-label="Take the quiz"
        className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-[30px] md:max-h-[86svh] md:max-w-[520px] md:rounded-[26px]"
        style={{
          // 44a's measures: 12 top, 20 each side, 40 at the foot, on a ramp
          // just off white. The canvas ramp is cool blue-grey; this is the
          // same move in the site's neutral.
          padding: '12px 20px 40px',
          background: 'linear-gradient(175deg, #FFFFFF 0%, rgb(var(--c-panel-bg)) 100%)',
          boxShadow: '0 -24px 60px -20px rgba(15,22,36,.55)',
        }}
        initial={reduce ? { opacity: 0 } : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* Grab handle and close. */}
        <div className="relative mb-2.5 flex h-7 items-center justify-center">
          <span aria-hidden="true" className="h-1 w-10 rounded-full md:hidden" style={{ background: 'rgba(30,53,59,.2)' }} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the quiz"
            className="absolute right-0 top-0 flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors hover:bg-ink/10"
            style={{ background: 'rgba(30,53,59,.07)' }}
          >
            <X className="h-[13px] w-[13px]" strokeWidth={2} style={{ color: GREY }} />
          </button>
        </div>

      {/* Progress: one segment per question, plus the result. */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={back}
          aria-label={view === 0 ? 'Close the quiz' : 'Back'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 hover:bg-ink/5"
          style={{ color: GREY, borderColor: 'rgba(30,53,59,.12)' }}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
        </button>
        <div className="flex flex-1 gap-[5px]" aria-hidden="true">
          {QUESTIONS.map((q, i) => (
            <span key={q.id} className="relative h-[3px] flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(30,53,59,.14)' }}>
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: TEAL,
                  transformOrigin: 'left',
                  // 44a fills up to AND INCLUDING the current question, so the
                  // bar reads as where you are rather than what you have left.
                  transform: `scaleX(${i <= step ? 1 : 0})`,
                  transition: reduce ? 'none' : `transform 450ms cubic-bezier(${EASE_OUT.join(',')})`,
                }}
              />
            </span>
          ))}
        </div>
        <span
          className="shrink-0 whitespace-nowrap text-right text-[12px] tabular-nums"
          style={{ color: GREY }}
          aria-live="polite"
        >
          {typeof view === 'number' ? `${view + 1} / ${COUNT}` : 'Done'}
        </span>
      </div>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={String(view)}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
          // Every question carries exactly four options, so the six views are
          // the same height and the sheet no longer pumps between taps. It
          // used to swing 128px, which on a bottom sheet moves the top edge
          // and reads as broken; equal options fix it at the source, with no
          // min-height standing in.
          className="pt-[18px]"
        >
          {typeof view === 'number' && (
            <QuestionView
              index={view}
              selected={answers[QUESTIONS[view].id]}
              picking={picking}
              onPick={(id) => pick(view, id)}
            />
          )}
          {view === 'result' && (
            <ResultView answers={answers} onBook={() => router.push('/form')} onRetake={retake} />
          )}
        </motion.div>
      </AnimatePresence>
      </motion.div>
    </div>,
    document.body,
  )
}

function QuestionView({
  index,
  selected,
  picking,
  onPick,
}: {
  index: number
  selected?: string
  picking: string | null
  onPick: (id: string) => void
}) {
  const q = QUESTIONS[index]
  return (
    <fieldset className="min-w-0">
      <legend className="mb-[18px] flex flex-col gap-1.5">
        {/* Two lines are reserved for the question. Every question carries
            four options, so the six views match on everything below this —
            but at phone width some titles wrap to two lines and some to one,
            and that 27px was the last thing making the sheet change size.
            The sheet is wide enough on desktop that they all fit one line. */}
        <span
          className="min-h-[55px] text-[22px] leading-[1.25] tracking-[-0.02em] md:min-h-0"
          style={{ fontWeight: 400, color: INK, textWrap: 'balance' }}
        >
          {q.q}
        </span>
        {/* One short line that takes the pressure off the question. */}
        <span className="text-[13px] leading-[1.5]" style={{ color: GREY }}>
          {q.hint}
        </span>
      </legend>
      <div className="flex flex-col gap-2">
        {q.options.map((o) => {
          const on = picking ? picking === o.id : selected === o.id
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onPick(o.id)}
              aria-pressed={on}
              className="flex min-h-[56px] w-full items-center justify-between gap-3.5 rounded-[16px] border text-left text-[15px] leading-[1.35] transition-all duration-[250ms] active:scale-[0.985]"
              style={{
                padding: '14px 16px 14px 18px',
                // 44a fills the chosen answer rather than tinting it: a solid
                // pill, white type, the border gone and a deep short shadow.
                // The canvas gradient is its blue-grey; this is the site's
                // teal, the same ramp the plan card and the CTA already use.
                background: on
                  ? 'linear-gradient(135deg,#5E8E9A 0%,#3D6B76 60%,#2C4F58 100%)'
                  : 'linear-gradient(180deg,#FFFFFF 0%,rgb(var(--c-panel-bg)) 100%)',
                borderColor: on ? 'transparent' : 'rgba(30,53,59,.10)',
                color: on ? '#FFFFFF' : 'rgba(30,53,59,.85)',
                boxShadow: on
                  ? '0 14px 26px -14px rgba(44,79,88,.85)'
                  : '0 1px 2px rgba(30,53,59,.05), 0 10px 20px -16px rgba(30,53,59,.45)',
              }}
            >
              <span>{o.label}</span>
              <span
                aria-hidden="true"
                className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-[250ms]"
                style={{
                  // On a filled pill the dot inverts: white disc, teal tick.
                  borderColor: on ? '#FFFFFF' : 'rgba(30,53,59,.28)',
                  background: on ? '#FFFFFF' : 'transparent',
                }}
              >
                {on && <Check className="h-3 w-3" strokeWidth={3} style={{ color: TEAL }} />}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function ResultView({
  answers,
  onBook,
  onRetake,
}: {
  answers: Answers
  onBook: () => void
  onRetake: () => void
}) {
  const chosen = QUESTIONS.map((q) => q.options.find((o) => o.id === answers[q.id]))
  const focus = chosen.flatMap((o) => (o && 'focus' in o ? [o.focus] : []))
  const noteFor = (id: string) => {
    const o = QUESTIONS.find((q) => q.id === id)?.options.find((x) => x.id === answers[id])
    return o && 'note' in o ? o.note : null
  }
  const goalNote = noteFor('goal')
  const timeNote = noteFor('time')

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em]" style={{ color: R_MUTED }}>
          {QUIZ.result.label}
        </p>
        <h3 className="text-[26px] leading-[1.15] tracking-[-0.025em]" style={{ fontWeight: 400, color: R_HEAD }}>
          {QUIZ.result.title}
        </h3>
      </div>

      <ol className="flex flex-col gap-2">
        {focus.map((f, i) => (
          <li
            key={f.title}
            className="grid grid-cols-[28px_1fr] gap-x-2.5 gap-y-[3px] rounded-[16px] p-3.5"
            // Flat and quiet: a near-white fill and a hairline, no shadow.
            style={{ background: '#FFFFFF', border: '1px solid rgba(46,48,51,.07)' }}
          >
            <span className="row-span-2 pt-0.5 text-[12px] tabular-nums" style={{ color: R_MUTED }}>
              0{i + 1}
            </span>
            <span className="text-[15.5px] leading-[1.25]" style={{ fontWeight: 500, color: R_HEAD }}>
              {f.title}
            </span>
            <span className="text-[13px] leading-[1.5]" style={{ color: R_TEXT }}>
              {f.text}
            </span>
          </li>
        ))}
      </ol>

      {goalNote && timeNote && (
        <p className="flex items-start gap-2.5 text-[13.5px] leading-[1.45]" style={{ color: R_TEXT, textWrap: 'pretty' }}>
          <Clock className="mt-[2px] h-[15px] w-[15px] shrink-0" strokeWidth={1.6} style={{ color: R_MUTED }} />
          <span>
            {QUIZ.result.aim} <span style={{ color: R_HEAD }}>{goalNote}</span>, {QUIZ.result.fit}{' '}
            <span style={{ color: R_HEAD }}>{timeNote}</span>.
          </span>
        </p>
      )}

      <p className="text-[12.5px] leading-[1.55]" style={{ color: R_MUTED, textWrap: 'pretty' }}>
        {QUIZ.result.note}
      </p>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onBook}
          className="flex h-[52px] w-full items-center justify-center gap-1.5 rounded-full bg-ink text-[15px] text-white transition-all duration-200 hover:bg-ink/90 active:translate-y-px"
          style={{ fontWeight: 500 }}
        >
          {QUIZ.result.cta} · {FACE_MAP_CORE.priceDisplay}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={onRetake}
          className="mx-auto flex items-center gap-1.5 text-[13.5px] underline decoration-ink/15 underline-offset-4 transition-colors hover:text-ink"
          style={{ color: R_TEXT }}
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
          {QUIZ.result.retake}
        </button>
      </div>
    </div>
  )
}
