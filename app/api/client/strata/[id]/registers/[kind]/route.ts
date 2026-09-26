import { NextResponse } from "next/server";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { REGISTERS, REGISTER_DB, isRegisterKind, parseRegisterBody, resolveRefs } from "@/lib/strata/registers";

/** Create a record in any of the scheme registers. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string; kind: string }> }) {
  const { id, kind } = await ctx.params;
  if (!isRegisterKind(kind)) return NextResponse.json({ error: "Unknown register." }, { status: 404 });

  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const def = REGISTERS[kind];
  for (const field of def.fields) {
    if (!field.required) continue;
    const value = body[field.name];
    if (value === undefined || value === null || String(value).trim() === "") {
      return NextResponse.json({ error: `${field.label} is needed.` }, { status: 400 });
    }
  }

  const data = {
    ...parseRegisterBody(kind, body, false),
    ...(await resolveRefs(access.scheme.id, kind, body, false)),
  };

  const created = await REGISTER_DB[kind].create(access.scheme.id, data);

  await createAuditLog({
    actorId: access.userId,
    entityType: `strata_${kind}`,
    entityId: String(created.id),
    action: "create",
    newValue: { scheme_id: access.scheme.id },
  });

  return NextResponse.json({ ok: true, id: created.id });
}
