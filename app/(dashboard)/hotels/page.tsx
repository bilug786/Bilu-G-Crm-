'use client'

import { useState } from 'react'
import { Plus, Search, Star, MapPin, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const hotels = [
  { id: 'HTL-001', name: 'Grand Palace Hotel', category: 'Luxury', address: 'Srinagar, Kashmir', rating: 5, price: '$150/night', image: '/hotel1.jpg' },
  { id: 'HTL-002', name: 'Mountain View Resort', category: 'Premium', address: 'Gulmarg, Kashmir', rating: 4, price: '$120/night', image: '/hotel2.jpg' },
  { id: 'HTL-003', name: 'Ladakh Retreat', category: 'Boutique', address: 'Leh, Ladakh', rating: 4, price: '$100/night', image: '/hotel3.jpg' },
  { id: 'HTL-004', name: 'River Side Inn', category: 'Budget', address: 'Pahalgam, Kashmir', rating: 3, price: '$60/night', image: '/hotel4.jpg' },
]

export default function HotelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hotel Management</h1>
          <p className="text-slate-500 text-sm">Manage hotels, room categories, and pricing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Categories</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="h-4 w-4" /> Add New Hotel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="all">All Hotels</TabsTrigger>
            <TabsTrigger value="luxury">Luxury</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search hotels..." className="pl-10" />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden group">
                <div className="h-40 bg-slate-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                     <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">{hotel.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{hotel.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(hotel.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                    <MapPin className="h-3 w-3" /> {hotel.address}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">{hotel.price}</span>
                    <span className="text-xs text-slate-400">Base Rate</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t border-slate-50 mt-auto">
                  <Button variant="ghost" size="sm" className="w-full mt-4 text-blue-600 hover:bg-blue-50">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
