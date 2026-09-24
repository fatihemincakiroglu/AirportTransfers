// Özel güzergâh teklifi: yol mesafesi (Photon + OSRM) → tarife (üç araç, gece zammı dahil)
import { NextRequest, NextResponse } from "next/server";
import { routeDistanceKm } from "../../lib/distance";
import { fleet, transferPrice } from "../../config";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  const from = typeof b?.from === "string" ? b.from.trim() : "";
  const to = typeof b?.to === "string" ? b.to.trim() : "";
  const time = typeof b?.time === "string" ? b.time : null;
  const stops = Array.isArray(b?.stops) ? b.stops.filter((s: unknown) => typeof s === "string" && s.trim()).map((s: string) => s.trim()) : [];
  if (!from || !to) return NextResponse.json({ ok: false }, { status: 400 });
  const km = await routeDistanceKm(from, to, stops);
  if (km === null) return NextResponse.json({ ok: false, reason: "distance_unavailable" });
  const prices = Object.fromEntries(fleet.map((v) => [v.id, transferPrice(km, v.id, time)]));
  return NextResponse.json({ ok: true, km, prices });
}
