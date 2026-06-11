import { prisma } from "@/lib/prisma";
import AdminSettingsClient from "./AdminSettingsClient";
import { DISCLOSURE_DEFAULT } from "@/lib/promotion";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.adminSetting.findMany();
  const settingsMap: Record<string, string> = {};
  for (const s of settings) {
    settingsMap[s.key] = s.value;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Platform-wide configuration</p>
      </div>
      <AdminSettingsClient
        settings={settingsMap}
        disclosureDefault={DISCLOSURE_DEFAULT}
      />
    </div>
  );
}
