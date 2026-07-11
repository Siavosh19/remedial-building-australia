import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import PasswordChangeForm from "@/components/directory/PasswordChangeForm";

export default async function ClientSettingsPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/settings");

  const card = "scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-950">Account settings</h1>
        <p className="mt-2 text-slate-600">Manage your account details and security.</p>
      </div>

      {/* Account details */}
      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-950">Account details</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Full name</p>
            <p className="mt-2 font-semibold text-slate-900">{user.full_name ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Account email</p>
            <p className="mt-2 font-semibold text-slate-900">{user.email}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Phone</p>
            <p className="mt-2 font-semibold text-slate-900">{user.phone ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* Password change */}
      <div id="password" className={card}>
        <h2 className="text-lg font-semibold text-slate-950">Password change</h2>
        <p className="mt-2 mb-6 text-slate-600">You will need to enter your current password to set a new one.</p>
        <PasswordChangeForm />
      </div>

      {/* Unsubscribe */}
      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-950">Unsubscribe</h2>
        <p className="mt-2 mb-6 text-slate-600">Stop receiving newsletter and marketing emails. Account emails still come through.</p>
        <a
          href={`/api/unsubscribe?email=${encodeURIComponent(user.email)}`}
          className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Unsubscribe from emails
        </a>
      </div>

      {/* Help & support */}
      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-950">Help &amp; support</h2>
        <p className="mt-2 mb-6 text-slate-600">Questions about a quote request? Our team is here to help.</p>
        <a
          href="/contact"
          className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Contact support →
        </a>
      </div>

      {/* Sign out */}
      <div className={card}>
        <h2 className="text-lg font-semibold text-slate-950">Sign out</h2>
        <p className="mt-2 text-slate-600">Sign out of your account on this device.</p>
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
