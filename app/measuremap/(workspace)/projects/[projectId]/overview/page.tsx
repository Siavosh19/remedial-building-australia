import Link from "next/link";
import { notFound } from "next/navigation";
import { Map as MapIcon, FileText, StickyNote, MapPin, Ruler } from "lucide-react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { getTakeoffs } from "@/lib/measuremap/takeoffs";
import { nswImageryThumbUrl } from "@/lib/measuremap/imagery";
import StreetViewButton from "@/components/measuremap/StreetViewButton";

function fmtDate(d: Date | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-bold text-sky-950">{title}</h2>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="shrink-0 text-slate-500">{label}</span>
      <span className="min-w-0 text-right font-medium text-sky-950">{value}</span>
    </div>
  );
}

export default async function OverviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const user = await requireMeasureMapUser();
  const { projectId } = await params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) notFound();
  const takeoffs = await getTakeoffs(user.id, projectId, "map");
  const measurementCount = takeoffs.reduce((s, t) => s + t.measurements.length, 0);

  const thumb = nswImageryThumbUrl(project.latitude, project.longitude, 800, 450);
  const base = `/measuremap/projects/${projectId}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-5 lg:col-span-2">
          <Card
            title="Project details"
            action={
              <Link href={`${base}/map`} className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700">
                <MapIcon className="h-3.5 w-3.5" /> Open Map Measure
              </Link>
            }
          >
            <Row label="Address" value={project.full_address} />
            <Row label="Suburb / State" value={[project.suburb, project.state, project.postcode].filter(Boolean).join(" ") || "—"} />
            <Row label="Reference" value={project.project_reference || "—"} />
            <Row label="Status" value={<span className={`rounded px-2 py-0.5 text-xs font-semibold ${project.status === "archived" ? "bg-slate-100 text-slate-500" : "bg-blue-50 text-blue-700"}`}>{project.status === "archived" ? "Archived" : "Active"}</span>} />
            <Row label="Created" value={fmtDate(project.created_at)} />
            <Row label="Updated" value={fmtDate(project.updated_at)} />
          </Card>

          <Card title="Notes">
            {project.notes ? (
              <p className="whitespace-pre-wrap text-sm text-slate-700">{project.notes}</p>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <StickyNote className="h-7 w-7 text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">No notes yet.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Side column */}
        <div className="space-y-5">
          <Card title="Location">
            <div className="overflow-hidden rounded-md border border-slate-200">
              <div className="relative aspect-[16/9] bg-slate-100">
                {thumb && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thumb} alt="Aerial preview" className="h-full w-full object-cover" />
                )}
                <span className="absolute bottom-1 right-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-white">© NSW Spatial Services</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Link href={`${base}/map`} className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                <MapIcon className="h-3.5 w-3.5" /> Map Measure
              </Link>
              <StreetViewButton latitude={project.latitude} longitude={project.longitude} address={project.full_address} />
            </div>
            {project.latitude != null && project.longitude != null && (
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-400"><MapPin className="h-3 w-3" />{project.latitude.toFixed(6)}, {project.longitude.toFixed(6)}</p>
            )}
          </Card>

          <Card title="Takeoff summary">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md bg-slate-50 py-3">
                <p className="text-lg font-bold text-sky-950">0</p>
                <p className="text-[11px] text-slate-500">Drawings</p>
              </div>
              <div className="rounded-md bg-slate-50 py-3">
                <p className="text-lg font-bold text-sky-950">{takeoffs.length}</p>
                <p className="text-[11px] text-slate-500">Items</p>
              </div>
              <div className="rounded-md bg-slate-50 py-3">
                <p className="text-lg font-bold text-sky-950">{measurementCount}</p>
                <p className="text-[11px] text-slate-500">Measures</p>
              </div>
            </div>
          </Card>

          <Card title="Files">
            <div className="flex flex-col items-center py-4 text-center">
              <FileText className="h-7 w-7 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">Plan &amp; document upload</p>
              <p className="text-xs text-slate-400">Arriving with Plans &amp; Takeoffs</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
