import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Search, SearchX, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import { vehicles } from "@/lib/vehicles";
import { VehicleCard } from "@/components/site/VehicleCard";
import { EASE } from "@/components/motion/Reveal";

type StocSearch = {
  q?: string;
  marca?: string;
  combustibil?: string;
  cutie?: string;
  pret?: string;
  an?: string;
  sort?: string;
};

const str = (v: unknown) => (typeof v === "string" && v !== "" ? v : undefined);

export const Route = createFileRoute("/stoc")({
  validateSearch: (s: Record<string, unknown>): StocSearch => ({
    q: str(s.q),
    marca: str(s.marca),
    combustibil: str(s.combustibil),
    cutie: str(s.cutie),
    pret: str(s.pret),
    an: str(s.an),
    sort: str(s.sort),
  }),
  head: () => ({
    meta: [
      { title: "Mașini în stoc — Parc Auto Yanis" },
      {
        name: "description",
        content:
          "Toate mașinile disponibile acum: verificate tehnic, cu istoric complet și kilometraj garantat. Filtrează după marcă, preț, combustibil sau an.",
      },
      { property: "og:title", content: "Mașini în stoc — Parc Auto Yanis" },
      {
        property: "og:description",
        content: "Toate mașinile disponibile acum, verificate și cu istoric complet.",
      },
    ],
  }),
  component: Inventory,
});

const brands = [...new Set(vehicles.map((v) => v.brand))].sort();

const priceBands = [
  { value: "sub-20000", label: "Sub 20.000 €", test: (p: number) => p < 20000 },
  {
    value: "20000-25000",
    label: "20.000 – 25.000 €",
    test: (p: number) => p >= 20000 && p <= 25000,
  },
  { value: "peste-25000", label: "Peste 25.000 €", test: (p: number) => p > 25000 },
];

const yearBands = [
  { value: "2020", label: "Din 2020 încoace" },
  { value: "2018", label: "Din 2018 încoace" },
  { value: "2016", label: "Din 2016 încoace" },
];

const sortOptions = [
  { value: "recente", label: "Cele mai recente" },
  { value: "pret-asc", label: "Preț: de la mic la mare" },
  { value: "pret-desc", label: "Preț: de la mare la mic" },
  { value: "km-asc", label: "Kilometri: cei mai puțini" },
  { value: "an-desc", label: "An: cele mai noi" },
];

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-bold text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full appearance-none rounded-lg border border-input bg-surface pr-11 pl-4 text-base font-semibold text-ink transition-colors duration-200 hover:border-ink/40"
        >
          {children}
        </select>
        <ChevronDown
          size={18}
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-graphite"
        />
      </div>
    </div>
  );
}

