import { clasicas, especiales, hamburguesas, notaMenu } from "@/data/menu";
import { Mascot } from "./Mascot";
import { Reveal } from "./Reveal";

function MenuRow({ name, description, price }: { name: string; description: string; price: string }) {
  return (
    <div className="group">
      <div className="flex items-baseline">
        <h4 className="display text-2xl transition-transform duration-200 ease-[var(--ease-fino)] group-hover:translate-x-1">
          {name}
        </h4>
        <span className="menu-leader" aria-hidden="true" />
        <span className="display text-2xl">{price}</span>
      </div>
      <p className="mt-1 max-w-md text-sm leading-relaxed text-tinta/75">{description}</p>
    </div>
  );
}

export function MenuBoard() {
  return (
    <section id="menu" className="relative scroll-mt-24">
      {/* fondo checkerboard vino, como la historia del menú */}
      <div className="checker absolute inset-0 bg-vino [--checker-c:rgba(71,13,24,0.55)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 md:py-28">
        <Reveal>
          <div className="poster-frame bg-crema px-6 py-10 text-vino md:px-14 md:py-14">
            {/* cabecera del póster */}
            <div className="mx-auto w-fit rounded-full border-[3px] border-vino px-10 py-3">
              <h2 className="display text-4xl md:text-5xl">Menú Fino</h2>
            </div>

            {/* hamburguesas */}
            <h3 className="display mt-12 text-3xl md:text-4xl">Hamburguesas</h3>
            <div className="mt-6 flex flex-col gap-7">
              {hamburguesas.map((item) => (
                <MenuRow key={item.name} {...item} />
              ))}
            </div>

            {/* bloque especiales, invertido como en la carta */}
            <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
              <Mascot className="mx-auto h-36 w-36 text-vino md:h-44 md:w-44" />
              <div className="rounded-3xl bg-vino p-7 text-crema md:p-9">
                {especiales.map((item, i) => (
                  <div key={item.name} className={i > 0 ? "mt-7" : ""}>
                    <div className="flex items-baseline justify-center gap-3">
                      <h4 className="display text-2xl">{item.name}</h4>
                      <span aria-hidden="true">★</span>
                      <span className="display text-2xl">{item.price}</span>
                    </div>
                    <p className="mt-2 text-center text-sm leading-relaxed opacity-90">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* clásicas por tamaño */}
            <div className="mt-12 overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-2 text-center">
                <thead>
                  <tr className="text-[0.6rem] font-bold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]">
                    <th className="text-left" scope="col">
                      <span className="sr-only">Clásicas</span>
                    </th>
                    <th scope="col">Simple</th>
                    <th scope="col">Doble</th>
                    <th scope="col">Triple</th>
                  </tr>
                </thead>
                <tbody>
                  {clasicas.map((item) => (
                    <tr key={item.name}>
                      <th scope="row" className="display border-y-2 border-vino py-2 text-left text-base sm:text-xl">
                        {item.name}
                      </th>
                      <td className="display border-y-2 border-vino py-2 text-base sm:text-xl">{item.prices.simple}</td>
                      <td className="display border-y-2 border-vino py-2 text-base sm:text-xl">{item.prices.doble}</td>
                      <td className="display border-y-2 border-vino py-2 text-base sm:text-xl">{item.prices.triple}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-10 text-center text-sm font-bold uppercase tracking-wide">
              {notaMenu}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
