"use client";

import { useEffect, useRef } from "react";
import { hamburguesas, notaMenu } from "@/data/menu";
import { site } from "@/data/site";
import { mountScrollWalk } from "@/lib/scroll-walk";
import { Mascot } from "./Mascot";

/*
 * Paseo por el local con el scroll (motor en lib/scroll-walk.js).
 * 4 paradas = 4 pósters (frames reales del vídeo) + 3 clips que unen cada
 * parada con la siguiente. Los clips se generaron con IA (Google Flow / Veo)
 * a partir de fotos reales del local publicadas en Google Maps; ver
 * media/scroll-walk/plan.json. Para pasar a la versión final alcanza con
 * regenerar public/video y public/world: este componente no cambia.
 */

const fino = hamburguesas[0];

type Stop = {
  id: string;
  focus: number;
  eyebrow: string;
  title: React.ReactNode;
  body: React.ReactNode;
  pills?: string[];
  ctas?: { label: string; href: string; external?: boolean; primary?: boolean }[];
};

const STOPS: Stop[] = [
  {
    id: "paseo",
    focus: 50,
    eyebrow: `${site.address.split(",")[0]} · ${site.neighborhood}`,
    title: (
      <>
        Hamburguesas finas,
        <br />
        <span className="text-manteca">cero vueltas.</span>
      </>
    ),
    body: "Hamburguesería en Colegiales. Bajá despacio: te mostramos el local antes de que vengas.",
    ctas: [
      { label: "Ver el menú", href: "#menu", primary: true },
      { label: "Cómo llegar", href: site.google.directionsUrl, external: true },
    ],
  },
  {
    id: "barra",
    focus: 50,
    eyebrow: "La barra",
    title: "Se pide acá. Carta corta.",
    body: "El menú está en la pantalla de la barra y entra en una mirada: hamburguesas, clásicas en simple, doble o triple, papas y milkshakes.",
    pills: ["Simple · doble · triple", notaMenu.replace("*", "")],
  },
  {
    id: "pared",
    focus: 50,
    eyebrow: "La pared",
    title: `${site.wallLine}.`,
    body: (
      <>
        Lo dice la pared y lo repite la casa: <em className="not-italic text-manteca">{site.motto.toLowerCase()}</em>. Mediodía y noche, todos los días.
      </>
    ),
    pills: site.hours.map((h) => h.time),
  },
  {
    id: "la-fino",
    focus: 50,
    eyebrow: `La ${fino.name} · ${fino.price}`,
    title: "La que lleva el nombre.",
    body: `${fino.description} Pasá por ${site.address.split(",")[0]} o mirá lo nuevo en Instagram.`,
    ctas: [
      { label: "Ver el menú completo", href: "#menu", primary: true },
      { label: site.instagramHandle, href: site.instagram, external: true },
    ],
  },
];

export function ScrollWalk() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const sw = mountScrollWalk(ref.current, { hold: 0.24 });
    // Fuentes y layout tardío cambian alturas: re-medir.
    document.fonts?.ready.then(() => sw.refresh());
    return () => sw.destroy();
  }, []);

  return (
    <section ref={ref} data-sw className="sw fino-walk" aria-label="Recorrido por el local">
      <div data-sw-stage className="sw-stage">
        {STOPS.map((s, i) => (
          <img
            key={s.id}
            data-sw-poster
            src={`/world/stop-${i}.webp`}
            srcSet={`/world/stop-${i}-sm.webp 960w, /world/stop-${i}.webp 1920w`}
            sizes="100vw"
            alt=""
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        {STOPS.slice(1).map((s, i) => (
          <video
            key={s.id}
            data-sw-clip
            data-src={`/video/clip-${i + 1}.mp4`}
            data-src-mobile={`/video/clip-${i + 1}-m.mp4`}
            muted
            playsInline
            preload="none"
          />
        ))}
        <div className="sw-veil" />
        <nav className="sw-rail" aria-label="Paradas del recorrido">
          {STOPS.map((s) => (
            <a key={s.id} data-sw-goto href={`#${s.id}`} aria-label={`Ir a: ${s.eyebrow}`} />
          ))}
        </nav>
        <p className="sw-hint" aria-hidden="true">
          Bajá para entrar
        </p>
        <p className="fino-walk__note">Recorrido animado con IA a partir de fotos reales del local</p>
      </div>

      <div className="sw-stops">
        {STOPS.map((s, i) => (
          <article key={s.id} id={s.id} data-sw-stop data-focus={s.focus} className="sw-stop">
            <div className="sw-copy">
              <p className="fino-walk__eyebrow">
                <Mascot className="h-5 w-5 [--mascot-face:var(--color-crema)]" />
                {s.eyebrow}
              </p>
              {i === 0 ? (
                <h1 className="display mt-4 text-[clamp(3.2rem,7.4vw,6.6rem)]">{s.title}</h1>
              ) : (
                <h2 className="display mt-4 text-[clamp(2.6rem,5.6vw,5rem)]">{s.title}</h2>
              )}
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-crema/85">{s.body}</p>
              {s.pills && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.pills.map((p) => (
                    <li key={p} className="sticker bg-crema/10 text-crema ring-1 ring-crema/30 backdrop-blur-sm">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              {s.ctas && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {s.ctas.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`pressable rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                        c.primary
                          ? "bg-crema text-vino hover:bg-manteca"
                          : "border-2 border-crema/70 text-crema hover:bg-crema hover:text-vino"
                      }`}
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
