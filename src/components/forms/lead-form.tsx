'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OtpInput } from './otp-input'
import { useOtpTimer } from '@/hooks/use-otp-timer'
import { leadFormSchema, type LeadFormData } from '@/lib/validations'
import { trackLead } from '@/lib/meta-pixel'
import { SITE_CONFIG } from '@/lib/constants'

type Step = 'form' | 'otp' | 'verified'

const API_URL = SITE_CONFIG.apiUrl

export function LeadForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('form')
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { canResend, startTimer, formattedTime } = useOtpTimer()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onChange',
  })

  const phone = watch('phone')

  const sendOtp = async () => {
    setIsLoading(true)
    setOtpError('')

    try {
      const response = await fetch(`${API_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: getValues('phone') }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      setStep('otp')
      startTimer()
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : 'Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter all 6 digits')
      return
    }

    setIsLoading(true)
    setOtpError('')

    try {
      // Verify OTP via Railway API
      const verifyResponse = await fetch(`${API_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: getValues('phone'), otp }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Invalid OTP')
      }

      // Store form data + phoneToken in sessionStorage for payment page
      const formData = getValues()
      sessionStorage.setItem('checkoutData', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        phoneToken: verifyData.phoneToken,
      }))

      setStep('verified')

      // Meta Pixel: lead captured (OTP verified)
      trackLead()

      // Redirect to payment after a brief delay
      setTimeout(() => {
        router.push('/payment')
      }, 1500)
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : 'Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  const resendOtp = async () => {
    if (!canResend) return
    setOtp('')

    setIsLoading(true)
    setOtpError('')

    try {
      const response = await fetch(`${API_URL}/api/otp/resend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: getValues('phone') }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP')
      }

      startTimer()
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : 'Failed to resend OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async () => {
    await sendOtp()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <div className="flex gap-2">
                <div className="flex items-center justify-center px-3 bg-muted rounded-md border text-sm font-medium">
                  +91
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  {...register('phone')}
                  error={errors.phone?.message}
                  className="flex-1"
                />
              </div>
            </div>

            {otpError && (
              <p className="text-sm text-destructive">{otpError}</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading || !phone || phone.length !== 10}
              loading={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="#" className="underline">Terms</a> and{' '}
              <a href="#" className="underline">Privacy Policy</a>
            </p>
          </motion.form>
        )}

        {step === 'otp' && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold">Verify Your Number</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We've sent a 6-digit code to +91 {getValues('phone')}
              </p>
            </div>

            <OtpInput
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
              error={otpError}
            />

            <Button
              onClick={verifyOtp}
              size="lg"
              className="w-full"
              disabled={isLoading || otp.length !== 6}
              loading={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-sm text-primary hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Resend OTP in {formattedTime}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('form')
                setOtp('')
                setOtpError('')
              }}
              className="w-full text-sm text-muted-foreground hover:text-primary"
            >
              ← Change phone number
            </button>
          </motion.div>
        )}

        {step === 'verified' && (
          <motion.div
            key="verified"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-600">Verified!</h3>
            <p className="text-muted-foreground">
              Redirecting to payment...
            </p>
            <Loader2 className="w-6 h-6 mx-auto animate-spin text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
