import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { sendOtpSchema } from '@/lib/validations'
import { createOtpRecord, getLatestOtp, supabaseAdmin } from '@/lib/db'
import { sendOtpViaMSG91 } from '@/lib/msg91'
import { generateOTP } from '@/lib/utils'
import { OTP_CONFIG } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = sendOtpSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { phone } = result.data

    // Check rate limiting - count recent OTP requests
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await supabaseAdmin
      .from('otp_verifications')
      .select('*', { count: 'exact', head: true })
      .eq('phone', phone)
      .gt('created_at', oneHourAgo)

    if (count && count >= 5) {
      return NextResponse.json(
        { error: 'Too many OTP requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Check if there's already an active OTP
    const existingOtp = await getLatestOtp(phone)
    if (existingOtp) {
      const createdAt = new Date(existingOtp.created_at).getTime()
      const cooldownMs = OTP_CONFIG.resendCooldownSeconds * 1000
      if (Date.now() - createdAt < cooldownMs) {
        return NextResponse.json(
          { error: 'Please wait before requesting a new OTP' },
          { status: 429 }
        )
      }
    }

    // Generate OTP
    const otp = generateOTP()
    const otpHash = await hash(otp, 10)
    const expiresAt = new Date(Date.now() + OTP_CONFIG.expiryMinutes * 60 * 1000).toISOString()

    // Store OTP record
    await createOtpRecord({
      phone,
      otp_hash: otpHash,
      expires_at: expiresAt,
    })

    // Send OTP via MSG91
    const sent = await sendOtpViaMSG91(phone, otp)

    if (!sent && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again.' },
        { status: 500 }
      )
    }

    // In development, log the OTP
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] OTP for ${phone}: ${otp}`)
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // In dev mode, return OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp }),
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
