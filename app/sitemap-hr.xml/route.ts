import { urlsetXml } from "../sitemap-lib";

export const dynamic = "force-static";

export function GET() {
  return new Response(urlsetXml("hr"), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
