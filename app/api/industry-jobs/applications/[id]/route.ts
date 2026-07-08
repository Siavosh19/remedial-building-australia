import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmployerFromRequest } from "@/lib/jobs-auth";
import { JOB_APPLICATION_STATUSES } from "@/lib/jobs-data";
import type { JobApplicationStatus } from "@prisma/client";

// Employer updates the status of an application on one of their own jobs.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employer = await getEmployerFromRequest(request);
  if (!employer) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const status = String(body?.status ?? "");
  if (!(JOB_APPLICATION_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const app = await prisma.jobApplication.findUnique({
    where: { id: Number(id) },
    include: { job: { select: { employer_id: true } } },
  });
  if (!app || app.job.employer_id !== employer.id) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await prisma.jobApplication.update({ where: { id: app.id }, data: { status: status as JobApplicationStatus } });
  return NextResponse.json({ ok: true });
}
