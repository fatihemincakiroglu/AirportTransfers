import { ImageResponse } from "next/og";

// Site geneli sosyal paylaşım kartı (WhatsApp, LinkedIn, X...)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AirportTransfers Zürich – Private Airport Transfers at Fixed Prices";

export default async function OgImage() {
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
          <div style={{ fontSize: 26, letterSpacing: 8, color: "#C9A24B", textTransform: "uppercase" }}>
            Zurich · Private Transfer
          </div>
        </div>
        <div style={{ marginTop: 36, fontSize: 84, fontWeight: 600, lineHeight: 1.05, display: "flex" }}>
          AirportTransfers Zürich
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: "rgba(250,250,247,0.75)", display: "flex" }}>
          VIP Mercedes · Festpreis · Meet &amp; Greet · 24/7
        </div>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#0C2E25",
          }}
        >
          <div style={{ background: "#C9A24B", borderRadius: 999, padding: "14px 34px", fontWeight: 700, display: "flex" }}>
            ZRH → Ganze Schweiz
          </div>
        </div>
      </div>
    ),
    size
  );
}
