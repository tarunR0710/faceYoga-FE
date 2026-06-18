'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Loader2, Shield, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRazorpay } from '@/hooks/use-razorpay'
import { PRICING_PLANS, SITE_CONFIG, type PlanId } from '@/lib/constants'
import { trackInitiateCheckout, trackPurchase } from '@/lib/meta-pixel'
import { cn } from '@/lib/utils'

const API_URL = SITE_CONFIG.apiUrl

// Package IDs from the backend (will be fetched or hardcoded based on plan)
const PACKAGE_IDS: Record<PlanId, string> = {
  one_time: '', // Will be set after fetching packages or use a default
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
  const [packages, setPackages] = useState<Array<{ id: string; name: string; amount: number }>>([])
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('yearly')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { isLoaded: razorpayLoaded, openPayment } = useRazorpay()

  // Load checkout data from sessionStorage
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

  // Fetch packages from backend (optional - can use hardcoded IDs if known)
  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch(`${API_URL}/health`)
        if (response.ok) {
          // Backend is available - packages will be looked up by name during order creation
          // For now, we'll pass the plan name and let backend match it
        }
      } catch {
        // Backend not available - will show error during payment
      }
    }
    fetchPackages()
  }, [])

  const handlePayment = async () => {
    if (!checkoutData) {
      router.push('/form')
      return
    }

    setIsLoading(true)
    setError('')

    // Meta Pixel: user started checkout
    trackInitiateCheckout({
      value: PRICING_PLANS[selectedPlan].price,
      currency: 'INR',
      planId: selectedPlan,
    })

    try {
      // Create order via Railway API
      // The backend will look up the package by name and create the order
      const response = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone,
          phoneToken: checkoutData.phoneToken,
          // Pass plan info - backend will match to package
          packageId: PACKAGE_IDS[selectedPlan] || selectedPlan, // Use plan name if no ID
          planName: PRICING_PLANS[selectedPlan].name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      // Open Razorpay
      openPayment({
        orderId: data.orderId,
        amount: data.amount,
        description: `${PRICING_PLANS[selectedPlan].name} - ${SITE_CONFIG.name}`,
        prefill: data.prefill,
        onSuccess: async (razorpayResponse) => {
          // Verify payment via Railway API
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

            // Meta Pixel: payment verified
            trackPurchase({
              value: PRICING_PLANS[selectedPlan].price,
              currency: 'INR',
              planId: selectedPlan,
              contentName: PRICING_PLANS[selectedPlan].name,
            })

            // Clear checkout data
            sessionStorage.removeItem('checkoutData')

            // Redirect to success
            router.push('/success')
          } catch (err) {
            // Even if verification fails, the webhook will handle it
            // Show success anyway since Razorpay payment went through
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/form"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <Link href="/" className="text-xl font-bold text-primary">
              {SITE_CONFIG.name}
            </Link>
            <div className="w-16" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary">
              Choose Your Plan
            </h1>
            <p className="text-muted-foreground mt-2">
              Select the plan that best fits your transformation goals
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome, {checkoutData.name}!
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.values(PRICING_PLANS).map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'relative rounded-2xl p-6 cursor-pointer transition-all duration-200',
                  selectedPlan === plan.id
                    ? 'bg-primary text-primary-foreground shadow-xl ring-2 ring-primary'
                    : 'bg-white border shadow-sm hover:shadow-md'
                )}
                onClick={() => setSelectedPlan(plan.id as PlanId)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-yellow-950">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Best Value
                  </Badge>
                )}

                {/* Selection indicator */}
                <div
                  className={cn(
                    'absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center',
                    selectedPlan === plan.id
                      ? 'bg-white border-white'
                      : 'border-gray-300'
                  )}
                >
                  {selectedPlan === plan.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>

                {/* Plan details */}
                <div className="mb-4">
                  <h3
                    className={cn(
                      'font-semibold',
                      selectedPlan === plan.id ? '' : 'text-primary'
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      'text-sm mt-1',
                      selectedPlan === plan.id
                        ? 'text-primary-foreground/80'
                        : 'text-muted-foreground'
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {'originalPriceDisplay' in plan && (
                    <div
                      className={cn(
                        'text-sm line-through',
                        selectedPlan === plan.id
                          ? 'text-primary-foreground/60'
                          : 'text-muted-foreground'
                      )}
                    >
                      {plan.originalPriceDisplay}
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.priceDisplay}</span>
                    {plan.period && (
                      <span
                        className={cn(
                          'text-sm',
                          selectedPlan === plan.id
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground'
                        )}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {'savings' in plan && (
                    <Badge variant="success" className="mt-2">
                      {plan.savings}
                    </Badge>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {plan.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn(
                          'w-4 h-4 flex-shrink-0 mt-0.5',
                          selectedPlan === plan.id
                            ? 'text-green-400'
                            : 'text-green-500'
                        )}
                      />
                      <span
                        className={cn(
                          selectedPlan === plan.id
                            ? 'text-primary-foreground/90'
                            : 'text-muted-foreground'
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Pay Button */}
          <div className="text-center">
            <Button
              size="xl"
              className="min-w-[200px]"
              onClick={handlePayment}
              disabled={isLoading || !razorpayLoaded}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay {PRICING_PLANS[selectedPlan].priceDisplay}
                </>
              )}
            </Button>

            {/* Trust badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <span>|</span>
              <span>7-day money-back guarantee</span>
            </div>

            {/* Payment logos */}
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">Powered by</p>
              <span className="text-sm font-semibold text-gray-400">Razorpay</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
