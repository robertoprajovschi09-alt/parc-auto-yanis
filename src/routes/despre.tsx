import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import img from "@/assets/mercedes/470211463.jpg.asset.json";

export const Route = createFileRoute("/despre")({
  head: () => ({
    meta: [
      { title: "Despre noi — Parc Auto Yanis" },
      { name: "description", content: "Parc Auto Yanis — nouă ani de experiență în selecția mașinilor rulate premium." },
      { property: "og:title", content: "Despre noi — Parc Auto Yanis" },
      { property: "og:description", content: "Nouă ani de experiență în selecția mașinilor rulate premium." },
    ],
  }),
  component: Despre,
});

function Despre() {
  return (
    <div>
      <section className="mx-auto max-w-[1400px] px-6 pt-40 pb-24 md:px-10 md:pt-52 md:pb-32">
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.25em] uppercase text-graphite">Despre Yanis</p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              O relație cu <br />
              <span className="italic text-graphite">mașinile.</span> Nu cu vânzarea.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-ink-soft">
              <p>
                Am pornit acum aproape zece ani cu o obsesie simplă: să facem un loc în care
                un om intră cu neîncredere și pleacă cu o mașină în care are încredere totală.
              </p>
              <p>
                Fiecare mașină pe care o aducem trece prin mâinile aceleiași echipe, cu aceeași
                fișă de verificare. Nu grăbim procesul. Nu ne grăbim cu voi.
              </p>
              <p>
                Parc Auto Yanis nu e un dealership. E un studio de curatoriere a mașinilor rulate,
                construit pe transparență, răbdare și un standard estetic ridicat.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="overflow-hidden rounded-[2.5rem]">
            <img src={img.url} alt="Parc Auto Yanis" className="h-[60vh] w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-4">
          {[
            { to: 9, suffix: "", label: "Ani în piață" },
            { to: 100, suffix: "+", label: "Mașini vândute" },
            { to: 8, suffix: "", label: "Bănci partenere" },
            { to: 24, suffix: "h", label: "Răspuns garantat" },
          ].map((it) => (
            <Reveal key={it.label}>
              <div className="border-t border-ink/10 pt-6">
                <div className="font-serif text-5xl leading-none text-ink md:text-6xl">
                  <Counter to={it.to} />{it.suffix}
                </div>
                <div className="mt-4 text-xs tracking-[0.2em] uppercase text-graphite">{it.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-32 md:px-10">
        <Reveal>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.02em] text-ink">
            Cum lucrăm. <span className="italic text-graphite">Pas cu pas.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            ["01", "Sursăm", "Alegem mașini din piețe verificate — Germania, Belgia, Olanda, Italia."],
            ["02", "Verificăm", "Diagnostic complet, istoric, kilometraj, stare estetică."],
            ["03", "Pregătim", "Detailing profesional, service preventiv, actele complet pregătite."],
            ["04", "Livrăm", "Vizionare, test-drive, finanțare și înmatriculare. Fluid, complet."],
          ].map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="rounded-3xl border border-ink/8 bg-surface p-7">
                <span className="font-serif text-4xl text-chrome">{n}</span>
                <h3 className="mt-6 font-serif text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}