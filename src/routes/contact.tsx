import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Parc Auto Yanis" },
      { name: "description", content: "Programează o vizionare sau trimite-ne un mesaj. Suntem în Tulcea, de luni până sâmbătă." },
      { property: "og:title", content: "Contact — Parc Auto Yanis" },
      { property: "og:description", content: "Programează o vizionare sau trimite-ne un mesaj." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="pt-32 md:pt-40">
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-24">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Contact</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.75rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em] text-ink">
            Hai să stăm de <span className="italic text-graphite">vorbă</span>.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 pb-32 md:grid-cols-[1.3fr_1fr] md:px-10">
        <Reveal>
          <form className="rounded-[2rem] border border-ink/8 bg-surface p-8 md:p-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nume" placeholder="Andrei Popescu" />
              <Field label="Telefon" placeholder="+40 —" />
              <Field label="Email" placeholder="andrei@email.com" className="sm:col-span-2" />
              <Field label="Mașina interesată" placeholder="Mercedes CLA 180 (2016)" className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="text-[11px] tracking-[0.2em] uppercase text-graphite">Mesaj</label>
                <textarea
                  rows={5}
                  placeholder="Aș vrea să programez o vizionare sâmbătă…"
                  className="mt-3 w-full resize-none rounded-2xl border border-ink/10 bg-canvas px-4 py-3 text-base text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none"
                />
              </div>
            </div>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5">
              Trimite mesajul <ArrowUpRight size={15} />
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-3">
            <InfoCard icon={Phone} title="Telefon" value="+40 743 000 000" hint="Luni–Sâmbătă, 09:00–19:00" />
            <InfoCard icon={Mail} title="Email" value="salut@parcautoyanis.ro" hint="Răspunsuri în 24h" />
            <InfoCard icon={MapPin} title="Adresă" value="Str. Isaccei 12, Tulcea" hint="Parcare proprie" />
            <InfoCard icon={Clock} title="Program" value="Luni–Sâmbătă" hint="09:00 – 19:00 · Duminică închis" />

            <div className="flex gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-surface text-ink hover:bg-ink hover:text-canvas transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-surface text-ink hover:bg-ink hover:text-canvas transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Field({ label, placeholder, className = "" }: { label: string; placeholder: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-[11px] tracking-[0.2em] uppercase text-graphite">{label}</label>
      <input
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-ink/10 bg-canvas px-4 py-3 text-base text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
  hint,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-surface p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-canvas">
        <Icon size={16} strokeWidth={1.5} />
      </span>
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-graphite">{title}</p>
        <p className="mt-1 font-serif text-lg text-ink">{value}</p>
        <p className="mt-0.5 text-xs text-graphite">{hint}</p>
      </div>
    </div>
  );
}