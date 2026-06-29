import { Resend } from "resend";
import { RBA_DISCLAIMER, RBA_DISCLAIMER_SHORT } from "./legal";

const FROM = process.env.DIRECTORY_EMAIL_FROM ?? "Remedial Building Australia <info@remedialbuildingaustralia.com.au>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

function safeHtml(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function emailWrapper(title: string, body: string) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
    <div style="background:#0f172a;padding:24px 28px;border-bottom:3px solid #f43f5e;">
      <p style="margin:0;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">${safeHtml(title)}</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:#ffffff;">Remedial Building Australia</p>
    </div>
    <div style="padding:28px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">
      ${body}
      <p style="margin:26px 0 0;font-size:12px;color:#64748b;line-height:1.7;">If you did not request this, please ignore this message.</p>
    </div>
  </div>`;
}

async function sendEmail(subject: string, to: string, html: string, text: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error(`[directory-email] RESEND_API_KEY is not set — cannot send "${subject}" to ${to}`);
    throw new Error("Email service is not configured.");
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  // The Resend SDK resolves with { data, error } instead of throwing, so an
  // unverified domain / disallowed recipient would otherwise fail silently.
  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    text,
  });
  if (error) {
    console.error(`[directory-email] Resend rejected "${subject}" to ${to} (from ${FROM}):`, error);
    throw new Error(`Email send failed: ${error.message ?? "unknown error"}`);
  }
  return data;
}

export async function sendDirectoryVerificationEmail(name: string, email: string, token: string) {
  const link = `${SITE_URL}/directory/signup/verify/${encodeURIComponent(token)}`;
  const html = emailWrapper(
    "Verify your directory account",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(name)},</p>
     <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Thanks for registering for a directory account. Click the button below to verify your email and continue with your business setup.</p>
     <p style="margin:0 0 24px;"><a href="${link}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">Verify email</a></p>
     <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">If the button does not work, paste this URL into your browser:</p>
     <p style="margin:8px 0 0;font-size:13px;line-height:1.7;color:#475569;word-break:break-all;">${safeHtml(link)}</p>`
  );

  const text = `Hi ${name},\n\nThanks for registering for a directory account. Verify your email by visiting this link: ${link}\n\nIf you did not request this, ignore this message.`;

  await sendEmail("Verify your directory account", email, html, text);
}

// Client (strata / building owner) account — separate wording + lands on the
// client dashboard after verifying.
export async function sendClientVerificationEmail(name: string, email: string, token: string) {
  const link = `${SITE_URL}/directory/signup/verify/${encodeURIComponent(token)}`;
  const html = emailWrapper(
    "Verify your account",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(name)},</p>
     <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Thanks for creating an account to request quotes for building works. Click the button below to verify your email and access your client dashboard.</p>
     <p style="margin:0 0 24px;"><a href="${link}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">Verify email</a></p>
     <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">If the button does not work, paste this URL into your browser:</p>
     <p style="margin:8px 0 0;font-size:13px;line-height:1.7;color:#475569;word-break:break-all;">${safeHtml(link)}</p>`
  );
  const text = `Hi ${name},\n\nThanks for creating an account to request quotes for building works. Verify your email by visiting this link: ${link}\n\nIf you did not request this, ignore this message.`;
  await sendEmail("Verify your Remedial Building Australia account", email, html, text);
}

export async function sendDirectoryPasswordResetEmail(name: string, email: string, token: string) {
  const link = `${SITE_URL}/directory/reset-password/${encodeURIComponent(token)}`;
  const html = emailWrapper(
    "Reset your directory password",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(name)},</p>
     <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">We received a request to reset your directory account password. Click the button below to set a new password.</p>
     <p style="margin:0 0 24px;"><a href="${link}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">Reset password</a></p>
     <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">If the button does not work, paste this URL into your browser:</p>
     <p style="margin:8px 0 0;font-size:13px;line-height:1.7;color:#475569;word-break:break-all;">${safeHtml(link)}</p>`
  );

  const text = `Hi ${name},\n\nA password reset was requested for your directory account. Reset your password by visiting this link: ${link}\n\nIf you did not request this, ignore this message.`;

  await sendEmail("Reset your directory password", email, html, text);
}

