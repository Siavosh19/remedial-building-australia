import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { NextResponse } from "next/server";

export type AdminPermission =
  | "super_admin"
  | "admin"
  | "content_admin"
  | "supplier_manager"
  | "read_only_admin";

const ADMIN_ROLES = new Set([
  "super_admin", "admin", "content_admin", "supplier_manager", "read_only_admin",
]);

const WRITE_ROLES = new Set(["super_admin", "admin", "content_admin", "supplier_manager"]);
const SUPPLIER_ROLES = new Set(["super_admin", "admin", "supplier_manager"]);

export async function requireAdmin(request: Request) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return { user: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (!ADMIN_ROLES.has(user.role) && user.role !== "admin") {
    return { user: null, error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { user, error: null };
}

export async function requireWriteAdmin(request: Request) {
  const { user, error } = await requireAdmin(request);
  if (error) return { user: null, error };
  if (!WRITE_ROLES.has(user!.role) && user!.role !== "admin") {
    return { user: null, error: NextResponse.json({ error: "Insufficient permissions" }, { status: 403 }) };
  }
  return { user, error: null };
}

export async function requireSupplierAdmin(request: Request) {
  const { user, error } = await requireAdmin(request);
  if (error) return { user: null, error };
  if (!SUPPLIER_ROLES.has(user!.role) && user!.role !== "admin") {
    return { user: null, error: NextResponse.json({ error: "Insufficient permissions" }, { status: 403 }) };
  }
  return { user, error: null };
}

export async function requireSupplierUser(request: Request) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return { user: null, supplierId: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (user.role !== "supplier_user" && user.role !== "admin" && user.role !== "super_admin") {
    return { user: null, supplierId: null, error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  const supplierId = user.supplier_id;
  if (!supplierId && user.role === "supplier_user") {
    return { user: null, supplierId: null, error: NextResponse.json({ error: "No supplier linked to this account" }, { status: 403 }) };
  }
  return { user, supplierId, error: null };
}

export function isAdminRole(role: string): boolean {
  return ADMIN_ROLES.has(role) || role === "admin";
}
