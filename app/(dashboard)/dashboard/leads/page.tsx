import { getLeads } from "@/lib/actions"
import LeadsClient from "@/components/leads/leads-client"

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const leads = await getLeads()
  return <LeadsClient initialLeads={leads} />
}
