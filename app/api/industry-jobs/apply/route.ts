import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { activeJobWhere } from "@/lib/jobs";
import { uploadJobFile } from "@/lib/jobs-storage";
import { sendApplicantConfirmationEmail, sendEmployerNewApplicationEmail, type JobEmailAttachment } from "@/lib/jobs-email";
import { createNotification } from "@/lib/notifications";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_RESUME = 8 * 1024 * 1024; // 8 MB

// Applicants apply with no account. Handles résumé upload + emails.
export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot — bots fill this hidden field; humans never see it.
  if (String(form.get("company_url") ?? "").trim()) {
    return NextResponse.json({ ok: true }); // silently accept + drop
  }

  const slug = String(form.get("job_slug") ?? "").trim();
  const fullName = String(form.get("full_name") ?? "").trim();
  const email = String(form.get("email") ?? "").toLowerCase().trim();
  const phone = String(form.get("phone") ?? "").trim() || null;
  const coverMessage = String(form.get("cover_message") ?? "").trim() || null;

  if (!slug) return NextResponse.json({ error: "Missing job reference." }, { status: 400 });
  if (!fullName) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });

  const job = await prisma.job.findFirst({
    where: activeJobWhere({ slug }),
    select: { id: true, slug: true, title: true, company_name: true, location: true, contact_email: true, is_featured: true, user_id: true },
  });
  if (!job) return NextResponse.json({ error: "This job is no longer accepting applications." }, { status: 404 });

  // Optional résumé.
  let resumeUrl: string | null = null;
  let resumeName: string | null = null;
  const attachments: JobEmailAttachment[] = [];
  const resume = form.get("resume");
  if (resume && resume instanceof File && resume.size > 0) {
    if (!ALLOWED.has(resume.type)) {
      return NextResponse.json({ error: "Résumé must be a PDF, DOC or DOCX file." }, { status: 400 });
    }
    if (resume.size > MAX_RESUME) {
      return NextResponse.json({ error: "Résumé must be under 8 MB." }, { status: 400 });
    }
    const buf = Buffer.from(await resume.arrayBuffer());
    const ext = resume.name.split(".").pop()?.toLowerCase() || "pdf";
    const safe = `${job.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    try {
      resumeUrl = await uploadJobFile(safe, buf, resume.type);
      resumeName = resume.name;
      attachments.push({ filename: resume.name, content: buf.toString("base64"), contentType: resume.type });
    } catch (err) {
      console.error("[industry-jobs/apply] résumé upload failed:", err);
      // Continue without the résumé rather than failing the whole application.
    }
  }

  await prisma.jobApplication.create({
    data: {
      job_id: job.id,
      full_name: fullName,
      email,
      phone,
      cover_message: coverMessage,
      resume_url: resumeUrl,
      resume_name: resumeName,
    },
  });

  // In-app bell for the employer who owns the job (alongside the email).
  if (job.user_id) {
    await createNotification({
      userId: job.user_id,
      type: "job_applicant",
      title: "New job applicant",
      body: `${fullName} applied for ${job.title}`,
      link: `/directory/dashboard/jobs/${job.id}/applications`,
    });
  }

  // Emails are best-effort — never fail the applicant's submission on a send error.
  sendEmployerNewApplicationEmail({
    to: job.contact_email,
    job,
    applicantName: fullName,
    applicantEmail: email,
    applicantPhone: phone,
    coverMessage,
    resumeUrl,
    attachments,
  }).catch((e) => console.error("[industry-jobs/apply] employer email failed:", e));

  sendApplicantConfirmationEmail(email, fullName, job).catch((e) =>
    console.error("[industry-jobs/apply] applicant email failed:", e),
  );

  return NextResponse.json({ ok: true });
}
