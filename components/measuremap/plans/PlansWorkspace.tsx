"use client";

import { useMemo, useRef, useState } from "react";
import { Upload, FileText, Image as ImageIcon, Trash2, Loader2, AlertTriangle, ChevronDown, ChevronRight, PencilRuler, Search, ArrowDownUp, Filter, MoreVertical, Pencil } from "lucide-react";
import PlanTakeoffLoader from "./PlanTakeoffLoader";

type Drawing = { id: string; filename: string; mime_type: string | null; file_size: number; page_count: number; created_at: string };
type PlanPage = { id: string; page_number: number; pixels_per_metre: number | null; scale_status: string; name: string };
type PlanDetail = { id: string; filename: string; mime_type: string | null; url: string | null; page_count: number; pages: PlanPage[] };

const isPdf = (d: { mime_type: string | null; filename: string }) => (d.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(d.filename);
const fmtSize = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const ratioOf = (ppm: number | null) => (ppm && ppm > 0 ? `1:${Math.round(5669.29 / ppm)}` : null);

export default function PlansWorkspace({ projectId, initialDrawings }: { projectId: string; initialDrawings: Drawing[] }) {
  const [drawings, setDrawings] = useState<Drawing[]>(initialDrawings);
  const [openId, setOpenId] = useState<string | null>(null);
  const [detail, setDetail] = useState<PlanDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterScaled, setFilterScaled] = useState<"all" | "scaled" | "unscaled">("all");
  const [pageMenu, setPageMenu] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const base = `/api/measuremap/projects/${projectId}`;

  async function openDrawing(d: Drawing) {
    setOpenId(d.id); setDetail(null); setSelectedPageId(null); setLoadingDetail(true);
    try {
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

  async function removeDrawing(d: Drawing) {
    if (!confirm(`Delete “${d.filename}”?`)) return;
    setDrawings((prev) => prev.filter((x) => x.id !== d.id));
    if (openId === d.id) { setOpenId(null); setDetail(null); setSelectedPageId(null); }
    try { await fetch(`${base}/drawings/${d.id}`, { method: "DELETE" }); } catch { /* ignore */ }
  }

  async function renamePage(p: PlanPage) {
    setPageMenu(null);
    const name = window.prompt("Rename page:", p.name);
    if (name == null || !name.trim()) return;
    setDetail((d) => d ? { ...d, pages: d.pages.map((x) => x.id === p.id ? { ...x, name: name.trim() } : x) } : d);
    try { await fetch(`${base}/drawings/${openId}/pages`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page_id: p.id, name: name.trim() }) }); } catch { /* ignore */ }
  }

  async function clearPage(p: PlanPage) {
    setPageMenu(null);
    if (!confirm(`Delete all takeoffs on “${p.name}”? (The page itself stays.)`)) return;
    try { await fetch(`${base}/drawings/${openId}/takeoffs?pageId=${p.id}`, { method: "DELETE" }); } catch { /* ignore */ }
    if (selectedPageId === p.id) { const cur = p.id; setSelectedPageId(null); setTimeout(() => setSelectedPageId(cur), 0); } // remount to refresh
  }

  const selectedPage = detail?.pages.find((p) => p.id === selectedPageId) ?? null;

  const visiblePages = useMemo(() => {
    if (!detail) return [];
    let ps = detail.pages;
    const q = search.trim().toLowerCase();
    if (q) ps = ps.filter((p) => p.name.toLowerCase().includes(q));
    if (filterScaled !== "all") ps = ps.filter((p) => filterScaled === "scaled" ? p.scale_status === "scaled" : p.scale_status !== "scaled");
    ps = [...ps].sort((a, b) => sortAsc ? a.page_number - b.page_number : b.page_number - a.page_number);
    return ps;
  }, [detail, search, filterScaled, sortAsc]);

  return (
    <div className="flex h-full gap-3 bg-[#e5e7eb] p-3" onClick={() => setPageMenu(null)}>
      {/* Plans + pages list */}
      <aside className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border border-[#D7DCE0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.10)]" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-[#E2E5E7] p-3">
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0369a1] text-[15px] font-bold text-white transition hover:bg-[#075985] disabled:opacity-60">
            {uploading ? <><Loader2 className="h-5 w-5 animate-spin" /> Uploading…</> : <><Upload size={18} /> Upload Plans</>}
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          <p className="mt-2 text-center text-[12px] text-[#8A9196]">PDF, PNG, JPG or WEBP · up to 40 MB</p>
          {error && <p className="mt-2 flex items-center gap-1 text-[13px] text-[#dc2626]"><AlertTriangle size={14} /> {error}</p>}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {drawings.length === 0 && <p className="px-2 py-8 text-center text-[13px] text-[#8A9196]">No plans yet. Upload a PDF or image to get started.</p>}
          {drawings.map((d) => {
            const open = openId === d.id;
            return (
              <div key={d.id} className="mb-1">
                <div className={["group flex items-center gap-2 rounded-lg px-2 py-2.5 transition", open ? "bg-[#EAF3FA]" : "hover:bg-[#F5F6F7]"].join(" ")}>
                  <button onClick={() => openDrawing(d)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                    {d.page_count > 1 ? (open ? <ChevronDown size={16} className="shrink-0 text-[#8A9196]" /> : <ChevronRight size={16} className="shrink-0 text-[#8A9196]" />) : <span className="w-[16px] shrink-0" />}
                    {isPdf(d) ? <FileText size={18} className="shrink-0 text-[#0369a1]" /> : <ImageIcon size={18} className="shrink-0 text-[#0369a1]" />}
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-semibold text-[#30363A]">{d.filename}</span>
                      <span className="block text-[12px] text-[#8A9196]">{fmtSize(d.file_size)}{d.page_count > 1 ? ` · ${d.page_count} pages` : ""}</span>
                    </span>
                  </button>
                  <button onClick={() => removeDrawing(d)} className="grid h-7 w-7 shrink-0 place-items-center rounded text-[#8A9196] opacity-0 transition hover:bg-[#FEF2F2] hover:text-[#dc2626] group-hover:opacity-100"><Trash2 size={15} /></button>
                </div>

                {open && detail && detail.id === d.id && detail.pages.length > 1 && (
                  <div className="ml-4 mt-1 border-l border-[#EAECEE] pl-1">
                    {/* Sort / Search / Filter */}
                    <div className="mb-1 flex items-center gap-1 px-1">
                      <button onClick={() => setSortAsc((v) => !v)} title={`Sort ${sortAsc ? "descending" : "ascending"}`} className="grid h-7 w-7 place-items-center rounded text-[#586066] hover:bg-[#F1F3F4]"><ArrowDownUp size={15} /></button>
                      <button onClick={() => setShowSearch((v) => !v)} title="Search" className={["grid h-7 w-7 place-items-center rounded", showSearch ? "bg-[#EAF3FA] text-[#0369a1]" : "text-[#586066] hover:bg-[#F1F3F4]"].join(" ")}><Search size={15} /></button>
                      <button onClick={() => setFilterScaled((f) => f === "all" ? "scaled" : f === "scaled" ? "unscaled" : "all")} title={`Filter: ${filterScaled}`} className={["grid h-7 w-7 place-items-center rounded", filterScaled !== "all" ? "bg-[#EAF3FA] text-[#0369a1]" : "text-[#586066] hover:bg-[#F1F3F4]"].join(" ")}><Filter size={15} /></button>
                      {filterScaled !== "all" && <span className="text-[11px] font-semibold text-[#0369a1]">{filterScaled}</span>}
                    </div>
                    {showSearch && <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages" className="mb-1 h-8 w-full rounded border border-[#D7DCE0] px-2 text-[13px] outline-none focus:border-[#0369a1]" />}

                    {/* Pages list — capped to ~5 rows, then scroll */}
                    <div className="max-h-[220px] overflow-y-auto pr-0.5">
                    {visiblePages.map((p) => {
                      const r = ratioOf(p.pixels_per_metre);
                      return (
                        <div key={p.id} className="relative border-b border-[#F1F3F4] last:border-b-0">
                          <div className={["group flex items-center gap-1 rounded px-2 py-2 text-left text-[14px]", selectedPageId === p.id ? "bg-[#EAF3FA] font-bold text-[#0c4a6e]" : "font-medium text-[#586066] hover:bg-[#F5F6F7]"].join(" ")}>
                            <button onClick={() => setSelectedPageId(p.id)} className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
                              {p.scale_status === "scaled" && <PencilRuler size={13} className="shrink-0 text-[#0f7a4d]" />}
                              {r && <span className="shrink-0 text-[11px] font-semibold text-[#0f7a4d]">Scaled {r}</span>}
                              <span className="truncate" onDoubleClick={(e) => { e.stopPropagation(); void renamePage(p); }}>{p.name}</span>
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setPageMenu(pageMenu === p.id ? null : p.id); }} className="grid h-6 w-6 shrink-0 place-items-center rounded text-[#8A9196] opacity-0 hover:bg-[#E8EBED] group-hover:opacity-100"><MoreVertical size={15} /></button>
                          </div>
                          {pageMenu === p.id && (
                            <div onClick={(e) => e.stopPropagation()} className="absolute right-1 top-8 z-40 w-[160px] overflow-hidden rounded-md border border-[#D7DCE0] bg-white py-1 shadow-lg">
                              <button onClick={() => renamePage(p)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#30363A] hover:bg-[#F5F6F7]"><Pencil size={14} /> Rename</button>
                              <button onClick={() => clearPage(p)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#dc2626] hover:bg-[#FEF2F2]"><Trash2 size={14} /> Delete takeoffs</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    </div>
                  </div>
                )}
                {open && loadingDetail && detail?.id !== d.id && <div className="ml-8 py-1 text-[13px] text-[#8A9196]">Reading pages…</div>}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Viewer / takeoff */}
      <section className="min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
        {!openId && (
          <div className="flex h-full items-center justify-center rounded-xl bg-[#565b5e] text-center text-white/80 shadow-[0_2px_10px_rgba(15,23,42,0.10)]">
            <div><FileText className="mx-auto h-11 w-11 text-white/40" /><p className="mt-3 text-[16px] font-bold">No plan selected</p><p className="mt-1 text-[13px] text-white/60">Upload a plan, then select it to set a scale and measure.</p></div>
          </div>
        )}
        {openId && (loadingDetail || !detail) && <div className="flex h-full items-center justify-center rounded-xl bg-[#565b5e] text-white/80 shadow-[0_2px_10px_rgba(15,23,42,0.10)]"><Loader2 className="h-6 w-6 animate-spin" /></div>}
        {openId && detail && selectedPage && (
          <PlanTakeoffLoader key={selectedPage.id} projectId={projectId} drawing={{ id: detail.id, filename: detail.filename, mime_type: detail.mime_type, url: detail.url }} page={selectedPage} />
        )}
      </section>
    </div>
  );
}
