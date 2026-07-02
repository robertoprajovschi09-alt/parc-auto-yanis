import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import img from "@/assets/mercedes/470211463.jpg.asset.json";
import { site } from "@/lib/site";

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

function Despre() {
  return (
    <div className="pt-28 md:pt-36">
      <section className="mx-auto max-w-[1320px] px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Despre Parc Auto Yanis
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-graphite">
              Vindem mașini rulate în {site.city} de 9 ani, cu o singură regulă: vindem doar mașini
              pe care le-am cumpăra și noi.
            </p>
          </div>
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
            <p>
              Dacă ai nevoie de finanțare, ne ocupăm noi de dosar, cu mai multe bănci. Iar după
              cumpărare rămânem la un telefon distanță.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 pt-12 md:px-8 md:pt-16">
        <div className="overflow-hidden rounded-2xl bg-muted">
          <img
            src={img.url}
            alt="Mașină din stocul Parc Auto Yanis, pregătită pentru vânzare"
            loading="lazy"
            className="aspect-[21/9] w-full object-cover"
          />
        </div>
      </section>

      {/* Numbers, stated plainly */}
      <section
        className="mx-auto max-w-[1320px] px-4 py-14 md:px-8 md:py-20"
        aria-label="Pe scurt, în cifre"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["9 ani", "de când suntem în piață"],
            ["100+", "mașini vândute"],
            ["8", "bănci și IFN-uri partenere"],
            ["24h", "timp maxim de răspuns"],
          ].map(([n, label]) => (
            <div key={label} className="rounded-xl border border-ink/10 bg-surface p-6">
              <p className="text-4xl font-bold tracking-tight text-ink">{n}</p>
              <p className="mt-2 text-[15px] text-graphite">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section
        className="mx-auto max-w-[1320px] px-4 pb-16 md:px-8"
        aria-labelledby="cumlucram-titlu"
      >
        <h2 id="cumlucram-titlu" className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Cum lucrăm
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            <div key={n} className="rounded-xl border border-ink/10 bg-surface p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-lg font-bold text-brand">
                {n}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-graphite">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/stoc"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand px-8 text-[17px] font-semibold text-white transition-colors duration-150 hover:bg-brand-strong"
          >
            Vezi mașinile în stoc
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-8 text-[17px] font-semibold text-ink transition-colors duration-150 hover:bg-ink/5"
          >
            <Phone size={18} aria-hidden />
            {site.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
