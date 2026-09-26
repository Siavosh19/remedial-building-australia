import { NextResponse } from "next/server";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { REGISTER_DB, isRegisterKind, parseRegisterBody, resolveRefs } from "@/lib/strata/registers";

type Ctx = { params: Promise<{ id: string; kind: string; recordId: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id, kind, recordId } = await ctx.params;
  if (!isRegisterKind(kind)) return NextResponse.json({ error: "Unknown register." }, { status: 404 });

  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await REGISTER_DB[kind].find(access.scheme.id, Number(recordId));
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // A full form submit sends every field; a one-tap toggle sends only what it
  // changes. `partial` tells the parser which of the two it is looking at.
  const partial = body.__partial === true;
  const data = {
    ...parseRegisterBody(kind, body, partial),
    ...(await resolveRefs(access.scheme.id, kind, body, partial)),
  };

  await REGISTER_DB[kind].update(existing.id, data);

  await createAuditLog({
    actorId: access.userId,
    entityType: `strata_${kind}`,
    entityId: String(existing.id),
    action: "update",
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, kind, recordId } = await ctx.params;
  if (!isRegisterKind(kind)) return NextResponse.json({ error: "Unknown register." }, { status: 404 });

  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const existing = await REGISTER_DB[kind].find(access.scheme.id, Number(recordId));
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await REGISTER_DB[kind].remove(existing.id);

  await createAuditLog({
    actorId: access.userId,
    entityType: `strata_${kind}`,
    entityId: String(existing.id),
    action: "delete",
  });

  return NextResponse.json({ ok: true });
}
