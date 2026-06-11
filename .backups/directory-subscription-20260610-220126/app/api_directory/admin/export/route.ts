import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v).replace(/"/g, '""');
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
  };
  return [headers.join(","), ...rows.map(r => headers.map(h => escape(r[h])).join(","))].join("\n");
}

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const type = new URL(request.url).searchParams.get("type") ?? "";

  let csv = "";
  let filename = "export.csv";

  if (type === "newsletter") {
    const rows = await prisma.$queryRaw<Record<string, unknown>[]>`SELECT name, email, interest_category, subscribed_at FROM newsletter_subscribers ORDER BY subscribed_at DESC`;
    csv = toCSV(rows);
    filename = "newsletter-subscribers.csv";

  } else if (type === "directory") {
    const rows = await prisma.company.findMany({
      select: { name: true, email: true, phone: true, website: true, abn: true, status: true, is_claimed: true, created_at: true, main_category: { select: { name: true } }, locations: { select: { suburb: true, state: true, postcode: true }, take: 1 } },
      orderBy: { created_at: "desc" },
    });
    csv = toCSV(rows.map(r => ({ name: r.name, email: r.email, phone: r.phone ?? "", website: r.website ?? "", abn: r.abn ?? "", category: r.main_category?.name ?? "", suburb: r.locations[0]?.suburb ?? "", state: r.locations[0]?.state ?? "", postcode: r.locations[0]?.postcode ?? "", status: r.status, is_claimed: r.is_claimed, created_at: r.created_at })));
    filename = "directory-signups.csv";

  } else if (type === "suppliers") {
    const rows = await prisma.supplier.findMany({ orderBy: { created_at: "desc" } });
    csv = toCSV(rows.map(r => ({ id: r.id, brand_name: r.brand_name, slug: r.slug, contact_email: r.contact_email ?? "", contact_name: r.contact_name ?? "", website: r.website ?? "", status: r.status, payment_status: r.payment_status, current_plan: r.current_plan ?? "", created_at: r.created_at })));
    filename = "suppliers.csv";

  } else if (type === "supplier-products") {
    const rows = await prisma.supplierProduct.findMany({ include: { supplier: { select: { brand_name: true } } }, orderBy: { created_at: "desc" } });
    csv = toCSV(rows.map(r => ({ id: r.id, supplier: r.supplier.brand_name, product_name: r.product_name, category: r.product_category ?? "", status: r.status, promotion_tier: r.promotion_tier, promotion_status: r.promotion_status, payment_status: r.payment_status, monthly_fee: r.monthly_fee ?? "", tds_url: r.tds_url ?? "", created_at: r.created_at })));
    filename = "supplier-products.csv";

  } else if (type === "ai-scope-users") {
    const rows = await prisma.aIScopeUser.findMany({ include: { user: { select: { email: true, full_name: true } } }, orderBy: { created_at: "desc" } });
    csv = toCSV(rows.map(r => ({ id: r.id, email: r.user.email, name: r.user.full_name ?? "", company: r.company ?? "", job_role: r.job_role ?? "", status: r.status, plan_type: r.plan_type ?? "", scopes_created: r.scopes_created, created_at: r.created_at, approved_at: r.approved_at ?? "" })));
    filename = "ai-scope-users.csv";

  } else {
    return NextResponse.json({ error: "Invalid type. Use: newsletter, directory, suppliers, supplier-products, ai-scope-users" }, { status: 400 });
  }

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
