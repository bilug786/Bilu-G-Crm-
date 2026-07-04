'use client'

import { useState } from 'react'
import { Plus, Filter, MoreHorizontal, Search } from 'lucide-react'
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

const leads = [
  { id: 'LD-001', name: 'John Doe', email: 'john@example.com', source: 'Google', status: 'NEW', createdAt: '2023-07-01' },
  { id: 'LD-002', name: 'Sarah Smith', email: 'sarah@example.com', source: 'WhatsApp', status: 'CONTACTED', createdAt: '2023-07-02' },
  { id: 'LD-003', name: 'Mike Brown', email: 'mike@example.com', source: 'Referral', status: 'QUALIFIED', createdAt: '2023-07-03' },
  { id: 'LD-004', name: 'Emma Wilson', email: 'emma@example.com', source: 'Instagram', status: 'WON', createdAt: '2023-07-04' },
  { id: 'LD-005', name: 'Chris Evans', email: 'chris@example.com', source: 'Facebook', status: 'LOST', createdAt: '2023-07-05' },
]

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('')

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
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="h-4 w-4" /> Add New Lead
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search leads..."
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
            {leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium text-slate-600">{lead.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{lead.name}</span>
                    <span className="text-xs text-slate-500">{lead.email}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{lead.source}</TableCell>
                <TableCell>{getStatusBadge(lead.status)}</TableCell>
                <TableCell className="text-slate-600">{lead.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
