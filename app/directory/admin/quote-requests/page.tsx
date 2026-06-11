import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminQuoteRequestsPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { created_at: "desc" },
    take: 500,
    include: {
      company: { select: { id: true, name: true, slug: true } },
    },
  });

  const STATUS_CLS: Record<string, string> = {
    new: "bg-sky-100 text-sky-800",
    viewed: "bg-slate-100 text-slate-700",
    responded: "bg-blue-100 text-blue-800",
    not_suitable: "bg-amber-100 text-amber-800",
    won: "bg-emerald-100 text-emerald-800",
    lost: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Quote Requests</h1>
        <p className="text-sm text-slate-500 mt-1">{quotes.length} total</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Business</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">From</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Suburb</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{q.company.name}</div>
                  <a href={`/directory/company/${q.company.slug}`} className="text-xs text-sky-600 hover:underline" target="_blank">View listing ↗</a>
                </td>
                <td className="px-4 py-3">
                  <div className="text-slate-700">{q.requester_name}</div>
                  <div className="text-xs text-slate-400">{q.requester_email}</div>
                  {q.requester_phone && <div className="text-xs text-slate-400">{q.requester_phone}</div>}
                </td>
                <td className="px-4 py-3 text-slate-600">{q.project_category ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{q.building_suburb ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CLS[q.status] ?? "bg-slate-100 text-slate-600"}`}>
                    {q.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {new Date(q.created_at).toLocaleDateString("en-AU")}
                </td>
              </tr>
            ))}
            {!quotes.length && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No quote requests yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
