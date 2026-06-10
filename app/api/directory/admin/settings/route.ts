import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireWriteAdmin } from "@/lib/admin-auth";

const DEFAULT_SETTINGS: Record<string, string> = {
  promotion_disclosure_text: "Some supplier products may appear as promoted or sponsored placements. Technical suitability should always be confirmed against the product TDS, project requirements, substrate condition, and applicable Australian standards.",
  max_promoted_per_category: "3",
  max_premium_per_category: "1",
  stripe_price_basic: "",
  stripe_price_promoted: "",
  stripe_price_premium: "",
  stripe_price_category_sponsor: "",
  supplier_terms_version: "1.0",
  supplier_terms_url: "",
  ai_scope_require_approval: "true",
};

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;

  const rows = await prisma.adminSetting.findMany({ orderBy: { key: "asc" } });
  const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
  for (const row of rows) settings[row.key] = row.value;

  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  const { user, error } = await requireWriteAdmin(request);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const updates = Object.entries(body as Record<string, string>);
  await Promise.all(
    updates.map(([key, value]) =>
      prisma.adminSetting.upsert({
        where: { key },
        create: { key, value: String(value), updated_by: user!.id },
        update: { value: String(value), updated_by: user!.id },
      })
    )
  );

  return NextResponse.json({ success: true });
}
