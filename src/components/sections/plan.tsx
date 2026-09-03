'use client'

import { Instrument_Serif } from 'next/font/google'
import { Reveal } from '@/components/ui/reveal'
import { SectionTag } from '@/components/ui/section-tag'
import { PLAN } from '@/lib/content'

// Same italic-serif flourish used elsewhere for a section's one soft line —
// here for the row keywords and the closing line (design handoff 3a).
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
})

/**
 * The calm answer right after Problem — Problem names the noise, this section
 * is the first place the page says what replaces it: one plan, in order.
 */
export function Plan() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, rgba(173,199,206,0.22) 0%, rgba(247,244,239,0.55) 45%, #ffffff 100%)',
      }}
    >
      {/* Soft colour behind the glass card — without this the blur has
          nothing to diffuse and the card reads as plain frosted-nothing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: 'rgb(var(--c-brand-soft))' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] left-[-8%] h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: '#E6C9AF' }}
      />

      <div className="container-main relative">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <Reveal index={0}>
            <SectionTag>{PLAN.eyebrow}</SectionTag>
          </Reveal>

          <Reveal
            index={1}
            as="h2"
            className="mt-5 text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink md:text-[2.25rem] lg:text-[2.5rem]"
            style={{ fontWeight: 300 }}
          >
            {PLAN.title}
            <br />
            <span className="text-ink/40">{PLAN.muted}</span>
          </Reveal>

          <Reveal index={2} className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-muted md:text-[16px]">
            <p>{PLAN.lede}</p>
          </Reveal>
        </div>

        <Reveal
          index={3}
          from="scale"
          className="mx-auto mt-10 max-w-2xl rounded-[22px] border px-6 pb-2 pt-6 backdrop-blur-[18px] md:mt-12 md:px-8"
          style={{
            background: 'rgba(255,255,255,.7)',
            borderColor: 'rgba(61,107,118,.14)',
            boxShadow: '0 24px 48px -28px rgba(44,79,88,.28)',
          }}
        >
          <h3 className="text-[17px] tracking-[-0.01em] text-ink md:text-[19px]" style={{ fontWeight: 600 }}>
            {PLAN.subTitle}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted md:text-[14px]">{PLAN.body}</p>

          <div className="mt-2">
            {PLAN.rows.map((row, i) => (
              <Reveal
                key={row.keyword}
                index={i}
                delay={0.1}
                className={`grid grid-cols-[90px_1fr] items-baseline gap-4 py-[15px] md:grid-cols-[104px_1fr] ${
                  i < PLAN.rows.length - 1 ? 'border-b border-[#3D6B76]/10' : ''
                }`}
              >
                <span
                  className={`${instrumentSerif.className} text-[19px] leading-[1.1] text-brand`}
                  style={{ fontStyle: 'italic' }}
                >
                  {row.keyword}
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink/80">{row.text}</span>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal
          index={4}
          as="p"
          className={`${instrumentSerif.className} mx-auto mt-10 max-w-md text-center text-[20px] leading-snug text-[#2C4F58]`}
          style={{ fontStyle: 'italic' }}
        >
          {PLAN.closing}
        </Reveal>
      </div>
    </section>
  )
}
