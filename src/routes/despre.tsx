import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import img from "@/assets/mercedes/470211463.jpg.asset.json";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const Route = createFileRoute("/despre")({
  head: () => ({
    meta: [
      { title: "Despre noi — Parc Auto Yanis" },
      {
        name: "description",
        content:
          "De 9 ani vindem mașini rulate verificate în Tulcea: istoric complet, kilometraj garantat și finanțare cu răspuns rapid.",
      },
      { property: "og:title", content: "Despre noi — Parc Auto Yanis" },
      {
        property: "og:description",
        content: "De 9 ani vindem mașini rulate verificate în Tulcea.",
      },
    ],
  }),
  component: Despre,
});

const stats = [
  { value: 9, suffix: " ani", label: "de când suntem în piață" },
  { value: 100, suffix: "+", label: "mașini vândute" },
  { value: 8, suffix: "", label: "bănci și IFN-uri partenere" },
  { value: 24, suffix: "h", label: "timp maxim de răspuns" },
] as const;

function Despre() {
  return (
    <div>
      {/* Dark page header */}
      <section className="bg-ink px-4 pt-32 pb-24 md:px-8 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="flex items-center gap-2 text-[13px] font-extrabold tracking-[0.1em] text-sun uppercase">
            <span className="h-[3px] w-6 rounded-full bg-sun" aria-hidden />
            Cine suntem
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-white md:text-[44px]">
            Despre Parc Auto Yanis
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Vindem mașini rulate în {site.city} de 9 ani, cu o singură regulă: vindem doar mașini pe
            care le-am cumpăra și noi.
          </p>
        </div>
      </section>

      {/* Story on a floating card */}
      <section className="relative z-10 mx-auto -mt-14 max-w-[1320px] px-4 md:px-8">
        <div className="rounded-2xl bg-surface p-6 shadow-float md:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-5 text-base leading-relaxed text-ink-soft">
              <p>
                Am pornit acum aproape zece ani cu o idee simplă: să facem un loc în care intri cu
                neîncredere — cum e normal când cumperi o mașină rulată — și pleci cu una în care ai
                încredere totală.
              </p>
              <p>
                De aceea fiecare mașină trece prin aceeași verificare: diagnoză tehnică, raport de
                istoric și confirmarea kilometrajului. Ce nu trece testul nu ajunge la vânzare — și
                îți spunem deschis și minusurile fiecărei mașini, nu doar plusurile.
              </p>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-ink-soft">
              <p>
                Dacă ai nevoie de finanțare, ne ocupăm noi de dosar, cu mai multe bănci. Iar după
                cumpărare rămânem la un telefon distanță.
              </p>
              <p>
                Ne găsești la {site.address}, {site.schedule.toLowerCase()}. Vino cu întrebările —
                plecăm de la cafea, nu de la contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="mx-auto max-w-[1320px] px-4 pt-12 md:px-8 md:pt-16">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-2xl bg-muted shadow-lift">
            <img
              src={img.url}
              alt="Mașină din stocul Parc Auto Yanis, pregătită pentru vânzare"
              loading="lazy"
              width={2100}
              height={900}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <div aria-hidden className="absolute -bottom-3 left-8 h-1.5 w-28 rounded-full bg-sun" />
        </Reveal>
      </section>

      {/* Numbers — dark band with animated counters */}
      <section
        className="mt-14 bg-ink px-4 py-14 md:mt-20 md:py-20"
        aria-label="Pe scurt, în cifre"
      >
        <RevealGroup className="mx-auto grid max-w-[1320px] gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <p className="text-5xl font-black tracking-tight text-sun">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2.5 text-[15px] font-medium text-white/70">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* How we work */}
      <section
        className="mx-auto max-w-[1320px] px-4 py-14 md:px-8 md:py-20"
        aria-labelledby="cumlucram-titlu"
      >
        <SectionHeading
          id="cumlucram-titlu"
          eyebrow="Pas cu pas"
          title="Cum lucrăm"
          sub="Același drum pentru fiecare mașină din stoc — fără excepții."
        />
        <RevealGroup className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "1",
              "Alegem",
              "Cumpărăm mașini doar din surse verificate — Germania, Belgia, Olanda, Italia.",
            ],
            [
              "2",
              "Verificăm",
              "Diagnoză completă, raport de istoric și confirmarea kilometrajului real.",
            ],
            [
              "3",
              "Pregătim",
              "Igienizare și detailing profesional, service preventiv, acte pregătite.",
            ],
            [
              "4",
              "Predăm",
              "Vizionare, test drive, finanțare și înmatriculare — totul într-un singur loc.",
            ],
          ].map(([n, t, d]) => (
            <RevealItem key={n} className="h-full">
              <div className="h-full rounded-lg bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-sun text-lg font-black text-ink">
                  {n}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite">{d}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-11 flex flex-wrap gap-3">
          <Link to="/stoc" className="btn-primary !min-h-14 !px-8 !text-[17px]">
            Vezi mașinile în stoc
          </Link>
          <a href={site.phoneHref} className="btn-ghost !min-h-14 !px-8 !text-[17px]">
            <Phone size={18} aria-hidden />
            {site.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
