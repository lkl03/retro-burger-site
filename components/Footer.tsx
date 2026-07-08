import { site } from "@/data/site";
import { Mascot } from "./Mascot";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-vino-deep text-crema">
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-12 text-sm">
          <div className="flex items-center gap-3">
            <Mascot className="h-10 w-10" />
            <p className="font-semibold uppercase tracking-wide">
              Hamburguesas finas desde Buenos Aires
            </p>
          </div>
          <div className="flex gap-6 font-bold uppercase tracking-wide">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
            >
              Instagram
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-60"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* wordmark gigante cortado por el borde inferior, como la pared del local */}
        <p
          className="display -mb-[0.18em] text-center text-[clamp(6rem,24vw,20rem)] leading-none text-crema/95"
          aria-hidden="true"
        >
          FINO
        </p>
      </div>
      <div className="checker checker-sm h-5 w-full opacity-25 [--checker-c:#f3ead8]" aria-hidden="true" />
    </footer>
  );
}
