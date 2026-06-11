import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";

const VALID_STATUSES = ["new","viewed","responded","not_suitable","won","lost"] as const;
type Status = typeof VALID_STATUSES[number];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const quoteId = Number(id);
  if (!quoteId) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const newStatus = body.status as Status;
  if (!VALID_STATUSES.includes(newStatus)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  // Confirm this quote belongs to the user's company
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const quote = await prisma.quoteRequest.findFirst({
    where: { id: quoteId, company_id: company.id },
  });
  if (!quote) return NextResponse.json({ error: "Quote request not found." }, { status: 404 });

  await prisma.quoteRequest.update({
    where: { id: quoteId },
    data: {
      status: newStatus,
      responded_at: newStatus === "responded" ? new Date() : quote.responded_at,
    },
  });

  return NextResponse.json({ success: true });
}
