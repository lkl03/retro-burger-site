import { site } from "@/data/site";
import { Mascot } from "./Mascot";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* franja checkerboard superior, como la pared del local */}
      <div className="checker checker-sm h-6 w-full opacity-20" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-14 md:grid-cols-[1.2fr_1fr] md:items-center md:pb-28 md:pt-20">
        <Reveal>
          <p className="sticker border-2 border-vino bg-manteca text-vino -rotate-2">
            Hamburguesería · Buenos Aires
          </p>
          <h1 className="display mt-10 text-[clamp(4.5rem,16vw,11rem)]">
            FIN
            <span className="relative inline-block align-baseline">
              O
              <Mascot className="pointer-events-none absolute -right-[0.18em] -top-[0.38em] h-[0.55em] w-[0.55em] text-vino" />
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg font-medium leading-relaxed text-tinta/80">
            {site.tagline} Doble carne, cheddar y pan de papa. Lo demás sobra.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="pressable rounded-full bg-vino px-8 py-4 font-bold uppercase tracking-wide text-crema transition-colors duration-200 hover:bg-vino-deep"
            >
              Ver el menú
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable rounded-full border-2 border-vino px-8 py-4 font-bold uppercase tracking-wide text-vino transition-colors duration-200 hover:bg-vino hover:text-crema"
            >
              {site.whatsappLabel}
            </a>
          </div>
        </Reveal>

        {/* composición tipo póster: marco redondeado con la mascota grande */}
        <Reveal delay={120} className="hidden md:block">
          <div className="poster-frame relative aspect-[4/5] rotate-2 bg-vino p-8 text-crema transition-transform duration-500 ease-[var(--ease-fino)] hover:rotate-0">
            <div className="checker checker-sm absolute inset-0 rounded-[inherit] opacity-10 [--checker-c:#f3ead8]" aria-hidden="true" />
            <Mascot className="relative mx-auto mt-6 h-56 w-56" />
            <p className="display relative mt-8 text-center text-4xl">
              Fina la burger,
              <br />
              fino el trato
            </p>
            <p className="relative mt-4 text-center text-sm font-semibold uppercase tracking-[0.15em] opacity-80">
              {site.instagramHandle}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
