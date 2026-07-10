import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Phone, X, ChevronLeft, ChevronRight, Check, Camera, MapPin } from "lucide-react";

import { vehicles, formatKm, priceLabel, type Vehicle } from "@/lib/vehicles";
import { site } from "@/lib/site";
import { VehicleCard } from "@/components/site/VehicleCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal, RevealGroup, RevealItem, EASE } from "@/components/motion/Reveal";

export const Route = createFileRoute("/vehicul/$slug")({
  loader: ({ params }) => {
    const v = vehicles.find((x) => x.slug === params.slug);
    if (!v) throw notFound();
    return { vehicle: v };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.vehicle;
    const title = v
      ? `${v.brand} ${v.model}${v.year ? ` ${v.year}` : ""} — Târg Auto Yanis`
      : "Mașină — Târg Auto Yanis";
    const description = v
      ? [
          `${v.brand} ${v.model}`,
          v.year && `din ${v.year}`,
          v.mileage != null && formatKm(v.mileage),
          v.fuel,
          v.sold ? "Vândut" : `Preț: ${priceLabel(v)}`,
        ]
          .filter(Boolean)
          .join(", ") + "."
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
        <h1 className="text-3xl font-extrabold text-ink">Mașina nu a fost găsită</h1>
        <p className="mt-3 text-base text-graphite">
          Probabil a fost vândută sau linkul nu mai este valabil.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/stoc" className="btn-primary">
            Vezi mașinile disponibile
          </Link>
        </div>
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
  const rows: [string, string][] = [];
  if (v.year != null) rows.push(["Anul fabricației", String(v.year)]);
  if (v.mileage != null) rows.push(["Kilometraj", formatKm(v.mileage)]);
  if (v.fuel) rows.push(["Combustibil", v.fuel]);
  if (v.transmission) rows.push(["Cutie de viteze", v.transmission]);
  if (v.engine) rows.push(["Capacitate cilindrică", v.engine]);
  if (v.power) rows.push(["Putere", v.power]);
  if (v.body) rows.push(["Caroserie", v.body]);
  if (v.color) rows.push(["Culoare", v.color]);
  if (v.drive) rows.push(["Tracțiune", v.drive]);
  return rows;
}

function VehiclePage() {
  const { vehicle } = Route.useLoaderData();
  const title = `${vehicle.brand} ${vehicle.model}`;
  const photos = vehicle.photos ?? [{ src: vehicle.image, alt: title }];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const related = vehicles.filter((v) => v.slug !== vehicle.slug).slice(0, 3);
  const metaLine = [
    vehicle.year,
    vehicle.mileage != null && formatKm(vehicle.mileage),
    vehicle.fuel,
    vehicle.transmission,
    [vehicle.engine, vehicle.power].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="pt-24 md:pt-32">
      {/* Breadcrumb */}
      <nav aria-label="Localizare în site" className="mx-auto max-w-[1320px] px-4 md:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-[14px] font-medium text-graphite">
          <li>
            <Link to="/" className="underline-offset-4 hover:text-brand hover:underline">
              Acasă
            </Link>
          </li>
          <li aria-hidden className="text-sun-strong">
            /
          </li>
          <li>
            <Link to="/stoc" className="underline-offset-4 hover:text-brand hover:underline">
              Mașini în stoc
            </Link>
          </li>
          <li aria-hidden className="text-sun-strong">
            /
          </li>
          <li aria-current="page" className="font-bold text-ink">
            {title}
          </li>
        </ol>
      </nav>

      {/* Title + price row */}
      <header className="mx-auto max-w-[1320px] px-4 pt-6 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            {vehicle.sold ? (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-[13px] font-black tracking-wide text-white uppercase">
                Vândut
                {vehicle.soldNote && (
                  <span className="font-bold text-sun normal-case">⚡ {vehicle.soldNote}</span>
                )}
              </span>
            ) : (
              vehicle.tag && (
                <span className="mb-3 inline-block rounded-md bg-sun px-2.5 py-1 text-[13px] font-bold text-ink">
                  {vehicle.tag}
                </span>
              )
            )}
            <h1 className="text-3xl font-extrabold tracking-tight text-ink md:text-[44px] md:leading-[1.1]">
              {title}
            </h1>
            {metaLine && (
              <p className="mt-2.5 text-base font-medium text-graphite md:text-lg">{metaLine}</p>
            )}
            <p className="mt-1.5 flex items-center gap-1.5 text-[15px] font-medium text-graphite">
              <MapPin size={15} aria-hidden className="text-brand" /> {vehicle.location}
            </p>
          </div>
          <div className="md:text-right">
            {vehicle.sold ? (
              <p className="text-[40px] leading-none font-black tracking-tight text-graphite">
                Vândut
              </p>
            ) : (
              <>
                <p className="text-[14px] font-semibold text-graphite">Preț</p>
                <p className="text-[40px] leading-none font-black tracking-tight text-brand">
                  {priceLabel(vehicle)}
                </p>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section className="mx-auto max-w-[1320px] px-4 pt-7 md:px-8" aria-label="Fotografii">
        <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
          <motion.button
            type="button"
            onClick={() => setLightbox(0)}
            whileHover={{ scale: 0.995 }}
            className="group relative block overflow-hidden rounded-xl bg-muted"
            aria-label={`Deschide fotografiile (${photos.length})`}
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              fetchPriority="high"
              width={1200}
              height={900}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-ink/80 px-3 py-1.5 text-[14px] font-bold text-white">
              <Camera size={15} aria-hidden />
              {photos.length === 1 ? "1 fotografie" : `${photos.length} fotografii`}
            </span>
          </motion.button>

          {photos.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
              {photos.slice(1, 5).map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setLightbox(i + 1)}
                  className="group relative block overflow-hidden rounded-xl bg-muted"
                  aria-label={`Fotografia ${i + 2}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    width={600}
                    height={450}
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {i === 3 && photos.length > 5 && (
                    <span className="absolute inset-0 grid place-items-center bg-ink/60 text-lg font-extrabold text-white">
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
        <aside className="md:order-2 md:sticky md:top-32 md:self-start">
          <div className="rounded-2xl bg-surface p-6 shadow-float">
            {vehicle.sold ? (
              <div>
                <p className="text-4xl font-black tracking-tight text-graphite">Vândut</p>
                <p className="mt-3 text-[14px] leading-relaxed text-graphite">
                  Această mașină s-a vândut{vehicle.soldNote ? ` ${vehicle.soldNote}` : ""}. Cauți
                  ceva asemănător? Sună-ne.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[14px] font-semibold text-graphite">Preț</p>
                <p className="mt-1 text-4xl font-black tracking-tight text-brand">
                  {priceLabel(vehicle)}
                </p>
              </div>
            )}

            <div className="mt-6">
              <a href={site.phoneHref} className="btn-primary w-full !min-h-14 !text-[17px]">
                <Phone size={18} aria-hidden /> {site.phone}
              </a>
            </div>

            <p className="mt-5 border-t border-ink/8 pt-5 text-[13px] leading-relaxed text-graphite">
              {site.schedule} · {site.address}
            </p>
          </div>
        </aside>

        {/* Details */}
        <div className="space-y-12 md:order-1">
          {/* Specs */}
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Date tehnice</h2>
            <dl className="mt-5 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {specRows(vehicle).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-ink/8 py-3.5"
                >
                  <dt className="text-[15px] font-medium text-graphite">{label}</dt>
                  <dd className="text-[16px] font-extrabold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Description */}
          {vehicle.description && (
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                Despre această mașină
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                {vehicle.description.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>
          )}

          {/* Features — only when real data exists */}
          {vehicle.features && (
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">Dotări</h2>
              <RevealGroup className="mt-5 grid gap-4 sm:grid-cols-2">
                {Object.entries(vehicle.features).map(([group, list]) => (
                  <RevealItem key={group} className="h-full">
                    <div className="h-full rounded-lg bg-surface p-5 shadow-card">
                      <h3 className="text-[17px] font-extrabold text-ink">{group}</h3>
                      <ul className="mt-3 space-y-2 text-[15px] text-ink-soft">
                        {list.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun-soft">
                              <Check size={12} className="text-ink" strokeWidth={3} aria-hidden />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-24" aria-labelledby="similare-titlu">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading
            id="similare-titlu"
            eyebrow="Continuă căutarea"
            title="Alte mașini din stoc"
          >
            <Link
              to="/stoc"
              className="inline-flex min-h-11 items-center text-base font-bold text-brand underline-offset-4 hover:underline"
            >
              Vezi tot stocul →
            </Link>
          </SectionHeading>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <RevealItem key={v.slug} className="h-full">
                <VehicleCard v={v} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photos={photos}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />
        )}
      </AnimatePresence>
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
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Fotografia ${index + 1} din ${photos.length}`}
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-4 md:p-10"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        autoFocus
        className="absolute top-4 right-4 z-10 grid h-12 w-12 place-items-center rounded-lg border border-white/25 text-white transition-colors duration-200 hover:border-sun hover:bg-sun hover:text-ink"
        onClick={onClose}
        aria-label="Închide galeria"
      >
        <X size={20} />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-lg border border-white/25 text-white transition-colors duration-200 hover:border-sun hover:bg-sun hover:text-ink md:left-8"
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
            className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-lg border border-white/25 text-white transition-colors duration-200 hover:border-sun hover:bg-sun hover:text-ink md:right-8"
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

      <motion.img
        key={photos[index].src}
        src={photos[index].src}
        alt={photos[index].alt}
        className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <p className="absolute bottom-4 rounded-md bg-white/10 px-3 py-1.5 text-[14px] font-bold text-white">
        {index + 1} / {photos.length}
      </p>
    </motion.div>
  );
}
