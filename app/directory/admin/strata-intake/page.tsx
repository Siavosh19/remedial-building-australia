import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { STRATA_INTAKE_EMAIL } from "@/lib/strata-connect";

export const dynamic = "force-dynamic";

const STATUS_CLS: Record<string, string> = {
  received: "bg-sky-100 text-sky-800",
  extracting: "bg-amber-100 text-amber-800",
  needs_review: "bg-yellow-100 text-yellow-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-700",
  converted: "bg-blue-100 text-blue-800",
  failed: "bg-slate-200 text-slate-500",
};

const STATUS_LABEL: Record<string, string> = {
  received: "Received",
  extracting: "Extracting",
  needs_review: "Needs review",
  approved: "Approved",
  rejected: "Rejected",
  converted: "Converted",
  failed: "Failed",
};

export default async function AdminStrataIntakePage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const intakes = await prisma.strataIntake.findMany({
    orderBy: { received_at: "desc" },
    take: 500,
    include: { _count: { select: { files: true } } },
  });

  const open = intakes.filter((i) => ["received", "extracting", "needs_review"].includes(i.status)).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Strata Connect — Work Orders</h1>
        <p className="mt-1 text-sm text-slate-500">
          {intakes.length} total · {open} awaiting review · forwarded to{" "}
          <span className="font-medium text-slate-700">{STRATA_INTAKE_EMAIL}</span>
        </p>
      </div>

      {intakes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            No work orders yet. Forwarded emails to{" "}
            <span className="font-medium text-slate-700">{STRATA_INTAKE_EMAIL}</span> will appear here for review.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-4 py-3 font-semibold text-slate-700">From</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Subject</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Property / Category</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Files</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Received</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {intakes.map((i) => (
                <tr key={i.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{i.from_name ?? i.from_email}</div>
                    {i.from_name && <div className="text-xs text-slate-400">{i.from_email}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{i.subject ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{i.building_address ?? (i.suburb ? `${i.suburb} ${i.postcode ?? ""}` : "—")}</div>
                    {i.matched_category_name && (
                      <div className="text-xs text-slate-400">{i.matched_category_name}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{i._count.files}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CLS[i.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {STATUS_LABEL[i.status] ?? i.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {new Date(i.received_at).toLocaleString("en-AU", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/directory/admin/strata-intake/${i.id}`} className="text-sm font-semibold text-sky-700 hover:underline">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
