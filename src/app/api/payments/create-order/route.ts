import { NextRequest, NextResponse } from 'next/server'
import { createOrderSchema } from '@/lib/validations'
import { createRazorpayOrder } from '@/lib/razorpay'
import { createPayment, supabaseAdmin } from '@/lib/db'
import { PRICING_PLANS } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = createOrderSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { userId, planId } = result.data

    // Get user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found. Please start over.' },
        { status: 404 }
      )
    }

    // Get plan details
    const plan = PRICING_PLANS[planId]
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan selected.' },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const receipt = `receipt_${userId}_${Date.now()}`
    const razorpayOrder = await createRazorpayOrder({
      amount: plan.priceInPaise,
      currency: 'INR',
      receipt,
      notes: {
        userId,
        planId,
        userEmail: user.email,
      },
    })

    // Save payment record
    await createPayment({
      user_id: userId,
      razorpay_order_id: razorpayOrder.id,
      amount: plan.priceInPaise,
      plan_type: planId,
      status: 'created',
    })

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: plan.priceInPaise,
      currency: 'INR',
      prefill: {
        name: user.name,
        email: user.email,
        contact: `+91${user.phone}`,
      },
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.' },
      { status: 500 }
    )
  }
}
