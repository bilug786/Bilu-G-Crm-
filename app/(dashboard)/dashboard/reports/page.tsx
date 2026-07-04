'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  Briefcase
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const revenueData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 15000 },
  { month: 'Mar', amount: 18000 },
  { month: 'Apr', amount: 14000 },
  { month: 'May', amount: 22000 },
  { month: 'Jun', amount: 25000 },
]

const bookingStatusData = [
  { name: 'Confirmed', value: 45 },
  { name: 'Pending', value: 15 },
  { name: 'Cancelled', value: 5 },
]

const COLORS = ['#2563eb', '#f59e0b', '#ef4444']

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('revenue')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-slate-500 text-sm">Analyze your business performance and growth</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" /> Export Excel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Download className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="flex gap-4 p-1 bg-slate-100 rounded-lg w-fit">
        <Button
          variant={activeReport === 'revenue' ? 'secondary' : 'ghost'}
          className={activeReport === 'revenue' ? 'bg-white shadow-sm' : ''}
          onClick={() => setActiveReport('revenue')}
        >
          Revenue
        </Button>
        <Button
          variant={activeReport === 'bookings' ? 'secondary' : 'ghost'}
          className={activeReport === 'bookings' ? 'bg-white shadow-sm' : ''}
          onClick={() => setActiveReport('bookings')}
        >
          Bookings
        </Button>
        <Button
          variant={activeReport === 'customers' ? 'secondary' : 'ghost'}
          className={activeReport === 'customers' ? 'bg-white shadow-sm' : ''}
          onClick={() => setActiveReport('customers')}
        >
          Customers
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                 {bookingStatusData.map((entry, index) => (
                   <div key={index} className="flex items-center gap-1">
                     <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}} />
                     <span className="text-xs text-slate-500">{entry.name}</span>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none bg-blue-600 text-white">
            <CardContent className="p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold">Annual Target</h3>
                 <TrendingUp className="h-5 w-5 opacity-50" />
               </div>
               <div className="text-3xl font-bold mb-1">$250,000</div>
               <p className="text-blue-100 text-xs">74% of target achieved</p>
               <div className="w-full bg-blue-400 h-2 rounded-full mt-4">
                  <div className="bg-white h-full rounded-full" style={{width: '74%'}} />
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
