import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, ChevronDown } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { vehicles } from "@/lib/vehicles";

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
      { title: "Contact — Parc Auto Yanis" },
      { name: "description", content: "Programează o vizionare sau trimite-ne un mesaj. Ne găsești în Tulcea, de luni până sâmbătă, 09:00–19:00." },
      { property: "og:title", content: "Contact — Parc Auto Yanis" },
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
    const carLine = car ? `Mașina care mă interesează: ${car.brand} ${car.model} (${car.year}).` : "";
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
      const subject = "Mesaj de pe site — Parc Auto Yanis";
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setSentVia(via);
  };

  return (
    <div className="pt-28 md:pt-36">
      <section className="mx-auto max-w-[1320px] px-4 pb-10 md:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">Contact</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-graphite md:text-lg">
          Cel mai rapid ne prinzi la telefon. Dacă preferi să scrii, completează
          formularul și trimite-l pe WhatsApp sau pe email — răspundem în cel
          mult 24 de ore.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-6 px-4 pb-20 lg:grid-cols-[1.4fr_1fr] md:px-8">
        {/* Form */}
        <form
          noValidate
          className="rounded-2xl border border-ink/10 bg-surface p-6 md:p-9"
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
              <label htmlFor="c-masina" className="mb-2 block text-base font-medium text-ink">
                Despre ce mașină e vorba?
              </label>
              <div className="relative">
                <select
                  id="c-masina"
                  value={masinaSel}
                  onChange={(e) => setMasinaSel(e.target.value)}
                  className="h-14 w-full appearance-none rounded-xl border border-input bg-surface pr-11 pl-4 text-base text-ink"
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
              <label htmlFor="c-mesaj" className="mb-2 block text-base font-medium text-ink">
                Mesajul tău <span className="text-destructive" aria-hidden>*</span>
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
                className={`w-full resize-none rounded-xl border bg-surface px-4 py-3.5 text-base text-ink placeholder:text-graphite/60 ${
                  errors.mesaj ? "border-destructive" : "border-input"
                }`}
              />
              {errors.mesaj && (
                <p id="c-mesaj-err" className="mt-1.5 text-[14px] font-medium text-destructive">
                  {errors.mesaj}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 text-[17px] font-semibold text-white transition-colors duration-150 hover:bg-brand-strong"
            >
              <MessageCircle size={18} aria-hidden />
              Trimite pe WhatsApp
            </button>
            <button
              type="button"
              onClick={() => send("email")}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-ink/15 bg-surface px-8 text-[17px] font-semibold text-ink transition-colors duration-150 hover:bg-ink/5"
            >
              <Mail size={18} aria-hidden />
              Trimite pe email
            </button>
          </div>

          {sentVia && (
            <div role="status" className="mt-6 rounded-xl bg-brand-soft p-5 text-[15px] leading-relaxed text-ink">
              <strong>Mesajul tău este pregătit.</strong>{" "}
              {sentVia === "whatsapp"
                ? "S-a deschis WhatsApp cu mesajul completat — mai trebuie doar să apeși „Trimite” acolo."
                : "S-a deschis aplicația de email cu mesajul completat — mai trebuie doar să apeși „Trimite” acolo."}{" "}
              Dacă nu s-a deschis nimic, sună-ne direct la{" "}
              <a href={site.phoneHref} className="font-semibold text-brand underline underline-offset-4">
                {site.phone}
              </a>
              .
            </div>
          )}
        </form>

        {/* Contact info */}
        <div className="space-y-3">
          <InfoCard icon={Phone} title="Telefon" hint={site.schedule}>
            <a href={site.phoneHref} className="font-semibold text-ink underline-offset-4 hover:underline">
              {site.phone}
            </a>
          </InfoCard>
          <InfoCard icon={Mail} title="Email" hint="Răspundem în cel mult 24h">
            <a href={`mailto:${site.email}`} className="font-semibold text-ink underline-offset-4 hover:underline">
              {site.email}
            </a>
          </InfoCard>
          <InfoCard icon={MapPin} title="Adresă" hint="Parcare proprie pentru clienți">
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="font-semibold text-ink underline-offset-4 hover:underline">
              {site.address}
            </a>
          </InfoCard>
          <InfoCard icon={Clock} title="Program" hint="Duminică: închis">
            <span className="font-semibold text-ink">{site.schedule}</span>
          </InfoCard>

          <div className="flex gap-3 pt-2">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Parc Auto Yanis"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-surface text-ink transition-colors duration-150 hover:bg-ink/5"
            >
              <Instagram size={18} />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Parc Auto Yanis"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-surface text-ink transition-colors duration-150 hover:bg-ink/5"
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
      <label htmlFor={id} className="mb-2 block text-base font-medium text-ink">
        {label} {required && <span className="text-destructive" aria-hidden>*</span>}
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
        className={`h-14 w-full rounded-xl border bg-surface px-4 text-base text-ink placeholder:text-graphite/60 ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[14px] font-medium text-destructive">
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
    <div className="flex items-start gap-4 rounded-xl border border-ink/10 bg-surface p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
        <Icon size={20} strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] text-graphite">{title}</p>
        <p className="mt-0.5 text-[16px]">{children}</p>
        <p className="mt-0.5 text-[14px] text-graphite">{hint}</p>
      </div>
    </div>
  );
}
