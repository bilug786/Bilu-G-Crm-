'use client'

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Calendar, CreditCard, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const bookings = [
  { id: 'BK-7890', customer: 'John Doe', package: 'Kashmir Paradise', date: '2023-08-15', amount: '$1,200', status: 'Confirmed', payment: 'Paid' },
  { id: 'BK-7891', customer: 'Sarah Smith', package: 'Ladakh Adventure', date: '2023-09-01', amount: '$2,500', status: 'Pending', payment: 'Partial' },
  { id: 'BK-7892', customer: 'Mike Brown', package: 'Honeymoon Special', date: '2023-08-20', amount: '$1,800', status: 'Confirmed', payment: 'Unpaid' },
]

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Booking Management</h1>
          <p className="text-slate-500 text-sm">Track tours, payments, and customer details</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="h-4 w-4" /> New Booking
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search bookings..." className="pl-10" />
        </div>
        <Button variant="outline">Date Range</Button>
        <Button variant="outline">Status Filter</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Booking ID</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Package</TableHead>
              <TableHead className="font-semibold">Tour Date</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Payment</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-mono text-xs font-bold text-blue-600">{booking.id}</TableCell>
                <TableCell className="font-medium">{booking.customer}</TableCell>
                <TableCell>{booking.package}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Calendar className="h-3 w-3" /> {booking.date}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{booking.amount}</TableCell>
                <TableCell>
                   <Badge variant="secondary" className={booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                    <div className={
                      `h-2 w-2 rounded-full ${
                        booking.payment === 'Paid' ? 'bg-emerald-500' :
                        booking.payment === 'Partial' ? 'bg-amber-500' : 'bg-red-500'
                      }`
                    }></div>
                    <span className="text-sm text-slate-600">{booking.payment}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2"><Download className="h-4 w-4" /> Export Voucher</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><CreditCard className="h-4 w-4" /> Add Payment</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
