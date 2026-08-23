"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import MapmetraPromo from "./MapmetraPromo";

// Phone/tablet version of the Mapmetra cross-promo. On desktop the promo lives
// in the right-hand rail, but below lg there is no rail — it ended up under the
// Create account button where nobody scrolled to it. So on small screens it
// opens once as a dismissible popup instead, and once closed it never comes
// back on that device.
const DISMISSED_KEY = "rba:mapmetra-promo-dismissed";
const OPEN_DELAY_MS = 900;
const MOBILE = "(max-width: 1023px)";

function alreadyDismissed() {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    // Private mode / storage disabled — show it, just don't remember.
    return false;
  }
}

export default function MapmetraPromoModal() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Desktop already shows the rail, and a returning visitor who closed this
    // should never see it again.
    if (!window.matchMedia(MOBILE).matches || alreadyDismissed()) return;
    // A short beat after landing, so it doesn't fight the page painting in.
    const t = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* nothing to do — it just reappears next visit */
    }
  }, []);

  // Hold the page still behind the popup, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const raf = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  // Rendered into <body> so no ancestor transform/filter can become the
  // containing block for the fixed overlay and knock it off centre.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mapmetra — estimating and takeoff"
    >
      {/* Tapping outside closes it, same as the X. */}
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={close}
        className={`absolute inset-0 h-full w-full cursor-default bg-slate-950/60 backdrop-blur-[2px] transition-opacity duration-200 motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`}
      />

      <div className={`relative max-h-[88vh] w-full max-w-[380px] overflow-y-auto overscroll-contain rounded-2xl shadow-2xl transition duration-200 motion-reduce:transition-none ${shown ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-md ring-1 ring-slate-900/10 transition hover:bg-white hover:text-slate-900"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <MapmetraPromo />
      </div>
    </div>,
    document.body,
  );
}
