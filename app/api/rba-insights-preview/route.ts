import { NextRequest, NextResponse } from "next/server";
import { marked } from "marked";

export async function POST(request: NextRequest) {
  const { markdown } = await request.json().catch(() => ({ markdown: "" }));
  const html = await marked(String(markdown ?? ""), { async: false });
  return NextResponse.json({ html });
}
