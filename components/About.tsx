import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="casa" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <h2 className="display max-w-3xl text-5xl md:text-7xl">
            Hamburguesas, papas y clásicos
            <span className="text-vino-soft"> en Moldes 880.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-tinta/80">
              FINO es una hamburguesería en Colegiales. La carta es corta y
              directa: smash burgers, papas y un par de especiales. Cualquier
              burger sale con pan sin TACC si lo pedís.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg leading-relaxed text-tinta/80">
              La estética es retro y de mostrador: bordó, crema y carta de
              póster. Pasá por el local o seguinos en Instagram para ver
              novedades.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
