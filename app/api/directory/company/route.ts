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

  // Check if a scraped (unclaimed) company already exists with matching email or name
  const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const scraped = await prisma.company.findFirst({
    where: {
      is_claimed: false,
      users: { none: {} },
      OR: [
        { email: businessEmail },
        { name: { equals: companyName, mode: "insensitive" } },
      ],
    },
    include: { admin_review_queue: { take: 1 } },
  });

  if (scraped) {
    // Claim the existing scraped record
    await prisma.$transaction(async (tx) => {
      await tx.company.update({
        where: { id: scraped.id },
        data: {
          is_claimed: true,
          abn: abn || scraped.abn || null,
          phone: phone || scraped.phone || null,
          website: website || scraped.website || null,
          email: businessEmail,
          description: description || scraped.description || null,
          main_category_id: mainCategoryId || scraped.main_category_id,
          status: "draft",
        },
      });
      await tx.companyUser.create({
        data: {
          company_id: scraped.id,
          user_id: user.id,
          role: "owner",
          is_primary: true,
          invited_at: new Date(),
          accepted_at: new Date(),
        },
      });
      if (!scraped.admin_review_queue.length) {
        await tx.adminReviewQueue.create({
          data: {
            company_id: scraped.id,
            status: "discovered",
            source: "directory signup (claimed existing)",
            notes: "Existing scraped listing claimed by owner via signup.",
          },
        });
      } else {
        await tx.adminReviewQueue.update({
          where: { id: scraped.admin_review_queue[0].id },
          data: { status: "discovered", source: "directory signup (claimed existing)", notes: "Claimed by owner via signup." },
        });
      }
    });
  } else {
    // Create new company — user is the owner so mark claimed immediately
    await prisma.company.create({
      data: {
        slug: `${normalise(companyName)}-${Date.now()}`,
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
        is_claimed: true,
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
  }

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

  // Only claimed/featured profiles can edit all fields
  const isClaimed = company.plan_type !== "basic";

  const companyData: Record<string, unknown> = {};
  if (typeof body.companyName === "string" && body.companyName.trim()) companyData.name = body.companyName.trim();
  if (typeof body.phone === "string" && body.phone.trim()) companyData.phone = body.phone.trim();
  if (typeof body.website === "string") companyData.website = body.website.trim() || null;
  if (typeof body.businessEmail === "string" && EMAIL_RE.test(body.businessEmail.trim())) companyData.email = body.businessEmail.trim().toLowerCase();
  if (typeof body.description === "string" && body.description.trim()) companyData.description = body.description.trim();
  if (typeof body.mainCategoryId === "number" && body.mainCategoryId > 0) companyData.main_category_id = body.mainCategoryId;

  // Claimed/Featured-only fields
  if (isClaimed) {
    if (typeof body.licenceNumber === "string") companyData.licence_number = body.licenceNumber.trim() || null;
    if (typeof body.licenceType === "string") companyData.licence_type = body.licenceType.trim() || null;
    if (typeof body.insuranceDetails === "string") companyData.insurance_details = body.insuranceDetails.trim() || null;
    if (typeof body.yearEstablished === "number") companyData.year_established = body.yearEstablished;
  }

  if (Object.keys(companyData).length > 0) {
    await prisma.company.update({ where: { id: company.id }, data: companyData });
  }

  const locationId = company.locations[0]?.id;
  const locationFields: Record<string, unknown> = {};
  if (typeof body.suburb === "string" && body.suburb.trim()) {
    locationFields.suburb = body.suburb.trim();
    locationFields.address = body.suburb.trim();
    locationFields.city = body.suburb.trim();
  }
  if (typeof body.postcode === "string" && body.postcode.trim()) locationFields.postcode = body.postcode.trim();
  if (typeof body.state === "string" && STATES.includes(body.state as LocationState)) locationFields.state = body.state as LocationState;

  if (Object.keys(locationFields).length > 0) {
    if (locationId) {
      await prisma.location.update({ where: { id: locationId }, data: locationFields });
    } else if (locationFields.state && locationFields.postcode) {
      await prisma.location.create({
        data: {
          company_id: company.id,
          address: String(locationFields.suburb ?? locationFields.state),
          suburb: locationFields.suburb ? String(locationFields.suburb) : null,
          city: locationFields.suburb ? String(locationFields.suburb) : null,
          state: locationFields.state as LocationState,
          postcode: String(locationFields.postcode),
        },
      });
    }
  }

  // Secondary categories (Claimed/Featured only)
  if (isClaimed && Array.isArray(body.secondaryCategoryIds)) {
    const ids = (body.secondaryCategoryIds as unknown[]).map(Number).filter((n) => n > 0 && n !== company.main_category_id);
    // Remove deselected
    await prisma.companyCategory.deleteMany({
      where: { company_id: company.id, is_primary: false, category_id: { notIn: ids } },
    });
    // Add new ones (upsert not available on composite, use findFirst + create)
    for (const catId of ids) {
      const exists = await prisma.companyCategory.findFirst({ where: { company_id: company.id, category_id: catId } });
      if (!exists) {
        await prisma.companyCategory.create({
          data: { company_id: company.id, category_id: catId, is_primary: false, is_approved: true },
        });
      }
    }
  }

  return NextResponse.json({ success: true });
}
