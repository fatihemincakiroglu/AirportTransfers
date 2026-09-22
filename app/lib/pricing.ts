// Sunucu tarafı fiyat doğrulaması: tarayıcıdan gelen tutara güvenilmez.
// Sabit rota ve saatlik rezervasyonlarda fiyat tarifeden yeniden hesaplanır;
// özel güzergâhta (mesafe bilinmiyor) tarayıcının tahmini tutarı kullanılır.
import { routes, transferPrice, hourlyPrice, type VehicleId } from "../config";

const VEHICLES: VehicleId[] = ["business_class_e", "business_family_v", "premium_s"];

export function serverPrice(b: Record<string, unknown>): number | null {
  const p = (b.pricing ?? null) as { routeKey?: string | null; vehicleId?: string | null; hours?: number | null } | null;
  const time = typeof b.time === "string" ? b.time : null;
  const vehicle = p?.vehicleId && (VEHICLES as string[]).includes(p.vehicleId) ? (p.vehicleId as VehicleId) : null;
  if (!p || !vehicle) return null;
  if (p.hours && p.hours > 0) return hourlyPrice(p.hours, vehicle, time);
  const r = p.routeKey ? routes.find((x) => x.slug === p.routeKey) : null;
  if (r) return transferPrice(r.km, vehicle, time);
  return null; // özel güzergâh
}
