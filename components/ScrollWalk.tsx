"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { mountScrollWalk } from "@/lib/scroll-walk";
import { Logo } from "./Logo";
import { ContactStop, MenuStop } from "./WalkPanels";

/*
 * Paseo por el local con el scroll (motor en lib/scroll-walk.js).
 * 3 paradas = 3 pósters (frames reales del vídeo) + 2 clips. El paseo arranca en
 * la hamburguesa y la cámara se aleja hacia la pared "Es hora de ponernos finos"
 * y después gira hacia la barra:
 *   hamburguesa → hero · pared → menú · barra → dónde estamos
 * Los clips son los de Google Flow / Veo invertidos (media/scroll-walk/clips-v2,
 * ver plan.json). Para la versión final alcanza con regenerar public/video y
 * public/world: este componente no cambia.
 *
 * data-hold = fracción del tramo en la que la cámara queda quieta: más alta en
 * las paradas con tarjetas, para que no se mueva mientras se lee.
 * La nav aparece recién desde la segunda parada (html[data-nav]).
 */

const STOPS = [
  { id: "inicio", label: "Inicio", hold: 0.2, content: null },
  { id: "menu", label: "Nuestro menú", hold: 0.55, content: <MenuStop /> },
  { id: "donde", label: "Dónde estamos", hold: 0.55, content: <ContactStop /> },
];

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export function ScrollWalk() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const html = document.documentElement;
    const sw = mountScrollWalk(ref.current, {
      onStop: (i: number) => html.toggleAttribute("data-nav", i >= 1),
    });
    // Pasado el paseo (redes, footer) la nav sigue visible.
    const onScroll = () => {
      if (ref.current && scrollY > ref.current.offsetHeight * 0.5) html.setAttribute("data-nav", "");
    };
    addEventListener("scroll", onScroll, { passive: true });
    document.fonts?.ready.then(() => sw.refresh());
    // El mapa y las fotos cambian alturas al cargar: re-medir.
    const ro = new ResizeObserver(() => sw.refresh());
    ro.observe(ref.current.querySelector(".sw-stops")!);
    return () => {
      removeEventListener("scroll", onScroll);
      ro.disconnect();
      sw.destroy();
      html.removeAttribute("data-nav");
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
        <div className="fino-walk__heroveil" />
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
            className={`sw-stop ${s.content ? "fw-stop--panel" : ""}`}
          >
            <div className="sw-copy">
              {s.content ?? (
                <>
                  <h1 className="fw-in">
                    <Logo className="h-auto w-[clamp(13rem,30vw,22rem)] text-crema drop-shadow-[0_8px_30px_rgba(20,3,8,.55)]" title="FINO" />
                  </h1>
                  <p className="fw-in display mt-6 text-[clamp(1.5rem,2.6vw,2.2rem)] text-manteca" style={d(180)}>
                    {site.wallLine}
                  </p>
                  <div className="fw-in mt-9 flex flex-wrap justify-center gap-3" style={d(320)}>
                    <a href="#menu" className="btn btn-solid">
                      Mirá nuestro menú
                    </a>
                    <a href="#donde" className="btn btn-outline">
                      Dónde estamos
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
