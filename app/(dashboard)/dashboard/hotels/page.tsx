import { getHotels } from "@/lib/actions"
import HotelsClient from "@/components/hotels/hotels-client"

export const dynamic = 'force-dynamic'

export default async function HotelsPage() {
  const hotels = await getHotels()
  return <HotelsClient initialHotels={hotels} />
}
