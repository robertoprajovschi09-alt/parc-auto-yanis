import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, ChevronDown } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { vehicles } from "@/lib/vehicles";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TikTokIcon } from "@/components/site/TikTokIcon";

type ContactSearch = { masina?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): ContactSearch => ({
    masina:
      typeof s.masina === "string" && vehicles.some((v) => v.slug === s.masina)
        ? s.masina
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact — Târg Auto Yanis" },
      {
        name: "description",
        content:
          "Programează o vizionare sau trimite-ne un mesaj. Ne găsești în Tulcea, de luni până sâmbătă, 09:00–19:00.",
      },
      { property: "og:title", content: "Contact — Târg Auto Yanis" },
      { property: "og:description", content: "Programează o vizionare sau trimite-ne un mesaj." },
    ],
  }),
  component: Contact,
});

const GENERAL = "general";

type Errors = Partial<Record<"nume" | "telefon" | "mesaj", string>>;

function Contact() {
  const { masina } = Route.useSearch();
  const [nume, setNume] = useState("");
  const [telefon, setTelefon] = useState("");
  const [masinaSel, setMasinaSel] = useState(masina ?? GENERAL);
  const [mesaj, setMesaj] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sentVia, setSentVia] = useState<"whatsapp" | "email" | null>(null);

  const validate = (): boolean => {
    const next: Errors = {};
    if (nume.trim().length < 3) next.nume = "Te rugăm să-ți scrii numele.";
    if (!/^[+]?[\d\s.()-]{10,}$/.test(telefon.trim()))
      next.telefon = "Scrie un număr de telefon valid, de ex. 0743 123 456.";
    if (mesaj.trim().length < 5) next.mesaj = "Scrie-ne pe scurt cu ce te putem ajuta.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const composedMessage = () => {
    const car = vehicles.find((v) => v.slug === masinaSel);
    const carLine = car
      ? `Mașina care mă interesează: ${car.brand} ${car.model} (${car.year}).`
      : "";
    return [`Bună ziua! Sunt ${nume.trim()}.`, carLine, mesaj.trim(), `Telefon: ${telefon.trim()}`]
      .filter(Boolean)
      .join("\n");
  };

  const send = (via: "whatsapp" | "email") => {
    if (!validate()) return;
    const body = composedMessage();
    if (via === "whatsapp") {
      window.open(whatsappLink(body), "_blank", "noopener");
    } else {
      const subject = "Mesaj de pe site — Târg Auto Yanis";
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSentVia(via);
  };

  return (
    <div>
      {/* Dark page header */}
      <section className="bg-ink px-4 pt-32 pb-24 md:px-8 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[1320px]">
          <p className="flex items-center gap-2 text-[13px] font-extrabold tracking-[0.1em] text-sun uppercase">
            <span className="h-[3px] w-6 rounded-full bg-sun" aria-hidden />
            Suntem aici
          </p>
          <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-white md:text-[44px]">
            Contact
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Cel mai rapid ne prinzi la telefon. Dacă preferi să scrii, completează formularul și
            trimite-l pe WhatsApp sau pe email — răspundem în cel mult 24 de ore.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-14 grid max-w-[1320px] gap-6 px-4 pb-20 md:px-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <form
          noValidate
          className="rounded-2xl bg-surface p-6 shadow-float md:p-9"
          onSubmit={(e) => {
            e.preventDefault();
            send("whatsapp");
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="c-nume"
              label="Numele tău"
              required
              value={nume}
              onChange={setNume}
              placeholder="De ex. Ion Popescu"
              error={errors.nume}
              autoComplete="name"
            />
            <Field
              id="c-telefon"
              label="Telefon"
              required
              type="tel"
              value={telefon}
              onChange={setTelefon}
              placeholder="De ex. 0743 123 456"
              error={errors.telefon}
              autoComplete="tel"
            />

            <div className="sm:col-span-2">
              <label htmlFor="c-masina" className="mb-2 block text-base font-bold text-ink">
                Despre ce mașină e vorba?
              </label>
              <div className="relative">
                <select
                  id="c-masina"
                  value={masinaSel}
                  onChange={(e) => setMasinaSel(e.target.value)}
                  className="h-14 w-full appearance-none rounded-lg border border-input bg-surface pr-11 pl-4 text-base font-semibold text-ink"
                >
                  <option value={GENERAL}>Întrebare generală / altă mașină</option>
                  {vehicles.map((v) => (
                    <option key={v.slug} value={v.slug}>
                      {v.brand} {v.model} ({v.year})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-graphite"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="c-mesaj" className="mb-2 block text-base font-bold text-ink">
                Mesajul tău{" "}
                <span className="text-destructive" aria-hidden>
                  *
                </span>
              </label>
              <textarea
                id="c-mesaj"
                rows={5}
                required
                value={mesaj}
                onChange={(e) => setMesaj(e.target.value)}
                placeholder="De ex. Aș vrea să văd mașina sâmbătă dimineață."
                aria-invalid={Boolean(errors.mesaj)}
                aria-describedby={errors.mesaj ? "c-mesaj-err" : undefined}
                className={`w-full resize-none rounded-lg border bg-surface px-4 py-3.5 text-base text-ink placeholder:text-graphite/60 ${
                  errors.mesaj ? "border-destructive" : "border-input"
                }`}
              />
              {errors.mesaj && (
                <p id="c-mesaj-err" className="mt-1.5 text-[14px] font-semibold text-destructive">
                  {errors.mesaj}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary !min-h-14 !text-[17px]">
              <MessageCircle size={18} aria-hidden />
              Trimite pe WhatsApp
            </button>
            <button
              type="button"
              onClick={() => send("email")}
              className="btn-ghost !min-h-14 !text-[17px]"
            >
              <Mail size={18} aria-hidden />
              Trimite pe email
            </button>
          </div>

          {sentVia && (
            <div
              role="status"
              className="mt-6 rounded-lg border-l-4 border-sun bg-sun-soft p-5 text-[15px] leading-relaxed text-ink"
            >
              <strong>Mesajul tău este pregătit.</strong>{" "}
              {sentVia === "whatsapp"
                ? "S-a deschis WhatsApp cu mesajul completat — mai trebuie doar să apeși „Trimite” acolo."
                : "S-a deschis aplicația de email cu mesajul completat — mai trebuie doar să apeși „Trimite” acolo."}{" "}
              Dacă nu s-a deschis nimic, sună-ne direct la{" "}
              <a
                href={site.phoneHref}
                className="font-bold text-brand underline underline-offset-4"
              >
                {site.phone}
              </a>
              .
            </div>
          )}
        </form>

        {/* Contact info */}
        <div className="space-y-4">
          <RevealGroup className="space-y-4">
            <RevealItem>
              <InfoCard icon={Phone} title="Telefon" hint={site.schedule}>
                <a
                  href={site.phoneHref}
                  className="font-extrabold text-ink underline-offset-4 hover:text-brand hover:underline"
                >
                  {site.phone}
                </a>
              </InfoCard>
            </RevealItem>
            <RevealItem>
              <InfoCard icon={Mail} title="Email" hint="Răspundem în cel mult 24h">
                <a
                  href={`mailto:${site.email}`}
                  className="font-extrabold text-ink underline-offset-4 hover:text-brand hover:underline"
                >
                  {site.email}
                </a>
              </InfoCard>
            </RevealItem>
            <RevealItem>
              <InfoCard icon={MapPin} title="Adresă" hint="Parcare proprie pentru clienți">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-extrabold text-ink underline-offset-4 hover:text-brand hover:underline"
                >
                  {site.address}
                </a>
              </InfoCard>
            </RevealItem>
            <RevealItem>
              <InfoCard icon={Clock} title="Program" hint="Duminică: închis">
                <span className="font-extrabold text-ink">{site.schedule}</span>
              </InfoCard>
            </RevealItem>
          </RevealGroup>

          <div className="flex gap-3 pt-2">
            <a
              href={site.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok Târg Auto Yanis"
              className="grid h-12 w-12 place-items-center rounded-lg border border-ink/15 bg-surface text-ink transition-all duration-200 hover:border-sun hover:bg-sun"
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Târg Auto Yanis"
              className="grid h-12 w-12 place-items-center rounded-lg border border-ink/15 bg-surface text-ink transition-all duration-200 hover:border-sun hover:bg-sun"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-bold text-ink">
        {label}{" "}
        {required && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`h-14 w-full rounded-lg border bg-surface px-4 text-base text-ink placeholder:text-graphite/60 ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[14px] font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: typeof Phone;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg bg-surface p-5 shadow-card">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-ink text-sun">
        <Icon size={20} strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-graphite">{title}</p>
        <p className="mt-0.5 text-[16px]">{children}</p>
        <p className="mt-0.5 text-[14px] text-graphite">{hint}</p>
      </div>
    </div>
  );
}
