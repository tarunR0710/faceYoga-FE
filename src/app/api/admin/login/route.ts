import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { adminLoginSchema } from '@/lib/validations'
import { getAdminByEmail } from '@/lib/db'
import { setAdminCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = adminLoginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    // Get admin user
    const admin = await getAdminByEmail(email)
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await compare(password, admin.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Set session cookie
    await setAdminCookie({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    })

    return NextResponse.json({
      success: true,
      message: 'Login successful',
    })
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
