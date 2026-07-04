'use client'

import { useState } from 'react'
import { Plus, GripVertical, Trash2, Image as ImageIcon, MapPin, Coffee, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

interface Day {
  id: string
  title: string
  description: string
  activities: string[]
}

export default function ItineraryBuilderPage() {
  const [days, setDays] = useState<Day[]>([
    { id: '1', title: 'Arrival in Srinagar', description: 'Welcome to the city of lakes!', activities: ['Airport pickup', 'Shikara ride'] }
  ])

  const addDay = () => {
    const newDay: Day = {
      id: (days.length + 1).toString(),
      title: `Day ${days.length + 1}`,
      description: '',
      activities: []
    }
    setDays([...days, newDay])
  }

  const removeDay = (id: string) => {
    setDays(days.filter(day => day.id !== id))
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Itinerary Builder</h1>
          <p className="text-slate-500 text-sm">Design day-wise travel plans</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview PDF</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Itinerary</Button>
        </div>
      </div>

      <div className="space-y-4">
        {days.map((day, index) => (
          <Card key={day.id} className="relative group">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 w-0.5 bg-slate-200 my-2"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <Input
                      className="text-lg font-bold border-none px-0 focus-visible:ring-0 h-auto"
                      placeholder="Enter day title (e.g., Arrival in Srinagar)"
                      defaultValue={day.title}
                    />
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={() => removeDay(day.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Describe the day's highlights..."
                    className="resize-none border-slate-200 focus:border-blue-400"
                    defaultValue={day.description}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 text-xs"><MapPin className="h-3 w-3" /> Add Sightseeing</Button>
                    <Button variant="outline" size="sm" className="gap-2 text-xs"><Coffee className="h-3 w-3" /> Add Meals</Button>
                    <Button variant="outline" size="sm" className="gap-2 text-xs"><Car className="h-3 w-3" /> Add Transfer</Button>
                    <Button variant="outline" size="sm" className="gap-2 text-xs"><ImageIcon className="h-3 w-3" /> Add Image</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
              <GripVertical className="text-slate-300" />
            </div>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-8 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all gap-2"
          onClick={addDay}
        >
          <Plus className="h-5 w-5" /> Add Another Day
        </Button>
      </div>
    </div>
  )
}
