import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { JOB_APPLICATION_STATUSES } from "@/lib/jobs-data";
import type { JobApplicationStatus } from "@prisma/client";

// Employer updates the status of an application on one of their own jobs.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const status = String(body?.status ?? "");
  if (!(JOB_APPLICATION_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const app = await prisma.jobApplication.findUnique({
    where: { id: Number(id) },
    include: { job: { select: { user_id: true } } },
  });
  if (!app || app.job.user_id !== user.id) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.jobApplication.update({ where: { id: app.id }, data: { status: status as JobApplicationStatus } });
  return NextResponse.json({ ok: true });
}
