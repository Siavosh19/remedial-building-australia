import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/directory/admin",
          "/directory/admin-review",
          "/directory/dashboard",
          "/directory/login",
          "/directory/signup",
          "/directory/forgot-password",
          "/directory/reset-password",
        ],
      },
    ],
    sitemap: "https://www.remedialbuildingaustralia.com.au/sitemap.xml",
  };
}
