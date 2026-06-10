import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createAuthToken } from "@/lib/directory-auth";
import { sendDirectoryVerificationEmail, sendAdminSignupNotification } from "@/lib/directory-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const accountType = String(body.accountType ?? "").trim();
  if (!["directory", "supplier", "ai_scope"].includes(accountType)) {
    return NextResponse.json({ error: "Invalid account type." }, { status: 400 });
  }

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");
  const company = String(body.company ?? "").trim();
  const jobRole = String(body.jobRole ?? "").trim();

  if (!fullName) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
  if ((accountType === "supplier" || accountType === "ai_scope") && !company) {
    return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  }
  if (accountType === "ai_scope" && !jobRole) {
    return NextResponse.json({ error: "Job role is required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email is already registered." }, { status: 400 });

  const password_hash = await hashPassword(password);

  const roleMap = {
    directory: "company_owner",
    supplier: "supplier_user",
    ai_scope: "ai_scope_user",
  } as const;

  const accountTypeMap = {
    directory: "directory_user",
    supplier: "supplier_user",
    ai_scope: "ai_scope_user",
  } as const;

  const user = await prisma.user.create({
    data: {
      email,
      password_hash,
      full_name: fullName,
      phone,
      role: roleMap[accountType as keyof typeof roleMap],
      account_type: accountTypeMap[accountType as keyof typeof accountTypeMap],
      is_verified: false,
    },
  });

  // Create AIScopeUser record for ai_scope signups (starts as pending, requires approval)
  if (accountType === "ai_scope") {
    await prisma.aIScopeUser.create({
      data: {
        user_id: user.id,
        status: "pending",
        company: company || null,
        job_role: jobRole || null,
      },
    });
  }

  const verificationToken = createAuthToken(user.id, "email_verification");
  await sendDirectoryVerificationEmail(fullName, email, verificationToken);
  sendAdminSignupNotification(fullName, email, accountType).catch(() => {});

  const messages = {
    directory: "Verification email sent. Please check your inbox to verify your account, then set up your company listing.",
    supplier: "Verification email sent. Please check your inbox to verify your account.",
    ai_scope: "Verification email sent. Once you verify your email, your account will be reviewed for AI Scope Builder access. We'll be in touch.",
  };

  return NextResponse.json({ success: true, message: messages[accountType as keyof typeof messages] });
}
