'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Download, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

const revenueData = [
  { month: 'Jan', income: 45000, expense: 32000 },
  { month: 'Feb', income: 52000, expense: 34000 },
  { month: 'Mar', income: 48000, expense: 31000 },
  { month: 'Apr', income: 61000, expense: 42000 },
  { month: 'May', income: 55000, expense: 38000 },
  { month: 'Jun', income: 67000, expense: 45000 },
]

const categoryData = [
  { name: 'Kashmir', value: 45 },
  { name: 'Ladakh', value: 30 },
  { name: 'Honeymoon', value: 15 },
  { name: 'Corporate', value: 10 },
]

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444']

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-slate-500 text-sm">Analyze your business performance and financials</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">+12%</Badge>
            </div>
            <p className="text-sm text-slate-500">Total Income</p>
            <h3 className="text-2xl font-bold text-slate-900">$348,000</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                <TrendingDown className="h-5 w-5" />
              </div>
              <Badge className="bg-red-100 text-red-700">+5%</Badge>
            </div>
            <p className="text-sm text-slate-500">Total Expenses</p>
            <h3 className="text-2xl font-bold text-slate-900">$222,000</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">+18%</Badge>
            </div>
            <p className="text-sm text-slate-500">Net Profit</p>
            <h3 className="text-2xl font-bold text-slate-900">$126,000</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="income" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

function Badge({ children, className }: BadgeProps) {
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-full ${className}`}>
      {children}
    </span>
  )
}
