import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

// ─────────────────────────────────────────────────────────────────────────────
// Hard-delete helpers for self-service listing / account removal.
//
// The schema deliberately has NO ON DELETE CASCADE on the company_id / user_id
// foreign keys (they are RESTRICT), so a company or user cannot be deleted while
// child rows exist. These helpers remove every dependent row in FK-safe order,
// inside a single transaction, and best-effort clean up external side effects
// (Stripe subscription, Supabase storage blobs) which cannot live in a DB txn.
//
// IRREVERSIBLE. Callers must authenticate + confirm before invoking.
// ─────────────────────────────────────────────────────────────────────────────

// Delete every uploaded blob for a company from the public "directory-media"
// bucket. Files are stored under "<companyId>/…" (see /api/directory/upload).
// Best-effort: storage failures never block the DB deletion.
async function deleteCompanyStorage(companyId: number) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    const prefix = String(companyId);
    const { data, error } = await supabaseAdmin.storage.from("directory-media").list(prefix);
    if (error || !data?.length) return;
    const paths = data.map((f) => `${prefix}/${f.name}`);
    await supabaseAdmin.storage.from("directory-media").remove(paths);
  } catch {
    /* best-effort — a leftover blob is harmless and never blocks deletion */
  }
}

// Cancel the live Stripe subscription for a company immediately (not at period
// end — the listing is going away now). Best-effort: never blocks deletion.
async function cancelCompanyStripe(companyId: number) {
  if (!stripe) return;
  try {
    const sub = await prisma.directorySubscription.findUnique({
      where: { company_id: companyId },
      select: { stripe_subscription_id: true },
    });
    if (sub?.stripe_subscription_id) {
      await stripe.subscriptions.cancel(sub.stripe_subscription_id).catch(() => {});
    }
  } catch {
    /* best-effort */
  }
}

// Hard-delete a company and ALL of its dependent rows. Handles external side
// effects (Stripe, storage) first, then removes DB rows in one transaction.
export async function deleteCompanyCascade(companyId: number) {
  await cancelCompanyStripe(companyId);
  await deleteCompanyStorage(companyId);

  await prisma.$transaction([
    prisma.adminReviewQueue.deleteMany({ where: { company_id: companyId } }),
    prisma.leadDelivery.deleteMany({ where: { company_id: companyId } }),
    prisma.leadSubscription.deleteMany({ where: { company_id: companyId } }),
    prisma.companyTag.deleteMany({ where: { company_id: companyId } }),
    prisma.companyCategory.deleteMany({ where: { company_id: companyId } }),
    prisma.companyUser.deleteMany({ where: { company_id: companyId } }),
    prisma.licence.deleteMany({ where: { company_id: companyId } }),
    prisma.location.deleteMany({ where: { company_id: companyId } }),
    prisma.claimRequest.deleteMany({ where: { company_id: companyId } }),
    prisma.quoteRequest.deleteMany({ where: { company_id: companyId } }),
    prisma.quoteRequestDelivery.deleteMany({ where: { company_id: companyId } }),
    prisma.companyMedia.deleteMany({ where: { company_id: companyId } }),
    prisma.directorySubscription.deleteMany({ where: { company_id: companyId } }),
    prisma.company.delete({ where: { id: companyId } }),
  ]);
}

// Hard-delete a user account and everything tied to it. Any company the user
// OWNS is fully removed via deleteCompanyCascade; memberships of companies owned
// by someone else are simply unlinked. Runs company deletions first (they have
// their own txn + external side effects), then removes the user-scoped rows.
export async function deleteUserAccountCascade(userId: number) {
  const ownedCompanies = await prisma.companyUser.findMany({
    where: { user_id: userId, role: "owner" },
    select: { company_id: true },
  });
  for (const { company_id } of ownedCompanies) {
    await deleteCompanyCascade(company_id);
  }

  // Optional back-references are ON DELETE SET NULL at the DB level, but null
  // them explicitly so the operation is robust regardless of constraint drift.
  await prisma.companyCategory.updateMany({ where: { approved_by: userId }, data: { approved_by: null } });
  await prisma.adminReviewQueue.updateMany({ where: { reviewed_by: userId }, data: { reviewed_by: null } });
  await prisma.auditLog.updateMany({ where: { actor_id: userId }, data: { actor_id: null } });

  await prisma.$transaction([
    // Cascades its own deliveries + files (ON DELETE CASCADE on request_id).
    prisma.clientQuoteRequest.deleteMany({ where: { client_user_id: userId } }),
    prisma.clientProfile.deleteMany({ where: { user_id: userId } }),
    prisma.aIScopeUser.deleteMany({ where: { user_id: userId } }),
    // Any remaining memberships (companies owned by others where user was staff).
    prisma.companyUser.deleteMany({ where: { user_id: userId } }),
    // Soft Int references (no FK) — cleaned for completeness.
    prisma.claimRequest.deleteMany({ where: { user_id: userId } }),
    prisma.termsAcceptance.deleteMany({ where: { user_id: userId } }),
    // notifications + push_subscriptions + jobs cascade; job_payments.user → null.
    prisma.user.delete({ where: { id: userId } }),
  ]);
}
