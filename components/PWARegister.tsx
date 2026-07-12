"use client";

import { useEffect } from "react";

// Registers the service worker (public/sw.js) so the installed PWA works
// offline and loads faster. Production-only, to avoid caching interfering with
// `next dev`. Registration is best-effort — any failure is silently ignored and
// never affects the page. The service worker itself uses a network-first
// strategy for pages, so new/edited content is always fetched fresh when online.
export default function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failed (unsupported / blocked) — the site works as normal.
      });
    };

    if (document.readyState === "complete") register();
    else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
