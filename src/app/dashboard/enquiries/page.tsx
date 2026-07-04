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
import { Plus, Search, MoreHorizontal, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const enquiries = [
  {
    id: "ENQ001",
    customer: "John Doe",
    destination: "Maldives",
    dates: "15 Nov - 20 Nov",
    pax: "2 Adults, 1 Child",
    status: "OPEN",
    budget: "₹1,50,000",
  },
  {
    id: "ENQ002",
    customer: "Jane Smith",
    destination: "Bali",
    dates: "10 Dec - 15 Dec",
    pax: "2 Adults",
    status: "QUOTED",
    budget: "₹80,000",
  },
];

export default function EnquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Enquiries</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Enquiry
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search enquiries..."
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
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Pax</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enq) => (
              <TableRow key={enq.id}>
                <TableCell className="font-medium">{enq.id}</TableCell>
                <TableCell>{enq.customer}</TableCell>
                <TableCell>{enq.destination}</TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-3 w-3" /> {enq.dates}
                  </div>
                </TableCell>
                <TableCell>{enq.pax}</TableCell>
                <TableCell>
                  <Badge variant={enq.status === "QUOTED" ? "default" : "secondary"}>
                    {enq.status}
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Create Quotation</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancel Enquiry</DropdownMenuItem>
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
