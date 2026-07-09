/* eslint-disable @next/next/no-img-element */
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

/*
 * Sección Instagram (estática, sin API).
 * PLACEHOLDER de imágenes: reemplazar cada `src` por una captura/foto real
 * exportada del feed de @fino_arg (guardarlas en /public/instagram/ y usar
 * src="/instagram/post-1.jpg", etc.). Las captions son neutrales a propósito:
 * usar captions reales solo si se copian textuales de los posts.
 * Si más adelante se quiere un feed sincronizado, se puede embeber un widget
 * tipo Elfsight/Behold aquí en lugar de la grilla estática.
 */
const posts = [
  { seed: "fino-menu-poster", caption: "Menú FINO", ratio: "aspect-[4/5]", rotate: "-rotate-2" },
  { seed: "fino-local", caption: "Local", ratio: "aspect-square", rotate: "rotate-1" },
  { seed: "fino-burgers", caption: "Hamburguesas", ratio: "aspect-[4/5]", rotate: "rotate-2" },
  { seed: "fino-novedades", caption: "Novedades", ratio: "aspect-square", rotate: "-rotate-1" },
];

export function Gallery() {
  return (
    <section id="instagram" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="display text-5xl md:text-6xl">FINO en Instagram</h2>
              <p className="mt-3 max-w-md text-tinta/75">
                Novedades, carta y avisos del local, primero en el feed.
              </p>
            </div>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center gap-2 rounded-full bg-vino px-6 py-3 font-bold uppercase tracking-wide text-crema transition-colors duration-200 hover:bg-vino-deep"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
              </svg>
              {site.instagramHandle}
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.seed} delay={i * 80} className={i % 2 === 1 ? "md:mt-10" : ""}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${post.rotate} transition-transform duration-300 ease-[var(--ease-fino)] hover:rotate-0`}
              >
                <div className={`poster-frame overflow-hidden bg-vino p-1.5 text-vino ${post.ratio}`}>
                  {/* PLACEHOLDER: reemplazar por foto real del post de @fino_arg */}
                  <img
                    src={`https://picsum.photos/seed/${post.seed}/600/750`}
                    alt={post.caption}
                    loading="lazy"
                    className="h-full w-full rounded-[calc(1.5rem-0.375rem)] object-cover"
                  />
                </div>
                <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-tinta/70">
                  {post.caption}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
