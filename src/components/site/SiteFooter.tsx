import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin, Mail, Clock } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto max-w-[1320px] px-4 pt-16 pb-8 md:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[10px] font-semibold tracking-[0.15em] text-ink">
                PY
              </span>
              <span className="text-xl font-semibold tracking-tight">Parc Auto Yanis</span>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">
              Mașini rulate verificate tehnic, cu istoric complet și kilometraj garantat. Te ajutăm
              și cu finanțarea, de la primul telefon până la înmatriculare.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Parc Auto Yanis"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors duration-150 hover:bg-white/10"
              >
                <Instagram size={18} />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Parc Auto Yanis"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors duration-150 hover:bg-white/10"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Navigare
            </h2>
            <ul className="mt-5 space-y-1 text-[15px]">
              <li>
                <Link
                  to="/stoc"
                  className="inline-flex min-h-10 items-center text-white/85 hover:text-white hover:underline"
                >
                  Mașini în stoc
                </Link>
              </li>
              <li>
                <Link
                  to="/finantare"
                  className="inline-flex min-h-10 items-center text-white/85 hover:text-white hover:underline"
                >
                  Finanțare
                </Link>
              </li>
              <li>
                <Link
                  to="/despre"
                  className="inline-flex min-h-10 items-center text-white/85 hover:text-white hover:underline"
                >
                  Despre noi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex min-h-10 items-center text-white/85 hover:text-white hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">Contact</h2>
            <ul className="mt-5 space-y-3 text-[15px] text-white/85">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-10 items-center gap-3 hover:text-white hover:underline"
                >
                  <Phone size={16} className="shrink-0" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-10 items-center gap-3 hover:text-white hover:underline"
                >
                  <Mail size={16} className="shrink-0" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 py-2">
                <MapPin size={16} className="mt-1 shrink-0" aria-hidden />
                {site.address}
              </li>
              <li className="flex items-start gap-3 py-2">
                <Clock size={16} className="mt-1 shrink-0" aria-hidden />
                {site.schedule}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Parc Auto Yanis. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
