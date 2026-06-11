import { Resend } from "resend";

const FROM = process.env.DIRECTORY_EMAIL_FROM ?? "Remedial Building Australia <no-reply@remedialbuildingaustralia.com.au>";
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
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    text,
  });
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
