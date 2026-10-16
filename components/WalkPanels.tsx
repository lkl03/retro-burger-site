import Script from "next/script";
import {
  bebidas,
  clasicas,
  dips,
  especiales,
  fueraDeCarta,
  hamburguesas,
  milkshakes,
  notaMenu,
  sides,
  type PriceLine,
} from "@/data/menu";
import { igPosts, site } from "@/data/site";
import { Icon } from "./Icons";

/*
 * Contenido real que se lee sobre el paseo, una tarjeta por parada.
 * Cada hijo con .fw-in entra con un leve desplazamiento la primera vez que
 * la parada se vuelve actual (clase .is-seen, la pone el motor); --d = retardo en ms.
 */
const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

function Line({ name, note, price }: PriceLine) {
  return (
    <li className="flex items-baseline gap-2">
      <span>
        <span className="font-bold uppercase tracking-wide">{name}</span>
        {note && <span className="block text-[0.78rem] text-tinta/65">{note}</span>}
      </span>
      <span className="menu-leader" aria-hidden="true" />
      <span className="display text-lg">{price}</span>
    </li>
  );
}

export function MenuPanel() {
  return (
    <div className="fw-panel">
      <h2 className="fw-in display text-center text-[clamp(3rem,6vw,4.6rem)] leading-none" style={d(0)}>
        Menú Fino
      </h2>

      <section className="fw-in mt-8" style={d(90)} aria-labelledby="m-burgers">
        <h3 id="m-burgers" className="display text-3xl">Hamburguesas</h3>
        <ul className="mt-4 flex flex-col gap-4">
          {hamburguesas.map((h) => (
            <li key={h.name}>
              <div className="flex items-baseline">
                <span className="text-lg font-bold uppercase tracking-wide">{h.name}</span>
                <span className="menu-leader" aria-hidden="true" />
                <span className="display text-2xl">{h.price}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-tinta/75">{h.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="fw-in mt-6 rounded-2xl bg-vino p-5 text-center text-crema" style={d(160)}>
        {especiales.map((e, i) => (
          <div key={e.name} className={i ? "mt-4" : ""}>
            <p className="display text-2xl">
              {e.name} <span aria-hidden="true">★</span> {e.price}
            </p>
            <p className="mt-1 text-sm text-crema/85">{e.description}</p>
          </div>
        ))}
      </div>

      <table className="fw-in mt-6 w-full border-collapse text-center" style={d(220)}>
        <thead>
          <tr className="text-[0.62rem] font-bold uppercase tracking-[0.16em]">
            <th scope="col"><span className="sr-only">Clásicas</span></th>
            <th scope="col">Simple</th>
            <th scope="col">Doble</th>
            <th scope="col">Triple</th>
          </tr>
        </thead>
        <tbody>
          {clasicas.map((c) => (
            <tr key={c.name} className="border-y-2 border-vino">
              <th scope="row" className="py-2 text-left text-sm font-bold uppercase sm:text-base">{c.name}</th>
              <td className="display text-lg">{c.prices.simple}</td>
              <td className="display text-lg">{c.prices.doble}</td>
              <td className="display text-lg">{c.prices.triple}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fw-in mt-3 text-center text-[0.7rem] font-bold uppercase tracking-wide" style={d(260)}>{notaMenu}</p>

      <div className="fw-in mt-7 grid gap-7 sm:grid-cols-2" style={d(300)}>
        <section>
          <h3 className="display text-3xl">Sides</h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm">{sides.map((s) => <Line key={s.name} {...s} />)}</ul>
        </section>
        <section>
          <h3 className="display text-3xl">Milkshakes</h3>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm">{milkshakes.map((s) => <Line key={s.name} {...s} />)}</ul>
        </section>
      </div>

      <div className="fw-in mt-6 flex items-center justify-between gap-3 rounded-xl border-2 border-vino px-4 py-2.5" style={d(340)}>
        <span className="display text-2xl">Dips</span>
        <span className="text-center text-[0.72rem] font-bold uppercase">{dips.label}</span>
        <span className="display text-xl">{dips.price}</span>
      </div>

      <section className="fw-in mt-7" style={d(380)}>
        <h3 className="display text-center text-3xl">Bebidas</h3>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
          {bebidas.map((b) => (
            <div key={b.title}>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em]">{b.title}</p>
              <ul className="mt-2 flex flex-col gap-1.5 text-sm">{b.items.map((s) => <Line key={s.name} {...s} />)}</ul>
            </div>
          ))}
        </div>
      </section>

      <a
        href={fueraDeCarta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="fw-in group mt-7 flex items-center justify-between gap-3 rounded-full bg-manteca px-5 py-3 text-sm font-bold text-vino-deep transition-colors hover:bg-vino hover:text-crema"
        style={d(420)}
      >
        {fueraDeCarta.label}
        <Icon.Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

export function ContactPanel() {
  const g = site.google;
  const street = site.address.split(",")[0];
  const nf = new Intl.NumberFormat("es-AR");
  const rows = [
    { icon: <Icon.Pin />, label: "Dirección", title: street, sub: `${site.neighborhood}, CABA · ${site.landmark}`, href: g.directionsUrl },
    { icon: <Icon.Clock />, label: "Horarios", title: "Todos los días", sub: site.hours.map((h) => h.time).join("  ·  ") },
    { icon: <Icon.Instagram />, label: "Novedades y avisos", title: site.instagramHandle, sub: site.hoursNote, href: site.instagram },
  ];

  return (
    <div className="fw-panel">
      <h2 className="fw-in display text-[clamp(3rem,6vw,4.6rem)] leading-none" style={d(0)}>
        Dónde estamos
      </h2>
      <dl className="mt-6 border-t-2 border-vino/15">
        {rows.map((r, i) => (
          <div key={r.label} className="fw-in grid grid-cols-[2.4rem_1fr] gap-x-3 border-b-2 border-vino/15 py-4" style={d(80 + i * 70)}>
            <dt className="sr-only">{r.label}</dt>
            <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-vino text-crema">{r.icon}</span>
            <dd>
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-tinta/55" aria-hidden="true">{r.label}</p>
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="link-line display text-2xl">{r.title}</a>
              ) : (
                <p className="display text-2xl">{r.title}</p>
              )}
              <p className="text-sm text-tinta/70">{r.sub}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="fw-in relative mt-6 overflow-hidden rounded-2xl border-2 border-vino" style={d(300)}>
        <iframe
          title={`Mapa: FINO, ${site.address}`}
          src={site.mapsEmbed}
          className="block h-60 w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="fw-in mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-vino p-4 text-crema" style={d(360)}>
        <div className="flex items-center gap-3">
          <span className="display text-[2.4rem] leading-none">{g.rating.toLocaleString("es-AR", { minimumFractionDigits: 1 })}</span>
          <span>
            <span className="stars text-base" style={{ "--pct": `${(g.rating / 5) * 100}%` } as React.CSSProperties} aria-hidden="true">★★★★★</span>
            <span className="block text-[0.75rem] text-crema/75">{nf.format(g.count)} reseñas en Google</span>
          </span>
        </div>
        <a href={g.placeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-manteca">
          Leer reseñas <Icon.Arrow className="h-3 w-3" />
        </a>
      </div>

      <a
        href={g.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fw-in pressable mt-5 inline-flex items-center gap-2 rounded-full bg-vino px-6 py-3 text-sm font-bold uppercase tracking-wide text-crema transition-colors hover:bg-vino-deep"
        style={d(420)}
      >
        Cómo llegar <Icon.Arrow />
      </a>
    </div>
  );
}

const ELFSIGHT_APP = process.env.NEXT_PUBLIC_ELFSIGHT_IG_APP;

export function InstagramPanel() {
  return (
    <div className="fw-panel fw-panel--wide">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="fw-in" style={d(0)}>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="sticker bg-vino text-crema">
            <Icon.Instagram className="h-3.5 w-3.5" /> {site.instagramHandle}
          </a>
          <h2 className="display mt-4 text-[clamp(3rem,6vw,4.6rem)] leading-none">{site.motto}</h2>
        </div>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="fw-in pressable inline-flex items-center gap-2 rounded-full bg-vino px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-crema transition-colors hover:bg-vino-deep"
          style={d(80)}
        >
          Seguinos <Icon.Arrow />
        </a>
      </div>

      {ELFSIGHT_APP ? (
        <div className="fw-in mt-6" style={d(160)}>
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className={`elfsight-app-${ELFSIGHT_APP}`} data-elfsight-app-lazy />
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {igPosts.map((p, i) => (
            <li key={p.code} className="fw-in" style={d(140 + i * 60)}>
              <a
                href={`https://www.instagram.com/${p.kind}/${p.code}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.kind === "reel" ? "Reel" : "Post"} de ${site.instagramHandle}: ${p.caption}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-vino"
              >
                <img
                  src={`/ig/${p.code}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-fino)] group-hover:scale-[1.07]"
                />
                <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-crema/90 text-vino">
                  {p.kind === "reel" ? <Icon.Play className="h-3 w-3" /> : <Icon.Instagram className="h-3.5 w-3.5" />}
                </span>
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-vino/95 p-3 text-[0.78rem] leading-snug text-crema transition-transform duration-500 ease-[var(--ease-fino)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {p.caption}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
