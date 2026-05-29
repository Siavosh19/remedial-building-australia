import { NextRequest, NextResponse } from "next/server";
import type { LocationState } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { sendAdminNewSignupEmail } from "@/lib/directory-email";

const ABN_RE = /^\d{11}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATES: LocationState[] = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const companyName = String(body.companyName ?? "").trim();
  const abn = String(body.abn ?? "").trim();
  const mainCategoryId = Number(body.mainCategoryId ?? 0);
  const state = String(body.state ?? "").trim();
  const suburb = String(body.suburb ?? "").trim();
  const postcode = String(body.postcode ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const website = String(body.website ?? "").trim();
  const businessEmail = String(body.businessEmail ?? "").trim().toLowerCase();
  const description = String(body.description ?? "").trim();

  if (!companyName) return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  if (!ABN_RE.test(abn)) return NextResponse.json({ error: "ABN must be 11 digits." }, { status: 400 });
  if (!mainCategoryId) return NextResponse.json({ error: "Primary category is required." }, { status: 400 });
  if (!STATES.includes(state as LocationState)) return NextResponse.json({ error: "Invalid state." }, { status: 400 });
  if (!suburb) return NextResponse.json({ error: "Suburb is required." }, { status: 400 });
  if (!postcode) return NextResponse.json({ error: "Postcode is required." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  if (!businessEmail || !EMAIL_RE.test(businessEmail)) return NextResponse.json({ error: "A valid business email is required." }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Short description is required." }, { status: 400 });

  const existing = await prisma.company.findFirst({ where: { users: { some: { user_id: user.id } } } });
  if (existing) return NextResponse.json({ error: "You already have a company linked to this account." }, { status: 400 });

  const confidence_score = 10 + 15 + (website ? 10 : 0); // ABN +10, Phone +15, Website +10

  await prisma.company.create({
    data: {
      slug: `${companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`,
      name: companyName,
      abn,
      website: website || null,
      phone,
      email: businessEmail,
      description,
      main_category_id: mainCategoryId,
      status: "draft",
      profile_status: "basic",
      confidence_score,
      is_claimed: false,
      is_featured: false,
      locations: {
        create: {
          address: suburb,
          suburb,
          city: suburb,
          state: state as LocationState,
          postcode,
        },
      },
      users: {
        create: {
          user_id: user.id,
          role: "owner",
          is_primary: true,
          invited_at: new Date(),
          accepted_at: new Date(),
        },
      },
      lead_subscriptions: {
        create: {
          is_active: false,
          plan: "free",
          categories_subscribed: [],
          states_subscribed: [],
          max_leads_per_month: 0,
          leads_received_this_month: 0,
        },
      },
      admin_review_queue: {
        create: {
          status: "discovered",
          source: "directory signup",
          notes: "New directory listing submitted for review.",
        },
      },
    },
  });

  // Notify admin of new signup — fire and forget
  const category = await prisma.category.findUnique({ where: { id: mainCategoryId }, select: { name: true } });
  sendAdminNewSignupEmail(
    companyName,
    user.full_name ?? businessEmail,
    businessEmail,
    state,
    category?.name ?? "Unknown"
  ).catch(() => {});

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    include: { locations: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const companyData: Record<string, unknown> = {};
  if (typeof body.companyName === "string" && body.companyName.trim()) companyData.name = body.companyName.trim();
  if (typeof body.phone === "string" && body.phone.trim()) companyData.phone = body.phone.trim();
  if (typeof body.website === "string") companyData.website = body.website.trim() || null;
  if (typeof body.businessEmail === "string" && EMAIL_RE.test(body.businessEmail.trim())) companyData.email = body.businessEmail.trim().toLowerCase();
  if (typeof body.description === "string" && body.description.trim()) companyData.description = body.description.trim();
  if (typeof body.mainCategoryId === "number" && body.mainCategoryId > 0) companyData.main_category_id = body.mainCategoryId;

  if (Object.keys(companyData).length > 0) {
    await prisma.company.update({ where: { id: company.id }, data: companyData });
  }

  const locationId = company.locations[0]?.id;
  if (locationId) {
    const locationData: Record<string, unknown> = {};
    if (typeof body.suburb === "string" && body.suburb.trim()) {
      locationData.suburb = body.suburb.trim();
      locationData.address = body.suburb.trim();
      locationData.city = body.suburb.trim();
    }
    if (typeof body.postcode === "string" && body.postcode.trim()) locationData.postcode = body.postcode.trim();
    if (typeof body.state === "string" && STATES.includes(body.state as LocationState)) locationData.state = body.state as LocationState;

    if (Object.keys(locationData).length > 0) {
      await prisma.location.update({ where: { id: locationId }, data: locationData });
    }
  }

  return NextResponse.json({ success: true });
}
