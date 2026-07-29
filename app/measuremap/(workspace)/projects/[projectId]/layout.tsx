import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronDown, Download } from "lucide-react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import WorkspaceTabs from "@/components/measuremap/WorkspaceTabs";

// Shared chrome for a single project's workspace (Overview / Map / Drawings /
// Export). Loads + ownership-checks the project once for all tabs.
//
// Layout: 84px project header + 48px tab bar in the MapMeasure design system
// (sky-blue primary #0369a1, white surfaces, red destructive).
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
  const isActive = project.status !== "archived";

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col">
      {/* Project header (compact — reclaims vertical space for the workspace) */}
      <section className="flex h-[60px] items-center border-b border-[#D8DDE1] bg-white px-5">
        <Link
          href="/measuremap"
          className="mr-3 grid h-8 w-8 shrink-0 place-items-center rounded text-[#30363A] hover:bg-[#F0F2F3]"
          aria-label="Back to projects"
        >
          <ChevronLeft size={22} />
        </Link>

        <div className="min-w-0">
          <h1 className="truncate text-[19px] font-bold leading-6 text-[#212121]">{title}</h1>
          {project.project_name && (
            <p className="truncate text-[12px] text-[#5D6469]">{project.full_address}</p>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6C7378]">Status</span>
            <span
              className={[
                "flex h-8 items-center rounded border px-3 text-[13px] font-semibold",
                isActive
                  ? "border-[#0369a1] bg-[#F0F7FC] text-[#0369a1]"
                  : "border-[#D7DCE0] bg-[#F5F6F7] text-[#6C7378]",
              ].join(" ")}
            >
              {isActive ? "Active" : "Archived"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6C7378]">Ref</span>
            <span className="flex h-8 min-w-[90px] items-center rounded border border-[#D7DCE0] bg-white px-3 text-[13px] text-[#212121]">
              {project.project_reference || "—"}
            </span>
          </div>

          <Link
            href={`/measuremap/projects/${projectId}/export`}
            className="flex h-8 items-center gap-2 rounded bg-[#0369a1] px-4 text-[13px] font-semibold text-white transition hover:bg-[#075985]"
          >
            <Download size={15} />
            Export
          </Link>

          <button className="flex h-8 items-center justify-between gap-2 rounded border border-[#D7DCE0] bg-white px-3 text-[13px] font-semibold text-[#30363A]">
            Project Actions
            <ChevronDown size={14} />
          </button>
        </div>
      </section>

      <WorkspaceTabs projectId={projectId} />

      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
