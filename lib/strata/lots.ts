/**
 * Shared parsing for the lot (strata roll) fields. Kept out of the route files
 * because Next.js only allows HTTP handlers to be exported from a route module.
 */
export function lotFields(body: Record<string, unknown>) {
  const text = (key: string) => {
    const v = body[key];
    if (v === undefined) return undefined;
    const s = String(v).trim();
    return s || null;
  };
  const basis = (key: string) => {
    const v = body[key];
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };

  return {
    description: text("description"),
    owner_name: text("owner_name"),
    owner_email: text("owner_email"),
    owner_phone: text("owner_phone"),
    occupancy: text("occupancy"),
    // Two bases, because VIC (lot liability vs lot entitlement) and QLD
    // (contribution vs interest schedule) levy on one figure and vote on another.
    levy_basis: basis("levy_basis"),
    ownership_basis: basis("ownership_basis"),
    service_address: text("service_address"),
    mortgagee: text("mortgagee"),
    tenancy_notice: text("tenancy_notice"),
    managing_agent: text("managing_agent"),
    emergency_contact: text("emergency_contact"),
    notes: text("notes"),
    notices_by_email: body.notices_by_email === undefined ? undefined : Boolean(body.notices_by_email),
  };
}
