import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmployerFromRequest } from "@/lib/jobs-auth";
import { uniqueJobSlug } from "@/lib/jobs";

// Free employer actions on their own jobs: duplicate (→ new draft) and expire
// (take offline early). Paid actions — renew / upgrade — go via /checkout.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employer = await getEmployerFromRequest(request);
  if (!employer) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const job = await prisma.job.findUnique({ where: { id: Number(id) } });
  if (!job || job.employer_id !== employer.id) return NextResponse.json({ error: "Job not found." }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const action = String(body?.action ?? "");

  if (action === "expire") {
    await prisma.job.update({ where: { id: job.id }, data: { status: "expired", expires_at: new Date(), featured_until: null } });
    return NextResponse.json({ ok: true });
  }

  if (action === "duplicate") {
    const slug = await uniqueJobSlug(job.title, `${job.location} copy`);
    const copy = await prisma.job.create({
      data: {
        slug,
        employer_id: employer.id,
        category_id: job.category_id,
        title: job.title,
        company_name: job.company_name,
        company_logo_url: job.company_logo_url,
        company_website: job.company_website,
        company_about: job.company_about,
        location: job.location,
        state: job.state,
        employment_type: job.employment_type,
        experience_level: job.experience_level,
        salary: job.salary,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        contact_email: job.contact_email,
        company_id: job.company_id,
        is_featured: false,
        status: "draft",
        meta_title: job.meta_title,
        meta_description: job.meta_description,
      },
    });
    return NextResponse.json({ ok: true, id: copy.id, slug: copy.slug });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
