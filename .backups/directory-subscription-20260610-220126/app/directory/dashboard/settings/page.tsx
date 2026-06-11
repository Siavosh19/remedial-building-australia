import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import PasswordChangeForm from "@/components/directory/PasswordChangeForm";

export default async function DashboardSettingsPage() {
  const user = await getCurrentDirectoryUser();
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
  });

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Account settings</h1>
        <p className="mt-2 text-slate-600">Manage your account details and security.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Account details</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Full name</p>
            <p className="mt-2 font-semibold text-slate-900">{user?.full_name ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Account email</p>
            <p className="mt-2 font-semibold text-slate-900">{user?.email ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Phone</p>
            <p className="mt-2 font-semibold text-slate-900">{user?.phone ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Company</p>
            <p className="mt-2 font-semibold text-slate-900">{company?.name ?? "—"}</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Change password</h2>
        <p className="mt-2 mb-6 text-slate-600">You will need to enter your current password to set a new one.</p>
        <PasswordChangeForm />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Sign out</h2>
        <p className="mt-2 text-slate-600">Sign out of your directory account on this device.</p>
        <div className="mt-6">
          <a
            href="/api/directory/logout"
            className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}
