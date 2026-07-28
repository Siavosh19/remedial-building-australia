import Link from "next/link";
import { Plus } from "lucide-react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { listProjects } from "@/lib/measuremap/projects";
import SearchBar from "@/components/measuremap/SearchBar";
import ProjectCard from "@/components/measuremap/ProjectCard";

// MeasureMap dashboard — separate from every existing RBA dashboard.
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
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Aerial &amp; drawing quantity takeoff</p>
        </div>
        <Link
          href="/measuremap/projects/new"
          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Plus className="h-4 w-4" /> New Project
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <SearchBar />
        <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white p-0.5 text-xs font-semibold">
          <Link
            href="/measuremap"
            className={`rounded px-3 py-1.5 transition ${!includeArchived ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"}`}
          >
            Active
          </Link>
          <Link
            href="/measuremap?view=all"
            className={`rounded px-3 py-1.5 transition ${includeArchived ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"}`}
          >
            All
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white/50 p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">
            {q ? "No projects match your search." : "No projects yet."}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {q ? "Try a different address or suburb." : "Create your first project from a physical address to start measuring."}
          </p>
          {!q && (
            <Link
              href="/measuremap/projects/new"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Plus className="h-4 w-4" /> New Project
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </main>
  );
}
