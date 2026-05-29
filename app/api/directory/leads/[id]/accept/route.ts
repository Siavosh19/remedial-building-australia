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

  // Verify the requesting user owns a company that received this lead delivery
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) return NextResponse.json({ error: "No company found." }, { status: 403 });

  const delivery = await prisma.leadDelivery.findFirst({
    where: { id: leadDeliveryId, company_id: company.id },
    include: { lead: true },
  });
  if (!delivery) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  const now = new Date();
  await prisma.leadDelivery.update({
    where: { id: leadDeliveryId },
    data: {
      response_status: "accepted",
      responded_at: now,
      opened_at: delivery.opened_at ?? now,
    },
  });

  // Return full contact details
  return NextResponse.json({
    success: true,
    contact: {
      name: delivery.lead.submitted_by_name,
      email: delivery.lead.submitted_by_email,
      phone: delivery.lead.submitted_by_phone,
    },
  });
}
