'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Search, Trash2, Edit2 } from 'lucide-react'
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
import { createLead, updateLead, deleteLead } from "@/lib/actions"
import { useRouter } from 'next/navigation'

export default function LeadsClient({ initialLeads }: { initialLeads: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const router = useRouter()

  const filteredLeads = initialLeads.filter(lead =>
    lead.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await deleteLead(id)
      toast.success('Lead deleted successfully')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW': return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">New</Badge>
      case 'CONTACTED': return <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">Contacted</Badge>
      case 'QUALIFIED': return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Qualified</Badge>
      case 'WON': return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Won</Badge>
      case 'LOST': return <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Lost</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-500 text-sm">Manage and track your potential customers</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger >
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="h-4 w-4" /> Add New Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Enter the details of the new potential lead.</DialogDescription>
            </DialogHeader>
            <form action={async (formData) => {
              const data = {
                source: formData.get('source'),
                status: formData.get('status'),
                notes: formData.get('notes'),
              }
              await createLead(data)
              setIsAddOpen(false)
              toast.success('Lead created successfully')
            }} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <Input name="source" placeholder="e.g. Google, WhatsApp, Referral" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select name="status" defaultValue="NEW">
                   <SelectTrigger>
                     <SelectValue placeholder="Select Status" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="NEW">New</SelectItem>
                     <SelectItem value="CONTACTED">Contacted</SelectItem>
                     <SelectItem value="QUALIFIED">Qualified</SelectItem>
                   </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Input name="notes" placeholder="Additional details" />
              </div>
              <DialogFooter>
                <Button type="submit">Save Lead</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search leads by name or source..."
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
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Source</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">No leads found</TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-600 text-xs truncate max-w-[100px]">{lead.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{lead.customer?.name || 'Unassigned'}</span>
                      <span className="text-xs text-slate-500">{lead.customer?.email || 'No email'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{lead.source}</TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                          <Edit2 className="h-4 w-4" /> Edit Lead
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 gap-2"
                          onClick={() => handleDelete(lead.id)}
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
