import { prisma } from "@/lib/prisma";

/**
 * Next reference in a per-scheme series — D-001, WO-001. Sequential per scheme
 * so two schemes never share a number and a committee can quote "D-014" in a
 * conversation without ambiguity.
 */
export async function nextReference(schemeId: number, kind: "defect" | "work_order") {
  const prefix = kind === "defect" ? "D" : "WO";

  const count =
    kind === "defect"
      ? await prisma.strataDefect.count({ where: { scheme_id: schemeId } })
      : await prisma.strataWorkOrder.count({ where: { scheme_id: schemeId } });

  // Walk forward on a clash rather than trusting the count — rows can be
  // deleted, and the reference only has to be unique, not gapless.
  for (let n = count + 1; n < count + 500; n += 1) {
    const reference = `${prefix}-${String(n).padStart(3, "0")}`;
    const taken =
      kind === "defect"
        ? await prisma.strataDefect.findFirst({ where: { scheme_id: schemeId, reference }, select: { id: true } })
        : await prisma.strataWorkOrder.findFirst({ where: { scheme_id: schemeId, reference }, select: { id: true } });
    if (!taken) return reference;
  }

  return `${prefix}-${Date.now()}`;
}
