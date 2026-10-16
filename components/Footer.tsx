import { nav, navCta, site } from "@/data/site";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const street = site.address.split(",")[0];

  return (
    <footer className="bg-crema text-vino">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#inicio" aria-label="FINO, volver arriba" className="inline-block">
            <Logo className="h-24 w-auto md:h-28" title="FINO" />
          </a>
          <p className="mt-5 text-sm font-semibold uppercase tracking-wide">
            {street} · {site.neighborhood}, CABA
          </p>
          <p className="mt-1 text-sm text-tinta/70">Todos los días · {site.hours.map((h) => h.time).join("  ·  ")}</p>
        </div>

        <div className="flex flex-col items-start gap-6 md:items-end">
          <nav aria-label="Pie" className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold uppercase tracking-wide">
            {[...nav, navCta].map((n) => (
              <a key={n.href} href={n.href} className="link-line">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#inicio" className="btn btn-solid btn-solid--vino">
            Volver arriba <Icon.Arrow className="-rotate-45" />
          </a>
        </div>
      </div>

      {/* eterlab credit */}
      <div className="bg-[#212121]">
        <div className="mx-auto max-w-6xl px-4 py-2.5">
          <p className="text-center text-xs text-white/80">
            ©{year} | diseñado y desarrollado por{" "}
            <a href="https://eterlab.co/" target="_blank" rel="noopener noreferrer" className="italic text-white/90 transition-colors hover:text-white">
              eterlab.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
