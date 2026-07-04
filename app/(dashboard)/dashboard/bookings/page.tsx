import { getBookings, getCustomers, getPackages } from "@/lib/actions"
import BookingsClient from "@/components/bookings/bookings-client"

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  const [bookings, customers, packages] = await Promise.all([
    getBookings(),
    getCustomers(),
    getPackages()
  ])

  return (
    <BookingsClient
      initialBookings={bookings}
      customers={customers}
      packages={packages}
    />
  )
}
