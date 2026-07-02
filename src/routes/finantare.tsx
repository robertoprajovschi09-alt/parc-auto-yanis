import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Wallet, Clock, ShieldCheck, TrendingDown, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/finantare")({
  head: () => ({
    meta: [
      { title: "Finanțare — Parc Auto Yanis" },
      { name: "description", content: "Simulează rata lunară pentru mașina dorită. Aprobare în 48h, colaborăm cu peste 8 bănci." },
      { property: "og:title", content: "Finanțare — Parc Auto Yanis" },
      { property: "og:description", content: "Simulează rata lunară pentru mașina dorită. Aprobare în 48h." },
    ],
  }),
  component: Finantare,
});

function Finantare() {
  return (
    <div className="pt-32 md:pt-40">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-24">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Finanțare</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.75rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em] text-ink">
            Rate care se <span className="italic text-graphite">așează</span> în bugetul tău.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite">
            Colaborăm cu 8 bănci și IFN-uri. Îți construim oferta cea mai potrivită
            pentru mașina aleasă, cu răspuns rapid și fără costuri ascunse.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-6 pb-24 md:grid-cols-[1.4fr_1fr] md:px-10">
        <Reveal>
          <div className="rounded-[2rem] border border-ink/8 bg-surface p-8 md:p-10">
            <h2 className="font-serif text-2xl text-ink">Simulator rată</h2>
            <p className="mt-2 text-sm text-graphite">Ajustează valorile pentru o estimare rapidă.</p>

            <div className="mt-8 space-y-8">
              {[
                { label: "Preț mașină", value: "18.500 €", hint: "Selectează din stoc" },
                { label: "Avans", value: "20%", hint: "Recomandat: 15–30%" },
                { label: "Perioadă", value: "60 luni", hint: "Între 12 și 84 luni" },
              ].map((f) => (
                <div key={f.label}>
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] tracking-[0.2em] uppercase text-graphite">{f.label}</label>
                    <span className="font-serif text-lg text-ink">{f.value}</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-ink/10">
                    <div className="h-full w-1/3 rounded-full bg-ink" />
                  </div>
                  <p className="mt-2 text-xs text-graphite">{f.hint}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-end justify-between border-t border-ink/10 pt-8">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-graphite">Rata estimată</p>
                <p className="mt-2 font-serif text-5xl text-ink">247 €<span className="text-lg text-graphite"> / lună</span></p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-canvas transition-transform hover:-translate-y-0.5">
                Aplică acum <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {[
            { icon: Clock, t: "Aprobare în 48h", d: "Analizăm dosarul rapid, împreună cu partenerii bancari." },
            { icon: TrendingDown, t: "Avans flexibil", d: "De la 15% avans, adaptat bugetului tău." },
            { icon: Wallet, t: "Fără comision", d: "Nu percepem comision de analiză sau intermediere." },
            { icon: ShieldCheck, t: "Transparență totală", d: "Vezi DAE, dobândă și costuri înainte să semnezi." },
          ].map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-surface p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-canvas">
                  <I size={16} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-medium text-ink">{t}</p>
                  <p className="mt-1 text-sm text-graphite">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}