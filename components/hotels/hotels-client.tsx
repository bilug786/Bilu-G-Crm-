'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Search, Trash2, Edit2, MapPin, Building2 } from 'lucide-react'
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
import { toast } from "sonner"
import { createHotel } from "@/lib/actions"

export default function HotelsClient({ initialHotels }: { initialHotels: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredHotels = initialHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hotel.city && hotel.city.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hotel Management</h1>
          <p className="text-slate-500 text-sm">Manage partner hotels and accommodations</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger >
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" /> Add New Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
              <DialogDescription>Add a new partner hotel to your database.</DialogDescription>
            </DialogHeader>
            <form action={async (formData) => {
              // Note: Ideally you'd fetch categories first. For simplicity using a placeholder.
              const data = {
                name: formData.get('name'),
                city: formData.get('city'),
                address: formData.get('address'),
                contactPerson: formData.get('contactPerson'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                categoryId: "placeholder-id" // In a real app, this would be a select from HotelCategory
              }
              // This will fail without a real categoryId but for now we focus on the UI/Action flow
              toast.info('Feature requires Hotel Categories to be set up first.')
              setIsAddOpen(false)
            }} className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Hotel Name</label>
                <Input name="name" placeholder="Grand Plaza Hotel" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input name="city" placeholder="e.g. Srinagar" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Person</label>
                <Input name="contactPerson" placeholder="Manager Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input name="phone" placeholder="+91 12345 67890" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input name="email" type="email" placeholder="hotel@example.com" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Address</label>
                <Input name="address" placeholder="Hotel Street Address" />
              </div>
              <div className="col-span-2 mt-4">
                <DialogFooter>
                  <Button type="submit" className="w-full">Save Hotel</Button>
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
            placeholder="Search hotels by name or city..."
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
              <TableHead className="font-semibold">Hotel</TableHead>
              <TableHead className="font-semibold">City</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHotels.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={5} className="text-center py-10 text-slate-500">No hotels found</TableCell>
               </TableRow>
            ) : (
              filteredHotels.map((hotel) => (
                <TableRow key={hotel.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-slate-900">{hotel.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-3 w-3" /> {hotel.city || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{hotel.contactPerson || 'N/A'}</span>
                      <span className="text-xs text-slate-500">{hotel.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{hotel.category?.name || 'Standard'}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2"><Edit2 className="h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 gap-2"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
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
