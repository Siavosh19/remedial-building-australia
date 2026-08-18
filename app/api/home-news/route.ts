import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// The homepage carousel used to hit the Supabase REST API straight from the
// browser — one round trip per visitor, and dead whenever the project's egress
// quota gates the HTTP APIs. Serve it from the direct Postgres connection and
// cache the response at the edge instead.
export const revalidate = 3600;

type Row = {
  title: string;
  slug: string;
  category: string | null;
  summary: string | null;
  published_date: Date | null;
};

const iso = (d: Date | null) => (d ? d.toISOString() : "");

export async function GET() {
  try {
    const [news, insights] = await Promise.all([
      prisma.industryNews.findMany({
        where: { status: "published" },
        orderBy: [
          { published_date: { sort: "desc", nulls: "last" } },
          { created_at: { sort: "desc", nulls: "last" } },
        ],
        take: 15,
        select: {
          title: true,
          slug: true,
          category: true,
          summary: true,
          source_name: true,
          source_url: true,
          published_date: true,
        },
      }),
      prisma.rbaInsightsArticle.findMany({
        where: { status: "published" },
        orderBy: { published_date: { sort: "desc", nulls: "last" } },
        take: 15,
        select: {
          title: true,
          slug: true,
          category: true,
          summary: true,
          published_date: true,
        },
      }),
    ]);

    return NextResponse.json({
      news: news.map((r) => ({
        title: r.title,
        slug: r.slug,
        category: r.category,
        summary: r.summary,
        source_name: r.source_name,
        source_url: r.source_url,
        published_date: iso(r.published_date),
      })),
      insights: (insights as Row[]).map((r) => ({
        title: r.title,
        slug: r.slug,
        category: r.category,
        summary: r.summary,
        published_date: iso(r.published_date),
      })),
    });
  } catch {
    return NextResponse.json({ news: [], insights: [] });
  }
}
