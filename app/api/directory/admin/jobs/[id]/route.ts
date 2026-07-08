import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireWriteAdmin } from "@/lib/admin-auth";
import { activateJob } from "@/lib/jobs-publish";

// Admin actions on any job: approve, reject, feature, unfeature, expire, renew.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;

  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id: Number(id) } });
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const action = String(body?.action ?? "");

  switch (action) {
    case "approve":
    case "renew":
      await activateJob(job.id, { durationDays: 30, isFeatured: job.is_featured, notify: false });
      break;
    case "reject":
      await prisma.job.update({ where: { id: job.id }, data: { status: "rejected", featured_until: null } });
      break;
    case "expire":
      await prisma.job.update({ where: { id: job.id }, data: { status: "expired", expires_at: new Date(), featured_until: null } });
      break;
    case "feature":
      await prisma.job.update({ where: { id: job.id }, data: { is_featured: true, featured_until: job.expires_at } });
      break;
    case "unfeature":
      await prisma.job.update({ where: { id: job.id }, data: { is_featured: false, featured_until: null } });
      break;
    default:
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireWriteAdmin(request);
  if (error) return error;
  const { id } = await params;
  await prisma.job.delete({ where: { id: Number(id) } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
