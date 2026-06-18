'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

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

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

function TransactionsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)

  const page = parseInt(searchParams.get('page') || '1')
  const status = searchParams.get('status') || 'all'

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
        limit: '20',
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
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 })
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusFilters = ['all', 'paid', 'created', 'failed', 'expired']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#666]"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[1.25rem] text-[#111]" style={{ fontWeight: 500 }}>
            Transactions
          </h1>
          <p className="text-[13px] text-[#888]">{pagination.total.toLocaleString()} total</p>
        </div>

        <div className="flex gap-1.5">
          {statusFilters.map((s) => (
            <a
              key={s}
              href={`/admin/payments?status=${s}`}
              className={cn(
                'px-3 py-1.5 text-[12px] rounded-full transition-colors',
                status === s
                  ? 'bg-[#111] text-white'
                  : 'bg-[#f5f5f5] text-[#666] hover:bg-[#eee]'
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#eee] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#eee] bg-[#fafafa]">
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[#888] uppercase tracking-wide">Name</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[#888] uppercase tracking-wide">Email</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[#888] uppercase tracking-wide">Mobile</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[#888] uppercase tracking-wide">Amount</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[#888] uppercase tracking-wide">Status</th>
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[#888] uppercase tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-[#f5f5f5] hover:bg-[#fafafa]">
                  <td className="px-4 py-3">
                    <p className="text-[13px] text-[#111]" style={{ fontWeight: 450 }}>{txn.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[13px] text-[#666]">{txn.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[13px] text-[#666]">+91 {txn.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[13px] text-[#111]" style={{ fontWeight: 500 }}>{formatPrice(txn.amount / 100)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        txn.status === 'paid' ? 'success' :
                        txn.status === 'failed' ? 'destructive' : 'secondary'
                      }
                    >
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[12px] text-[#888]">{formatDateTime(txn.createdAt)}</p>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[14px] text-[#999]">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-[#eee] flex items-center justify-between">
            <p className="text-[12px] text-[#888]">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} results)
            </p>
            <div className="flex gap-1">
              <a
                href={page > 1 ? `/admin/payments?page=${page - 1}&status=${status}` : '#'}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-lg border transition-colors',
                  page > 1
                    ? 'border-[#eee] hover:bg-[#f5f5f5] text-[#666]'
                    : 'border-[#f5f5f5] text-[#ccc] cursor-not-allowed'
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </a>
              <a
                href={page < pagination.totalPages ? `/admin/payments?page=${page + 1}&status=${status}` : '#'}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-lg border transition-colors',
                  page < pagination.totalPages
                    ? 'border-[#eee] hover:bg-[#f5f5f5] text-[#666]'
                    : 'border-[#f5f5f5] text-[#ccc] cursor-not-allowed'
                )}
              >
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPaymentsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#666]"></div>
      </div>
    }>
      <TransactionsContent />
    </Suspense>
  )
}
