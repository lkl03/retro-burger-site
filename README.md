# FINO · retro-burger-site

Sitio de marca para FINO, hamburguesería de Buenos Aires. Traduce la identidad de su Instagram (póster de menú, mascota de rulos, checkerboard, tipografía condensada) a un sitio web moderno.

## Stack

- **Next.js (App Router) + TypeScript**: server components por defecto, metadata/OG integrado, deploy directo a Vercel. Es una página de marca estática, así que casi todo se renderiza en el servidor; solo la nav y el scroll-reveal son client components.
- **Tailwind CSS v4**: tokens de marca definidos en `@theme` dentro de `app/globals.css`, más utilidades custom (`.checker`, `.poster-frame`, `.menu-leader`, `.sticker`, `.grain`).
- **next/font (Google Fonts)**: `Anton` (display condensada, espíritu del wordmark) + `Archivo` (texto).

## Dirección de diseño

- Retro fast-food / diner, ejecución moderna: papel crema, vino profundo, grain de impresión sutil.
- El menú es un póster: marco redondeado con borde fino, líneas punteadas hacia el precio, bloque invertido de especiales, tabla simple/doble/triple. Réplica estructural de la carta real publicada en Instagram.
- La mascota (señora de rulos con anteojos) aparece como sello SVG en logo, hero, menú, promos y footer.
- Acentos celeste/manteca tomados de las historias ("horario especial por el partido") solo en la sección de avisos.

### Paleta (tokens en `globals.css`)

| Token | Hex | Uso |
| --- | --- | --- |
| `vino` | `#641423` | Color principal de marca |
| `vino-deep` | `#470d18` | Fondos oscuros, footer |
| `vino-soft` | `#8c2b36` | Acentos tipográficos |
| `crema` | `#f3ead8` | Fondo base |
| `crema-warm` | `#ece0c8` | Superficies secundarias |
| `cielo` | `#8aa9dd` | Acento historia (avisos) |
| `manteca` | `#f5ce84` | Acento historia (stickers) |
| `tinta` | `#26141a` | Texto de lectura |

## Correr localmente

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Editar contenido

Todo el contenido vive en `data/`:

- `data/menu.ts`: hamburguesas, especiales, clásicas por tamaño, nota sin TACC. Editar nombre/descripción/precio y listo.
- `data/promos.ts`: tarjetas de avisos (título, texto, badge, tono de color).
- `data/site.ts`: nombre, bio, links de Instagram/WhatsApp, dirección y horarios (los marcados `PLACEHOLDER` deben reemplazarse con datos reales).

Las fotos de la galería (`components/Gallery.tsx`) usan placeholders de picsum; reemplazar por fotos reales del local.

## Deploy

Deployado en Vercel. Cada push a `main` redeploya. Para deploy manual: `npx vercel --prod`.
