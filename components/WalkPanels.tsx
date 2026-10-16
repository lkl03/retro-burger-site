import {
  bebidas,
  clasicas,
  dips,
  especiales,
  hamburguesas,
  milkshakes,
  notaMenu,
  sides,
  type PriceLine,
} from "@/data/menu";
import { reviews, site } from "@/data/site";
import { Icon } from "./Icons";

/*
 * Contenido real que se lee sobre el paseo. Cada parada: título afuera de las
 * tarjetas + dos tarjetas que entran de los costados (.fw-from-left/right) la
 * primera vez que la parada es la actual (.is-seen, la pone el motor).
 * --d = retardo de entrada en ms.
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

function StopTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="fw-in fw-title display text-center text-[clamp(3.2rem,7vw,6rem)] leading-none">{children}</h2>
  );
}

export function MenuStop() {
  return (
    <>
      <StopTitle>Menú Fino</StopTitle>
      <div className="mt-8 grid items-start gap-5 lg:grid-cols-2">
        {/* Carta 1: hamburguesas, especiales y clásicas */}
        <div className="fw-panel fw-from-left" style={d(150)}>
          <h3 className="display text-3xl">Hamburguesas</h3>
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

          <div className="mt-6 rounded-2xl bg-vino p-5 text-center text-crema">
            {especiales.map((e, i) => (
              <div key={e.name} className={i ? "mt-4" : ""}>
                <p className="display text-2xl">
                  {e.name} <span aria-hidden="true">★</span> {e.price}
                </p>
                <p className="mt-1 text-sm text-crema/85">{e.description}</p>
              </div>
            ))}
          </div>

          <table className="mt-6 w-full border-collapse text-center">
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
          <p className="mt-3 text-center text-[0.7rem] font-bold uppercase tracking-wide">{notaMenu}</p>
        </div>

        {/* Carta 2: sides, milkshakes, dips y bebidas */}
        <div className="fw-panel fw-from-right" style={d(260)}>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <section>
              <h3 className="display text-3xl">Sides</h3>
              <ul className="mt-3 flex flex-col gap-3 text-sm">{sides.map((s) => <Line key={s.name} {...s} />)}</ul>
            </section>
            <section>
              <h3 className="display text-3xl">Milkshakes</h3>
              <ul className="mt-3 flex flex-col gap-3 text-sm">{milkshakes.map((s) => <Line key={s.name} {...s} />)}</ul>
            </section>
          </div>

          <div className="mt-7 flex items-center justify-between gap-3 rounded-xl border-2 border-vino px-4 py-3">
            <span className="display text-2xl">Dips</span>
            <span className="text-center text-[0.72rem] font-bold uppercase">{dips.label}</span>
            <span className="display text-xl">{dips.price}</span>
          </div>

          <section className="mt-7">
            <h3 className="display text-3xl">Bebidas</h3>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              {bebidas.map((b) => (
                <div key={b.title}>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em]">{b.title}</p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm">{b.items.map((s) => <Line key={s.name} {...s} />)}</ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export function ContactStop() {
  const g = site.google;
  const street = site.address.split(",")[0];
  const nf = new Intl.NumberFormat("es-AR");
  const rows = [
    { icon: <Icon.Pin />, label: "Dirección", title: street, sub: `${site.neighborhood}, CABA · ${site.landmark}` },
    { icon: <Icon.Clock />, label: "Horarios", title: "Todos los días", sub: site.hours.map((h) => h.time).join("  ·  ") },
    { icon: <Icon.Instagram />, label: "Novedades y avisos", title: site.instagramHandle, sub: site.hoursNote, href: site.instagram },
    { icon: <Icon.Wheat />, label: "Sin TACC", title: "Pan sin TACC", sub: "Disponible opción pan sin TACC" },
  ];

  return (
    <>
      <StopTitle>Dónde estamos</StopTitle>
      <div className="mt-8 grid items-start gap-5 lg:grid-cols-2">
        {/* Datos del local */}
        <div className="fw-panel fw-from-left" style={d(150)}>
          <dl className="border-t-2 border-vino/15">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[2.4rem_1fr] gap-x-3 border-b-2 border-vino/15 py-4">
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
          <a href={g.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-solid--vino mt-6">
            Cómo llegar <Icon.Arrow />
          </a>
        </div>

        {/* Mapa + reseñas reales de Google */}
        <div className="fw-panel fw-from-right" style={d(260)}>
          <div className="overflow-hidden rounded-2xl border-2 border-vino">
            <iframe
              title={`Mapa: FINO, ${site.address}`}
              src={site.mapsEmbed}
              className="block h-52 w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="display text-[2.6rem] leading-none">{g.rating.toLocaleString("es-AR", { minimumFractionDigits: 1 })}</span>
            <span>
              <span className="stars text-base [--star:var(--color-vino)]" style={{ "--pct": `${(g.rating / 5) * 100}%` } as React.CSSProperties} aria-hidden="true">★★★★★</span>
              <span className="block text-[0.78rem] text-tinta/65">{nf.format(g.count)} reseñas en Google</span>
            </span>
            <Icon.Google className="ml-auto h-5 w-5 text-vino/60" />
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {reviews.map((r) => (
              <li key={r.author} className="rounded-xl bg-crema-warm p-4">
                <p className="text-sm leading-relaxed text-tinta/85">“{r.text}”</p>
                <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-wide">
                  {r.author} <span className="font-normal normal-case text-tinta/55">· ★★★★★ · {r.when}</span>
                </p>
              </li>
            ))}
          </ul>
          <a href={g.placeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-solid--vino mt-5">
            Ver más reseñas <Icon.Arrow />
          </a>
        </div>
      </div>
    </>
  );
}
