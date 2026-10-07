"use client";

import Image from "next/image";

import { C } from "../../config";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../../components";

export type HotelCard = { slug: string; name: string; place: string; img: string; teaser: string; fromPrice: number | null };

export default function HotelsClient({ groups }: { groups: { key: string; label: string; items: HotelCard[] }[] }) {
  const { lang, P } = useLang();
  const de = lang === "de";
  const title = de ? "Hoteltransfer ab Flughafen Zürich" : "Hotel transfers from Zurich Airport";

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      <PageHero title={title} crumb={de ? "Hoteltransfer" : "Hotel transfers"} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <p aria-hidden className="font-display text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>{title}</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">
          {de
            ? "Vom Gate bis in die Hotellobby: Ihr Chauffeur empfängt Sie in der Ankunftshalle und bringt Sie zum Festpreis direkt vor den Eingang. Für jedes Hotel finden Sie Anfahrt, Fahrzeit, Tipps und den Preis auf einen Blick."
            : "From the gate to the hotel lobby: your chauffeur meets you in the arrivals hall and drives you right to the entrance at a fixed price. For every hotel you'll find the route, driving time, tips and the price at a glance."}
        </p>

        {groups.map((g) => (
          <div key={g.key} className="mt-12">
            <h2 className="font-display border-b border-stone-200 pb-3 text-2xl font-semibold" style={{ color: C.pine }}>{g.label}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((h) => (
                <a
                  key={h.slug}
                  href={P(`/hotels/${h.slug}`)}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-xl"
                >
                  <span className="relative block h-44 overflow-hidden" style={{ backgroundColor: C.pine }}>
                    <Image src={h.img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-bold text-stone-500">{h.place}</span>
                    <span className="mt-1 text-lg font-extrabold leading-snug group-hover:underline" style={{ color: C.pine, textDecorationColor: C.gold }}>
                      {h.name}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{h.teaser}</span>
                    <span className="mt-4 text-sm font-bold" style={{ color: C.goldText }}>
                      {h.fromPrice
                        ? (de ? `Transfer ab CHF ${h.fromPrice.toFixed(2)}` : `Transfer from CHF ${h.fromPrice.toFixed(2)}`)
                        : (de ? "Festpreis berechnen" : "Calculate fixed price")}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}

        <p className="mt-14 max-w-3xl text-xs leading-relaxed text-stone-500">
          {de
            ? "ZRH Airport Taxi ist ein unabhängiger Transferdienst und steht in keiner geschäftlichen Verbindung zu den genannten Hotels. Ihr Hotel ist nicht dabei? Wir fahren an jede Adresse in der Schweiz – geben Sie es einfach bei der Buchung ein."
            : "ZRH Airport Taxi is an independent transfer service and has no business affiliation with the hotels listed. Your hotel isn't here? We drive to any address in Switzerland – just enter it when booking."}
        </p>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
