import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { getParcelForPoint } from "@/lib/measuremap/cadastre";

// Returns the cadastral parcel that contains the project's coordinates, so the
// map can highlight exactly which property the project is about. Gated + owned.
export async function GET(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (project.latitude == null || project.longitude == null) return NextResponse.json({ parcel: null });

  const parcel = await getParcelForPoint(project.latitude, project.longitude);
  return NextResponse.json({ parcel });
}
