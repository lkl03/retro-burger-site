import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "FINO · Es hora de ponernos finos",
    template: "%s · FINO",
  },
  description: site.description,
  keywords: [
    "hamburguesería",
    "burgers",
    "Colegiales",
    "Buenos Aires",
    "FINO",
    "Moldes 880",
  ],
  openGraph: {
    title: "FINO · Es hora de ponernos finos",
    description: site.description,
    url: site.url,
    siteName: "FINO",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FINO · Es hora de ponernos finos",
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${anton.variable} ${archivo.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
