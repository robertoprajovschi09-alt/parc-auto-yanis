import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ShieldCheck,
  Gauge,
  Wallet,
  Sparkles,
  Compass,
  ArrowUpRight,
  Star,
  Quote,
  Instagram,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import finantareImg from "@/assets/finantare.jpg";
import { vehicles, featuredSlugs } from "@/lib/vehicles";
import { mercedesPhotos } from "@/lib/mercedes";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { VehicleCard } from "@/components/site/VehicleCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <WhyUs />
      <MarketplacePreview />
      <Testimonials />
      <Stats />
      <Financing />
      <InstagramGallery />
      <ContactCTA />
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-ink text-canvas">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
        <div
          className="absolute inset-0 opacity-60 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(120% 60% at 20% 10%, rgba(200,200,220,0.35), transparent 60%), radial-gradient(80% 60% at 90% 90%, rgba(255,180,120,0.25), transparent 60%)",
            backgroundSize: "200% 200%",
            animation: "gradient-drift 18s ease-in-out infinite",
          }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col justify-between px-6 pt-32 pb-16 md:px-10 md:pt-40 md:pb-20">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="glass-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-white/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Ediția {new Date().getFullYear()} · Selecție Yanis
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(3rem,9vw,9.5rem)] leading-[0.95] tracking-[-0.03em]"
          >
            Mașini atent <br />
            <span className="italic text-white/70">selectate.</span>{" "}
            <span className="whitespace-nowrap">Fără compromisuri.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            Fiecare mașină din parcul nostru trece printr-un proces de verificare tehnică,
            istoric și estetică. Descoperă un stoc restrâns, dar impecabil.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/stoc"
              className="group inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Vezi stocul
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/finantare"
              className="glass-dark inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm text-white/90 transition-colors hover:bg-white/10"
            >
              Simulează finanțare
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-6 border-t border-white/10 pt-8 text-white/80 md:grid-cols-4 md:gap-10"
        >
          {[
            ["09", "ani experiență"],
            ["100+", "mașini vândute"],
            ["98%", "clienți mulțumiți"],
            ["24h", "răspuns garantat"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="font-serif text-3xl text-white md:text-4xl">{k}</div>
              <div className="mt-1 text-xs tracking-[0.15em] uppercase text-white/50">{v}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- FEATURED ---------------- */
function Featured() {
  const items = featuredSlugs
    .map((s) => vehicles.find((v) => v.slug === s))
    .filter(Boolean) as typeof vehicles;

  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Selecția săptămânii</p>
            <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-ink">
              Mașini care <span className="italic text-graphite">merită</span> o privire mai atentă.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/stoc"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              Vezi tot stocul
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v, i) => (
            <VehicleCard key={v.slug} v={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  const items = [
    { icon: ShieldCheck, title: "Verificare istoric", body: "Rapoarte complete de proveniență, accidente și evenimente pentru fiecare mașină." },
    { icon: Gauge, title: "Kilometraj garantat", body: "Validăm kilometrajul real prin rapoarte multiple și diagnostic la fața locului." },
    { icon: Wallet, title: "Finanțare adaptată", body: "Colaborăm cu bănci și IFN-uri pentru rate personalizate, cu răspuns rapid." },
    { icon: Compass, title: "Consultanță completă", body: "Te ghidăm de la prima vizionare până la înmatriculare și primii kilometri." },
    { icon: Sparkles, title: "Selecție riguroasă", body: "Peste 70% dintre mașinile evaluate nu ajung în stocul nostru." },
  ];

  return (
    <section className="relative overflow-hidden bg-ink text-canvas">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 20%, rgba(255,255,255,0.15), transparent 60%), radial-gradient(50% 40% at 90% 80%, rgba(255,180,120,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr] md:gap-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40">De ce Yanis</p>
            <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em]">
              Un standard construit în <span className="italic text-chrome">nouă ani</span>.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/60">
              Nu vindem orice. Fiecare mașină e aleasă cu aceeași grijă cu care ne-am alege
              propria mașină de zi cu zi.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {items.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:bg-white/[0.06]">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-chrome transition-transform group-hover:-translate-y-0.5">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="mt-10">
                    <h3 className="font-serif text-2xl leading-tight">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARKETPLACE PREVIEW ---------------- */
function MarketplacePreview() {
  const items = vehicles.slice(0, 6);
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Marketplace</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-ink">
                Un stoc gândit ca o <br className="hidden md:block" />
                <span className="italic text-graphite">colecție privată.</span>
              </h2>
            </div>
            <Link
              to="/stoc"
              className="text-sm text-graphite underline underline-offset-[6px] transition-colors hover:text-ink"
            >
              Vezi toate cele {vehicles.length} mașini
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((v, i) => (
            <VehicleCard key={v.slug} v={v} index={i} />
          ))}
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
      role: "Antreprenor · București",
      initials: "AP",
      quote: "Am cumpărat un BMW 320d de la Yanis. Transparența, răbdarea și atenția la detalii mi-au depășit așteptările. Recomand cu încredere.",
    },
    {
      name: "Ioana Marin",
      role: "Arhitect · Cluj-Napoca",
      initials: "IM",
      quote: "Rar întâlnești un dealer care îți spune și minusurile mașinii, nu doar plusurile. Exact ce mi-am dorit înainte să semnez.",
    },
    {
      name: "Mihai Dobre",
      role: "Doctor · Timișoara",
      initials: "MD",
      quote: "Am făcut drumul până la Tulcea și a meritat fiecare kilometru. Mașina exact ca în anunț, proces fluid, finanțare aprobată în 48h.",
    },
  ];

  return (
    <section className="bg-secondary/50 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Testimoniale</p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-ink">
              Ce spun oamenii care au <span className="italic text-graphite">condus deja</span>.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="group flex h-full flex-col rounded-3xl bg-surface p-8 transition-transform hover:-translate-y-1">
                <Quote size={22} className="text-chrome" strokeWidth={1.5} />
                <blockquote className="mt-6 font-serif text-xl leading-snug text-ink">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-ink/5 pt-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-xs font-medium tracking-widest text-canvas">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-ink">{t.name}</div>
                    <div className="text-xs text-graphite">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-ink">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const items = [
    { to: 100, suffix: "+", label: "Mașini vândute" },
    { to: 98, suffix: "%", label: "Clienți mulțumiți" },
    { to: 9, suffix: " ani", label: "Experiență" },
  ];
  return (
    <section className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-ink p-10 text-canvas md:p-16">
        <div className="grid gap-10 md:grid-cols-4">
          {items.map((it) => (
            <Reveal key={it.label}>
              <div>
                <div className="font-serif text-5xl leading-none tracking-tight md:text-6xl">
                  <Counter to={it.to} />{it.suffix}
                </div>
                <div className="mt-4 text-xs tracking-[0.2em] uppercase text-white/50">{it.label}</div>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div>
              <div className="font-serif text-5xl leading-none tracking-tight md:text-6xl">
                4,9<span className="text-chrome">/5</span>
              </div>
              <div className="mt-4 text-xs tracking-[0.2em] uppercase text-white/50">Rating mediu</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINANCING ---------------- */
function Financing() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={finantareImg}
              alt="Predare cheie mașină"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="glass absolute right-6 bottom-6 rounded-2xl px-5 py-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-graphite">Rată de la</p>
              <p className="font-serif text-2xl text-ink">189 € / lună</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Finanțare</p>
          <h2 className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-[-0.02em] text-ink">
            Rate care se <span className="italic text-graphite">așează liniștit</span> în bugetul tău.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-graphite">
            Colaborăm cu peste 8 bănci și IFN-uri. Îți construim oferta cea mai potrivită
            — cu avans redus, fără comision, cu răspuns în 48 de ore.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-ink">
            {["Avans de la 15%", "Perioadă până la 84 de luni", "Aprobare în 48h", "Fără comision de analiză"].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span className="h-px w-6 bg-ink" />
                {x}
              </li>
            ))}
          </ul>

          <Link
            to="/finantare"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-canvas transition-transform hover:-translate-y-0.5"
          >
            Simulează rata
            <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- INSTAGRAM ---------------- */
function InstagramGallery() {
  const layout = [
    { src: mercedesPhotos[0].src, span: "row-span-2" },
    { src: mercedesPhotos[1].src, span: "" },
    { src: mercedesPhotos[4].src, span: "" },
    { src: mercedesPhotos[3].src, span: "row-span-2" },
    { src: mercedesPhotos[2].src, span: "" },
    { src: mercedesPhotos[5].src, span: "" },
  ];

  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">@parcautoyanis</p>
              <h2 className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,4rem)] leading-[1] tracking-[-0.02em] text-ink">
                Din <span className="italic text-graphite">culise.</span>
              </h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm text-graphite hover:text-ink">
              <Instagram size={16} /> Urmărește-ne pe Instagram
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {layout.map((it, i) => (
            <Reveal key={i} delay={i * 0.05} className={`${it.span} overflow-hidden rounded-2xl bg-muted`}>
              <img
                src={it.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT CTA ---------------- */
function ContactCTA() {
  return (
    <section className="px-6 pb-24 md:px-10">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-ink p-10 text-canvas md:p-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 20%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(255,180,120,0.15), transparent 60%)",
          }}
        />
        <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40">Vino la o vizionare</p>
            <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em]">
              Programează o <span className="italic text-chrome">vizionare</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              Te așteptăm în Tulcea, de luni până sâmbătă. Cafea bună, întrebări bine primite.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-canvas px-7 py-4 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Programează acum <ArrowUpRight size={15} />
            </Link>
            <a href="tel:+40743000000" className="text-sm text-white/60 hover:text-white">
              sau sună: +40 743 000 000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}