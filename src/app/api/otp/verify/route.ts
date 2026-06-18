import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { verifyOtpSchema } from '@/lib/validations'
import { getLatestOtp, incrementOtpAttempts, markOtpVerified, supabaseAdmin } from '@/lib/db'
import { OTP_CONFIG } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = verifyOtpSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { phone, otp } = result.data

    // Get latest OTP for this phone
    const otpRecord = await getLatestOtp(phone)

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'No OTP found. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if OTP has expired
    if (new Date(otpRecord.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check attempts
    if (otpRecord.attempts >= OTP_CONFIG.maxAttempts) {
      return NextResponse.json(
        { error: 'Too many attempts. Please request a new OTP.' },
        { status: 400 }
      )
    }

    // Verify OTP
    const isValid = await compare(otp, otpRecord.otp_hash)

    if (!isValid) {
      // Increment attempts
      await incrementOtpAttempts(otpRecord.id)

      const attemptsLeft = OTP_CONFIG.maxAttempts - otpRecord.attempts - 1
      return NextResponse.json(
        {
          error: attemptsLeft > 0
            ? `Invalid OTP. ${attemptsLeft} attempts remaining.`
            : 'Too many invalid attempts. Please request a new OTP.',
        },
        { status: 400 }
      )
    }

    // Mark OTP as verified
    await markOtpVerified(otpRecord.id)

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
