'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, CreditCard, IndianRupee, TrendingUp } from 'lucide-react'
import { StatsCard } from '@/components/admin/stats-card'
import { formatPrice, formatDateTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/constants'

interface Stats {
  totalTransactions: number
  totalPaid: number
  totalRevenue: number
  successRate: string
  recentTransactions: any[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchStats(token)
  }, [router])

  async function fetchStats(token: string) {
    try {
      const [statsRes, txnRes] = await Promise.all([
        fetch(`${SITE_CONFIG.apiUrl}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${SITE_CONFIG.apiUrl}/api/admin/transactions?limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (!statsRes.ok || !txnRes.ok) {
        if (statsRes.status === 401 || txnRes.status === 401) {
          localStorage.removeItem('admin_token')
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch')
      }

      const statsData = await statsRes.json()
      const txnData = await txnRes.json()

      setStats({
        totalTransactions: statsData.totalAttempts || 0,
        totalPaid: statsData.totalPaid || 0,
        totalRevenue: statsData.totalRevenue || 0,
        successRate: statsData.totalAttempts
          ? ((statsData.totalPaid / statsData.totalAttempts) * 100).toFixed(1)
          : '0',
        recentTransactions: txnData.transactions || [],
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#666]"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load dashboard</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your FaceYoga transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Transactions"
          value={stats.totalTransactions.toLocaleString()}
          icon={Users}
        />
        <StatsCard
          title="Paid"
          value={stats.totalPaid.toLocaleString()}
          icon={CreditCard}
        />
        <StatsCard
          title="Total Revenue"
          value={formatPrice(stats.totalRevenue / 100)}
          icon={IndianRupee}
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate}%`}
          icon={TrendingUp}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {stats.recentTransactions.map((txn: any) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm">{txn.name}</p>
                      <p className="text-xs text-muted-foreground">{txn.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{formatPrice(txn.amount / 100)}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        txn.status === 'paid' ? 'success' :
                        txn.status === 'failed' ? 'destructive' : 'secondary'
                      }
                    >
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDateTime(txn.createdAt)}
                  </td>
                </tr>
              ))}
              {stats.recentTransactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No transactions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
