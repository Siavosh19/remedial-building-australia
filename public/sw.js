/*
 * Remedial Building Australia — service worker (PWA offline support).
 *
 * Caching strategy is chosen so the "app" NEVER shows stale content:
 *   - Page navigations   -> network-first: always fetch the latest; fall back to
 *                           cache (then the offline page) only when offline.
 *   - Static assets      -> cache-first: /_next/static/* and images/fonts are
 *                           version-hashed by Next on every deploy, so a new
 *                           build produces new URLs — cached copies can never be
 *                           stale for the wrong build.
 *   - API + private pages-> never cached (admin/dashboard/client/api/auth go
 *                           straight to the network).
 *
 * Bump CACHE_VERSION to force old caches to be cleared on the next deploy.
 */
const CACHE_VERSION = "v3";
const STATIC_CACHE = `rba-static-${CACHE_VERSION}`;
const PAGE_CACHE = `rba-pages-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

// Pages that must never be stored in the cache (authenticated / dynamic).
const PRIVATE = /^\/(api|directory\/admin|directory\/dashboard|directory\/login|directory\/logout|client)(\/|$)/;

const STATIC_ASSET = /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|svg|webp|gif|ico|avif)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.add(OFFLINE_URL)).catch(() => {}),
  );
  // Activate this SW immediately rather than waiting for old tabs to close.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.endsWith(CACHE_VERSION))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function cacheable(response) {
  return response && response.status === 200 && response.type === "basic";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Only handle our own origin — never touch cross-origin (analytics, fonts CDN, APIs).
  if (url.origin !== self.location.origin) return;

  // Version-hashed static assets → cache-first.
  if (url.pathname.startsWith("/_next/static/") || STATIC_ASSET.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (cacheable(response)) {
              const copy = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  // Page navigations → network-first (fresh content), offline fallback.
  if (request.mode === "navigate") {
    // Authenticated / dynamic pages: straight to network, never cached.
    if (PRIVATE.test(url.pathname)) return;

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (cacheable(response)) {
            const copy = response.clone();
            caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL)),
        ),
    );
    return;
  }

  // Everything else (API GETs, etc.) → default network handling, uncached.
});

// ── Web Push ─────────────────────────────────────────────────────────────────
// Show an OS notification when the server pushes one (payload = {title,body,url}).
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: "Remedial Building Australia", body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "Remedial Building Australia";
  const options = {
    body: data.body || "",
    icon: "/icon.png",
    badge: "/icon.png",
    data: { url: data.url || "/" },
    tag: data.tag || undefined,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Focus an existing window on the target URL, or open a new one.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(target).catch(() => {});
          return client.focus();
        }
      }
      return self.clients.openWindow(target);
    }),
  );
});
