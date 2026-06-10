import type { SupplierProduct, Supplier } from "@prisma/client";

type ProductWithSupplier = SupplierProduct & { supplier: Supplier };

export function isPromotionActive(product: ProductWithSupplier): boolean {
  if (product.supplier.status !== "active") return false;
  if (product.status !== "published" && product.status !== "checked") return false;
  if (product.promotion_status !== "active" && product.promotion_status !== "trial") return false;
  if (product.payment_status !== "paid" && product.payment_status !== "trial") return false;
  if (product.promotion_tier === "hidden" || product.promotion_tier === "basic") return false;

  const now = new Date();
  if (product.promotion_start_date && product.promotion_start_date > now) return false;
  if (product.promotion_end_date && product.promotion_end_date < now) return false;

  return true;
}

export function getPromotionSort(product: ProductWithSupplier): number {
  if (!isPromotionActive(product)) return 0;
  if (product.promotion_tier === "premium") return 3;
  if (product.promotion_tier === "promoted") return 2;
  return 1;
}

export const DISCLOSURE_DEFAULT =
  "Some supplier products may appear as promoted or sponsored placements. Technical suitability should always be confirmed against the product TDS, project requirements, substrate condition, and applicable Australian standards.";
