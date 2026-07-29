"use client";

import { useRef, useState } from "react";
import { Upload, FileText, Image as ImageIcon, Trash2, Loader2, AlertTriangle, ChevronDown, ChevronRight, PencilRuler } from "lucide-react";
import PlanTakeoffLoader from "./PlanTakeoffLoader";

type Drawing = { id: string; filename: string; mime_type: string | null; file_size: number; page_count: number; created_at: string };
type PlanPage = { id: string; page_number: number; pixels_per_metre: number | null; scale_status: string };
type PlanDetail = { id: string; filename: string; mime_type: string | null; url: string | null; page_count: number; pages: PlanPage[] };

const isPdf = (d: { mime_type: string | null; filename: string }) => (d.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(d.filename);
const fmtSize = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export default function PlansWorkspace({ projectId, initialDrawings }: { projectId: string; initialDrawings: Drawing[] }) {
  const [drawings, setDrawings] = useState<Drawing[]>(initialDrawings);
  const [openId, setOpenId] = useState<string | null>(null);
  const [detail, setDetail] = useState<PlanDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const base = `/api/measuremap/projects/${projectId}`;

  async function openDrawing(d: Drawing) {
    setOpenId(d.id);
    setDetail(null); setSelectedPageId(null);
    setLoadingDetail(true);
    try {
      // The server detects page count (and self-heals older uploads) and returns all pages.
      const data = (await (await fetch(`${base}/drawings/${d.id}`)).json()).drawing as PlanDetail | undefined;
      if (data && data.page_count !== d.page_count) setDrawings((prev) => prev.map((x) => x.id === d.id ? { ...x, page_count: data.page_count } : x));
      setDetail(data ?? null);
      setSelectedPageId(data?.pages[0]?.id ?? null);
    } catch { setDetail(null); } finally { setLoadingDetail(false); }
  }

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setError(null); setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData(); form.append("file", file);
        const res = await fetch(`${base}/drawings`, { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) { setError(data.error || "Upload failed"); continue; }
        setDrawings((prev) => [data.drawing, ...prev]);
        void openDrawing(data.drawing);
      }
    } catch { setError("Upload failed"); } finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  async function remove(d: Drawing) {
    if (!confirm(`Delete “${d.filename}”?`)) return;
    setDrawings((prev) => prev.filter((x) => x.id !== d.id));
    if (openId === d.id) { setOpenId(null); setDetail(null); setSelectedPageId(null); }
    try { await fetch(`${base}/drawings/${d.id}`, { method: "DELETE" }); } catch { /* ignore */ }
  }

  const selectedPage = detail?.pages.find((p) => p.id === selectedPageId) ?? null;

  return (
    <div className="flex h-full">
      {/* Plans + pages list */}
      <aside className="flex w-[260px] shrink-0 flex-col border-r border-[#D7DCE0] bg-white">
        <div className="border-b border-[#E2E5E7] p-4">
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex h-9 w-full items-center justify-center gap-2 rounded bg-[#0369a1] text-[13px] font-semibold text-white transition hover:bg-[#075985] disabled:opacity-60">
            {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</> : <><Upload size={16} /> Upload Plans</>}
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          <p className="mt-2 text-center text-[10px] text-[#8A9196]">PDF, PNG, JPG or WEBP · up to 40 MB</p>
          {error && <p className="mt-2 flex items-center gap-1 text-[11px] text-[#dc2626]"><AlertTriangle size={12} /> {error}</p>}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {drawings.length === 0 && <p className="px-2 py-8 text-center text-[12px] text-[#8A9196]">No plans yet. Upload a PDF or image to get started.</p>}
          {drawings.map((d) => {
            const open = openId === d.id;
            return (
              <div key={d.id} className="mb-1">
                <div className={["group flex items-center gap-2 rounded px-2 py-2 transition", open ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]"].join(" ")}>
                  <button onClick={() => openDrawing(d)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                    {d.page_count > 1 ? (open ? <ChevronDown size={14} className="shrink-0 text-[#8A9196]" /> : <ChevronRight size={14} className="shrink-0 text-[#8A9196]" />) : <span className="w-[14px] shrink-0" />}
                    {isPdf(d) ? <FileText size={16} className="shrink-0 text-[#0369a1]" /> : <ImageIcon size={16} className="shrink-0 text-[#0369a1]" />}
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-medium text-[#30363A]">{d.filename}</span>
                      <span className="block text-[10px] text-[#8A9196]">{fmtSize(d.file_size)}{d.page_count > 1 ? ` · ${d.page_count} pages` : ""}</span>
                    </span>
                  </button>
                  <button onClick={() => remove(d)} className="grid h-6 w-6 shrink-0 place-items-center rounded text-[#8A9196] opacity-0 transition hover:bg-[#FEF2F2] hover:text-[#dc2626] group-hover:opacity-100"><Trash2 size={13} /></button>
                </div>
                {/* Page list */}
                {open && detail && detail.id === d.id && detail.pages.length > 1 && (
                  <div className="ml-6 mt-0.5 border-l border-[#EAECEE] pl-1">
                    {detail.pages.map((p) => (
                      <button key={p.id} onClick={() => setSelectedPageId(p.id)}
                        className={["flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-[12px]", selectedPageId === p.id ? "bg-[#EAF3FA] font-semibold text-[#0c4a6e]" : "text-[#586066] hover:bg-[#F5F6F7]"].join(" ")}>
                        {p.scale_status === "scaled" && <PencilRuler size={11} className="shrink-0 text-[#0f7a4d]" />}
                        Page {p.page_number}
                        {p.scale_status === "scaled" && <span className="ml-auto text-[9px] font-semibold text-[#0f7a4d]">SCALED</span>}
                      </button>
                    ))}
                  </div>
                )}
                {open && loadingDetail && detail?.id !== d.id && <div className="ml-8 py-1 text-[11px] text-[#8A9196]">Reading pages…</div>}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Viewer / takeoff */}
      <section className="min-w-0 flex-1">
        {!openId && (
          <div className="flex h-full items-center justify-center bg-[#565b5e] text-center text-white/80">
            <div><FileText className="mx-auto h-10 w-10 text-white/40" /><p className="mt-3 text-[14px] font-semibold">No plan selected</p><p className="mt-1 text-[12px] text-white/60">Upload a plan, then select it to set a scale and measure.</p></div>
          </div>
        )}
        {openId && (loadingDetail || !detail) && <div className="flex h-full items-center justify-center bg-[#565b5e] text-white/80"><Loader2 className="h-5 w-5 animate-spin" /></div>}
        {openId && detail && selectedPage && (
          <PlanTakeoffLoader key={selectedPage.id} projectId={projectId} drawing={{ id: detail.id, filename: detail.filename, mime_type: detail.mime_type, url: detail.url }} page={selectedPage} />
        )}
      </section>
    </div>
  );
}
