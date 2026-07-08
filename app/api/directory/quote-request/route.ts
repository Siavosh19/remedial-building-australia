import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendQuoteRequestBusinessEmail, sendQuoteRequestAdminEmail } from "@/lib/directory-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_ROLES = ["strata_manager","committee_member","building_manager","consultant","builder","owner","other"] as const;
type Role = typeof VALID_ROLES[number];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const companySlug = String(body.companySlug ?? "").trim();
  const requesterName = String(body.requesterName ?? "").trim();
  const requesterEmail = String(body.requesterEmail ?? "").trim().toLowerCase();
  const requesterPhone = body.requesterPhone ? String(body.requesterPhone).trim() : null;
  const requesterRole = VALID_ROLES.includes(body.requesterRole as Role) ? (body.requesterRole as Role) : null;
  const buildingSuburb = body.buildingSuburb ? String(body.buildingSuburb).trim() : null;
  const projectCategory = body.projectCategory ? String(body.projectCategory).trim() : null;
  const urgency = body.urgency ? String(body.urgency).trim() : null;
  const budgetRange = body.budgetRange ? String(body.budgetRange).trim() : null;
  const message = body.message ? String(body.message).trim() : null;

  if (!companySlug) return NextResponse.json({ error: "Company not specified." }, { status: 400 });
  if (!requesterName) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  if (!EMAIL_RE.test(requesterEmail)) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Please include a message." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { slug: companySlug, status: "published" },
  });
  if (!company) return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  // Quote requests are a Silver+ feature. Free (basic) listings never receive them.
  const canReceiveQuotes = company.plan_type === "claimed" || company.plan_type === "featured";
  if (!canReceiveQuotes || !company.quote_requests_enabled) {
    return NextResponse.json({ error: "This business is not currently accepting quote requests." }, { status: 403 });
  }

  const quote = await prisma.quoteRequest.create({
    data: {
      company_id: company.id,
      requester_name: requesterName,
      requester_email: requesterEmail,
      requester_phone: requesterPhone,
      requester_role: requesterRole,
      building_suburb: buildingSuburb,
      project_category: projectCategory,
      urgency,
      budget_range: budgetRange,
      message,
      status: "new",
    },
  });

  // Send notifications fire-and-forget
  sendQuoteRequestBusinessEmail(
    company.email,
    company.name,
    company.slug,
    requesterName,
    requesterEmail,
    requesterPhone,
    requesterRole,
    buildingSuburb,
    projectCategory,
    urgency,
    budgetRange,
    message,
  ).catch(() => {});

  sendQuoteRequestAdminEmail(
    company.name,
    company.slug,
    requesterName,
    requesterEmail,
    projectCategory,
    buildingSuburb,
  ).catch(() => {});

  // Mark notifications sent
  prisma.quoteRequest.update({
    where: { id: quote.id },
    data: { notified_business: true, notified_admin: true },
  }).catch(() => {});

  return NextResponse.json({ success: true });
}
