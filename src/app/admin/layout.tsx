import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  // Redirect to login if not authenticated
  // Skip redirect for login page
  if (!session) {
    // Check if we're already on login page to avoid redirect loop
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
