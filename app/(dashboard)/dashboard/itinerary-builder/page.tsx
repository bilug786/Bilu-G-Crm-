'use client'

import { useState } from 'react'
import { Plus, Trash2, Download, Package, MapPin, Hotel, Truck, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from "sonner"

export default function ItineraryBuilderPage() {
  const [days, setDays] = useState([
    { id: 1, title: 'Arrival & Check-in', activities: 'Arrival at airport and transfer to hotel.', meals: 'Dinner', hotel: 'Grand Hotel', transport: 'Private Cab' }
  ])

  const addDay = () => {
    setDays([...days, {
      id: days.length + 1,
      title: '',
      activities: '',
      meals: '',
      hotel: '',
      transport: ''
    }])
  }

  const removeDay = (index: number) => {
    const newDays = [...days]
    newDays.splice(index, 1)
    setDays(newDays)
  }

  const updateDay = (index: number, field: string, value: string) => {
    const newDays = [...days]
    newDays[index] = { ...newDays[index], [field]: value }
    setDays(newDays)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Itinerary Builder</h1>
          <p className="text-slate-500 text-sm">Create detailed day-wise travel plans</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Download className="h-4 w-4" /> Export Professional PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {days.map((day, index) => (
            <Card key={index} className="shadow-sm border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50">
                <CardTitle className="text-sm font-bold text-slate-700">Day {index + 1}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => removeDay(index)} className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">Day Title</label>
                   <Input
                     value={day.title}
                     onChange={(e) => updateDay(index, 'title', e.target.value)}
                     placeholder="e.g. Exploring Old City"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">Activities</label>
                   <Textarea
                     value={day.activities}
                     onChange={(e) => updateDay(index, 'activities', e.target.value)}
                     placeholder="Detailed description of the day's plan..."
                   />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase">
                      <Utensils className="h-3 w-3" /> Meals
                    </div>
                    <Input
                      value={day.meals}
                      onChange={(e) => updateDay(index, 'meals', e.target.value)}
                      placeholder="B, L, D"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase">
                      <Hotel className="h-3 w-3" /> Hotel
                    </div>
                    <Input
                      value={day.hotel}
                      onChange={(e) => updateDay(index, 'hotel', e.target.value)}
                      placeholder="Hotel name"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 uppercase">
                      <Truck className="h-3 w-3" /> Transport
                    </div>
                    <Input
                      value={day.transport}
                      onChange={(e) => updateDay(index, 'transport', e.target.value)}
                      placeholder="Vehicle type"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full border-dashed border-2 py-8" onClick={addDay}>
            <Plus className="h-4 w-4 mr-2" /> Add Next Day
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
               <CardTitle className="text-lg">Package Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Select Package</label>
                 <Input placeholder="Search packages..." />
               </div>
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                    <Package className="h-4 w-4" /> Selected: Kashmir Delight
                  </div>
                  <p className="text-xs text-blue-600">5 Days / 4 Nights | Starts from $450</p>
               </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-slate-900 text-white">
            <CardContent className="p-6">
               <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
               <p className="text-sm text-slate-300">
                 Be specific with activity timings and meeting points to provide a premium experience to your travelers.
               </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
