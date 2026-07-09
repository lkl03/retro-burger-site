import { site } from "@/data/site";
import { Reveal } from "./Reveal";

/*
 * Ubicación + reseñas.
 * El mapa es un embed de Google Maps sin API key (query a la dirección),
 * configurado en data/site.ts (mapsEmbed). El bloque de reseñas no muestra
 * reseñas inventadas: linkea directo al perfil del local en Google Maps.
 * Si el cliente comparte el Place ID del negocio, se puede reemplazar el
 * embed por uno con el pin del local y sumar reseñas reales.
 */
export function Contact() {
  return (
    <section id="donde" className="scroll-mt-24 border-t-2 border-vino bg-vino text-crema">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <h2 className="display text-5xl md:text-7xl">Dónde estamos</h2>
          <p className="mt-4 max-w-md text-crema/80">
            {site.address} · {site.neighborhood}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_1fr]">
          {/* Mapa en marco de póster, coherente con el sistema visual */}
          <Reveal>
            <div className="poster-frame overflow-hidden bg-crema p-1.5">
              <iframe
                title={`Mapa: FINO, ${site.address}`}
                src={site.mapsEmbed}
                className="h-[380px] w-full rounded-[calc(1.5rem-0.375rem)] md:h-full md:min-h-[420px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl border-2 border-crema/40 p-7">
                <h3 className="display text-2xl">Horarios</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {site.hours.map((h, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="font-semibold">{h.days}</span>
                      <span className="opacity-80">{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs uppercase tracking-wide opacity-70">
                  {site.hoursNote}: {site.instagramHandle}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable rounded-full bg-crema px-6 py-3 text-sm font-bold uppercase tracking-wide text-vino transition-colors duration-200 hover:bg-crema-warm"
                  >
                    Cómo llegar
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable rounded-full border-2 border-crema px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 hover:bg-crema hover:text-vino"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              {/* Reseñas: sin reseñas inventadas, CTA directo a Google */}
              <div className="rounded-3xl border-2 border-crema/40 p-7">
                <h3 className="display text-2xl">Reseñas</h3>
                <p className="mt-3 text-sm opacity-80">
                  Lo que dice la gente está en Google. Entrá y mirá las reseñas
                  del local.
                </p>
                <a
                  href={site.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable mt-5 inline-flex items-center gap-2 rounded-full bg-crema px-6 py-3 text-sm font-bold uppercase tracking-wide text-vino transition-colors duration-200 hover:bg-crema-warm"
                >
                  <span aria-hidden="true">★</span>
                  Mirá las reseñas en Google
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
