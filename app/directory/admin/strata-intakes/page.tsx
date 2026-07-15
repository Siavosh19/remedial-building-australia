import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export const dynamic = "force-dynamic";

const STATUS_CLS: Record<string, string> = {
  received: "bg-slate-100 text-slate-600",
  extracting: "bg-amber-100 text-amber-800",
  needs_review: "bg-sky-100 text-sky-800",
  approved: "bg-blue-100 text-blue-800",
  converted: "bg-emerald-100 text-emerald-800",
  rejected: "bg-slate-200 text-slate-500",
  failed: "bg-rose-100 text-rose-700",
};
const STATUS_LABEL: Record<string, string> = {
  received: "Received",
  extracting: "Extracting…",
  needs_review: "Needs review",
  approved: "Approved",
  converted: "Sent to businesses",
  rejected: "Rejected",
  failed: "Extraction failed",
};

// Open items (need attention) sort to the top; resolved ones fall below.
const RANK: Record<string, number> = { needs_review: 0, failed: 1, extracting: 2, received: 3, approved: 4, converted: 5, rejected: 6 };

export default async function AdminStrataIntakesPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const intakes = await prisma.strataIntake.findMany({
    orderBy: { received_at: "desc" },
    take: 500,
    include: { _count: { select: { files: true } } },
  });
  intakes.sort((a, b) => (RANK[a.status] ?? 9) - (RANK[b.status] ?? 9) || b.received_at.getTime() - a.received_at.getTime());

  const pending = intakes.filter((i) => i.status === "needs_review" || i.status === "failed").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Strata Connect</h1>
        <p className="mt-1 text-sm text-slate-500">
          {intakes.length} work order{intakes.length === 1 ? "" : "s"} · {pending} awaiting review · forwarded to workorders@…, extracted by AI, approved here
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="px-4 py-3 font-semibold text-slate-700">From</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Building / job</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Files</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Received</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {intakes.map((i) => {
              const loc = [i.building_address, i.suburb, i.postcode].filter(Boolean).join(", ");
              return (
                <tr key={i.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{i.from_name || i.from_email}</div>
                    {i.from_name && <div className="text-xs text-slate-400">{i.from_email}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="max-w-[280px] truncate">{loc || i.subject || "—"}</div>
                    {loc && i.subject && <div className="max-w-[280px] truncate text-xs text-slate-400">{i.subject}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{i.matched_category_name ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{i._count.files}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CLS[i.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {STATUS_LABEL[i.status] ?? i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{new Date(i.received_at).toLocaleDateString("en-AU")}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/directory/admin/strata-intakes/${i.id}`} className="text-sm font-semibold text-sky-700 hover:underline">
                      Review
                    </Link>
                  </td>
                </tr>
              );
            })}
            {!intakes.length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No work orders received yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
