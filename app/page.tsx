import fs from "fs";
import path from "path";
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
  // Timeline photos activate as their files land in public/events
  const eventsDir = path.join(process.cwd(), "public", "events");
  const eventPhotos = fs.existsSync(eventsDir) ? fs.readdirSync(eventsDir) : [];

  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline availablePhotos={eventPhotos} />
        <Interlude />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
