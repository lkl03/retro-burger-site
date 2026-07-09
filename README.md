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

- `data/menu.ts`: hamburguesas, especiales, clásicas por tamaño, nota sin TACC. Editar nombre/descripción/precio y listo. Precios tomados de la carta publicada (confirmar vigentes antes de cada actualización).
- `data/promos.ts`: tarjetas de avisos (título, texto, badge, tono de color). Regla: solo avisos reales o neutrales; no inventar promos que no estén confirmadas en @fino_arg.
- `data/site.ts`: nombre, bio, link de Instagram, dirección (Moldes 880, C1426 CABA), horarios, y las URLs de Google Maps (`mapsEmbed`, `mapsUrl`, `reviewsUrl`).

### Copy

El tono del sitio es corto, real y porteño: sin lore inventado, sin promos falsas, sin personificar la mascota. La mascota es un recurso gráfico, nada más. Cualquier claim nuevo debe salir del Instagram real (@fino_arg) o del local.

### Sección Instagram (`components/Gallery.tsx`)

Grilla estática de 4 posts que linkea a @fino_arg. Las imágenes son placeholders de picsum: reemplazar cada `src` por fotos reales exportadas del feed (guardarlas en `public/instagram/`). Las captions son neutrales ("Menú FINO", "Local", etc.); usar captions reales solo si se copian textuales de los posts. Para un feed sincronizado automático, se puede embeber un widget tipo Elfsight/Behold en esa sección.

### Google Maps y reseñas (`components/Contact.tsx`)

- El mapa es un iframe de Google Maps **sin API key** apuntando a la dirección (`site.mapsEmbed`). Si el cliente comparte el Place ID del negocio, conviene reemplazarlo por el embed con el pin oficial del local.
- El bloque "Reseñas" no muestra reseñas inventadas: es un CTA que abre las reseñas reales en Google (`site.reviewsUrl`). Si más adelante se copian reseñas reales del perfil de Google, agregarlas con nombre/fecha textuales.

### Placeholders pendientes de confirmar con el cliente

- Fotos reales para la sección Instagram (hoy picsum).
- Precios vigentes del menú.
- Horarios (hoy tomados de prensa, may 2026: todos los días 12:00–15:30 y 19:00–23:30).
- WhatsApp del local (no se publica ninguno hasta tener el real; el CTA actual es Instagram).
- Place ID de Google del negocio para el pin exacto del mapa y reseñas embebidas.

## Deploy

Deployado en Vercel. Cada push a `main` redeploya. Para deploy manual: `npx vercel --prod`.
