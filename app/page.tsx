import fs from "fs";
// @ts-expect-error sharp's bundled types are hidden by its package "exports" map
import sharp from "sharp";
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
  sameAs: [site.github, site.linkedin, site.substack, site.alotus],
};

export default async function Home() {
  // Timeline photos activate as their files land in public/events
  const eventsDir = path.join(process.cwd(), "public", "events");
  const eventPhotos = fs.existsSync(eventsDir) ? fs.readdirSync(eventsDir) : [];

  // Tiny blurred previews so photos fade in from a soft placeholder instead of popping in
  const photoBlurs: Record<string, string> = {};
  await Promise.all(
    eventPhotos.map(async (file) => {
      try {
        const buf = await sharp(path.join(eventsDir, file)).resize(16).blur(1).jpeg({ quality: 50 }).toBuffer();
        photoBlurs[file] = `data:image/jpeg;base64,${buf.toString("base64")}`;
      } catch {
        /* non-image file: skip */
      }
    })
  );

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
        <Timeline availablePhotos={eventPhotos} photoBlurs={photoBlurs} />
        <Interlude />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
