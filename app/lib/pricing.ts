// Sunucu tarafı fiyat doğrulaması: tarayıcıdan gelen tutara güvenilmez.
// Sabit rota ve saatlik rezervasyonlarda fiyat tarifeden yeniden hesaplanır;
// özel güzergâhta (mesafe bilinmiyor) tarayıcının tahmini tutarı kullanılır.
import { routes, transferPrice, hourlyPrice, type VehicleId } from "../config";
import { routeDistanceKm } from "./distance";

const VEHICLES: VehicleId[] = ["business_class_e", "business_family_v", "premium_s"];

export function serverPrice(b: Record<string, unknown>): number | null {
  const p = (b.pricing ?? null) as { routeKey?: string | null; vehicleId?: string | null; hours?: number | null } | null;
  const time = typeof b.time === "string" ? b.time : null;
  const vehicle = p?.vehicleId && (VEHICLES as string[]).includes(p.vehicleId) ? (p.vehicleId as VehicleId) : null;
  if (!p || !vehicle) return null;
  if (p.hours && p.hours > 0) return hourlyPrice(p.hours, vehicle, time);
  const r = p.routeKey ? routes.find((x) => x.slug === p.routeKey) : null;
  if (r) return transferPrice(r.km, vehicle, time);
  return null; // özel güzergâh → serverPriceAsync
}

/** Özel güzergâh dahil: mesafe sunucuda yeniden hesaplanır (Photon + OSRM); olmazsa null */
export async function serverPriceAsync(b: Record<string, unknown>): Promise<number | null> {
  const sync = serverPrice(b);
  if (sync !== null) return sync;
  const p = (b.pricing ?? null) as { vehicleId?: string | null; km?: number | null } | null;
  const vehicle = p?.vehicleId && (VEHICLES as string[]).includes(p.vehicleId) ? (p.vehicleId as VehicleId) : null;
  if (!vehicle || typeof b.pickup !== "string" || typeof b.dropoff !== "string") return null;
  const stops = typeof b.stops === "string" ? b.stops.split(" | ").map((s) => s.trim()).filter(Boolean) : [];
  const time = typeof b.time === "string" ? b.time : null;
  const serverKm = await routeDistanceKm(b.pickup, b.dropoff, stops);
  const clientKm = typeof p?.km === "number" && p.km > 0 && p.km < 2000 ? p.km : null;
  // Sunucu ölçebildiyse onunkini kullan (sapma büyükse de sunucu geçerli); ölçemediyse tarayıcı km'si
  const km = serverKm ?? clientKm;
  if (km === null) return null;
  return transferPrice(km, vehicle, time);
}
