"use client";

import { useState } from "react";
import { nav, site } from "@/data/site";
import { Mascot } from "./Mascot";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex h-16 items-center justify-between rounded-full border-2 border-vino bg-crema/95 px-5 backdrop-blur-sm">
          <a href="#top" className="flex items-center gap-2" aria-label="FINO, inicio">
            <span className="display text-2xl leading-none">FIN</span>
            <span className="relative -ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-vino">
              <Mascot className="absolute -top-4 left-1 h-6 w-6" />
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-wide transition-opacity duration-200 hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable rounded-full bg-vino px-5 py-2 text-sm font-bold uppercase tracking-wide text-crema transition-colors duration-200 hover:bg-vino-deep"
            >
              {site.instagramHandle}
            </a>
          </nav>

          <button
            type="button"
            className="pressable relative flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            <span
              className={`absolute h-0.5 w-6 bg-vino transition-transform duration-300 ease-[var(--ease-fino)] ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-vino transition-transform duration-300 ease-[var(--ease-fino)] ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-3xl border-2 border-vino bg-crema p-6 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Principal móvil">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display text-3xl"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable mt-2 rounded-full bg-vino px-5 py-3 text-center font-bold uppercase tracking-wide text-crema"
            >
              Seguinos en Instagram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
