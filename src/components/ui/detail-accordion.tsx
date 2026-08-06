'use client'

import type { LucideIcon } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

export type DetailGroup = {
  title: string
  icon?: LucideIcon
  items: string[]
}

/**
 * Grouped bullet lists collapse to an accordion on small screens. The blueprint
 * has several 6-group × 3-bullet blocks; rendered flat they are ~1,600px of
 * phone scroll each, which is where a reader gives up. Desktop keeps the grid.
 * Radix handles roving focus, aria-expanded and keyboard control.
 */
export function DetailAccordion({
  groups,
  defaultOpen,
  className = '',
}: {
  groups: DetailGroup[]
  /** Group title to start expanded. Defaults to the first. */
  defaultOpen?: string
  className?: string
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ?? groups[0]?.title}
      className={`overflow-hidden rounded-[20px] border border-border/60 bg-white ${className}`}
    >
      {groups.map((g) => {
        const Icon = g.icon
        return (
          <AccordionItem
            key={g.title}
            value={g.title}
            className="border-b border-border/60 last:border-b-0"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group flex flex-1 items-center gap-3 px-4 py-4 text-left">
                {Icon && (
                  <span className="icon-tile-accent flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                )}
                <span className="flex-1 text-[14px] font-medium tracking-[-0.01em] text-ink">
                  {g.title}
                </span>
                <Plus
                  className="h-4 w-4 shrink-0 text-accent/70 transition-transform duration-300 group-data-[state=open]:rotate-45"
                  strokeWidth={2}
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <ul className="space-y-2.5 px-4 pb-4 pl-[60px]">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                    <span className="text-[13px] leading-relaxed text-ink/[0.72]">{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionPrimitive.Content>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
