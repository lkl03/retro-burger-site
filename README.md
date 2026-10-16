# FINO · retro-burger-site

Sitio de marca para FINO, hamburguesería de Buenos Aires. Traduce la identidad de su Instagram (logo con la abuela de rulos, carta en formato póster, tipografía condensada) a un sitio web moderno.

## Stack

- **Next.js (App Router) + TypeScript**: server components por defecto, metadata/OG integrado, deploy directo a Vercel. Es una página de marca estática, así que casi todo se renderiza en el servidor; solo la nav y el scroll-reveal son client components.
- **Tailwind CSS v4**: tokens de marca definidos en `@theme` dentro de `app/globals.css`, más utilidades custom (`.menu-leader`, `.sticker`, `.fw-panel`, `.fw-in`).
- **next/font (Google Fonts)**: `Anton` (display condensada, espíritu del wordmark) + `Archivo` (texto).

## Dirección de diseño

- Retro fast-food / diner, ejecución moderna: papel crema, vino profundo, grain de impresión sutil.
- El menú es un póster: marco redondeado con borde fino, líneas punteadas hacia el precio, bloque invertido de especiales, tabla simple/doble/triple. Réplica estructural de la carta real publicada en Instagram.
- El logo oficial (`components/Logo.tsx`, un color con currentColor) va en nav, hero y footer. No dibujar versiones propias de la mascota.
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

- `data/menu.ts`: carta completa (hamburguesas, especiales, clásicas por tamaño, sides, milkshakes, dips, bebidas, nota sin TACC). Editar nombre/descripción/precio y listo. Precios tomados de la carta publicada (confirmar vigentes antes de cada actualización).
- `data/site.ts`: nombre, bio, link de Instagram, dirección (Moldes 880, C1426 CABA), horarios, y las URLs de Google Maps (`mapsEmbed`, `mapsUrl`, `reviewsUrl`).

### Copy

El tono del sitio es corto, real y porteño: sin lore inventado, sin promos falsas, sin personificar la mascota. La mascota es un recurso gráfico, nada más. Cualquier claim nuevo debe salir del Instagram real (@fino_arg) o del local.

### Paseo por el local (`components/ScrollWalk.tsx`)

Arriba de todo hay un "paseo con el scroll": un escenario fijo con 2 clips (`public/video/clip-k.mp4` y `-m` para móvil) que unen 3 paradas (`public/world/stop-i.webp`, frames reales del vídeo): hamburguesa (hero) → pared (menú) → barra (dónde estamos). Son los clips de Flow invertidos (`media/scroll-walk/clips-v2`). El motor es `lib/scroll-walk.js` (vanilla, sin dependencias; estilos en `app/scroll-walk.css` + tema `.fino-walk` en `globals.css`).

- **Contenido de cada parada**: hero en `ScrollWalk.tsx`; menú, dónde estamos e Instagram en `components/WalkPanels.tsx` (datos en `data/menu.ts` y `data/site.ts`).
- **Ritmo**: `--sw-stop-h` en `.fino-walk` y `hold` por parada (`STOPS` en `ScrollWalk.tsx` → `data-hold`).
- **Cómo se generó**: `media/scroll-walk/plan.json` (prompts por clip). Los clips son de Google Flow (Veo 3.1 Fast, 720p reescalado) a partir de fotos del local publicadas en Google Maps; es una **versión demo**. Para la versión final: fotos propias horizontales del dueño (5–8, en el orden en que se camina) y regenerar con la skill `/scroll-walk` en modo PRO; solo cambian `public/video` y `public/world`, no el código.
- Lo que la IA inventó (costados del salón en el clip 3, una hamburguesa intermedia) conviene que lo revise el dueño.

### Instagram (`components/Socials.tsx`)

Carrusel con 12 posts reales de @fino_arg: fotos en `public/ig/<code>.webp`, captions textuales recortadas en `data/site.ts` (`igPosts`). Para un feed que se actualice solo, crear un widget Instagram Feed en Elfsight conectado a @fino_arg y poner su id en `NEXT_PUBLIC_ELFSIGHT_IG_APP` (Vercel): reemplaza la grilla.

### Google Maps y reseñas (`ContactStop` en `components/WalkPanels.tsx`)

Las 3 reseñas son textuales del perfil de Google (`reviews` en `data/site.ts`).

- El mapa es un iframe de Google Maps **sin API key** apuntando a la dirección (`site.mapsEmbed`).
- La tarjeta de Google sobre el mapa muestra rating y cantidad de reseñas reales (`site.google`, verificados el 2026-10-16): actualizarlos a mano. No hay reseñas inventadas; "Leer reseñas" abre el perfil real (`?cid=`).

### Placeholders pendientes de confirmar con el cliente

- Fotos propias horizontales del local para la versión final del paseo (hoy: fotos de Google Maps).
- Precios vigentes del menú.
- Horarios (hoy tomados de prensa, may 2026: todos los días 12:00–15:30 y 19:00–23:30).
- WhatsApp del local (no se publica ninguno hasta tener el real; el CTA actual es Instagram).
- Place ID de Google del negocio para el pin exacto del mapa y reseñas embebidas.

## Deploy

Deployado en Vercel. Cada push a `main` redeploya. Para deploy manual: `npx vercel --prod`.
