"use client";

import { useState } from "react";
import { nav, navCta } from "@/data/site";
import { Logo } from "./Logo";

// Oculta en el hero; aparece desde la segunda parada del paseo (html[data-nav], ver ScrollWalk).
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex h-[4.5rem] items-center justify-between rounded-full border-2 border-vino bg-crema/95 pl-6 pr-3 backdrop-blur-sm">
          <a href="#inicio" className="flex items-center text-vino" aria-label="FINO, inicio">
            <Logo className="h-14 w-auto" title="FINO" />
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-line text-sm font-bold uppercase tracking-wide text-vino">
                {item.label}
              </a>
            ))}
            <a href={navCta.href} className="btn btn-solid btn-solid--vino">
              {navCta.label}
            </a>
          </nav>

          <button
            type="button"
            className="pressable relative flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            <span className={`absolute h-0.5 w-6 bg-vino transition-transform duration-300 ease-[var(--ease-fino)] ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-6 bg-vino transition-transform duration-300 ease-[var(--ease-fino)] ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-3xl border-2 border-vino bg-crema p-6 text-vino md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Principal móvil">
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="display text-3xl">
                {item.label}
              </a>
            ))}
            <a href={navCta.href} onClick={() => setOpen(false)} className="btn btn-solid btn-solid--vino mt-2">
              {navCta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
