import type { MetadataRoute } from "next";
import { SITE_URL } from "./config";

// robots.txt — tüm botlara açık, yapay zekâ botları açıkça izinli.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-en.xml`,
      `${SITE_URL}/sitemap-de.xml`,
    ],
  };
}