export async function sendLeadConfirmationEmail(name: string, email: string) {
  const html = emailWrapper(
    "Enquiry received",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(name)},</p>
     <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Thank you, your enquiry has been received. You will be contacted directly by a specialist.</p>
     <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">If you have any questions in the meantime, you can browse the directory at <a href="${SITE_URL}/directory" style="color:#0369a1;">${SITE_URL}/directory</a>.</p>`
  );
  const text = `Hi ${name},\n\nThank you, your enquiry has been received. You will be contacted directly by a specialist.\n\nRemedial Building Australia`;
  await sendEmail("Your enquiry has been received", email, html, text);
}

export async function sendAdminNewSignupEmail(companyName: string, ownerName: string, ownerEmail: string, state: string, category: string) {
  const reviewLink = `${SITE_URL}/directory/admin-review`;
  const html = emailWrapper(
    "New directory signup",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A new business has submitted a listing for review.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;">Company</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(companyName)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Owner</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(ownerName)} — ${safeHtml(ownerEmail)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">State</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(state)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Category</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(category)}</td></tr>
     </table>
     <p style="margin:0;"><a href="${reviewLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Review in Admin Panel →</a></p>`
  );
  const text = `New signup: ${companyName}\nOwner: ${ownerName} (${ownerEmail})\nState: ${state} | Category: ${category}\n\nReview at: ${reviewLink}`;
  await sendEmail("New directory listing submitted for review", "info@remedialbuildingaustralia.com.au", html, text);
}

export async function sendCompanyStatusEmail(ownerName: string, ownerEmail: string, companyName: string, approved: boolean) {
  const dashLink = `${SITE_URL}/directory/dashboard`;
  const dirLink = `${SITE_URL}/directory`;
  const html = approved
    ? emailWrapper(
        "Your listing is live",
        `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(ownerName)},</p>
         <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Great news — your listing for <strong>${safeHtml(companyName)}</strong> has been reviewed and is now <strong>live</strong> on the Remedial Building Australia directory.</p>
         <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#334155;">Log in to your dashboard to complete your profile, upgrade your plan, and start receiving leads.</p>
         <p style="margin:0;"><a href="${dashLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Go to dashboard →</a></p>`
      )
    : emailWrapper(
        "Listing not approved",
        `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(ownerName)},</p>
         <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Unfortunately your listing for <strong>${safeHtml(companyName)}</strong> could not be approved at this time. This may be because the business does not meet our directory criteria, or the information provided was incomplete.</p>
         <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#334155;">If you believe this is an error or would like to resubmit, please contact us at <a href="mailto:info@remedialbuildingaustralia.com.au" style="color:#0369a1;">info@remedialbuildingaustralia.com.au</a>.</p>
         <p style="margin:0;"><a href="${dirLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Visit directory →</a></p>`
      );

  const text = approved
    ? `Hi ${ownerName},\n\nYour listing for ${companyName} is now live on the Remedial Building Australia directory.\n\nLog in to your dashboard: ${dashLink}`
    : `Hi ${ownerName},\n\nYour listing for ${companyName} could not be approved. Please contact info@remedialbuildingaustralia.com.au if you have questions.`;

  const subject = approved ? `Your listing is live — ${companyName}` : `Listing not approved — ${companyName}`;
  await sendEmail(subject, ownerEmail, html, text);
}

