import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export async function POST(request: NextRequest) {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "supplier_user") return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const brandName = String(body.brandName ?? "").trim();
  const contactEmail = String(body.contactEmail ?? "").trim().toLowerCase();

  if (!brandName) return NextResponse.json({ error: "Brand name is required." }, { status: 400 });
  if (!contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const existing = await prisma.supplier.findFirst({ where: { users: { some: { id: user.id } } } });
  if (existing) return NextResponse.json({ error: "Supplier profile already exists." }, { status: 400 });

  const slug = `${brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`;

  await prisma.supplier.create({
    data: {
      brand_name: brandName,
      slug,
      contact_name: user.full_name ?? null,
      contact_email: contactEmail,
      billing_email: contactEmail,
      contact_phone: String(body.phone ?? "").trim() || null,
      website: String(body.website ?? "").trim() || null,
      status: "draft",
      users: { connect: { id: user.id } },
    },
  });

  await prisma.user.update({ where: { id: user.id }, data: { supplier_id: (await prisma.supplier.findFirst({ where: { slug } }))?.id } });

  return NextResponse.json({ success: true });
}
