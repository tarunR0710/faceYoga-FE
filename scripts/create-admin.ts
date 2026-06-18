/**
 * Script to create an admin user
 * Run with: npx ts-node scripts/create-admin.ts
 *
 * Make sure to set your environment variables first:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import { hash } from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables!')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdmin() {
  const email = process.argv[2] || 'admin@faceyoga.com'
  const password = process.argv[3] || 'admin123'
  const name = process.argv[4] || 'Admin'

  console.log(`Creating admin user: ${email}`)

  // Hash password
  const passwordHash = await hash(password, 10)

  // Insert admin user
  const { data, error } = await supabase
    .from('admin_users')
    .upsert({
      email,
      password_hash: passwordHash,
      name,
    }, {
      onConflict: 'email',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating admin:', error.message)
    process.exit(1)
  }

  console.log('Admin user created successfully!')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('\n⚠️  Please change this password immediately after first login!')
}

createAdmin()
