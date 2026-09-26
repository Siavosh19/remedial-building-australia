import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { ask, isTopic, readAllowance, type Topic } from "@/lib/strata/ai";

/** Keep the thread short: enough for a conversation, not enough to run up a bill. */
const HISTORY_TURNS = 10;

function topicFrom(value: string | null): Topic {
  return value && isTopic(value) ? value : "overview";
}

/** The thread for this page, plus where the scheme stands on its allowance. */
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const topic = topicFrom(new URL(req.url).searchParams.get("topic"));

  const [messages, allowance] = await Promise.all([
    prisma.strataAiMessage.findMany({
      where: { scheme_id: access.scheme.id, topic },
      orderBy: { id: "asc" },
      take: 60,
      select: { id: true, role: true, content: true, created_at: true },
    }),
    readAllowance(access.scheme.id),
  ]);

  return NextResponse.json({ messages, allowance });
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  const question = String(body?.question ?? "").trim();
  if (!question) return NextResponse.json({ error: "Ask something first." }, { status: 400 });
  if (question.length > 4000) {
    return NextResponse.json({ error: "That question is too long." }, { status: 400 });
  }

  const topic = topicFrom(String(body?.topic ?? ""));

  // Hard stop, checked before the call rather than after it.
  const allowance = await readAllowance(access.scheme.id);
  if (allowance.exhausted) {
    return NextResponse.json(
      {
        error:
          "This scheme has used its AI allowance for the month. Everything else in the workspace keeps working — the allowance resets at the start of next month.",
        allowance,
      },
      { status: 429 },
    );
  }

  const priorRows = await prisma.strataAiMessage.findMany({
    where: { scheme_id: access.scheme.id, topic },
    orderBy: { id: "desc" },
    take: HISTORY_TURNS * 2,
    select: { role: true, content: true },
  });
  const history = priorRows
    .reverse()
    .map((m) => ({ role: m.role === "assistant" ? ("assistant" as const) : ("user" as const), content: m.content }));

  let result;
  try {
    result = await ask({
      schemeId: access.scheme.id,
      topic,
      authority: access.labels.authority,
      history,
      question,
    });
  } catch (err) {
    console.error("[strata-ai] request failed:", err);
    return NextResponse.json(
      { error: err instanceof Error && err.message.includes("not configured") ? err.message : "The assistant could not answer just then. Try again." },
      { status: 502 },
    );
  }

  await prisma.strataAiMessage.createMany({
    data: [
      { scheme_id: access.scheme.id, topic, role: "user", content: question, user_id: access.userId },
      {
        scheme_id: access.scheme.id,
        topic,
        role: "assistant",
        content: result.reply,
        input_tokens: result.inputTokens,
        output_tokens: result.outputTokens,
      },
    ],
  });

  return NextResponse.json({ reply: result.reply, allowance: await readAllowance(access.scheme.id) });
}

/** Clear this page's thread. */
export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const topic = topicFrom(new URL(req.url).searchParams.get("topic"));
  await prisma.strataAiMessage.deleteMany({ where: { scheme_id: access.scheme.id, topic } });

  return NextResponse.json({ ok: true });
}
