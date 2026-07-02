import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Fuel,
  Gauge,
  Cog,
  Zap,
  Palette,
  MapPin,
  ShieldCheck,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

import { vehicles, formatKm, formatPrice } from "@/lib/vehicles";
import { mercedesPhotos, mercedesSpec, mercedesFeatures } from "@/lib/mercedes";
import { Reveal } from "@/components/site/Reveal";
import { VehicleCard } from "@/components/site/VehicleCard";

export const Route = createFileRoute("/vehicul/$slug")({
  loader: ({ params }) => {
    const v = vehicles.find((x) => x.slug === params.slug);
    if (!v) throw notFound();
    return { vehicle: v };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.vehicle;
    const title = v ? `${v.brand} ${v.model} ${v.year} — Parc Auto Yanis` : "Mașină — Parc Auto Yanis";
    const description = v
      ? `${v.brand} ${v.model} din ${v.year}, ${formatKm(v.mileage)}, ${v.fuel}, ${v.transmission}. Preț ${formatPrice(v.price)}.`
      : "Detalii vehicul";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(v ? [{ property: "og:image", content: v.image }] : []),
      ],
    };
  },
  component: VehiclePage,
  notFoundComponent: () => (
    <div className="grid min-h-[80vh] place-items-center px-6 text-center">
      <div>
        <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">404</p>
        <h1 className="mt-4 font-serif text-5xl text-ink">Mașina nu a fost găsită.</h1>
        <Link to="/stoc" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-canvas">
          Înapoi la stoc <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-[80vh] place-items-center px-6 text-center">
      <p className="text-graphite">A apărut o eroare la încărcarea mașinii.</p>
    </div>
  ),
});

