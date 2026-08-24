import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cache optimised variants for 31 days. Without this the optimiser re-pulls
    // multi-MB originals from Supabase Storage every time the upstream cache
    // header expires, which is what blew the Supabase egress quota.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "krttmsatnftkdnbtwouy.supabase.co" },
      { protocol: "https", hostname: "remedialbuildingaustralia.com.au" },
      { protocol: "https", hostname: "www.remedialbuildingaustralia.com.au" },
    ],
  },
  async redirects() {
    return [
      // ── Merge: slab-edge-deterioration → concrete-spalling (permanent) ──
      {
        source: "/repair-systems/slab-edge-deterioration",
        destination: "/repair-systems/concrete-spalling",
        permanent: true,
      },
      {
        source: "/repair-systems/slab-edge-deterioration/:path*",
        destination: "/repair-systems/concrete-spalling/:path*",
        permanent: true,
      },
      // ── Merge: settlement-cracks → concrete-cracking (permanent) ──
      // lime-repointing-mortars was dropped (masonry) → send to the cracking landing.
      {
        source: "/repair-systems/settlement-cracks/lime-repointing-mortars",
        destination: "/repair-systems/concrete-cracking",
        permanent: true,
      },
      {
        source: "/repair-systems/settlement-cracks",
        destination: "/repair-systems/concrete-cracking",
        permanent: true,
      },
      {
        source: "/repair-systems/settlement-cracks/:path*",
        destination: "/repair-systems/concrete-cracking/:path*",
        permanent: true,
      },
      // Poor falls / flat roofs → balcony waterproofing (permanent)
      {
        source: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/polymer-modified-screed",
        destination: "/repair-systems/balcony-waterproofing-failure/screed-systems-polymer-modified",
        permanent: true,
      },
      {
        source: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/tapered-insulation-board",
        destination: "/repair-systems/balcony-waterproofing-failure/tapered-insulation-board-systems",
        permanent: true,
      },
      {
        source: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/drainage-outlet-systems",
        destination: "/repair-systems/balcony-waterproofing-failure/drainage-podium-outlets-scuppers",
        permanent: true,
      },
      {
        source: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs/waterproofing-membrane-flat-roof",
        destination: "/repair-systems/balcony-waterproofing-failure/tpo-fpo-sheet-membranes-exposed",
        permanent: true,
      },
      {
        source: "/repair-systems/roofing-defects/poor-falls-ponding-flat-roofs",
        destination: "/repair-systems/roofing-defects",
        permanent: true,
      },
      // ── AI Scope Builder withdrawn 2026-08-24 ──
      // Kept as a redirect rather than a 404 because ~1,000 in-content CTAs
      // across the repair-system pages still point here. permanent:false (307)
      // so nothing is cached irreversibly.
      {
        source: "/ai-scope-builder",
        destination: "/expert-remedial-advice",
        permanent: false,
      },
      {
        source: "/ai-scope-builder/:path*",
        destination: "/expert-remedial-advice",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
