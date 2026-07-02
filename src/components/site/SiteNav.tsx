import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { to: "/", label: "Acasă" },
  { to: "/stoc", label: "Mașini în stoc" },
  { to: "/finantare", label: "Finanțare" },
  { to: "/despre", label: "Despre noi" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/8 bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 md:h-[72px] md:px-8">
        <Link
          to="/"
          className="flex min-h-11 items-center gap-2.5"
          aria-label="Parc Auto Yanis — prima pagină"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-[10px] font-semibold tracking-[0.15em] text-white">
            PY
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-ink">Parc Auto Yanis</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Meniu principal">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-full px-4 text-[15px] transition-colors duration-150 ${
                  active
                    ? "bg-ink/5 font-semibold text-ink"
                    : "font-medium text-graphite hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden min-h-12 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-brand-strong sm:inline-flex"
          >
            <Phone size={16} aria-hidden />
            {site.phone}
          </a>

          <button
            type="button"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            aria-controls="meniu-mobil"
            className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-surface text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="meniu-mobil" className="border-t border-ink/8 bg-surface lg:hidden">
          <nav className="mx-auto flex max-w-[1320px] flex-col px-4 py-3" aria-label="Meniu mobil">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-13 items-center rounded-xl px-4 text-[17px] ${
                    active
                      ? "bg-ink/5 font-semibold text-ink"
                      : "font-medium text-ink hover:bg-ink/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={site.phoneHref}
              className="mt-3 mb-2 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[17px] font-semibold text-white"
            >
              <Phone size={18} aria-hidden />
              Sună-ne: {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
