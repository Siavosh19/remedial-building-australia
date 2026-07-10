import { NextRequest, NextResponse } from "next/server";
import type { LocationState, CompanyStatus, AdminReviewStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { sendAdminNewSignupEmail, sendCompanyStatusEmail } from "@/lib/directory-email";
import { verifyAbn, abnNameMismatch } from "@/lib/abn";
import { validateAuPhone } from "@/lib/phone-au";
import { postcodeToState } from "@/lib/au-locations";
import { geocodeAU } from "@/lib/geocode";

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
  const otherCategory = String(body.otherCategory ?? "").trim();
  const state = String(body.state ?? "").trim();
  const suburb = String(body.suburb ?? "").trim();
  const postcode = String(body.postcode ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const website = String(body.website ?? "").trim();
  const businessEmail = String(body.businessEmail ?? "").trim().toLowerCase();
  const description = String(body.description ?? "").trim();

  if (!companyName) return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  if (!mainCategoryId) return NextResponse.json({ error: "Primary category is required." }, { status: 400 });
  if (!STATES.includes(state as LocationState)) return NextResponse.json({ error: "Invalid state." }, { status: 400 });
  if (!suburb) return NextResponse.json({ error: "Suburb is required." }, { status: 400 });
  if (!/^\d{4}$/.test(postcode)) return NextResponse.json({ error: "Postcode must be 4 digits." }, { status: 400 });
  if (!businessEmail || !EMAIL_RE.test(businessEmail)) return NextResponse.json({ error: "A valid business email is required." }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Short description is required." }, { status: 400 });

  // ── ABN verification (checksum, plus live ABR lookup when configured) ──────────
  const abnCheck = await verifyAbn(abn);
  if (!abnCheck.validFormat) {
    return NextResponse.json({ error: "Please enter a valid 11-digit ABN." }, { status: 400 });
  }
  if (abnCheck.status === "cancelled") {
    return NextResponse.json({ error: "This ABN is recorded as cancelled with the ABR. Please use your active ABN." }, { status: 400 });
  }
  if (abnCheck.status === "not_found") {
    return NextResponse.json({ error: "We couldn't find this ABN in the Australian Business Register. Please check it and try again." }, { status: 400 });
  }

  // ── Australian phone number ────────────────────────────────────────────────────
  const phoneCheck = validateAuPhone(phone);
  if (!phoneCheck.valid) {
    return NextResponse.json({ error: phoneCheck.message }, { status: 400 });
  }
  const phoneNational = phoneCheck.national!;

  // ── Service area (radius / entire state / Australia-wide) + geocode ─────────────
  const serviceAreaType = ["radius", "state", "nationwide"].includes(String(body.serviceAreaType))
    ? String(body.serviceAreaType)
    : "radius";
  const serviceRadiusKm = Math.min(250, Math.max(10, Number(body.serviceRadiusKm) || 50));
  const geo = geocodeAU(suburb, state, postcode);
  const serviceAreaFields = {
    service_radius_km: serviceAreaType === "radius" ? serviceRadiusKm : null,
    services_statewide: serviceAreaType === "state",
    services_nationwide: serviceAreaType === "nationwide",
    ...(geo ? { latitude: geo.latitude, longitude: geo.longitude } : {}),
  };

  // ── Suburb / postcode / state consistency (free anti-junk check) ───────────────
  const pcState = postcodeToState(postcode);
  if (pcState && pcState !== state) {
    return NextResponse.json(
      { error: `Postcode ${postcode} is in ${pcState}, not ${state}. Please check your suburb, postcode and state.` },
      { status: 400 },
    );
  }

  const existing = await prisma.company.findFirst({ where: { users: { some: { user_id: user.id } } } });
  if (existing) return NextResponse.json({ error: "You already have a company linked to this account." }, { status: 400 });

  // "Other (specify)" → file under Other / General Services and capture the
  // requested label so an admin can create/assign a proper category later.
  let resolvedCategoryId = mainCategoryId;
  let otherCategoryNote = "";
  if (mainCategoryId < 0) {
    const other = await prisma.category.findFirst({ where: { slug: "other-general-services" }, select: { id: true } });
    resolvedCategoryId = other?.id ?? 0;
    if (otherCategory) otherCategoryNote = ` Requested category (not in list): "${otherCategory}".`;
  }
  if (!resolvedCategoryId) {
    return NextResponse.json({ error: "Primary category is required." }, { status: 400 });
  }

  // ABN verified + active → business_verified trust tier; otherwise basic.
  const profileStatus = abnCheck.active ? "business_verified" : "basic";
  const nameMismatch = abnNameMismatch(abnCheck.entityName, companyName);
  const verifyNote =
    otherCategoryNote +
    (abnCheck.source === "abr"
      ? `ABN ${abn}: ${abnCheck.status.toUpperCase()}` +
        (abnCheck.entityName ? ` — registered as "${abnCheck.entityName}"` : "") +
        (abnCheck.gstRegistered ? ", GST-registered" : "") +
        (nameMismatch ? " ⚠ registered name differs from listing name" : "") +
        `. Phone verified as AU ${phoneCheck.type}.`
      : `ABN ${abn}: format/checksum OK (live ABR check not configured). Phone verified as AU ${phoneCheck.type}.`);

  // Confidence: ABN +10, Phone +15, Website +10, live-verified ABN +20.
  const confidence_score = 10 + 15 + (website ? 10 : 0) + (abnCheck.active ? 20 : 0);

  // Auto-approve: every listing that reaches this point has already cleared ABN
  // validation — a valid 11-digit checksum, plus an ACTIVE status when the live
  // ABR check is configured (cancelled / not-found ABNs were rejected above). That
  // is our "ABN confirmed" bar, so the listing is published immediately with no
  // manual review gate. The admin is still emailed for every signup, and every
  // auto-approved listing stays fully removable via the admin review queue.
  const autoApprove = abnCheck.validFormat;
  const companyStatus: CompanyStatus = autoApprove ? "published" : "draft";
  const queueStatus: AdminReviewStatus = autoApprove ? "published" : "discovered";
  const approvalNote = autoApprove
    ? "Auto-approved on submission — ABN confirmed active with the ABR."
    : "New directory listing submitted for review.";
  const claimSignals = autoApprove
    ? { listing_claim_status: "claimed" as const, claimed_at: new Date() }
    : {};

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
          phone: phoneNational || scraped.phone || null,
          website: website || scraped.website || null,
          email: businessEmail,
          description: description || scraped.description || null,
          main_category_id: resolvedCategoryId || scraped.main_category_id,
          profile_status: profileStatus,
          status: companyStatus,
          ...claimSignals,
          ...(autoApprove && scraped.plan_type !== "featured" ? { plan_type: "claimed" as const } : {}),
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
      const claimedSource = autoApprove
        ? "directory signup (claimed, auto-approved)"
        : "directory signup (claimed existing)";
      if (!scraped.admin_review_queue.length) {
        await tx.adminReviewQueue.create({
          data: {
            company_id: scraped.id,
            status: queueStatus,
            source: claimedSource,
            notes: `${approvalNote} Existing scraped listing claimed by owner via signup. ${verifyNote}`,
            ...(autoApprove ? { reviewed_at: new Date() } : {}),
          },
        });
      } else {
        await tx.adminReviewQueue.update({
          where: { id: scraped.admin_review_queue[0].id },
          data: {
            status: queueStatus,
            source: claimedSource,
            notes: `${approvalNote} Claimed by owner via signup. ${verifyNote}`,
            ...(autoApprove ? { reviewed_at: new Date() } : {}),
          },
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
        phone: phoneNational,
        email: businessEmail,
        description,
        main_category_id: resolvedCategoryId,
        status: companyStatus,
        profile_status: profileStatus,
        confidence_score,
        is_claimed: true,
        is_featured: false,
        ...claimSignals,
        ...(autoApprove ? { plan_type: "claimed" as const } : {}),
        locations: {
          create: {
            address: suburb,
            suburb,
            city: suburb,
            state: state as LocationState,
            postcode,
            ...serviceAreaFields,
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
            status: queueStatus,
            source: autoApprove ? "directory signup (auto-approved)" : "directory signup",
            notes: `${approvalNote} ${verifyNote}`,
            ...(autoApprove ? { reviewed_at: new Date() } : {}),
          },
        },
      },
    });
  }

  // Notify admin of new signup — fire and forget
  const category = await prisma.category.findUnique({ where: { id: resolvedCategoryId }, select: { name: true } });
  sendAdminNewSignupEmail(
    companyName,
    user.full_name ?? businessEmail,
    businessEmail,
    state,
    category?.name ?? "Unknown"
  ).catch(() => {});

  // Auto-approved → tell the owner their listing is live (the same confirmation
  // the admin "approve" action sends). Manual-review listings still wait for the
  // admin decision email as before.
  if (autoApprove) {
    sendCompanyStatusEmail(user.full_name ?? businessEmail, user.email, companyName, true).catch(() => {});
  }

  return NextResponse.json({ success: true, autoApproved: autoApprove });
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
  if (typeof body.facebook === "string") companyData.facebook_url = body.facebook.trim() || null;
  if (typeof body.instagram === "string") companyData.instagram_url = body.instagram.trim() || null;
  if (typeof body.linkedin === "string") companyData.linkedin_url = body.linkedin.trim() || null;
  if (typeof body.businessEmail === "string" && EMAIL_RE.test(body.businessEmail.trim())) companyData.email = body.businessEmail.trim().toLowerCase();
  if (typeof body.description === "string" && body.description.trim()) companyData.description = body.description.trim();
  if (typeof body.mainCategoryId === "number" && body.mainCategoryId > 0) companyData.main_category_id = body.mainCategoryId;

  // Self-declared profile fields — available to all tiers, including Free Listing.
  // (Quote-request access stays Silver/Gold-only and is controlled separately.)
  if (typeof body.licenceNumber === "string") companyData.licence_number = body.licenceNumber.trim() || null;
  if (typeof body.licenceType === "string") companyData.licence_type = body.licenceType.trim() || null;
  if (typeof body.insuranceDetails === "string") companyData.insurance_details = body.insuranceDetails.trim() || null;
  if (typeof body.yearEstablished === "number") companyData.year_established = body.yearEstablished;

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
    // Geocode the new/updated address so it participates in proximity ranking.
    const geo = geocodeAU(
      locationFields.suburb ? String(locationFields.suburb) : null,
      locationFields.state ? String(locationFields.state) : null,
      locationFields.postcode ? String(locationFields.postcode) : null,
    );
    if (geo) {
      locationFields.latitude = geo.latitude;
      locationFields.longitude = geo.longitude;
    }

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
          ...(geo ? { latitude: geo.latitude, longitude: geo.longitude } : {}),
        },
      });
    }
  }

  // Secondary categories — available to all tiers (incl. Free Listing).
  if (Array.isArray(body.secondaryCategoryIds)) {
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
