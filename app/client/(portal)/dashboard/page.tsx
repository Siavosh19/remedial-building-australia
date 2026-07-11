import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { RequestStatusBadge } from "@/components/client/badges";
import { ClipboardList, Send, FileEdit, PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");

  const requests = await prisma.clientQuoteRequest.findMany({
    where: { client_user_id: user.id },
    orderBy: { created_at: "desc" },
    include: { work_category: { select: { name: true } }, _count: { select: { deliveries: true } } },
  });

  const total = requests.length;
  const active = requests.filter((r) => r.status !== "closed" && r.status !== "draft").length;
  const drafts = requests.filter((r) => r.status === "draft").length;
  const recent = requests.slice(0, 5);
  const firstName = user.full_name?.split(" ")[0];

  const stat = (label: string, value: number, Icon: typeof ClipboardList, href: string) => (
    <Link href={href} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200">
      <div className="mb-2 flex items-center gap-2 text-slate-400">
        <Icon size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-sky-950">{value}</p>
    </Link>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-sky-950">Welcome{firstName ? `, ${firstName}` : ""}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Request quotes from listed businesses — you choose who to contact, and they reach out directly.
          </p>
        </div>
        <Link
          href="/client/quote-requests/new"
          className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          <PlusCircle size={16} /> New quote request
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stat("Total requests", total, ClipboardList, "/client/quote-requests")}
        {stat("Active", active, Send, "/client/quote-requests")}
        {stat("Drafts", drafts, FileEdit, "/client/quote-requests")}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <p className="font-bold text-sky-950">Recent quote requests</p>
          <Link href="/client/quote-requests" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <ClipboardList size={20} className="text-slate-400" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-500">No quote requests yet</p>
            <p className="mt-1 text-xs text-slate-400">Create your first request to reach businesses in your area.</p>
            <Link
              href="/client/quote-requests/new"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-sky-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-800"
            >
              Create a request
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {recent.map((r) => (
              <li key={r.id}>
                <Link href={`/client/quote-requests/${r.id}`} className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{r.work_category?.name ?? "Building works"}</p>
                    <p className="text-xs text-slate-400">
                      {r.suburb} {r.postcode} · {r._count.deliveries} sent · {new Date(r.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <RequestStatusBadge status={r.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
