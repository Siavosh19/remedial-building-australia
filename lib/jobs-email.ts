import { Resend } from "resend";

// Self-contained email module for the Industry Jobs board. Mirrors the visual
// style of lib/directory-email.ts but is kept separate so the module stays
// independent. All sends degrade to a thrown error only when RESEND is missing.

const FROM = process.env.DIRECTORY_EMAIL_FROM ?? "Remedial Building Australia <info@remedialbuildingaustralia.com.au>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";
// Where "a new job was listed" notices go. Defaults to the business inbox; set
// JOBS_ADMIN_EMAIL to redirect (e.g. a personal address).
const ADMIN_EMAIL = process.env.JOBS_ADMIN_EMAIL ?? "info@remedialbuildingaustralia.com.au";

export type JobEmailAttachment = { filename: string; content: string; contentType?: string };

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrapper(title: string, body: string) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
    <div style="background:#0f172a;padding:24px 28px;border-bottom:3px solid #f43f5e;">
      <p style="margin:0;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">${esc(title)}</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:bold;color:#ffffff;">Remedial Building Australia · Industry Jobs</p>
    </div>
    <div style="padding:28px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">
      ${body}
      <p style="margin:26px 0 0;font-size:12px;color:#64748b;line-height:1.7;">Remedial Building Australia — Industry Jobs board.</p>
    </div>
  </div>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;padding:13px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">${esc(label)}</a>`;

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 0;font-size:13px;color:#64748b;width:140px;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;font-size:14px;color:#0f172a;font-weight:600;">${esc(value)}</td></tr>`;

