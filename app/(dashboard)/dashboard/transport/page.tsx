import { getVehicles } from "@/lib/actions"
import TransportClient from "@/components/transport/transport-client"

export const dynamic = 'force-dynamic'

export default async function TransportPage() {
  const vehicles = await getVehicles()
  return <TransportClient initialVehicles={vehicles} />
}
