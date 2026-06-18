import { z } from 'zod'

export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be 10 digits')
  .max(10, 'Phone number must be 10 digits')
  .regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number')

export const emailSchema = z
  .string()
  .email('Enter a valid email address')
  .min(1, 'Email is required')

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')

export const leadFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export const otpSchema = z
  .string()
  .length(6, 'OTP must be 6 digits')
  .regex(/^\d{6}$/, 'OTP must contain only numbers')

export const sendOtpSchema = z.object({
  phone: phoneSchema,
})

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  otp: otpSchema,
})

export const createOrderSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  planId: z.enum(['one_time', 'monthly', 'yearly']),
})

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
})

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type AdminLoginData = z.infer<typeof adminLoginSchema>
