import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Timeline from "@/sections/Timeline";
import Interlude from "@/sections/Interlude";
import Writing from "@/sections/Writing";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Interlude />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
