import { getCustomers } from "@/lib/actions"
import CustomersClient from "@/components/customers/customers-client"

export const dynamic = 'force-dynamic'

export default async function CustomersPage() {
  const customers = await getCustomers()
  return <CustomersClient initialCustomers={customers} />
}
