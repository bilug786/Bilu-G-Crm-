import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { getDashboardStats, getBookings } from "@/lib/actions"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  const recentBookings = await getBookings()

  const chartData = [
    { name: 'Jan', revenue: stats.revenue * 0.1, bookings: Math.floor(stats.bookings * 0.1) },
    { name: 'Feb', revenue: stats.revenue * 0.15, bookings: Math.floor(stats.bookings * 0.15) },
    { name: 'Mar', revenue: stats.revenue * 0.2, bookings: Math.floor(stats.bookings * 0.2) },
    { name: 'Apr', revenue: stats.revenue * 0.1, bookings: Math.floor(stats.bookings * 0.1) },
    { name: 'May', revenue: stats.revenue * 0.15, bookings: Math.floor(stats.bookings * 0.15) },
    { name: 'Jun', revenue: stats.revenue * 0.1, bookings: Math.floor(stats.bookings * 0.1) },
    { name: 'Jul', revenue: stats.revenue * 0.2, bookings: Math.floor(stats.bookings * 0.2) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm">Real-time statistics and insights</p>
        </div>
        <p className="text-slate-500 font-medium">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          change="+0%"
          trend="up"
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Leads"
          value={stats.leads.toString()}
          change="+0%"
          trend="up"
          icon={Briefcase}
        />
        <StatsCard
          title="Total Bookings"
          value={stats.bookings.toString()}
          change="+0%"
          trend="up"
          icon={Calendar}
        />
        <StatsCard
          title="Total Customers"
          value={stats.customers.toString()}
          change="+0%"
          trend="up"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCharts data={chartData} />

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {recentBookings.length === 0 ? (
                 <p className="text-center py-10 text-slate-400">No bookings yet</p>
               ) : (
                 recentBookings.slice(0, 5).map((booking) => (
                   <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                     <div className="flex flex-col">
                       <span className="text-sm font-semibold text-slate-900">{booking.customer.name}</span>
                       <span className="text-xs text-slate-500">{booking.package.name}</span>
                     </div>
                     <div className="text-right">
                       <span className="text-sm font-bold text-blue-600">${Number(booking.totalAmount).toLocaleString()}</span>
                       <p className="text-[10px] text-slate-400">{new Date(booking.createdAt).toLocaleDateString()}</p>
                     </div>
                   </div>
                 ))
               )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
}

function StatsCard({ title, value, change, trend, icon: Icon }: StatsCardProps) {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={trend === 'up' ? 'text-emerald-600 text-xs font-semibold' : 'text-red-600 text-xs font-semibold'}>
                {change}
              </span>
              <span className="text-slate-400 text-xs ml-1">vs last month</span>
            </div>
          </div>
          <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
