import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Marquee } from "@/components/Marquee";
import { MenuBoard } from "@/components/MenuBoard";
import { Nav } from "@/components/Nav";
import { Promos } from "@/components/Promos";
import { ScrollWalk } from "@/components/ScrollWalk";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="top">
        <ScrollWalk />
        <Marquee />
        <MenuBoard />
        <Promos />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
