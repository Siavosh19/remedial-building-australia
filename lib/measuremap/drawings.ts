import "server-only";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { MEASUREMAP_BUCKET, drawingObjectPath, signedDrawingUrl } from "./storage";

// Plans (uploaded PDF/image drawings). Metadata in Postgres, bytes in the
// private Supabase Storage bucket, served only via short-lived signed URLs.
export type DrawingDTO = {
  id: string;
  filename: string;
  mime_type: string | null;
  file_size: number;
  page_count: number;
  created_at: string;
};

export async function listDrawings(ownerUserId: number, projectId: string): Promise<DrawingDTO[]> {
  const rows = await prisma.measureMapDrawing.findMany({
    where: { project_id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    orderBy: { created_at: "desc" },
    select: { id: true, filename: true, mime_type: true, file_size: true, page_count: true, created_at: true },
  });
  return rows.map((r) => ({
    id: r.id, filename: r.filename, mime_type: r.mime_type,
    file_size: Number(r.file_size ?? 0), page_count: r.page_count, created_at: r.created_at.toISOString(),
  }));
}

export async function createDrawingWithFile(
  ownerUserId: number,
  projectId: string,
  file: { filename: string; mimeType: string | null; bytes: Buffer; size: number },
): Promise<DrawingDTO | null> {
  const owned = await prisma.measureMapProject.findFirst({
    where: { id: projectId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true },
  });
  if (!owned) return null;

  const drawing = await prisma.measureMapDrawing.create({
    data: {
      project_id: projectId, owner_user_id: ownerUserId, filename: file.filename,
      storage_path: "", mime_type: file.mimeType, file_size: BigInt(file.size), page_count: 1,
    },
  });
  const path = drawingObjectPath(ownerUserId, projectId, drawing.id, file.filename);
  const { error } = await supabaseAdmin.storage
    .from(MEASUREMAP_BUCKET)
    .upload(path, file.bytes, { contentType: file.mimeType ?? undefined, upsert: true });
  if (error) {
    console.error("[measuremap] upload failed:", error.message);
    await prisma.measureMapDrawing.delete({ where: { id: drawing.id } });
    return null;
  }
  await prisma.measureMapDrawing.update({ where: { id: drawing.id }, data: { storage_path: path } });
  await prisma.measureMapDrawingPage.create({
    data: { drawing_id: drawing.id, project_id: projectId, page_number: 1, scale_status: "unscaled" },
  });
  return { id: drawing.id, filename: file.filename, mime_type: file.mimeType, file_size: file.size, page_count: 1, created_at: drawing.created_at.toISOString() };
}

export async function signedUrlForDrawing(ownerUserId: number, drawingId: string): Promise<string | null> {
  const d = await prisma.measureMapDrawing.findFirst({
    where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { storage_path: true },
  });
  if (!d || !d.storage_path) return null;
  return signedDrawingUrl(d.storage_path, 600);
}

export async function deleteDrawing(ownerUserId: number, drawingId: string): Promise<boolean> {
  const d = await prisma.measureMapDrawing.findFirst({
    where: { id: drawingId, owner_user_id: ownerUserId, deleted_at: null }, select: { id: true, storage_path: true },
  });
  if (!d) return false;
  await prisma.measureMapDrawing.update({ where: { id: drawingId }, data: { deleted_at: new Date() } });
  if (d.storage_path) { try { await supabaseAdmin.storage.from(MEASUREMAP_BUCKET).remove([d.storage_path]); } catch { /* orphan cleanup best-effort */ } }
  return true;
}
