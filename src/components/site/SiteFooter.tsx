import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin, Mail, Clock, ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "@/components/site/SiteNav";

const nav = [
  { to: "/stoc", label: "Mașini" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white">
      {/* Brand stripe */}
      <div className="h-1 bg-sun" aria-hidden />

      <div className="mx-auto max-w-[1320px] px-4 pt-16 pb-8 md:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr]">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">
              Mașini rulate în {site.city}. Vino la o vizionare sau sună-ne.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Târg Auto Yanis"
                className="grid h-12 w-12 place-items-center rounded-lg border border-white/15 transition-all duration-200 hover:border-sun hover:bg-sun hover:text-ink"
              >
                <Instagram size={18} />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Târg Auto Yanis"
                className="grid h-12 w-12 place-items-center rounded-lg border border-white/15 transition-all duration-200 hover:border-sun hover:bg-sun hover:text-ink"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Meniu subsol">
            <h2 className="text-[13px] font-bold tracking-[0.14em] text-white/50 uppercase">
              Navigare
            </h2>
            <ul className="mt-5 space-y-1 text-[15px]">
              {nav.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex min-h-10 items-center gap-1.5 font-semibold text-white/80 transition-colors duration-200 hover:text-sun"
                  >
                    <ChevronRight
                      size={14}
                      aria-hidden
                      className="text-sun transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-bold tracking-[0.14em] text-white/50 uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-[15px] text-white/80">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center gap-3 text-lg font-extrabold text-sun transition-colors duration-200 hover:text-sun-strong"
                >
                  <Phone size={18} className="shrink-0" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-10 items-center gap-3 font-medium transition-colors duration-200 hover:text-sun"
                >
                  <Mail size={16} className="shrink-0 text-sun" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-start gap-3 py-2 font-medium transition-colors duration-200 hover:text-sun"
                >
                  <MapPin size={16} className="mt-1 shrink-0 text-sun" aria-hidden />
                  {site.address}
                </a>
              </li>
              <li className="flex items-start gap-3 py-2 font-medium">
                <Clock size={16} className="mt-1 shrink-0 text-sun" aria-hidden />
                {site.schedule}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/55">
          <p>© {new Date().getFullYear()} Târg Auto Yanis. Toate drepturile rezervate.</p>
          <p>
            {site.city} ·{" "}
            <Link to="/stoc" className="underline-offset-4 hover:text-sun hover:underline">
              Vezi stocul
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
