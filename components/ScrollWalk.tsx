"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { mountScrollWalk } from "@/lib/scroll-walk";
import { Logo } from "./Logo";
import { ContactPanel, InstagramPanel, MenuPanel } from "./WalkPanels";

/*
 * Paseo por el local con el scroll (motor en lib/scroll-walk.js).
 * 4 paradas = 4 pósters (frames reales del vídeo) + 3 clips que unen cada
 * parada con la siguiente. Sobre cada parada va contenido real del local:
 * entrada → hero, barra → menú, pared → dónde estamos, burger → Instagram.
 * Los clips salen de Google Flow / Veo a partir de fotos reales del local
 * (media/scroll-walk/plan.json). Para la versión final alcanza con regenerar
 * public/video y public/world: este componente no cambia.
 *
 * data-hold = fracción del tramo en la que la cámara queda quieta: más alta en
 * las paradas con tarjetas largas, para que no se mueva mientras se lee.
 */

const STOPS = [
  { id: "inicio", label: "Inicio", hold: 0.24, panel: null },
  { id: "menu", label: "Menú", hold: 0.62, panel: <MenuPanel /> },
  { id: "donde", label: "Dónde estamos", hold: 0.5, panel: <ContactPanel /> },
  { id: "instagram", label: "Instagram", hold: 0.5, panel: <InstagramPanel /> },
];

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export function ScrollWalk() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const sw = mountScrollWalk(ref.current);
    document.fonts?.ready.then(() => sw.refresh());
    // El mapa y las fotos cambian alturas al cargar: re-medir.
    const ro = new ResizeObserver(() => sw.refresh());
    ro.observe(ref.current.querySelector(".sw-stops")!);
    return () => {
      ro.disconnect();
      sw.destroy();
    };
  }, []);

  return (
    <section ref={ref} data-sw className="sw fino-walk" aria-label="FINO, Moldes 880">
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
        <nav className="sw-rail" aria-label="Secciones">
          {STOPS.map((s) => (
            <a key={s.id} data-sw-goto href={`#${s.id}`} aria-label={s.label} />
          ))}
        </nav>
        <a href="#menu" className="sw-hint fino-walk__chevron" aria-label="Bajar al menú">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </div>

      <div className="sw-stops">
        {STOPS.map((s) => (
          <article
            key={s.id}
            id={s.id}
            data-sw-stop
            data-focus={50}
            data-hold={s.hold}
            className={`sw-stop ${s.panel ? "fw-stop--panel" : ""}`}
          >
            <div className="sw-copy">
              {s.panel ?? (
                <>
                  <Logo className="fw-in h-auto w-[clamp(8rem,11vw,10rem)] text-crema" title="FINO" />
                  <p className="fw-in fino-walk__eyebrow mt-6" style={d(120)}>
                    {site.address.split(",")[0]} · {site.neighborhood}
                  </p>
                  <h1 className="fw-in display mt-3 text-[clamp(3.1rem,6vw,5.4rem)]" style={d(200)}>
                    Es hora de
                    <br />
                    <span className="text-manteca">ponernos finos.</span>
                  </h1>
                  <p className="fw-in mt-5 max-w-md text-[1.05rem] leading-relaxed text-crema/85" style={d(300)}>
                    Hamburguesas, papas y milkshakes en {site.address.split(",")[0]}, al lado de la plaza de Colegiales.
                    Todos los días, {site.hours.map((h) => h.time.replace(/ /g, "")).join(" y ")}.
                  </p>
                  <div className="fw-in mt-8 flex flex-wrap gap-3" style={d(400)}>
                    <a
                      href="#menu"
                      className="pressable rounded-full bg-crema px-6 py-3 text-sm font-bold uppercase tracking-wide text-vino transition-colors duration-200 hover:bg-manteca"
                    >
                      Ver el menú
                    </a>
                    <a
                      href={site.google.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable rounded-full border-2 border-crema/70 px-6 py-3 text-sm font-bold uppercase tracking-wide text-crema transition-colors duration-200 hover:bg-crema hover:text-vino"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
