import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";

function calcReadingTime(body: string | null | undefined): number | null {
  if (!body) return null;
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function GET(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const articles = await prisma.rbaInsightsArticle.findMany({
    orderBy: [{ created_at: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      status: true,
      published_date: true,
      updated_at: true,
      is_featured: true,
    },
  });
  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const slug = body.slug || slugify(body.title ?? "");
  if (!slug) return NextResponse.json({ error: "Title is required to generate a slug." }, { status: 400 });

  // Slug uniqueness check
  const existing = await prisma.rbaInsightsArticle.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "An article with this slug already exists. Please use a different slug." }, { status: 409 });

  // Publishing validation
  if (body.status === "published") {
    const missing: string[] = [];
    if (!body.title) missing.push("title");
    if (!slug) missing.push("slug");
    if (!body.category) missing.push("category");
    if (!body.summary) missing.push("summary");
    if (!body.body_content) missing.push("body content");
    if (!body.featured_image_url) missing.push("featured image");
    if (!body.featured_image_alt_text) missing.push("featured image alt text");
    if (missing.length) return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const article = await prisma.rbaInsightsArticle.create({
    data: {
      title: body.title,
      slug,
      category: body.category ?? "Other",
      summary: body.summary ?? null,
      featured_image_url: body.featured_image_url ?? null,
      featured_image_alt_text: body.featured_image_alt_text ?? null,
      body_content: body.body_content ?? null,
      author: body.author || "Remedial Building Australia",
      published_date: body.published_date ? new Date(body.published_date) : null,
      status: body.status ?? "draft",
      seo_title: body.seo_title ?? null,
      seo_description: body.seo_description ?? null,
      related_defect_pages: body.related_defect_pages ?? [],
      related_repair_systems: body.related_repair_systems ?? [],
      is_featured: body.is_featured ?? false,
      reading_time_minutes: calcReadingTime(body.body_content),
    },
  });

  return NextResponse.json({ article }, { status: 201 });
}