export async function sendAdminLeadEmail(
  companyName: string,
  companySlug: string,
  submitterName: string,
  submitterEmail: string,
  submitterPhone: string,
  projectType: string,
  description: string,
  submittedAt: string,
) {
  const profileUrl = `${SITE_URL}/directory/company/${encodeURIComponent(companySlug)}`;
  const html = emailWrapper(
    "New Quote Request",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A new quote request has been submitted via the directory.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;">Business</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(companyName)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Profile URL</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;"><a href="${profileUrl}" style="color:#0369a1;">${profileUrl}</a></td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">From</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(submitterName)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Email</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(submitterEmail)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Phone</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(submitterPhone)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Project Type</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(projectType)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;vertical-align:top;">Message</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(description)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Submitted</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(submittedAt)}</td></tr>
     </table>
     <p style="margin:0;"><a href="${profileUrl}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">View Profile →</a></p>`
  );
  const text = `New quote request for ${companyName}\nProfile: ${profileUrl}\n\nFrom: ${submitterName}\nEmail: ${submitterEmail}\nPhone: ${submitterPhone}\nProject type: ${projectType}\nMessage: ${description}\nSubmitted: ${submittedAt}`;
  await sendEmail(`New Quote Request — ${companyName}`, "info@remedialbuildingaustralia.com.au", html, text);
}

export async function sendLeadNotificationEmail(
  companyEmail: string,
  categoryName: string,
  suburb: string,
  state: string,
  urgency: string,
  budgetRange: string | null,
  description: string,
) {
  const urgencyLabel: Record<string, string> = {
    emergency: "Emergency",
    within_week: "Within a week",
    within_month: "Within a month",
    planning: "Planning ahead",
  };
  const budgetLabel: Record<string, string> = {
    under_5k: "Under $5k",
    "5k_20k": "$5k – $20k",
    "20k_100k": "$20k – $100k",
    "100k_plus": "$100k+",
  };
  const dashLink = `${SITE_URL}/directory/dashboard/leads`;

  const html = emailWrapper(
    `New Lead: ${categoryName} in ${suburb}, ${state}`,
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A new lead has been matched to your listing.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;">Category</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(categoryName)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Location</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(suburb)}, ${safeHtml(state)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Urgency</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(urgencyLabel[urgency] ?? urgency)}</td></tr>
       ${budgetRange ? `<tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Budget</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(budgetLabel[budgetRange] ?? budgetRange)}</td></tr>` : ""}
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;vertical-align:top;">Description</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(description)}</td></tr>
     </table>
     <p style="margin:0 0 20px;font-size:13px;line-height:1.7;color:#475569;">Accept or decline this lead in your dashboard. Contact details are revealed after you accept.</p>
     <p style="margin:0;"><a href="${dashLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">View Lead →</a></p>`
  );

  const text = `New Lead: ${categoryName} in ${suburb}, ${state}\n\nUrgency: ${urgencyLabel[urgency] ?? urgency}\n${budgetRange ? `Budget: ${budgetLabel[budgetRange] ?? budgetRange}\n` : ""}Description: ${description}\n\nView and respond in your dashboard: ${dashLink}`;

  await sendEmail(`New Lead: ${categoryName} in ${suburb}, ${state}`, companyEmail, html, text);
}

export async function sendAdminSupplierRegistrationEmail(data: {
  brandName: string;
  contactPerson: string;
  contactEmail: string;
  phone: string;
  website: string;
  supplierType: string;
  productCategories: string[];
  serviceAreas: string[];
  signupReason: string[];
  abn: string | null;
  billingEmail: string | null;
  notes: string | null;
}) {
  const adminLink = `${SITE_URL}/directory/admin/suppliers`;
  const rows = [
    ["Brand name", data.brandName],
    ["Contact person", data.contactPerson],
    ["Email", data.contactEmail],
    ["Phone", data.phone],
    ["Website", data.website],
    ["Supplier type", data.supplierType],
    ["Product categories", data.productCategories.join(", ")],
    ["Service areas", data.serviceAreas.join(", ")],
    ["Reason for signup", data.signupReason.join(", ")],
    ["ABN", data.abn ?? "—"],
    ["Billing email", data.billingEmail ?? "—"],
    ["Notes", data.notes ?? "—"],
  ];
  const tableRows = rows.map(([label, value]) =>
    `<tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;">${label}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(String(value))}</td></tr>`
  ).join("");
  const html = emailWrapper(
    "New supplier registration",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A new supplier has submitted a registration.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">${tableRows}</table>
     <p style="margin:0;"><a href="${adminLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Review in Admin Panel →</a></p>`
  );
  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n") + `\n\nAdmin panel: ${adminLink}`;
  await sendEmail(`New supplier registration — ${data.brandName}`, "info@remedialbuildingaustralia.com.au", html, text);
}

