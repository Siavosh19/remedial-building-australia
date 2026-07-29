"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, FileText, Image as ImageIcon, Trash2, Loader2, AlertTriangle, ChevronDown, ChevronRight, PencilRuler, Search, ArrowDownUp, Filter, MoreVertical, Pencil, GripVertical, PanelLeftClose, PanelLeftOpen, Sigma, Paperclip, StickyNote, RefreshCw, Link2 } from "lucide-react";
import PlanTakeoffLoader from "./PlanTakeoffLoader";
import { supabase } from "@/lib/supabase";
import * as api from "../map/api";

const MAX_BYTES = 40 * 1024 * 1024; // 40 MB
const BUCKET = "measuremap-files";

type Drawing = { id: string; filename: string; mime_type: string | null; file_size: number; page_count: number; created_at: string };
type PlanPage = { id: string; page_number: number; pixels_per_metre: number | null; scale_status: string; name: string };
type PlanDetail = { id: string; filename: string; mime_type: string | null; url: string | null; page_count: number; pages: PlanPage[] };

const isPdf = (d: { mime_type: string | null; filename: string }) => (d.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(d.filename);
const fmtSize = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const ratioOf = (ppm: number | null) => (ppm && ppm > 0 ? `1:${Math.round(5669.29 / ppm)}` : null);

// Count PDF pages in the browser (reliable — pdf.js runs client-side here).
// The server-side count can fail in serverless, so this is the source of truth.
async function countPdfPagesClient(file: File): Promise<number> {
  try {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    const buf = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
    return pdf.numPages > 0 ? pdf.numPages : 1;
  } catch (e) { console.error("[measuremap] client pdf page count failed:", e); return 1; }
}
// Self-heal older PDFs the server counted as single-page: count from the signed URL.
async function countPdfPagesFromUrl(url: string): Promise<number> {
  try {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    const pdf = await pdfjs.getDocument({ url }).promise;
    return pdf.numPages > 0 ? pdf.numPages : 1;
  } catch (e) { console.error("[measuremap] client pdf url count failed:", e); return 1; }
}

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
  const [asideW, setAsideW] = useState(300);
  const [collapsed, setCollapsed] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [sumOpen, setSumOpen] = useState(true);
  const [attachOpen, setAttachOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [sumItems, setSumItems] = useState<api.ApiItem[]>([]);
  const [sumCats, setSumCats] = useState<api.ApiCategory[]>([]);
  const [sumLoading, setSumLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const base = `/api/measuremap/projects/${projectId}`;

  function startResize(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX, startW = asideW;
    const onMove = (ev: MouseEvent) => setAsideW(Math.min(560, Math.max(220, startW + ev.clientX - startX)));
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
  }

  async function loadSummary() {
    if (!openId) return;
    setSumLoading(true);
    try {
      const [tk, cats] = await Promise.all([
        fetch(`${base}/drawings/${openId}/takeoffs`).then((r) => r.json()),
        api.listCategories(projectId),
      ]);
      setSumItems((tk.items ?? []) as api.ApiItem[]); setSumCats(cats);
    } catch { /* ignore */ } finally { setSumLoading(false); }
  }

  // Reopen the plan + page the user was last working on (per project, per device).
  const RESTORE_KEY = `mm-last-${projectId}`;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESTORE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { drawingId?: string; pageId?: string };
      const d = saved.drawingId ? drawings.find((x) => x.id === saved.drawingId) : undefined;
      if (d) void openDrawing(d, saved.pageId);
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Remember the current plan + page so a reopen lands in the same place.
  useEffect(() => {
    if (!openId) return;
    try { localStorage.setItem(RESTORE_KEY, JSON.stringify({ drawingId: openId, pageId: selectedPageId })); } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, selectedPageId]);

  // Load notes (per-device) + refresh the summary when a different plan opens.
  useEffect(() => {
    if (!openId) { setNotes(""); setSumItems([]); return; }
    try { setNotes(localStorage.getItem(`mm-notes-${openId}`) || ""); } catch { setNotes(""); }
    if (sumOpen) void loadSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  async function openDrawing(d: Drawing, preferPageId?: string) {
    setOpenId(d.id); setDetail(null); setSelectedPageId(null); setLoadingDetail(true);
    try {
      let data = (await (await fetch(`${base}/drawings/${d.id}`)).json()).drawing as PlanDetail | undefined;
      // Client-side self-heal: PDFs the server counted as single-page → recount from URL.
      if (data && isPdf(data) && data.page_count <= 1 && data.url) {
        const n = await countPdfPagesFromUrl(data.url);
        if (n > 1) {
          try { await fetch(`${base}/drawings/${d.id}/pages`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page_count: n }) }); } catch { /* ignore */ }
          data = (await (await fetch(`${base}/drawings/${d.id}`)).json()).drawing as PlanDetail | undefined;
        }
      }
      if (data && data.page_count !== d.page_count) setDrawings((prev) => prev.map((x) => x.id === d.id ? { ...x, page_count: data!.page_count } : x));
      setDetail(data ?? null);
      const pages = data?.pages ?? [];
      setSelectedPageId(preferPageId && pages.some((p) => p.id === preferPageId) ? preferPageId : pages[0]?.id ?? null);
    } catch { setDetail(null); } finally { setLoadingDetail(false); }
  }

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setError(null); setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (file.size > MAX_BYTES) { setError(`${file.name} is over 40 MB`); continue; }
        const isPdfFile = (file.type || "").includes("pdf") || /\.pdf$/i.test(file.name);
        // 1. Get a signed upload URL (small JSON request — no body-size limit hit).
        const signRes = await fetch(`${base}/drawings/upload`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ filename: file.name }) });
        const sign = await signRes.json();
        if (!signRes.ok) { setError(sign.error || "Upload failed"); continue; }
        // 2. Upload bytes straight to Supabase Storage (bypasses the serverless limit).
        const up = await supabase.storage.from(BUCKET).uploadToSignedUrl(sign.path, sign.token, file, { contentType: file.type || undefined });
        if (up.error) { setError(`Upload failed: ${up.error.message}`); continue; }
        // 3. Count PDF pages in-browser (reliable), then finalize the record.
        const pageCount = isPdfFile ? await countPdfPagesClient(file) : 1;
        const finRes = await fetch(`${base}/drawings/upload`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ drawing_id: sign.drawingId, mime_type: file.type || null, size: file.size, page_count: pageCount }) });
        const fin = await finRes.json();
        if (!finRes.ok || !fin.drawing) { setError(fin.error || "Upload failed"); continue; }
        setDrawings((prev) => [fin.drawing as Drawing, ...prev]);
        void openDrawing(fin.drawing as Drawing);
      }
    } catch { setError("Upload failed"); } finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  async function onImportUrl() {
    const url = linkUrl.trim(); if (!url) return;
    setError(null); setImporting(true);
    try {
      const res = await fetch(`${base}/drawings/import`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
      const data = await res.json();
      if (!res.ok || !data.drawing) { setError(data.error || "Import failed"); return; }
      setDrawings((prev) => [data.drawing as Drawing, ...prev]); setLinkUrl(""); setLinkOpen(false); void openDrawing(data.drawing as Drawing);
    } catch { setError("Import failed"); } finally { setImporting(false); }
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

  const sumTotal = (it: api.ApiItem) => it.measurement_type === "count" ? it.measurements.length : it.measurements.reduce((s, m) => s + m.calculated_quantity, 0);
  const sumFmt = (q: number, t: string | null) => t === "count" ? `${Math.round(q)} ea` : t === "area" ? `${q.toFixed(2)} m²` : `${q.toFixed(2)} m`;
  const summaryGroups = useMemo(() => {
    const g = sumCats.map((c) => ({ name: c.name, list: sumItems.filter((i) => i.category_id === c.id) })).filter((x) => x.list.length);
    const uncat = sumItems.filter((i) => !i.category_id);
    if (uncat.length) g.push({ name: "Uncategorised", list: uncat });
    return g;
  }, [sumItems, sumCats]);

  return (
    <div className="flex h-full gap-3 bg-[#e5e7eb] p-3" onClick={() => setPageMenu(null)}>
      {/* Plans + pages list — collapsible + resizable */}
      {collapsed ? (
        <aside className="flex w-11 shrink-0 flex-col items-center gap-3 rounded-xl border border-[#D7DCE0] bg-white py-3 shadow-[0_2px_10px_rgba(15,23,42,0.10)]" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setCollapsed(false)} title="Show plans" className="grid h-8 w-8 place-items-center rounded-lg text-[#0369a1] hover:bg-[#EAF3FA]"><PanelLeftOpen size={20} /></button>
          <span className="mt-1 rotate-180 text-[12px] font-bold uppercase tracking-wide text-[#586066] [writing-mode:vertical-rl]">Plans</span>
        </aside>
      ) : (
      <div className="relative flex shrink-0" style={{ width: asideW }} onClick={(e) => e.stopPropagation()}
        onDragOver={(e) => { e.preventDefault(); if (!dragOver) setDragOver(true); }}
        onDragLeave={(e) => { if (e.currentTarget === e.target) setDragOver(false); }}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); void onFiles(e.dataTransfer.files); }}>
      <aside className="flex w-full flex-col overflow-hidden rounded-xl border border-[#D7DCE0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.10)]">
        <div className="border-b border-[#E2E5E7] p-3">
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0369a1] text-[15px] font-bold text-white transition hover:bg-[#075985] disabled:opacity-60">
            {uploading ? <><Loader2 className="h-5 w-5 animate-spin" /> Uploading…</> : <><Upload size={18} /> Upload Plans</>}
          </button>
          <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#8A9196]">
            <button onClick={() => setLinkOpen((v) => !v)} className="flex items-center gap-1 font-semibold text-[#0369a1] hover:underline"><Link2 size={12} /> Import from link</button>
            <span>· or drag &amp; drop</span>
          </div>
          {linkOpen && (
            <div className="mt-2 flex gap-1">
              <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void onImportUrl(); }} placeholder="Dropbox / Drive / OneDrive share link…" className="h-8 min-w-0 flex-1 rounded border border-[#D7DCE0] px-2 text-[12px] outline-none focus:border-[#0369a1]" />
              <button onClick={() => void onImportUrl()} disabled={importing || !linkUrl.trim()} className="flex h-8 shrink-0 items-center rounded bg-[#0369a1] px-3 text-[12px] font-semibold text-white hover:bg-[#075985] disabled:opacity-50">{importing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}</button>
            </div>
          )}
          <p className="mt-2 text-center text-[11px] text-[#8A9196]">PDF, PNG, JPG or WEBP · up to 40 MB</p>
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
                            <button onClick={() => setSelectedPageId(p.id)} title={r ? `Scaled ${r}` : undefined} className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
                              {p.scale_status === "scaled" && <PencilRuler size={14} className="shrink-0 text-[#0f7a4d]" />}
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

          {/* Accordion sections for the open plan */}
          {openId && detail && (
            <div className="mt-2 border-t border-[#EAECEE] pt-2">
              {/* Takeoff Summary */}
              <button onClick={() => { const n = !sumOpen; setSumOpen(n); if (n) void loadSummary(); }} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[14px] font-bold text-[#30363A] hover:bg-[#F5F6F7]">
                {sumOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}<Sigma size={16} className="text-[#0369a1]" /> Takeoff Summary
                <span onClick={(e) => { e.stopPropagation(); void loadSummary(); }} title="Refresh" className="ml-auto grid h-6 w-6 place-items-center rounded text-[#8A9196] hover:bg-[#E8EBED]"><RefreshCw size={13} className={sumLoading ? "animate-spin" : ""} /></span>
              </button>
              {sumOpen && (
                <div className="px-2 pb-2">
                  {sumItems.length === 0 && <p className="px-1 py-2 text-[12px] text-[#8A9196]">No takeoffs on this plan yet.</p>}
                  {summaryGroups.map((g) => (
                    <div key={g.name} className="mb-1.5">
                      <div className="px-1 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6C7378]">{g.name}</div>
                      {g.list.map((it) => (
                        <div key={it.id} className="flex items-center gap-2 px-1 py-1 text-[13px]">
                          <span className="h-[11px] w-[11px] shrink-0 rounded-sm ring-1 ring-black/10" style={{ backgroundColor: it.colour }} />
                          <span className="min-w-0 flex-1 truncate text-[#30363A]">{it.name}</span>
                          <span className="shrink-0 font-semibold text-[#0c4a6e]">{sumFmt(sumTotal(it), it.measurement_type)}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Attachments */}
              <button onClick={() => setAttachOpen((v) => !v)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[14px] font-bold text-[#30363A] hover:bg-[#F5F6F7]">
                {attachOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}<Paperclip size={16} className="text-[#0369a1]" /> Attachments
              </button>
              {attachOpen && <p className="px-3 pb-2 text-[12px] text-[#8A9196]">Attach reference files (photos, specs, emails) to this plan. Needs a small database table — ask me to switch it on and I&apos;ll add the migration.</p>}

              {/* Notes */}
              <button onClick={() => setNotesOpen((v) => !v)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[14px] font-bold text-[#30363A] hover:bg-[#F5F6F7]">
                {notesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}<StickyNote size={16} className="text-[#0369a1]" /> Notes
              </button>
              {notesOpen && (
                <div className="px-2 pb-2">
                  <textarea value={notes} onChange={(e) => { setNotes(e.target.value); try { localStorage.setItem(`mm-notes-${openId}`, e.target.value); } catch { /* ignore */ } }} placeholder="Notes for this plan…" className="h-24 w-full resize-y rounded border border-[#D7DCE0] p-2 text-[13px] outline-none focus:border-[#0369a1]" />
                  <p className="mt-1 text-[10px] text-[#A2A8AC]">Saved on this device.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
      {dragOver && <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center rounded-xl border-2 border-dashed border-[#0369a1] bg-[#0369a1]/10 text-[13px] font-bold text-[#0369a1]">Drop plans to upload</div>}
      {/* drag to resize */}
      <div onMouseDown={startResize} title="Drag to resize" className="absolute -right-1.5 top-0 z-10 flex h-full w-3 cursor-col-resize items-center justify-center group">
        <GripVertical size={14} className="text-[#B7BEC3] opacity-0 group-hover:opacity-100" />
      </div>
      <button onClick={() => setCollapsed(true)} title="Collapse panel" className="absolute right-0 top-1/2 z-20 grid h-14 w-5 -translate-y-1/2 place-items-center rounded-l-md border border-r-0 border-[#D7DCE0] bg-white text-[#586066] shadow-sm hover:bg-[#EAF3FA] hover:text-[#0369a1]"><PanelLeftClose size={15} /></button>
      </div>
      )}

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
