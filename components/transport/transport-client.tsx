'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Search, Trash2, Edit2, Truck, User } from 'lucide-react'
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

export default function TransportClient({ initialVehicles }: { initialVehicles: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredVehicles = initialVehicles.filter(vehicle =>
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vehicle.driverName && vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transport Management</h1>
          <p className="text-slate-500 text-sm">Manage vehicles and drivers</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger >
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" /> Add New Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Register a new vehicle and driver in the system.</DialogDescription>
            </DialogHeader>
            <form action={async (formData) => {
              // Implementation here
              toast.success('Vehicle registered successfully')
              setIsAddOpen(false)
            }} className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vehicle Model</label>
                <Input name="model" placeholder="Innova Crysta" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Registration Number</label>
                <Input name="registration" placeholder="JK01 AB 1234" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Capacity (Pax)</label>
                <Input name="capacity" type="number" placeholder="7" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Driver Name</label>
                <Input name="driverName" placeholder="Driver Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Driver Phone</label>
                <Input name="driverPhone" placeholder="+91 98765 43210" />
              </div>
              <div className="col-span-2 mt-4">
                <DialogFooter>
                  <Button type="submit" className="w-full">Save Vehicle</Button>
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
            placeholder="Search vehicles by model, registration or driver..."
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
              <TableHead className="font-semibold">Vehicle</TableHead>
              <TableHead className="font-semibold">Reg Number</TableHead>
              <TableHead className="font-semibold">Capacity</TableHead>
              <TableHead className="font-semibold">Driver Details</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={5} className="text-center py-10 text-slate-500">No vehicles found</TableCell>
               </TableRow>
            ) : (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                        <Truck className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-slate-900">{vehicle.model}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">{vehicle.registration}</Badge>
                  </TableCell>
                  <TableCell>{vehicle.capacity} Pax</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm font-medium">
                         <User className="h-3 w-3" /> {vehicle.driverName || 'N/A'}
                      </div>
                      <span className="text-xs text-slate-500">{vehicle.driverPhone}</span>
                    </div>
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
