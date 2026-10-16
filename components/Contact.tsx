import { notaMenu } from "@/data/menu";
import { site } from "@/data/site";
import { Icon } from "./Icons";
import { Mascot } from "./Mascot";
import { Reveal } from "./Reveal";

/*
 * Dónde estamos. Datos de la columna izquierda: data/site.ts.
 * El mapa es un embed de Google Maps sin API key (site.mapsEmbed). La tarjeta
 * de Google muestra rating y cantidad de reseñas reales del perfil del local
 * (site.google, verificado 2026-10-16): actualizarlos a mano cuando cambien.
 * No se muestran reseñas inventadas: los links abren el perfil real.
 */
const nf = new Intl.NumberFormat("es-AR");

export function Contact() {
  const g = site.google;
  const street = site.address.split(",")[0];

  const rows = [
    {
      icon: <Icon.Pin />,
      label: "Dirección",
      title: (
        <a href={g.directionsUrl} target="_blank" rel="noopener noreferrer" className="link-line">
          {street}
        </a>
      ),
      sub: `${site.neighborhood}, CABA · ${site.landmark}`,
    },
    {
      icon: <Icon.Clock />,
      label: "Horarios",
      title: "Todos los días",
      sub: site.hours.map((h) => h.time).join("  ·  "),
    },
    {
      icon: <Icon.Instagram />,
      label: "Novedades y avisos",
      title: (
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line">
          {site.instagramHandle}
        </a>
      ),
      sub: site.hoursNote,
    },
    {
      icon: <Icon.Wheat />,
      label: "Sin TACC",
      title: "Pan sin TACC",
      sub: notaMenu.replace("*", ""),
    },
  ];

  return (
    <section id="donde" className="relative scroll-mt-24 overflow-hidden bg-vino-deep text-crema">
      <div className="checker checker-sm h-5 w-full opacity-20 [--checker-c:#f3ead8]" aria-hidden="true" />
      <Mascot className="pointer-events-none absolute -right-24 top-24 hidden h-[34rem] w-[34rem] text-crema/[0.06] [--mascot-face:transparent] lg:block" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="sticker bg-manteca text-vino-deep">Vení a FINO</p>
            <h2 className="display mt-5 text-[clamp(3rem,7vw,5.6rem)]">
              Dónde
              <br />
              estamos
            </h2>
          </Reveal>

          <dl className="mt-10 border-t border-crema/20">
            {rows.map((r, i) => (
              <Reveal key={r.label} delay={i * 90} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-crema/20 py-5">
                  <dt className="sr-only">{r.label}</dt>
                  <span className="mt-1 grid h-9 w-9 place-items-center rounded-full bg-crema/10 text-manteca">{r.icon}</span>
                  <dd>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-crema/55" aria-hidden="true">
                      {r.label}
                    </p>
                    <p className="display mt-1 text-[1.6rem]">{r.title}</p>
                    <p className="mt-1 text-sm text-crema/70">{r.sub}</p>
                  </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={g.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex items-center gap-2 rounded-full bg-crema px-6 py-3 text-sm font-bold uppercase tracking-wide text-vino transition-colors duration-200 hover:bg-manteca"
              >
                Cómo llegar <Icon.Arrow />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex items-center gap-2 rounded-full border-2 border-crema/70 px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 hover:bg-crema hover:text-vino"
              >
                <Icon.Instagram className="h-4 w-4" /> Escribinos
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={120}>
          <div className="poster-frame relative h-[64svh] min-h-[440px] overflow-hidden border-crema/40 bg-vino lg:h-full lg:min-h-[620px]">
            <iframe
              title={`Mapa: FINO, ${site.address}`}
              src={site.mapsEmbed}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Tarjeta del perfil de Google: rating y reseñas reales */}
            <div className="absolute inset-x-3 bottom-3 rounded-2xl border-2 border-vino bg-crema p-5 text-vino shadow-[0_18px_40px_-18px_rgba(38,20,26,.55)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[min(370px,calc(100%-2.5rem))]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="display text-2xl leading-none">FINO</p>
                  <p className="mt-1 text-[0.8rem] text-tinta/65">Hamburguesería · {street}</p>
                </div>
                <Icon.Google className="h-5 w-5 text-vino/70" />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="display text-[2.6rem] leading-none">{g.rating.toLocaleString("es-AR", { minimumFractionDigits: 1 })}</span>
                <span>
                  <span className="stars text-lg [--star:var(--color-vino)]" style={{ "--pct": `${(g.rating / 5) * 100}%` } as React.CSSProperties} aria-hidden="true">
                    ★★★★★
                  </span>
                  <span className="block text-[0.78rem] text-tinta/65">
                    {nf.format(g.count)} reseñas en Google · {g.priceRange}
                  </span>
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-vino/15 pt-3 text-[0.7rem] font-bold uppercase tracking-[0.14em]">
                <a href={g.placeUrl} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1">
                  Leer reseñas <Icon.Arrow className="h-3 w-3" />
                </a>
                <a href={g.directionsUrl} target="_blank" rel="noopener noreferrer" className="link-line text-tinta/70 hover:text-vino">
                  Cómo llegar
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
