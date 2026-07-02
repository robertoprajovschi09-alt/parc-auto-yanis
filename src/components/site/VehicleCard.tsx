import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { formatKm, formatPrice } from "@/lib/vehicles";
import { monthlyPayment } from "@/lib/finance";

/*
 * The most important component on the site. One job: let anyone read
 * "what car, what price, key facts, where" in under 3 seconds.
 * Flat card, no hover-only information, the whole card is one link.
 */
export function VehicleCard({ v }: { v: Vehicle; index?: number }) {
  return (
    <article className="overflow-hidden rounded-xl border border-ink/10 bg-surface transition-[border-color,box-shadow] duration-150 hover:border-ink/30 hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]">
      <Link to="/vehicul/$slug" params={{ slug: v.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={v.image}
            alt={`${v.brand} ${v.model}, ${v.year}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {v.tag && (
            <span className="absolute top-3 left-3 rounded-full bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink shadow-sm">
              {v.tag}
            </span>
          )}
        </div>

        <div className="p-4 md:p-5">
          <h3 className="text-lg leading-snug font-semibold text-ink">
            {v.brand} {v.model}
          </h3>

          <p className="mt-1.5 text-[15px] leading-relaxed text-graphite">
            {v.year} · {formatKm(v.mileage)} · {v.fuel} · {v.transmission} · {v.power}
          </p>

          <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-graphite">
            <MapPin size={14} aria-hidden /> {v.location}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-ink/8 pt-4">
            <div>
              <p className="text-[22px] leading-none font-bold tracking-tight text-ink">
                {formatPrice(v.price)}
              </p>
              <p className="mt-1.5 text-[13px] text-graphite">
                Rată orientativă: {monthlyPayment(v.price)} € / lună
              </p>
            </div>
            <span className="text-[15px] font-semibold whitespace-nowrap text-brand" aria-hidden>
              Vezi detalii →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