function Inventory() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const setFilter = (key: keyof StocSearch, value: string) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value === "" ? undefined : value }),
      replace: true,
    });
  };

  const clearFilters = () => {
    navigate({ search: {}, replace: true });
  };

  const hasFilters = Boolean(
    search.q || search.marca || search.combustibil || search.cutie || search.pret || search.an,
  );

  const results = useMemo(() => {
    let list = vehicles.filter((v) => {
      if (search.q) {
        const hay = `${v.brand} ${v.model}`.toLowerCase();
        if (!hay.includes(search.q.toLowerCase().trim())) return false;
      }
      if (search.marca && v.brand !== search.marca) return false;
      if (search.combustibil && v.fuel !== search.combustibil) return false;
      if (search.cutie && v.transmission !== search.cutie) return false;
      if (search.pret) {
        const band = priceBands.find((b) => b.value === search.pret);
        if (band && !band.test(v.price)) return false;
      }
      if (search.an && v.year < Number(search.an)) return false;
      return true;
    });

    switch (search.sort) {
      case "pret-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "pret-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "km-asc":
        list = [...list].sort((a, b) => a.mileage - b.mileage);
        break;
      case "an-desc":
        list = [...list].sort((a, b) => b.year - a.year);
        break;
    }
    return list;
  }, [search]);

  return (
    <div>
      {/* Dark page header */}
      <section className="bg-ink px-4 pt-32 pb-24 md:px-8 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="flex items-center gap-2 text-[13px] font-extrabold tracking-[0.1em] text-sun uppercase">
            <span className="h-[3px] w-6 rounded-full bg-sun" aria-hidden />
            Stocul complet
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-white md:text-[44px]">
            Mașini în stoc
          </h1>
          <p className="mt-3 text-base text-white/70 md:text-lg">
            {vehicles.length} mașini disponibile, toate verificate tehnic și cu istoric complet.
          </p>
        </div>
      </section>

      {/* Floating filter panel */}
      <section className="relative z-10 -mt-14 px-4 md:px-8" aria-label="Filtre">
        <div className="mx-auto max-w-[1320px] rounded-2xl bg-surface p-5 shadow-float md:p-6">
          <div className="flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
            <SlidersHorizontal size={17} aria-hidden className="text-brand" />
            Filtrează stocul
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr]">
            <div>
              <label htmlFor="f-cauta" className="mb-2 block text-[14px] font-bold text-ink">
                Caută
              </label>
              <div className="relative">
                <Search
                  size={18}
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-graphite"
                />
                <input
                  id="f-cauta"
                  type="search"
                  value={search.q ?? ""}
                  onChange={(e) => setFilter("q", e.target.value)}
                  placeholder="Marcă sau model"
                  className="h-14 w-full rounded-lg border border-input bg-surface pr-4 pl-11 text-base font-semibold text-ink placeholder:font-medium placeholder:text-graphite/70"
                />
              </div>
            </div>

            <FilterSelect
              id="f-marca"
              label="Marcă"
              value={search.marca ?? ""}
              onChange={(v) => setFilter("marca", v)}
            >
              <option value="">Toate mărcile</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              id="f-pret"
              label="Preț"
              value={search.pret ?? ""}
              onChange={(v) => setFilter("pret", v)}
            >
              <option value="">Orice preț</option>
              {priceBands.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              id="f-combustibil"
              label="Combustibil"
              value={search.combustibil ?? ""}
              onChange={(v) => setFilter("combustibil", v)}
            >
              <option value="">Oricare</option>
              <option value="Benzină">Benzină</option>
              <option value="Diesel">Diesel</option>
            </FilterSelect>

            <FilterSelect
              id="f-cutie"
              label="Cutie de viteze"
              value={search.cutie ?? ""}
              onChange={(v) => setFilter("cutie", v)}
            >
              <option value="">Oricare</option>
              <option value="Automată">Automată</option>
              <option value="Manuală">Manuală</option>
            </FilterSelect>

            <FilterSelect
              id="f-an"
              label="Anul fabricației"
              value={search.an ?? ""}
              onChange={(v) => setFilter("an", v)}
            >
              <option value="">Orice an</option>
              {yearBands.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </FilterSelect>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-center justify-between gap-4 py-7">
            <p className="text-base font-semibold text-ink" role="status">
              <strong className="font-extrabold">{results.length}</strong>{" "}
              {results.length === 1 ? "mașină găsită" : "mașini găsite"}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-4 inline-flex min-h-10 items-center font-bold text-brand underline underline-offset-4 hover:text-brand-strong"
                >
                  Șterge filtrele
                </button>
              )}
            </p>

            <div className="flex items-center gap-3">
              <label htmlFor="f-sort" className="text-[14px] font-bold whitespace-nowrap text-ink">
                Sortează după
              </label>
              <div className="relative">
                <select
                  id="f-sort"
                  value={search.sort ?? "recente"}
                  onChange={(e) =>
                    setFilter("sort", e.target.value === "recente" ? "" : e.target.value)
                  }
                  className="h-12 appearance-none rounded-lg border border-input bg-surface pr-10 pl-4 text-[15px] font-semibold text-ink"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-graphite"
                />
              </div>
            </div>
          </div>

          {results.length > 0 ? (
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((v) => (
                  <motion.div
                    key={v.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="h-full"
                  >
                    <VehicleCard v={v} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="rounded-2xl bg-surface px-6 py-16 text-center shadow-card">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sun-soft">
                <SearchX size={28} aria-hidden className="text-ink" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-xl font-extrabold text-ink">
                Nicio mașină nu se potrivește filtrelor
              </h2>
              <p className="mx-auto mt-2 max-w-md text-base text-graphite">
                Încearcă să scoți unul dintre filtre sau șterge-le pe toate ca să vezi din nou
                întreg stocul.
              </p>
              <button type="button" onClick={clearFilters} className="btn-primary mt-7">
                Arată toate mașinile
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
