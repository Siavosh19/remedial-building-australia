// Client-side fetch helpers for the shared estimating model — work categories,
// estimate items and measurements. Thin wrappers over the gated /api/measuremap
// routes. All throw on non-2xx so callers can flag a failed save instead of
// silently losing data.

async function ok(res: Response) {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export type ApiCategory = {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type ApiMeasurement = {
  id: string;
  estimate_item_id: string | null;
  category_id: string | null;
  measurement_mode: string; // free | structured
  measurement_type: string; // area | linear | perimeter | count
  source_type: string; // map | drawing
  name: string | null;
  colour: string | null;
  geometry: unknown;
  calculated_quantity: number;
  unit: string;
  label: string | null;
  is_visible: boolean;
  sort_order: number;
};

export type ApiItem = {
  id: string;
  category_id: string | null;
  name: string;
  measurement_type: string | null;
  colour: string;
  unit: string;
  is_visible: boolean;
  sort_order: number;
  measurements: ApiMeasurement[];
};

const base = (projectId: string) => `/api/measuremap/projects/${projectId}`;

// ── Categories ─────────────────────────────────────────────────────────────
export async function listCategories(projectId: string): Promise<ApiCategory[]> {
  const data = await ok(await fetch(`${base(projectId)}/categories`));
  return data.categories;
}

export async function createCategory(projectId: string, body: { name: string; description?: string | null }): Promise<ApiCategory> {
  const data = await ok(await fetch(`${base(projectId)}/categories`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  }));
  return data.category;
}

export async function patchCategory(projectId: string, categoryId: string, patch: Record<string, unknown>) {
  return ok(await fetch(`${base(projectId)}/categories/${categoryId}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
  }));
}

export async function removeCategory(projectId: string, categoryId: string) {
  return ok(await fetch(`${base(projectId)}/categories/${categoryId}`, { method: "DELETE" }));
}

// ── Items ──────────────────────────────────────────────────────────────────
export async function createItem(
  projectId: string,
  body: { name: string; measurement_type: string; colour: string; unit?: string; category_id?: string | null; sort_order?: number },
): Promise<ApiItem> {
  const data = await ok(await fetch(`${base(projectId)}/items`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  }));
  return { ...data.item, measurements: [] };
}

export async function patchItem(projectId: string, itemId: string, patch: Record<string, unknown>) {
  return ok(await fetch(`${base(projectId)}/items/${itemId}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
  }));
}

export async function removeItem(projectId: string, itemId: string) {
  return ok(await fetch(`${base(projectId)}/items/${itemId}`, { method: "DELETE" }));
}

// ── Measurements ───────────────────────────────────────────────────────────
export async function createMeasurement(
  projectId: string,
  body: {
    estimate_item_id: string; category_id?: string | null; geometry: unknown;
    calculated_quantity: number; unit: string; measurement_type: string;
    measurement_mode?: string; name?: string | null; colour?: string | null;
    label?: string | null; source_type: string; sort_order?: number;
  },
): Promise<{ id: string }> {
  const data = await ok(await fetch(`${base(projectId)}/measurements`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  }));
  return data.measurement;
}

export async function patchMeasurement(projectId: string, measurementId: string, patch: Record<string, unknown>) {
  return ok(await fetch(`${base(projectId)}/measurements/${measurementId}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
  }));
}

export async function removeMeasurement(projectId: string, measurementId: string) {
  return ok(await fetch(`${base(projectId)}/measurements/${measurementId}`, { method: "DELETE" }));
}

// ── Annotations (visual map markup; update/delete reuse the measurement routes) ─
export type ApiAnnotation = {
  id: string;
  annotation_type: string; // text | rect | circle
  name: string | null;
  colour: string;
  geometry: unknown;
};

export async function listAnnotations(projectId: string): Promise<ApiAnnotation[]> {
  const data = await ok(await fetch(`${base(projectId)}/annotations`));
  return data.annotations;
}

export async function createAnnotation(
  projectId: string,
  body: { annotation_type: string; name?: string | null; colour: string; geometry: unknown },
): Promise<{ id: string }> {
  const data = await ok(await fetch(`${base(projectId)}/annotations`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  }));
  return data.annotation;
}