export async function sendClaimRequestAdminEmail(
  claimantName: string,
  claimantEmail: string,
  companyName: string,
  companySlug: string,
  claimRequestId: number,
) {
  const adminLink = `${SITE_URL}/directory/admin/claims`;
  const html = emailWrapper(
    "New claim request",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A business owner has submitted a claim request for a directory listing.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;">Claimant</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(claimantName)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Email</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(claimantEmail)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Listing</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(companyName)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Request ID</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">#${claimRequestId}</td></tr>
     </table>
     <p style="margin:0;"><a href="${adminLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Review Claim →</a></p>`
  );
  const text = `New claim request #${claimRequestId}\nClaimant: ${claimantName} (${claimantEmail})\nListing: ${companyName}\n\nReview at: ${adminLink}`;
  await sendEmail(`New claim request — ${companyName}`, "info@remedialbuildingaustralia.com.au", html, text);
}

export async function sendClaimDecisionEmail(
  claimantName: string,
  claimantEmail: string,
  companyName: string,
  approved: boolean,
  adminNote?: string,
) {
  const dashLink = `${SITE_URL}/directory/dashboard`;
  const html = approved
    ? emailWrapper(
        "Your claim has been approved",
        `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(claimantName)},</p>
         <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Your claim for <strong>${safeHtml(companyName)}</strong> has been approved. You can now manage your listing from the dashboard.</p>
         <p style="margin:0 0 24px;"><a href="${dashLink}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">Go to Dashboard →</a></p>`
      )
    : emailWrapper(
        "Your claim could not be approved",
        `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(claimantName)},</p>
         <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Unfortunately your claim for <strong>${safeHtml(companyName)}</strong> could not be approved at this time.${adminNote ? ` Reason: ${safeHtml(adminNote)}` : ""}</p>
         <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">If you believe this is an error, please contact us at <a href="mailto:info@remedialbuildingaustralia.com.au" style="color:#0369a1;">info@remedialbuildingaustralia.com.au</a>.</p>`
      );
  const subject = approved ? `Your claim is approved — ${companyName}` : `Claim not approved — ${companyName}`;
  const text = approved
    ? `Hi ${claimantName},\n\nYour claim for ${companyName} has been approved. Go to your dashboard: ${dashLink}`
    : `Hi ${claimantName},\n\nYour claim for ${companyName} could not be approved.${adminNote ? ` Reason: ${adminNote}` : ""}`;
  await sendEmail(subject, claimantEmail, html, text);
}

