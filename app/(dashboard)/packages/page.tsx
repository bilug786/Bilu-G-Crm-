'use client'

import { useState } from 'react'
import { Plus, Search, Map, Clock, Users, IndianRupee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const packages = [
  {
    id: 'PKG-001',
    name: 'Kashmir Paradise Tour',
    category: 'Family',
    duration: '5 Nights / 6 Days',
    capacity: 'Up to 6 People',
    price: '25,000',
    destinations: ['Srinagar', 'Gulmarg', 'Pahalgam']
  },
  {
    id: 'PKG-002',
    name: 'Ladakh Adventure Trip',
    category: 'Group',
    duration: '7 Nights / 8 Days',
    capacity: 'Min 4 People',
    price: '45,000',
    destinations: ['Leh', 'Nubra Valley', 'Pangong Lake']
  },
  {
    id: 'PKG-003',
    name: 'Honeymoon Special',
    category: 'Honeymoon',
    duration: '4 Nights / 5 Days',
    capacity: '2 People',
    price: '35,000',
    destinations: ['Srinagar', 'Gulmarg']
  },
]

export default function PackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tour Packages</h1>
          <p className="text-slate-500 text-sm">Create and manage your tour offerings</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="h-4 w-4" /> Create Package
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search packages by name or destination..." className="pl-10" />
        </div>
        <Button variant="outline">Advanced Filter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-300">
                <Map className="h-12 w-12" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none">{pkg.category}</Badge>
                  <span className="text-xs text-slate-400 font-mono">{pkg.id}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.destinations.map(dest => (
                    <span key={dest} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">{dest}</span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" /> {pkg.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="h-4 w-4" /> {pkg.capacity}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Starting from</p>
                <div className="flex items-center font-bold text-xl text-slate-900">
                  <IndianRupee className="h-4 w-4" /> {pkg.price}
                </div>
              </div>
              <Button className="bg-blue-600">Manage</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
