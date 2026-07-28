// Client-side fetch helpers for takeoff items + measurements. Thin wrappers over
// the gated /api/measuremap routes. All throw on non-2xx so callers can flag a
// failed save instead of silently losing data.

async function ok(res: Response) {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export type ApiMeasurement = {
  id: string;
  takeoff_item_id: string;
  geometry: unknown;
  calculated_quantity: number;
  unit: string;
  label: string | null;
  sort_order: number;
};

export type ApiItem = {
  id: string;
  name: string;
  measurement_type: string;
  colour: string;
  unit: string;
  is_visible: boolean;
  is_locked: boolean;
  sort_order: number;
  source_type: string;
  source_id: string | null;
  measurements: ApiMeasurement[];
};

export async function createItem(
  projectId: string,
  body: { name: string; measurement_type: string; colour: string; source_type: string; source_id?: string | null; sort_order?: number },
): Promise<ApiItem> {
  const data = await ok(await fetch(`/api/measuremap/projects/${projectId}/takeoffs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }));
  return { ...data.item, measurements: [] };
}

export async function patchItem(projectId: string, itemId: string, patch: Record<string, unknown>) {
  return ok(await fetch(`/api/measuremap/projects/${projectId}/takeoffs/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  }));
}

export async function removeItem(projectId: string, itemId: string) {
  return ok(await fetch(`/api/measuremap/projects/${projectId}/takeoffs/${itemId}`, { method: "DELETE" }));
}

export async function createMeasurement(
  projectId: string,
  body: { takeoff_item_id: string; geometry: unknown; calculated_quantity: number; unit: string; label?: string | null; source_type: string; source_id?: string | null; sort_order?: number },
): Promise<{ id: string }> {
  const data = await ok(await fetch(`/api/measuremap/projects/${projectId}/measurements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }));
  return data.measurement;
}

export async function patchMeasurement(projectId: string, measurementId: string, patch: Record<string, unknown>) {
  return ok(await fetch(`/api/measuremap/projects/${projectId}/measurements/${measurementId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  }));
}

export async function removeMeasurement(projectId: string, measurementId: string) {
  return ok(await fetch(`/api/measuremap/projects/${projectId}/measurements/${measurementId}`, { method: "DELETE" }));
}
