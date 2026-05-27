import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

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
  const subject = `Weekly Industry Update — ${label}`;

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
    <td style="padding:0 32px ${i < articles.length - 1 ? "20px" : "28px"} 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="border-left:4px solid #b91c1c;background-color:#f9fafb;">
        <tr>
          <td style="padding:18px 20px;">
            <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#b91c1c;">${esc(a.category)}</p>
            <h2 style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#0f1f3d;line-height:1.35;">
              <a href="${articleUrl(a.slug)}" style="color:#0f1f3d;text-decoration:none;">${esc(a.title)}</a>
            </h2>
            <p style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9ca3af;">
              ${fmtDate(a.published_date)}${a.source_name ? ` &middot; ${esc(a.source_name)}` : ""}
            </p>
            <p style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#374151;line-height:1.65;">${excerpt(a.summary, 200)}</p>
            <a href="${articleUrl(a.slug)}"
              style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#b91c1c;text-decoration:none;">
              Read full article &#8594;
            </a>
          </td>
        </tr>
      </table>
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
                    <p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:3px;color:#93c5fd;">Industry Update</p>
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
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#374151;line-height:1.65;">
                Here is your weekly selection of the latest Australian remedial building industry news — covering building regulation, compliance, concrete defects, waterproofing, strata and construction standards.
                Each article links directly to the full summary on the website.
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

          <!-- ── Platform links ──────────────────────────────────────────── -->
          <tr>
            <td style="padding:0 32px 26px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#f1f5f9;border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;color:#374151;">Explore the platform</p>
                    <p style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:2.0;">
                      <a href="${SITE}/defect-library"  style="color:#1d4ed8;text-decoration:underline;">Defect Library</a>
                      &nbsp;&nbsp;&#8231;&nbsp;&nbsp;
                      <a href="${SITE}/repair-systems"  style="color:#1d4ed8;text-decoration:underline;">Repair Systems</a>
                      &nbsp;&nbsp;&#8231;&nbsp;&nbsp;
                      <a href="${SITE}/ai-scope-builder" style="color:#1d4ed8;text-decoration:underline;">AI Scope Builder</a>
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
    `Weekly Industry Update — ${label}`,
    divider,
    "",
    `Hi ${sub.name},`,
    "",
    "Here is your weekly selection of the latest Australian remedial building industry news.",
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
      const s = a.summary.replace(/\s+/g, " ").trim();
      lines.push(s.length > 200 ? s.slice(0, 200).replace(/\s\S*$/, "") + "..." : s);
      lines.push(`Read full article: ${articleUrl(a.slug)}`);
      lines.push("");
    });
  }

  lines.push(
    divider,
    "EXPLORE THE PLATFORM",
    `Defect Library:    ${SITE}/defect-library`,
    `Repair Systems:    ${SITE}/repair-systems`,
    `AI Scope Builder:  ${SITE}/ai-scope-builder`,
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

export async function POST(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth   = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Subscribers — skip placeholder domains
  const { data: subs, error: subError } = await supabase
    .from("newsletter_subscribers")
    .select("name, email")
    .not("email", "ilike", "%example.com%");

  if (subError)
    return NextResponse.json({ error: subError.message }, { status: 500 });
  if (!subs || subs.length === 0)
    return NextResponse.json({ error: "No subscribers found" }, { status: 404 });

  // Latest 10 published articles with summaries — no date restriction
  const { data: raw, error: artError } = await supabase
    .from("industry_news")
    .select("title, slug, summary, category, source_name, published_date")
    .eq("status", "published")
    .not("summary", "is", null)
    .order("published_date", { ascending: false })
    .limit(10);

  if (artError)
    return NextResponse.json({ error: artError.message }, { status: 500 });

  const articles: Article[] = (raw ?? []).map((r: Record<string, unknown>) => ({
    title:          String(r.title          ?? "").trim(),
    slug:           String(r.slug           ?? "").trim(),
    summary:        String(r.summary        ?? "").trim(),
    category:       String(r.category       ?? "Industry News").trim(),
    source_name:    String(r.source_name    ?? "").trim(),
    published_date: String(r.published_date ?? ""),
  }));

  const label   = weekLabel();
  const subject = `Weekly Industry Update — ${label}`;

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

  return NextResponse.json({
    sent,
    total_subscribers: subs.length,
    article_count: articles.length,
    errors: errors.length ? errors : undefined,
  });
}
