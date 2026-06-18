'use client'

import { useCallback, useEffect, useState } from 'react'
import { SITE_CONFIG } from '@/lib/constants'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  handler: (response: RazorpayResponse) => void
  modal?: {
    ondismiss?: () => void
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export function useRazorpay() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if already loaded
    if (window.Razorpay) {
      setIsLoaded(true)
      return
    }

    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setIsLoaded(true)
    document.body.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [])

  const openPayment = useCallback(
    (options: {
      orderId: string
      amount: number
      currency?: string
      description?: string
      prefill?: {
        name?: string
        email?: string
        contact?: string
      }
      onSuccess: (response: RazorpayResponse) => void
      onError?: (error: any) => void
      onDismiss?: () => void
    }) => {
      if (!isLoaded || !window.Razorpay) {
        options.onError?.(new Error('Razorpay not loaded'))
        return
      }

      const razorpayOptions: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: options.amount,
        currency: options.currency || 'INR',
        name: SITE_CONFIG.name,
        description: options.description || 'Face Yoga Plan',
        order_id: options.orderId,
        prefill: options.prefill,
        theme: {
          color: '#000000',
        },
        handler: options.onSuccess,
        modal: {
          ondismiss: options.onDismiss,
        },
      }

      try {
        const rzp = new window.Razorpay(razorpayOptions)
        rzp.on('payment.failed', (response: any) => {
          options.onError?.(response.error)
        })
        rzp.open()
      } catch (error) {
        options.onError?.(error)
      }
    },
    [isLoaded]
  )

  return {
    isLoaded,
    openPayment,
  }
}