async function send(opts: { subject: string; to: string; html: string; text: string; attachments?: JobEmailAttachment[] }) {
  if (!process.env.RESEND_API_KEY) {
    console.error(`[jobs-email] RESEND_API_KEY not set — cannot send "${opts.subject}" to ${opts.to}`);
    throw new Error("Email service is not configured.");
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const base = { from: FROM, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text };
  // Resend serialises to JSON — attachment `content` MUST be base64, not a Buffer.
  let res = await resend.emails
    .send(opts.attachments?.length ? { ...base, attachments: opts.attachments } : base)
    .catch((err) => ({ data: null, error: err }));
  if (res?.error && opts.attachments?.length) {
    console.error(`[jobs-email] "${opts.subject}" with attachments failed, retrying without:`, res.error);
    res = await resend.emails.send(base).catch((err) => ({ data: null, error: err }));
  }
  if (res?.error) {
    console.error(`[jobs-email] Resend rejected "${opts.subject}" to ${opts.to}:`, res.error);
    throw new Error(`Email send failed.`);
  }
  return res?.data;
}

type JobLike = {
  slug: string;
  title: string;
  company_name: string;
  location: string;
  contact_email: string;
  is_featured?: boolean;
};

// ── Admin: a new job was listed (fires on every publish) ───────────────────────
export async function sendJobListedAdminEmail(job: JobLike & { id: number }) {
  const url = `${SITE_URL}/industry-jobs/${job.slug}`;
  const admin = `${SITE_URL}/directory/admin/jobs`;
  const html = wrapper(
    "New job listed",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A new ${job.is_featured ? "<strong>Featured</strong> " : ""}job has just gone live on the Industry Jobs board.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       ${row("Job title", job.title)}
       ${row("Company", job.company_name)}
       ${row("Location", job.location)}
       ${row("Contact", job.contact_email)}
     </table>
     <p style="margin:0 0 8px;">${btn(url, "View listing")}</p>
     <p style="margin:14px 0 0;font-size:13px;"><a href="${admin}" style="color:#0369a1;">Manage in admin →</a></p>`,
  );
  const text = `New job listed: ${job.title} — ${job.company_name} (${job.location})\n${url}`;
  await send({ subject: `New job listed — ${job.title}`, to: ADMIN_EMAIL, html, text });
}

// ── Employer: payment confirmation ─────────────────────────────────────────────
export async function sendJobPaymentConfirmationEmail(to: string, job: JobLike, amountLabel: string, expiresAt: Date) {
  const url = `${SITE_URL}/industry-jobs/${job.slug}`;
  const dash = `${SITE_URL}/directory/dashboard/jobs`;
  const html = wrapper(
    "Payment confirmed",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Thanks — your payment was successful and your job is now live.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       ${row("Job title", job.title)}
       ${row("Listing type", job.is_featured ? "Featured" : "Standard")}
       ${row("Amount paid", amountLabel)}
       ${row("Live until", expiresAt.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))}
     </table>
     <p style="margin:0 0 8px;">${btn(url, "View your listing")}</p>
     <p style="margin:14px 0 0;font-size:13px;"><a href="${dash}" style="color:#0369a1;">Go to your dashboard →</a></p>`,
  );
  const text = `Payment confirmed for "${job.title}". Live until ${expiresAt.toDateString()}.\n${url}`;
  await send({ subject: `Payment confirmed — ${job.title}`, to, html, text });
}

// ── Applicant: application confirmation ────────────────────────────────────────
export async function sendApplicantConfirmationEmail(to: string, applicantName: string, job: JobLike) {
  const url = `${SITE_URL}/industry-jobs/${job.slug}`;
  const html = wrapper(
    "Application sent",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${esc(applicantName)}, your application has been sent successfully.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       ${row("Role", job.title)}
       ${row("Company", job.company_name)}
       ${row("Location", job.location)}
     </table>
     <p style="margin:0 0 8px;">The employer will be in touch directly if they'd like to progress your application.</p>
     <p style="margin:14px 0 0;font-size:13px;"><a href="${url}" style="color:#0369a1;">View the job →</a></p>`,
  );
  const text = `Hi ${applicantName}, your application for "${job.title}" at ${job.company_name} was sent successfully.`;
  await send({ subject: `Application sent — ${job.title}`, to, html, text });
}

// ── Employer: new application received (with resume attachment + link) ─────────
export async function sendEmployerNewApplicationEmail(params: {
  to: string;
  job: JobLike;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string | null;
  coverMessage?: string | null;
  resumeUrl?: string | null;
  attachments?: JobEmailAttachment[];
}) {
  const { to, job, applicantName, applicantEmail, applicantPhone, coverMessage, resumeUrl, attachments } = params;
  const dash = `${SITE_URL}/directory/dashboard/jobs`;
  const html = wrapper(
    "New application received",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">You've received a new application for <strong>${esc(job.title)}</strong>.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 18px;">
       ${row("Applicant", applicantName)}
       ${row("Email", applicantEmail)}
       ${applicantPhone ? row("Phone", applicantPhone) : ""}
     </table>
     ${coverMessage ? `<div style="margin:0 0 18px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Cover message</p><p style="margin:0;font-size:14px;line-height:1.7;color:#0f172a;white-space:pre-wrap;">${esc(coverMessage)}</p></div>` : ""}
     ${resumeUrl ? `<p style="margin:0 0 8px;">${btn(resumeUrl, "Download résumé")}</p>` : "<p style=\"margin:0 0 8px;font-size:14px;color:#475569;\">No résumé was attached.</p>"}
     <p style="margin:14px 0 0;font-size:13px;"><a href="${dash}" style="color:#0369a1;">Manage applications in your dashboard →</a></p>`,
  );
  const text = `New application for "${job.title}"\nApplicant: ${applicantName}\nEmail: ${applicantEmail}${applicantPhone ? `\nPhone: ${applicantPhone}` : ""}${coverMessage ? `\n\nCover message:\n${coverMessage}` : ""}${resumeUrl ? `\n\nRésumé: ${resumeUrl}` : ""}`;
  await send({ subject: `New application — ${job.title}`, to, html, text, attachments });
}

// ── Employer: job expiring soon / expired ──────────────────────────────────────
export async function sendJobExpiringSoonEmail(to: string, job: JobLike, expiresAt: Date, renewUrl: string) {
  const html = wrapper(
    "Your job listing expires soon",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Your listing <strong>${esc(job.title)}</strong> expires on ${esc(expiresAt.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }))}.</p>
     <p style="margin:0 0 8px;">Renew now to keep it live and continue receiving applications.</p>
     <p style="margin:14px 0 0;">${btn(renewUrl, "Renew this listing")}</p>`,
  );
  const text = `Your listing "${job.title}" expires on ${expiresAt.toDateString()}. Renew: ${renewUrl}`;
  await send({ subject: `Expiring soon — ${job.title}`, to, html, text });
}

export async function sendJobExpiredEmail(to: string, job: JobLike, renewUrl: string) {
  const html = wrapper(
    "Your job listing has expired",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Your listing <strong>${esc(job.title)}</strong> has now expired and is no longer visible on the board.</p>
     <p style="margin:0 0 8px;">You can renew it in one click to bring it back.</p>
     <p style="margin:14px 0 0;">${btn(renewUrl, "Renew this listing")}</p>`,
  );
  const text = `Your listing "${job.title}" has expired. Renew: ${renewUrl}`;
  await send({ subject: `Expired — ${job.title}`, to, html, text });
}
