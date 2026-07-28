import Link from "next/link";
import { Plus, Ruler, Lock, MapPin, FileText } from "lucide-react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { listProjects } from "@/lib/measuremap/projects";
import SearchBar from "@/components/measuremap/SearchBar";
import ProjectRowActions from "@/components/measuremap/ProjectRowActions";

function timeAgo(d: Date): string {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

export default async function MeasureMapDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; view?: string }>;
}) {
  const user = await requireMeasureMapUser();
  const { q, view } = await searchParams;
  const includeArchived = view === "all";
  const projects = await listProjects(user.id, { search: q, includeArchived });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-sky-950">Projects</h1>
          <p className="text-sm text-slate-500">{projects.length} project{projects.length === 1 ? "" : "s"}</p>
        </div>
        <Link
          href="/measuremap/projects/new"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> New Project
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <SearchBar />
        <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white p-0.5 text-xs font-semibold">
          <Link href="/measuremap" className={`rounded px-3 py-1.5 transition ${!includeArchived ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-800"}`}>Active</Link>
          <Link href="/measuremap?view=all" className={`rounded px-3 py-1.5 transition ${includeArchived ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-800"}`}>All</Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white/50 p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">{q ? "No projects match your search." : "No projects yet."}</p>
          <p className="mt-1 text-sm text-slate-500">{q ? "Try a different address or suburb." : "Create your first project from a physical address to start measuring."}</p>
          {!q && (
            <Link href="/measuremap/projects/new" className="mt-5 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              <Plus className="h-4 w-4" /> New Project
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-semibold">Project name</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Takeoff</th>
                <th className="px-4 py-3 font-semibold">Updated</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const title = p.project_name || p.full_address;
                return (
                  <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Lock className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                        <div className="min-w-0">
                          <Link href={`/measuremap/projects/${p.id}/overview`} className="block truncate font-semibold text-sky-950 hover:text-blue-600">
                            {title}
                          </Link>
                          {p.project_name && <p className="truncate text-xs text-slate-400">{p.full_address}</p>}
                        </div>
                        <Link
                          href={`/measuremap/projects/${p.id}/map`}
                          title="Open Map Measure"
                          className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 text-blue-600 transition hover:bg-blue-50"
                        >
                          <Ruler className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${p.status === "archived" ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-blue-700"}`}>
                        {p.status === "archived" ? "Archived" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {[p.suburb, p.postcode].filter(Boolean).join(" ") || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5" />{p.drawing_count}</span>
                        <span className="inline-flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{p.takeoff_count}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{timeAgo(p.updated_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end">
                        <ProjectRowActions projectId={p.id} status={p.status} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
