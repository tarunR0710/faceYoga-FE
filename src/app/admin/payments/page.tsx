import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/db'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface SearchParams {
  page?: string
  status?: string
}

async function getPayments(page: number, status: string) {
  const pageSize = 20
  const offset = (page - 1) * pageSize

  let query = supabaseAdmin
    .from('payments')
    .select('*, user:users(name, email, phone)', { count: 'exact' })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (error) throw error

  return {
    payments: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
  }
}

export default async function AdminPaymentsPage({
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
  const status = params.status || 'all'

  const { payments, total, totalPages } = await getPayments(page, status)

  const statusFilters = ['all', 'paid', 'created', 'failed']

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Payments</h1>
          <p className="text-muted-foreground">
            {total.toLocaleString()} total payments
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {statusFilters.map((s) => (
            <a
              key={s}
              href={`/admin/payments?status=${s}`}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                status === s
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>
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
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((payment: any) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm">{payment.user?.name || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{payment.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono">{payment.razorpay_order_id}</p>
                    {payment.razorpay_payment_id && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {payment.razorpay_payment_id}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {formatPrice(payment.amount / 100)}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {payment.plan_type.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        payment.status === 'paid'
                          ? 'success'
                          : payment.status === 'failed'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {payment.status}
                    </Badge>
                    {payment.error_description && (
                      <p className="text-xs text-red-500 mt-1 max-w-[200px] truncate">
                        {payment.error_description}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDateTime(payment.created_at)}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No payments found
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
                  href={`/admin/payments?page=${page - 1}&status=${status}`}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                  Previous
                </a>
              )}
              {page < totalPages && (
                <a
                  href={`/admin/payments?page=${page + 1}&status=${status}`}
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
