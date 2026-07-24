import { NextRequest, NextResponse } from "next/server";
import { sendVerificationReminderEmail } from "@/lib/directory-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// TEMPORARY self-test endpoint — sends the three verification-reminder samples
// (stages 1/2/3) to the site owner ONLY. Guarded by a one-off key and a
// hard-coded recipient, so it can't be used as an open email relay. This whole
// file is removed in the go-live deploy once the copy is approved.
const TEST_KEY = "rmd-selftest-a7c19e42bf";
const OWNER = "s_siavosh@yahoo.com";

async function run(request: NextRequest) {
  const k = new URL(request.url).searchParams.get("k");
  if (k !== TEST_KEY) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const token = "PREVIEW_TOKEN"; // placeholder link — this is only a design test
  const results: Array<{ stage: number; ok: boolean; error?: string }> = [];
  for (const stage of [1, 2, 3]) {
    try {
      await sendVerificationReminderEmail("Epoxy Floors Shepparton", OWNER, token, stage);
      results.push({ stage, ok: true });
    } catch (e) {
      results.push({ stage, ok: false, error: e instanceof Error ? e.message : String(e) });
    }
  }
  return NextResponse.json({ sentTo: OWNER, results });
}

export async function GET(request: NextRequest) {
  return run(request);
}
export async function POST(request: NextRequest) {
  return run(request);
}
