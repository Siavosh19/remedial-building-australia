import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { AU_STATES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from "@/lib/jobs-data";
import type { Prisma } from "@prisma/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empValues = EMPLOYMENT_TYPES.map((t) => t.value) as string[];
const lvlValues = EXPERIENCE_LEVELS.map((t) => t.value) as string[];

async function ownedJob(request: NextRequest, idStr: string) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return { error: NextResponse.json({ error: "Please sign in first." }, { status: 401 }) };
  const id = Number(idStr);
  if (!Number.isInteger(id)) return { error: NextResponse.json({ error: "Invalid job." }, { status: 400 }) };
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job || job.user_id !== user.id) return { error: NextResponse.json({ error: "Job not found." }, { status: 404 }) };
  return { user, job };
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, job } = await ownedJob(request, id);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const title = String(body.title ?? "").trim();
  const companyName = String(body.company_name ?? "").trim();
  const location = String(body.location ?? "").trim();
  const description = String(body.description ?? "").trim();
  const contactEmail = String(body.contact_email ?? "").toLowerCase().trim();
  if (!title || !companyName || !location || !description) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  if (!EMAIL_RE.test(contactEmail)) return NextResponse.json({ error: "A valid contact email is required." }, { status: 400 });

  const state = String(body.state ?? "");
  const employmentType = String(body.employment_type ?? "");
  const experienceLevel = String(body.experience_level ?? "");
  const categorySlug = String(body.category ?? "").trim();
  let categoryId: number | null = job!.category_id;
  if (categorySlug) {
    const cat = await prisma.jobCategory.findUnique({ where: { slug: categorySlug }, select: { id: true } });
    categoryId = cat?.id ?? null;
  }
  const closing = body.closing_date ? new Date(String(body.closing_date)) : null;

  const data: Prisma.JobUpdateInput = {
    title,
    company_name: companyName,
    company_logo_url: body.company_logo_url !== undefined ? (body.company_logo_url ? String(body.company_logo_url) : null) : undefined,
    company_website: body.company_website ? String(body.company_website) : null,
    company_about: body.company_about ? String(body.company_about) : null,
    location,
    state: (AU_STATES as readonly string[]).includes(state) ? (state as Prisma.JobUpdateInput["state"]) : null,
    employment_type: empValues.includes(employmentType) ? (employmentType as Prisma.JobUpdateInput["employment_type"]) : null,
    experience_level: lvlValues.includes(experienceLevel) ? (experienceLevel as Prisma.JobUpdateInput["experience_level"]) : null,
    salary: body.salary ? String(body.salary).trim() : null,
    description,
    responsibilities: body.responsibilities ? String(body.responsibilities) : null,
    requirements: body.requirements ? String(body.requirements) : null,
    contact_email: contactEmail,
    closing_date: closing && !isNaN(closing.getTime()) ? closing : null,
    meta_title: `${title} — ${companyName} | Industry Jobs`,
    meta_description: description.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, 155),
    category: categoryId ? { connect: { id: categoryId } } : { disconnect: true },
  };

  await prisma.job.update({ where: { id: job!.id }, data });
  return NextResponse.json({ ok: true, slug: job!.slug });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, job } = await ownedJob(request, id);
  if (error) return error;
  await prisma.job.delete({ where: { id: job!.id } });
  return NextResponse.json({ ok: true });
}
