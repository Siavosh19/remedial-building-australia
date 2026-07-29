import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Home, MapPin, FileText, Calculator, BarChart3, Folder, Pencil, Map as MapIcon, ChevronRight,
} from "lucide-react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { listItems, listCategories } from "@/lib/measuremap/estimating";
import { nswImageryThumbUrl, NSW_ATTRIBUTION } from "@/lib/measuremap/imagery";
import StreetViewButton from "@/components/measuremap/StreetViewButton";

function fmtDate(d: Date | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export default async function OverviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const user = await requireMeasureMapUser();
  const { projectId } = await params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) notFound();

  const [items, categories] = await Promise.all([
    listItems(user.id, projectId),
    listCategories(user.id, projectId),
  ]);
  const measurementCount = items.reduce((s, it) => s + it.measurements.length, 0);
  const thumb = nswImageryThumbUrl(project.latitude, project.longitude, 720, 460);
  const base = `/measuremap/projects/${projectId}`;
  const isActive = project.status !== "archived";
  const location = [project.suburb, project.state, project.postcode].filter(Boolean).join(" ") || "—";

  return (
    <div className="flex min-h-full gap-4 p-4">
      {/* ── Left project nav sidebar ─────────────────────────────────────── */}
      <aside className="hidden w-[176px] shrink-0 lg:block">
        <nav className="space-y-1">
          <SideLink href={`${base}/overview`} label="Overview" Icon={Home} active />
          <SideLink href={`${base}/map`} label="Map Measure" Icon={MapPin} />
          <SideLink href={`${base}/drawings`} label="Plans & Takeoffs" Icon={FileText} />
          <SideLink href={`${base}/estimate`} label="Estimate" Icon={Calculator} />
          <SideItem label="Reports" Icon={BarChart3} />
          <SideItem label="Files & Notes" Icon={Folder} />
        </nav>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Project Information */}
        <section className="rounded-lg border border-[#DDE1E4] bg-white">
          <header className="flex items-center justify-between border-b border-[#EEF0F1] px-5 py-3.5">
            <h2 className="text-[15px] font-bold text-[#0c2b3f]">Project Information</h2>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#CCD2D6] px-3 py-1.5 text-[12px] font-medium text-[#586066]">
              <Pencil size={13} /> Edit
            </span>
          </header>
          <div className="px-5 py-4">
            <dl className="divide-y divide-[#F1F3F4]">
              <Row label="Project Name" value={project.project_name || "—"} />
              <Row label="Client" value="—" />
              <Row label="Address" value={project.full_address} />
              <Row label="Location" value={location} />
              <Row label="Assigned Estimator" value="—" />
              <Row label="Project Reference" value={project.project_reference || "—"} />
              <Row label="Status" value={
                <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${isActive ? "bg-[#EAF3FA] text-[#0369a1]" : "bg-[#F0F2F3] text-[#6C7378]"}`}>
                  {isActive ? "Active" : "Archived"}
                </span>
              } />
              <Row label="Created" value={fmtDate(project.created_at)} />
              <Row label="Last Updated" value={fmtDate(project.updated_at)} />
              <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-3 py-2.5">
                <dt className="text-[12px] text-[#5E656A]">Description</dt>
                <dd className="text-[12px] leading-[18px] text-[#30363A]">
                  {project.notes || <span className="text-[#9AA0A5]">No description yet.</span>}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Right column: Map + Estimate Summary */}
        <div className="flex flex-col gap-4">
          {/* Project Map */}
          <section className="rounded-lg border border-[#DDE1E4] bg-white">
            <header className="border-b border-[#EEF0F1] px-5 py-3.5">
              <h2 className="text-[15px] font-bold text-[#0c2b3f]">Project Map</h2>
            </header>
            <div className="p-4">
              <div className="relative overflow-hidden rounded-md border border-[#D5DADD]">
                <div className="relative aspect-[16/10] bg-[#E6EBF0]">
                  {thumb && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="Aerial preview" className="h-full w-full object-cover" />
                  )}
                  <span className="absolute bottom-1 right-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-white">{NSW_ATTRIBUTION}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Link href={`${base}/map`} className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#0369a1] px-3 py-2 text-[12px] font-semibold text-white transition hover:bg-[#075985]">
                  <MapIcon size={15} /> Map Measure
                </Link>
                <StreetViewButton latitude={project.latitude} longitude={project.longitude} address={project.full_address} />
              </div>
              {project.latitude != null && project.longitude != null && (
                <p className="mt-2 flex items-center gap-1 text-[11px] text-[#8A9196]"><MapPin size={12} />{project.latitude.toFixed(6)}, {project.longitude.toFixed(6)}</p>
              )}
            </div>
          </section>

          {/* Estimate Summary (starter — fills in once the Estimate is built) */}
          <section className="rounded-lg border border-[#DDE1E4] bg-white">
            <header className="flex items-center justify-between border-b border-[#EEF0F1] px-5 py-3.5">
              <h2 className="text-[15px] font-bold text-[#0c2b3f]">Estimate Summary</h2>
              <span className="text-[12px] font-semibold text-[#9AA0A5]">View Estimate</span>
            </header>
            <div className="p-4">
              <div className="mb-3 flex items-center gap-2 text-[11px]">
                <span className="rounded bg-[#EEF0F2] px-2 py-1 font-medium text-[#586066]">Rev 1 (Draft)</span>
                <span className="rounded bg-[#EEF0F2] px-2 py-1 font-medium text-[#586066]">Draft</span>
              </div>
              <div className="space-y-2.5 border-y border-[#EEF0F1] py-3 text-[12px]">
                <SummaryRow label="Base Cost" value="$0" />
                <SummaryRow label="Gross Profit" value="$0" />
                <SummaryRow label="Gross Margin" value="0%" />
                <SummaryRow label="Selling Price" value="$0" strong />
              </div>
              <p className="mt-3 rounded-md bg-[#F7F9FB] px-3 py-2 text-[11px] leading-tight text-[#8A9196]">
                Estimate not started — costs appear once you add rates on the Estimate page.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat value={categories.length} label="Categories" />
                <Stat value={items.length} label="Items" />
                <Stat value={measurementCount} label="Measures" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SideLink({ href, label, Icon, active = false }: { href: string; label: string; Icon: typeof Home; active?: boolean }) {
  return (
    <Link
      href={href}
      className={[
        "flex h-10 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition",
        active ? "bg-[#EAF3FA] text-[#0369a1]" : "text-[#353B3F] hover:bg-[#F2F4F5]",
      ].join(" ")}
    >
      <Icon size={17} strokeWidth={1.9} /> {label}
    </Link>
  );
}

function SideItem({ label, Icon }: { label: string; Icon: typeof Home }) {
  return (
    <div className="flex h-10 cursor-default items-center gap-3 rounded-md px-3 text-[13px] font-medium text-[#AAB0B4]" title="Coming soon">
      <Icon size={17} strokeWidth={1.9} /> {label}
      <ChevronRight size={13} className="ml-auto opacity-0" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-3 py-2.5">
      <dt className="text-[12px] text-[#5E656A]">{label}</dt>
      <dd className="min-w-0 text-[12px] font-medium text-[#30363A]">{value}</dd>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#4D5459]">{label}</span>
      <span className={strong ? "text-[15px] font-bold text-[#0c2b3f]" : "font-semibold text-[#2D3337]"}>{value}</span>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md bg-[#F7F9FB] py-3">
      <p className="text-[18px] font-bold text-[#0c2b3f]">{value}</p>
      <p className="text-[11px] text-[#586066]">{label}</p>
    </div>
  );
}
