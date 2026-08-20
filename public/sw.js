/*
 * Remedial Building Australia — PWA DISCONNECTED (kill switch).
 *
 * The real service worker (offline caching + web push + installed-app shell) is
 * preserved in git history — `git show <this commit>^:public/sw.js` restores it
 * verbatim. It was disconnected because the installed-app shell was hijacking
 * the normal website.
 *
 * Browsers re-fetch /sw.js on navigation and byte-compare it, so every browser
 * that ever registered the old worker will pick THIS file up, wipe every cache
 * it created, unregister itself, and hand control back to the plain website.
 * After that the site is an ordinary Next.js site with no service worker at all.
 *
 * To re-enable the PWA: restore that file over this one and put
 * <PWARegister />, <InstallPrompt /> and <PWAAppShell /> back in app/layout.tsx
 * (plus `manifest` + `appleWebApp` in the metadata export).
 */
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 1. Delete every cache this origin ever created (rba-static-*, rba-pages-*).
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      // 2. Drop any push subscription so the OS stops treating this as an app.
      try {
        const sub = await self.registration.pushManager.getSubscription();
        if (sub) await sub.unsubscribe();
      } catch {
        /* ignore */
      }

      // 3. Unregister — from here on the site loads straight from the network.
      await self.registration.unregister();

      // 4. Reload open tabs once so they are no longer controlled by a worker.
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        try { client.navigate(client.url); } catch { /* ignore */ }
      }
    })(),
  );
});

// No fetch handler: requests are never intercepted while this worker lives.
