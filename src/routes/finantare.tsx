import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, ShieldCheck, TrendingDown, Wallet } from "lucide-react";
import { FINANCE, monthlyPayment } from "@/lib/finance";
import { formatPrice } from "@/lib/vehicles";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

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
        <label htmlFor={id} className="text-base font-bold text-ink">
          {label}
        </label>
        <output htmlFor={id} className="text-xl font-extrabold tracking-tight text-brand">
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
    <div>
      {/* Dark page header */}
      <section className="bg-ink px-4 pt-32 pb-24 md:px-8 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="flex items-center gap-2 text-[13px] font-extrabold tracking-[0.1em] text-sun uppercase">
            <span className="h-[3px] w-6 rounded-full bg-sun" aria-hidden />
            Finanțare
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-white md:text-[44px]">
            Calculator de rate
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Mută cele trei glisoare și vezi imediat rata lunară. Când ești mulțumit de cifre,
            trimite-ne cererea — ne ocupăm noi de dosar, cu mai multe bănci și IFN-uri.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-14 grid max-w-[1320px] gap-6 px-4 pb-20 md:px-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Calculator */}
        <div className="rounded-2xl bg-surface p-6 shadow-float md:p-9">
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

          {/* Result — dark card, yellow figure */}
          <div
            className="relative mt-9 overflow-hidden rounded-xl bg-ink p-6 md:p-7"
            role="status"
            aria-live="polite"
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-16 h-56 w-56 rounded-full bg-sun/10 blur-3xl"
            />
            <p className="text-[14px] font-bold tracking-wide text-white/70 uppercase">
              Rata ta lunară, orientativ
            </p>
            <p className="mt-2 text-5xl font-black tracking-tight text-sun">
              {rate} €<span className="text-xl font-bold text-white/60"> / lună</span>
            </p>
            <dl className="mt-6 space-y-2 text-[15px]">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <dt className="text-white/65">Avans</dt>
                <dd className="font-extrabold text-white">{formatPrice(downAmount)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <dt className="text-white/65">Sumă finanțată</dt>
                <dd className="font-extrabold text-white">{formatPrice(financed)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/65">Cost total estimat</dt>
                <dd className="font-extrabold text-white">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="mt-5 text-[13px] leading-relaxed text-white/55">
              Calcul orientativ, cu o dobândă exemplu de {(FINANCE.annualRate * 100).toFixed(1)}% pe
              an. Oferta finală depinde de bancă și de dosarul tău — o primești gratuit, fără nicio
              obligație.
            </p>
          </div>

          <Link to="/contact" className="btn-primary mt-6 w-full !min-h-14 !text-[17px] sm:w-auto">
            Cere oferta exactă
          </Link>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <RevealGroup className="space-y-4">
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
              <RevealItem key={t}>
                <div className="flex items-start gap-4 rounded-lg bg-surface p-5 shadow-card">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-ink text-sun">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-[16px] font-extrabold text-ink">{t}</h2>
                    <p className="mt-1 text-[15px] leading-relaxed text-graphite">{d}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="rounded-lg bg-surface p-5 shadow-card">
            <h2 className="text-[16px] font-extrabold text-ink">Cum funcționează</h2>
            <ol className="mt-4 space-y-4 text-[15px] leading-relaxed text-graphite">
              {[
                "Alegi mașina și ne spui ce avans și perioadă ți se potrivesc.",
                "Ne trimiți datele de contact — noi pregătim dosarul pentru bănci.",
                "Primești oferta în ~48h. Dacă îți convine, semnezi și pleci cu mașina.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sun text-[14px] font-black text-ink">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
