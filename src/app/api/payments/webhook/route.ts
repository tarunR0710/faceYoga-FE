import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/razorpay'
import { getPaymentByOrderId, updatePaymentSuccess, updatePaymentFailed } from '@/lib/db'

// Disable body parsing - we need raw body for signature verification
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-razorpay-signature')
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    const rawBody = await request.text()

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature)
    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const event = JSON.parse(rawBody)
    const eventType = event.event

    console.log('Razorpay webhook received:', eventType)

    // Handle different event types
    switch (eventType) {
      case 'payment.captured': {
        const payment = event.payload.payment.entity
        const orderId = payment.order_id
        const paymentId = payment.id

        // Check if payment exists and not already processed
        const existingPayment = await getPaymentByOrderId(orderId)
        if (!existingPayment) {
          console.log('Payment not found for order:', orderId)
          return NextResponse.json({ received: true })
        }

        if (existingPayment.status === 'paid') {
          console.log('Payment already processed:', orderId)
          return NextResponse.json({ received: true })
        }

        // Update payment as successful
        await updatePaymentSuccess(orderId, paymentId, '')

        console.log('Payment captured successfully:', orderId)
        break
      }

      case 'payment.failed': {
        const payment = event.payload.payment.entity
        const orderId = payment.order_id
        const errorCode = payment.error_code || 'UNKNOWN'
        const errorDescription = payment.error_description || 'Payment failed'

        const existingPayment = await getPaymentByOrderId(orderId)
        if (existingPayment && existingPayment.status !== 'paid') {
          await updatePaymentFailed(orderId, errorCode, errorDescription)
          console.log('Payment failed:', orderId, errorCode)
        }
        break
      }

      case 'order.paid': {
        // Order is fully paid
        const order = event.payload.order.entity
        console.log('Order paid:', order.id)
        break
      }

      default:
        console.log('Unhandled event type:', eventType)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    // Return 200 to prevent Razorpay from retrying
    return NextResponse.json({ received: true })
  }
}
