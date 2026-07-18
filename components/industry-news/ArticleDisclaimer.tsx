import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function ArticleDisclaimer() {
  return (
    <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5">
      <AlertCircle size={11} className="mt-0.5 shrink-0 text-amber-600" />
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-amber-700">General Information Disclaimer</p>
        <p className="mt-0.5 text-[10px] leading-snug text-amber-800">
          The information on this page is general industry information only and does not constitute legal, engineering, building, insurance, or professional advice. Users should seek independent professional advice relevant to their specific circumstances. While reasonable efforts are made to ensure accuracy, Remedial Building Australia does not guarantee the completeness or reliability of this information.{" "}
          <Link href="/terms" className="font-semibold underline hover:text-amber-900 transition">
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </div>
  );
}
