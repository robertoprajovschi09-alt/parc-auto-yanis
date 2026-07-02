import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, ShieldCheck, TrendingDown, Wallet } from "lucide-react";
import { FINANCE, monthlyPayment } from "@/lib/finance";
import { formatPrice } from "@/lib/vehicles";

type FinSearch = { pret?: number };

export const Route = createFileRoute("/finantare")({
  validateSearch: (s: Record<string, unknown>): FinSearch => {
    const n = Number(s.pret);
    return {
      pret: Number.isFinite(n) && n >= 3000 && n <= 100000 ? Math.round(n) : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Calculator de rate — Parc Auto Yanis" },
      {
        name: "description",
        content:
          "Calculează-ți rata lunară pentru mașina dorită: preț, avans și perioadă. Răspuns de la bancă în aproximativ 48 de ore.",
      },
      { property: "og:title", content: "Calculator de rate — Parc Auto Yanis" },
      {
        property: "og:description",
        content: "Calculează-ți rata lunară: preț, avans, perioadă. Răspuns în ~48h.",
      },
    ],
  }),
  component: Finantare,
});

function SliderField({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  display,
  hint,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  display: string;
  hint: string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-base font-medium text-ink">
          {label}
        </label>
        <output htmlFor={id} className="text-xl font-bold tracking-tight text-ink">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-1"
      />
      <p className="text-[14px] text-graphite">{hint}</p>
    </div>
  );
}

function Finantare() {
  const { pret } = Route.useSearch();
  const [price, setPrice] = useState(pret ?? 18500);
  const [downPct, setDownPct] = useState<number>(FINANCE.defaultDownPct);
  const [months, setMonths] = useState<number>(FINANCE.defaultMonths);

  const rate = monthlyPayment(price, downPct, months);
  const downAmount = Math.round((price * downPct) / 100);
  const financed = price - downAmount;
  const total = rate * months + downAmount;

  return (
    <div className="pt-28 md:pt-36">
      <section className="mx-auto max-w-[1320px] px-4 pb-10 md:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Calculator de rate
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-graphite md:text-lg">
          Mută cele trei glisoare și vezi imediat rata lunară. Când ești mulțumit de cifre,
          trimite-ne cererea — ne ocupăm noi de dosar, cu mai multe bănci și IFN-uri.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-6 px-4 pb-20 lg:grid-cols-[1.5fr_1fr] md:px-8">
        {/* Calculator */}
        <div className="rounded-2xl border border-ink/10 bg-surface p-6 md:p-9">
          <div className="space-y-7">
            <SliderField
              id="calc-pret"
              label="Prețul mașinii"
              min={5000}
              max={50000}
              step={500}
              value={price}
              onChange={setPrice}
              display={formatPrice(price)}
              hint="Poți alege orice mașină din stoc sau un preț aproximativ."
            />
            <SliderField
              id="calc-avans"
              label="Avans"
              min={FINANCE.minDownPct}
              max={FINANCE.maxDownPct}
              step={5}
              value={downPct}
              onChange={setDownPct}
              display={`${downPct}% (${formatPrice(downAmount)})`}
              hint={`Minim ${FINANCE.minDownPct}% din prețul mașinii.`}
            />
            <SliderField
              id="calc-perioada"
              label="Perioada"
              min={FINANCE.minMonths}
              max={FINANCE.maxMonths}
              step={12}
              value={months}
              onChange={setMonths}
              display={`${months} de luni`}
              hint={`Între ${FINANCE.minMonths} și ${FINANCE.maxMonths} de luni (${FINANCE.maxMonths / 12} ani).`}
            />
          </div>

          {/* Result */}
          <div className="mt-9 rounded-xl bg-brand-soft p-6" role="status" aria-live="polite">
            <p className="text-[15px] font-medium text-ink">Rata ta lunară, orientativ</p>
            <p className="mt-1 text-5xl font-bold tracking-tight text-ink">
              {rate} €<span className="text-xl font-semibold text-graphite"> / lună</span>
            </p>
            <dl className="mt-5 space-y-1.5 text-[15px] text-ink">
              <div className="flex justify-between gap-4">
                <dt className="text-graphite">Avans</dt>
                <dd className="font-semibold">{formatPrice(downAmount)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-graphite">Sumă finanțată</dt>
                <dd className="font-semibold">{formatPrice(financed)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-graphite">Cost total estimat</dt>
                <dd className="font-semibold">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-[13px] leading-relaxed text-graphite">
              Calcul orientativ, cu o dobândă exemplu de {(FINANCE.annualRate * 100).toFixed(1)}% pe
              an. Oferta finală depinde de bancă și de dosarul tău — o primești gratuit, fără nicio
              obligație.
            </p>
          </div>

          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-brand px-8 text-[17px] font-semibold text-white transition-colors duration-150 hover:bg-brand-strong sm:w-auto"
          >
            Cere oferta exactă
          </Link>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          {[
            {
              icon: Clock,
              t: "Răspuns în ~48 de ore",
              d: "Trimitem dosarul la mai multe bănci deodată și revenim rapid cu oferta.",
            },
            {
              icon: TrendingDown,
              t: "Avans de la 15%",
              d: "Alegi avansul care se potrivește bugetului tău.",
            },
            {
              icon: Wallet,
              t: "Fără comision de analiză",
              d: "Nu percepem niciun cost pentru întocmirea dosarului.",
            },
            {
              icon: ShieldCheck,
              t: "Totul transparent",
              d: "Vezi dobânda, DAE și toate costurile înainte să semnezi ceva.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="flex items-start gap-4 rounded-xl border border-ink/10 bg-surface p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h2 className="text-[16px] font-semibold text-ink">{t}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-graphite">{d}</p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-ink/10 bg-surface p-5">
            <h2 className="text-[16px] font-semibold text-ink">Cum funcționează</h2>
            <ol className="mt-3 space-y-3 text-[15px] leading-relaxed text-graphite">
              <li className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-semibold text-white">
                  1
                </span>
                Alegi mașina și ne spui ce avans și perioadă ți se potrivesc.
              </li>
              <li className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-semibold text-white">
                  2
                </span>
                Ne trimiți datele de contact — noi pregătim dosarul pentru bănci.
              </li>
              <li className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-semibold text-white">
                  3
                </span>
                Primești oferta în ~48h. Dacă îți convine, semnezi și pleci cu mașina.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
