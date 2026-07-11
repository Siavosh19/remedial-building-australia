import { prisma } from "@/lib/prisma";

// In-app notification bell. Best-effort by design: creating a notification must
// never break the primary action (sending a lead, submitting an application),
// so every function swallows its own errors — same contract as the email sends.

export type NotificationType = "lead" | "lead_updated" | "job_applicant";

export async function createNotification(input: {
  userId: number;
  type: NotificationType;
  title: string;
  body?: string | null;
  link?: string | null;
}) {
  try {
    await prisma.notification.create({
      data: {
        user_id: input.userId,
        type: input.type,
        title: input.title,
        body: input.body ?? null,
        link: input.link ?? null,
      },
    });
  } catch (err) {
    console.error("[notifications] createNotification failed", err);
  }
}

// Fan out to every member of a company (owner + staff via company_users).
export async function notifyCompanyOwners(
  companyId: number,
  input: { type: NotificationType; title: string; body?: string | null; link?: string | null },
) {
  try {
    const members = await prisma.companyUser.findMany({
      where: { company_id: companyId },
      select: { user_id: true },
    });
    if (members.length === 0) return;
    await prisma.notification.createMany({
      data: members.map((m) => ({
        user_id: m.user_id,
        type: input.type,
        title: input.title,
        body: input.body ?? null,
        link: input.link ?? null,
      })),
    });
  } catch (err) {
    console.error("[notifications] notifyCompanyOwners failed", err);
  }
}
