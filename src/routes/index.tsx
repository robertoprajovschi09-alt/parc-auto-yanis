import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Gauge,
  Wallet,
  Phone,
  Search,
  ChevronDown,
  MapPin,
  Clock,
  Star,
  Handshake,
} from "lucide-react";

import finantareImg from "@/assets/finantare.jpg";
import mercedesHero from "@/assets/mercedes/470211463.jpg.asset.json";
import { vehicles, featuredSlugs, formatPrice } from "@/lib/vehicles";
import { monthlyPayment, FINANCE } from "@/lib/finance";
import { site } from "@/lib/site";
import { VehicleCard } from "@/components/site/VehicleCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <Featured />
      <WhyUs />
      <Financing />
      <Testimonials />
      <Faq />
      <ContactBand />
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="border-b border-ink/8 bg-surface px-4 pt-28 pb-12 md:px-8 md:pt-40 md:pb-16">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-ink md:text-[52px]">
            Mașini rulate verificate, cu istoric complet.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-graphite">
            Fiecare mașină din stocul nostru este verificată tehnic, are kilometrajul garantat și
            raport de istoric. Vezi mașinile, calculează rata și programează o vizionare în{" "}
            {site.city}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
              Sună-ne
            </a>
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 text-[15px] text-ink sm:grid-cols-3">
            <li className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="shrink-0 text-brand" aria-hidden />
              Istoric verificat
            </li>
            <li className="flex items-center gap-2.5">
              <Gauge size={18} className="shrink-0 text-brand" aria-hidden />
              Kilometraj garantat
            </li>
            <li className="flex items-center gap-2.5">
              <Wallet size={18} className="shrink-0 text-brand" aria-hidden />
              Finanțare în ~48h
            </li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl bg-muted">
          <img
            src={mercedesHero.url}
            alt="Mercedes-Benz CLA 180 din stocul Parc Auto Yanis"
            fetchPriority="high"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- QUICK SEARCH ---------------- */
function QuickSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const brands = [...new Set(vehicles.map((v) => v.brand))].sort();

  return (
    <section className="px-4 py-10 md:px-8" aria-labelledby="cauta-titlu">
      <div className="mx-auto max-w-[1320px] rounded-2xl border border-ink/10 bg-surface p-5 md:p-7">
        <h2 id="cauta-titlu" className="text-xl font-semibold text-ink">
          Caută o mașină
        </h2>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/stoc", search: q.trim() ? { q: q.trim() } : {} });
          }}
        >
          <div className="relative flex-1">
            <Search
              size={20}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-graphite"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Marcă sau model, de ex. Mercedes"
              aria-label="Caută după marcă sau model"
              className="h-14 w-full rounded-xl border border-input bg-surface pr-4 pl-12 text-base text-ink placeholder:text-graphite/70"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-14 items-center justify-center rounded-xl bg-brand px-8 text-base font-semibold text-white transition-colors duration-150 hover:bg-brand-strong"
          >
            Caută
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[15px] text-graphite">Direct la marcă:</span>
          {brands.map((b) => (
            <Link
              key={b}
              to="/stoc"
              search={{ marca: b }}
              className="inline-flex min-h-10 items-center rounded-full border border-ink/15 bg-surface px-4 text-[15px] font-medium text-ink transition-colors duration-150 hover:border-ink/40"
            >
              {b}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURED ---------------- */
function Featured() {
  const items = featuredSlugs
    .map((s) => vehicles.find((v) => v.slug === s))
    .filter(Boolean) as typeof vehicles;

  return (
    <section className="px-4 py-12 md:px-8 md:py-16" aria-labelledby="stoc-titlu">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="stoc-titlu" className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Mașini recomandate
            </h2>
            <p className="mt-2 text-base text-graphite md:text-lg">
              O parte din stocul disponibil acum, în {site.city}.
            </p>
          </div>
          <Link
            to="/stoc"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/15 bg-surface px-6 text-base font-semibold text-ink transition-colors duration-150 hover:bg-ink/5"
          >
            Vezi toate cele {vehicles.length} mașini
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v) => (
            <VehicleCard key={v.slug} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Istoric verificat",
      body: "Pentru fiecare mașină îți arătăm raportul de proveniență, accidente și service. Nimic ascuns.",
    },
    {
      icon: Gauge,
      title: "Kilometraj garantat",
      body: "Confirmăm kilometrajul real prin rapoarte independente și diagnoză, înainte să punem mașina la vânzare.",
    },
    {
      icon: Wallet,
      title: "Finanțare simplă",
      body: "Lucrăm cu mai multe bănci și IFN-uri. Ne ocupăm noi de dosar, tu primești răspunsul în aproximativ 48 de ore.",
    },
    {
      icon: Handshake,
      title: "Suport până la capăt",
      body: "Te însoțim de la prima vizionare până la înmatriculare. Rămânem la un telefon distanță și după cumpărare.",
    },
  ];

  return (
    <section
      className="border-y border-ink/8 bg-surface px-4 py-14 md:px-8 md:py-20"
      aria-labelledby="deceyanis-titlu"
    >
      <div className="mx-auto max-w-[1320px]">
        <h2 id="deceyanis-titlu" className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          De ce să cumperi de la noi
        </h2>
        <p className="mt-2 max-w-2xl text-base text-graphite md:text-lg">
          Suntem în piață de 9 ani și am vândut peste 100 de mașini. Regula e simplă: vindem doar
          mașini pe care le-am cumpăra și noi.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-ink/10 bg-canvas p-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand">
                <Icon size={22} strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-graphite">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINANCING ---------------- */
function Financing() {
  const example = vehicles.find((v) => v.slug === "bmw-320d-2018");
  const exampleRate = example ? monthlyPayment(example.price) : null;

  return (
    <section className="px-4 py-14 md:px-8 md:py-20" aria-labelledby="finantare-titlu">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 overflow-hidden rounded-2xl bg-muted lg:order-1">
          <img
            src={finantareImg}
            alt="Predarea cheilor unei mașini cumpărate"
            loading="lazy"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2
            id="finantare-titlu"
            className="text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            Finanțare fără drumuri și fără bătăi de cap
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-graphite md:text-lg">
            Ne ocupăm noi de dosarul de finanțare, cu mai multe bănci și IFN-uri. Tu alegi mașina,
            noi îți aducem cea mai bună ofertă de rate.
          </p>

          <ul className="mt-7 space-y-3 text-base text-ink">
            {[
              `Avans de la ${FINANCE.minDownPct}%`,
              `Perioadă de la ${FINANCE.minMonths} până la ${FINANCE.maxMonths} de luni`,
              "Răspuns de la bancă în aproximativ 48 de ore",
              "Fără comision de analiză a dosarului",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                {x}
              </li>
            ))}
          </ul>

          {example && exampleRate && (
            <p className="mt-6 rounded-xl border border-ink/10 bg-surface p-4 text-[15px] leading-relaxed text-graphite">
              De exemplu: {example.brand} {example.model} la {formatPrice(example.price)}, cu avans
              de {FINANCE.defaultDownPct}% pe {FINANCE.defaultMonths} de luni ≈{" "}
              <strong className="text-ink">{exampleRate} € / lună</strong>. Calcul orientativ, cu
              dobândă exemplu de {(FINANCE.annualRate * 100).toFixed(1)}% pe an.
            </p>
          )}

          <Link
            to="/finantare"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-brand px-8 text-[17px] font-semibold text-white transition-colors duration-150 hover:bg-brand-strong"
          >
            Calculează-ți rata
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const items = [
    {
      name: "Andrei Popescu",
      place: "București",
      quote:
        "Am cumpărat un BMW 320d de la Yanis. Mi-au arătat tot istoricul înainte să întreb eu. Recomand cu încredere.",
    },
    {
      name: "Ioana Marin",
      place: "Cluj-Napoca",
      quote:
        "Rar întâlnești un vânzător care îți spune și minusurile mașinii, nu doar plusurile. Exact ce aveam nevoie înainte să semnez.",
    },
    {
      name: "Mihai Dobre",
      place: "Timișoara",
      quote:
        "Am făcut drumul până la Tulcea și a meritat. Mașina exact ca în anunț, iar finanțarea a fost aprobată în două zile.",
    },
  ];

  return (
    <section
      className="border-y border-ink/8 bg-surface px-4 py-14 md:px-8 md:py-20"
      aria-labelledby="pareri-titlu"
    >
      <div className="mx-auto max-w-[1320px]">
        <h2 id="pareri-titlu" className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Ce spun clienții noștri
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-xl border border-ink/10 bg-canvas p-6"
            >
              <div className="flex gap-1 text-brand" aria-label="5 din 5 stele">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={16} fill="currentColor" strokeWidth={0} aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
                „{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-ink/8 pt-4 text-[15px]">
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="text-graphite"> · {t.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const items = [
    {
      q: "Pot vedea mașina înainte să mă decid?",
      a: `Da, chiar te încurajăm. Ne găsești la ${site.address}, de luni până sâmbătă între 09:00 și 19:00. Sună-ne înainte și pregătim mașina pentru vizionare și test drive.`,
    },
    {
      q: "Cum știu că mașina nu a fost avariată sau dată înapoi la kilometraj?",
      a: "Pentru fiecare mașină avem raport de istoric (proveniență, accidente, service) și verificăm kilometrajul prin rapoarte independente. Primești toate documentele înainte de cumpărare.",
    },
    {
      q: "Cum funcționează finanțarea?",
      a: "Alegi mașina, ne dai câteva date de contact și ne ocupăm noi de dosar, cu mai multe bănci și IFN-uri. De obicei primești răspunsul în aproximativ 48 de ore. Avansul pornește de la 15%.",
    },
    {
      q: "Oferiți garanție?",
      a: "Da, mașinile vin cu garanție pentru componentele majore. Îți explicăm exact ce acoperă înainte de semnare, fără condiții ascunse în contract.",
    },
    {
      q: "Primiți mașina mea la schimb (buy-back)?",
      a: "Da. Vino cu mașina ta la sediu, o evaluăm pe loc și scădem valoarea ei din prețul mașinii pe care o cumperi.",
    },
  ];

  return (
    <section className="px-4 py-14 md:px-8 md:py-20" aria-labelledby="faq-titlu">
      <div className="mx-auto max-w-[840px]">
        <h2 id="faq-titlu" className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Întrebări frecvente
        </h2>

        <div className="mt-8 divide-y divide-ink/8 rounded-xl border border-ink/10 bg-surface">
          {items.map((it) => (
            <details key={it.q} className="group px-5 md:px-6">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {it.q}
                <ChevronDown
                  size={20}
                  aria-hidden
                  className="shrink-0 text-graphite transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="pb-5 text-base leading-relaxed text-graphite">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function ContactBand() {
  return (
    <section className="px-4 pb-4 md:px-8" aria-labelledby="contact-titlu">
      <div className="mx-auto max-w-[1320px] rounded-2xl border border-ink/10 bg-surface p-8 md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2
              id="contact-titlu"
              className="text-3xl font-bold tracking-tight text-ink md:text-4xl"
            >
              Vino să vezi mașinile
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-graphite md:text-lg">
              Te așteptăm la sediul nostru din {site.city}. Dacă ne suni înainte, pregătim mașinile
              care te interesează pentru probă.
            </p>
            <ul className="mt-6 space-y-2 text-base text-ink">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0 text-brand" aria-hidden />
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {site.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="shrink-0 text-brand" aria-hidden />
                {site.schedule}
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href={site.phoneHref}
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-brand px-8 text-[17px] font-semibold text-white transition-colors duration-150 hover:bg-brand-strong lg:w-auto"
            >
              <Phone size={18} aria-hidden />
              {site.phone}
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-ink/15 bg-surface px-8 text-[17px] font-semibold text-ink transition-colors duration-150 hover:bg-ink/5 lg:w-auto"
            >
              Trimite-ne un mesaj
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
