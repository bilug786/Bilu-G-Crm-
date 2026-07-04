'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Search, Trash2, FileText, Download } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { createBooking, deleteBooking } from "@/lib/booking-actions"

export default function BookingsClient({
  initialBookings,
  customers,
  packages
}: {
  initialBookings: any[],
  customers: any[],
  packages: any[]
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredBookings = initialBookings.filter(booking =>
    booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.package.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await deleteBooking(id)
      toast.success('Booking deleted successfully')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
          <p className="text-slate-500 text-sm">Manage tour bookings and travel documents</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger >
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" /> Create New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>Select customer and package to create a booking.</DialogDescription>
            </DialogHeader>
            <form action={async (formData) => {
              const data = {
                customerId: formData.get('customerId'),
                packageId: formData.get('packageId'),
                totalAmount: formData.get('totalAmount'),
                paidAmount: formData.get('paidAmount'),
                tourStartDate: formData.get('startDate'),
                tourEndDate: formData.get('endDate'),
                numPax: formData.get('numPax'),
              }
              await createBooking(data)
              setIsAddOpen(false)
              toast.success('Booking created successfully')
            }} className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Customer</label>
                <Select name="customerId" required>
                   <SelectTrigger>
                     <SelectValue placeholder="Select Customer" />
                   </SelectTrigger>
                   <SelectContent>
                     {customers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                   </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Package</label>
                <Select name="packageId" required>
                   <SelectTrigger>
                     <SelectValue placeholder="Select Package" />
                   </SelectTrigger>
                   <SelectContent>
                     {packages.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                   </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input name="startDate" type="date" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input name="endDate" type="date" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Pax</label>
                <Input name="numPax" type="number" defaultValue="1" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Amount</label>
                <Input name="totalAmount" type="number" placeholder="0.00" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Paid Amount</label>
                <Input name="paidAmount" type="number" placeholder="0.00" defaultValue="0" required />
              </div>
              <div className="col-span-2 mt-4">
                <DialogFooter>
                  <Button type="submit" className="w-full">Confirm Booking</Button>
                </DialogFooter>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search bookings by customer or package..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Booking ID</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Package</TableHead>
              <TableHead className="font-semibold text-center">Amount</TableHead>
              <TableHead className="font-semibold text-center">Balance</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={7} className="text-center py-10 text-slate-500">No bookings found</TableCell>
               </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-600 text-xs truncate max-w-[80px]">{booking.id}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-slate-900">{booking.customer.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{booking.package.name}</span>
                  </TableCell>
                  <TableCell className="text-center font-semibold">${Number(booking.totalAmount).toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <span className={Number(booking.balanceAmount) > 0 ? "text-red-600 font-bold" : "text-emerald-600 font-bold"}>
                      ${Number(booking.balanceAmount).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">{booking.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2"><FileText className="h-4 w-4" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-blue-600 font-medium"><Download className="h-4 w-4" /> Generate Invoice</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 gap-2"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Cancel Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
