import { prisma } from "@/lib/prisma";
import { REGISTERS, REGISTER_DB, type RegisterKind } from "@/lib/strata/registers";

export type SerialisedRow = { id: number } & Record<string, string | number | boolean | null>;

/**
 * Load a register and flatten it for the client: dates become yyyy-mm-dd so a
 * date input can use them directly, and everything else passes through.
 */
export async function loadRegister(schemeId: number, kind: RegisterKind): Promise<SerialisedRow[]> {
  const rows = (await REGISTER_DB[kind].list(schemeId, REGISTERS[kind].orderBy)) as Record<string, unknown>[];

  return rows.map((row) => {
    const out: Record<string, string | number | boolean | null> = { id: Number(row.id) };
    for (const [key, value] of Object.entries(row)) {
      if (key === "id") continue;
      if (value instanceof Date) out[key] = value.toISOString().slice(0, 10);
      else if (typeof value === "number" || typeof value === "boolean" || typeof value === "string") out[key] = value;
      else out[key] = null;
    }
    return out as SerialisedRow;
  });
}

/** Option lists for the reference fields, scoped to the scheme. */
export async function loadRefOptions(schemeId: number) {
  const [lots, meetings, bylaws] = await Promise.all([
    prisma.strataLot.findMany({
      where: { scheme_id: schemeId },
      orderBy: { id: "asc" },
      select: { id: true, lot_number: true, owner_name: true },
    }),
    prisma.strataMeeting.findMany({
      where: { scheme_id: schemeId },
      orderBy: { held_on: "desc" },
      select: { id: true, meeting_type: true, held_on: true },
    }),
    prisma.strataByLaw.findMany({
      where: { scheme_id: schemeId },
      orderBy: { id: "asc" },
      select: { id: true, number: true, title: true },
    }),
  ]);

  const auDate = new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" });

  return {
    lot_id: lots.map((l) => ({
      value: l.id,
      label: `Lot ${l.lot_number}${l.owner_name ? ` — ${l.owner_name}` : ""}`,
    })),
    meeting_id: meetings.map((m) => ({
      value: m.id,
      label: `${m.meeting_type} — ${auDate.format(m.held_on)}`,
    })),
    by_law_id: bylaws.map((b) => ({
      value: b.id,
      label: `${b.number ? `${b.number}. ` : ""}${b.title}`,
    })),
  };
}
