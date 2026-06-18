import { NextRequest, NextResponse } from 'next/server'
import { verifyPaymentSchema } from '@/lib/validations'
import { verifyPaymentSignature } from '@/lib/razorpay'
import { getPaymentByOrderId, updatePaymentSuccess, updatePaymentFailed } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = verifyPaymentSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = result.data

    // Check if payment exists
    const payment = await getPaymentByOrderId(razorpay_order_id)
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found.' },
        { status: 404 }
      )
    }

    // Check if already processed
    if (payment.status === 'paid') {
      return NextResponse.json({
        success: true,
        message: 'Payment already verified',
      })
    }

    // Verify signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      await updatePaymentFailed(
        razorpay_order_id,
        'INVALID_SIGNATURE',
        'Payment signature verification failed'
      )

      return NextResponse.json(
        { error: 'Payment verification failed. Please contact support.' },
        { status: 400 }
      )
    }

    // Update payment as successful
    await updatePaymentSuccess(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
    })
  } catch (error) {
    console.error('Verify payment error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed. Please contact support.' },
      { status: 500 }
    )
  }
}
