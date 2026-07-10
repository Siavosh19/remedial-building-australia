import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { validateAuPhone } from "@/lib/phone-au";

const CLIENT_TYPES = [
  "strata_manager",
  "owners_corp_rep",
  "building_manager",
  "property_owner",
  "consultant",
  "other",
] as const;

export async function PATCH(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const fullName = String(body.fullName ?? "").trim();
  const phoneInput = String(body.phone ?? "").trim();
  const companyName = String(body.companyName ?? "").trim();
  const clientType = String(body.clientType ?? "").trim();

  if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  let phone: string | null = null;
  if (phoneInput) {
    const check = validateAuPhone(phoneInput);
    if (!check.valid) return NextResponse.json({ error: check.message }, { status: 400 });
    phone = check.national!;
  }
  if (!CLIENT_TYPES.includes(clientType as (typeof CLIENT_TYPES)[number])) {
    return NextResponse.json({ error: "Please select a valid client type." }, { status: 400 });
  }

  await prisma.user.update({ where: { id: user.id }, data: { full_name: fullName, phone } });
  await prisma.clientProfile.upsert({
    where: { user_id: user.id },
    update: { client_type: clientType as (typeof CLIENT_TYPES)[number], company_name: companyName || null },
    create: { user_id: user.id, client_type: clientType as (typeof CLIENT_TYPES)[number], company_name: companyName || null },
  });

  return NextResponse.json({ success: true });
}
