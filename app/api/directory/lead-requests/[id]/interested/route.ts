import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { createNotification } from "@/lib/notifications";
import { dirTier } from "@/lib/directory-tier";
import { WEEKLY_INTEREST_CAP } from "@/lib/quote-options";
import { sendBusinessInterestedClientEmail } from "@/lib/directory-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

type Params = { params: Promise<{ id: string }> };

// Monday 00:00 of the current week (local server time) — the window the weekly
// interest allowance is counted against.
function startOfWeek(): Date {
  const n = new Date();
  const day = (n.getDay() + 6) % 7; // 0 = Monday
  const d = new Date(n.getFullYear(), n.getMonth(), n.getDate() - day);
  return d;
}

// A contractor taps "Interested" on a lead. Subject to a weekly allowance by tier
// (Silver 3, Gold 7). We record the interest and refer them to the client (bell +
// push). Contact details are NOT exchanged yet — that happens only once the
// client proceeds with this business (client_requested_at).
export async function POST(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const deliveryId = Number(id);
  if (!Number.isInteger(deliveryId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true, name: true, plan_type: true, phone: true, email: true, website: true, slug: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { id: deliveryId, company_id: company.id },
    select: {
      id: true,
      interested_at: true,
      request: {
        select: {
          id: true,
          client_user_id: true,
          contact_name: true,
          contact_email: true,
          work_category: { select: { name: true } },
        },
      },
    },
  });
  if (!delivery) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  // Idempotent — tapping again is a no-op that still returns ok.
  if (!delivery.interested_at) {
    // Enforce the weekly interest allowance for this tier before recording.
    const tier = dirTier(company.plan_type);
    const cap = WEEKLY_INTEREST_CAP[tier] ?? 0;
    const usedThisWeek = await prisma.quoteRequestDelivery.count({
      where: { company_id: company.id, interested_at: { gte: startOfWeek() } },
    });
    if (usedThisWeek >= cap) {
      return NextResponse.json(
        {
          error:
            cap === 0
              ? "Your plan does not include leads. Upgrade to express interest in leads."
              : `You've used all ${cap} of your ${tier === "gold" ? "Gold" : "Silver"} leads for this week. Your allowance resets on Monday.`,
          code: "weekly_cap_reached",
        },
        { status: 429 },
      );
    }

    const now = new Date();
    await prisma.quoteRequestDelivery.update({
      where: { id: deliveryId },
      data: {
        interested_at: now,
        response_status: "interested",
        responded_at: now,
      },
    });
    // Mark opened if it wasn't (separate update so a real opened_at isn't lost).
    await prisma.quoteRequestDelivery.updateMany({
      where: { id: deliveryId, opened_at: null },
      data: { opened_at: now },
    });

    // Advance the client's request so their results view reflects engagement.
    await prisma.clientQuoteRequest.updateMany({
      where: { id: delivery.request.id, status: { in: ["submitted", "sent_to_businesses"] } },
      data: { status: "responses_received" },
    });

    // Refer to the client — bell + push (best-effort inside createNotification).
    const category = delivery.request.work_category?.name ?? "your request";
    await createNotification({
      userId: delivery.request.client_user_id,
      type: "lead",
      title: "A contractor is interested",
      body: `${company.name} is interested in ${category}. Request a quote to connect and exchange contact details.`,
      link: `/client/quote-requests/${delivery.request.id}`,
    });

    // Email the client (their provided email) with the business's contact card —
    // works for portal clients AND strata-connect submitters (contact_email is
    // the real person in both). Best-effort; never fail the response on this.
    if (delivery.request.contact_email) {
      const t = dirTier(company.plan_type);
      sendBusinessInterestedClientEmail({
        to: delivery.request.contact_email,
        clientName: delivery.request.contact_name ?? "there",
        category,
        requestUrl: `${SITE_URL}/client/quote-requests/${delivery.request.id}`,
        business: {
          name: company.name,
          tier: t === "gold" ? "Gold" : t === "silver" ? "Silver" : null,
          phone: company.phone,
          email: company.email,
          website: company.website,
          profileUrl: company.slug ? `${SITE_URL}/directory/company/${company.slug}` : null,
        },
      }).catch((e) => console.error("[interested] client email failed:", e));
    }
  }

  return NextResponse.json({ success: true });
}
