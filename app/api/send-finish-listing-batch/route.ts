import { NextRequest, NextResponse } from "next/server";
import { sendFinishListingReminderEmail } from "@/lib/directory-email";

// TEMPORARY — one-off batch send of the finish-listing reminder to the
// vetted list of accounts that signed up but never created a listing
// (checked 2026-09-23: role=company_owner, no company_users row, and no
// companies row matching their signup email either — excludes internal
// test accounts and the one case where a listing existed but its
// ownership link was missing). Remove this route after the send.
const RECIPIENTS: { email: string; name: string }[] = [
  { email: "info@northernbeachesgardenandtrees.com.au", name: "Northern Beaches Garden & Trees" },
  { email: "marioguttercleanings@gmail.com", name: "Mario's Gutter Cleaning" },
  { email: "patrickholden.94@gmail.com", name: "Fresh Water Damage Sydney" },
  { email: "mycigsaustralia2024@gmail.com", name: "My Cigs Australia" },
  { email: "hasscaff.au@gmail.com", name: "Hasscaff Scaffolding" },
  { email: "firewoodperth22@gmail.com", name: "JJ's Firewood Perth" },
  { email: "trytobugi41@gmail.com", name: "Mark Steve" },
  { email: "behsudpainting@gmail.com", name: "Behsud Painting" },
  { email: "carlinecranbourne@gmail.com", name: "Carline Automotive & Exhaust Cranbourne" },
  { email: "admin@tailoredsolutions.com.au", name: "Tailored Solutions QLD" },
  { email: "caseybuildingconsultant@gmail.com", name: "Ranjit Sangha" },
  { email: "ntbugbusters1@gmail.com", name: "Noah Anderson" },
  { email: "aonekoreanpaintings@gmail.com", name: "A One Korean Painting" },
  { email: "arahmanfehmi@gmail.com", name: "AMA Concrete" },
  { email: "justtileit56@gmail.com", name: "Just Tile It" },
  { email: "pikaid448@gmail.com", name: "Epoxy Floors Shepparton" },
  { email: "andi@anoroc.co.nz", name: "Andi Burrell" },
  { email: "blissgiftshomewares@gmail.com", name: "naheda mansuri" },
];

// One-time random key, known only to this trigger call — not a real secrets
// system, just enough to stop the route being fired by anyone stumbling onto
// the URL in the few minutes it's live before removal.
const KEY = "7f2b9e4c1a8d4f6091b7c3e5a9d2f048";

export async function GET(request: NextRequest) {
  const key = new URL(request.url).searchParams.get("key");
  if (key !== KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: { email: string; ok: boolean; error?: string }[] = [];
  for (const r of RECIPIENTS) {
    try {
      await sendFinishListingReminderEmail(r.name, r.email);
      results.push({ email: r.email, ok: true });
    } catch (err) {
      results.push({ email: r.email, ok: false, error: err instanceof Error ? err.message : "send failed" });
    }
  }

  const sent = results.filter((r) => r.ok).length;
  return NextResponse.json({ sent, total: RECIPIENTS.length, results });
}
