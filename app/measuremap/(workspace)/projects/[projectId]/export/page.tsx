import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { Download } from "lucide-react";

export default async function ExportPage() {
  await requireMeasureMapUser();
  return (
    <div className="flex h-full items-center justify-center bg-slate-100 p-8">
      <div className="max-w-sm rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <Download className="mx-auto h-8 w-8 text-slate-300" />
        <p className="mt-3 text-sm font-semibold text-slate-700">Excel export</p>
        <p className="mt-1 text-sm text-slate-500">Quantity summary + detailed measurements as an .xlsx workbook. Arriving in Phase 5.</p>
      </div>
    </div>
  );
}
