import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/db'
import { formatDateTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchParams {
  page?: string
  search?: string
}

async function getUsers(page: number, search: string) {
  const pageSize = 20
  const offset = (page - 1) * pageSize

  let query = supabaseAdmin
    .from('users')
    .select('*, payments(id, status, amount)', { count: 'exact' })

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
  }

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (error) throw error

  return {
    users: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
  }
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const session = await getAdminSession()

  if (!session) {
    redirect('/admin/login')
  }

  const params = await searchParams
  const page = parseInt(params.page || '1')
  const search = params.search || ''

  const { users, total, totalPages } = await getUsers(page, search)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Users</h1>
          <p className="text-muted-foreground">
            {total.toLocaleString()} total users
          </p>
        </div>

        {/* Search */}
        <form className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            name="search"
            placeholder="Search by name, email, phone..."
            defaultValue={search}
            className="pl-10"
          />
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Payments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user: any) => {
                const paidPayments = user.payments?.filter((p: any) => p.status === 'paid') || []
                const hasPaid = paidPayments.length > 0

                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      +91 {user.phone}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.phone_verified ? 'success' : 'secondary'}>
                        {user.phone_verified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={hasPaid ? 'success' : 'outline'}>
                        {hasPaid ? `${paidPayments.length} Paid` : 'No payments'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDateTime(user.created_at)}
                    </td>
                  </tr>
                )
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    {search ? 'No users found matching your search' : 'No users yet'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <a
                  href={`/admin/users?page=${page - 1}${search ? `&search=${search}` : ''}`}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                  Previous
                </a>
              )}
              {page < totalPages && (
                <a
                  href={`/admin/users?page=${page + 1}${search ? `&search=${search}` : ''}`}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                  Next
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
