import { promos, type Promo } from "@/data/promos";
import { Mascot } from "./Mascot";
import { Reveal } from "./Reveal";

const tones: Record<Promo["tone"], string> = {
  cielo: "bg-cielo text-vino-deep",
  vino: "bg-vino text-crema",
  crema: "border-2 border-vino bg-crema-warm text-vino",
};

export function Promos() {
  return (
    <section id="avisos" className="scroll-mt-24 border-y-2 border-vino bg-crema-warm/50">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <h2 className="display text-5xl md:text-6xl">Avisos de la casa</h2>
          <p className="mt-3 max-w-md text-tinta/75">
            Lo que colgaríamos en la vidriera, versión web.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {promos.map((promo, i) => (
            <Reveal key={promo.title} delay={i * 90}>
              <article
                className={`flex min-h-[22rem] flex-col justify-between rounded-3xl p-7 transition-transform duration-300 ease-[var(--ease-fino)] hover:-translate-y-1 ${tones[promo.tone]} ${
                  i === 1 ? "md:mt-8" : ""
                }`}
              >
                <div>
                  <span className="sticker bg-crema text-vino">{promo.badge}</span>
                  {promo.tone === "cielo" && (
                    <Mascot className="mt-5 h-20 w-20 text-vino-deep" />
                  )}
                  <h3 className="display mt-5 text-3xl leading-[0.95]">{promo.title}</h3>
                </div>
                <p className="mt-6 text-sm leading-relaxed opacity-90">{promo.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
