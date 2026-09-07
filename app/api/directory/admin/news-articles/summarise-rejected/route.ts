// Fill in the missing line on rejected articles.
//
// Rejected rows only ever carried a title, so the rejected tab was a wall of
// headlines with no way to tell a mistake from a genuine miss. The ingest now
// writes a reject note as it goes (lib/news-reject-note.ts); this fills in the
// backlog that came in before it did.
//
// One Claude call per batch of titles rather than one per article — these are
// the articles we decided not to publish, so they are worth a line each and not
// much more. The source pages are not fetched: nearly every rejected row links
// to a Google News redirect, which returns a shim page rather than the article,
// so the title is what there is to go on and the prompt is written for that.

import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { formatRejectNote } from "@/lib/news-reject-note";

export const maxDuration = 60;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";

// Per click. Ten titles a call keeps each response comfortably inside the
// token budget, and six calls in parallel finishes well inside the 60 seconds
// the host allows a function.
const BATCH_SIZE = 10;
const BATCHES_PER_RUN = 6;

type Row = { id: string; title: string };

async function describeBatch(rows: Row[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (!ANTHROPIC_API_KEY || !rows.length) return out;

  const list = rows.map((r, i) => `${i + 1}. ${r.title}`).join("\n");

  const prompt = `These headlines were picked up by the news feeds of an Australian remedial building publication and rejected by the classifier as off-topic. The editor is scanning the rejected list to catch anything turned away by mistake.

For each one, write a single line: what the article is about, then why it does not belong on a site covering building defects, waterproofing, concrete repair, façade and cladding work, strata defects and building regulation in Australia.

HEADLINES:
${list}

Rules: 25 words or fewer per line. Judge from the headline alone — do not invent detail it does not contain, and say "headline gives little away" where it genuinely does not. If a headline does look relevant to Australian remedial building work, say so plainly and say why, so the editor can pull it back. Do not start a line with "The article", "This" or "It".

Respond with one line per headline, numbered to match, and nothing else:
1. <line>
2. <line>`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) return out;

    const data = await res.json();
    const text: string = data.content?.[0]?.text ?? "";

    for (const line of text.split("\n")) {
      const m = line.match(/^\s*(\d+)[.)]\s*(.+)$/);
      if (!m) continue;
      const row = rows[Number(m[1]) - 1];
      const note = formatRejectNote(m[2]);
      // A mismatched number means the model renumbered the list; skip that line
      // rather than pin someone else's description to the wrong article.
      if (row && note) out.set(row.id, note);
    }
  } catch {
    return out;
  }
  return out;
}

export async function POST(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!ANTHROPIC_API_KEY)
    return NextResponse.json({ error: "ANTHROPIC_API_KEY is not configured." }, { status: 500 });

  const missing: Prisma.IndustryNewsWhereInput = {
    status: "rejected",
    OR: [{ summary: null }, { summary: "" }],
  };

  const rows = await prisma.industryNews.findMany({
    where: missing,
    orderBy: { published_date: { sort: "desc", nulls: "last" } },
    take: BATCH_SIZE * BATCHES_PER_RUN,
    select: { id: true, title: true },
  });

  if (!rows.length) {
    return NextResponse.json({ summarised: 0, failed: 0, remaining: 0 });
  }

  const batches: Row[][] = [];
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    batches.push(rows.slice(i, i + BATCH_SIZE).map((r) => ({ id: r.id, title: r.title })));
  }

  const results = await Promise.allSettled(batches.map(describeBatch));

  let summarised = 0;
  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const [id, summary] of result.value) {
      try {
        await prisma.industryNews.update({ where: { id }, data: { summary } });
        summarised++;
      } catch (err) {
        console.error("[summarise-rejected] update failed:", id, err);
      }
    }
  }

  const remaining = await prisma.industryNews.count({ where: missing });

  return NextResponse.json({
    summarised,
    failed: rows.length - summarised,
    remaining,
  });
}
