import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";

function calcReadingTime(body: string | null | undefined): number | null {
  if (!body) return null;
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const article = await prisma.rbaInsightsArticle.findUnique({ where: { id: Number(id) } });
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ article });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const existing = await prisma.rbaInsightsArticle.findUnique({ where: { id: Number(id) } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Slug uniqueness (if changing slug)
  if (body.slug && body.slug !== existing.slug) {
    const conflict = await prisma.rbaInsightsArticle.findUnique({ where: { slug: body.slug } });
    if (conflict) return NextResponse.json({ error: "This slug is already in use." }, { status: 409 });
  }

  // Publishing validation
  if (body.status === "published") {
    const title = body.title ?? existing.title;
    const slug = body.slug ?? existing.slug;
    const category = body.category ?? existing.category;
    const summary = body.summary ?? existing.summary;
    const bodyContent = body.body_content ?? existing.body_content;
    const imageUrl = body.featured_image_url ?? existing.featured_image_url;
    const imageAlt = body.featured_image_alt_text ?? existing.featured_image_alt_text;
    const missing: string[] = [];
    if (!title) missing.push("title");
    if (!slug) missing.push("slug");
    if (!category) missing.push("category");
    if (!summary) missing.push("summary");
    if (!bodyContent) missing.push("body content");
    if (!imageUrl) missing.push("featured image");
    if (!imageAlt) missing.push("featured image alt text");
    if (missing.length) return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const bodyContent = body.body_content !== undefined ? body.body_content : existing.body_content;

  const updated = await prisma.rbaInsightsArticle.update({
    where: { id: Number(id) },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.summary !== undefined && { summary: body.summary }),
      ...(body.featured_image_url !== undefined && { featured_image_url: body.featured_image_url }),
      ...(body.featured_image_alt_text !== undefined && { featured_image_alt_text: body.featured_image_alt_text }),
      ...(body.body_content !== undefined && { body_content: body.body_content }),
      ...(body.author !== undefined && { author: body.author }),
      ...(body.published_date !== undefined && { published_date: body.published_date ? new Date(body.published_date) : null }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.seo_title !== undefined && { seo_title: body.seo_title }),
      ...(body.seo_description !== undefined && { seo_description: body.seo_description }),
      ...(body.related_defect_pages !== undefined && { related_defect_pages: body.related_defect_pages }),
      ...(body.related_repair_systems !== undefined && { related_repair_systems: body.related_repair_systems }),
      ...(body.is_featured !== undefined && { is_featured: body.is_featured }),
      reading_time_minutes: calcReadingTime(bodyContent),
    },
  });

  return NextResponse.json({ article: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.rbaInsightsArticle.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
