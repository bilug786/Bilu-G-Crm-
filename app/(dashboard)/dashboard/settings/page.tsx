'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Banknote,
  FileText,
  Settings,
  Shield,
  Bell,
  Upload,
  Save,
  CreditCard,
  Hash,
  Database
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Settings saved successfully')
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Settings</h1>
          <p className="text-slate-500 text-sm">Configure your agency&apos;s branding and operational details</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Save className="h-4 w-4" /> {loading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-slate-100 p-1 mb-8 overflow-x-auto flex-nowrap h-auto scrollbar-hide">
          <TabsTrigger value="general" className="gap-2 shrink-0"><Building2 className="h-4 w-4" /> General</TabsTrigger>
          <TabsTrigger value="contact" className="gap-2 shrink-0"><Phone className="h-4 w-4" /> Contact</TabsTrigger>
          <TabsTrigger value="banking" className="gap-2 shrink-0"><Banknote className="h-4 w-4" /> Banking</TabsTrigger>
          <TabsTrigger value="documents" className="gap-2 shrink-0"><FileText className="h-4 w-4" /> Document Prefixes</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 shrink-0"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="backup" className="gap-2 shrink-0"><Database className="h-4 w-4" /> Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="glass border-none shadow-sm">
            <CardHeader>
              <CardTitle>Business Identity</CardTitle>
              <CardDescription>Setup your basic company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-32 w-32 bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-[10px]">Company Logo</span>
                  </div>
                  <Button variant="outline" size="sm">Upload Logo</Button>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue="Ex-Employee v.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company Tagline</Label>
                    <Input placeholder="Making Travel Simple" />
                  </div>
                  <div className="space-y-2">
                    <Label>GST Number</Label>
                    <Input placeholder="01ABCDE1234F1Z5" />
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Number</Label>
                    <Input placeholder="ABCDE1234F" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3 space-y-2">
                  <Label>Address</Label>
                  <Textarea placeholder="Full office address..." />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="Srinagar" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input placeholder="Jammu & Kashmir" />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input placeholder="190001" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="glass border-none shadow-sm">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How customers and staff can reach you</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Official Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input className="pl-10" defaultValue="hello@bilug.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Website URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input className="pl-10" defaultValue="https://bilug.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input className="pl-10" defaultValue="+91 9906123456" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>WhatsApp Number</Label>
                <div className="relative">
                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                   <Input className="pl-10" defaultValue="+91 9906789012" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking">
          <Card className="glass border-none shadow-sm">
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
              <CardDescription>Configured for invoices and payment receipts</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input placeholder="e.g. HDFC Bank" />
              </div>
              <div className="space-y-2">
                <Label>Account Holder Name</Label>
                <Input placeholder="e.g. Bilu G Travels" />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input placeholder="XXXX-XXXX-XXXX-XXXX" />
              </div>
              <div className="space-y-2">
                <Label>IFSC Code</Label>
                <Input placeholder="HDFC0001234" />
              </div>
              <div className="space-y-2">
                <Label>UPI ID</Label>
                <Input placeholder="bilu@upi" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="glass border-none shadow-sm">
            <CardHeader>
              <CardTitle>Document Prefixes</CardTitle>
              <CardDescription>Customize your sequential numbering</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Invoice Prefix</Label>
                <Input defaultValue="INV-" />
              </div>
              <div className="space-y-2">
                <Label>Quotation Prefix</Label>
                <Input defaultValue="QT-" />
              </div>
              <div className="space-y-2">
                <Label>Voucher Prefix</Label>
                <Input defaultValue="VCH-" />
              </div>
              <div className="space-y-2">
                <Label>Receipt Prefix</Label>
                <Input defaultValue="REC-" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
