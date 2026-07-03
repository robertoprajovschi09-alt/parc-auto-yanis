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

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-ink ${
          dark ? "border border-white/20" : ""
        }`}
      >
        <span className="text-lg font-black text-sun">Y</span>
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-brand" aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[13px] font-bold tracking-[0.14em] uppercase ${dark ? "text-white/70" : "text-graphite"}`}
        >
          Parc Auto
        </span>
        <span className={`mt-0.5 text-[20px] font-extrabold ${dark ? "text-white" : "text-ink"}`}>
          Yanis
        </span>
      </span>
    </span>
  );
}

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Elevation once the page scrolls under the bar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-surface/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-transparent shadow-[0_2px_20px_rgba(19,19,19,0.08)]" : "border-ink/8"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-4 md:h-[76px] md:px-8">
        <Link
          to="/"
          className="flex min-h-11 items-center"
          aria-label="Parc Auto Yanis — prima pagină"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Meniu principal">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-11 items-center rounded-lg px-4 text-[15px] transition-colors duration-200 ${
                  active
                    ? "bg-sun-soft font-extrabold text-ink"
                    : "font-semibold text-ink-soft hover:bg-sun-soft hover:text-ink"
                }`}
              >
                {l.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 bottom-1 h-[3px] rounded-full bg-sun"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="btn-primary hidden !min-h-12 !px-5 !text-[15px] xl:inline-flex"
          >
            <Phone size={16} aria-hidden />
            {site.phone}
          </a>
          <a
            href={site.phoneHref}
            aria-label={`Sună la ${site.phone}`}
            className="grid h-12 w-12 place-items-center rounded-lg bg-brand text-white transition-colors duration-200 hover:bg-brand-strong xl:hidden"
          >
            <Phone size={19} aria-hidden />
          </a>

          <button
            type="button"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            aria-controls="meniu-mobil"
            className="grid h-12 w-12 place-items-center rounded-lg border border-ink/10 bg-surface text-ink transition-colors duration-200 hover:bg-ink/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="meniu-mobil"
          className="animate-in fade-in slide-in-from-top-2 border-t border-ink/8 bg-surface duration-200 lg:hidden"
        >
          <nav className="mx-auto flex max-w-[1320px] flex-col px-4 py-3" aria-label="Meniu mobil">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-13 items-center justify-between rounded-lg px-4 text-[17px] ${
                    active
                      ? "bg-sun-soft font-extrabold text-ink"
                      : "font-semibold text-ink hover:bg-sun-soft"
                  }`}
                >
                  {l.label}
                  {active && <span aria-hidden className="h-2 w-2 rounded-full bg-sun" />}
                </Link>
              );
            })}
            <a href={site.phoneHref} className="btn-primary mt-3 mb-2 w-full !text-[17px]">
              <Phone size={18} aria-hidden />
              Sună-ne: {site.phone}
            </a>
            <p className="pb-2 text-center text-[13px] text-graphite">{site.schedule}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
