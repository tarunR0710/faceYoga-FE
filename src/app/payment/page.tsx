'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Check, Loader2, Shield, Sparkles, Lock, Clock, Star, Stethoscope } from 'lucide-react'
import { useRazorpay } from '@/hooks/use-razorpay'
import { PRICING_PLANS, SITE_CONFIG, type PlanId } from '@/lib/constants'
import { trackInitiateCheckout, trackPurchase } from '@/lib/meta-pixel'
import { cn } from '@/lib/utils'

const API_URL = SITE_CONFIG.apiUrl

const PACKAGE_IDS: Record<PlanId, string> = {
  one_time: '',
  monthly: '',
  yearly: '',
}

// Post-form order bumps / add-ons
const ADDONS = [
  {
    id: 'video_consult',
    name: '1-on-1 video consult with your doctor',
    description: 'A 20-minute live call to walk through your plan and answer your questions.',
    priceInPaise: 49900,
    recommended: true,
  },
  {
    id: 'priority_review',
    name: 'Priority 24-hour review',
    description: 'Skip the queue — your doctor reviews your face within 24 hours.',
    priceInPaise: 29900,
    recommended: false,
  },
  {
    id: 'monthly_checkins',
    name: 'Monthly progress check-ins',
    description: 'Your doctor re-checks your progress and adjusts your routine every month.',
    priceInPaise: 19900,
    recommended: false,
  },
] as const

interface CheckoutData {
  name: string
  email: string
  phone: string
  phoneToken: string
}

