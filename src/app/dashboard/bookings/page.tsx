"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, FileText, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const bookings = [
  {
    id: "BOK001",
    customer: "John Doe",
    destination: "Maldives",
    dates: "15 Nov - 20 Nov",
    amount: "₹1,50,000",
    paid: "₹50,000",
    status: "CONFIRMED",
  },
  {
    id: "BOK002",
    customer: "Jane Smith",
    destination: "Bali",
    dates: "10 Dec - 15 Dec",
    amount: "₹80,000",
    paid: "₹80,000",
    status: "COMPLETED",
  },
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Booking
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((bok) => (
              <TableRow key={bok.id}>
                <TableCell className="font-medium">{bok.id}</TableCell>
                <TableCell>{bok.customer}</TableCell>
                <TableCell>{bok.destination}</TableCell>
                <TableCell>{bok.amount}</TableCell>
                <TableCell>
                  <span className={bok.amount === bok.paid ? "text-green-600 font-bold" : ""}>
                    {bok.paid}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={bok.status === "COMPLETED" ? "default" : "secondary"}>
                    {bok.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" /> Generate Voucher
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" /> Generate Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Add Payment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