export async function sendQuoteRequestBusinessEmail(
  companyEmail: string,
  companyName: string,
  companySlug: string,
  requesterName: string,
  requesterEmail: string,
  requesterPhone: string | null,
  requesterRole: string | null,
  suburb: string | null,
  category: string | null,
  urgency: string | null,
  budget: string | null,
  message: string | null,
) {
  const dashLink = `${SITE_URL}/directory/dashboard/quote-requests`;
  const rows: [string, string][] = [
    ["From", requesterName],
    ["Email", requesterEmail],
    ...(requesterPhone ? [["Phone", requesterPhone] as [string, string]] : []),
    ...(requesterRole ? [["Role", requesterRole.replace(/_/g, " ")] as [string, string]] : []),
    ...(suburb ? [["Suburb", suburb] as [string, string]] : []),
    ...(category ? [["Category", category] as [string, string]] : []),
    ...(urgency ? [["Urgency", urgency] as [string, string]] : []),
    ...(budget ? [["Budget", budget] as [string, string]] : []),
    ...(message ? [["Message", message] as [string, string]] : []),
  ];
  const tableRows = rows.map(([l, v]) =>
    `<tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;vertical-align:top;">${l}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(v)}</td></tr>`
  ).join("");
  const html = emailWrapper(
    "New Quote Request",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">You have received a new quote request on Remedial Building Australia.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">${tableRows}</table>
     <p style="margin:0;"><a href="${dashLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">View in Dashboard →</a></p>`
  );
  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n") + `\n\nView in dashboard: ${dashLink}`;
  await sendEmail(`New Quote Request — ${companyName}`, companyEmail, html, text);
}

export async function sendQuoteRequestAdminEmail(
  companyName: string,
  companySlug: string,
  requesterName: string,
  requesterEmail: string,
  category: string | null,
  suburb: string | null,
) {
  const adminLink = `${SITE_URL}/directory/admin/quote-requests`;
  const html = emailWrapper(
    "New Quote Request",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A new quote request was submitted via the directory.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;">Business</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(companyName)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">From</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(requesterName)} — ${safeHtml(requesterEmail)}</td></tr>
       ${category ? `<tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Category</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(category)}</td></tr>` : ""}
       ${suburb ? `<tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Suburb</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(suburb)}</td></tr>` : ""}
     </table>
     <p style="margin:0;"><a href="${adminLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">View in Admin →</a></p>`
  );
  const text = `New quote request for ${companyName}\nFrom: ${requesterName} (${requesterEmail})\n${category ? `Category: ${category}\n` : ""}${suburb ? `Suburb: ${suburb}\n` : ""}\nAdmin: ${adminLink}`;
  await sendEmail(`New Quote Request — ${companyName}`, "info@remedialbuildingaustralia.com.au", html, text);
}

export async function sendAdminSignupNotification(name: string, email: string, accountType: string) {
  const typeLabel = accountType === "directory" ? "Directory Listing" : accountType === "supplier" ? "Supplier Portal" : "AI Scope Builder";
  const adminLink = `${SITE_URL}/directory/admin`;
  const html = emailWrapper(
    "New signup",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A new account has been created.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 22px;">
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;width:38%;">Name</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(name)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Email</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(email)}</td></tr>
       <tr><td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#64748b;">Account type</td><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${safeHtml(typeLabel)}</td></tr>
     </table>
     <p style="margin:0;"><a href="${adminLink}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Open Admin Panel →</a></p>`
  );
  const text = `New signup: ${name} (${email})\nAccount type: ${typeLabel}\n\nAdmin panel: ${adminLink}`;
  await sendEmail(`New signup — ${typeLabel}`, "info@remedialbuildingaustralia.com.au", html, text);
}

