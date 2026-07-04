import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { Phone, ArrowRight } from "lucide-react";

import { vehicles, bombaZileiSlug, formatKm, formatPrice } from "@/lib/vehicles";
import { site } from "@/lib/site";
import { EASE } from "@/components/motion/Reveal";

/*
 * „Bomba Zilei” — the signature spotlight of the homepage: one car,
 * priced under the market, on a dark premium card. Black/graphite/glass
 * only; the single accent is the warm glow around the badge.
 * All decorative animations live in CSS (styles.css: bomba-*) so they
 * respect prefers-reduced-motion via the global override.
 */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const price: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};
const imageSlide: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export function BombaZilei() {
  const v = vehicles.find((x) => x.slug === bombaZileiSlug);
  // No car or no real price — no bomba. Never invent a deal.
  if (!v || v.price == null) return null;

  const title = `${v.brand} ${v.model}`;
  const specs = [
    v.year,
    v.mileage != null && formatKm(v.mileage),
    v.fuel,
    v.transmission,
    [v.engine, v.power].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(" · ");
  const thumbs = (v.photos ?? []).slice(1, 4);

  return (
    <section className="px-4 pt-16 md:px-8 md:pt-20" aria-labelledby="bomba-titlu">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -120px 0px" }}
        variants={container}
        className="mx-auto max-w-[1320px]"
      >
        <motion.article
          variants={item}
          className="group/bomba relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-[oklch(0.22_0.004_286)] to-ink shadow-lift transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.55)]"
        >
          {/* Chrome hairline on the top edge */}
          <div
            aria-hidden
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          {/* Soft radial glow behind the image side */}
          <div
            aria-hidden
            className="absolute top-1/2 left-[12%] -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-sun/8 blur-3xl"
          />
          {/* Light sweep, every ~9.5s */}
          <div
            aria-hidden
            className="bomba-sweep pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-14">
            {/* Gallery */}
            <motion.div variants={imageSlide} className="flex flex-col gap-3">
              <Link
                to="/vehicul/$slug"
                params={{ slug: v.slug }}
                aria-label={`${title} — vezi mașina`}
                className="bomba-float block"
              >
                <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <img
                    src={v.photos?.[0]?.src ?? v.image}
                    alt={`${title}${v.year ? `, ${v.year}` : ""}`}
                    width={1400}
                    height={1050}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover/bomba:scale-[1.03]"
                  />
                </div>
              </Link>
              {thumbs.length === 3 && (
                <div className="hidden grid-cols-3 gap-3 sm:grid">
                  {thumbs.map((p) => (
                    <Link
                      key={p.src}
                      to="/vehicul/$slug"
                      params={{ slug: v.slug }}
                      tabIndex={-1}
                      aria-hidden
                      className="overflow-hidden rounded-xl ring-1 ring-white/10 transition-opacity duration-300 hover:opacity-80"
                    >
                      <img
                        src={p.src}
                        alt=""
                        loading="lazy"
                        width={460}
                        height={345}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <motion.p variants={item}>
                <span className="bomba-badge inline-flex items-center gap-2 rounded-full border border-sun/40 bg-white/8 px-5 py-2.5 text-[14px] font-black tracking-[0.14em] text-sun uppercase backdrop-blur-md">
                  <span aria-hidden>💣</span> Bomba Zilei
                </span>
              </motion.p>

              <motion.h2
                id="bomba-titlu"
                variants={item}
                className="mt-6 text-3xl font-black tracking-tight text-white md:text-[40px] md:leading-[1.1]"
              >
                {title}
              </motion.h2>
              {specs && (
                <motion.p variants={item} className="mt-2.5 text-[15px] font-medium text-white/60">
                  {specs}
                </motion.p>
              )}

              <motion.div variants={price} className="mt-8">
                <p className="text-[56px] leading-none font-black tracking-tight text-white md:text-[68px]">
                  {formatPrice(v.price)}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-bold tracking-wide text-white/85 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-sun" aria-hidden />
                  Sub prețul pieței
                </p>
              </motion.div>

              <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/vehicul/$slug"
                  params={{ slug: v.slug }}
                  className="btn-sun !min-h-14 !px-9 !text-[17px] transition-shadow group-hover/bomba:shadow-[0_10px_30px_-8px_oklch(0.852_0.173_86.9_/_0.55)]"
                >
                  Vezi mașina
                  <ArrowRight size={18} aria-hidden />
                </Link>
                <a href={site.phoneHref} className="btn-ghost-dark !min-h-14 !px-9 !text-[17px]">
                  <Phone size={18} aria-hidden />
                  Sună acum
                </a>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
}
