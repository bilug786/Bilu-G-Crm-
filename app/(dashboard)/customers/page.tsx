'use client'

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'

const customers = [
  { id: 'CUS-001', name: 'Robert Fox', email: 'robert@example.com', phone: '+1 234 567 890', address: 'Kashmir, India', bookings: 3 },
  { id: 'CUS-002', name: 'Jane Cooper', email: 'jane@example.com', phone: '+1 987 654 321', address: 'Ladakh, India', bookings: 1 },
  { id: 'CUS-003', name: 'Wade Warren', email: 'wade@example.com', phone: '+1 555 012 345', address: 'Srinagar, India', bookings: 5 },
  { id: 'CUS-004', name: 'Esther Howard', email: 'esther@example.com', phone: '+1 555 678 910', address: 'Gulmarg, India', bookings: 2 },
  { id: 'CUS-005', name: 'Cameron Williamson', email: 'cameron@example.com', phone: '+1 555 444 333', address: 'Pahalgam, India', bookings: 0 },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Management</h1>
          <p className="text-slate-500 text-sm">View and manage your customer database</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="h-4 w-4" /> Add New Customer
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  {customer.name.charAt(0)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger >
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="font-bold text-lg text-slate-900">{customer.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{customer.id}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Mail className="h-4 w-4" /> {customer.email}
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Phone className="h-4 w-4" /> {customer.phone}
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <MapPin className="h-4 w-4" /> {customer.address}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-slate-500">Total Bookings</span>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{customer.bookings}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
