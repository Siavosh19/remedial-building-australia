import { NextResponse } from "next/server";
import { sendFinishListingReminderEmail } from "@/lib/directory-email";

// TEMPORARY — one-off preview trigger for the new finish-listing reminder
// email, always sends to the owner's own inbox only. Remove once the preview
// has been reviewed.
export async function GET() {
  try {
    await sendFinishListingReminderEmail("there", "s_siavosh@yahoo.com");
    return NextResponse.json({ sent: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "send failed" },
      { status: 500 },
    );
  }
}
