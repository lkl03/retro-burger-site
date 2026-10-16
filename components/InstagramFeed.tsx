import Script from "next/script";
import { igPosts, site } from "@/data/site";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";

/*
 * Feed de @fino_arg. Cada tile es un post real (foto en public/ig/<code>.webp,
 * caption textual recortada) y abre el post. Para que el feed se actualice solo,
 * crear un widget "Instagram Feed" en Elfsight conectado a @fino_arg y poner su
 * id en NEXT_PUBLIC_ELFSIGHT_IG_APP: el widget en vivo reemplaza la grilla.
 */
const ELFSIGHT_APP = process.env.NEXT_PUBLIC_ELFSIGHT_IG_APP;

export function InstagramFeed() {
  return (
    <section id="instagram" className="relative scroll-mt-24 overflow-hidden bg-crema py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="sticker bg-vino text-crema">
              <Icon.Instagram className="h-3.5 w-3.5" /> {site.instagramHandle}
            </p>
            <h2 className="display mt-5 text-[clamp(3rem,8vw,6.5rem)]">
              {site.motto}
            </h2>
            <p className="mt-4 max-w-md text-tinta/75">
              Lanzamientos, hamburguesas por tiempo limitado y avisos del local salen
              primero en Instagram.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center gap-2 rounded-full bg-vino px-6 py-3 text-sm font-bold uppercase tracking-wide text-crema transition-colors duration-200 hover:bg-vino-deep"
            >
              <Icon.Instagram className="h-4 w-4" /> Seguinos
            </a>
          </Reveal>
        </div>

        {ELFSIGHT_APP ? (
          <div className="mt-12">
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
            <div className={`elfsight-app-${ELFSIGHT_APP}`} data-elfsight-app-lazy />
          </div>
        ) : (
          <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {igPosts.map((p, i) => (
              <li key={p.code} className={i % 2 ? "md:translate-y-8" : ""}>
                <Reveal delay={(i % 4) * 70}>
                  <a
                    href={`https://www.instagram.com/${p.kind}/${p.code}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.kind === "reel" ? "Reel" : "Post"} de ${site.instagramHandle}: ${p.caption}`}
                    className="ig-tile group relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] border-2 border-vino bg-vino"
                  >
                    <img
                      src={`/ig/${p.code}.webp`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-fino)] group-hover:scale-[1.06]"
                    />
                    <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-crema/90 text-vino">
                      {p.kind === "reel" ? <Icon.Play className="h-3.5 w-3.5" /> : <Icon.Instagram className="h-4 w-4" />}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 translate-y-full bg-vino/95 p-4 text-sm leading-snug text-crema transition-transform duration-500 ease-[var(--ease-fino)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                      {p.caption}
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
