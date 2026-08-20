import type { MetadataRoute } from "next";

// PWA DISCONNECTED (2026-08-21) - this file used to live at app/manifest.ts,
// where Next file conventions served it at /manifest.webmanifest AND injected
// a <link rel="manifest"> into every page automatically. Moving it out of app/
// is what actually stops the site being installable; the definition itself is
// kept intact. To re-enable the PWA, move this file back to app/manifest.ts.
//
// Original note: Web App Manifest — makes the site installable as a PWA: a home-screen icon
// that launches full-screen (no browser chrome) with a splash screen. Next
// serves this at /manifest.webmanifest. The site itself is unchanged; browsers
// that don't support PWAs simply ignore the manifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Remedial Building Australia",
    short_name: "RBA",
    description:
      "Australia's remedial building knowledge platform and directory — defects, repair systems, materials, AI-assisted scope writing and a directory of specialists.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0f2748",
    categories: ["business", "productivity", "utilities"],
    icons: [
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
