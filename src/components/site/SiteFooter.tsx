import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-canvas">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-10 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-canvas text-[10px] font-medium tracking-[0.2em] text-ink">
                PY
              </span>
              <span className="font-serif text-2xl tracking-tight">
                Parc Auto <span className="italic text-chrome">Yanis</span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Marketplace premium de mașini rulate, atent selectate din toată Europa.
              Verificate tehnic, cu istoric complet și opțiuni de finanțare personalizate.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">Navigare</h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li><Link to="/stoc" className="text-white/80 hover:text-white">Stoc mașini</Link></li>
              <li><Link to="/finantare" className="text-white/80 hover:text-white">Finanțare</Link></li>
              <li><Link to="/despre" className="text-white/80 hover:text-white">Despre noi</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">Servicii</h4>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>Verificare istoric</li>
              <li>Kilometraj garantat</li>
              <li>Consultanță achiziție</li>
              <li>Buy-back</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">Contact</h4>
            <ul className="mt-6 space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-chrome" />
                +40 743 000 000
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-chrome" />
                Str. Isaccei 12, Tulcea
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Parc Auto Yanis. Toate drepturile rezervate.</p>
          <p className="tracking-[0.15em] uppercase">Handcrafted in Tulcea</p>
        </div>
      </div>
    </footer>
  );
}