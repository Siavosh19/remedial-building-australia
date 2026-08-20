"use client";

import { useEffect } from "react";

// PWA kill switch (client side).
//
// The PWA is disconnected, not deleted — PWARegister/InstallPrompt/PWAAppShell
// still exist and can be re-mounted in app/layout.tsx to bring it back. This
// component is what actually severs it in browsers that already installed it:
// it unregisters every service worker on the origin and deletes the caches the
// old worker built, so nobody keeps getting the app shell or stale pages.
//
// public/sw.js is itself a self-destructing worker, which covers browsers that
// hit a cached page before this component runs. Belt and braces — both paths
// are idempotent and silent.
export default function PWADisconnect() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => Promise.all(regs.map((r) => r.unregister())))
        .catch(() => {});
    }

    if (typeof caches !== "undefined") {
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .catch(() => {});
    }

    // Clear the installed-app body classes in case an old bundle set them.
    document.body.classList.remove("pwa-standalone", "pwa-section", "pwa-tabbar");
  }, []);

  return null;
}
