import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/validations'
import { createUser, getUserByEmail, getUserByPhone } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = leadFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, email, phone } = result.data

    // Check if user already exists with this phone
    const existingUserByPhone = await getUserByPhone(phone)
    if (existingUserByPhone) {
      // Return existing user if phone is verified
      if (existingUserByPhone.phone_verified) {
        return NextResponse.json({
          id: existingUserByPhone.id,
          message: 'User already exists',
          existing: true,
        })
      }
    }

    // Check if email is already in use by another user
    const existingUserByEmail = await getUserByEmail(email)
    if (existingUserByEmail && existingUserByEmail.phone !== phone) {
      return NextResponse.json(
        { error: 'This email is already registered with a different phone number.' },
        { status: 400 }
      )
    }

    // Create or update user
    if (existingUserByPhone) {
      // Update existing user with new details
      const user = await createUser({
        name,
        email,
        phone,
        phone_verified: true,
      }).catch(async () => {
        // If insert fails due to unique constraint, try update
        const { data, error } = await import('@/lib/db').then(m =>
          m.supabaseAdmin
            .from('users')
            .update({ name, email, phone_verified: true })
            .eq('phone', phone)
            .select()
            .single()
        )
        if (error) throw error
        return data
      })

      return NextResponse.json({
        id: user.id,
        message: 'User updated successfully',
      })
    }

    // Create new user
    const user = await createUser({
      name,
      email,
      phone,
      phone_verified: true,
    })

    return NextResponse.json({
      id: user.id,
      message: 'User created successfully',
    })
  } catch (error: any) {
    console.error('Create user error:', error)

    // Handle unique constraint violations
    if (error.code === '23505') {
      if (error.message?.includes('email')) {
        return NextResponse.json(
          { error: 'This email is already registered.' },
          { status: 400 }
        )
      }
      if (error.message?.includes('phone')) {
        return NextResponse.json(
          { error: 'This phone number is already registered.' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to create user. Please try again.' },
      { status: 500 }
    )
  }
}
