import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : "https://gkgymlife.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/privacy-policy", "/delete-account", "/login"],
        disallow: [
          "/superadmin/",
          "/owner/",
          "/trainer/",
          "/globaltrainer/",
          "/customer/",
          "/api/",
          "/choose-account",
          "/find-organization",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
