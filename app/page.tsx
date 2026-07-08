import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { MenuBoard } from "@/components/MenuBoard";
import { Nav } from "@/components/Nav";
import { Promos } from "@/components/Promos";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <MenuBoard />
        <About />
        <Promos />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