export async function sendSubscriptionStatusEmail(opts: {
  ownerName: string;
  ownerEmail: string;
  companyName: string;
  status: "active" | "cancelled" | "resumed";
  planLabel: string;
  accessUntil?: Date | null;
}) {
  const { ownerName, ownerEmail, companyName, status, planLabel, accessUntil } = opts;
  const until = accessUntil ? new Date(accessUntil).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : null;
  const dash = `${SITE_URL}/directory/dashboard/subscription`;

  const headline =
    status === "active" ? `Your ${planLabel} subscription is active`
    : status === "resumed" ? `Your ${planLabel} subscription has been resumed`
    : `Your ${planLabel} subscription has been cancelled`;

  const intro =
    status === "active"
      ? `Thanks ${safeHtml(ownerName)} — the <strong>${safeHtml(planLabel)}</strong> plan for <strong>${safeHtml(companyName)}</strong> is now active. Your upgraded listing features are live.`
    : status === "resumed"
      ? `Good news ${safeHtml(ownerName)} — the cancellation for <strong>${safeHtml(companyName)}</strong> has been reversed and your <strong>${safeHtml(planLabel)}</strong> plan will keep renewing.`
      : `Hi ${safeHtml(ownerName)}, we've cancelled the <strong>${safeHtml(planLabel)}</strong> plan for <strong>${safeHtml(companyName)}</strong>.${until ? ` Your features stay active until <strong>${until}</strong>, after which the listing reverts to the free Basic plan.` : ""}`;

  const html = emailWrapper(
    status === "cancelled" ? "Subscription cancelled" : "Subscription confirmed",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">${intro}</p>
     <p style="margin:0;"><a href="${dash}" style="display:inline-block;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">View your subscription →</a></p>`
  );
  const text = `${headline}\n\n${companyName}\n${until ? `Access until: ${until}\n` : ""}\nManage your subscription: ${dash}`;
  await sendEmail(headline, ownerEmail, html, text);
}

// ── Client quote-request platform ────────────────────────────────────────────

// Sent to each matched paid business when a client submits a quote request.
// Deliberately withholds full client contact details — those are visible once
// the business logs in to its dashboard.
export async function sendQuoteRequestBroadcastBusinessEmail(opts: {
  to: string;
  businessName?: string | null;
  suburb: string;
  category: string;
  description: string;
  urgency: string;
  dashboardUrl: string;
}) {
  const shortDesc = opts.description.length > 280 ? `${opts.description.slice(0, 280)}…` : opts.description;
  const greeting = opts.businessName ? `Hi ${safeHtml(opts.businessName)},` : "Hello,";
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;font-size:13px;color:#64748b;width:120px;vertical-align:top;">${safeHtml(label)}</td>
      <td style="padding:6px 0;font-size:14px;color:#0f172a;font-weight:600;">${safeHtml(value)}</td></tr>`;

  const html = emailWrapper(
    "New quote request",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">${greeting}</p>
     <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A client has submitted a quote request that matches your listing. Log in to your dashboard to view the full details and the client's contact information, then contact them directly.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 18px;">
       ${row("Suburb", opts.suburb)}
       ${row("Work category", opts.category)}
       ${row("Urgency", opts.urgency)}
     </table>
     <p style="margin:0 0 6px;font-size:13px;color:#64748b;">Summary</p>
     <p style="margin:0 0 22px;font-size:14px;line-height:1.7;color:#334155;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;">${safeHtml(shortDesc)}</p>
     <p style="margin:0 0 24px;"><a href="${opts.dashboardUrl}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">View request &amp; client details →</a></p>
     <p style="margin:0;font-size:12px;color:#64748b;line-height:1.7;">${safeHtml(RBA_DISCLAIMER_SHORT)}</p>`
  );

  const text = `${opts.businessName ? `Hi ${opts.businessName},` : "Hello,"}\n\nA client has submitted a quote request matching your listing.\n\nSuburb: ${opts.suburb}\nWork category: ${opts.category}\nUrgency: ${opts.urgency}\n\nSummary:\n${shortDesc}\n\nLog in to view the full request and the client's contact details: ${opts.dashboardUrl}\n\n${RBA_DISCLAIMER_SHORT}`;

  await sendEmail("New quote request matching your listing", opts.to, html, text);
}

// Sent to a single business when a client picks it on the results page and
// clicks "Request Quote". Includes the client's contact details (the client
// explicitly chose this business) so they can be contacted directly.
export async function sendDirectQuoteRequestEmail(opts: {
  to: string;
  businessName?: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  suburb: string;
  postcode: string;
  category: string;
  description: string;
  budget?: string | null;
  urgency: string;
  files: { filename: string | null; url: string }[];
  dashboardUrl: string;
}) {
  const greeting = opts.businessName ? `Hi ${safeHtml(opts.businessName)},` : "Hello,";
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;font-size:13px;color:#64748b;width:130px;vertical-align:top;">${safeHtml(label)}</td>
      <td style="padding:6px 0;font-size:14px;color:#0f172a;font-weight:600;">${safeHtml(value)}</td></tr>`;
  const fileLinks = opts.files.length
    ? `<p style="margin:0 0 6px;font-size:13px;color:#64748b;">Attachments</p><ul style="margin:0 0 18px;padding-left:18px;">${opts.files
        .map((f) => `<li style="font-size:13px;"><a href="${f.url}" style="color:#1d4ed8;">${safeHtml(f.filename ?? "File")}</a></li>`)
        .join("")}</ul>`
    : "";

  const html = emailWrapper(
    "New quote request",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">${greeting}</p>
     <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">A client has requested a quote from your business. Their contact details are below — please contact them directly to discuss and quote.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 18px;">
       ${row("Location", `${opts.suburb} ${opts.postcode}`)}
       ${row("Work category", opts.category)}
       ${row("Urgency", opts.urgency)}
       ${opts.budget ? row("Budget", opts.budget) : ""}
       ${row("Client", opts.clientName)}
       ${row("Email", opts.clientEmail)}
       ${opts.clientPhone ? row("Phone", opts.clientPhone) : ""}
     </table>
     <p style="margin:0 0 6px;font-size:13px;color:#64748b;">Description</p>
     <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#334155;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;">${safeHtml(opts.description)}</p>
     ${fileLinks}
     <p style="margin:0 0 24px;"><a href="${opts.dashboardUrl}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">View in your dashboard →</a></p>
     <p style="margin:0;font-size:12px;color:#64748b;line-height:1.7;">${safeHtml(RBA_DISCLAIMER_SHORT)}</p>`
  );

  const text = `${opts.businessName ? `Hi ${opts.businessName},` : "Hello,"}\n\nA client has requested a quote from your business.\n\nLocation: ${opts.suburb} ${opts.postcode}\nWork category: ${opts.category}\nUrgency: ${opts.urgency}\n${opts.budget ? `Budget: ${opts.budget}\n` : ""}Client: ${opts.clientName}\nEmail: ${opts.clientEmail}\n${opts.clientPhone ? `Phone: ${opts.clientPhone}\n` : ""}\nDescription:\n${opts.description}\n${opts.files.length ? `\nAttachments:\n${opts.files.map((f) => `- ${f.filename ?? "File"}: ${f.url}`).join("\n")}\n` : ""}\nView in your dashboard: ${opts.dashboardUrl}\n\n${RBA_DISCLAIMER_SHORT}`;

  await sendEmail("New quote request for your business", opts.to, html, text);
}

// Confirmation to the client after their request is matched and sent out.
export async function sendClientQuoteConfirmationEmail(opts: {
  to: string;
  name: string;
  category: string;
  suburb: string;
  matchedCount: number;
  dashboardUrl: string;
}) {
  const matchedLine =
    opts.matchedCount > 0
      ? `${opts.matchedCount} matching ${opts.matchedCount === 1 ? "business has" : "businesses have"} been notified and may contact you directly.`
      : `We could not find a matching listed business in your area for this category just yet. We'll keep your request on record — you can review it any time from your dashboard.`;

  const html = emailWrapper(
    "Quote request submitted",
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Hi ${safeHtml(opts.name)},</p>
     <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">Your quote request for <strong>${safeHtml(opts.category)}</strong> in <strong>${safeHtml(opts.suburb)}</strong> has been submitted. ${safeHtml(matchedLine)}</p>
     <p style="margin:0 0 24px;"><a href="${opts.dashboardUrl}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">View your request →</a></p>
     <p style="margin:0;font-size:12px;color:#64748b;line-height:1.7;">${safeHtml(RBA_DISCLAIMER)}</p>`
  );

  const text = `Hi ${opts.name},\n\nYour quote request for ${opts.category} in ${opts.suburb} has been submitted. ${matchedLine}\n\nView your request: ${opts.dashboardUrl}\n\n${RBA_DISCLAIMER}`;

  await sendEmail("Your quote request has been submitted", opts.to, html, text);
}
