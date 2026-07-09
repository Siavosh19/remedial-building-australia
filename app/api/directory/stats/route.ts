import { NextResponse } from "next/server";
import { getActiveBusinessCount, formatBusinessCount } from "@/lib/directory-stats";

// Public directory stats — the single DB-backed count of active businesses.
export async function GET() {
  try {
    const total = await getActiveBusinessCount();
    return NextResponse.json({ total, label: formatBusinessCount(total) });
  } catch {
    return NextResponse.json({ total: null, label: null }, { status: 200 });
  }
}
