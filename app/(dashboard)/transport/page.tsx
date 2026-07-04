'use client'

import { useState } from 'react'
import { Plus, Search, Truck, User, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const vehicles = [
  { id: 'VEH-001', model: 'Toyota Innova Crysta', reg: 'JK01-1234', capacity: '7 Seater', status: 'Available' },
  { id: 'VEH-002', model: 'Tempo Traveler', reg: 'JK01-5678', capacity: '12 Seater', status: 'On Tour' },
  { id: 'VEH-003', model: 'Maruti Suzuki Ertiga', reg: 'JK01-9012', capacity: '6 Seater', status: 'Maintenance' },
]

const drivers = [
  { id: 'DRV-001', name: 'Abdul Rashid', phone: '+91 9906123456', license: 'JK-12345678', status: 'Available' },
  { id: 'DRV-002', name: 'Mohammad Yusuf', phone: '+91 9906789012', license: 'JK-87654321', status: 'On Trip' },
]

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transport Management</h1>
          <p className="text-slate-500 text-sm">Manage vehicles, drivers, and assignments</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="h-4 w-4" /> Add Transport
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vehicles" className="w-full">
        <TabsList className="bg-slate-100 p-1 mb-4">
          <TabsTrigger value="vehicles" className="gap-2"><Truck className="h-4 w-4" /> Vehicles</TabsTrigger>
          <TabsTrigger value="drivers" className="gap-2"><User className="h-4 w-4" /> Drivers</TabsTrigger>
          <TabsTrigger value="assignments" className="gap-2"><CreditCard className="h-4 w-4" /> Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search vehicles..." className="pl-10" />
              </div>
            </div>
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold">Model</TableHead>
                  <TableHead className="font-semibold">Registration</TableHead>
                  <TableHead className="font-semibold">Capacity</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.model}</TableCell>
                    <TableCell>{v.reg}</TableCell>
                    <TableCell>{v.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={v.status === 'Available' ? 'default' : 'secondary'} className={v.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : ''}>
                        {v.status}
                      </Badge>
                    </TableCell>
                    <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="drivers">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-100">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search drivers..." className="pl-10" />
              </div>
            </div>
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">License</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.phone}</TableCell>
                    <TableCell>{d.license}</TableCell>
                    <TableCell>
                      <Badge variant={d.status === 'Available' ? 'default' : 'secondary'} className={d.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : ''}>
                        {d.status}
                      </Badge>
                    </TableCell>
                    <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
