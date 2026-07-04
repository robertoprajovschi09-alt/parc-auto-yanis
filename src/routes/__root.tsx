import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { MotionConfig, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "@fontsource-variable/mulish/index.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-7xl font-black tracking-tight text-ink">
          4<span className="text-sun">0</span>4
        </p>
        <h1 className="mt-4 text-2xl font-extrabold text-foreground">Pagina nu există</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Înapoi la prima pagină
          </Link>
          <Link to="/stoc" className="btn-ghost">
            Vezi mașinile în stoc
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Pagina nu s-a încărcat
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          A apărut o problemă la noi. Poți reîncerca sau te poți întoarce la prima pagină.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Încearcă din nou
          </button>
          <a href="/" className="btn-ghost">
            Prima pagină
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Târg Auto Yanis — Mașini rulate verificate, în Tulcea" },
      {
        name: "description",
        content:
          "Mașini rulate verificate, cu istoric complet și kilometraj garantat. Finanțare cu aprobare rapidă. Târg Auto Yanis, Tulcea.",
      },
      { name: "author", content: "Târg Auto Yanis" },
      { property: "og:title", content: "Târg Auto Yanis — Mașini rulate verificate, în Tulcea" },
      {
        property: "og:description",
        content:
          "Mașini rulate verificate, cu istoric complet și kilometraj garantat. Finanțare cu aprobare rapidă.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Târg Auto Yanis — Mașini rulate verificate, în Tulcea" },
      {
        name: "twitter:description",
        content:
          "Mașini rulate verificate, cu istoric complet și kilometraj garantat. Finanțare cu aprobare rapidă.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52074c0f-f97d-456d-9faa-d840eaa2e8e6/id-preview-1657ce94--028140b0-9592-4b91-870c-e3339a8cb49e.lovable.app-1782982483854.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52074c0f-f97d-456d-9faa-d840eaa2e8e6/id-preview-1657ce94--028140b0-9592-4b91-870c-e3339a8cb49e.lovable.app-1782982483854.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Animate route changes only, never the first paint. `mounted` is false on
  // the server and on the initial client render (so SSR HTML and hydration
  // match — no flash, no mismatch); it flips to true after mount, enabling the
  // entrance animation for subsequent client-side navigations.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-background text-foreground">
          <a
            href="#continut"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
          >
            Sari la conținut
          </a>
          <SiteNav />
          <motion.main
            id="continut"
            key={pathname}
            initial={mounted ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Outlet />
          </motion.main>
          <SiteFooter />
        </div>
      </MotionConfig>
    </QueryClientProvider>
  );
}
