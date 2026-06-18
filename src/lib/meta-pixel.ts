// Meta Pixel (Facebook Pixel) helpers.
// All event functions are SSR-safe and no-op when the pixel isn't configured
// or hasn't loaded yet, so they can be called freely from client components.

import type { PlanId } from '@/lib/constants'

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

function fbq(...args: any[]) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq(...args)
}

export function pageview() {
  fbq('track', 'PageView')
}

export function trackInitiateCheckout(params: {
  value: number
  currency?: string
  planId?: PlanId
}) {
  fbq('track', 'InitiateCheckout', {
    value: params.value,
    currency: params.currency ?? 'INR',
    content_category: params.planId,
  })
}

export function trackLead() {
  fbq('track', 'Lead')
}

export function trackPurchase(params: {
  value: number
  currency?: string
  planId?: PlanId
  contentName?: string
}) {
  fbq('track', 'Purchase', {
    value: params.value,
    currency: params.currency ?? 'INR',
    content_name: params.contentName,
    content_category: params.planId,
  })
}
