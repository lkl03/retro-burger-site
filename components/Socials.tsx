"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { igPosts, site } from "@/data/site";
import { Icon } from "./Icons";

/*
 * Nuestras redes: fondo sólido (el paseo termina acá) y los posts recientes de
 * @fino_arg en un carrusel con snap, flechas y arrastre. Cada tile abre el post.
 * Feed en vivo: con NEXT_PUBLIC_ELFSIGHT_IG_APP el widget de Elfsight reemplaza
 * al carrusel.
 */
const ELFSIGHT_APP = process.env.NEXT_PUBLIC_ELFSIGHT_IG_APP;

export function Socials() {
  const track = useRef<HTMLUListElement>(null);
  const root = useRef<HTMLElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    // arrastre con mouse (en táctil ya scrollea nativo)
    let down = false, x0 = 0, s0 = 0, moved = false;
    const md = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; moved = false; x0 = e.clientX; s0 = el.scrollLeft; el.style.scrollSnapType = "none"; };
    const mm = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = s0 - dx; };
    const mu = () => { if (!down) return; down = false; el.style.scrollSnapType = ""; };
    const click = (e: MouseEvent) => { if (moved) { e.preventDefault(); moved = false; } };
    el.addEventListener("pointerdown", md);
    addEventListener("pointermove", mm);
    addEventListener("pointerup", mu);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("pointerdown", md);
      removeEventListener("pointermove", mm);
      removeEventListener("pointerup", mu);
      el.removeEventListener("click", click, true);
    };
  }, []);

  // entrada: misma animación que las paradas del paseo
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const on = () => { if (el.getBoundingClientRect().top < innerHeight * 0.7) { setSeen(true); removeEventListener("scroll", on); } };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? (card as HTMLElement).offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };
  const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

  return (
    <section id="redes" ref={root} className={`socials relative isolate scroll-mt-24 pb-24 pt-16 text-crema md:pb-32 ${seen ? "is-seen" : ""}`}>
      <div className="socials__fade" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <span className="socials__glow left-[-10%] top-[5%] h-[38rem] w-[38rem] bg-vino-soft" />
        <span className="socials__glow bottom-[-15%] right-[-8%] h-[34rem] w-[34rem] bg-[#7a1a2a] [animation-delay:-9s]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <h2 className="fw-in display text-center text-[clamp(3.2rem,7vw,6rem)] leading-none">Nuestras redes</h2>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="fw-in" style={d(120)}>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-manteca">Seguinos en Instagram</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="display mt-2 block text-[clamp(2.4rem,5vw,4rem)] leading-none transition-colors hover:text-manteca">
              {site.instagramHandle}
            </a>
          </div>
          <div className="fw-in flex items-center gap-3" style={d(200)}>
            {!ELFSIGHT_APP && (
              <>
                <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Posts anteriores" className="btn btn-outline h-12 w-12 p-0! disabled:opacity-35">
                  <Icon.Arrow className="-rotate-[135deg]" />
                </button>
                <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Posts siguientes" className="btn btn-outline h-12 w-12 p-0! disabled:opacity-35">
                  <Icon.Arrow className="rotate-45" />
                </button>
              </>
            )}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              <Icon.Instagram /> Ver el perfil
            </a>
          </div>
        </div>
      </div>

      {ELFSIGHT_APP ? (
        <div className="mx-auto mt-10 max-w-6xl px-4">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className={`elfsight-app-${ELFSIGHT_APP}`} data-elfsight-app-lazy />
        </div>
      ) : (
        <ul
          ref={track}
          className="ig-track mt-10 flex cursor-grab gap-4 overflow-x-auto px-4 pb-2 active:cursor-grabbing md:px-[max(1rem,calc((100vw_-_72rem)/2_+_1rem))]"
          aria-label={`Posts recientes de ${site.instagramHandle}`}
        >
          {igPosts.map((p, i) => (
            <li key={p.code} className="fw-in w-[72vw] shrink-0 sm:w-[19rem] lg:w-[21rem]" style={d(260 + Math.min(i, 5) * 70)}>
              <a
                href={`https://www.instagram.com/${p.kind}/${p.code}/`}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                aria-label={`${p.kind === "reel" ? "Reel" : "Post"} de ${site.instagramHandle}: ${p.caption}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-vino"
              >
                <img
                  src={`/ig/${p.code}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-[1200ms] ease-[var(--ease-fino)] group-hover:scale-[1.06]"
                />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-crema/90 text-vino">
                  {p.kind === "reel" ? <Icon.Play className="h-3.5 w-3.5" /> : <Icon.Instagram className="h-4 w-4" />}
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vino-deep/95 via-vino-deep/50 to-transparent p-4 pt-14 text-sm leading-snug text-crema opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {p.caption}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
