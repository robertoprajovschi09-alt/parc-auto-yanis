import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { vehicles } from "@/lib/vehicles";
import { site } from "@/lib/site";

const brands = [...new Set(vehicles.map((v) => v.brand))].sort();

/* Staggered entrance via CSS animations (tw-animate-css): they run without
   JS and the SSR HTML is never hidden, so the LCP hero is always readable. */
const rise = "animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards duration-700";

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink" aria-label="Prezentare">
        {/* Warm glow, echoing the brand yellow */}
        <div
          aria-hidden
          className="absolute top-1/2 right-[-5%] -z-10 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-sun/10 blur-3xl"
        />

        <div className="mx-auto max-w-[1320px] px-4 pt-32 pb-36 md:px-8 md:pt-44 md:pb-44">
          <p
            className={`inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[14px] font-semibold text-white/85 backdrop-blur-sm ${rise}`}
          >
            <span className="h-2 w-2 rounded-full bg-sun" aria-hidden />
            Târg auto în {site.city}
          </p>

          <h1
            className={`mt-6 max-w-3xl text-[42px] leading-[1.05] font-black tracking-tight text-white md:text-[64px] ${rise} delay-100`}
          >
            Găsește-ți următoarea{" "}
            <span className="relative inline-block">
              mașină
              <svg
                className="absolute -bottom-2 left-0 w-full text-sun"
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 9c40-5 140-7 214-4"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className={`mt-6 max-w-lg text-lg text-white/75 ${rise} delay-200`}>
            {vehicles.length} mașini disponibile în {site.city}.
          </p>
        </div>
      </section>

      {/* Floating search panel, overlapping the hero edge */}
      <div className="relative z-10 mx-auto -mt-24 max-w-[1320px] px-4 md:-mt-20 md:px-8">
        <div className={`${rise} delay-300`}>
          <SearchPanel />
        </div>
      </div>
    </>
  );
}

function SearchPanel() {
  const navigate = useNavigate();
  const [fuel, setFuel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  return (
    <form
      aria-label="Caută în stoc"
      className="rounded-2xl bg-surface p-5 shadow-float md:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({
          to: "/stoc",
          search: {
            ...(fuel ? { combustibil: fuel } : {}),
            ...(brand ? { marca: brand } : {}),
            ...(price ? { pret: price } : {}),
          },
        });
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-ink">Caută în stoc</h2>
        <p className="text-[14px] font-semibold text-graphite">
          {vehicles.length} mașini disponibile acum
        </p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[auto_1fr_1fr_auto]">
        {/* Fuel segmented control */}
        <div
          role="group"
          aria-label="Combustibil"
          className="grid h-14 grid-cols-3 items-stretch gap-1 rounded-lg bg-muted p-1.5"
        >
          {[
            ["", "Toate"],
            ["Benzină", "Benzină"],
            ["Diesel", "Diesel"],
          ].map(([value, label]) => (
            <button
              key={label}
              type="button"
              aria-pressed={fuel === value}
              onClick={() => setFuel(value)}
              className={`rounded-md px-4 text-[15px] font-bold transition-all duration-200 ${
                fuel === value
                  ? "bg-ink text-white shadow-sm"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <PanelSelect
          id="hero-marca"
          label="Marcă"
          value={brand}
          onChange={setBrand}
          options={[["", "Toate mărcile"], ...brands.map((b) => [b, b] as [string, string])]}
        />
        <PanelSelect
          id="hero-pret"
          label="Preț"
          value={price}
          onChange={setPrice}
          options={[
            ["", "Orice preț"],
            ["sub-20000", "Sub 20.000 €"],
            ["20000-25000", "20.000 – 25.000 €"],
            ["peste-25000", "Peste 25.000 €"],
          ]}
        />

        <button type="submit" className="btn-primary !min-h-14 md:!px-9">
          <Search size={18} aria-hidden />
          Caută
        </button>
      </div>

      <div className="mt-3.5 flex justify-end">
        <Link
          to="/stoc"
          className="inline-flex min-h-10 items-center gap-1 text-[14px] font-bold text-brand underline-offset-4 hover:underline"
        >
          Căutare avansată →
        </Link>
      </div>
    </form>
  );
}

function PanelSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 w-full appearance-none rounded-lg border border-input bg-surface pr-11 pl-4 text-base font-semibold text-ink transition-colors duration-200 hover:border-ink/40"
      >
        {options.map(([v, l]) => (
          <option key={l} value={v}>
            {l}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-graphite"
      />
    </div>
  );
}
