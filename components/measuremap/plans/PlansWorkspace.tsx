"use client";

import { useRef, useState } from "react";
import { Upload, FileText, Image as ImageIcon, Trash2, Loader2, AlertTriangle } from "lucide-react";
import PlanTakeoffLoader from "./PlanTakeoffLoader";

type Drawing = { id: string; filename: string; mime_type: string | null; file_size: number; page_count: number; created_at: string };
type PlanDetail = { id: string; filename: string; mime_type: string | null; url: string | null; page: { id: string; pixels_per_metre: number | null; scale_status: string } | null };

const isPdf = (d: { mime_type: string | null; filename: string }) => (d.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(d.filename);
const fmtSize = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export default function PlansWorkspace({ projectId, initialDrawings }: { projectId: string; initialDrawings: Drawing[] }) {
  const [drawings, setDrawings] = useState<Drawing[]>(initialDrawings);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<PlanDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const base = `/api/measuremap/projects/${projectId}`;

  async function openDrawing(d: Drawing) {
    setSelectedId(d.id);
    setDetail(null);
    setLoadingDetail(true);
    try {
      const res = await fetch(`${base}/drawings/${d.id}`);
      const data = await res.json();
      setDetail(data.drawing ?? null);
    } catch { setDetail(null); } finally { setLoadingDetail(false); }
  }

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch(`${base}/drawings`, { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) { setError(data.error || "Upload failed"); continue; }
        setDrawings((prev) => [data.drawing, ...prev]);
        void openDrawing(data.drawing);
      }
    } catch { setError("Upload failed"); } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function remove(d: Drawing) {
    if (!confirm(`Delete “${d.filename}”?`)) return;
    setDrawings((prev) => prev.filter((x) => x.id !== d.id));
    if (selectedId === d.id) { setSelectedId(null); setDetail(null); }
    try { await fetch(`${base}/drawings/${d.id}`, { method: "DELETE" }); } catch { /* ignore */ }
  }

  return (
    <div className="flex h-full">
      {/* Plans list + upload */}
      <aside className="flex w-[260px] shrink-0 flex-col border-r border-[#D7DCE0] bg-white">
        <div className="border-b border-[#E2E5E7] p-4">
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex h-9 w-full items-center justify-center gap-2 rounded bg-[#0369a1] text-[13px] font-semibold text-white transition hover:bg-[#075985] disabled:opacity-60">
            {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</> : <><Upload size={16} /> Upload Plans</>}
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          <p className="mt-2 text-center text-[10px] text-[#8A9196]">PDF, PNG, JPG or WEBP · up to 40 MB</p>
          {error && <p className="mt-2 flex items-center gap-1 text-[11px] text-[#dc2626]"><AlertTriangle size={12} /> {error}</p>}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {drawings.length === 0 && <p className="px-2 py-8 text-center text-[12px] text-[#8A9196]">No plans yet. Upload a PDF or image to get started.</p>}
          {drawings.map((d) => (
            <div key={d.id} className={["group mb-1 flex items-center gap-2 rounded px-2 py-2 transition", selectedId === d.id ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]"].join(" ")}>
              <button onClick={() => openDrawing(d)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                {isPdf(d) ? <FileText size={16} className="shrink-0 text-[#0369a1]" /> : <ImageIcon size={16} className="shrink-0 text-[#0369a1]" />}
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-medium text-[#30363A]">{d.filename}</span>
                  <span className="block text-[10px] text-[#8A9196]">{fmtSize(d.file_size)}</span>
                </span>
              </button>
              <button onClick={() => remove(d)} className="grid h-6 w-6 shrink-0 place-items-center rounded text-[#8A9196] opacity-0 transition hover:bg-[#FEF2F2] hover:text-[#dc2626] group-hover:opacity-100"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      </aside>

      {/* Viewer / takeoff */}
      <section className="min-w-0 flex-1">
        {!selectedId && (
          <div className="flex h-full items-center justify-center bg-[#0c2b3f] text-center text-white/70">
            <div>
              <FileText className="mx-auto h-10 w-10 text-white/30" />
              <p className="mt-3 text-[14px] font-semibold">No plan selected</p>
              <p className="mt-1 text-[12px] text-white/50">Upload a plan on the left, then select it to set a scale and measure.</p>
            </div>
          </div>
        )}
        {selectedId && loadingDetail && (
          <div className="flex h-full items-center justify-center bg-[#0c2b3f] text-white/70"><Loader2 className="h-5 w-5 animate-spin" /></div>
        )}
        {selectedId && !loadingDetail && detail && (
          <PlanTakeoffLoader key={detail.id} projectId={projectId} plan={detail} />
        )}
        {selectedId && !loadingDetail && !detail && (
          <div className="flex h-full items-center justify-center bg-[#0c2b3f] text-white/60"><span className="text-[12px]">Couldn&apos;t load this plan — try re-selecting it.</span></div>
        )}
      </section>
    </div>
  );
}
