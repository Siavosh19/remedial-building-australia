import "server-only";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { MEASUREMAP_BUCKET, drawingObjectPath, signedDrawingUrl } from "./storage";

// Plans (uploaded PDF/image drawings). Metadata in Postgres, bytes in the
// private Supabase Storage bucket, served only via short-lived signed URLs.
export type DrawingDTO = {
  id: string; filename: string; mime_type: string | null; file_size: number; page_count: number; created_at: string;
};
export type PlanPage = { id: string; page_number: number; pixels_per_metre: number | null; scale_status: string; name: string };

function pageName(p: { page_number: number; calibration_data: unknown }): string {
  const n = (p.calibration_data as { name?: string } | null)?.name;
  return n && n.trim() ? n : `Page ${p.page_number}`;
}
export type PlanDetail = { id: string; filename: string; mime_type: string | null; url: string | null; page_count: number; pages: PlanPage[] };

export async function listDrawings(ownerUserId: number, projectId: string): Promise<DrawingDTO[]> {
  const rows = await prisma.measureMapDrawing.findMany({
    where: { project_id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    orderBy: { created_at: "desc" },
    select: { id: true, filename: true, mime_type: true, file_size: true, page_count: true, created_at: true },
  });
  return rows.map((r) => ({ id: r.id, filename: r.filename, mime_type: r.mime_type, file_size: Number(r.file_size ?? 0), page_count: r.page_count, created_at: r.created_at.toISOString() }));
}

// Count PDF pages server-side with pdf.js (Node). Returns 1 for non-PDF / errors.
async function countPdfPages(bytes: Buffer): Promise<number> {
  try {
    // legacy build runs on the Node main thread; `as string` keeps TS from
    // demanding type decls for the subpath.
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs" as string);
    const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), isEvalSupported: false, useSystemFonts: false }).promise;
    return doc.numPages > 0 ? doc.numPages : 1;
  } catch (e) { console.error("[measuremap] pdf page count failed:", e); return 1; }
}

export async function createDrawingWithFile(
  ownerUserId: number,
  projectId: string,
  file: { filename: string; mimeType: string | null; bytes: Buffer; size: number },
): Promise<DrawingDTO | null> {
  const owned = await prisma.measureMapProject.findFirst({ where: { id: projectId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true } });
  if (!owned) return null;
  const isPdf = (file.mimeType ?? "").includes("pdf") || /\.pdf$/i.test(file.filename);
  const pageCount = isPdf ? await countPdfPages(file.bytes) : 1;
  const drawing = await prisma.measureMapDrawing.create({
    data: { project_id: projectId, owner_user_id: ownerUserId, filename: file.filename, storage_path: "", mime_type: file.mimeType, file_size: BigInt(file.size), page_count: pageCount },
  });
  const path = drawingObjectPath(ownerUserId, projectId, drawing.id, file.filename);
  const { error } = await supabaseAdmin.storage.from(MEASUREMAP_BUCKET).upload(path, file.bytes, { contentType: file.mimeType ?? undefined, upsert: true });
  if (error) { console.error("[measuremap] upload failed:", error.message); await prisma.measureMapDrawing.delete({ where: { id: drawing.id } }); return null; }
  await prisma.measureMapDrawing.update({ where: { id: drawing.id }, data: { storage_path: path } });
  await prisma.measureMapDrawingPage.createMany({
    data: Array.from({ length: pageCount }, (_, i) => ({ drawing_id: drawing.id, project_id: projectId, page_number: i + 1, scale_status: "unscaled" })),
  });
  return { id: drawing.id, filename: file.filename, mime_type: file.mimeType, file_size: file.size, page_count: pageCount, created_at: drawing.created_at.toISOString() };
}

export async function getDrawingDetail(ownerUserId: number, drawingId: string): Promise<PlanDetail | null> {
  const sel = {
    id: true, filename: true, mime_type: true, storage_path: true, page_count: true,
    pages: { orderBy: { page_number: "asc" as const }, select: { id: true, page_number: true, pixels_per_metre: true, scale_status: true, calibration_data: true } },
  };
  let d = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: sel });
  if (!d) return null;
  // Self-heal drawings uploaded before server-side page detection existed.
  const isPdf = (d.mime_type ?? "").includes("pdf") || /\.pdf$/i.test(d.filename);
  if (isPdf && d.page_count <= 1 && d.pages.length <= 1 && d.storage_path) {
    try {
      const { data } = await supabaseAdmin.storage.from(MEASUREMAP_BUCKET).download(d.storage_path);
      if (data) {
        const buf = Buffer.from(await data.arrayBuffer());
        const n = await countPdfPages(buf);
        if (n > 1) {
          await ensureDrawingPages(ownerUserId, drawingId, n);
          const d2 = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: sel });
          if (d2) d = d2;
        }
      }
    } catch (e) { console.error("[measuremap] page self-heal failed:", e); }
  }
  const url = d.storage_path ? await signedDrawingUrl(d.storage_path, 600) : null;
  return {
    id: d.id, filename: d.filename, mime_type: d.mime_type, url, page_count: d.page_count,
    pages: d.pages.map((p) => ({ id: p.id, page_number: p.page_number, pixels_per_metre: p.pixels_per_metre, scale_status: p.scale_status, name: pageName(p) })),
  };
}

