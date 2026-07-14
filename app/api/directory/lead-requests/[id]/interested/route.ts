import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { createNotification } from "@/lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// A contractor taps "Interested" on a lead card. We record the interest and
// refer them to the client (bell + push). No messaging — a straight hookup: the
// client is notified who's interested and contacts them directly.
export async function POST(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const deliveryId = Number(id);
  if (!Number.isInteger(deliveryId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true, name: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { id: deliveryId, company_id: company.id },
    select: {
      id: true,
      interested_at: true,
      request: { select: { id: true, client_user_id: true, work_category: { select: { name: true } } } },
    },
  });
  if (!delivery) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  // Idempotent — tapping again is a no-op that still returns ok.
  if (!delivery.interested_at) {
    const now = new Date();
    await prisma.quoteRequestDelivery.update({
      where: { id: deliveryId },
      data: {
        interested_at: now,
        response_status: "contacted",
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
      body: `${company.name} is interested in ${category}. Contact them to discuss.`,
      link: `/client/quote-requests/${delivery.request.id}`,
    });
  }

  return NextResponse.json({ success: true });
}
