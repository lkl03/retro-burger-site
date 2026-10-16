# Changelog

## 0.3.0 · 2026-10-16

- **Paseo por el local con el scroll** (motor scroll-walk, `components/ScrollWalk.tsx` + `lib/scroll-walk.js`): reemplaza al hero. 4 paradas (entrada con la pared FINO → barra con el menú → pared "Es hora de ponernos finos" → la Fino) unidas por 3 clips. El scroll fija el `currentTime` del vídeo, hacia adelante y hacia atrás.
- Clips generados con Google Flow (Veo 3.1 Fast, 60 créditos de Flow) desde fotos reales del local publicadas en Google Maps. Fotos verticales con relleno desenfocado a 16:9. Clip 2 y 3 retocados en local (inicio del 3 sin letterbox, finales fundidos al keyframe exacto): ver `media/scroll-walk/patch_*.py`. Aviso en pantalla: "Recorrido animado con IA a partir de fotos reales del local".
- **Instagram**: grilla de 8 posts reales de @fino_arg (fotos en `public/ig/`, captions textuales) con título "Fino es ser fino" (lema real de la cuenta). Feed en vivo opcional con `NEXT_PUBLIC_ELFSIGHT_IG_APP`.
- **Dónde estamos** rehecho al estilo HKS: lista de datos con íconos (dirección + referencia del parque, horarios, Instagram, sin TACC), mapa grande y tarjeta del perfil de Google con rating real (4,7 · 1.436 reseñas, verificado 2026-10-16).
- Nav fija; se quitaron Hero, La casa y la galería con placeholders. Tabla de clásicas entra en 390 px sin scroll horizontal.

## 0.2.0 · 2026-07-09

- Copy realineado a la marca real: se eliminó todo el lore inventado ("la jefa", "jefa espiritual", "la pared de la jefa", "burger que se cree fina") y las promos ficticias (partido, martes de cheeseburger). La mascota queda como recurso gráfico.
- Dirección real: Moldes 880, C1426 CABA (Colegiales). Horarios tomados de prensa (may 2026) con nota "Horarios actualizados en Instagram".
- Se quitó el WhatsApp placeholder: todos los CTAs de contacto apuntan a Instagram (@fino_arg) hasta tener el número real.
- Nueva sección Instagram: grilla de 4 posts con marcos de póster, captions neutrales, CTA con branding a @fino_arg y comentarios en código para reemplazo por assets reales.
- Nueva sección "Dónde estamos": Google Maps embebido (sin API key) en marco de póster, horarios, CTA "Cómo llegar" y bloque de Reseñas con CTA "Mirá las reseñas en Google" (sin reseñas inventadas).
- Metadata y marquee actualizados con Colegiales / Moldes 880.

## 0.1.0 · 2026-07-07

- Sitio inicial de FINO: hero con wordmark y mascota, marquee, menú-póster (carta real de Instagram), sección de casa, avisos estilo historia, galería con marcos, contacto/horarios y footer con wordmark gigante.
- Sistema de tokens de marca (vino/crema/cielo/manteca) y utilidades custom (checkerboard, poster-frame, sticker, grain).
- SEO + Open Graph en español, favicon FINO.
- Contenido editable en `data/` (menú, promos, links, horarios).
