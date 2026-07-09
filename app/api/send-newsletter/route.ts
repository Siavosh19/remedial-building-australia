import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

const SITE    = "https://www.remedialbuildingaustralia.com.au";
const FROM    = "Remedial Building Australia <newsletter@remedialbuildingaustralia.com.au>";
const CONTACT = "info@remedialbuildingaustralia.com.au";
const ADDRESS = "Remedial Building Australia — Sydney NSW Australia";

// ─── Types ────────────────────────────────────────────────────────────────────

type Subscriber = { name: string; email: string };

type Article = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  source_name: string;
  published_date: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function articleUrl(slug: string): string {
  return `${SITE}/industry-news/${slug}`;
}

function unsubscribeUrl(email: string): string {
  return `${SITE}/api/unsubscribe?email=${encodeURIComponent(email)}`;
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function excerpt(text: string, max = 180): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return esc(clean);
  return esc(clean.slice(0, max).replace(/\s\S*$/, "")) + "&#8230;";
}

// Trim a summary to at most `maxWords` words for the email preview.
function excerptWords(text: string, maxWords = 20): string {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length <= maxWords) return esc(words.join(" "));
  return esc(words.slice(0, maxWords).join(" ")) + "&#8230;";
}

// The email should never surface the generic "Other" bucket (or a blank
// category) as a tag — fall back to the site's default taxonomy label. This is
// email-only; it does not alter the stored article category.
function normalizeCategory(raw: string): string {
  const c = raw.trim();
  if (!c || c.toLowerCase() === "other") return "Industry News";
  return c;
}

