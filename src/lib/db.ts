import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (limited permissions)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (full permissions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database helper functions
export async function getUserByPhone(phone: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('phone', phone)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function createUser(userData: {
  name: string
  email: string
  phone: string
  phone_verified: boolean
}) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert(userData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateUserPhoneVerified(phone: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({ phone_verified: true })
    .eq('phone', phone)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createOtpRecord(otpData: {
  phone: string
  otp_hash: string
  expires_at: string
}) {
  const { data, error } = await supabaseAdmin
    .from('otp_verifications')
    .insert(otpData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLatestOtp(phone: string) {
  const { data, error } = await supabaseAdmin
    .from('otp_verifications')
    .select('*')
    .eq('phone', phone)
    .eq('verified', false)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function incrementOtpAttempts(id: string) {
  const { error } = await supabaseAdmin
    .from('otp_verifications')
    .update({ attempts: supabaseAdmin.rpc('increment_attempts', { row_id: id }) })
    .eq('id', id)

  if (error) {
    // Fallback: fetch current attempts and increment
    const { data } = await supabaseAdmin
      .from('otp_verifications')
      .select('attempts')
      .eq('id', id)
      .single()

    if (data) {
      await supabaseAdmin
        .from('otp_verifications')
        .update({ attempts: data.attempts + 1 })
        .eq('id', id)
    }
  }
}

export async function markOtpVerified(id: string) {
  const { error } = await supabaseAdmin
    .from('otp_verifications')
    .update({ verified: true })
    .eq('id', id)

  if (error) throw error
}

export async function createPayment(paymentData: {
  user_id: string
  razorpay_order_id: string
  amount: number
  plan_type: string
  status: string
}) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .insert(paymentData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePaymentSuccess(
  orderId: string,
  paymentId: string,
  signature: string
) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .update({
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      status: 'paid',
    })
    .eq('razorpay_order_id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePaymentFailed(
  orderId: string,
  errorCode: string,
  errorDescription: string
) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .update({
      status: 'failed',
      error_code: errorCode,
      error_description: errorDescription,
    })
    .eq('razorpay_order_id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getPaymentByOrderId(orderId: string) {
  const { data, error } = await supabaseAdmin
    .from('payments')
    .select('*, user:users(*)')
    .eq('razorpay_order_id', orderId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getAdminByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
