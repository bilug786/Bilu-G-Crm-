'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Search, Trash2, Edit2, MapPin, Package } from 'lucide-react'
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

export default function PackagesClient({ initialPackages }: { initialPackages: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)

  const filteredPackages = initialPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tour Packages</h1>
          <p className="text-slate-500 text-sm">Manage your travel products and deals</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger >
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" /> Add New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New Package</DialogTitle>
              <DialogDescription>Create a new travel package for your customers.</DialogDescription>
            </DialogHeader>
            <form action={async (formData) => {
              toast.success('Package created successfully')
              setIsAddOpen(false)
            }} className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Package Name</label>
                <Input name="name" placeholder="Kashmir Paradise Tour" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Input name="duration" placeholder="e.g. 5 Days / 4 Nights" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Base Price</label>
                <Input name="basePrice" type="number" placeholder="25000" required />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Highlights</label>
                <Input name="highlights" placeholder="Brief tour highlights" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Inclusions</label>
                <Input name="inclusions" placeholder="What's included" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Exclusions</label>
                <Input name="exclusions" placeholder="What's not included" />
              </div>
              <div className="col-span-2 mt-4">
                <DialogFooter>
                  <Button type="submit" className="w-full">Save Package</Button>
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
            placeholder="Search packages by name or destination..."
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
              <TableHead className="font-semibold">Package Name</TableHead>
              <TableHead className="font-semibold">Destination</TableHead>
              <TableHead className="font-semibold">Duration</TableHead>
              <TableHead className="font-semibold text-center">Base Price</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center py-10 text-slate-500">No packages found</TableCell>
               </TableRow>
            ) : (
              filteredPackages.map((pkg) => (
                <TableRow key={pkg.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        <Package className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-slate-900">{pkg.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-3 w-3" /> {pkg.destination?.name || 'Various'}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{pkg.duration}</TableCell>
                  <TableCell className="text-center font-bold text-slate-900">${Number(pkg.basePrice).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={pkg.isPublished ? "secondary" : "outline"} className={pkg.isPublished ? "bg-emerald-100 text-emerald-700" : ""}>
                      {pkg.isPublished ? 'Published' : 'Draft'}
                    </Badge>
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
