import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { ScrollWalk } from "@/components/ScrollWalk";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ScrollWalk />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
