import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { ScrollWalk } from "@/components/ScrollWalk";
import { Socials } from "@/components/Socials";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ScrollWalk />
        <Socials />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
