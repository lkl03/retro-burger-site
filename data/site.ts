export const site = {
  name: "FINO",
  tagline: "Hamburguesas finas, cero vueltas.",
  description:
    "FINO es una hamburguesería en Colegiales, Buenos Aires. Carta corta, smash burgers y opción de pan sin TACC. Moldes 880, CABA.",
  url: "https://retro-burger-site.vercel.app",
  instagram: "https://www.instagram.com/fino_arg",
  instagramHandle: "@fino_arg",
  address: "Moldes 880, C1426 Ciudad Autónoma de Buenos Aires",
  neighborhood: "Colegiales",
  // Horarios publicados en prensa (Canal 26, may 2026). Confirmar cambios en Instagram.
  hours: [
    { days: "Todos los días", time: "12:00 – 15:30" },
    { days: "", time: "19:00 – 23:30" },
  ],
  hoursNote: "Horarios actualizados en Instagram",
  // Embed de Google Maps sin API key (query directa a la dirección).
  mapsEmbed:
    "https://www.google.com/maps?q=Moldes+880,+C1426+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&output=embed",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=FINO+Moldes+880+Ciudad+Aut%C3%B3noma+de+Buenos+Aires",
  // Link directo a las reseñas del local en Google Maps (búsqueda del negocio).
  reviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=FINO+hamburgueser%C3%ADa+Moldes+880+CABA",
};

export const nav = [
  { label: "Menú", href: "#menu" },
  { label: "La casa", href: "#casa" },
  { label: "Avisos", href: "#avisos" },
  { label: "Instagram", href: "#instagram" },
  { label: "Dónde", href: "#donde" },
];
