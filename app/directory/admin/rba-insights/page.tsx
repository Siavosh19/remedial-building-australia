import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function statusBadge(status: string) {
  const cls =
    status === "published" ? "bg-emerald-100 text-emerald-800" :
    status === "archived" ? "bg-slate-100 text-slate-500" :
    "bg-amber-100 text-amber-800";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{status}</span>;
}

export default async function RbaInsightsAdminPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const articles = await prisma.rbaInsightsArticle.findMany({
    orderBy: [{ created_at: "desc" }],
    select: {
      id: true,
      title: true,
      category: true,
      status: true,
      published_date: true,
      updated_at: true,
      is_featured: true,
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">RBA Insights</h1>
          <p className="text-sm text-slate-500 mt-1">{articles.length} article{articles.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/directory/admin/rba-insights/new"
          className="rounded-xl bg-sky-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 transition"
        >
          + New Article
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Featured</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Published</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Updated</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="px-4 py-3 font-medium text-slate-900 max-w-xs">
                  <span className="line-clamp-2">{a.title}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{a.category}</td>
                <td className="px-4 py-3">{statusBadge(a.status)}</td>
                <td className="px-4 py-3 text-slate-500">
                  {a.is_featured ? <span className="text-amber-600 font-semibold">★ Featured</span> : "—"}
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">
                  {a.published_date ? a.published_date.toLocaleDateString("en-AU") : "—"}
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">
                  {a.updated_at.toLocaleDateString("en-AU")}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/directory/admin/rba-insights/${a.id}`}
                    className="font-semibold text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {!articles.length && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                  No articles yet.{" "}
                  <Link href="/directory/admin/rba-insights/new" className="font-semibold text-sky-700 hover:underline">
                    Create the first one →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
