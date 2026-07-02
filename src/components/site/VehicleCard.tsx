import { Link } from "@tanstack/react-router";
import { Heart, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Vehicle } from "@/lib/vehicles";
import { formatKm, formatPrice } from "@/lib/vehicles";

export function VehicleCard({ v, index = 0 }: { v: Vehicle; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-surface"
    >
      <Link to="/vehicul/$slug" params={{ slug: v.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={v.image}
            alt={`${v.brand} ${v.model}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {v.tag && (
            <span className="glass absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide text-ink">
              {v.tag}
            </span>
          )}
          <button
            aria-label="Salvează"
            onClick={(e) => e.preventDefault()}
            className="glass absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full text-ink transition-transform hover:scale-110"
          >
            <Heart size={15} />
          </button>

          <div className="absolute right-4 bottom-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white">
              Vezi detalii <ArrowUpRight size={13} />
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 px-5 pt-5 pb-6">
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.2em] text-graphite uppercase">{v.brand}</p>
            <h3 className="mt-1 truncate font-serif text-2xl leading-tight text-ink">
              {v.model}
            </h3>
            <p className="mt-1.5 text-sm text-graphite">
              {v.year} · {formatKm(v.mileage)} · {v.fuel}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] tracking-[0.2em] text-graphite uppercase">Preț</p>
            <p className="mt-1 font-serif text-xl text-ink">{formatPrice(v.price)}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}