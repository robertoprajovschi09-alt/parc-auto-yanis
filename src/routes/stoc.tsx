import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { VehicleCard } from "@/components/site/VehicleCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/stoc")({
  head: () => ({
    meta: [
      { title: "Stoc mașini — Parc Auto Yanis" },
      { name: "description", content: "Explorează stocul nostru de mașini rulate premium, atent selectate și verificate." },
      { property: "og:title", content: "Stoc mașini — Parc Auto Yanis" },
      { property: "og:description", content: "Explorează stocul nostru de mașini rulate premium, atent selectate și verificate." },
    ],
  }),
  component: Inventory,
});

const brands = ["Toate", "Mercedes-Benz", "BMW", "Audi", "Volkswagen", "Škoda"];
const fuels = ["Toate", "Benzină", "Diesel", "Hibrid"];
const transmissions = ["Toate", "Automată", "Manuală"];
const years = ["Toate", "2020+", "2018+", "2016+"];
const prices = ["Toate", "< 20.000 €", "20.000 – 30.000 €", "> 30.000 €"];

function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all ${
        active
          ? "border-ink bg-ink text-canvas"
          : "border-ink/10 bg-surface text-graphite hover:border-ink/30 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function Row({ label, items, activeIndex = 0 }: { label: string; items: string[]; activeIndex?: number }) {
  return (
    <div>
      <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-graphite">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((x, i) => (
          <Chip key={x} label={x} active={i === activeIndex} />
        ))}
      </div>
    </div>
  );
}

function Inventory() {
  return (
    <div>
      {/* Header */}
      <section className="px-6 pt-36 pb-14 md:px-10 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Stoc actualizat</p>
            <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.75rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              Colecția <span className="italic text-graphite">completă</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite">
              {vehicles.length} mașini disponibile astăzi. Toate verificate, toate cu istoric transparent.
            </p>
          </Reveal>

          {/* Search bar */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-ink/10 bg-surface p-2 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_60px_-30px_rgba(0,0,0,0.15)]">
              <div className="flex flex-1 items-center gap-3 px-4">
                <Search size={17} className="text-graphite" />
                <input
                  className="w-full bg-transparent py-3 text-base text-ink placeholder:text-graphite/70 focus:outline-none"
                  placeholder="Caută după marcă, model sau cuvinte cheie…"
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-ink/10 px-4 py-3 text-sm text-graphite hover:text-ink">
                <SlidersHorizontal size={15} /> Filtre avansate
              </button>
              <button className="rounded-xl bg-ink px-5 py-3 text-sm text-canvas">Caută</button>
            </div>
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.2}>
            <div className="mt-10 grid gap-8 md:grid-cols-[repeat(5,1fr)]">
              <Row label="Brand" items={brands} />
              <Row label="Preț" items={prices} />
              <Row label="Combustibil" items={fuels} />
              <Row label="Transmisie" items={transmissions} />
              <Row label="An" items={years} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between border-t border-ink/10 py-6">
            <p className="text-sm text-graphite">
              <span className="font-medium text-ink">{vehicles.length}</span> rezultate · Sortate după: recente
            </p>
            <div className="text-sm text-graphite">Vizualizare grilă</div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v, i) => (
              <VehicleCard key={v.slug} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}