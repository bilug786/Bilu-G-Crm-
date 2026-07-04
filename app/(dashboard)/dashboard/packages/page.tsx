import { getPackages } from "@/lib/actions"
import PackagesClient from "@/components/packages/packages-client"

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {
  const packages = await getPackages()
  return <PackagesClient initialPackages={packages} />
}
