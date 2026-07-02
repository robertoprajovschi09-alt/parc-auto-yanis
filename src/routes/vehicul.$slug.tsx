import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
} from "lucide-react";

import { vehicles, formatKm, formatPrice, type Vehicle } from "@/lib/vehicles";
import { monthlyPayment, FINANCE } from "@/lib/finance";
import { site, whatsappLink } from "@/lib/site";
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
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold text-ink">Mașina nu a fost găsită</h1>
        <p className="mt-3 text-base text-graphite">
          Probabil a fost vândută sau linkul nu mai este valabil.
        </p>
        <Link
          to="/stoc"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-white transition-colors duration-150 hover:bg-brand-strong"
        >
          Vezi mașinile disponibile
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <p className="text-base text-graphite">A apărut o eroare la încărcarea mașinii.</p>
    </div>
  ),
});

function specRows(v: Vehicle) {
  const rows: [string, string][] = [
    ["Anul fabricației", String(v.year)],
    ["Kilometraj", formatKm(v.mileage)],
    ["Combustibil", v.fuel],
    ["Cutie de viteze", v.transmission],
    ["Putere", v.power],
  ];
  if (v.engine) rows.push(["Motor", v.engine]);
  if (v.body) rows.push(["Caroserie", v.body]);
  if (v.color) rows.push(["Culoare", v.color]);
  if (v.drive) rows.push(["Tracțiune", v.drive]);
  return rows;
}

