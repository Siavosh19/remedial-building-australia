import { NextRequest, NextResponse } from "next/server";
import type { LocationState } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { matchAndDeliverLead } from "@/lib/directory-leads";
import { sendLeadConfirmationEmail } from "@/lib/directory-email";

const STATES: LocationState[] = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const VALID_URGENCY = ["emergency", "within_week", "within_month", "planning"] as const;
const VALID_BUDGET = ["under_5k", "5k_20k", "20k_100k", "100k_plus", null] as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const suburb = String(body.suburb ?? "").trim();
  const postcode = String(body.postcode ?? "").trim();
  const state = String(body.state ?? "").trim() as LocationState;
  const categoryId = Number(body.categoryId ?? 0);
  const description = String(body.description ?? "").trim();
  const urgency = String(body.urgency ?? "") as typeof VALID_URGENCY[number];
  const budgetRange = body.budgetRange ? String(body.budgetRange) : null;

  if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  if (!suburb) return NextResponse.json({ error: "Suburb is required." }, { status: 400 });
  if (!postcode) return NextResponse.json({ error: "Postcode is required." }, { status: 400 });
  if (!STATES.includes(state)) return NextResponse.json({ error: "Valid state required." }, { status: 400 });
  if (!categoryId) return NextResponse.json({ error: "Category is required." }, { status: 400 });
  if (description.length < 50) return NextResponse.json({ error: "Description must be at least 50 characters." }, { status: 400 });
  if (!(VALID_URGENCY as readonly string[]).includes(urgency)) return NextResponse.json({ error: "Valid urgency required." }, { status: 400 });
  if (budgetRange !== null && !(VALID_BUDGET as readonly (string | null)[]).includes(budgetRange))
    return NextResponse.json({ error: "Invalid budget range." }, { status: 400 });

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) return NextResponse.json({ error: "Invalid category." }, { status: 400 });

  const lead = await prisma.lead.create({
    data: {
      lead_type: "quote_request",
      status: "new",
      submitted_by_name: fullName,
      submitted_by_email: email,
      submitted_by_phone: phone,
      suburb,
      postcode,
      state,
      category_id: categoryId,
      description,
      urgency,
      budget_range: budgetRange,
    },
  });

  // Fire-and-forget matching — don't block the response
  matchAndDeliverLead(lead.id).catch(() => {});

  // Send confirmation email
  await sendLeadConfirmationEmail(fullName, email).catch(() => {});

  return NextResponse.json({ success: true });
}
