import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const leadDeliveryId = Number(id);
  if (!leadDeliveryId) return NextResponse.json({ error: "Invalid lead ID." }, { status: 400 });

  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) return NextResponse.json({ error: "No company found." }, { status: 403 });

  const delivery = await prisma.leadDelivery.findFirst({
    where: { id: leadDeliveryId, company_id: company.id },
  });
  if (!delivery) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  await prisma.leadDelivery.update({
    where: { id: leadDeliveryId },
    data: {
      response_status: "declined",
      responded_at: new Date(),
    },
  });

  // Note: leads_received_this_month is NOT decremented on decline

  return NextResponse.json({ success: true });
}
