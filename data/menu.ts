export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type SizedItem = {
  name: string;
  prices: { simple: string; doble: string; triple: string };
};

// Precios tomados de la carta publicada en Instagram (jun 2026).
// PLACEHOLDER: confirmar precios vigentes antes de publicar.
export const hamburguesas: MenuItem[] = [
  {
    name: "Fino",
    description:
      "Doble carne, cheddar, pepinillos, cebolla brunoise marcada, salsa fino.",
    price: "$13.500",
  },
  {
    name: "Crispino",
    description:
      "Doble carne, cheddar, bacon, cebolla crispy, pepinillos, salsa lula.",
    price: "$14.500",
  },
  {
    name: "Veggie",
    description:
      "Medallón de portobellos rebozados relleno de variedad de quesos, tomate, lechuga y salsa mil islas.",
    price: "$16.500",
  },
];

export const especiales: MenuItem[] = [
  {
    name: "Josefina",
    description:
      "Pan de sésamo, medallón 220 grs, cheddar, tomate, lechuga, cebolla morada, mayo heinz.",
    price: "$15.500",
  },
  {
    name: "Papas Finas",
    description: "Popcorns de papa con queso y hierbas + mayo pesto.",
    price: "$7.500",
  },
];

export const clasicas: SizedItem[] = [
  {
    name: "Cheeseburger",
    prices: { simple: "$8.500", doble: "$12.500", triple: "$15.500" },
  },
  {
    name: "Cheesebacon",
    prices: { simple: "$9.500", doble: "$13.500", triple: "$16.500" },
  },
];

export const notaMenu = "*Disponible opción pan sin TACC";
