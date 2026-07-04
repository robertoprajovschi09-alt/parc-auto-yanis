import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

import { vehicles } from "@/lib/vehicles";
import { site, whatsappLink } from "@/lib/site";
import { VehicleCard } from "@/components/site/VehicleCard";
import { Hero } from "@/components/home/Hero";
import { BombaZilei } from "@/components/home/BombaZilei";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <BombaZilei />
      <Inventory />
      <ContactBand />
    </>
  );
}

/* ---------------- INVENTORY ---------------- */
function Inventory() {
  return (
    <section className="px-4 pt-16 pb-4 md:px-8 md:pt-20" aria-labelledby="stoc-titlu">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="stoc-titlu"
            className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
          >
            Mașini disponibile
          </h2>
          <Link
            to="/stoc"
            className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-bold text-brand underline-offset-4 hover:underline"
          >
            Vezi toate cele {vehicles.length}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <RevealItem key={v.slug} className="h-full">
              <VehicleCard v={v} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function ContactBand() {
  return (
    <section className="px-4 pt-16 md:px-8 md:pt-20" aria-labelledby="contact-titlu">
      <Reveal className="mx-auto max-w-[1320px]">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-ink px-6 py-14 text-center md:py-16">
          <h2
            id="contact-titlu"
            className="max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-4xl"
          >
            Ai găsit o mașină? Sună-ne.
          </h2>
          <p className="max-w-md text-base text-white/70">
            Te așteptăm la sediul din {site.city}, {site.schedule.toLowerCase()}.
          </p>
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a href={site.phoneHref} className="btn-sun !min-h-14 !text-[17px]">
              <Phone size={18} aria-hidden />
              {site.phone}
            </a>
            <a
              href={whatsappLink("Bună ziua! Vă contactez de pe site în legătură cu o mașină.")}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-dark !min-h-14 !text-[17px]"
            >
              <MessageCircle size={18} aria-hidden />
              WhatsApp
            </a>
            <Link to="/contact" className="btn-ghost-dark !min-h-14 !text-[17px]">
              Trimite un mesaj
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
