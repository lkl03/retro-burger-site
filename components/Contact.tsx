import { site } from "@/data/site";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="donde" className="scroll-mt-24 border-t-2 border-vino bg-vino text-crema">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="display text-5xl md:text-7xl">Vení a buscarla</h2>
            <p className="mt-4 max-w-md text-crema/80">
              Pedila por WhatsApp y pasá a retirar, o comela en el local viendo
              la pared de la jefa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable rounded-full bg-crema px-8 py-4 font-bold uppercase tracking-wide text-vino transition-colors duration-200 hover:bg-crema-warm"
              >
                {site.whatsappLabel}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable rounded-full border-2 border-crema px-8 py-4 font-bold uppercase tracking-wide transition-colors duration-200 hover:bg-crema hover:text-vino"
              >
                Instagram
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border-2 border-crema/40 p-7">
              <h3 className="display text-2xl">Horarios</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="font-semibold">{h.days}</span>
                    <span className="opacity-80">{h.time}</span>
                  </li>
                ))}
              </ul>
              <h3 className="display mt-8 text-2xl">Dirección</h3>
              <p className="mt-3 text-sm opacity-80">{site.address}</p>
              <p className="mt-4 rounded-xl bg-crema/10 px-3 py-2 text-xs uppercase tracking-wide opacity-70">
                Horarios y dirección de muestra: confirmar con el local
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
