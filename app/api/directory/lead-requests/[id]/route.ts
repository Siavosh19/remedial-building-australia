import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";

type Params = { params: Promise<{ id: string }> };

const VALID = ["pending", "contacted", "quoted", "declined", "not_suitable", "interested", "won", "not_proceeded"] as const;
type Response = (typeof VALID)[number];

// Outcomes the business may only log AFTER the client has proceeded (contacts
// exchanged). "declined" (Not interested) and "interested" are allowed before that.
const POST_CONNECTION: readonly string[] = ["quoted", "won", "not_proceeded"];

export async function PATCH(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const deliveryId = Number(id);
  if (!Number.isInteger(deliveryId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const body = await request.json().catch(() => null);
  const responseStatus = String(body?.responseStatus ?? "") as Response;
  if (!VALID.includes(responseStatus)) return NextResponse.json({ error: "Invalid response status." }, { status: 400 });

  // The delivery must belong to a company this user manages.
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { id: deliveryId, company_id: company.id },
    select: { id: true, request_id: true, client_requested_at: true },
  });
  if (!delivery) return NextResponse.json({ error: "Lead request not found." }, { status: 404 });

  // Outcome statuses are only valid once the client has proceeded with this business.
  if (POST_CONNECTION.includes(responseStatus) && !delivery.client_requested_at) {
    return NextResponse.json({ error: "You can log an outcome once the client has requested a quote from you." }, { status: 409 });
  }

  await prisma.quoteRequestDelivery.update({
    where: { id: deliveryId },
    data: {
      response_status: responseStatus,
      responded_at: responseStatus === "pending" ? null : new Date(),
    },
  });

  // Engagement advances the client's request to "responses_received".
  if (responseStatus === "interested" || responseStatus === "quoted" || responseStatus === "won") {
    await prisma.clientQuoteRequest.updateMany({
      where: { id: delivery.request_id, status: { in: ["submitted", "sent_to_businesses"] } },
      data: { status: "responses_received" },
    });
  }

  return NextResponse.json({ success: true });
}
