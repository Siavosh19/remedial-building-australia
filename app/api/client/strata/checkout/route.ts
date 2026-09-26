import { NextResponse } from "next/server";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { createCheckout } from "@/lib/strata/billing";

export async function POST(req: Request) {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const interval = body?.interval === "yearly" ? "yearly" : "monthly";

  try {
    const url = await createCheckout(user.id, interval, new URL(req.url).origin);
    if (!url) return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not start checkout.";
    console.error("[strata-billing] checkout failed:", err);
    return NextResponse.json(
      {
        error: message.includes("not configured")
          ? "Payments are not switched on for this site yet."
          : message,
      },
      { status: 502 },
    );
  }
}
