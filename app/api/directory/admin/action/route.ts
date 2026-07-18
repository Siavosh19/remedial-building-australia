import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import type { AdminReviewStatus, CompanyStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { sendCompanyStatusEmail } from "@/lib/directory-email";
import { bustDirectoryCache } from "@/lib/directory-cache";

type ActionLogEntry = { ts: string; actor: string; action: string; note?: string };

function appendActionLog(existingNotes: string | null, entry: ActionLogEntry): string {
  let log: ActionLogEntry[] = [];
  if (existingNotes) {
    try {
      const parsed = JSON.parse(existingNotes);
      log = Array.isArray(parsed)
        ? parsed
        : [{ ts: new Date().toISOString(), actor: "system", action: "legacy_note", note: existingNotes }];
    } catch {
      log = [{ ts: new Date().toISOString(), actor: "system", action: "legacy_note", note: existingNotes }];
    }
  }
  log.push(entry);
  return JSON.stringify(log);
}

const VALID_ACTIONS = ["approve", "reject", "needs_review", "needs_recheck"] as const;
type AdminAction = (typeof VALID_ACTIONS)[number];

const ACTION_QUEUE_STATUS: Record<AdminAction, AdminReviewStatus> = {
  approve: "published",
  reject: "rejected",
  needs_review: "needs_review",
  needs_recheck: "needs_recheck",
};

const ACTION_COMPANY_STATUS: Record<AdminAction, CompanyStatus | null> = {
  approve: "published",
  reject: "rejected",
  needs_review: null,
  needs_recheck: null,
};

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { queueId?: unknown; action?: unknown; note?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { queueId, action, note } = body;
  if (!queueId || !action) {
    return NextResponse.json({ error: "Missing queueId or action" }, { status: 400 });
  }
  if (!VALID_ACTIONS.includes(action as AdminAction)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const typedAction = action as AdminAction;
  const id = Number(queueId);
  if (!id) return NextResponse.json({ error: "Invalid queueId" }, { status: 400 });

  const queueItem = await prisma.adminReviewQueue.findUnique({ where: { id } });
  if (!queueItem) return NextResponse.json({ error: "Queue item not found" }, { status: 404 });

  const logEntry: ActionLogEntry = {
    ts: new Date().toISOString(),
    actor: admin.email,
    action: typedAction,
    ...(note && typeof note === "string" && note.trim() ? { note: note.trim() } : {}),
  };

  const newNotes = appendActionLog(queueItem.notes, logEntry);
  const queueStatus = ACTION_QUEUE_STATUS[typedAction];
  const companyStatus = ACTION_COMPANY_STATUS[typedAction];

  await prisma.$transaction(async (tx) => {
    await tx.adminReviewQueue.update({
      where: { id },
      data: {
        status: queueStatus,
        reviewed_by: admin.id,
        reviewed_at: new Date(),
        notes: newNotes,
      },
    });

    if (companyStatus) {
      const data: Prisma.CompanyUpdateInput = { status: companyStatus };
      if (companyStatus === "published") {
        // The owner submitted this listing → it is a CLAIMED (owned) listing.
        // Set every claim signal so the UI never shows "Claim this profile" for it.
        data.is_claimed = true;
        data.listing_claim_status = "claimed";
        data.claimed_at = new Date();
        // Promote a free/basic listing to the claimed tier (which the UI reads to
        // unlock the owner's profile). Never downgrade a paid Featured listing.
        const current = await tx.company.findUnique({
          where: { id: queueItem.company_id },
          select: { plan_type: true },
        });
        if (current?.plan_type !== "featured") data.plan_type = "claimed";
      }
      await tx.company.update({ where: { id: queueItem.company_id }, data });
    }
  });

  // Send approval/rejection email to company owner
  if (typedAction === "approve" || typedAction === "reject") {
    const company = await prisma.company.findUnique({
      where: { id: queueItem.company_id },
      select: {
        name: true,
        email: true,
        users: {
          where: { is_primary: true },
          include: { user: { select: { full_name: true, email: true } } },
          take: 1,
        },
      },
    });
    if (company) {
      const owner = company.users[0]?.user;
      const ownerEmail = owner?.email || company.email;
      const ownerName = owner?.full_name || "Business Owner";
      sendCompanyStatusEmail(ownerName, ownerEmail, company.name, typedAction === "approve").catch(() => {});
    }
  }

  bustDirectoryCache(); // publish/unpublish changes what search should return
  return NextResponse.json({ ok: true });
}
