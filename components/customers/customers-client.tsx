'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Search, Trash2, Edit2, Mail, Phone, MapPin } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { createCustomer, updateCustomer, deleteCustomer } from "@/lib/actions"

export default function CustomersClient({ initialCustomers }: { initialCustomers: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredCustomers = initialCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phone && customer.phone.includes(searchTerm))
  )

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(id)
      toast.success('Customer deleted successfully')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 text-sm">Manage your customer database and records</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger >
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" /> Add New Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Create a new profile for your customer.</DialogDescription>
            </DialogHeader>
            <form action={async (formData) => {
              const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                passportNumber: formData.get('passportNumber'),
                gstNumber: formData.get('gstNumber'),
              }
              await createCustomer(data)
              setIsAddOpen(false)
              toast.success('Customer created successfully')
            }} className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input name="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input name="phone" placeholder="+1 234 567 890" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GST Number</label>
                <Input name="gstNumber" placeholder="Optional" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Address</label>
                <Input name="address" placeholder="123 Street, City, Country" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Passport Number</label>
                <Input name="passportNumber" placeholder="Optional" />
              </div>
              <div className="col-span-2 mt-4">
                <DialogFooter>
                  <Button type="submit" className="w-full">Create Customer</Button>
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
            placeholder="Search customers by name, email or phone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Contact Info</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">Added On</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={5} className="text-center py-10 text-slate-500">No customers found</TableCell>
               </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Mail className="h-3 w-3" /> {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Phone className="h-3 w-3" /> {customer.phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-3 w-3" /> {customer.address || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2"><Edit2 className="h-4 w-4" /> Edit Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 gap-2"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
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
