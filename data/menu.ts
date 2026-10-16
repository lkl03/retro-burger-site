export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type SizedItem = {
  name: string;
  prices: { simple: string; doble: string; triple: string };
};

export type PriceLine = { name: string; note?: string; price: string };

// Carta textual de la pantalla de la barra (fotos del local en Google Maps y
// la carta publicada por FINO, revisadas el 2026-10-16). Confirmar precios
// vigentes con el local antes de cada actualización.
export const hamburguesas: MenuItem[] = [
  {
    name: "Fino",
    description: "Doble carne, cheddar, pepinillos, cebolla brunoise marcada, salsa fino.",
    price: "$13.500",
  },
  {
    name: "Crispino",
    description: "Doble carne, cheddar, bacon, cebolla crispy, pepinillos, salsa lula.",
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
    description: "Pan de sésamo, medallón 220grs, cheddar, tomate, lechuga, cebolla morada, mayo heinz.",
    price: "$15.500",
  },
  {
    name: "Papas Finas",
    description: "Popcorns de papa con queso y hierbas + mayo pesto.",
    price: "$7.500",
  },
];

export const clasicas: SizedItem[] = [
  { name: "Cheeseburger", prices: { simple: "$8.500", doble: "$12.500", triple: "$15.500" } },
  { name: "Cheesebacon", prices: { simple: "$9.500", doble: "$13.500", triple: "$16.500" } },
];

export const sides: PriceLine[] = [
  { name: "Papas fritas", price: "$3.500" },
  { name: "Fried pickles", note: "+ Salsa Fino", price: "$5.000" },
  { name: "Nuggets (x6)", note: "+ Salsa Ranch", price: "$5.500" },
];

export const milkshakes: PriceLine[] = [
  { name: "Cheesecake", price: "$8.000" },
  { name: "Oreo", price: "$8.000" },
  { name: "Chocotorta", price: "$8.000" },
];

export const dips = { label: "Elegí entre Fino, Lula o Ranch", price: "$1.500" };

export const bebidas: { title: string; items: PriceLine[] }[] = [
  {
    title: "Sin alcohol",
    items: [
      { name: "Gaseosa (Línea Coca)", price: "$3.500" },
      { name: "Agua mineral", price: "$3.500" },
    ],
  },
  {
    title: "Con alcohol",
    items: [
      { name: "Cerveza Corona", price: "$6.000" },
      { name: "Cerveza Peroni", price: "$6.000" },
    ],
  },
];

export const notaMenu = "*Disponible opción pan sin TACC";

// Fuera de carta: la burger por tiempo limitado se anuncia en Instagram.
export const fueraDeCarta = {
  label: "Por tiempo limitado: la del momento está en Instagram",
  href: "https://www.instagram.com/reel/DeFtbE2hgkQ/",
};
