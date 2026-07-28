import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { listCategories, createCategory } from "@/lib/measuremap/estimating";

export async function GET(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const categories = await listCategories(user.id, projectId);
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Category name required" }, { status: 400 });
  }
  const category = await createCategory(user.id, projectId, {
    name: body.name,
    description: typeof body.description === "string" ? body.description : null,
    sort_order: typeof body.sort_order === "number" ? body.sort_order : 0,
  });
  if (!category) return NextResponse.json({ error: "Create failed" }, { status: 400 });
  return NextResponse.json({ category });
}
