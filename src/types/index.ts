export interface User {
  id: string
  name: string
  email: string
  phone: string
  phone_verified: boolean
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  razorpay_order_id: string
  razorpay_payment_id: string | null
  razorpay_signature: string | null
  amount: number
  currency: string
  status: PaymentStatus
  plan_type: PlanType
  error_code: string | null
  error_description: string | null
  created_at: string
  updated_at: string
  user?: User
}

export type PaymentStatus = 'created' | 'paid' | 'failed' | 'refunded'
export type PlanType = 'one_time' | 'monthly' | 'yearly'

export interface OtpVerification {
  id: string
  phone: string
  otp_hash: string
  expires_at: string
  verified: boolean
  attempts: number
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string | null
  created_at: string
}

export interface DashboardStats {
  totalUsers: number
  totalPayments: number
  totalRevenue: number
  todaySignups: number
  successRate: number
  recentPayments: Payment[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  error: string
  message: string
  statusCode?: number
}

export interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}
