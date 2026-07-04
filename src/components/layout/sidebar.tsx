"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  FileQuestion,
  FileText,
  CalendarDays,
  Hotel,
  Bus,
  Users2,
  CreditCard,
  Receipt,
  Settings,
  BarChart3,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: UserSquare2, label: "Leads", href: "/dashboard/leads" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: FileQuestion, label: "Enquiries", href: "/dashboard/enquiries" },
  { icon: FileText, label: "Quotations", href: "/dashboard/quotations/new" },
  { icon: CalendarDays, label: "Bookings", href: "/dashboard/bookings" },
  { icon: Hotel, label: "Hotels", href: "/dashboard/hotels" },
  { icon: Bus, label: "Transport", href: "/dashboard/transport" },
  { icon: Users2, label: "Suppliers", href: "/dashboard/suppliers" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
  { icon: Receipt, label: "Expenses", href: "/dashboard/expenses" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card border-r w-64">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">TravelCRM</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent text-muted-foreground hover:text-accent-foreground"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
