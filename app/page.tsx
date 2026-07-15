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
import { site } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Full Stack Developer & ML Engineer",
  alumniOf: "Thapar Institute of Engineering and Technology",
  sameAs: [site.github, site.linkedin, site.substack],
};

export default function Home() {
  // Timeline photos activate as their files land in public/events
  const eventsDir = path.join(process.cwd(), "public", "events");
  const eventPhotos = fs.existsSync(eventsDir) ? fs.readdirSync(eventsDir) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
