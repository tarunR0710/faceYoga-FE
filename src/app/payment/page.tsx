'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Check, Loader2, Shield } from 'lucide-react'
import { useRazorpay } from '@/hooks/use-razorpay'
import { FACE_MAP_CORE, FACE_MAP_ADDONS, SITE_CONFIG } from '@/lib/constants'
import { trackInitiateCheckout, trackPurchase } from '@/lib/meta-pixel'
import { cn } from '@/lib/utils'

const API_URL = SITE_CONFIG.apiUrl

interface CheckoutData {
  name: string
  email: string
  phone: string
  phoneToken: string
}

const formatINR = (paise: number) => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`

const NEXT_STEPS = [
  'We call to welcome you and book your Face Mapping Session.',
  'You meet a real expert live, then the panel reviews your case.',
  'Your Face Map and Appearance Protocol arrive in 2–4 working days.',
]

export default function PaymentPage() {
  const router = useRouter()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { isLoaded: razorpayLoaded, openPayment } = useRazorpay()

  useEffect(() => {
    const stored = sessionStorage.getItem('checkoutData')
    if (stored) {
      try {
        setCheckoutData(JSON.parse(stored) as CheckoutData)
      } catch {
        router.push('/form')
      }
    } else {
      router.push('/form')
    }
  }, [router])

  const activeAddons = FACE_MAP_ADDONS.filter((a) => selectedAddons.includes(a.id))
  const addonsPaise = activeAddons.reduce((sum, a) => sum + a.priceInPaise, 0)
  const totalPaise = FACE_MAP_CORE.priceInPaise + addonsPaise

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const handlePayment = async () => {
    if (!checkoutData) {
      router.push('/form')
      return
    }
    setIsLoading(true)
    setError('')

    trackInitiateCheckout({ value: totalPaise / 100, currency: 'INR', planId: FACE_MAP_CORE.id })

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
          addons: activeAddons.map((a) => ({ id: a.id, name: a.name, amount: a.priceInPaise })),
          amount: totalPaise,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create order')

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
            if (!verifyResponse.ok) throw new Error(verifyData.error || 'Payment verification failed')

            trackPurchase({ value: totalPaise / 100, currency: 'INR', planId: FACE_MAP_CORE.id, contentName: FACE_MAP_CORE.name })
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
        onDismiss: () => setIsLoading(false),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(false)
    }
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <Loader2 className="w-8 h-8 animate-spin text-analysis-teal" />
      </div>
    )
  }

  const firstName = checkoutData.name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-ink/10 bg-ivory/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/form" className="flex items-center gap-2 text-analysis-teal hover:text-ink transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[13px]">Back</span>
            </Link>
            <Link href="/" className="text-[17px] text-ink" style={{ fontWeight: 600 }}>
              {SITE_CONFIG.name}
            </Link>
            <div className="w-16" />
          </div>
        </div>
      </header>

      <main className="py-10 lg:py-14 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-start">
          {/* LEFT column */}
          <div className="space-y-6">
            {/* Intro — session-first, honest */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[24px] overflow-hidden border border-ink/10"
            >
              <div className="p-5 md:p-6 bg-ink">
                <p className="text-[11px] uppercase tracking-[0.15em] text-teal mb-3">Build your Face Map</p>
                <h1 className="text-[1.4rem] md:text-[1.6rem] leading-tight tracking-[-0.02em] text-ivory" style={{ fontWeight: 400 }}>
                  {firstName}, you&apos;re one step from your Complete Face Map.
                </h1>
              </div>
              <div className="p-5 md:p-6 bg-white">
                <p className="text-[12px] text-analysis-teal uppercase tracking-[0.08em] mb-3">What happens after you pay</p>
                <ol className="space-y-3">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="pill-accent flex-shrink-0 w-6 h-6 rounded-full text-[12px] flex items-center justify-center" style={{ fontWeight: 600 }}>{i + 1}</span>
                      <span className="text-[14px] text-ink/80 leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            {/* Core plan (included) */}
            <div>
              <h2 className="text-[15px] text-ink mb-3" style={{ fontWeight: 600 }}>1. Your Complete Face Map</h2>
              <div className="card-hover-accent rounded-[22px] p-5 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-accent inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium">{FACE_MAP_CORE.label}</span>
                  <span className="text-[1.25rem] text-ink" style={{ fontWeight: 500 }}>{FACE_MAP_CORE.priceDisplay}</span>
                </div>
                <ul className="space-y-2.5">
                  {FACE_MAP_CORE.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="icon-tile-accent flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3" strokeWidth={2.5} />
                      </span>
                      <span className="text-[14px] text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h2 className="text-[15px] text-ink mb-1" style={{ fontWeight: 600 }}>2. Add specialist maps <span className="text-analysis-teal font-normal">(optional)</span></h2>
              <p className="text-[13px] text-analysis-teal mb-3">Add hair or personal-style guidance so it works with the complete picture.</p>
              <div className="space-y-3">
                {FACE_MAP_ADDONS.map((a) => {
                  const checked = selectedAddons.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a.id)}
                      className={cn(
                        'w-full text-left flex items-start gap-3 rounded-[22px] p-4 transition-all duration-200',
                        checked
                          ? 'ring-2 ring-ink bg-accent-soft/50'
                          : 'bg-white ring-1 ring-ink/10 hover:ring-accent/40 hover:bg-accent-soft/25'
                      )}
                    >
                      <span className={cn('mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors', checked ? 'bg-ink border-ink' : 'border-ink/25 bg-white')}>
                        {checked && <Check className="w-3 h-3 text-ivory" />}
                      </span>
                      <span className="flex-1">
                        <span className="text-[14px] text-ink" style={{ fontWeight: 500 }}>{a.name}</span>
                        <span className="block text-[12.5px] text-ink/60 leading-snug mt-0.5">{a.description}</span>
                      </span>
                      <span className="text-[14px] text-ink whitespace-nowrap" style={{ fontWeight: 500 }}>+{a.priceDisplay}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT column — sticky order summary */}
          <div className="lg:sticky lg:top-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glow rounded-[24px] border border-ink/10 p-5 md:p-6"
            >
              <h3 className="text-[13px] uppercase tracking-[0.1em] text-analysis-teal mb-4" style={{ fontWeight: 600 }}>Order summary</h3>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ink/70">{FACE_MAP_CORE.name}</span>
                  <span className="text-ink">{FACE_MAP_CORE.priceDisplay}</span>
                </div>
                <AnimatePresence initial={false}>
                  {activeAddons.map((a) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-between text-[13px] overflow-hidden"
                    >
                      <span className="text-ink/70 pr-3">{a.name}</span>
                      <span className="text-ink whitespace-nowrap">{a.priceDisplay}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <hr className="divider-accent mb-4" />
              <div className="flex items-center justify-between mb-5">
                <span className="text-[14px] text-ink" style={{ fontWeight: 500 }}>Total</span>
                <motion.span key={totalPaise} initial={{ scale: 1.08 }} animate={{ scale: 1 }} className="text-[1.5rem] text-ink" style={{ fontWeight: 500 }}>
                  {formatINR(totalPaise)}
                </motion.span>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl text-[13px] text-center" style={{ background: 'rgba(192,73,47,0.08)', color: '#c0492f', border: '1px solid rgba(192,73,47,0.2)' }}>
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isLoading || !razorpayLoaded}
                className={cn(
                  'w-full inline-flex items-center justify-center py-4 rounded-full text-[15px] font-semibold transition-colors',
                  isLoading || !razorpayLoaded ? 'bg-ink/40 text-ivory cursor-not-allowed' : 'bg-ink text-ivory hover:bg-ink/88'
                )}
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                ) : (
                  <>Continue to payment · {formatINR(totalPaise)}</>
                )}
              </button>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-[12px] text-analysis-teal">
                  <Shield className="w-4 h-4 text-accent" strokeWidth={1.75} /> Secure payment via Razorpay · 0 surgery, ever
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-ink/10">
                <p className="text-[12px] text-analysis-teal leading-relaxed">
                  Built with experts. Tested with real people.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
