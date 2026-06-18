'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { OtpInput } from './otp-input'
import { useOtpTimer } from '@/hooks/use-otp-timer'
import { leadFormSchema, type LeadFormData } from '@/lib/validations'
import { trackLead } from '@/lib/meta-pixel'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

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
      const verifyResponse = await fetch(`${API_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: getValues('phone'), otp }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Invalid OTP')
      }

      const formData = getValues()
      sessionStorage.setItem('checkoutData', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        phoneToken: verifyData.phoneToken,
      }))

      setStep('verified')
      trackLead()

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

  const inputClasses = cn(
    'w-full h-12 px-4 rounded-xl bg-[#f5f5f5] border border-transparent',
    'text-[15px] text-[#111] placeholder:text-[#999]',
    'focus:outline-none focus:border-[#111] focus:bg-white',
    'transition-all duration-200'
  )

  const labelClasses = 'block text-[13px] text-[#666] mb-1.5'

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClasses}>
                Full Name
              </label>
              <input
                id="name"
                placeholder="Enter your full name"
                className={cn(inputClasses, errors.name && 'border-red-400')}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-[12px] text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={cn(inputClasses, errors.email && 'border-red-400')}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-[12px] text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div
                  className="flex items-center justify-center px-4 h-12 rounded-xl text-[14px] text-[#666]"
                  style={{ background: '#f5f5f5' }}
                >
                  +91
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="10-digit number"
                  maxLength={10}
                  className={cn(inputClasses, 'flex-1', errors.phone && 'border-red-400')}
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <p className="text-[12px] text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            {otpError && (
              <p className="text-[13px] text-red-500 text-center">{otpError}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !phone || phone.length !== 10}
              className={cn(
                'w-full h-12 rounded-full text-[14px] font-medium flex items-center justify-center gap-2 transition-all',
                isLoading || !phone || phone.length !== 10
                  ? 'bg-[#ccc] text-[#888] cursor-not-allowed'
                  : 'bg-[#111] text-white hover:bg-[#333]'
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#999]">
              By continuing, you agree to our{' '}
              <a href="#" className="text-[#666] hover:text-[#111]">Terms</a> and{' '}
              <a href="#" className="text-[#666] hover:text-[#111]">Privacy Policy</a>
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
              <h3
                className="text-[17px] text-[#111] mb-1"
                style={{ fontWeight: 500 }}
              >
                Verify Your Number
              </h3>
              <p className="text-[13px] text-[#888]">
                We've sent a 6-digit code to +91 {getValues('phone')}
              </p>
            </div>

            <OtpInput
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
              error={otpError}
            />

            <button
              onClick={verifyOtp}
              disabled={isLoading || otp.length !== 6}
              className={cn(
                'w-full h-12 rounded-full text-[14px] font-medium flex items-center justify-center gap-2 transition-all',
                isLoading || otp.length !== 6
                  ? 'bg-[#ccc] text-[#888] cursor-not-allowed'
                  : 'bg-[#111] text-white hover:bg-[#333]'
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </button>

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-[13px] text-[#666] hover:text-[#111] transition-colors"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-[13px] text-[#999]">
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
              className="w-full text-[13px] text-[#999] hover:text-[#666] transition-colors"
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
            className="text-center py-4 space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-14 h-14 mx-auto rounded-full bg-emerald-50 flex items-center justify-center"
            >
              <CheckCircle className="w-7 h-7 text-emerald-500" />
            </motion.div>
            <h3
              className="text-[17px] text-emerald-600"
              style={{ fontWeight: 500 }}
            >
              Verified!
            </h3>
            <p className="text-[13px] text-[#888]">
              Redirecting to payment...
            </p>
            <Loader2 className="w-5 h-5 mx-auto animate-spin text-[#999]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
