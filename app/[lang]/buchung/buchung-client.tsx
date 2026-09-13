"use client";

import { useEffect, useRef, useState } from "react";
import { C, routes, fleet, CUSTOM_BASE_PRICE, MAX_PAX } from "../../config";
import { t } from "../../i18n";
import { tx } from "../../i18nX";
import { useLang } from "../../providers";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons,
  localName, inputCls, labelCls, norm, ExtrasCounter,
  waHref, PlaceField, SelectField, fieldWrap, fieldInput,
} from "../../components";
import { pushEvent, newId, safeLocation, AIRPORT_LOCATION, splitVat, routeId } from "../../lib/analytics";

const PAY_TYPES = ["twint", "cash", "card"] as const; // D.payOptions sırasıyla
const STEP_NAMES = { 1: "route", 2: "vehicle", 3: "contact" } as const;

const AIRPORT = "Flughafen Zürich (ZRH), Schweiz";

/**
 * Serbest metin uçları sabit rotayla eşleştirir (aksan duyarsız, iki dilde).
 * Eşleşme yoksa özel güzergâh döner. Hem URL ön-doldurmada hem de
 * adım 1'deki "İleri" düğmesinde kullanılır.
 */
function resolveTrip(from: string, to: string): { idx: number; rev: boolean; custom: { from: string; to: string } | null } {
  const isAirport = (s: string) => /zrh|flughafen|airport/.test(norm(s));
  const findIdx = (s: string) =>
    s
      ? routes.findIndex((r) => {
          const names = typeof r.to === "string" ? [r.to] : [r.to.de, r.to.en];
          return names.some((nm) => norm(s).includes(norm(nm)) || norm(nm).includes(norm(s)));
        })
      : -1;
  const fromAir = isAirport(from);
  const toAir = isAirport(to);
  let idx = -1;
  let rev = false;
  if (from && to && !fromAir && !toAir) {
    // İki uç da havalimanı değil → sabit rota yok, özel güzergâh
    return { idx: -1, rev: false, custom: { from, to } };
  }
  if (toAir && from) {
    idx = findIdx(from);            // Basel → ZRH
    if (idx >= 0) rev = true;
  } else if (to) {
    idx = findIdx(to);              // ZRH → Basel
  } else if (from && !fromAir) {
    idx = findIdx(from);            // sadece kalkış yazılmış: şehir → ZRH varsay
    if (idx >= 0) rev = true;
  }
  if (idx >= 0) return { idx, rev, custom: null };
  if (from || to) return { idx: -1, rev: false, custom: { from: from || "", to: to || "" } };
  return { idx: -1, rev: false, custom: null };
}

// Talep referans numarası (tıklama anında üretilir)
const makeRef = () => "#" + Math.random().toString(16).slice(2, 10).toUpperCase();

