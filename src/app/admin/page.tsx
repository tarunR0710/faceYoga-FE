import { redirect } from 'next/navigation'
import { Users, CreditCard, IndianRupee, TrendingUp } from 'lucide-react'
import { getAdminSession } from '@/lib/auth'
import { StatsCard } from '@/components/admin/stats-card'
import { supabaseAdmin } from '@/lib/db'
import { formatPrice, formatDateTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

async function getDashboardStats() {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Get total users
  const { count: totalUsers } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })

  // Get today's signups
  const { count: todaySignups } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfToday.toISOString())

  // Get total paid payments
  const { count: totalPayments } = await supabaseAdmin
    .from('payments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'paid')

  // Get total revenue
  const { data: revenueData } = await supabaseAdmin
    .from('payments')
    .select('amount')
    .eq('status', 'paid')

  const totalRevenue = revenueData?.reduce((sum, p) => sum + p.amount, 0) || 0

  // Get success rate
  const { count: totalAttempts } = await supabaseAdmin
    .from('payments')
    .select('*', { count: 'exact', head: true })

  const successRate = totalAttempts ? ((totalPayments || 0) / totalAttempts * 100).toFixed(1) : '0'

  // Get recent payments
  const { data: recentPayments } = await supabaseAdmin
    .from('payments')
    .select('*, user:users(name, email, phone)')
    .order('created_at', { ascending: false })
    .limit(5)

  return {
    totalUsers: totalUsers || 0,
    todaySignups: todaySignups || 0,
    totalPayments: totalPayments || 0,
    totalRevenue,
    successRate,
    recentPayments: recentPayments || [],
  }
}

export default async function AdminDashboard() {
  const session = await getAdminSession()

  if (!session) {
    redirect('/admin/login')
  }

  const stats = await getDashboardStats()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.name || session.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle={`${stats.todaySignups} today`}
          icon={Users}
        />
        <StatsCard
          title="Total Payments"
          value={stats.totalPayments.toLocaleString()}
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

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Payments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
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
              {stats.recentPayments.map((payment: any) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm">{payment.user?.name || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{payment.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
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
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDateTime(payment.created_at)}
                  </td>
                </tr>
              ))}
              {stats.recentPayments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No payments yet
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