function VehiclePage() {
  const { vehicle } = Route.useLoaderData();
  const isMercedes = vehicle.slug === "mercedes-cla-180-2016";

  // For non-mercedes cars, fall back to a single-image gallery
  const photos = isMercedes
    ? mercedesPhotos
    : [{ src: vehicle.image, alt: `${vehicle.brand} ${vehicle.model}` }];

  const spec = isMercedes
    ? mercedesSpec
    : {
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        fuel: vehicle.fuel,
        engine: "—",
        power: vehicle.power,
        mileage: vehicle.mileage,
        transmission: vehicle.transmission,
        body: "Sedan",
        color: "—",
        drive: "—",
        price: vehicle.price,
        vin: "—",
        location: "Tulcea, România",
      };

  const features = isMercedes ? mercedesFeatures : {};

  const [lightbox, setLightbox] = useState<number | null>(null);
  const related = vehicles.filter((v) => v.slug !== vehicle.slug).slice(0, 3);

  return (
    <div className="pt-24 md:pt-28">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-2 text-xs text-graphite">
          <Link to="/" className="hover:text-ink">Acasă</Link>
          <span className="text-ink/20">/</span>
          <Link to="/stoc" className="hover:text-ink">Stoc</Link>
          <span className="text-ink/20">/</span>
          <span className="text-ink">{spec.brand} {spec.model}</span>
        </div>
      </div>

      {/* Hero + Title */}
      <section className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10 md:pt-14">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="min-w-0">
              <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">{spec.brand}</p>
              <h1 className="mt-3 font-serif text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] text-ink">
                {spec.model} <span className="italic text-graphite">{spec.year}</span>
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-graphite">
                <span className="inline-flex items-center gap-2"><MapPin size={14} /> {spec.location}</span>
                <span className="inline-flex items-center gap-2"><Gauge size={14} /> {formatKm(spec.mileage)}</span>
                <span className="inline-flex items-center gap-2"><Fuel size={14} /> {spec.fuel}</span>
                <span className="inline-flex items-center gap-2"><Cog size={14} /> {spec.transmission}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-surface text-ink hover:bg-ink hover:text-canvas transition-colors">
                <Heart size={16} />
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-surface text-ink hover:bg-ink hover:text-canvas transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Gallery */}
        <div className="mt-10 grid gap-3 md:grid-cols-[1.6fr_1fr] md:gap-4">
          <Reveal className="relative overflow-hidden rounded-[1.5rem] bg-muted">
            <button onClick={() => setLightbox(0)} className="group block h-full w-full">
              <img
                src={photos[0].src}
                alt={photos[0].alt}
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04] md:aspect-auto"
              />
              <span className="glass absolute right-4 bottom-4 rounded-full px-3 py-1.5 text-xs text-ink">
                {photos.length} fotografii
              </span>
            </button>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {photos.slice(1, 5).map((p, i) => (
              <Reveal
                key={i}
                delay={i * 0.05}
                className="relative overflow-hidden rounded-[1.25rem] bg-muted"
              >
                <button onClick={() => setLightbox(i + 1)} className="group block h-full w-full">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                  />
                  {i === 3 && photos.length > 5 && (
                    <span className="absolute inset-0 grid place-items-center bg-ink/50 text-canvas">
                      +{photos.length - 5} foto
                    </span>
                  )}
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-[1400px] gap-14 px-6 pt-20 md:grid-cols-[1.6fr_1fr] md:gap-16 md:px-10 md:pt-24">
        {/* Left */}
        <div className="space-y-16">
          {/* Key specs */}
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              Fișă <span className="italic text-graphite">tehnică</span>
            </h2>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3">
              {[
                ["Anul fabricației", spec.year, Calendar],
                ["Kilometraj", formatKm(spec.mileage), Gauge],
                ["Combustibil", spec.fuel, Fuel],
                ["Motor", spec.engine, Cog],
                ["Putere", spec.power, Zap],
                ["Transmisie", spec.transmission, Cog],
                ["Caroserie", spec.body, Cog],
                ["Culoare", spec.color, Palette],
                ["Tracțiune", spec.drive, Cog],
              ].map(([label, value, Icon]) => {
                const IconComp = Icon as typeof Calendar;
                return (
                  <div key={label as string} className="border-t border-ink/10 pt-4">
                    <dt className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-graphite">
                      <IconComp size={12} /> {label}
                    </dt>
                    <dd className="mt-2 font-serif text-lg text-ink">{value}</dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          {/* Description */}
          <Reveal>
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              Despre <span className="italic text-graphite">această mașină</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                {spec.brand} {spec.model} din {spec.year}, întreținut impecabil, cu istoric complet
                de service la reprezentanță. Mașina se prezintă într-o stare excelentă,
                atât estetic cât și mecanic, gata de drum imediat după înmatriculare.
              </p>
              <p>
                Interiorul păstrează atmosfera clasei premium — tapițerie combinată piele-textil,
                bord digital, lumini ambientale, sistem multimedia cu Apple CarPlay și navigație extinsă.
                Kilometrajul este garantat, iar la vânzare oferim raportul complet de istoric.
              </p>
              <p>
                Pentru orice detaliu tehnic sau programare pentru vizionare, echipa Parc Auto Yanis
                îți răspunde în cel mult 24 de ore. Finanțarea poate fi aprobată în doar 48h.
              </p>
            </div>
          </Reveal>

          {/* Features */}
          {isMercedes && (
            <Reveal>
              <h2 className="font-serif text-3xl text-ink md:text-4xl">
                Dotări <span className="italic text-graphite">complete</span>
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {Object.entries(features).map(([group, list]) => (
                  <div key={group} className="rounded-3xl border border-ink/8 bg-surface p-6">
                    <h3 className="font-serif text-xl text-ink">{group}</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                      {(list as string[]).map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check size={14} className="mt-1 shrink-0 text-ink" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Trust */}
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { t: "Istoric verificat", d: "Raport complet oferit la cerere" },
                { t: "Kilometraj garantat", d: "Validat prin rapoarte multiple" },
                { t: "Garanție inclusă", d: "6 luni la componente majore" },
              ].map((x) => (
                <div key={x.t} className="flex items-start gap-3 rounded-2xl border border-ink/8 bg-surface p-5">
                  <ShieldCheck size={18} className="mt-0.5 text-ink" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-ink">{x.t}</p>
                    <p className="mt-1 text-xs text-graphite">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — sticky price card */}
        <aside className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/8 bg-surface p-7 shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(0,0,0,0.15)]">
              <p className="text-[11px] tracking-[0.2em] uppercase text-graphite">Preț listat</p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight text-ink">
                  {formatPrice(spec.price)}
                </span>
                <span className="text-sm text-graphite">TVA inclus</span>
              </div>
              <p className="mt-3 text-sm text-graphite">
                Sau finanțare de la <span className="font-medium text-ink">{Math.round(spec.price / 84).toLocaleString("ro-RO")} € / lună</span> pe 84 luni.
              </p>

              <div className="my-6 h-px w-full bg-ink/8" />

              <div className="space-y-2">
                <button className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-4 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5">
                  Programează vizionare
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:+40743000000" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink hover:bg-ink/5">
                    <Phone size={14} /> Sună
                  </a>
                  <a href="#" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink hover:bg-ink/5">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-secondary/60 p-4 text-xs text-graphite leading-relaxed">
                Cod anunț: <span className="font-mono text-ink">PY-{vehicle.slug.slice(-6).toUpperCase()}</span> · Actualizat astăzi · Verificat de Yanis
              </div>
            </div>
          </Reveal>
        </aside>
      </section>

      {/* Related */}
      <section className="px-6 pt-32 pb-8 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.02em] text-ink">
                S-ar potrivi și <span className="italic text-graphite">aceste mașini</span>.
              </h2>
              <Link to="/stoc" className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink">
                <ArrowLeft size={15} /> Vezi tot stocul
              </Link>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v, i) => (
              <VehicleCard key={v.slug} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-4 md:p-10"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:bg-white/10"
              onClick={() => setLightbox(null)}
              aria-label="Închide"
            >
              <X size={18} />
            </button>
            <button
              className="absolute left-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:bg-white/10 md:left-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((v) => (v === null ? 0 : (v - 1 + photos.length) % photos.length));
              }}
              aria-label="Anterioară"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="absolute right-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:bg-white/10 md:right-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((v) => (v === null ? 0 : (v + 1) % photos.length));
              }}
              aria-label="Următoarea"
            >
              <ChevronRight size={18} />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-5 text-sm text-white/60">
              {lightbox + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}