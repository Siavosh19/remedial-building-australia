import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import WorkspaceTabs from "@/components/measuremap/WorkspaceTabs";
import StreetViewButton from "@/components/measuremap/StreetViewButton";

// Shared chrome for a single project's workspace (Map / Drawings / Export).
// Loads + ownership-checks the project once for all tabs.
export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const user = await requireMeasureMapUser();
  const { projectId } = await params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) notFound();

  const title = project.project_name || project.full_address;

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/measuremap" className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Back to dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{title}</p>
            <p className="truncate text-xs text-slate-500">{project.full_address}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StreetViewButton
            latitude={project.latitude}
            longitude={project.longitude}
            address={project.full_address}
          />
          <Link
            href={`/measuremap/projects/${projectId}/export`}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Export
          </Link>
        </div>
      </div>

      <WorkspaceTabs projectId={projectId} />

      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