function weekLabel(): string {
  return new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── HTML builder ─────────────────────────────────────────────────────────────

function buildHtml(articles: Article[], sub: Subscriber): string {
  const label   = weekLabel();
  const subject = `Construction & Remedial Building Industry News — ${label}`;

  const preheader = articles.length > 0
    ? `${articles.length} industry articles this week — ${articles[0].title}`
    : "Your weekly Australian remedial building industry update";

  // ── Article cards (all equal) ─────────────────────────────────────────────
  const articleCards = articles.length === 0
    ? `<tr><td style="padding:0 32px 24px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#6b7280;font-style:italic;">
          No new industry news articles were published this week.
        </p>
      </td></tr>`
    : articles.map((a, i) => `
  <!-- Article ${i + 1} -->
  <tr>
    <td style="padding:11px 32px 12px 32px;${i < articles.length - 1 ? "border-bottom:1px solid #eceef1;" : ""}">
      <p style="margin:0 0 3px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;color:#b91c1c;">${esc(a.category)}</p>
      <h2 style="margin:0 0 3px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#0f1f3d;line-height:1.3;">
        <a href="${articleUrl(a.slug)}" style="color:#0f1f3d;text-decoration:none;">${esc(a.title)}</a>
      </h2>
      <p style="margin:0 0 5px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#9ca3af;">
        ${fmtDate(a.published_date)}${a.source_name ? ` &middot; ${esc(a.source_name)}` : ""}
      </p>
      <p style="margin:0 0 7px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#374151;line-height:1.5;text-align:justify;">${excerptWords(a.summary, 20)}</p>
      <a href="${articleUrl(a.slug)}"
        style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#b91c1c;text-decoration:none;">
        Read full article &#8594;
      </a>
    </td>
  </tr>`).join("");

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${esc(subject)}</title>
  <!--[if mso]>
  <style type="text/css">body,table,td{font-family:Arial,Helvetica,sans-serif!important;}</style>
  <![endif]-->
  <!-- Progressive enhancement only: stacks the pricing columns on narrow
       screens. Everything still renders acceptably if this block is stripped. -->
  <style type="text/css">
    @media only screen and (max-width:480px) {
      .tier-cell {
        display:block !important;
        width:100% !important;
        box-sizing:border-box !important;
        padding:0 0 12px 0 !important;
      }
      .promo-text { text-align:center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#e9ebee;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <!-- Preheader -->
  <div style="display:none;font-size:1px;color:#e9ebee;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

  <!-- Outer -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e9ebee;">
    <tr>
      <td align="center" style="padding:20px 12px;">

        <!-- View in browser -->
        <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;width:100%;">
          <tr>
            <td align="right" style="padding:0 0 8px 0;">
              <a href="${SITE}/industry-news"
                style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1d4ed8;text-decoration:underline;">View in browser</a>
            </td>
          </tr>
        </table>

        <!-- Email card -->
        <table width="640" cellpadding="0" cellspacing="0" border="0"
          style="max-width:640px;width:100%;background-color:#ffffff;border:1px solid #d1d5db;">

          <!-- ── Header ──────────────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#0f1f3d;padding:22px 32px 18px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">Construction &amp; Remedial Building Industry News</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:bold;color:#ffffff;">Remedial Building Australia</p>
                  </td>
                  <td align="right" valign="bottom">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#93c5fd;white-space:nowrap;">${label}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Red accent stripe -->
          <tr><td style="background-color:#b91c1c;height:3px;font-size:3px;line-height:3px;">&nbsp;</td></tr>

          <!-- ── Greeting ────────────────────────────────────────────────── -->
          <tr>
            <td style="padding:26px 32px 8px 32px;">
              <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111827;">Hi ${esc(sub.name)},</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#374151;line-height:1.65;text-align:justify;">
                Here is your weekly selection of the latest Australian construction and remedial building industry news — covering building regulation, compliance, concrete defects, waterproofing, strata and construction standards. Each article links directly to the full summary on the website.
              </p>
            </td>
          </tr>

          <!-- Divider + section label -->
          <tr>
            <td style="padding:20px 32px 16px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top:2px solid #0f1f3d;padding-top:10px;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#6b7280;">
                      This week&#8217;s industry news &mdash; ${articles.length} article${articles.length !== 1 ? "s" : ""}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Article cards ───────────────────────────────────────────── -->
          ${articleCards}

          <!-- ── Directory promo ─────────────────────────────────────────── -->
          <tr>
            <td style="padding:8px 32px 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;border:1px solid #e2e8f0;border-top:3px solid #b91c1c;">
                <tr>
                  <td style="padding:24px 26px;">
                    <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#b91c1c;">Get Listed &middot; Limited Offer</p>
                    <p style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#0f1f3d;line-height:1.35;">Don&rsquo;t miss the opportunity &mdash; be listed and receive quote requests</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;background-color:#6b7c99;border:2px solid #c8102e;box-shadow:0 2px 6px rgba(0,0,0,0.18);">
                      <tr><td class="promo-text" style="padding:12px 15px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#ffffff;font-weight:bold;line-height:1.45;"><strong>30 days FREE</strong> on Silver &mdash; try it free for 30 days, then continue at the regular price. <strong>No lock-in.</strong></td></tr>
                    </table>
                    <p style="margin:0 0 18px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#475569;line-height:1.6;">
                      Get found by the people who hire building businesses &mdash; strata managers, owners corporations, building owners, property and facilities managers, developers, builders and homeowners across Australia.
                    </p>
                    <!--
                      3-tier pricing: a single-row 3-column table on desktop.
                      On mobile the .tier-cell rule (head <style>) flips each cell
                      to display:block/width:100% so the columns stack. If a client
                      strips <style>, the table still reads left-to-right as 3
                      equal columns — acceptable per email-client constraints.
                    -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;">
                      <tr>
                        <!-- Free -->
                        <td class="tier-cell" width="33.33%" valign="top" style="padding:0 4px;">
                          <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="height:100%;">
                            <!-- reserved hat strip: keeps card tops aligned with Silver's badge -->
                            <tr><td height="22" style="height:22px;line-height:22px;font-size:1px;">&nbsp;</td></tr>
                            <!-- height:100% on the card chain makes all three boxes equal height -->
                            <tr><td valign="top" style="height:100%;">
                              <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="height:100%;background-color:#ffffff;border:1px solid #0b1f3a;">
                                <tr><td style="background-color:#0b1f3a;padding:8px 12px;text-align:center;">
                                  <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">Free Listing</span>
                                </td></tr>
                                <tr><td valign="top" height="118" style="height:118px;padding:12px 12px;text-align:center;">
                                  <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#1a1a1a;">$0</p>
                                  <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; Full business profile</p>
                                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; Found in the directory</p>
                                </td></tr>
                              </table>
                            </td></tr>
                          </table>
                        </td>
                        <!-- Silver &mdash; Most Popular (badge sits as a hat above the card) -->
                        <td class="tier-cell" width="33.33%" valign="top" style="padding:0 4px;">
                          <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="height:100%;">
                            <!-- "hat" badge row: protrudes above the banner; the reserved
                                 strip on the Free/Gold cards keeps all three banner tops level -->
                            <tr><td height="22" valign="bottom" style="height:22px;font-size:0;line-height:1;text-align:center;">
                              <span style="display:inline-block;background-color:#c8102e;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:bold;padding:3px 10px;text-transform:uppercase;letter-spacing:1px;line-height:1.3;">Most Popular</span>
                            </td></tr>
                            <tr><td valign="top" style="height:100%;">
                              <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="height:100%;background-color:#ffffff;border:2px solid #9ca0a6;">
                                <tr><td style="background-color:#9ca0a6;padding:8px 12px;text-align:center;">
                                  <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">Silver</span>
                                </td></tr>
                                <tr><td valign="top" height="118" style="height:118px;padding:12px 12px;text-align:center;">
                                  <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#1a1a1a;">$49<span style="font-weight:normal;font-size:12px;color:#1a1a1a;">/mo</span></p>
                                  <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; Receive quote requests</p>
                                  <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; Rank above free listings</p>
                                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; 30-day free trial</p>
                                </td></tr>
                              </table>
                            </td></tr>
                          </table>
                        </td>
                        <!-- Gold &mdash; Featured -->
                        <td class="tier-cell" width="33.33%" valign="top" style="padding:0 4px;">
                          <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="height:100%;">
                            <!-- reserved hat strip: keeps card tops aligned with Silver's badge -->
                            <tr><td height="22" style="height:22px;line-height:22px;font-size:1px;">&nbsp;</td></tr>
                            <tr><td valign="top" style="height:100%;">
                              <table role="presentation" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="height:100%;background-color:#ffffff;border:1px solid #c9971c;">
                                <tr><td style="background-color:#c9971c;padding:8px 12px;text-align:center;">
                                  <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">Gold</span>
                                </td></tr>
                                <tr><td valign="top" height="118" style="height:118px;padding:12px 12px;text-align:center;">
                                  <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#1a1a1a;"><span style="color:#c9971c;" role="img" aria-label="star">&#9733;</span> $99<span style="font-weight:normal;font-size:12px;color:#1a1a1a;">/mo</span></p>
                                  <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; Everything in Silver</p>
                                  <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; Featured in your State</p>
                                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#1a1a1a;line-height:1.4;">&#10003; Only 3 per category</p>
                                </td></tr>
                              </table>
                            </td></tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 18px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#475569;line-height:1.5;text-align:center;">No lock-in contracts &mdash; cancel anytime.</p>
                    <div style="text-align:center;">
                      <a href="${SITE}/directory/pricing" style="display:inline-block;padding:13px 26px;background-color:#f59e0b;color:#0f1f3d;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:14px;">Get listed &amp; start your free trial &#8594;</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Platform links ──────────────────────────────────────────── -->
          <tr>
            <td style="padding:0 32px 26px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#f1f5f9;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:18px 20px;text-align:center;">
                    <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;color:#374151;">Explore the platform</p>
                    <p style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:2.0;">
                      <a href="${SITE}/defect-library"  style="color:#1d4ed8;text-decoration:underline;">Defect Library</a>
                      &nbsp;&nbsp;&#8231;&nbsp;&nbsp;
                      <a href="${SITE}/repair-systems"  style="color:#1d4ed8;text-decoration:underline;">Repair Systems</a>
                      &nbsp;&nbsp;&#8231;&nbsp;&nbsp;
                      <a href="${SITE}/industry-news"  style="color:#1d4ed8;text-decoration:underline;">All Industry News</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Footer ─────────────────────────────────────────────────── -->
          <tr>
            <td style="padding:18px 32px;background-color:#f0f2f5;border-top:1px solid #d1d5db;">
              <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#374151;line-height:1.6;">
                You are receiving this email because you subscribed to the Remedial Building Australia weekly industry update at
                <a href="${SITE}" style="color:#1d4ed8;text-decoration:underline;">remedialbuildingaustralia.com.au</a>.
              </p>
              <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.8;">
                <a href="${unsubscribeUrl(sub.email)}" style="color:#1d4ed8;text-decoration:underline;">Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:${CONTACT}" style="color:#1d4ed8;text-decoration:underline;">${CONTACT}</a>
                &nbsp;&middot;&nbsp;
                <a href="${SITE}" style="color:#1d4ed8;text-decoration:underline;">remedialbuildingaustralia.com.au</a>
              </p>
              <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6b7280;">${ADDRESS}</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#9ca3af;">&copy; ${new Date().getFullYear()} Remedial Building Australia. All rights reserved.</p>
            </td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ─── Plain text builder ────────────────────────────────────────────────────────

function buildPlainText(articles: Article[], sub: Subscriber): string {
  const label   = weekLabel();
  const divider = "-".repeat(60);

  const lines: string[] = [
    "REMEDIAL BUILDING AUSTRALIA",
    `Construction & Remedial Building Industry News — ${label}`,
    divider,
    "",
    `Hi ${sub.name},`,
    "",
    "Here is your weekly selection of the latest Australian construction and remedial building industry news.",
    "",
    divider,
    `THIS WEEK'S INDUSTRY NEWS — ${articles.length} article${articles.length !== 1 ? "s" : ""}`,
    divider,
    "",
  ];

  if (articles.length === 0) {
    lines.push("No new industry news articles were published this week.", "");
  } else {
    articles.forEach((a, i) => {
      lines.push(`${i + 1}. ${a.category.toUpperCase()}${a.source_name ? ` | ${a.source_name}` : ""}`);
      lines.push(a.title);
      lines.push(fmtDate(a.published_date));
      const w = a.summary.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
      lines.push(w.length > 20 ? w.slice(0, 20).join(" ") + "..." : w.join(" "));
      lines.push(`Read full article: ${articleUrl(a.slug)}`);
      lines.push("");
    });
  }

  lines.push(
    divider,
    "GET LISTED — DON'T MISS THE OPPORTUNITY",
    "Be listed and receive quote requests.",
    "30 DAYS FREE on Silver — try it free for 30 days, then continue at the regular price. No lock-in.",
    "Get found by strata managers, owners corporations, building owners, property & facilities managers, developers, builders and homeowners across Australia.",
    "  Free Listing — $0, always free. Build a full profile.",
    "  Silver — $49/mo · 30-DAY FREE TRIAL: be listed and receive quote requests, rank above free listings.",
    "  Gold / Featured — $99/mo: Featured in your State (only 3 per category).",
    "No lock-in contracts — cancel anytime.",
    `Get listed: ${SITE}/directory/pricing`,
    "",
    divider,
    "EXPLORE THE PLATFORM",
    `Defect Library:    ${SITE}/defect-library`,
    `Repair Systems:    ${SITE}/repair-systems`,
    `All Industry News: ${SITE}/industry-news`,
    "",
    divider,
    "",
    `You received this because you subscribed at ${SITE}`,
    `Unsubscribe: ${unsubscribeUrl(sub.email)}`,
    `Contact: ${CONTACT}`,
    ADDRESS,
    `(c) ${new Date().getFullYear()} Remedial Building Australia`,
  );

  return lines.join("\n");
}

// ─── Route handler ─────────────────────────────────────────────────────────────

async function handle(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth   = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Preview/test mode: `?to=email` sends only to that address (no DB fetch),
  // so the full newsletter can be reviewed before going to all subscribers.
  const testTo = new URL(request.url).searchParams.get("to");

  let subs: { name: string; email: string }[] | null;
  if (testTo) {
    subs = [{ name: "Preview", email: testTo }];
  } else {
    // Subscribers — skip placeholder domains
    const { data, error: subError } = await supabase
      .from("newsletter_subscribers")
      .select("name, email")
      .not("email", "ilike", "%example.com%");
    if (subError)
      return NextResponse.json({ error: subError.message }, { status: 500 });
    subs = data;
  }
  if (!subs || subs.length === 0)
    return NextResponse.json({ error: "No subscribers found" }, { status: 404 });

  // Article selection: prefer the admin-curated set (include_in_newsletter =
  // true). If nothing is curated, fall back to the 8 latest published articles.
  // A curated selection is cleared after a real send (see below) so the next
  // week starts fresh.
  const ARTICLE_COLS = "title, slug, summary, category, source_name, published_date";

  const { data: curated, error: curErr } = await supabase
    .from("industry_news")
    .select(ARTICLE_COLS)
    .eq("status", "published")
    .not("summary", "is", null)
    .eq("include_in_newsletter", true)
    .order("published_date", { ascending: false })
    .limit(8);
  if (curErr)
    return NextResponse.json({ error: curErr.message }, { status: 500 });

  const usedCuration = (curated?.length ?? 0) > 0;
  let raw = curated;

  if (!usedCuration) {
    const { data: latest, error: artError } = await supabase
      .from("industry_news")
      .select(ARTICLE_COLS)
      .eq("status", "published")
      .not("summary", "is", null)
      .order("published_date", { ascending: false })
      .limit(8);
    if (artError)
      return NextResponse.json({ error: artError.message }, { status: 500 });
    raw = latest;
  }

  const articles: Article[] = (raw ?? []).map((r: Record<string, unknown>) => ({
    title:          String(r.title          ?? "").trim(),
    slug:           String(r.slug           ?? "").trim(),
    summary:        String(r.summary        ?? "").trim(),
    category:       normalizeCategory(String(r.category ?? "")),
    source_name:    String(r.source_name    ?? "").trim(),
    published_date: String(r.published_date ?? ""),
  }));

  const label   = weekLabel();
  const subject = `Construction & Remedial Building Industry News — ${label}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const BATCH  = 100;
  let sent     = 0;
  const errors: string[] = [];

  for (let i = 0; i < subs.length; i += BATCH) {
    const chunk    = subs.slice(i, i + BATCH) as Subscriber[];
    const messages = chunk.map((sub) => ({
      from:    FROM,
      to:      sub.email,
      subject,
      html:    buildHtml(articles, sub),
      text:    buildPlainText(articles, sub),
      headers: {
        "List-Unsubscribe":      `<${unsubscribeUrl(sub.email)}>, <mailto:${CONTACT}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }));

    const { data, error } = await resend.batch.send(messages);
    if (error) {
      errors.push(error.message);
    } else {
      sent += data?.data?.length ?? chunk.length;
    }
  }

  // After a real send (not a preview), clear the curated selection so the next
  // week starts empty and the same articles can't be resent by accident.
  let cleared = false;
  if (!testTo && usedCuration && sent > 0) {
    const { error: clearErr } = await supabase
      .from("industry_news")
      .update({ include_in_newsletter: false })
      .eq("include_in_newsletter", true);
    if (clearErr) console.error("[send-newsletter] failed to clear selection:", clearErr);
    else cleared = true;
  }

  return NextResponse.json({
    sent,
    total_subscribers: subs.length,
    article_count: articles.length,
    curated: usedCuration,
    selection_cleared: cleared,
    errors: errors.length ? errors : undefined,
  });
}

// Vercel Cron Jobs invoke the path with a GET request (and inject the
// `Authorization: Bearer ${CRON_SECRET}` header automatically). We also keep
// POST so the endpoint can be triggered manually with the same Bearer token.
export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
