'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Check, Loader2, Shield, Sparkles, Plus, Scissors, Palette } from 'lucide-react'
import { useRazorpay } from '@/hooks/use-razorpay'
import {
  FACE_MAP_CORE,
  FACE_MAP_ADDONS,
  ADDON_BUNDLE,
  SITE_CONFIG,
  REFUND_POLICY,
  computeOrderTotal,
  parseAddonIds,
  type AddOnId,
} from '@/lib/constants'
import { trackInitiateCheckout, trackPurchase } from '@/lib/meta-pixel'
import { cn } from '@/lib/utils'

const API_URL = SITE_CONFIG.apiUrl

const addonIcons: Record<AddOnId, typeof Scissors> = {
  hair_map: Scissors,
  style_colour_map: Palette,
}

interface CheckoutData {
  name: string
  email: string
  phone: string
  phoneToken: string
  /** Carried from the pricing card via /form. */
  addons?: AddOnId[]
}

export default function PaymentPage() {
  const router = useRouter()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [selected, setSelected] = useState<AddOnId[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { isLoaded: razorpayLoaded, openPayment } = useRazorpay()

  useEffect(() => {
    const stored = sessionStorage.getItem('checkoutData')
    if (stored) {
      try {
        const data = JSON.parse(stored) as CheckoutData
        setCheckoutData(data)
        // Re-parse rather than trusting the stored array: sessionStorage is
        // user-writable, and only known ids may become line items.
        setSelected(parseAddonIds((data.addons ?? []).join(',')))
      } catch {
        router.push('/form')
      }
    } else {
      router.push('/form')
    }
  }, [router])

  const toggle = (id: AddOnId) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  // Same helper the pricing card uses, so the figure quoted on the homepage and
  // the figure shown here are the same computation, not two copies of it.
  const quote = computeOrderTotal(selected)

  const handlePayment = async () => {
    if (!checkoutData) {
      router.push('/form')
      return
    }

    setIsLoading(true)
    setError('')

    trackInitiateCheckout({
      value: quote.total,
      currency: 'INR',
      planId: FACE_MAP_CORE.id,
    })

    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone,
          phoneToken: checkoutData.phoneToken,
          packageId: FACE_MAP_CORE.id,
          planName: FACE_MAP_CORE.name,
          // The backend must price these itself — we deliberately send ids, not
          // an amount, so the client can never dictate what is charged.
          addons: selected,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      // The backend's amount is what Razorpay actually charges. If it disagrees
      // with the quote the customer just read, abort rather than open a checkout
      // for a different figure — an undercharge is still a broken order, and a
      // silent overcharge would be worse. This fires until the API prices
      // `complete_face_map` and the `addons` array.
      if (typeof data.amount === 'number' && data.amount !== quote.totalInPaise) {
        throw new Error(
          `Price mismatch: checkout quoted ₹${quote.total.toLocaleString('en-IN')} but the ` +
            `server returned ₹${(data.amount / 100).toLocaleString('en-IN')}. ` +
            `Payment was not started. Please contact ${SITE_CONFIG.email}.`
        )
      }

      openPayment({
        orderId: data.orderId,
        amount: data.amount,
        description: `${FACE_MAP_CORE.name} - ${SITE_CONFIG.name}`,
        prefill: data.prefill,
        onSuccess: async (razorpayResponse) => {
          try {
            const verifyResponse = await fetch(`${API_URL}/api/webhook/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(razorpayResponse),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed')
            }

            trackPurchase({
              value: quote.total,
              currency: 'INR',
              planId: FACE_MAP_CORE.id,
              contentName: FACE_MAP_CORE.name,
            })

            sessionStorage.removeItem('checkoutData')
            router.push('/success')
          } catch {
            sessionStorage.removeItem('checkoutData')
            router.push('/success')
          }
        },
        onError: (err) => {
          setError(err.description || 'Payment failed. Please try again.')
          setIsLoading(false)
        },
        onDismiss: () => {
          setIsLoading(false)
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(false)
    }
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-8 h-8 animate-spin text-[#666]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-[#eee] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/form"
              className="flex items-center gap-2 text-[#888] hover:text-[#111] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[13px]">Back</span>
            </Link>
            <Link
              href="/"
              className="text-[17px] text-[#111]"
              style={{ fontWeight: 500 }}
            >
              {SITE_CONFIG.name}
            </Link>
            <div className="w-16" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 lg:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1
              className="text-[1.75rem] md:text-[2rem] leading-[1.15] tracking-[-0.02em] text-[#111] mb-2"
              style={{ fontWeight: 300 }}
            >
              Confirm your order
            </h1>
            <p className="text-[15px] text-[#666]">
              Welcome back, {checkoutData.name} — add or remove Maps before paying
            </p>
          </motion.div>

          {/* Main plan — fixed, not a choice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-2xl border border-border-soft bg-white p-5 md:p-6"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                  Main plan · {FACE_MAP_CORE.label}
                </span>
                <h2 className="mt-1 text-[17px] text-ink" style={{ fontWeight: 400 }}>
                  {FACE_MAP_CORE.name}
                </h2>
              </div>
              <span className="text-[1.5rem] tabular-nums text-ink" style={{ fontWeight: 500 }}>
                {FACE_MAP_CORE.priceDisplay}
              </span>
            </div>
            <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {FACE_MAP_CORE.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-ink/75">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" strokeWidth={2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Add-ons — still changeable here, matching the homepage card */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            {FACE_MAP_ADDONS.map((addon, index) => {
              const Icon = addonIcons[addon.id]
              const on = selected.includes(addon.id)
              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.08 }}
                  className={cn(
                    'flex flex-col rounded-2xl border p-5 transition-all duration-300',
                    on ? 'border-brand/40 bg-brand-soft/35' : 'border-border/60 bg-white'
                  )}
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="icon-tile-brand flex h-8 w-8 shrink-0 items-center justify-center rounded-xl">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                      Add-on
                    </span>
                    <span className="ml-auto text-[15px] tabular-nums text-ink" style={{ fontWeight: 500 }}>
                      +{addon.priceDisplay}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-normal text-ink">{addon.name}</h3>
                  <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-ink/70">
                    {addon.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggle(addon.id)}
                    aria-pressed={on}
                    className={cn(
                      'mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-full text-[13px] font-medium transition-colors duration-200',
                      on
                        ? 'bg-brand text-white hover:bg-brand-ink'
                        : 'border border-border bg-white text-ink hover:bg-mist'
                    )}
                  >
                    {on ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Add {addon.name === 'Style & Colour Map' ? 'Style Map' : addon.name}
                      </>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 rounded-2xl border border-border-soft bg-white p-5 md:p-6"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <dl className="space-y-2.5">
              <div className="flex items-baseline justify-between gap-4 text-[13.5px]">
                <dt className="text-ink/70">{FACE_MAP_CORE.name}</dt>
                <dd className="tabular-nums text-ink">{FACE_MAP_CORE.priceDisplay}</dd>
              </div>
              {quote.addons.chosen.map((a) => (
                <div key={a.id} className="flex items-baseline justify-between gap-4 text-[13.5px]">
                  <dt className="text-ink/70">{a.name}</dt>
                  <dd className="tabular-nums text-ink">+{a.priceDisplay}</dd>
                </div>
              ))}
              {quote.addons.bundled && (
                <div className="flex items-baseline justify-between gap-4 text-[13.5px]">
                  <dt className="flex items-center gap-1.5 text-brand-ink">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Both Maps bundle
                  </dt>
                  <dd className="tabular-nums text-brand-ink">−{ADDON_BUNDLE.savingDisplay}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
                <dt className="text-[13.5px] text-ink" style={{ fontWeight: 500 }}>
                  Total
                </dt>
                <dd className="text-[1.5rem] tabular-nums text-ink" style={{ fontWeight: 500 }}>
                  ₹{quote.total.toLocaleString('en-IN')}
                </dd>
              </div>
            </dl>
            <p className="mt-2.5 text-[12px] text-ink-muted">{FACE_MAP_CORE.gstNote}.</p>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl text-[14px] text-center"
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                color: '#dc2626',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Pay Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={handlePayment}
              disabled={isLoading || !razorpayLoaded}
              className={cn(
                'inline-flex items-center justify-center h-14 px-12 rounded-full text-[15px] font-medium transition-all',
                isLoading || !razorpayLoaded
                  ? 'bg-[#999] cursor-not-allowed'
                  : 'bg-[#111] hover:bg-[#333]'
              )}
              style={{ color: 'white' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Pay ₹{quote.total.toLocaleString('en-IN')}</>
              )}
            </button>

            {/* Trust badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-[13px] text-[#888]">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <span className="text-[#ddd]">|</span>
              <span>{REFUND_POLICY.short}</span>
            </div>

            {/* Payment logos */}
            <div className="mt-4">
              <p className="text-[11px] text-[#bbb] mb-1">Powered by</p>
              <span className="text-[13px] text-[#999]" style={{ fontWeight: 500 }}>
                Razorpay
              </span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
