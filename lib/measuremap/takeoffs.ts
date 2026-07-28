import "server-only";
import { prisma } from "@/lib/prisma";
import type { MeasurementType, SourceType, Unit } from "@/types/measuremap";
import { UNIT_FOR_TYPE } from "@/types/measuremap";

// Takeoff item + measurement data layer. Every function is scoped by
// ownerUserId so cross-user access is impossible even with a valid id, and
// mutations re-verify the parent project/item belongs to the same owner.

export type MeasurementDTO = {
  id: string;
  takeoff_item_id: string;
  geometry: unknown;
  calculated_quantity: number;
  unit: string;
  label: string | null;
  sort_order: number;
};

export type TakeoffItemDTO = {
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
  measurements: MeasurementDTO[];
};

/** Load all takeoff items (+ their measurements) for one source of a project. */
export async function getTakeoffs(
  ownerUserId: number,
  projectId: string,
  sourceType: SourceType,
  sourceId?: string | null,
): Promise<TakeoffItemDTO[]> {
  const items = await prisma.measureMapTakeoffItem.findMany({
    where: {
      project_id: projectId,
      owner_user_id: ownerUserId,
      deleted_at: null,
      source_type: sourceType,
      ...(sourceType === "drawing" && sourceId ? { source_id: sourceId } : {}),
    },
    orderBy: { sort_order: "asc" },
    include: {
      measurements: {
        where: { deleted_at: null },
        orderBy: { sort_order: "asc" },
        select: {
          id: true,
          takeoff_item_id: true,
          geometry: true,
          calculated_quantity: true,
          unit: true,
          label: true,
          sort_order: true,
        },
      },
    },
  });
  return items.map((it) => ({
    id: it.id,
    name: it.name,
    measurement_type: it.measurement_type,
    colour: it.colour,
    unit: it.unit,
    is_visible: it.is_visible,
    is_locked: it.is_locked,
    sort_order: it.sort_order,
    source_type: it.source_type,
    source_id: it.source_id,
    measurements: it.measurements as MeasurementDTO[],
  }));
}

async function assertProjectOwned(ownerUserId: number, projectId: string) {
  const p = await prisma.measureMapProject.findFirst({
    where: { id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    select: { id: true },
  });
  return !!p;
}

export async function createTakeoffItem(
  ownerUserId: number,
  projectId: string,
  input: {
    name: string;
    measurement_type: MeasurementType;
    colour: string;
    source_type: SourceType;
    source_id?: string | null;
    sort_order?: number;
  },
) {
  if (!(await assertProjectOwned(ownerUserId, projectId))) return null;
  const unit: Unit = UNIT_FOR_TYPE[input.measurement_type];
  return prisma.measureMapTakeoffItem.create({
    data: {
      project_id: projectId,
      owner_user_id: ownerUserId,
      name: input.name.trim() || "Untitled item",
      measurement_type: input.measurement_type,
      colour: input.colour,
      unit,
      source_type: input.source_type,
      source_id: input.source_id ?? null,
      sort_order: input.sort_order ?? 0,
    },
  });
}

export async function updateTakeoffItem(
  ownerUserId: number,
  itemId: string,
  patch: Partial<{ name: string; colour: string; is_visible: boolean; is_locked: boolean; sort_order: number }>,
) {
  const res = await prisma.measureMapTakeoffItem.updateMany({
    where: { id: itemId, owner_user_id: ownerUserId, deleted_at: null },
    data: patch,
  });
  return res.count > 0;
}

/** Hard delete item (measurements cascade via FK). */
export async function deleteTakeoffItem(ownerUserId: number, itemId: string) {
  const res = await prisma.measureMapTakeoffItem.deleteMany({
    where: { id: itemId, owner_user_id: ownerUserId },
  });
  return res.count > 0;
}

export async function createMeasurement(
  ownerUserId: number,
  projectId: string,
  input: {
    takeoff_item_id: string;
    geometry: unknown;
    calculated_quantity: number;
    unit: string;
    label?: string | null;
    source_type: SourceType;
    source_id?: string | null;
    sort_order?: number;
  },
) {
  // Verify the target item belongs to this owner AND this project.
  const item = await prisma.measureMapTakeoffItem.findFirst({
    where: { id: input.takeoff_item_id, owner_user_id: ownerUserId, project_id: projectId, deleted_at: null },
    select: { id: true },
  });
  if (!item) return null;
  return prisma.measureMapMeasurement.create({
    data: {
      project_id: projectId,
      takeoff_item_id: input.takeoff_item_id,
      owner_user_id: ownerUserId,
      source_type: input.source_type,
      source_id: input.source_id ?? null,
      geometry: input.geometry as object,
      calculated_quantity: input.calculated_quantity,
      unit: input.unit,
      label: input.label ?? null,
      sort_order: input.sort_order ?? 0,
    },
  });
}

export async function updateMeasurement(
  ownerUserId: number,
  measurementId: string,
  patch: Partial<{ geometry: unknown; calculated_quantity: number; label: string }>,
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