export default function Buchung() {
  const { lang, P } = useLang();
  const XH = tx[lang].hourly; // saatlik kiralama etiketleri (URL ön-doldurma için)
  const X = tx[lang];
  const XS = X.stops;  // ara durak etiketi
  const [stops, setStops] = useState<string[]>([]); // URL'den gelen ara duraklar
  const [doneRef, setDoneRef] = useState<string | null>(null); // talep gönderildi ekranı (referans no)
  const draftRef = useRef<string | null>(null); // son adımda oluşturulan taslak referansı
  // 3 saatlik boşluk kuralı: seçilen saatte araç dolu mu?
  const [slot, setSlot] = useState<{ busy: boolean; nextFree: string | null; reason: string | null }>({ busy: false, nextFree: null, reason: null });

  const [sending, setSending] = useState(false);
  // Stripe'tan dönüş: ödeme başarılıysa onay ekranı, iptalse uyarı
  const [payResult] = useState(() => {
    if (typeof window === "undefined") return { paidRef: null as string | null, canceled: false };
    const q = new URLSearchParams(window.location.search);
    return { paidRef: q.get("paid"), canceled: q.get("canceled") === "1" };
  });

  /**
   * Talebi kaydeder ve Stripe ödeme sayfasına yönlendirir.
   * Ödeme yapılandırılmamışsa eski akışa (kayıt + bildirim) düşer.
   */
  const submitBooking = async () => {
    if (!ready || sending) return;
    setSending(true);
    const r = draftRef.current ?? makeRef();
    const payload = bookingPayload(r, "site");

    // Ölçüm: doğrulama geçti, API isteği hemen ardından (spec §14.2A) — satış DEĞİL
    pushEvent("booking_submit", {
      booking: { booking_type: bookingType, ...(searchIdRef.current ? { search_id: searchIdRef.current } : {}), ...money(total), booking_channel: "web" },
    }, { idPrefix: "submit" });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.ok && data.url) {
        window.location.assign(data.url); // Stripe ödeme sayfası
        return;
      }
    } catch {
      /* ödeme başlatılamadı — talep yine de iletilir */
    }

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* ağ hatası olsa da müşteriye onay gösterilir */
    }
    setSending(false);
    setDoneRef(r);
  };

  // Talebi panele kaydeder (WhatsApp/e-posta akışını etkilemez; sessizce çalışır)
  const bookingPayload = (ref: string, channel: "site" | "taslak") => ({
        ref, channel, lang,
        pickup: showCustom ? custom!.from : reversed ? n : "Flughafen Zürich (ZRH)",
        dropoff: showCustom ? custom!.to : reversed ? "Flughafen Zürich (ZRH)" : n,
        stops: stops.join(" | "),
        date, time,
        pax: Number(f.pax) || null,
        luggage: Number(f.luggage) || null,
        vehicle: chosen ? `${localName(chosen.name, lang)} · ${chosen.car}` : null,
        price: total || null,
        payment: D.payOptions[pay]?.[0] ?? null,
        firstName: f.name, lastName: f.surname, email: f.email, phone: f.phone,
        flight: f.flight, nameboard: f.nameboard,
        extras: [
          extras.baby ? `${D.baby[0]}: ${extras.baby}` : "",
          extras.child ? `${D.child[0]}: ${extras.child}` : "",
          extras.ski ? `${D.ski[0]}: ${extras.ski}` : "",
        ].filter(Boolean).join(", "),
    notes: f.notes,
  });

  const saveBooking = (ref: string, channel: "site" | "taslak") => {
    try {
      const body = JSON.stringify(bookingPayload(ref, channel));
      // sendBeacon: yeni sekme açılırken isteğin kesilmemesi için
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/bookings", new Blob([body], { type: "application/json" }));
      } else {
        fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
      }
    } catch {
      /* kayıt başarısız olsa da rezervasyon akışı devam eder */
    }
  };
  const L = t[lang];
  const B = L.booking;
  const D = L.detail;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [routeIdx, setRouteIdx] = useState<number | null>(null);
  // Adım 1 formu — ana sayfadaki kartla aynı alanlar (serbest uçlar + duraklar)
  const [trip, setTrip] = useState({ from: AIRPORT, to: "" });
  const [hourly, setHourly] = useState(false); // saatlik kiralama (URL'den)
  const [hourlyHours, setHourlyHours] = useState<number | null>(null);
  // Ölçüm: kabul edilen arama kimliği; adım 2'ye ilk geçişte booking_search + results basılır
  const searchIdRef = useRef<string | null>(null);
  const pendingSearchRef = useRef(false);
  const setTripField = (k: "from" | "to", v: string) => setTrip((s) => ({ ...s, [k]: v }));
  const swapTrip = () => setTrip((s) => ({ from: s.to, to: s.from }));
  const setStop = (i: number, v: string) => setStops((a) => a.map((x, j) => (j === i ? v : x)));
  const removeStop = (i: number) => setStops((a) => a.filter((_, j) => j !== i));
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [car, setCar] = useState<number | null>(null);
  const [pay, setPay] = useState(0);
  const [extras, setExtras] = useState({ baby: 0, child: 0, ski: 0 });
  const [f, setF] = useState({
    name: "", surname: "", email: "", phone: "",
    flight: "", nameboard: "", pax: "2", luggage: "2", notes: "",
  });
  const [accepted, setAccepted] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const [reversed, setReversed] = useState(false);
  // İki ucu da havalimanı olmayan özel güzergâh (Uster → Basel gibi)
  const [custom, setCustom] = useState<{ from: string; to: string } | null>(null);

  const bump = (k: "baby" | "child" | "ski", d: number) =>
    setExtras((s) => ({ ...s, [k]: Math.max(0, Math.min(4, s[k] + d)) }));

  // ── Ana sayfa arama formundan gelen verilerle ön-doldurma ──
  // /buchung?from=Basel&to=Flughafen…&date=…&time=…&pax=2&kids=0
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (![...sp.keys()].length) return;
    const g = (k: string) => (sp.get(k) ?? "").trim();
    const from = g("from"), to = g("to"), d = g("date"), tm = g("time");

    // ── Saatlik kiralama modu (ana sayfa formundan) ──
    if (g("mode") === "hourly") {
      const h = g("hours") || "2";
      const paxH = parseInt(g("pax") || "0", 10) || 0;
      /* eslint-disable react-hooks/set-state-in-effect */
      if (d) setDate(d);
      if (tm) setTime(tm);
      if (paxH) setF((s) => ({ ...s, pax: String(Math.min(7, paxH)) }));
      setCustom({ from: "Flughafen Zürich (ZRH)", to: `${XH.bookingLabel} · ${h}h` });
      setHourly(true);
      setHourlyHours(parseInt(h, 10) || null);
      if (d && tm) pendingSearchRef.current = true;
      setF((s) => ({ ...s, notes: XH.bookingNote(h) }));
      if (d && tm) setStep(2);
      return;
    }
    const paxN = parseInt(g("pax") || "0", 10) || 0;
    const kidsN = parseInt(g("kids") || "0", 10) || 0;

    const stopsParam = g("stops");

    // ── Önce tüm hedef durum hesaplanır, sonra TEK blokta uygulanır ──
    const { idx, rev, custom: customPlan } = resolveTrip(from, to);
    let notes = customPlan ? `${from || "?"} → ${to || "?"}` : "";
    // Rota ya da iki uçlu özel güzergâh + zaman belliyse doğrudan araç seçimine geç
    const step2 = Boolean(d && tm) && (idx >= 0 || Boolean(customPlan && from && to));

    // URL → state senkronu mount'ta bir kez çalışır; React tüm bu çağrıları
    // tek render'da toplar (otomatik batching). Bu, dokümante edilmiş
    // "harici sistemle senkron" istisnasıdır.
    const stopList = stopsParam ? stopsParam.split(" | ").map((x) => x.trim()).filter(Boolean) : [];
    if (stopList.length) {
      const line = `${XS.label} ${stopList.join(", ")}`;
      notes = notes ? `${notes}\n${line}` : line;
      setStops(stopList);
    }

    if (d) setDate(d);
    if (tm) setTime(tm);
    if (paxN) setF((s) => ({ ...s, pax: String(Math.min(7, paxN + kidsN)) }));
    if (kidsN) setExtras((s) => ({ ...s, child: Math.min(4, kidsN) }));
    if (customPlan) setCustom(customPlan);
    if (notes) setF((s) => ({ ...s, notes }));
    if (idx >= 0) setRouteIdx(idx);
    if (rev) setReversed(true);
    if (from || to) setTrip({ from: from || AIRPORT, to });
    if (step2) { pendingSearchRef.current = true; setStep(2); }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [XH, XS]);

  // Seçilen tarih/saat için müsaitlik sorgusu (harici sistemle senkron)
  useEffect(() => {
    let alive = true;
    /* eslint-disable react-hooks/set-state-in-effect */
    if (!date || !time) {
      setSlot({ busy: false, nextFree: null, reason: null });
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/availability?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
        const d = await res.json();
        if (alive) setSlot({ busy: !!d.busy, nextFree: d.nextFree ?? null, reason: d.reason ?? null });
        if (alive && d.busy) {
          pushEvent("booking_error", {
            booking: { booking_type: hourly ? "hourly" : "transfer", step: STEP_NAMES[step], booking_channel: "web" },
            error: { error_code: "SLOT_UNAVAILABLE", error_type: "availability" },
          }, { idPrefix: "error" });
        }
      } catch {
        if (alive) setSlot({ busy: false, nextFree: null, reason: null });
      }
    })();
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hourly/step yalnızca hata olayının etiketi; yeniden sorgu gerektirmez
  }, [date, time]);

  const route = routeIdx !== null ? routes[routeIdx] : null;
  const n = route ? localName(route.to, lang) : "";
  const origin = L.routesSec.origin;
  // Seçilen yöne göre A/B uçları (fiyat iki yönde de aynı)

  // Harita için varış zinciri: duraklar + varış ("to:" sözdizimi waypoint verir)
  const chain = (stopsArr: string[], dest: string) =>
    [...stopsArr.map((x) => `${x}, Switzerland`), dest].join(" to:");
  const showCustom = !route && custom !== null;
  const cFrom = showCustom ? (reversed ? custom!.to : custom!.from) : "";
  const cTo = showCustom ? (reversed ? custom!.from : custom!.to) : "";
  const pickupLabel = showCustom ? (cFrom || "—") : reversed ? n : origin;
  const dropoffLabel = showCustom ? (cTo || "—") : reversed ? (origin as string) : n;
  const dur = route
    ? lang === "de"
      ? route.min < 60 ? `${route.min} Min.` : `${Math.floor(route.min / 60)} Std.${route.min % 60 ? ` ${route.min % 60} Min.` : ""}`
      : route.min < 60 ? `${route.min} mins` : `${Math.floor(route.min / 60)} h${route.min % 60 ? ` ${route.min % 60} mins` : ""}`
    : "";

  const sorted = [...fleet].sort((a, b) => a.mult - b.mult);
  const chosen = car !== null ? sorted[car] : null;
  // Fiyat tabanı: sabit rota fiyatı ya da (geçici) özel güzergâh taban fiyatı
  const basePrice = route ? route.price : showCustom && custom!.from && custom!.to ? CUSTOM_BASE_PRICE : 0;
  const hasTrip = route !== null || (showCustom && !!custom!.from && !!custom!.to);
  const total = hasTrip && chosen ? basePrice * chosen.mult : 0;

  // ── Ölçüm yardımcıları (kişisel veri yok; özel adres yalnızca type:"address") ──
  const bookingType = hourly ? "hourly" : "transfer";
  const priceFinal = route !== null; // sabit rota = kesin fiyat; özel/saatlik = tahmini
  const tripLocations = () => {
    if (hourly) return { pickup: AIRPORT_LOCATION };
    if (route) return reversed
      ? { pickup: safeLocation(n), destination: AIRPORT_LOCATION }
      : { pickup: AIRPORT_LOCATION, destination: safeLocation(n) };
    return { pickup: safeLocation(cFrom), destination: safeLocation(cTo) };
  };
  const money = (gross: number) => {
    if (!priceFinal) return { price_status: "estimated" as const, estimated_value: Math.round(gross * 100) / 100, currency: "CHF" };
    const m = splitVat(gross);
    return { price_status: "final" as const, currency: "CHF", gross_value: m.gross, net_value: m.net, tax_value: m.tax, shipping_value: 0 };
  };
  const vehicleItem = (v: (typeof sorted)[number], index: number, gross: number) => ({
    item_id: `${bookingType}_${v.id}`,
    item_name: hourly ? "Hourly Chauffeur" : "Private Transfer",
    item_category: bookingType,
    item_category2: v.id.replace(/_[a-z]$/, ""),
    item_variant: v.id,
    item_list_id: "booking_vehicle_results",
    item_list_name: "Available Vehicles",
    index,
    quantity: 1,
    ...(priceFinal ? { price: splitVat(gross).net, gross_unit_value: splitVat(gross).gross, tax_unit_value: splitVat(gross).tax } : {}),
  });
  const vehicleObj = (v: (typeof sorted)[number], gross: number) => ({
    vehicle_id: v.id, vehicle_name: v.car, vehicle_class: v.id.replace(/_[a-z]$/, ""),
    passenger_capacity: v.pax, luggage_capacity: v.bags,
    ...(priceFinal ? { price: Math.round(gross * 100) / 100, currency: "CHF" } : {}),
  });
  const routeObj = route ? { route: { route_id: routeId(route.slug), origin_id: "zrh_airport", destination_id: safeLocation(n).location_id } } : {};

  const step1Ready = (hourly || (trip.from.trim() && trip.to.trim())) && date && time;

  // Adım 2'ye yeni bir aramayla gelindiğinde: booking_search → booking_results_view (araç listesi)
  useEffect(() => {
    if (step !== 2 || !pendingSearchRef.current || !hasTrip) return;
    pendingSearchRef.current = false;
    const searchId = newId("srch");
    searchIdRef.current = searchId;
    const loc = tripLocations();
    pushEvent("booking_search", {
      booking: {
        booking_type: bookingType, search_id: searchId, ...loc,
        pickup_date: date, pickup_time: time,
        passengers: Number(f.pax) || 1, children: extras.child, stops_count: stops.length,
        ...(hourly && hourlyHours ? { duration_hours: hourlyHours } : {}),
        return_trip: false,
        ...(priceFinal ? {} : { price_status: "estimated", estimated_value: basePrice, currency: "CHF" }),
        booking_channel: "web",
      },
      ...routeObj,
    }, { id: `search_${searchId}` });
    const prices = sorted.map((v) => Math.round(basePrice * v.mult * 100) / 100);
    pushEvent("booking_results_view", {
      booking: { booking_type: bookingType, search_id: searchId, booking_channel: "web" },
      results: {
        available_vehicle_count: sorted.length, currency: "CHF", results_version: 1,
        ...(route ? { distance_km: route.km, duration_minutes: route.min } : {}),
        ...(priceFinal ? { lowest_price: Math.min(...prices), highest_price: Math.max(...prices) } : {}),
      },
      ecommerce: {
        currency: "CHF", item_list_id: "booking_vehicle_results", item_list_name: "Available Vehicles",
        items: sorted.map((v, i) => vehicleItem(v, i, basePrice * v.mult)),
      },
    }, { id: `results_${searchId}_1` });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- yalnızca adım 2'ye geçiş anında, o anki durumla
  }, [step, hasTrip]);

  // Araç seçimi → vehicle_select + booking_begin, sonra adım 3
  const selectVehicle = (i: number) => {
    const v = sorted[i];
    const gross = basePrice * v.mult;
    const searchId = searchIdRef.current;
    const base = { booking_type: bookingType, ...(searchId ? { search_id: searchId } : {}), ...money(gross), booking_channel: "web" };
    pushEvent("vehicle_select", {
      booking: base, vehicle: vehicleObj(v, gross), ...routeObj,
      ecommerce: { currency: "CHF", ...(priceFinal ? { value: splitVat(gross).net, tax: splitVat(gross).tax } : {}),
        item_list_id: "booking_vehicle_results", item_list_name: "Available Vehicles", items: [vehicleItem(v, i, gross)] },
    }, { idPrefix: "vehicle_sel" });
    pushEvent("booking_begin", {
      booking: base, ...routeObj,
      ecommerce: { currency: "CHF", ...(priceFinal ? { value: splitVat(gross).net, tax: splitVat(gross).tax } : {}), items: [vehicleItem(v, i, gross)] },
    }, { idPrefix: "begin" });
    setCar(i);
    go(3);
  };

  // Ödeme yöntemi seçimi → booking_payment_info (UI seçimi; doğrulanmış ödeme değil)
  const selectPay = (i: number) => {
    setPay(i);
    if (!chosen) return;
    pushEvent("booking_payment_info", {
      booking: { booking_type: bookingType, ...(searchIdRef.current ? { search_id: searchIdRef.current } : {}), ...money(total), booking_channel: "web" },
      payment: { selected_payment_type: PAY_TYPES[i] ?? "other" },
      ecommerce: { currency: "CHF", ...(priceFinal ? { value: splitVat(total).net, tax: splitVat(total).tax } : {}), items: [vehicleItem(chosen, car ?? 0, total)] },
    }, { idPrefix: "payment_info" });
  };

  // Adım 1 → 2: serbest uçları rotayla eşleştir, özel güzergâh/durak notlarını kur
  const applyTrip = () => {
    if (!step1Ready) return;
    if (!hourly) {
      const from = trip.from.trim();
      const to = trip.to.trim();
      const r = resolveTrip(from, to);
      setRouteIdx(r.idx >= 0 ? r.idx : null);
      setReversed(r.rev);
      setCustom(r.custom);
      setCar(null);
      const cleanStops = stops.map((x) => x.trim()).filter(Boolean);
      setStops(cleanStops);
      const lines = [
        r.custom ? `${from} → ${to}` : "",
        cleanStops.length ? `${XS.label} ${cleanStops.join(", ")}` : "",
      ].filter(Boolean);
      setF((s) => ({ ...s, notes: lines.join("\n") }));
    }
    pendingSearchRef.current = true;
    go(2);
  };
  const ready = accepted && f.name && f.surname && f.email && f.phone && f.flight && !slot.busy;


  const go = (s: 1 | 2 | 3) => {
    // Son adıma geçerken talebi şimdiden kaydet: müşteri tarayıcıyı
    // kapatsa bile kayıt panelde kalır (WhatsApp'a basınca güncellenir).
    if (s === 3 && !draftRef.current) {
      const r = makeRef();
      draftRef.current = r;
      saveBooking(r, "taslak");
    }
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      {/* Başlık + adım göstergesi — fildişi zeminde kesintisiz */}
      <section style={{ background: C.ivory }}>
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-8">
          <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
            <a href={P("/")} className="transition-colors hover:text-[#0C2E25]">{L.nav.home}</a>
            <span className="text-stone-300">/</span>
            <span style={{ color: C.pine }}>{B.title}</span>
          </nav>
          <h1 className="sr-only">{B.title}</h1>

          {/* Stepper */}
          <ol className="mt-4 flex flex-wrap gap-2">
            {B.steps.map((s, i) => {
              const num = (i + 1) as 1 | 2 | 3;
              const active = step === num;
              const done = step > num;
              return (
                <li key={i}>
                  <button
                    onClick={() => { if (done) go(num); }}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors"
                    style={
                      active
                        ? { background: C.gold, color: C.pine }
                        : done
                          ? { background: "#0C2E2514", color: C.pine, cursor: "pointer" }
                          : { background: "#0C2E250A", color: "#a8a29e" }
                    }
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-[10px]"
                      style={active ? { borderColor: C.pine } : { borderColor: "currentColor" }}>
                      {done ? "✓" : num}
                    </span>
                    {s}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div aria-hidden className="mx-auto h-px max-w-7xl px-5">
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${C.gold} 0%, ${C.gold}66 30%, transparent 75%)` }} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[1.7fr_1fr] md:py-14">
        <div>
          {/* ── ADIM 1: Rota + tarih & saat ────────────────── */}
          {step === 1 && (
            <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 md:p-6">
              <h2 className="font-display mb-4 text-2xl font-semibold" style={{ color: C.pine }}>{B.steps[0]}</h2>
              {hourly ? (
                <div className="flex items-start justify-between gap-3 rounded-xl px-4 py-3.5 text-sm" style={{ background: "#FBF7EE" }}>
                  <span className="min-w-0">
                    <b className="block break-words" style={{ color: C.pine }}>{custom!.from} → {custom!.to}</b>
                    <span className="block text-[11px] text-stone-500">{XH.note}</span>
                  </span>
                  <span className="shrink-0 text-base" style={{ color: C.gold }}>✓</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Nereden / Nereye + değiştir düğmesi */}
                  <div className="relative grid gap-4 md:grid-cols-[1fr_auto_1fr]">
                    <PlaceField label={L.form.from} icon="🚗" value={trip.from} placeholder={L.form.fromPh} onChange={(v) => setTripField("from", v)} />
                    <button
                      type="button"
                      onClick={swapTrip}
                      aria-label="swap"
                      className="hidden h-9 w-9 items-center justify-center self-center rounded-full border bg-white text-sm shadow-md transition-all hover:rotate-180 hover:shadow-lg md:mt-5 md:flex"
                      style={{ borderColor: C.gold, color: C.pine }}
                    >⇆</button>
                    <PlaceField label={L.form.to} icon="📍" value={trip.to} placeholder={L.form.toPh} onChange={(v) => setTripField("to", v)} />
                  </div>

                  {/* Ara duraklar */}
                  {stops.map((sv, i) => (
                    <div key={i} className="flex items-end gap-2">
                      <div className="min-w-0 flex-1">
                        <PlaceField label={`${i + 1}. ${XS.ph}`} icon="🚏" value={sv} placeholder={XS.ph} onChange={(v) => setStop(i, v)} />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStop(i)}
                        aria-label={XS.remove}
                        className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                      >✕</button>
                    </div>
                  ))}
                  {stops.length < 3 && (
                    <button
                      type="button"
                      onClick={() => setStops((a) => [...a, ""])}
                      className="flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
                      style={{ color: C.pine }}
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px]" style={{ background: `${C.gold}22`, color: C.gold }}>+</span>
                      {XS.add}
                    </button>
                  )}
                </div>
              )}

              {/* Tarih / Saat */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>📅 {L.form.date}</label>
                  <div className={fieldWrap}>
                    <input type="date" className={fieldInput} value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>🕐 {L.form.time}</label>
                  <div className={fieldWrap}>
                    <input type="time" className={fieldInput} value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Yolcu / Çocuk */}
              {!hourly && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <SelectField
                    label={L.form.pax}
                    icon="👥"
                    value={f.pax}
                    options={Array.from({ length: MAX_PAX }, (_, i) => i + 1)}
                    onChange={(v) => set("pax", v)}
                  />
                  <SelectField
                    label={L.form.kids}
                    icon="🧒"
                    value={String(extras.child)}
                    options={[0, 1, 2, 3, 4]}
                    onChange={(v) => setExtras((s) => ({ ...s, child: Number(v) }))}
                  />
                </div>
              )}
              <button
                onClick={applyTrip}
                disabled={!step1Ready}
                className={`mt-6 w-full rounded-full px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition-all ${step1Ready ? "hover:-translate-y-0.5" : "cursor-not-allowed opacity-40"}`}
                style={{ background: step1Ready ? C.pine : "#9ca3af" }}
              >
                {B.next} →
              </button>
            </div>
          )}

          {/* ── ADIM 2: Araç seçimi ─────────────────────────── */}
          {step === 2 && hasTrip && (
            <>
              <h2 className="font-display mb-4 text-2xl font-semibold" style={{ color: C.pine }}>{D.selectCar}</h2>
              <div className="space-y-4">
                {sorted.map((v, i) => (
                  <div key={i} className="grid gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:grid-cols-[200px_1fr_auto] sm:items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.img} alt={v.car} className="mx-auto h-24 object-contain" />
                    <div>
                      <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>{localName(v.name, lang)}</h3>
                      <p className="text-sm text-stone-500">{v.car}</p>
                      <p className="mt-1 text-sm">👥 {v.pax} · 🧳 {v.bags}</p>
                      <ul className="mt-2 grid gap-x-4 gap-y-0.5 text-xs text-stone-500 sm:grid-cols-2">
                        {D.feats.map((ft, j) => <li key={j}>✓ {ft}</li>)}
                      </ul>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="font-mono text-2xl font-extrabold" style={{ color: C.pine }}>
                        CHF {(basePrice * v.mult).toFixed(2)}
                      </p>
                      <p className="mb-3 text-[11px] text-stone-500">{D.priceNote}</p>
                      <button
                        onClick={() => selectVehicle(i)}
                        className="w-full rounded-full px-6 py-2.5 text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                        style={{ background: C.pine }}
                      >
                        {D.select}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => go(1)} className="mt-5 rounded-full border px-6 py-2.5 text-sm font-bold" style={{ borderColor: C.pine, color: C.pine }}>
                ← {D.back}
              </button>
            </>
          )}

          {/* ── ADIM 3: Ödeme + iletişim ────────────────────── */}
          {step === 3 && hasTrip && chosen && (
            <>

              <h2 className="font-display mb-3 text-2xl font-semibold" style={{ color: C.pine }}>{D.payTitle}</h2>
              <div className="mb-8 grid grid-cols-3 gap-3">
                {D.payOptions.map(([title, desc], i) => (
                  <button
                    key={i}
                    onClick={() => selectPay(i)}
                    className="rounded-2xl border-2 bg-white p-4 text-center text-xs font-bold uppercase tracking-wide transition-all"
                    style={pay === i ? { borderColor: C.gold, boxShadow: "0 4px 14px rgba(201,162,75,0.25)" } : { borderColor: "#e7e5e4" }}
                  >
                    <span className="mb-1 block text-xl">{["📱", "💵", "💳"][i]}</span>
                    {title}
                    <span className="mt-1 block text-[10px] font-medium normal-case text-stone-500">{desc}</span>
                  </button>
                ))}
              </div>

              <h2 className="font-display mb-3 text-2xl font-semibold" style={{ color: C.pine }}>{D.paxTitle}</h2>
              <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 md:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={inputCls} placeholder={`${D.name} *`} value={f.name} onChange={(e) => set("name", e.target.value)} />
                  <input className={inputCls} placeholder={`${D.surname} *`} value={f.surname} onChange={(e) => set("surname", e.target.value)} />
                  <input type="email" className={inputCls} placeholder={`${D.email} *`} value={f.email} onChange={(e) => set("email", e.target.value)} />
                  <input type="tel" className={inputCls} placeholder={`${D.phone} * (+41 …)`} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>

                <div className="mt-4">
                  <ExtrasCounter title={D.baby[0]} desc={D.baby[1]} freeLabel={D.free} value={extras.baby} onBump={(d) => bump("baby", d)} />
                  <ExtrasCounter title={D.child[0]} desc={D.child[1]} freeLabel={D.free} value={extras.child} onBump={(d) => bump("child", d)} />
                  <ExtrasCounter title={D.ski[0]} desc={D.ski[1]} freeLabel={D.free} value={extras.ski} onBump={(d) => bump("ski", d)} />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input className={inputCls} placeholder={`${D.flight} *`} value={f.flight} onChange={(e) => set("flight", e.target.value)} />
                  <input className={inputCls} placeholder={D.nameboard} value={f.nameboard} onChange={(e) => set("nameboard", e.target.value)} />
                  <div>
                    <label className={labelCls}>👥 {L.form.pax}</label>
                    <select className={inputCls} value={f.pax} onChange={(e) => set("pax", e.target.value)}>
                      {Array.from({ length: chosen.pax }, (_, i) => i + 1).map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>🧳 {D.luggage}</label>
                    <select className={inputCls} value={f.luggage} onChange={(e) => set("luggage", e.target.value)}>
                      {Array.from({ length: chosen.bags }, (_, i) => i + 1).map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                </div>

                <textarea rows={4} className={`${inputCls} mt-4`} placeholder={D.notes} value={f.notes} onChange={(e) => set("notes", e.target.value)} />

                <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="h-4 w-4 accent-[#C9A24B]" />
                  {D.accept} *
                </label>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => go(2)} className="rounded-full border px-6 py-3 text-sm font-bold" style={{ borderColor: C.pine, color: C.pine }}>
                    ← {D.back}
                  </button>
                  {slot.busy && (
                    <div className="mb-4 rounded-2xl border p-4" style={{ borderColor: "#FDE68A", background: "#FFFBEB" }}>
                      <p className="text-sm font-bold" style={{ color: "#92400E" }}>⚠ {X.night.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#92400E" }}>{X.night.text}</p>
                      {slot.nextFree && (
                        <p className="mt-1.5 text-sm font-semibold" style={{ color: "#92400E" }}>
                          {X.night.earliest} {slot.nextFree}
                        </p>
                      )}
                      <a
                        href={waHref(`${X.night.title} — ${date} ${time} · ${showCustom ? `${custom!.from} → ${custom!.to}` : `Flughafen Zürich (ZRH) → ${n}`}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white"
                        style={{ background: "#25D366" }}
                      >
                        💬 {X.busy.cta}
                      </a>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!ready || sending}
                    onClick={submitBooking}
                    className={`flex-1 rounded-full px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider transition-all ${
                      ready && !sending ? "hover:-translate-y-0.5" : "cursor-not-allowed opacity-40"
                    }`}
                    style={{ background: C.gold, color: C.pine }}
                  >
                    {sending ? `${D.sending}…` : `${X.pay.cta} — CHF ${total.toFixed(2)}`}
                  </button>
                </div>

                <p className="mt-3 text-center text-xs text-stone-500">🔒 {X.pay.note}</p>
                <p className="mt-1.5 text-center text-xs text-stone-500">{D.confirmNote}</p>
              </div>
            </>
          )}
        </div>

        {/* ── Sağ: canlı özet ───────────────────────────────── */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
            <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>{D.summary}</h3>
            <ul className="relative mt-4 space-y-3 text-sm">
              <li className="flex gap-3 pr-10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: "#E2574C" }}>A</span>
                <span><b>{route || showCustom ? pickupLabel : origin}</b><span className="block text-xs text-stone-500">{D.pickupLoc}</span></span>
              </li>
              {(reversed ? [...stops].reverse() : stops).map((sv, i) => (
                <li key={i} className="flex gap-3 pr-10">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold" style={{ background: `${C.gold}22`, color: C.pine, boxShadow: `inset 0 0 0 1.5px ${C.gold}` }}>{i + 1}</span>
                  <span><b>{sv}</b><span className="block text-xs text-stone-500">{XS.ph.split(" –")[0]}</span></span>
                </li>
              ))}
              <li className="flex gap-3 pr-10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: C.pine }}>B</span>
                <span>
                  <b>{route || showCustom ? dropoffLabel : "—"}</b>
                  <span className="block text-xs text-stone-500">{D.dropoffLoc}</span>
                </span>
              </li>
              {(route || showCustom) && (
                <button
                  type="button"
                  onClick={() => setReversed((r) => !r)}
                  title={lang === "de" ? "Richtung tauschen" : "Swap direction"}
                  aria-label="swap direction"
                  className="absolute right-0 top-7 flex h-8 w-8 items-center justify-center rounded-full border bg-white text-sm shadow-sm transition-all hover:rotate-180 hover:shadow-md"
                  style={{ borderColor: C.gold, color: C.pine }}
                >⇅</button>
              )}
              {(date || time) && (
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100">📅</span>
                  <span><b>{date}</b> {time && <b>· {time}</b>}</span>
                </li>
              )}
            </ul>

            {showCustom && cFrom && cTo && (
              <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
                <iframe
                  title="Custom route map"
                  src={`https://maps.google.com/maps?saddr=${encodeURIComponent(cFrom + ", Switzerland")}&daddr=${encodeURIComponent(chain(reversed ? [...stops].reverse() : stops, cTo + ", Switzerland"))}&hl=${lang}&output=embed`}
                  className="h-52 w-full"
                  loading="lazy"
                />
              </div>
            )}
            {route && (
              <>
                <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
                  <iframe
                    title="Route map"
                    src={`https://maps.google.com/maps?saddr=${encodeURIComponent(reversed ? n + ", Switzerland" : "Zurich Airport")}&daddr=${encodeURIComponent(chain(reversed ? [...stops].reverse() : stops, reversed ? "Zurich Airport" : n + ", Switzerland"))}&hl=${lang}&output=embed`}
                    className="h-52 w-full"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4 text-sm">
                  <span><span className="block text-xs text-stone-500">{D.distance}</span><b>{route.km} km</b></span>
                  <span><span className="block text-xs text-stone-500">{D.time}</span><b>{dur}</b></span>
                </div>
              </>
            )}

            {chosen && (
              <div className="mt-4 border-t border-stone-100 pt-4 text-sm">
                <span className="block text-xs text-stone-500">{D.vehicle}</span>
                <b>{localName(chosen.name, lang)}</b>
                <p className="text-xs text-stone-500">{chosen.car} · {chosen.pax} 👥 · {chosen.bags} 🧳</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chosen.img} alt={chosen.car} className="mx-auto mt-2 h-20 object-contain" />
              </div>
            )}
          </div>

          {hasTrip && chosen && (
            <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <b style={{ color: C.gold }}>{D.total}</b>
                <span className="font-mono text-2xl font-extrabold" style={{ color: C.pine }}>
                  CHF {total.toFixed(2)}
              {showCustom && (
                <p className="mt-1 text-right text-[11px] text-stone-500">
                  {lang === "de" ? "Individuelle Strecke – Endpreis wird per WhatsApp bestätigt." : "Custom route – final price confirmed via WhatsApp."}
                </p>
              )}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">{D.priceNote}</p>
            </div>
          )}
        </aside>
      </section>

      {/* Stripe ödemesi iptal edildiyse uyarı */}
      {payResult.canceled && !doneRef && (
        <div className="mx-auto max-w-7xl px-5 pt-4">
          <p className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: "#FDE68A", background: "#FFFBEB", color: "#92400E" }}>
            ⚠ {X.pay.canceled}
          </p>
        </div>
      )}

      {/* ── Talep gönderildi — bilgilendirme ekranı ── */}
      {(doneRef || payResult.paidRef) && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl md:p-9">
            <button
              type="button"
              onClick={() => setDoneRef(null)}
              aria-label="close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
            >✕</button>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">✓</span>
            <h3 className="font-display mt-4 text-2xl font-semibold" style={{ color: C.pine }}>
              {payResult.paidRef ? X.pay.success : X.done.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {payResult.paidRef ? X.pay.successText : X.done.body(doneRef!)}
            </p>
            <p className="mt-2 text-sm font-bold" style={{ color: C.pine }}>
              {payResult.paidRef ?? doneRef}
            </p>

            <div className="mt-4 rounded-xl border px-4 py-3 text-sm font-medium" style={{ background: "#FFFBEB", borderColor: "#FDE68A", color: "#92400E" }}>
              {X.done.hint}
            </div>

            {chosen && (
            <div className="mt-4 space-y-2 rounded-xl bg-stone-50 p-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-stone-500">{D.vehicle}</span>
                <b>{localName(chosen.name, lang)}</b>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-stone-500">{D.total}</span>
                <b>CHF {total.toFixed(2)}</b>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-stone-500">{X.done.payment}</span>
                <b>{payResult.paidRef ? "Online ✓" : D.payOptions[pay][1]}</b>
              </div>
            </div>
            )}

            <a
              href={P("/")}
              className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              style={{ background: C.gold, color: C.pine }}
            >
              {X.done.home}
            </a>
          </div>
        </div>
      )}

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
