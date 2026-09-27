import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";
import { allocateToLot, matchLine, parseStatement } from "@/lib/strata/bank";
import { logCorrespondence } from "@/lib/strata/registers";

const MAX_ROWS = 2000;

/**
 * Import a bank statement. Lines quoting a lot's payment reference are
 * receipted immediately — that is exact string matching, not inference, so it
 * needs no confirmation. Everything else is stored for a person to look at.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const csv = String(body?.csv ?? "");
  if (!csv.trim()) return NextResponse.json({ error: "Paste or choose a statement first." }, { status: 400 });

  const { lines, skipped } = parseStatement(csv);
  if (lines.length === 0) {
    return NextResponse.json(
      { error: "No transactions could be read from that. It needs a date, a description and an amount per row." },
      { status: 400 },
    );
  }
  if (lines.length > MAX_ROWS) {
    return NextResponse.json({ error: `That is ${lines.length} rows — import a shorter period.` }, { status: 400 });
  }

  const [lots, unpaid] = await Promise.all([
    prisma.strataLot.findMany({
      where: { scheme_id: access.scheme.id },
      select: { id: true, lot_number: true, owner_name: true, payment_reference: true },
    }),
    prisma.strataExpense.findMany({
      where: { scheme_id: access.scheme.id, status: { not: "paid" } },
      select: { id: true, supplier: true, amount: true },
    }),
  ]);

  const record = await prisma.strataBankImport.create({
    data: {
      scheme_id: access.scheme.id,
      filename: String(body?.filename ?? "").trim() || null,
      row_count: lines.length,
      imported_by: access.userId,
    },
  });

  let auto = 0;
  let duplicates = 0;

  // A statement row is identified by its date, description and amount. The same
  // row twice in one file, or the same file imported twice, was receipted twice
  // and silently doubled the lot's credit.
  const key = (l: { date: Date; description: string; amount: number }) =>
    `${l.date.toISOString().slice(0, 10)}|${l.description.trim().toUpperCase()}|${l.amount.toFixed(2)}`;

  const priorLines = await prisma.strataBankLine.findMany({
    where: { scheme_id: access.scheme.id },
    select: { transaction_date: true, description: true, amount: true },
  });
  const seen = new Set(
    priorLines.map((l) => key({ date: l.transaction_date, description: l.description, amount: l.amount })),
  );

  for (const line of lines) {
    const fingerprint = key(line);
    if (seen.has(fingerprint)) {
      await prisma.strataBankLine.create({
        data: {
          scheme_id: access.scheme.id,
          import_id: record.id,
          transaction_date: line.date,
          description: line.description,
          amount: line.amount,
          status: "ignored",
          note: "Already imported — skipped so it is not receipted twice",
        },
      });
      duplicates += 1;
      continue;
    }
    seen.add(fingerprint);

    const match = matchLine(line, lots, unpaid);

    const created = await prisma.strataBankLine.create({
      data: {
        scheme_id: access.scheme.id,
        import_id: record.id,
        transaction_date: line.date,
        description: line.description,
        amount: line.amount,
        lot_id: match.lotId,
        expense_id: match.expenseId,
        suggestion: match.suggestion,
        matched_by: match.matchedBy,
        status: match.matchedBy === "reference" ? "matched" : "pending",
      },
    });

    if (match.matchedBy === "reference" && match.lotId) {
      await allocateToLot({
        schemeId: access.scheme.id,
        lotId: match.lotId,
        amount: line.amount,
        receivedOn: line.date,
        reference: line.description.slice(0, 120),
        note: `Bank import #${record.id}`,
      });
      await prisma.strataBankLine.update({ where: { id: created.id }, data: { note: "Receipted automatically" } });
      auto += 1;
    }
  }

  await prisma.strataBankImport.update({ where: { id: record.id }, data: { auto_count: auto } });

  await logCorrespondence({
    schemeId: access.scheme.id,
    party: "Bank statement",
    subject: `Statement imported — ${lines.length} transactions`,
    summary: `${auto} receipted automatically by payment reference; the rest are waiting to be placed.`,
    relatesTo: "Levies",
    reference: `Import #${record.id}`,
    direction: "in",
    channel: "Import",
  });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_bank_import",
    entityId: String(record.id),
    action: "import",
    newValue: { scheme_id: access.scheme.id, rows: lines.length, auto, skipped, duplicates },
  });

  return NextResponse.json({ ok: true, id: record.id, rows: lines.length, auto, skipped, duplicates });
}
