import "server-only";
import { prisma } from "@/lib/prisma";
import type { SourceType } from "@/types/measuremap";

// Shared estimating data layer (migration 002). Categories + estimate items +
// measurements are ONE structure behind Map Measure, Plans & Takeoffs and the
// Estimate. Every function is scoped by ownerUserId so a valid id owned by
// another user is invisible/untouchable; mutations re-verify project ownership.

// ── DTOs (client-facing shapes) ────────────────────────────────────────────
export type CategoryDTO = {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type MeasurementDTO = {
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

export type ItemDTO = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  measurement_type: string | null;
  colour: string;
  unit: string;
  is_visible: boolean;
  sort_order: number;
  measurements: MeasurementDTO[];
};

async function assertProjectOwned(ownerUserId: number, projectId: string) {
  const p = await prisma.measureMapProject.findFirst({
    where: { id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    select: { id: true },
  });
  return !!p;
}

// ── Categories ─────────────────────────────────────────────────────────────
export async function listCategories(ownerUserId: number, projectId: string): Promise<CategoryDTO[]> {
  const rows = await prisma.measureMapWorkCategory.findMany({
    where: { project_id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    orderBy: [{ sort_order: "asc" }, { created_at: "asc" }],
    select: { id: true, name: true, description: true, sort_order: true },
  });
  return rows;
}

export async function createCategory(
  ownerUserId: number,
  projectId: string,
  input: { name: string; description?: string | null; sort_order?: number },
) {
  if (!(await assertProjectOwned(ownerUserId, projectId))) return null;
  return prisma.measureMapWorkCategory.create({
    data: {
      project_id: projectId,
      owner_user_id: ownerUserId,
      name: input.name.trim() || "Untitled category",
      description: input.description?.trim() || null,
      sort_order: input.sort_order ?? 0,
      created_by: ownerUserId,
    },
    select: { id: true, name: true, description: true, sort_order: true },
  });
}

export async function updateCategory(
  ownerUserId: number,
  categoryId: string,
  patch: Partial<{ name: string; description: string | null; sort_order: number }>,
) {
  const res = await prisma.measureMapWorkCategory.updateMany({
    where: { id: categoryId, owner_user_id: ownerUserId, deleted_at: null },
    data: patch,
  });
  return res.count > 0;
}

export async function deleteCategory(ownerUserId: number, categoryId: string) {
  // Soft-delete the category; its items/measurements keep their category_id
  // reference but the category no longer lists (they read as uncategorised).
  const res = await prisma.measureMapWorkCategory.updateMany({
    where: { id: categoryId, owner_user_id: ownerUserId, deleted_at: null },
    data: { deleted_at: new Date() },
  });
  // Detach items so they surface as uncategorised immediately.
  if (res.count > 0) {
    await prisma.measureMapEstimateItem.updateMany({
      where: { category_id: categoryId, owner_user_id: ownerUserId },
      data: { category_id: null },
    });
    await prisma.measureMapMeasurement.updateMany({
      where: { category_id: categoryId, owner_user_id: ownerUserId },
      data: { category_id: null },
    });
  }
  return res.count > 0;
}

// ── Items + their map measurements ─────────────────────────────────────────
export async function listItems(ownerUserId: number, projectId: string): Promise<ItemDTO[]> {
  const items = await prisma.measureMapEstimateItem.findMany({
    where: { project_id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    orderBy: [{ sort_order: "asc" }, { created_at: "asc" }],
    include: {
      measurements: {
        where: { deleted_at: null, source_type: "map" },
        orderBy: { sort_order: "asc" },
        select: {
          id: true, estimate_item_id: true, category_id: true, measurement_mode: true,
          measurement_type: true, source_type: true, name: true, colour: true,
          geometry: true, calculated_quantity: true, unit: true, label: true,
          is_visible: true, sort_order: true,
        },
      },
    },
  });
  return items.map((it) => ({
    id: it.id,
    category_id: it.category_id,
    name: it.name,
    description: it.description,
    measurement_type: it.measurement_type,
    colour: it.colour,
    unit: it.unit,
    is_visible: it.is_visible,
    sort_order: it.sort_order,
    measurements: it.measurements.map((m) => ({
      id: m.id,
      estimate_item_id: m.estimate_item_id,
      category_id: m.category_id,
      measurement_mode: m.measurement_mode ?? "structured",
      measurement_type: m.measurement_type ?? it.measurement_type ?? "area",
      source_type: m.source_type,
      name: m.name,
      colour: m.colour ?? it.colour,
      geometry: m.geometry,
      calculated_quantity: m.calculated_quantity,
      unit: m.unit,
      label: m.label,
      is_visible: m.is_visible,
      sort_order: m.sort_order,
    })),
  }));
}

// ── Estimate view — categories + items with derived measured quantity ───────
export type EstimateItemDTO = {
  id: string; category_id: string | null; name: string; description: string | null;
  unit: string; measurement_type: string | null; colour: string; row_type: string;
  manual_quantity: number; quantity_override: number | null; waste_percent: number;
  material_rate: number; labour_rate: number; equipment_rate: number; subcontract_rate: number;
  other_rate: number; lump_sum_amount: number; markup_percent: number; sort_order: number;
  measured_quantity: number; map_count: number; plan_count: number;
};

export async function getEstimateData(ownerUserId: number, projectId: string): Promise<{ categories: CategoryDTO[]; items: EstimateItemDTO[] }> {
  const [categories, rows] = await Promise.all([
    listCategories(ownerUserId, projectId),
    prisma.measureMapEstimateItem.findMany({
      where: { project_id: projectId, owner_user_id: ownerUserId, deleted_at: null },
      orderBy: [{ sort_order: "asc" }, { created_at: "asc" }],
      include: { measurements: { where: { deleted_at: null }, select: { calculated_quantity: true, source_type: true } } },
    }),
  ]);
  const items = rows.map((it) => {
    let measured = 0, mapCount = 0, planCount = 0;
    for (const m of it.measurements) {
      measured += m.calculated_quantity;
      if (m.source_type === "map") mapCount++; else if (m.source_type === "drawing") planCount++;
    }
    return {
      id: it.id, category_id: it.category_id, name: it.name, description: it.description,
      unit: it.unit, measurement_type: it.measurement_type, colour: it.colour, row_type: it.row_type,
      manual_quantity: it.manual_quantity, quantity_override: it.quantity_override, waste_percent: it.waste_percent,
      material_rate: it.material_rate, labour_rate: it.labour_rate, equipment_rate: it.equipment_rate,
      subcontract_rate: it.subcontract_rate, other_rate: it.other_rate, lump_sum_amount: it.lump_sum_amount,
      markup_percent: it.markup_percent, sort_order: it.sort_order,
      measured_quantity: measured, map_count: mapCount, plan_count: planCount,
    };
  });
  return { categories, items };
}

export async function createItem(
  ownerUserId: number,
  projectId: string,
  input: {
    name: string;
    measurement_type?: string | null; // area | linear | perimeter | count (null for manual/lump rows)
    colour?: string;
    unit: string;
    category_id?: string | null;
    sort_order?: number;
    row_type?: string; // measured | manual_quantity | lump_sum | provisional_sum | ...
  },
) {
  if (!(await assertProjectOwned(ownerUserId, projectId))) return null;
  // If a category is supplied, verify it belongs to this project + owner.
  if (input.category_id) {
    const cat = await prisma.measureMapWorkCategory.findFirst({
      where: { id: input.category_id, project_id: projectId, owner_user_id: ownerUserId, deleted_at: null },
      select: { id: true },
    });
    if (!cat) return null;
  }
  const item = await prisma.measureMapEstimateItem.create({
    data: {
      project_id: projectId,
      owner_user_id: ownerUserId,
      category_id: input.category_id ?? null,
      name: input.name.trim() || "Untitled item",
      measurement_type: input.measurement_type ?? null,
      colour: input.colour ?? "#0369a1",
      unit: input.unit,
      row_type: input.row_type ?? "measured",
      sort_order: input.sort_order ?? 0,
      created_by: ownerUserId,
    },
    select: {
      id: true, category_id: true, name: true, description: true, measurement_type: true,
      colour: true, unit: true, is_visible: true, sort_order: true,
    },
  });
  return { ...item, measurements: [] as MeasurementDTO[] };
}

export async function updateItem(
  ownerUserId: number,
  itemId: string,
  patch: Partial<{
    name: string; description: string | null; colour: string; category_id: string | null;
    is_visible: boolean; is_locked: boolean; sort_order: number;
    unit: string; row_type: string; manual_quantity: number; quantity_override: number | null;
    waste_percent: number; material_rate: number; labour_rate: number; equipment_rate: number;
    subcontract_rate: number; other_rate: number; lump_sum_amount: number; markup_percent: number;
  }>,
) {
  const res = await prisma.measureMapEstimateItem.updateMany({
    where: { id: itemId, owner_user_id: ownerUserId, deleted_at: null },
    data: patch,
  });
  // Keep the item's measurements' category_id in sync when the item moves.
  if (res.count > 0 && patch.category_id !== undefined) {
    await prisma.measureMapMeasurement.updateMany({
      where: { estimate_item_id: itemId, owner_user_id: ownerUserId },
      data: { category_id: patch.category_id },
    });
  }
  return res.count > 0;
}

export async function deleteItem(ownerUserId: number, itemId: string) {
  const res = await prisma.measureMapEstimateItem.deleteMany({
    where: { id: itemId, owner_user_id: ownerUserId },
  });
  return res.count > 0;
}

// ── Measurements (geometry objects under an item) ──────────────────────────
export async function createMeasurement(
  ownerUserId: number,
  projectId: string,
  input: {
    estimate_item_id: string;
    category_id?: string | null;
    geometry: unknown;
    calculated_quantity: number;
    unit: string;
    measurement_type: string;
    measurement_mode?: string;
    name?: string | null;
    colour?: string | null;
    label?: string | null;
    source_type: SourceType;
    plan_id?: string | null;
    plan_page_id?: string | null;
    sort_order?: number;
  },
) {
  // Verify the target item belongs to this owner AND this project.
  const item = await prisma.measureMapEstimateItem.findFirst({
    where: { id: input.estimate_item_id, owner_user_id: ownerUserId, project_id: projectId, deleted_at: null },
    select: { id: true, category_id: true },
  });
  if (!item) return null;
  return prisma.measureMapMeasurement.create({
    data: {
      project_id: projectId,
      estimate_item_id: input.estimate_item_id,
      category_id: input.category_id ?? item.category_id ?? null,
      owner_user_id: ownerUserId,
      source_type: input.source_type,
      measurement_mode: input.measurement_mode ?? "structured",
      measurement_type: input.measurement_type,
      name: input.name ?? null,
      colour: input.colour ?? null,
      geometry: input.geometry as object,
      calculated_quantity: input.calculated_quantity,
      unit: input.unit,
      label: input.label ?? null,
      plan_id: input.plan_id ?? null,
      plan_page_id: input.plan_page_id ?? null,
      created_by: ownerUserId,
      sort_order: input.sort_order ?? 0,
    },
    select: { id: true },
  });
}

export async function updateMeasurement(
  ownerUserId: number,
  measurementId: string,
  patch: Partial<{
    geometry: unknown; calculated_quantity: number; label: string;
    name: string; colour: string; category_id: string | null; estimate_item_id: string | null;
    is_visible: boolean;
  }>,
) {
  const res = await prisma.measureMapMeasurement.updateMany({
    where: { id: measurementId, owner_user_id: ownerUserId, deleted_at: null },
    data: patch as object,
  });
  return res.count > 0;
}

export async function deleteMeasurement(ownerUserId: number, measurementId: string) {
  const res = await prisma.measureMapMeasurement.deleteMany({
    where: { id: measurementId, owner_user_id: ownerUserId },
  });
  return res.count > 0;
}

// ── Annotations — visual-only map markup (text + shapes). Stored in the
// measurements table with measurement_mode='annotation' and NO item/category,
// so they never touch quantities or the estimate. Update/delete reuse
// updateMeasurement / deleteMeasurement.
export type AnnotationDTO = { id: string; annotation_type: string; name: string | null; colour: string; geometry: unknown };

export async function listAnnotations(ownerUserId: number, projectId: string): Promise<AnnotationDTO[]> {
  const rows = await prisma.measureMapMeasurement.findMany({
    where: { project_id: projectId, owner_user_id: ownerUserId, deleted_at: null, measurement_mode: "annotation" },
    orderBy: { created_at: "asc" },
    select: { id: true, measurement_type: true, name: true, colour: true, geometry: true },
  });
  return rows.map((r) => ({ id: r.id, annotation_type: r.measurement_type ?? "text", name: r.name, colour: r.colour ?? "#dc2626", geometry: r.geometry }));
}

export async function createAnnotation(
  ownerUserId: number,
  projectId: string,
  input: { annotation_type: string; name?: string | null; colour: string; geometry: unknown },
) {
  if (!(await assertProjectOwned(ownerUserId, projectId))) return null;
  return prisma.measureMapMeasurement.create({
    data: {
      project_id: projectId, owner_user_id: ownerUserId, source_type: "map",
      measurement_mode: "annotation", measurement_type: input.annotation_type,
      name: input.name ?? null, colour: input.colour,
      geometry: input.geometry as object, calculated_quantity: 0, unit: "",
      created_by: ownerUserId, sort_order: 0,
    },
    select: { id: true },
  });
}
