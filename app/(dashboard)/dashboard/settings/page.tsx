import { getCompanySettings } from "@/lib/actions"
import SettingsClient from "@/components/settings/settings-client"

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const settings = await getCompanySettings()
  return <SettingsClient initialSettings={settings} />
}
