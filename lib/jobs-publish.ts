import { prisma } from "@/lib/prisma";
import { sendJobListedAdminEmail, sendJobPaymentConfirmationEmail } from "@/lib/jobs-email";
import { formatAud } from "@/lib/jobs-pricing";

// Activate a job after successful payment (or manual/admin publish). Sets it live,
// computes expiry (earlier of duration and closing date), and fires notifications.
// Idempotent-ish: safe to call once per successful checkout.
export async function activateJob(
  jobId: number,
  opts: { durationDays: number; isFeatured: boolean; amountCents?: number; notify?: boolean; keepExpiry?: boolean },
) {
  const existing = await prisma.job.findUnique({ where: { id: jobId } });
  if (!existing) return null;

  const now = new Date();
  // Upgrades (e.g. Standard → Featured) keep the existing expiry — the paid
  // listing period isn't reset, only the feature status changes.
  let expires =
    opts.keepExpiry && existing.expires_at
      ? existing.expires_at
      : new Date(now.getTime() + opts.durationDays * 86400000);
  if (existing.closing_date && existing.closing_date < expires) expires = existing.closing_date;

  const job = await prisma.job.update({
    where: { id: jobId },
    data: {
      status: "active",
      published_at: existing.published_at ?? now,
      expires_at: expires,
      is_featured: opts.isFeatured,
      featured_until: opts.isFeatured ? expires : null,
      reminder_sent: false,
    },
  });

  if (opts.notify !== false) {
    sendJobListedAdminEmail(job).catch((e) => console.error("[activateJob] admin email failed:", e));
    sendJobPaymentConfirmationEmail(
      job.contact_email,
      job,
      opts.amountCents != null ? formatAud(opts.amountCents) : "—",
      expires,
    ).catch((e) => console.error("[activateJob] confirmation email failed:", e));
  }
  return job;
}
