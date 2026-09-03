'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { FULL_PICTURE } from '@/lib/content'

/**
 * What actually feeds the plan — sits right before Plan so "here's what we
 * factor in" lands immediately before "here's what you get back."
 */
export function FullPicture() {
  return (
    <section className="section bg-white">
      <div className="container-main">
        <SectionHeading
          eyebrow={FULL_PICTURE.eyebrow}
          title={FULL_PICTURE.title}
          muted={FULL_PICTURE.muted}
          lede={FULL_PICTURE.lede}
        />

        <div className="mx-auto flex max-w-xl flex-col gap-3.5 md:gap-4">
          {FULL_PICTURE.items.map((item, i) => (
            <Reveal
              key={item.title}
              index={i}
              className="flex items-center gap-5 rounded-[20px] border border-border-soft bg-white p-4 md:p-5"
            >
              <span className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[14px] ring-1 ring-border-soft md:h-[72px] md:w-[72px]">
                <Image src={item.img} alt="" fill sizes="72px" className="object-cover" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.1rem] tracking-[-0.02em] text-ink md:text-[1.25rem]" style={{ fontWeight: 300 }}>
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted md:text-[14.5px]">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
