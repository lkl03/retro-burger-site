export type Promo = {
  title: string;
  body: string;
  badge: string;
  tone: "cielo" | "vino" | "crema";
};

// Avisos estilo historia de Instagram. Editar libremente.
export const promos: Promo[] = [
  {
    title: "Horario especial por el partido",
    body: "Juega la selección: abrimos antes y cerramos cuando termine el festejo. Vení a ver el partido con una doble en la mano.",
    badge: "Aviso",
    tone: "cielo",
  },
  {
    title: "Martes de Cheeseburger",
    body: "Todos los martes, la cheeseburger doble a precio de simple. Sin letra chica, sin app, en el mostrador.",
    badge: "Promo",
    tone: "vino",
  },
  {
    title: "Pan sin TACC, siempre",
    body: "Cualquier burger de la carta sale con pan sin TACC si lo pedís. Avisanos al ordenar.",
    badge: "Dato",
    tone: "crema",
  },
];
