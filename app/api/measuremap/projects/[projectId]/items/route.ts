import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { listItems, createItem } from "@/lib/measuremap/estimating";

const TYPES = ["area", "linear", "perimeter", "count"];
const UNIT_FOR: Record<string, string> = { area: "m2", linear: "m", perimeter: "m", count: "ea" };

export async function GET(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const items = await listItems(user.id, projectId);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !TYPES.includes(body.measurement_type)) {
    return NextResponse.json({ error: "Invalid item" }, { status: 400 });
  }
  const item = await createItem(user.id, projectId, {
    name: body.name,
    measurement_type: body.measurement_type,
    colour: typeof body.colour === "string" ? body.colour : "#0369a1",
    unit: typeof body.unit === "string" ? body.unit : UNIT_FOR[body.measurement_type] ?? "ea",
    category_id: typeof body.category_id === "string" ? body.category_id : null,
    sort_order: typeof body.sort_order === "number" ? body.sort_order : 0,
  });
  if (!item) return NextResponse.json({ error: "Create failed" }, { status: 400 });
  return NextResponse.json({ item });
}
