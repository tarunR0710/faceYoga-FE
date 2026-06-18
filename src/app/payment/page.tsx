'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Loader2, Shield, Sparkles } from 'lucide-react'
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

interface CheckoutData {
  name: string
  email: string
  phone: string
  phoneToken: string
}

export default function PaymentPage() {
  const router = useRouter()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('yearly')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { isLoaded: razorpayLoaded, openPayment } = useRazorpay()

  useEffect(() => {
    const stored = sessionStorage.getItem('checkoutData')
    if (stored) {
      try {
        const data = JSON.parse(stored) as CheckoutData
        setCheckoutData(data)
      } catch {
        router.push('/form')
      }
    } else {
      router.push('/form')
    }
  }, [router])

  const handlePayment = async () => {
    if (!checkoutData) {
      router.push('/form')
      return
    }

    setIsLoading(true)
    setError('')

    trackInitiateCheckout({
      value: PRICING_PLANS[selectedPlan].price,
      currency: 'INR',
      planId: selectedPlan,
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
          packageId: PACKAGE_IDS[selectedPlan] || selectedPlan,
          planName: PRICING_PLANS[selectedPlan].name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      openPayment({
        orderId: data.orderId,
        amount: data.amount,
        description: `${PRICING_PLANS[selectedPlan].name} - ${SITE_CONFIG.name}`,
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
              value: PRICING_PLANS[selectedPlan].price,
              currency: 'INR',
              planId: selectedPlan,
              contentName: PRICING_PLANS[selectedPlan].name,
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
              <ArrowLeft className="w-4 h-4" />
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
              style={{ fontWeight: 450 }}
            >
              Choose Your Plan
            </h1>
            <p className="text-[15px] text-[#666]">
              Welcome back, {checkoutData.name}
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {Object.values(PRICING_PLANS).map((plan, index) => {
              const isSelected = selectedPlan === plan.id
              const isPopular = plan.popular

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id as PlanId)}
                  className={cn(
                    'relative rounded-2xl p-5 cursor-pointer transition-all duration-300',
                    isSelected
                      ? 'ring-2 ring-[#111] shadow-lg'
                      : 'ring-1 ring-[#e5e5e5] hover:ring-[#ccc]'
                  )}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(145deg, rgba(17,17,17,0.03) 0%, rgba(17,17,17,0.08) 100%)'
                      : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase flex items-center gap-1"
                      style={{
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                        color: '#78350f',
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Best Value
                    </div>
                  )}

                  {/* Selection indicator */}
                  <div
                    className={cn(
                      'absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                      isSelected
                        ? 'bg-[#111] border-[#111]'
                        : 'border-[#ddd] bg-white'
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>

                  {/* Plan details */}
                  <div className="mb-4 pr-8">
                    <h3
                      className="text-[15px] text-[#111] mb-1"
                      style={{ fontWeight: 500 }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-[13px] text-[#888] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    {'originalPriceDisplay' in plan && (
                      <div className="text-[13px] text-[#999] line-through">
                        {plan.originalPriceDisplay}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-[1.75rem] text-[#111]"
                        style={{ fontWeight: 500 }}
                      >
                        {plan.priceDisplay}
                      </span>
                      {plan.period && (
                        <span className="text-[13px] text-[#888]">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    {'savings' in plan && (
                      <span
                        className="inline-block mt-2 px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#059669',
                        }}
                      >
                        {plan.savings}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {plan.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[13px] text-[#666]"
                      >
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

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
                <>Pay {PRICING_PLANS[selectedPlan].priceDisplay}</>
              )}
            </button>

            {/* Trust badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-[13px] text-[#888]">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <span className="text-[#ddd]">|</span>
              <span>7-day money-back guarantee</span>
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
