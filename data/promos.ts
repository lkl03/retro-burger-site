export type Promo = {
  title: string;
  body: string;
  badge: string;
  tone: "cielo" | "vino" | "crema";
};

// Avisos de la casa. Solo datos reales o neutrales.
// Reemplazar/agregar promos únicamente cuando estén confirmadas en @fino_arg.
export const promos: Promo[] = [
  {
    title: "Pan sin TACC, siempre",
    body: "Cualquier burger de la carta sale con pan sin TACC si lo pedís. Avisanos al ordenar.",
    badge: "Dato",
    tone: "vino",
  },
  {
    title: "Mediodía y noche",
    body: "Abrimos todos los días de 12:00 a 15:30 y de 19:00 a 23:30. Cambios de horario se avisan en Instagram.",
    badge: "Horarios",
    tone: "cielo",
  },
  {
    title: "Novedades en Instagram",
    body: "Lanzamientos, promos y avisos del local salen primero en @fino_arg. Seguinos para no perderte nada.",
    badge: "Aviso",
    tone: "crema",
  },
];
