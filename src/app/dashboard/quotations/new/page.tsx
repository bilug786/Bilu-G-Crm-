"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Download, Send, GripVertical, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { generateInvoicePDF, generateVoucherPDF } from "@/lib/pdf/generators";

interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
}

interface SortableItemProps {
  day: ItineraryDay;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof ItineraryDay, value: string) => void;
}

function SortableDay({ day, onRemove, onUpdate }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: day.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 border rounded-lg space-y-3 bg-card relative group mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab p-1">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="font-bold text-lg">Day {day.day}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onRemove(day.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          placeholder="e.g. Arrival & City Tour"
          value={day.title}
          onChange={(e) => onUpdate(day.id, "title", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe activities for the day..."
          value={day.description}
          onChange={(e) => onUpdate(day.id, "description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default function QuotationBuilder() {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { id: "1", day: 1, title: "Arrival", description: "Arrive at airport and transfer to hotel." },
  ]);
  const [destination, setDestination] = useState("Maldives");
  const [totalAmount, setTotalAmount] = useState(50000);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItinerary((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        return newArray.map((item, idx) => ({ ...item, day: idx + 1 }));
      });
    }
  };

  const addDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      { id: Math.random().toString(36).substr(2, 9), day: nextDay, title: "", description: "" },
    ]);
  };

  const removeDay = (id: string) => {
    setItinerary(itinerary.filter((day) => day.id !== id).map((day, idx) => ({ ...day, day: idx + 1 })));
  };

  const updateDay = (id: string, field: keyof ItineraryDay, value: string) => {
    setItinerary(itinerary.map((day) => (day.id === id ? { ...day, [field]: value } : day)));
  };

  const handleSave = () => {
    toast.success("Quotation saved successfully");
  };

  const handleExportInvoice = () => {
    generateInvoicePDF({
      invoiceNumber: "QT-001",
      amount: totalAmount,
      taxAmount: totalAmount * 0.05,
      grandTotal: totalAmount * 1.05,
      customerName: "John Doe",
      customerPhone: "+91 9876543210",
      bookingId: "BK-12345"
    });
    toast.success("GST Invoice generated");
  };

  const handleExportVoucher = () => {
    generateVoucherPDF({
      id: "VCH-001",
      bookingId: "BK-12345",
      guestName: "John Doe",
      type: "Package",
      description: `Tour package for ${destination}`
    });
    toast.success("Voucher generated");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quotation Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportInvoice}>
            <FileText className="mr-2 h-4 w-4" /> GST Invoice
          </Button>
          <Button variant="outline" onClick={handleExportVoucher}>
            <Download className="mr-2 h-4 w-4" /> Voucher
          </Button>
          <Button onClick={handleSave}>Save Quotation</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Itinerary Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={itinerary.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                {itinerary.map((day) => (
                  <SortableDay
                    key={day.id}
                    day={day}
                    onRemove={removeDay}
                    onUpdate={updateDay}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <Button variant="outline" className="w-full border-dashed mt-4" onClick={addDay}>
              <Plus className="mr-2 h-4 w-4" /> Add Day
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Destination</Label>
                <Input
                    placeholder="e.g. Maldives"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Total Amount (₹)</Label>
                <Input
                    type="number"
                    placeholder="0.00"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Tax/GST (%)</Label>
                <Input type="number" defaultValue="5" readOnly />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" /> Send to Customer
              </Button>
              <Button variant="outline" className="w-full">
                <div className="flex items-center">
                  <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Share on WhatsApp
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
