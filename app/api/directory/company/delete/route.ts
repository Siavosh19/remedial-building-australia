import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest, comparePassword } from "@/lib/directory-auth";
import { deleteCompanyCascade } from "@/lib/directory-delete";

export const dynamic = "force-dynamic";

// Self-service "delete my listing" — HARD deletes the company owned by this user
// and every dependent record (locations, media, licences, subscriptions, leads,
// quote requests, ...). The user ACCOUNT is kept, so the owner can sign in and
// re-list later. Irreversible: requires the account password as confirmation.
export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const password = String(body?.password ?? "");
  if (!password) return NextResponse.json({ error: "Your password is required to confirm." }, { status: 400 });

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) return NextResponse.json({ error: "Incorrect password." }, { status: 400 });

  // Only a company this user actually OWNS can be deleted here.
  const membership = await prisma.companyUser.findFirst({
    where: { user_id: user.id, role: "owner" },
    select: { company_id: true },
  });
  if (!membership) return NextResponse.json({ error: "No listing found to delete." }, { status: 404 });

  await deleteCompanyCascade(membership.company_id);
  return NextResponse.json({ ok: true });
}
