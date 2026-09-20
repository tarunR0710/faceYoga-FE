'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { EXPERIENCES } from '@/lib/content'

/**
 * MapMyFace experiences ("Results"). Renders nothing until a real, consented
 * customer story exists in EXPERIENCES.stories — see the note on that export.
 * When one does, this section and the nav should both appear; add
 * `{ href: '/#results', label: 'Results' }` to NAV_LINKS at that point.
 */
export function Experiences() {
  if (EXPERIENCES.stories.length === 0) return null
  const L = EXPERIENCES.labels

  return (
    <section id="results" className="section bg-white">
      <div className="container-main">
        <SectionHeading eyebrow={EXPERIENCES.eyebrow} title={EXPERIENCES.title} muted={EXPERIENCES.muted} lede={EXPERIENCES.lede} />

        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {EXPERIENCES.stories.map((s, i) => (
            <Reveal key={s.id} index={i}>
              <article
                className="grid grid-cols-1 gap-8 rounded-[24px] border bg-white p-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:p-8"
                style={{ borderColor: 'rgba(61,107,118,.14)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">{s.who}</p>
                  <p className="text-[1.2rem] leading-snug tracking-[-0.02em] text-ink" style={{ fontWeight: 300 }}>
                    “{s.goal}”
                  </p>
                  {s.images ? (
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        [L.imageBefore, s.images.before],
                        [L.imageDirection, s.images.direction],
                      ].map(([label, src]) => (
                        <figure key={label} className="flex flex-col gap-1.5">
                          <span className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-border-soft">
                            <Image src={src} alt={`${label}: ${s.who}`} fill sizes="200px" className="object-cover" />
                          </span>
                          <figcaption className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">{label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </div>

                <dl className="flex flex-col gap-4">
                  <Block label={L.before}>
                    <p>{s.before}</p>
                  </Block>
                  <Block label={L.found}>
                    <List items={s.found} />
                  </Block>
                  <Block label={L.first}>
                    <List items={s.first} />
                  </Block>
                  <Block label={L.implemented}>
                    <List items={s.implemented} />
                  </Block>
                  <Block label={L.quote}>
                    <p className="italic">“{s.quote}”</p>
                  </Block>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border-soft pt-3">
      <dt className="mb-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/45">{label}</dt>
      <dd className="text-[13.5px] leading-relaxed text-ink/80">{children}</dd>
    </div>
  )
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((it) => (
        <li key={it} className="flex items-baseline gap-2.5">
          <span aria-hidden="true" className="mt-[8px] h-px w-2.5 shrink-0 bg-brand/60" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}
