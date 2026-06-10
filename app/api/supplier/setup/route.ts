import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { sendAdminSupplierRegistrationEmail } from "@/lib/directory-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "supplier_user") return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const brandName = String(body.brandName ?? "").trim();
  const contactPerson = String(body.contactPerson ?? "").trim();
  const contactEmail = String(body.contactEmail ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const website = String(body.website ?? "").trim();
  const supplierType = String(body.supplierType ?? "").trim();
  const productCategories: string[] = Array.isArray(body.productCategories) ? body.productCategories : [];
  const serviceAreas: string[] = Array.isArray(body.serviceAreas) ? body.serviceAreas : [];
  const signupReason: string[] = Array.isArray(body.signupReason) ? body.signupReason : [];
  const abn = String(body.abn ?? "").trim() || null;
  const billingEmail = String(body.billingEmail ?? "").trim().toLowerCase() || null;
  const notes = String(body.notes ?? "").trim() || null;

  if (!brandName) return NextResponse.json({ error: "Brand name is required." }, { status: 400 });
  if (!contactPerson) return NextResponse.json({ error: "Contact person is required." }, { status: 400 });
  if (!contactEmail || !EMAIL_RE.test(contactEmail)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone is required." }, { status: 400 });
  if (!website) return NextResponse.json({ error: "Website is required." }, { status: 400 });
  if (!supplierType) return NextResponse.json({ error: "Supplier type is required." }, { status: 400 });
  if (!productCategories.length) return NextResponse.json({ error: "Select at least one product category." }, { status: 400 });
  if (!serviceAreas.length) return NextResponse.json({ error: "Select at least one service area." }, { status: 400 });
  if (!signupReason.length) return NextResponse.json({ error: "Select at least one reason for signing up." }, { status: 400 });

  const existing = await prisma.supplier.findFirst({ where: { users: { some: { id: user.id } } } });
  if (existing) return NextResponse.json({ error: "Supplier profile already exists." }, { status: 400 });

  const slug = `${brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`;

  const supplier = await prisma.supplier.create({
    data: {
      brand_name: brandName,
      slug,
      contact_name: contactPerson,
      contact_email: contactEmail,
      billing_email: billingEmail ?? contactEmail,
      contact_phone: phone,
      website,
      abn,
      supplier_type: supplierType,
      product_categories: productCategories,
      service_areas: serviceAreas,
      signup_reason: signupReason.join(", "),
      signup_notes: notes,
      status: "draft",
      users: { connect: { id: user.id } },
    },
  });

  await prisma.user.update({ where: { id: user.id }, data: { supplier_id: supplier.id } });

  // Email notification to admin — fire and forget
  sendAdminSupplierRegistrationEmail({
    brandName,
    contactPerson,
    contactEmail,
    phone,
    website,
    supplierType,
    productCategories,
    serviceAreas,
    signupReason,
    abn,
    billingEmail,
    notes,
  }).catch(() => {});

  return NextResponse.json({ success: true });
}
