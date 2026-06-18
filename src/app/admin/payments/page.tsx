'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/constants'

interface Transaction {
  id: string
  name: string
  email: string
  phone: string
  amount: number
  status: string
  razorpayOrderId: string
  razorpayPaymentId?: string
  failureReason?: string
  createdAt: string
}

export default function AdminPaymentsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const page = parseInt(searchParams.get('page') || '1')
  const status = searchParams.get('status') || 'all'
  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchTransactions(token)
  }, [page, status, router])

  async function fetchTransactions(token: string) {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        ...(status !== 'all' && { status }),
      })

      const res = await fetch(`${SITE_CONFIG.apiUrl}/api/admin/transactions?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch')
      }

      const data = await res.json()
      setTransactions(data.transactions || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusFilters = ['all', 'paid', 'created', 'failed', 'expired']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Transactions</h1>
          <p className="text-muted-foreground">{total.toLocaleString()} total</p>
        </div>

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

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm">{txn.name}</p>
                      <p className="text-xs text-muted-foreground">{txn.email}</p>
                      <p className="text-xs text-muted-foreground">{txn.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono">{txn.razorpayOrderId}</p>
                    {txn.razorpayPaymentId && (
                      <p className="text-xs text-muted-foreground font-mono">{txn.razorpayPaymentId}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{formatPrice(txn.amount / 100)}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        txn.status === 'paid' ? 'success' :
                        txn.status === 'failed' ? 'destructive' : 'secondary'
                      }
                    >
                      {txn.status}
                    </Badge>
                    {txn.failureReason && (
                      <p className="text-xs text-red-500 mt-1 max-w-[200px] truncate">{txn.failureReason}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDateTime(txn.createdAt)}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
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
