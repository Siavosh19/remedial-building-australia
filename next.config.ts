import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