const formatINR = (paise: number) => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`

// Teaser metrics for the locked report preview
const TEASER_METRICS = [
  { label: 'Facial symmetry', value: 88 },
  { label: 'Cheek lift potential', value: 74 },
  { label: 'Jawline definition', value: 61 },
  { label: 'Under-eye firmness', value: 52 },
]

export default function PaymentPage() {
  const router = useRouter()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('yearly')
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['video_consult'])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60)
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

  // Persistent offer countdown
  useEffect(() => {
    const key = 'checkoutDeadline'
    let deadline = Number(sessionStorage.getItem(key))
    if (!deadline || Number.isNaN(deadline) || deadline < Date.now()) {
      deadline = Date.now() + 15 * 60 * 1000
      sessionStorage.setItem(key, String(deadline))
    }
    const tick = () => setSecondsLeft(Math.max(0, Math.round((deadline - Date.now()) / 1000)))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  const plan = PRICING_PLANS[selectedPlan]
  const activeAddons = ADDONS.filter((a) => selectedAddons.includes(a.id))
  const addonsPaise = activeAddons.reduce((sum, a) => sum + a.priceInPaise, 0)
  const totalPaise = plan.priceInPaise + addonsPaise

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  const handlePayment = async () => {
    if (!checkoutData) {
      router.push('/form')
      return
    }
    setIsLoading(true)
    setError('')

    trackInitiateCheckout({ value: totalPaise / 100, currency: 'INR', planId: selectedPlan })

    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone,
          phoneToken: checkoutData.phoneToken,
          packageId: PACKAGE_IDS[selectedPlan] || selectedPlan,
          planName: plan.name,
          // NEW: selected add-ons + computed total (paise). Backend must honor these
          // when creating the Razorpay order so the charged amount matches the UI.
          addons: activeAddons.map((a) => ({ id: a.id, name: a.name, amount: a.priceInPaise })),
          amount: totalPaise,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create order')

      openPayment({
        orderId: data.orderId,
        amount: data.amount,
        description: `${plan.name} - ${SITE_CONFIG.name}`,
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

            trackPurchase({ value: totalPaise / 100, currency: 'INR', planId: selectedPlan, contentName: plan.name })
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
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-8 h-8 animate-spin text-[#666]" />
      </div>
    )
  }

  const firstName = checkoutData.name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-[#eee] bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/form" className="flex items-center gap-2 text-[#888] hover:text-[#111] transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[13px]">Back</span>
            </Link>
            <Link href="/" className="text-[17px] text-[#111]" style={{ fontWeight: 500 }}>
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
            {/* Report teaser (locked) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden border border-[#eee] bg-white"
            >
              <div className="p-5 md:p-6" style={{ background: 'linear-gradient(160deg, #201c19 0%, #14110f 100%)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] uppercase tracking-[0.15em] text-white/60">Analysis ready</span>
                </div>
                <h1 className="text-[1.4rem] md:text-[1.6rem] leading-tight tracking-[-0.02em] text-white" style={{ fontWeight: 450 }}>
                  {firstName}, your doctor has prepared your plan
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <Stethoscope style={{ width: 18, height: 18 }} className="text-white" />
                  </div>
                  <p className="text-[13px] text-white/60">Reviewed 1-on-1 by your assigned doctor</p>
                </div>
              </div>

              {/* locked metric preview */}
              <div className="relative p-5 md:p-6">
                <div className="space-y-3.5">
                  {TEASER_METRICS.map((m) => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] text-[#555]">{m.label}</span>
                        <span className="text-[12px] text-[#bbb] blur-[3px] select-none">{m.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#f0f0f0] overflow-hidden">
                        <div className="h-full rounded-full bg-[#d8d8d8] blur-[2px]" style={{ width: `${m.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* lock overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.88))' }}>
                  <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center">
                    <Lock style={{ width: 18, height: 18 }} className="text-white" />
                  </div>
                  <p className="text-[13px] font-medium text-[#111]">Unlock your full analysis &amp; plan below</p>
                </div>
              </div>
            </motion.div>

            {/* Plan selection */}
            <div>
              <h2 className="text-[15px] font-medium text-[#111] mb-3">1. Choose your plan</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {Object.values(PRICING_PLANS).map((p, index) => {
                  const isSelected = selectedPlan === p.id
                  return (
                    <motion.button
                      key={p.id}
                      type="button"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      onClick={() => setSelectedPlan(p.id as PlanId)}
                      className={cn(
                        'relative text-left rounded-2xl p-4 transition-all duration-200 bg-white',
                        isSelected ? 'ring-2 ring-[#111] shadow-[0_16px_32px_-20px_rgba(0,0,0,0.3)]' : 'ring-1 ring-[#e5e5e5] hover:ring-[#ccc]'
                      )}
                    >
                      {p.popular && (
                        <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase flex items-center gap-1" style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#78350f' }}>
                          <Sparkles className="w-3 h-3" /> Best value
                        </span>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-medium text-[#111]">{p.name}</span>
                        <span className={cn('rounded-full border-2 flex items-center justify-center', isSelected ? 'bg-[#111] border-[#111]' : 'border-[#ddd] bg-white')} style={{ width: 18, height: 18 }}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                      </div>
                      {'originalPriceDisplay' in p && (
                        <span className="text-[12px] text-[#bbb] line-through mr-1">{p.originalPriceDisplay}</span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-[1.4rem] text-[#111]" style={{ fontWeight: 500 }}>{p.priceDisplay}</span>
                        {p.period && <span className="text-[12px] text-[#888]">{p.period}</span>}
                      </div>
                      {'savings' in p && (
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>{p.savings}</span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h2 className="text-[15px] font-medium text-[#111] mb-1">2. Boost your results <span className="text-[#999] font-normal">(optional)</span></h2>
              <p className="text-[13px] text-[#888] mb-3">Members who add a doctor consult see results roughly 2× faster.</p>
              <div className="space-y-3">
                {ADDONS.map((a) => {
                  const checked = selectedAddons.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a.id)}
                      className={cn(
                        'w-full text-left flex items-start gap-3 rounded-2xl p-4 bg-white transition-all duration-200',
                        checked ? 'ring-2 ring-[#111]' : 'ring-1 ring-[#e5e5e5] hover:ring-[#ccc]'
                      )}
                    >
                      <span className={cn('mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors', checked ? 'bg-[#111] border-[#111]' : 'border-[#ccc] bg-white')}>
                        {checked && <Check className="w-3 h-3 text-white" />}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center gap-2 flex-wrap">
                          <span className="text-[14px] font-medium text-[#111]">{a.name}</span>
                          {a.recommended && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">Popular</span>}
                        </span>
                        <span className="block text-[12.5px] text-[#777] leading-snug mt-0.5">{a.description}</span>
                      </span>
                      <span className="text-[14px] font-medium text-[#111] whitespace-nowrap">+{formatINR(a.priceInPaise)}</span>
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
              className="rounded-2xl border border-[#eee] bg-white p-5 md:p-6"
            >
              {/* countdown */}
              <div className="flex items-center justify-center gap-2 mb-5 py-2.5 rounded-xl bg-[#fff7ed] border border-[#fed7aa]">
                <Clock className="w-4 h-4 text-[#ea580c]" />
                <span className="text-[13px] text-[#9a3412]">Your discount holds for</span>
                <span className="text-[13px] font-semibold text-[#9a3412] tabular-nums">{mm}:{ss}</span>
              </div>

              <h3 className="text-[15px] font-medium text-[#111] mb-4">Order summary</h3>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#666]">{plan.name}</span>
                  <span className="text-[#111]">{plan.priceDisplay}</span>
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
                      <span className="text-[#666] pr-3">{a.name}</span>
                      <span className="text-[#111] whitespace-nowrap">{formatINR(a.priceInPaise)}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#eee] mb-5">
                <span className="text-[14px] font-medium text-[#111]">Total</span>
                <motion.span key={totalPaise} initial={{ scale: 1.08 }} animate={{ scale: 1 }} className="text-[1.5rem] text-[#111]" style={{ fontWeight: 500 }}>
                  {formatINR(totalPaise)}
                </motion.span>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl text-[13px] text-center" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isLoading || !razorpayLoaded}
                className={cn(
                  'w-full inline-flex items-center justify-center py-4 rounded-full text-[15px] font-medium transition-all text-white',
                  isLoading || !razorpayLoaded ? 'bg-[#999] cursor-not-allowed' : 'bg-[#111] hover:bg-[#333]'
                )}
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                ) : (
                  <>Unlock my plan · {formatINR(totalPaise)}</>
                )}
              </button>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-[12px] text-[#666]">
                  <Shield className="w-4 h-4 text-emerald-500" /> Secure payment via Razorpay
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#666]">
                  <Check className="w-4 h-4 text-emerald-500" /> 7-day money-back guarantee
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#666]">
                  <Check className="w-4 h-4 text-emerald-500" /> Cancel anytime, no questions asked
                </div>
              </div>

              {/* mini social proof */}
              <div className="mt-5 pt-5 border-t border-[#f0f0f0]">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#888]">4.9 · joined by 50,000+ people</span>
                </div>
                <p className="text-[12px] text-[#888] italic leading-relaxed">
                  &ldquo;Having a real doctor answer my questions was worth it on its own.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