function VehiclePage() {
  const { vehicle } = Route.useLoaderData();
  const title = `${vehicle.brand} ${vehicle.model}`;
  const photos = vehicle.photos ?? [{ src: vehicle.image, alt: `${title}, ${vehicle.year}` }];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const related = vehicles.filter((v) => v.slug !== vehicle.slug).slice(0, 3);
  const rate = monthlyPayment(vehicle.price);
  const waMessage = `Bună ziua! Mă interesează ${title} din ${vehicle.year} (${formatPrice(vehicle.price)}). Mai este disponibilă?`;

  return (
    <div className="pt-24 md:pt-32">
      {/* Breadcrumb */}
      <nav aria-label="Localizare în site" className="mx-auto max-w-[1320px] px-4 md:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-[14px] text-graphite">
          <li><Link to="/" className="underline-offset-4 hover:text-ink hover:underline">Acasă</Link></li>
          <li aria-hidden>/</li>
          <li><Link to="/stoc" className="underline-offset-4 hover:text-ink hover:underline">Mașini în stoc</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="font-medium text-ink">{title}</li>
        </ol>
      </nav>

      {/* Title */}
      <header className="mx-auto max-w-[1320px] px-4 pt-6 md:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-base text-graphite md:text-lg">
          {vehicle.year} · {formatKm(vehicle.mileage)} · {vehicle.fuel} · {vehicle.transmission} · {vehicle.power}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[15px] text-graphite">
          <MapPin size={15} aria-hidden /> {vehicle.location}
        </p>
      </header>

      {/* Gallery */}
      <section className="mx-auto max-w-[1320px] px-4 pt-6 md:px-8" aria-label="Fotografii">
        <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
          <button
            type="button"
            onClick={() => setLightbox(0)}
            className="relative block overflow-hidden rounded-xl bg-muted"
            aria-label={`Deschide fotografiile (${photos.length})`}
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              fetchPriority="high"
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <span className="absolute right-3 bottom-3 rounded-full bg-surface px-3.5 py-1.5 text-[14px] font-medium text-ink shadow-sm">
              {photos.length === 1 ? "1 fotografie" : `${photos.length} fotografii`}
            </span>
          </button>

          {photos.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
              {photos.slice(1, 5).map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setLightbox(i + 1)}
                  className="relative block overflow-hidden rounded-xl bg-muted"
                  aria-label={`Fotografia ${i + 2}`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
                  {i === 3 && photos.length > 5 && (
                    <span className="absolute inset-0 grid place-items-center bg-ink/60 text-lg font-semibold text-white">
                      +{photos.length - 5} foto
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto grid max-w-[1320px] gap-10 px-4 pt-10 md:grid-cols-[1.6fr_1fr] md:gap-12 md:px-8">
        {/* Price + actions — first on mobile, right column on desktop */}
        <aside className="md:order-2 md:sticky md:top-28 md:self-start">
          <div className="rounded-xl border border-ink/10 bg-surface p-6">
            <p className="text-[15px] text-graphite">Preț</p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-ink">
              {formatPrice(vehicle.price)}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-graphite">
              Rată orientativă: <strong className="text-ink">{rate} € / lună</strong>{" "}
              (avans {FINANCE.defaultDownPct}%, {FINANCE.defaultMonths} de luni).{" "}
              <Link
                to="/finantare"
                search={{ pret: vehicle.price }}
                className="font-semibold text-brand underline underline-offset-4 hover:text-brand-strong"
              >
                Calculează exact
              </Link>
            </p>

            <div className="mt-6 space-y-2.5">
              <Link
                to="/contact"
                search={{ masina: vehicle.slug }}
                className="flex min-h-14 w-full items-center justify-center rounded-full bg-brand px-6 text-[17px] font-semibold text-white transition-colors duration-150 hover:bg-brand-strong"
              >
                Programează o vizionare
              </Link>
              <a
                href={site.phoneHref}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-6 text-[17px] font-semibold text-ink transition-colors duration-150 hover:bg-ink/5"
              >
                <Phone size={18} aria-hidden /> {site.phone}
              </a>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-6 text-[17px] font-semibold text-ink transition-colors duration-150 hover:bg-ink/5"
              >
                <MessageCircle size={18} aria-hidden /> Scrie-ne pe WhatsApp
              </a>
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-graphite">
              Program: {site.schedule}. Răspundem în cel mult 24 de ore.
            </p>
          </div>
        </aside>

        {/* Details */}
        <div className="space-y-12 md:order-1">
          {/* Specs */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Date tehnice</h2>
            <dl className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {specRows(vehicle).map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-ink/8 py-3.5">
                  <dt className="text-[15px] text-graphite">{label}</dt>
                  <dd className="text-[16px] font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Despre această mașină</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              {(vehicle.description ?? [
                `${title} din ${vehicle.year}, ${vehicle.fuel.toLowerCase()}, cutie ${vehicle.transmission.toLowerCase()}. Mașina este verificată tehnic, are kilometrajul garantat și istoric complet — primești toate documentele înainte de cumpărare.`,
                `Sună-ne pentru orice detaliu sau programează o vizionare la sediul nostru din ${vehicle.location}. Te putem ajuta și cu finanțarea, cu răspuns în aproximativ 48 de ore.`,
              ]).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>

          {/* Features — only when real data exists */}
          {vehicle.features && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">Dotări</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {Object.entries(vehicle.features).map(([group, list]) => (
                  <div key={group} className="rounded-xl border border-ink/10 bg-surface p-5">
                    <h3 className="text-[17px] font-semibold text-ink">{group}</h3>
                    <ul className="mt-3 space-y-2 text-[15px] text-ink-soft">
                      {list.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check size={16} className="mt-1 shrink-0 text-brand" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t: "Istoric verificat", d: "Raport complet, oferit înainte de cumpărare" },
              { t: "Kilometraj garantat", d: "Confirmat prin rapoarte independente" },
              { t: "Garanție inclusă", d: "Pentru componentele majore" },
            ].map((x) => (
              <div key={x.t} className="flex items-start gap-3 rounded-xl border border-ink/10 bg-surface p-4">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
                <div>
                  <p className="text-[15px] font-semibold text-ink">{x.t}</p>
                  <p className="mt-0.5 text-[14px] text-graphite">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-24" aria-labelledby="similare-titlu">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="similare-titlu" className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Alte mașini din stoc
            </h2>
            <Link
              to="/stoc"
              className="inline-flex min-h-11 items-center text-base font-semibold text-brand underline-offset-4 hover:underline"
            >
              Vezi tot stocul
            </Link>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <VehicleCard key={v.slug} v={v} />
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <Lightbox
          photos={photos}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </div>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const prev = () => onNavigate((index - 1 + photos.length) % photos.length);
  const next = () => onNavigate((index + 1) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fotografia ${index + 1} din ${photos.length}`}
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-4 md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        autoFocus
        className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors duration-150 hover:bg-white/10"
        onClick={onClose}
        aria-label="Închide galeria"
      >
        <X size={20} />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-3 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors duration-150 hover:bg-white/10 md:left-8"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Fotografia anterioară"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="absolute right-3 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors duration-150 hover:bg-white/10 md:right-8"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Fotografia următoare"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <img
        src={photos[index].src}
        alt={photos[index].alt}
        className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-4 text-[15px] text-white/80">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