// Set the drawing's page count and create any missing per-page records.
export async function ensureDrawingPages(ownerUserId: number, drawingId: string, pageCount: number): Promise<PlanPage[] | null> {
  const d = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true, project_id: true } });
  if (!d) return null;
  const count = Math.max(1, Math.min(Math.floor(pageCount) || 1, 500));
  await prisma.measureMapDrawing.update({ where: { id: drawingId }, data: { page_count: count } });
  const existing = await prisma.measureMapDrawingPage.findMany({ where: { drawing_id: drawingId }, select: { page_number: true } });
  const have = new Set(existing.map((e) => e.page_number));
  const toCreate = [];
  for (let n = 1; n <= count; n++) if (!have.has(n)) toCreate.push({ drawing_id: drawingId, project_id: d.project_id, page_number: n, scale_status: "unscaled" });
  if (toCreate.length) await prisma.measureMapDrawingPage.createMany({ data: toCreate });
  const rows = await prisma.measureMapDrawingPage.findMany({ where: { drawing_id: drawingId }, orderBy: { page_number: "asc" }, select: { id: true, page_number: true, pixels_per_metre: true, scale_status: true, calibration_data: true } });
  return rows.map((p) => ({ id: p.id, page_number: p.page_number, pixels_per_metre: p.pixels_per_metre, scale_status: p.scale_status, name: pageName(p) }));
}

export async function resetPageScale(ownerUserId: number, drawingId: string, pageId: string): Promise<boolean> {
  const owned = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true } });
  if (!owned) return false;
  const res = await prisma.measureMapDrawingPage.updateMany({ where: { id: pageId, drawing_id: drawingId }, data: { pixels_per_metre: null, scale_status: "unscaled" } });
  return res.count > 0;
}

export async function renamePage(ownerUserId: number, drawingId: string, pageId: string, name: string): Promise<boolean> {
  const owned = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true } });
  if (!owned) return false;
  const res = await prisma.measureMapDrawingPage.updateMany({ where: { id: pageId, drawing_id: drawingId }, data: { calibration_data: { name: name.trim() } } });
  return res.count > 0;
}

// Clear all takeoffs (measurements) on one page — the "delete page" action.
export async function clearPageTakeoffs(ownerUserId: number, projectId: string, drawingId: string, pageId: string): Promise<boolean> {
  const owned = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true } });
  if (!owned) return false;
  await prisma.measureMapMeasurement.deleteMany({ where: { project_id: projectId, owner_user_id: ownerUserId, source_type: "drawing", plan_id: drawingId, plan_page_id: pageId } });
  return true;
}

export async function setPageScale(ownerUserId: number, drawingId: string, input: { pageId: string; pixels_per_metre: number }): Promise<boolean> {
  const owned = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true } });
  if (!owned) return false;
  const res = await prisma.measureMapDrawingPage.updateMany({
    where: { id: input.pageId, drawing_id: drawingId },
    data: { pixels_per_metre: input.pixels_per_metre, scale_status: "scaled" },
  });
  return res.count > 0;
}

export async function signedUrlForDrawing(ownerUserId: number, drawingId: string): Promise<string | null> {
  const d = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { storage_path: true } });
  if (!d || !d.storage_path) return null;
  return signedDrawingUrl(d.storage_path, 600);
}

export async function deleteDrawing(ownerUserId: number, drawingId: string): Promise<boolean> {
  const d = await prisma.measureMapDrawing.findFirst({ where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true, storage_path: true } });
  if (!d) return false;
  await prisma.measureMapDrawing.update({ where: { id: drawingId }, data: { deleted_at: new Date() } });
  if (d.storage_path) { try { await supabaseAdmin.storage.from(MEASUREMAP_BUCKET).remove([d.storage_path]); } catch { /* best-effort */ } }
  return true;
}
