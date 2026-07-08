import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="casa" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          <h2 className="display max-w-3xl text-5xl md:text-7xl">
            Una burger de barrio que se cree fina.
            <span className="text-vino-soft"> Y tiene razón.</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Reveal delay={80}>
            <p className="text-lg leading-relaxed text-tinta/80">
              FINO nació en Buenos Aires con una idea corta: hacer pocas
              hamburguesas y hacerlas en serio. Carne smasheada al momento,
              cheddar que funde de verdad y una carta que entra en un póster.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg leading-relaxed text-tinta/80">
              La señora de rulos que ves en la pared es la jefa espiritual del
              local. Ella aprueba cada burger que sale del pase. Si no está
              fina, no sale. Así de simple.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
