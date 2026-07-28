"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { resolveAddress } from "@/lib/measuremap/geocoding";
import {
  createProject,
  setProjectStatus,
  softDeleteProject,
} from "@/lib/measuremap/projects";

export type CreateProjectState = { error?: string };

// Create a project from a CONFIRMED address suggestion. The address is
// re-resolved server-side from the chosen suggestion id, so coordinates can't be
// spoofed from the client and a project can never exist without a valid address.
export async function createProjectAction(
  _prev: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  const user = await requireMeasureMapUser();

  const addressId = String(formData.get("address_id") ?? "").trim();
  if (!addressId) return { error: "Select and confirm an address before creating the project." };

  const resolved = await resolveAddress(addressId);
  if (!resolved) return { error: "That address couldn't be verified. Please search and pick it again." };

  const project = await createProject(user.id, {
    full_address: resolved.full_address,
    latitude: resolved.latitude,
    longitude: resolved.longitude,
    suburb: resolved.suburb,
    state: resolved.state,
    postcode: resolved.postcode,
    project_name: String(formData.get("project_name") ?? ""),
    project_reference: String(formData.get("project_reference") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });

  revalidatePath("/measuremap");
  // Open the project workspace (aerial map centred on the address — Phase 3).
  redirect(`/measuremap/projects/${project.id}`);
}

export async function archiveProjectAction(formData: FormData): Promise<void> {
  const user = await requireMeasureMapUser();
  const id = String(formData.get("project_id") ?? "");
  const next = String(formData.get("next_status") ?? "archived") as "active" | "archived";
  await setProjectStatus(user.id, id, next);
  revalidatePath("/measuremap");
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  const user = await requireMeasureMapUser();
  const id = String(formData.get("project_id") ?? "");
  await softDeleteProject(user.id, id);
  revalidatePath("/measuremap");
}
