import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Products />
        <Process />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
