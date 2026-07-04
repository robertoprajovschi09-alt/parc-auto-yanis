import { Link } from "@tanstack/react-router";
import { Calendar, Camera, Fuel, Gauge, MapPin, Settings2, Zap } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { formatKm, priceLabel } from "@/lib/vehicles";
import { monthlyPayment } from "@/lib/finance";

/*
 * The most important component on the site. One job: let anyone read
 * "what car, what price, key facts, where" in under 3 seconds.
 * The whole card is one link; no hover-only information. Only real specs
 * are shown — missing fields simply don't render.
 */
export function VehicleCard({ v }: { v: Vehicle; index?: number }) {
  const specs = [
    v.year != null && { icon: Calendar, label: "An", value: String(v.year) },
    v.mileage != null && { icon: Gauge, label: "Kilometraj", value: formatKm(v.mileage) },
    v.fuel && { icon: Fuel, label: "Combustibil", value: v.fuel },
    v.transmission && { icon: Settings2, label: "Cutie", value: v.transmission },
    (v.power || v.engine) && {
      icon: Zap,
      label: "Motor",
      value: [v.engine, v.power].filter(Boolean).join(" · "),
    },
    { icon: MapPin, label: "Locație", value: v.location },
  ].filter(Boolean) as { icon: typeof Calendar; label: string; value: string }[];

  return (
    <article className="group relative overflow-hidden rounded-lg bg-surface shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift">
      <Link to="/vehicul/$slug" params={{ slug: v.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={v.image}
            alt={`${v.brand} ${v.model}${v.year ? `, ${v.year}` : ""}`}
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {v.tag && (
            <span className="absolute top-3 left-3 rounded-md bg-sun px-2.5 py-1 text-[13px] font-bold text-ink shadow-sm">
              {v.tag}
            </span>
          )}
          {v.photos && v.photos.length > 1 && (
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-ink/75 px-2.5 py-1 text-[13px] font-semibold text-white">
              <Camera size={13} aria-hidden />
              {v.photos.length}
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-[17px] leading-snug font-extrabold text-ink transition-colors duration-200 group-hover:text-brand">
            {v.brand} {v.model}
          </h3>
          <p className="mt-2 text-[24px] leading-none font-extrabold tracking-tight text-brand">
            {priceLabel(v)}
          </p>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {specs.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-[14px] text-ink-soft">
                <s.icon size={15} aria-hidden className="shrink-0 text-graphite/80" />
                <span className="sr-only">{s.label}: </span>
                <span className="truncate font-semibold">{s.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/8 pt-4">
            <p className="text-[13px] text-graphite">
              {v.price != null
                ? `Rată orientativă: ${monthlyPayment(v.price)} €/lună`
                : "Sună pentru ofertă"}
            </p>
            <span
              className="inline-flex items-center gap-1 text-[15px] font-bold whitespace-nowrap text-brand"
              aria-hidden
            >
              Vezi detalii
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
