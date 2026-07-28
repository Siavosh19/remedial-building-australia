import type { ReactNode } from "react";
import Link from "next/link";
import { Bell, HelpCircle, Ruler } from "lucide-react";

// Global chrome for the MeasureMap workspace. Matches the Remedial Estimating
// design system (dark navy top bar, sky-blue primary, red accents) so the
// takeoff tool reads as part of the main product while staying self-contained.
//
// Palette: navy #082f49 (sky-950) bar · primary #0369a1 (sky-700) ·
// accent #38bdf8 (sky-400) · destructive/notification #dc2626 (red-600).

function initialsFrom(email: string): string {
  const local = (email.split("@")[0] || "").replace(/[^a-zA-Z]/g, "");
  return (local.slice(0, 2) || "U").toUpperCase();
}

export default function MeasureMapShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F6F7] font-sans text-[#393939]">
      <header className="flex h-14 items-center bg-[#082f49] px-5 text-white">
        {/* Logo block — width matches the workspace nav column (176px) */}
        <Link href="/measuremap" className="flex h-full w-[176px] items-center border-r border-white/15">
          <div className="mr-3 grid h-8 w-8 place-items-center rounded bg-[#0369a1]">
            <Ruler size={18} strokeWidth={2.2} />
          </div>
          <div className="leading-none">
            <div className="text-[14px] font-bold tracking-[0.4px]">REMEDIAL</div>
            <div className="mt-1 text-[9px] font-semibold tracking-[1.3px] text-[#38bdf8]">
              MEASUREMAP
            </div>
          </div>
        </Link>

        <nav className="flex h-full items-center gap-9 pl-8">
          <TopNavItem label="PROJECTS" href="/measuremap" active />
          <TopNavItem label="RBA SITE" href="/" />
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden rounded bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#7dd3fc] sm:inline">
            Private beta
          </span>

          <button className="relative grid h-9 w-9 place-items-center rounded hover:bg-white/10" aria-label="Notifications">
            <Bell size={19} />
            <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#dc2626] px-1 text-[9px] font-bold">
              1
            </span>
          </button>

          <button className="grid h-9 w-9 place-items-center rounded hover:bg-white/10" aria-label="Help">
            <HelpCircle size={19} />
          </button>

          <div className="flex items-center gap-3 pl-1">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0369a1] text-[12px] font-semibold">
              {initialsFrom(email)}
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <div className="max-w-[150px] truncate text-[13px] font-semibold">{email}</div>
              <a
                href="/api/directory/logout"
                className="text-[11px] text-white/65 transition hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

function TopNavItem({ label, href, active = false }: { label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={[
        "relative flex h-full items-center text-[13px] font-semibold tracking-[0.3px]",
        active ? "text-white" : "text-white/70 hover:text-white",
      ].join(" ")}
    >
      {label}
      {active && <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#0369a1]" />}
    </Link>
  );
}
