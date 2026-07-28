import Link from "next/link";
import { FileText, Ruler, MapPin, Clock } from "lucide-react";
import { nswImageryThumbUrl } from "@/lib/measuremap/imagery";
import type { ProjectListItem } from "@/lib/measuremap/projects";
import ProjectRowActions from "./ProjectRowActions";

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

export default function ProjectCard({ project }: { project: ProjectListItem }) {
  const thumb = nswImageryThumbUrl(project.latitude, project.longitude);
  const title = project.project_name || project.full_address;

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm">
      <Link href={`/measuremap/projects/${project.id}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <MapPin className="h-8 w-8" />
          </div>
        )}
        {project.status === "archived" && (
          <span className="absolute left-2 top-2 rounded bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Archived
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/measuremap/projects/${project.id}`} className="block truncate text-sm font-semibold text-sky-950 hover:text-blue-600">
              {title}
            </Link>
            {project.project_name && (
              <p className="truncate text-xs text-slate-500">{project.full_address}</p>
            )}
            <p className="mt-0.5 truncate text-xs text-slate-400">
              {[project.suburb, project.postcode].filter(Boolean).join(" ")}
            </p>
          </div>
          <ProjectRowActions projectId={project.id} status={project.status} />
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5" />{project.drawing_count}</span>
          <span className="inline-flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{project.takeoff_count}</span>
          <span className="ml-auto inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{timeAgo(project.updated_at)}</span>
        </div>

        <Link
          href={`/measuremap/projects/${project.id}`}
          className="mt-3 block rounded-md bg-blue-600 px-3 py-1.5 text-center text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          Open project
        </Link>
      </div>
    </div>
  );
}
