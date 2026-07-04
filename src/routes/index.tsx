import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Gauge,
  Wallet,
  Phone,
  ChevronDown,
  MapPin,
  Clock,
  Star,
  Handshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import finantareImg from "@/assets/finantare.jpg";
import { vehicles, featuredSlugs, financeExampleSlug, formatPrice } from "@/lib/vehicles";
import { monthlyPayment, FINANCE } from "@/lib/finance";
import { site } from "@/lib/site";
import { VehicleCard } from "@/components/site/VehicleCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Hero } from "@/components/home/Hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Featured />
      <WhyUs />
      <FinancingBand />
      <Testimonials />
      <Faq />
      <ContactBand />
    </>
  );
}

/* ---------------- POPULAR BRANDS ---------------- */
function Brands() {
  const counts = new Map<string, number>();
  for (const v of vehicles) counts.set(v.brand, (counts.get(v.brand) ?? 0) + 1);
  const brands = [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <section className="px-4 pt-14 md:px-8 md:pt-16" aria-labelledby="marci-titlu">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading id="marci-titlu" eyebrow="Direct la țintă" title="Mărci populare" />
        <RevealGroup className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map(([brand, count]) => (
            <RevealItem key={brand}>
              <Link
                to="/stoc"
                search={{ marca: brand }}
                className="group flex h-full flex-col rounded-lg bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="text-[17px] font-extrabold text-ink transition-colors duration-200 group-hover:text-brand">
                  {brand}
                </span>
                <span className="mt-1 flex items-center justify-between text-[14px] font-medium text-graphite">
                  {count === 1 ? "1 mașină" : `${count} mașini`}
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="text-sun-strong transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
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
    <section className="px-4 py-14 md:px-8 md:py-20" aria-labelledby="stoc-titlu">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="stoc-titlu"
          eyebrow="Stoc actual"
          title="Cele mai bune oferte"
          sub={`Alese cu grijă din mașinile disponibile acum, în ${site.city}.`}
        >
          <Link to="/stoc" className="btn-ghost !min-h-12 !text-[15px]">
            Vezi toate cele {vehicles.length} mașini
          </Link>
        </SectionHeading>

        <RevealGroup className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v) => (
            <RevealItem key={v.slug} className="h-full">
              <VehicleCard v={v} />
            </RevealItem>
          ))}
        </RevealGroup>
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
    <section className="px-4 py-14 md:px-8 md:py-20" aria-labelledby="deceyanis-titlu">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="deceyanis-titlu"
          eyebrow="De încredere"
          title="De ce să cumperi de la noi"
          sub="Suntem în piață de 9 ani și am vândut peste 100 de mașini. Regula e simplă: vindem doar mașini pe care le-am cumpăra și noi."
        />

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title} className="h-full">
              <div className="group h-full rounded-lg bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-sun transition-transform duration-300 group-hover:scale-105">
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-ink">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite">{body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------- FINANCING (dark band) ---------------- */
function FinancingBand() {
  const example = vehicles.find((v) => v.slug === financeExampleSlug);
  const exampleRate = example?.price != null ? monthlyPayment(example.price) : null;

  return (
    <section
      className="relative isolate overflow-hidden bg-ink px-4 py-16 md:px-8 md:py-24"
      aria-labelledby="finantare-titlu"
    >
      {/* Soft yellow glow, echoes the hero lighting */}
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 h-[480px] w-[480px] rounded-full bg-sun/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="finantare-titlu"
            dark
            eyebrow="Finanțare"
            title="Rate fără drumuri și fără bătăi de cap"
            sub="Ne ocupăm noi de dosarul de finanțare, cu mai multe bănci și IFN-uri. Tu alegi mașina, noi îți aducem cea mai bună ofertă de rate."
          />

          <ul className="mt-8 space-y-3.5 text-base text-white/90">
            {[
              `Avans de la ${FINANCE.minDownPct}%`,
              `Perioadă de la ${FINANCE.minMonths} până la ${FINANCE.maxMonths} de luni`,
              "Răspuns de la bancă în aproximativ 48 de ore",
              "Fără comision de analiză a dosarului",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3 font-medium">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-sun" aria-hidden />
                {x}
              </li>
            ))}
          </ul>

          {example?.price != null && exampleRate && (
            <p className="mt-8 rounded-xl border border-white/12 bg-white/5 p-5 text-[15px] leading-relaxed text-white/75">
              De exemplu: {example.brand} {example.model} la {formatPrice(example.price)}, cu avans
              de {FINANCE.defaultDownPct}% pe {FINANCE.defaultMonths} de luni ≈{" "}
              <strong className="text-lg font-extrabold text-sun">{exampleRate} € / lună</strong>.
              Calcul orientativ, cu dobândă exemplu de {(FINANCE.annualRate * 100).toFixed(1)}% pe
              an.
            </p>
          )}

          <Link to="/finantare" className="btn-sun mt-9 !min-h-14 !px-9 !text-[17px]">
            Calculează-ți rata
          </Link>
        </div>

        <Reveal className="relative">
          <div className="overflow-hidden rounded-2xl shadow-lift">
            <img
              src={finantareImg}
              alt="Predarea cheilor unei mașini cumpărate"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
          <div aria-hidden className="absolute -bottom-3 left-6 h-1.5 w-24 rounded-full bg-sun" />
        </Reveal>
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
    <section className="px-4 py-14 md:px-8 md:py-20" aria-labelledby="pareri-titlu">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="pareri-titlu"
          center
          eyebrow="Testimoniale"
          title="Ce spun clienții noștri"
        />

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="flex h-full flex-col rounded-lg bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex gap-1 text-sun" aria-label="5 din 5 stele">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={17} fill="currentColor" strokeWidth={0} aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink-soft">
                  „{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-4 text-[15px]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun-soft text-[15px] font-extrabold text-ink">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block font-extrabold text-ink">{t.name}</span>
                    <span className="block text-[13px] text-graphite">Client · {t.place}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
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
        <SectionHeading id="faq-titlu" center eyebrow="Ai întrebări?" title="Întrebări frecvente" />

        <Reveal className="mt-9">
          <div className="divide-y divide-ink/8 rounded-2xl bg-surface shadow-card">
            {items.map((it) => (
              <details key={it.q} className="group px-5 md:px-7">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-extrabold text-ink transition-colors duration-200 hover:text-brand [&::-webkit-details-marker]:hidden">
                  {it.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sun-soft text-ink transition-transform duration-200 group-open:rotate-180">
                    <ChevronDown size={18} aria-hidden />
                  </span>
                </summary>
                <p className="pb-6 text-base leading-relaxed text-graphite">{it.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function ContactBand() {
  return (
    <section className="px-4 pb-4 md:px-8" aria-labelledby="contact-titlu">
      <Reveal className="mx-auto max-w-[1320px]">
        <div className="rounded-2xl bg-surface p-8 shadow-float md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <SectionHeading
                id="contact-titlu"
                eyebrow="Te așteptăm"
                title="Vino să vezi mașinile"
                sub={`Te așteptăm la sediul nostru din ${site.city}. Dacă ne suni înainte, pregătim mașinile care te interesează pentru probă.`}
              />
              <ul className="mt-7 space-y-2 text-base text-ink">
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sun-soft text-ink">
                    <MapPin size={18} aria-hidden />
                  </span>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    {site.address}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sun-soft text-ink">
                    <Clock size={18} aria-hidden />
                  </span>
                  <span className="font-semibold">{site.schedule}</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={site.phoneHref}
                className="btn-primary w-full !min-h-14 !text-[17px] lg:w-auto"
              >
                <Phone size={18} aria-hidden />
                {site.phone}
              </a>
              <Link to="/contact" className="btn-ghost w-full !min-h-14 !text-[17px] lg:w-auto">
                Trimite-ne un mesaj
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
