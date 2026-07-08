import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmployerFromRequest } from "@/lib/jobs-auth";
import { uniqueJobSlug, findDirectoryCompany } from "@/lib/jobs";
import { AU_STATES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from "@/lib/jobs-data";
import type { Prisma } from "@prisma/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empValues = EMPLOYMENT_TYPES.map((t) => t.value) as string[];
const lvlValues = EXPERIENCE_LEVELS.map((t) => t.value) as string[];

// Create a new job as a DRAFT. It only goes live after successful payment.
export async function POST(request: NextRequest) {
  const employer = await getEmployerFromRequest(request);
  if (!employer) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const title = String(body.title ?? "").trim();
  const companyName = String(body.company_name ?? "").trim();
  const location = String(body.location ?? "").trim();
  const description = String(body.description ?? "").trim();
  const contactEmail = String(body.contact_email ?? "").toLowerCase().trim();

  if (!title) return NextResponse.json({ error: "Job title is required." }, { status: 400 });
  if (!companyName) return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  if (!location) return NextResponse.json({ error: "Location is required." }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Job description is required." }, { status: 400 });
  if (!EMAIL_RE.test(contactEmail)) return NextResponse.json({ error: "A valid contact email is required." }, { status: 400 });

  const state = String(body.state ?? "");
  const employmentType = String(body.employment_type ?? "");
  const experienceLevel = String(body.experience_level ?? "");
  const categorySlug = String(body.category ?? "").trim();

  let categoryId: number | null = null;
  if (categorySlug) {
    const cat = await prisma.jobCategory.findUnique({ where: { slug: categorySlug }, select: { id: true } });
    categoryId = cat?.id ?? null;
  }

  // Soft directory link (best-effort, non-blocking).
  let companyId: number | null = null;
  try {
    const match = await findDirectoryCompany(companyName);
    companyId = match?.id ?? null;
  } catch { /* ignore */ }

  const closing = body.closing_date ? new Date(String(body.closing_date)) : null;

  const slug = await uniqueJobSlug(title, location);
  const metaDescription = description.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, 155);

  const data: Prisma.JobCreateInput = {
    slug,
    employer: { connect: { id: employer.id } },
    title,
    company_name: companyName,
    company_logo_url: body.company_logo_url ? String(body.company_logo_url) : employer.logo_url,
    company_website: body.company_website ? String(body.company_website) : null,
    company_about: body.company_about ? String(body.company_about) : null,
    location,
    state: (AU_STATES as readonly string[]).includes(state) ? (state as Prisma.JobCreateInput["state"]) : null,
    employment_type: empValues.includes(employmentType) ? (employmentType as Prisma.JobCreateInput["employment_type"]) : null,
    experience_level: lvlValues.includes(experienceLevel) ? (experienceLevel as Prisma.JobCreateInput["experience_level"]) : null,
    salary: body.salary ? String(body.salary).trim() : null,
    description,
    responsibilities: body.responsibilities ? String(body.responsibilities) : null,
    requirements: body.requirements ? String(body.requirements) : null,
    contact_email: contactEmail,
    closing_date: closing && !isNaN(closing.getTime()) ? closing : null,
    is_featured: Boolean(body.is_featured),
    status: "draft",
    ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
    ...(companyId ? { company_id: companyId } : {}),
    meta_title: `${title} — ${companyName} | Industry Jobs`,
    meta_description: metaDescription,
  };

  const job = await prisma.job.create({ data });

  // Keep the employer profile in sync for future posts.
  await prisma.jobEmployer.update({
    where: { id: employer.id },
    data: {
      company_name: employer.company_name ?? companyName,
      logo_url: body.company_logo_url ? String(body.company_logo_url) : employer.logo_url,
      website: employer.website ?? (body.company_website ? String(body.company_website) : null),
    },
  }).catch(() => {});

  return NextResponse.json({ id: job.id, slug: job.slug });
}
