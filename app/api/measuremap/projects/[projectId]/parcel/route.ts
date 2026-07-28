import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject, updateProjectLocation } from "@/lib/measuremap/projects";
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

// Click-to-select: the user clicked their property on the map. We save the
// corrected coordinates and return the parcel the click falls inside (exact,
// since a click lands within the lot — no geocoder guesswork).
export async function POST(request: NextRequest, ctx: { params: Promise<{ projectId: string }> }) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  const lat = Number(body?.latitude), lng = Number(body?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }
  await updateProjectLocation(user.id, projectId, lat, lng);
  const parcel = await getParcelForPoint(lat, lng);
  return NextResponse.json({ parcel, latitude: lat, longitude: lng });
}
