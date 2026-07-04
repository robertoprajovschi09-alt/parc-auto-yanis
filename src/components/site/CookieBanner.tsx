import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

/*
 * Cookie notice. The site uses only essential cookies (no analytics, no
 * tracking pixels), so this is informational + remembers the acknowledgement.
 * Visibility is decided on the client after mount, so SSR HTML and the first
 * client render match (no hydration mismatch). Entrance is a CSS animation
 * (tw-animate-css), which is SSR-safe and honours prefers-reduced-motion.
 */
const STORAGE_KEY = "tay-cookie-consent-v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage blocked (private mode) — show once, don't persist.
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Notificare cookie-uri"
      className="animate-in fade-in slide-in-from-bottom-4 fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[560px] duration-500 md:right-6 md:bottom-6 md:left-auto md:mx-0"
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink/95 p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md md:flex-row md:items-center md:gap-5 md:p-6">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sun/15 text-sun">
          <Cookie size={22} aria-hidden />
        </span>
        <p className="flex-1 text-[14px] leading-relaxed text-white/80">
          Folosim doar cookie-uri esențiale, necesare pentru funcționarea site-ului. Nu te urmărim
          și nu folosim cookie-uri de publicitate.
        </p>
        <button type="button" onClick={dismiss} className="btn-sun !min-h-12 !px-7 md:!min-h-11">
          Am înțeles
        </button>
      </div>
    </div>
  );
}
