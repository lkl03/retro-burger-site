/* eslint-disable @next/next/no-img-element */
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

// PLACEHOLDER: reemplazar por fotos reales del local / Instagram.
const shots = [
  { seed: "fino-smash-burger", caption: "La Fino, recién salida del pase", ratio: "aspect-[4/5]", rotate: "-rotate-2" },
  { seed: "fino-local-pared", caption: "La pared de la jefa", ratio: "aspect-square", rotate: "rotate-1" },
  { seed: "fino-papas-finas", caption: "Papas finas + mayo pesto", ratio: "aspect-[4/5]", rotate: "rotate-2" },
  { seed: "fino-mostrador", caption: "El mostrador, un viernes", ratio: "aspect-square", rotate: "-rotate-1" },
];

export function Gallery() {
  return (
    <section id="fotos" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-5xl md:text-6xl">Del feed a la mesa</h2>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold uppercase tracking-wide underline underline-offset-4 transition-opacity duration-200 hover:opacity-60"
            >
              {site.instagramHandle}
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {shots.map((shot, i) => (
            <Reveal key={shot.seed} delay={i * 80} className={i % 2 === 1 ? "md:mt-10" : ""}>
              <figure
                className={`${shot.rotate} transition-transform duration-300 ease-[var(--ease-fino)] hover:rotate-0`}
              >
                <div className={`poster-frame overflow-hidden bg-vino p-1.5 text-vino ${shot.ratio}`}>
                  <img
                    src={`https://picsum.photos/seed/${shot.seed}/600/750`}
                    alt={shot.caption}
                    loading="lazy"
                    className="h-full w-full rounded-[calc(1.5rem-0.375rem)] object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-tinta/70">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
