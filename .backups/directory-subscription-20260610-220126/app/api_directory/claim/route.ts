import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createAuthToken } from "@/lib/directory-auth";
import { sendDirectoryVerificationEmail } from "@/lib/directory-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const slug = String(body.slug ?? "").trim();
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");

  if (!slug) return NextResponse.json({ error: "Company not specified." }, { status: 400 });
  if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

  const company = await prisma.company.findUnique({ where: { slug, status: "published" } });
  if (!company) return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  if (company.is_claimed) return NextResponse.json({ error: "This listing has already been claimed." }, { status: 409 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already registered. Please log in instead." }, { status: 400 });

  const password_hash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password_hash,
      full_name: fullName,
      phone,
      role: "company_owner",
      is_verified: false,
    },
  });

  // Link user to company and mark as claimed
  await prisma.$transaction([
    prisma.companyUser.create({
      data: {
        company_id: company.id,
        user_id: user.id,
        role: "owner",
        is_primary: true,
        accepted_at: new Date(),
      },
    }),
    prisma.company.update({
      where: { id: company.id },
      data: {
        is_claimed: true,
        profile_status: "claimed",
      },
    }),
  ]);

  const verificationToken = createAuthToken(user.id, "email_verification");
  await sendDirectoryVerificationEmail(fullName, email, verificationToken);

  return NextResponse.json({ success: true });
}
