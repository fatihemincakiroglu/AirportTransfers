import { urlsetXml } from "../sitemap-lib";

export const dynamic = "force-static";

export function GET() {
  return new Response(urlsetXml("en"), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
