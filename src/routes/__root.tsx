import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "@fontsource-variable/inter/index.css";
// Instrument Serif is being phased out (docs/AUDIT.md B1); imports stay until
// the last page stops using .font-serif, then get removed with the dependency.
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Pagina nu există</h2>
        <p className="mt-3 text-base text-muted-foreground">
          Pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-medium text-white transition-colors hover:bg-brand-strong"
          >
            Înapoi la prima pagină
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
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-medium text-white transition-colors hover:bg-brand-strong"
          >
            Încearcă din nou
          </button>
          <a
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-input bg-background px-7 text-base font-medium text-foreground transition-colors hover:bg-secondary"
          >
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
      { title: "Parc Auto Yanis — Mașini rulate verificate, în Tulcea" },
      { name: "description", content: "Mașini rulate verificate, cu istoric complet și kilometraj garantat. Finanțare cu aprobare rapidă. Parc Auto Yanis, Tulcea." },
      { name: "author", content: "Parc Auto Yanis" },
      { property: "og:title", content: "Parc Auto Yanis — Mașini rulate verificate, în Tulcea" },
      { property: "og:description", content: "Mașini rulate verificate, cu istoric complet și kilometraj garantat. Finanțare cu aprobare rapidă." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Parc Auto Yanis — Mașini rulate verificate, în Tulcea" },
      { name: "twitter:description", content: "Mașini rulate verificate, cu istoric complet și kilometraj garantat. Finanțare cu aprobare rapidă." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52074c0f-f97d-456d-9faa-d840eaa2e8e6/id-preview-1657ce94--028140b0-9592-4b91-870c-e3339a8cb49e.lovable.app-1782982483854.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52074c0f-f97d-456d-9faa-d840eaa2e8e6/id-preview-1657ce94--028140b0-9592-4b91-870c-e3339a8cb49e.lovable.app-1782982483854.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen bg-background text-foreground">
        <a
          href="#continut"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Sari la conținut
        </a>
        <SiteNav />
        <main id="continut">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
