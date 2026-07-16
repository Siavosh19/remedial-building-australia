import { NextRequest, NextResponse } from "next/server";
import { getDirectoryUserFromRequest, comparePassword, clearDirectorySessionCookie } from "@/lib/directory-auth";
import { deleteUserAccountCascade } from "@/lib/directory-delete";

export const dynamic = "force-dynamic";

// Self-service "delete my account" — HARD deletes the user account AND every
// listing they own (full cascade), plus all account-scoped data (client profile,
// quote requests, notifications, ...). Fully removes them from the system.
// Irreversible: requires the account password as confirmation. Clears the
// session cookie on success so the now-orphaned session ends immediately.
export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const password = String(body?.password ?? "");
  if (!password) return NextResponse.json({ error: "Your password is required to confirm." }, { status: 400 });

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) return NextResponse.json({ error: "Incorrect password." }, { status: 400 });

  await deleteUserAccountCascade(user.id);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearDirectorySessionCookie());
  return res;
}
