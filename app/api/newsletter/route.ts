import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { getCategoryImage, formatDate } from "@/lib/news-categories";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://remedialbuildingaustralia.com.au";

type NewsRow = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  source_name: string;
  published_date: string;
  featured_image: string;
};

function articleUrl(slug: string): string {
  return `${BASE_URL}/industry-news/${slug}`;
}

function buildHtml(articles: NewsRow[]): string {
  if (articles.length === 0) return "<p>No articles available.</p>";

  const [featured, ...rest] = articles;
  const now = new Date();
  const monthYear = now.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
  const subject = `Remedial Building Australia — Industry Update ${monthYear}`;

  const featuredImg = featured.featured_image || getCategoryImage(featured.category);
  const featuredDate = formatDate(featured.published_date);

  // Featured article HTML
  const featuredHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
      <tr>
        <td>
          <img src="${BASE_URL}${featuredImg}" alt="${featured.category}" width="560" style="width:100%;max-width:560px;height:200px;object-fit:cover;display:block;border-radius:8px;" />
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f6ff;border-radius:8px;padding:24px;margin-top:16px;">
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#0369a1;">${featured.category}</p>
                <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:11px;color:#94a3b8;">${featuredDate}${featured.source_name ? ` · ${featured.source_name}` : ""}</p>
                <h2 style="margin:12px 0 12px 0;font-family:Arial,sans-serif;font-size:22px;font-weight:900;color:#0c1b33;line-height:1.3;">${featured.title}</h2>
                <p style="margin:0 0 20px 0;font-family:Arial,sans-serif;font-size:14px;color:#475569;line-height:1.7;">${featured.summary}</p>
                <a href="${articleUrl(featured.slug)}" style="display:inline-block;background-color:#b91c1c;color:#ffffff;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:8px;">Read Full Summary &rarr;</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

  // Remaining articles — 2-column grid (table-based for email safety)
  const restRows: string[] = [];
  for (let i = 0; i < rest.length; i += 2) {
    const left = rest[i];
    const right = rest[i + 1];

    function articleCell(a: NewsRow): string {
      const img = a.featured_image || getCategoryImage(a.category);
      const date = formatDate(a.published_date);
      return `
        <td width="50%" valign="top" style="padding:8px;">
          <img src="${BASE_URL}${img}" alt="${a.category}" width="260" style="width:100%;height:120px;object-fit:cover;display:block;border-radius:6px;" />
          <p style="margin:8px 0 2px 0;font-family:Arial,sans-serif;font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;color:#0369a1;">${a.category}</p>
          <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:10px;color:#94a3b8;">${date}${a.source_name ? ` · ${a.source_name}` : ""}</p>
          <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;color:#0c1b33;line-height:1.4;">${a.title}</p>
          <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:12px;color:#64748b;line-height:1.5;">${a.summary.slice(0, 120)}${a.summary.length > 120 ? "…" : ""}</p>
          <a href="${articleUrl(a.slug)}" style="font-family:Arial,sans-serif;font-size:11px;font-weight:bold;color:#0369a1;text-decoration:none;">Read &rarr;</a>
        </td>`;
    }

    restRows.push(`
      <tr>
        ${articleCell(left)}
        ${right ? articleCell(right) : '<td width="50%" style="padding:8px;"></td>'}
      </tr>`);
  }

  const restHtml =
    rest.length > 0
      ? `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
      ${restRows.join("")}
    </table>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#0c1b33;padding:32px 40px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Remedial Building Australia</p>
              <p style="margin:4px 0 0 0;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#7dd3fc;">Industry Update &mdash; ${monthYear}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 24px 0;font-family:Arial,sans-serif;font-size:14px;color:#475569;line-height:1.6;">The latest Australian remedial building news — curated for building consultants, waterproofing contractors and strata managers.</p>

              ${featuredHtml}

              ${
                rest.length > 0
                  ? `<p style="margin:32px 0 16px 0;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#94a3b8;">More Articles</p>
              ${restHtml}`
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f1f5f9;padding:24px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:12px;color:#64748b;">You are receiving this because you subscribed to the Remedial Building Australia newsletter.</p>
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#94a3b8;">
                <a href="mailto:info@remedialbuildingaustralia.com.au" style="color:#0369a1;text-decoration:none;">info@remedialbuildingaustralia.com.au</a>
                &nbsp;&middot;&nbsp;
                <a href="${BASE_URL}" style="color:#0369a1;text-decoration:none;">remedialbuildingaustralia.com.au</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit") ?? "12", 10);

  const { data, error } = await supabase
    .from("industry_news")
    .select(
      "title, slug, summary, category, source_name, published_date, featured_image"
    )
    .eq("status", "published")
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const articles: NewsRow[] = (data ?? []).map((row: Record<string, unknown>) => ({
    title: String(row.title ?? ""),
    slug: String(row.slug ?? ""),
    summary: String(row.summary ?? ""),
    category: String(row.category ?? "Other"),
    source_name: String(row.source_name ?? ""),
    published_date: String(row.published_date ?? ""),
    featured_image: String(row.featured_image ?? ""),
  }));

  const now = new Date();
  const monthYear = now.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
  const subject = `Remedial Building Australia — Industry Update ${monthYear}`;
  const preview_text = articles[0]?.title ?? "Latest industry news from Remedial Building Australia";
  const html = buildHtml(articles);

  return Response.json({
    subject,
    preview_text,
    html,
    article_count: articles.length,
  });
}
