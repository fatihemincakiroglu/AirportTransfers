import { ImageResponse } from "next/og";
import { tours } from "../../../tourContent";

// Tura özel sosyal paylaşım kartı
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Private Tour from Zurich";

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const tour = tours.find((x) => x.slug === slug);
  const de = lang === "de";
  const c = tour ? (de ? tour.de : tour.en) : null;
  const title = c ? c.title.split("–")[0].trim() : "Private Touren";
  const dur = tour ? `≈ ${tour.hours} ${de ? "Std." : "hrs"}` : "";

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
            {de ? "Private Tour ab Zürich" : "Private Tour from Zurich"}
          </div>
        </div>
        <div style={{ marginTop: 34, fontSize: 78, fontWeight: 600, lineHeight: 1.08, display: "flex" }}>
          {title}
        </div>
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18 }}>
          {dur ? (
            <div style={{ background: "#C9A24B", color: "#0C2E25", borderRadius: 999, padding: "12px 30px", fontWeight: 700, fontSize: 28, display: "flex" }}>
              {dur}
            </div>
          ) : null}
          <div style={{ fontSize: 24, color: "rgba(250,250,247,0.6)", display: "flex" }}>
            AirportTransfers Zürich · Mercedes · 24/7
          </div>
        </div>
      </div>
    ),
    size
  );
}
