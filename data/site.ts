export const site = {
  name: "FINO",
  tagline: "Es hora de ponernos finos.",
  description:
    "FINO, hamburguesería en Moldes 880, Colegiales. Menú, horarios, cómo llegar y lo último de @fino_arg. Todos los días, mediodía y noche.",
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

// Posts más recientes de @fino_arg al 2026-10-16 (fotos en public/ig/, captions
// textuales recortadas). Para un feed en vivo ver NEXT_PUBLIC_ELFSIGHT_IG_APP en
// components/Socials.tsx.
export const igPosts = [
  { code: "DbRWDDgh7Qa", kind: "reel", caption: "quién es la abuela del logo de fino? 🧐 misterio develado" },
  { code: "DeiFUViFTkL", kind: "p", caption: "extrañamos el solcito para disfrutar en la plaza de al lado de fino 🍔" },
  { code: "DeaTKWqurPH", kind: "reel", caption: "buscando una nueva hamburguesa para fino. la ponemos en el menú? 🍔🤠" },
  { code: "DeQAzxnuqFd", kind: "reel", caption: "nueva hamburguesa en fino por tiempo limitadoooo, vengan a probarla 🍔" },
  { code: "DeFtbE2hgkQ", kind: "reel", caption: "encontramos la mantequita. veni a probarla 🧈❤️" },
  { code: "Dd7VOvJhnRG", kind: "p", caption: "quién fue el culpable de esta mordida?" },
  { code: "DdzsV5XOeHW", kind: "reel", caption: "cumplimos sueño! nos vemos en el burgerpalusa ❤️🍔" },
  { code: "DdsAPyNlZCm", kind: "p", caption: "nuestro lema de fino ❤️" },
  { code: "Ddm03PAu-kf", kind: "reel", caption: "cosas que pensamos que iban a salir de una manera y salieron de otra 🤔" },
  { code: "DdUyWRVu29c", kind: "reel", caption: "el día de la cheeseburger 🍔 simples, dobles y triples" },
  { code: "DdH4sgyOcBD", kind: "reel", caption: "seguimos mejorando día a día ❤️" },
  { code: "DczQ3uMOUQp", kind: "reel", caption: "una sorpresa en fino 😯" },
] as const;

// Reseñas reales del perfil de Google (textuales, recortadas como las muestra
// Google; fechas relativas al 2026-10-16). Actualizar a mano.
export const reviews = [
  {
    author: "Federico Tokman",
    when: "hace 3 meses",
    text: "De lo más rico que probé! Muy buena variedad e increíble la calidad de los productos. Muy buena onda también de todo el personal y Lula y Rama son los número 1.",
  },
  {
    author: "Daniela Luján Herrero",
    when: "hace 2 meses",
    text: "Exquisitas estas hamburguesas al igual que las papas fritas, son abundantes y están muy bien condimentadas. El lugar también es amplio y está muy bien decorado…",
  },
  {
    author: "Agostina Déborah Nuñez",
    when: "hace 3 meses",
    text: "Destacamos el servicio de Santiago quien nos ayudó a acomodarnos en la mesa, muy servicial y dispuesto. La comida excelente, hace rato no probábamos una hamburguesa tan rica…",
  },
] as const;

// Datos del perfil de Google (Maps: "Consumo en el lugar · Para llevar") y de la carta.
export const perks = [
  "Abierto todos los días",
  "Mediodía y noche",
  "Para comer acá o llevar",
  "Opción sin TACC",
  "Milkshakes",
  "Al lado de la plaza",
];

export const nav = [
  { label: "Nuestro menú", href: "#menu" },
  { label: "Dónde estamos", href: "#donde" },
];
export const navCta = { label: "Seguinos en redes", href: "#redes" };
