import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentClientUser } from "@/lib/directory-auth";
import SettingsForm from "@/components/client/SettingsForm";

export const dynamic = "force-dynamic";

export default async function ClientSettingsPage() {
  const user = await getCurrentClientUser();
  if (!user) redirect("/directory/login");

  const profile = await prisma.clientProfile.findUnique({ where: { user_id: user.id } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Account settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your contact details and password.</p>
      </div>
      <SettingsForm
        email={user.email}
        defaults={{
          fullName: user.full_name ?? "",
          phone: user.phone ?? "",
          companyName: profile?.company_name ?? "",
          clientType: profile?.client_type ?? "",
        }}
      />
    </div>
  );
}
