'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Bell,
  Settings,
  Hash,
  Upload
} from "lucide-react"
import { toast } from "sonner"
import { updateCompanySettings } from "@/lib/actions"

export default function SettingsPage({ initialSettings }: { initialSettings: any }) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true)
    try {
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        gstNumber: formData.get('gstNumber'),
        panNumber: formData.get('panNumber'),
        bankDetails: formData.get('bankDetails'),
      }
      await updateCompanySettings(data)
      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500 text-sm">Manage your company profile and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-2 bg-white shadow-sm border-none">
            <Building2 className="h-4 w-4" /> Company Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" /> System Preferences
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <CreditCard className="h-4 w-4" /> Billing & Subscription
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Hash className="h-4 w-4" /> API Keys
          </Button>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <form action={handleSubmit}>
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>This information will appear on your invoices and quotations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 pb-4">
                   <div className="h-20 w-20 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                      <Upload className="h-6 w-6 text-slate-400" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-sm font-bold">Company Logo</h4>
                      <p className="text-xs text-slate-500">JPG, PNG or SVG. Max size of 2MB.</p>
                      <Button variant="outline" size="sm" type="button" className="mt-2">Upload New</Button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input name="name" defaultValue={initialSettings?.name} placeholder="e.g. Bilu G Travels" />
                  </div>
                  <div className="space-y-2">
                    <Label>Official Email</Label>
                    <Input name="email" defaultValue={initialSettings?.email} type="email" placeholder="contact@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input name="phone" defaultValue={initialSettings?.phone} placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input placeholder="https://www.company.com" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Office Address</Label>
                    <Textarea name="address" defaultValue={initialSettings?.address} placeholder="Full business address" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200 mt-6">
              <CardHeader>
                <CardTitle>Tax & Banking Details</CardTitle>
                <CardDescription>Tax registration and payment reception details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GST Number</Label>
                    <Input name="gstNumber" defaultValue={initialSettings?.gstNumber} placeholder="GSTIN" />
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Number</Label>
                    <Input name="panNumber" defaultValue={initialSettings?.panNumber} placeholder="Permanent Account Number" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Bank Details</Label>
                    <Textarea name="bankDetails" defaultValue={initialSettings?.bankDetails} placeholder="Account Name, Number, IFSC, Bank Name" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                   <Button type="submit" disabled={isSaving}>
                     {isSaving ? 'Saving Changes...' : 'Save All Settings'}
                   </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
