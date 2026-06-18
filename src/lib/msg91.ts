// MSG91 OTP Service
// Documentation: https://docs.msg91.com/collection/msg91-api-integration/5/send-otp-message/TZ6HN0YI

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY!
const MSG91_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID!

interface SendOtpResponse {
  type: string
  request_id: string
  message?: string
}

interface VerifyOtpResponse {
  type: string
  message: string
}

export async function sendOtpViaMSG91(phone: string, otp: string): Promise<boolean> {
  // In development, skip actual SMS
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] OTP for ${phone}: ${otp}`)
    return true
  }

  try {
    const response = await fetch('https://control.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authkey: MSG91_AUTH_KEY,
      },
      body: JSON.stringify({
        template_id: MSG91_TEMPLATE_ID,
        mobile: `91${phone}`,
        otp: otp,
      }),
    })

    const data: SendOtpResponse = await response.json()

    if (data.type === 'success') {
      return true
    }

    console.error('MSG91 send OTP failed:', data)
    return false
  } catch (error) {
    console.error('MSG91 send OTP error:', error)
    return false
  }
}

// Alternative: Use MSG91's built-in OTP verification
export async function verifyOtpViaMSG91(phone: string, otp: string): Promise<boolean> {
  // In development, we handle verification ourselves
  if (process.env.NODE_ENV === 'development') {
    return true // Verification handled by our DB
  }

  try {
    const response = await fetch(
      `https://control.msg91.com/api/v5/otp/verify?mobile=91${phone}&otp=${otp}`,
      {
        method: 'GET',
        headers: {
          authkey: MSG91_AUTH_KEY,
        },
      }
    )

    const data: VerifyOtpResponse = await response.json()

    return data.type === 'success'
  } catch (error) {
    console.error('MSG91 verify OTP error:', error)
    return false
  }
}

// Resend OTP using MSG91
export async function resendOtpViaMSG91(phone: string): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  try {
    const response = await fetch(
      `https://control.msg91.com/api/v5/otp/retry?mobile=91${phone}&retrytype=text`,
      {
        method: 'GET',
        headers: {
          authkey: MSG91_AUTH_KEY,
        },
      }
    )

    const data = await response.json()
    return data.type === 'success'
  } catch (error) {
    console.error('MSG91 resend OTP error:', error)
    return false
  }
}
