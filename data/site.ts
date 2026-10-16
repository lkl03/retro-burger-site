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
  // Perfil de Google del local (verificado en Google Maps el 2026-10-16).
  // Actualizar rating/count a mano cuando cambien.
  google: {
    rating: 4.7,
    count: 1436,
    priceRange: "$20.000–30.000 por persona",
    placeUrl: "https://maps.google.com/?cid=1851144590210726608",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=FINO+Moldes+880+Colegiales+CABA",
  },
  // El local está pegado al Parque Ferroviario Colegiales.
  landmark: "Al lado de la plaza del Parque Ferroviario Colegiales",
  motto: "Fino es ser fino",
  wallLine: "Es hora de ponernos finos",
};

// Posts reales de @fino_arg (fotos bajadas del feed el 2026-10-16, en public/ig/).
// Las captions son textuales del post, recortadas. Para un feed en vivo, ver
// NEXT_PUBLIC_ELFSIGHT_IG_APP en components/InstagramFeed.tsx.
export const igPosts = [
  { code: "DdsAPyNlZCm", kind: "p", caption: "nuestro lema de fino ❤️" },
  { code: "Dd7VOvJhnRG", kind: "p", caption: "quién fue el culpable de esta mordida?" },
  { code: "DeFtbE2hgkQ", kind: "reel", caption: "encontramos la mantequita. veni a probarla 🧈❤️" },
  { code: "DeiFUViFTkL", kind: "p", caption: "extrañamos el solcito para disfrutar en la plaza de al lado de fino 🍔" },
  { code: "DbRWDDgh7Qa", kind: "reel", caption: "quién es la abuela del logo de fino? 🧐 misterio develado" },
  { code: "DeQAzxnuqFd", kind: "reel", caption: "nueva hamburguesa en fino por tiempo limitadoooo 🍔" },
  { code: "DdH4sgyOcBD", kind: "reel", caption: "seguimos mejorando día a día ❤️" },
  { code: "DdzsV5XOeHW", kind: "reel", caption: "cumplimos sueño! nos vemos en el burgerpalusa ❤️🍔" },
] as const;

export const nav = [
  { label: "El local", href: "#paseo" },
  { label: "Menú", href: "#menu" },
  { label: "Avisos", href: "#avisos" },
  { label: "Instagram", href: "#instagram" },
  { label: "Dónde", href: "#donde" },
];
