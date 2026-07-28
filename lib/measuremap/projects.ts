import "server-only";
import { prisma } from "@/lib/prisma";
import type { ProjectStatus } from "@/types/measuremap";

// All functions take ownerUserId and filter by it, so a valid project id owned
// by another user is invisible/untouchable. This is the per-record ownership
// half of the access model (the first half is hasMeasureMapAccess()).

export type CreateProjectInput = {
  full_address: string;
  latitude: number;
  longitude: number;
  suburb?: string | null;
  state?: string | null;
  postcode?: string | null;
  project_name?: string | null;
  project_reference?: string | null;
  notes?: string | null;
};

export type ProjectListItem = {
  id: string;
  project_name: string | null;
  full_address: string;
  suburb: string | null;
  postcode: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string;
  updated_at: Date;
  drawing_count: number;
  takeoff_count: number;
};

export async function listProjects(
  ownerUserId: number,
  opts: { search?: string; includeArchived?: boolean; take?: number; skip?: number } = {},
): Promise<ProjectListItem[]> {
  const { search, includeArchived = false, take = 24, skip = 0 } = opts;
  const rows = await prisma.measureMapProject.findMany({
    where: {
      owner_user_id: ownerUserId,
      deleted_at: null,
      ...(includeArchived ? {} : { status: "active" }),
      ...(search && search.trim()
        ? {
            OR: [
              { full_address: { contains: search.trim(), mode: "insensitive" } },
              { project_name: { contains: search.trim(), mode: "insensitive" } },
              { suburb: { contains: search.trim(), mode: "insensitive" } },
              { postcode: { contains: search.trim(), mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { updated_at: "desc" },
    take,
    skip,
    select: {
      id: true,
      project_name: true,
      full_address: true,
      suburb: true,
      postcode: true,
      latitude: true,
      longitude: true,
      status: true,
      updated_at: true,
      _count: {
        select: {
          drawings: { where: { deleted_at: null } },
          takeoff_items: { where: { deleted_at: null } },
        },
      },
    },
  });
  return rows.map((r) => ({
    id: r.id,
    project_name: r.project_name,
    full_address: r.full_address,
    suburb: r.suburb,
    postcode: r.postcode,
    latitude: r.latitude,
    longitude: r.longitude,
    status: r.status,
    updated_at: r.updated_at,
    drawing_count: r._count.drawings,
    takeoff_count: r._count.takeoff_items,
  }));
}

/** A single project the user owns (or null). Use everywhere a project is opened. */
export async function getOwnedProject(ownerUserId: number, projectId: string) {
  return prisma.measureMapProject.findFirst({
    where: { id: projectId, owner_user_id: ownerUserId, deleted_at: null },
  });
}

export async function createProject(ownerUserId: number, input: CreateProjectInput) {
  return prisma.measureMapProject.create({
    data: {
      owner_user_id: ownerUserId,
      full_address: input.full_address,
      latitude: input.latitude,
      longitude: input.longitude,
      suburb: input.suburb ?? null,
      state: input.state ?? null,
      postcode: input.postcode ?? null,
      project_name: input.project_name?.trim() || null,
      project_reference: input.project_reference?.trim() || null,
      notes: input.notes?.trim() || null,
      status: "active",
    },
    select: { id: true },
  });
}

export async function setProjectStatus(ownerUserId: number, projectId: string, status: ProjectStatus) {
  const res = await prisma.measureMapProject.updateMany({
    where: { id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    data: { status, archived_at: status === "archived" ? new Date() : null },
  });
  return res.count > 0;
}

/** Soft delete — hidden everywhere, recoverable, storage cleanup handled later. */
export async function softDeleteProject(ownerUserId: number, projectId: string) {
  const res = await prisma.measureMapProject.updateMany({
    where: { id: projectId, owner_user_id: ownerUserId, deleted_at: null },
    data: { deleted_at: new Date() },
  });
  return res.count > 0;
}
