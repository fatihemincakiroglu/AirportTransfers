import { ImageResponse } from "next/og";
import { routes } from "../../config";

// Rotaya özel sosyal paylaşım kartı: "ZRH → Luzern · ab CHF 189.75"
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zurich Airport Transfer";

const nameOf = (to: string | { de: string; en: string }, lang: string) =>
  typeof to === "string" ? to : lang === "de" ? to.de : to.en;

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  const n = route ? nameOf(route.to, lang) : "Schweiz";
  const de = lang === "de";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #08211B 0%, #0C2E25 60%, #123B30 100%)",
          color: "#FAFAF7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 4, background: "#C9A24B" }} />
          <div style={{ fontSize: 24, letterSpacing: 8, color: "#C9A24B", textTransform: "uppercase" }}>
            {de ? "Flughafentransfer" : "Airport Transfer"}
          </div>
        </div>
        <div style={{ marginTop: 34, fontSize: 76, fontWeight: 600, lineHeight: 1.08, display: "flex" }}>
          {`Zürich (ZRH) → ${n}`}
        </div>
        {route ? (
          <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 20, fontSize: 30, color: "rgba(250,250,247,0.75)" }}>
            <div style={{ display: "flex" }}>{`${route.km} km`}</div>
            <div style={{ display: "flex", color: "#C9A24B" }}>·</div>
            <div style={{ display: "flex" }}>{de ? "Festpreis" : "Fixed price"}</div>
          </div>
        ) : null}
        <div style={{ marginTop: 50, display: "flex", alignItems: "center", gap: 18 }}>
          {route ? (
            <div
              style={{
                background: "#C9A24B",
                color: "#0C2E25",
                borderRadius: 999,
                padding: "14px 34px",
                fontWeight: 700,
                fontSize: 30,
                display: "flex",
              }}
            >
              {`${de ? "ab" : "from"} CHF ${route.price.toFixed(2)}`}
            </div>
          ) : null}
          <div style={{ fontSize: 24, color: "rgba(250,250,247,0.6)", display: "flex" }}>
            AirportTransfers Zürich · 24/7
          </div>
        </div>
      </div>
    ),
    size
  );
}
