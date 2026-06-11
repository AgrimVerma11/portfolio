import fs from "fs";
import path from "path";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const PORTRAIT_PATH = path.join(process.cwd(), "public", "portrait.png");

/**
 * A quiet, cinematic pause between the timeline and the writing section:
 * side-profile portrait dissolving into the dark, beside a single thought.
 *
 * Renders nothing until `public/portrait.png` exists (background-removed,
 * side profile facing right) — checked at build time, so adding the file
 * and rebuilding is all it takes.
 */
export default function Interlude() {
  if (!fs.existsSync(PORTRAIT_PATH)) return null;

  return (
    <section className="grain relative overflow-hidden py-12 sm:py-16" aria-label="Interlude">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Portrait — melts into the background, lit by the palette */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 mx-auto h-3/4 w-3/4 rounded-full bg-accent-primary/15 blur-[100px] motion-safe:animate-orb-drift"
            />
            <div
              className="relative aspect-[4/5]"
              style={{
                maskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
              }}
            >
              <Image
                src="/portrait.png"
                alt="Agrim Verma — side profile, deep in thought"
                fill
                sizes="(min-width: 1024px) 384px, 70vw"
                className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(108,99,255,0.22)]"
              />
              {/* duotone pull toward the palette */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-accent-primary/25 via-transparent to-accent-cyan/10 mix-blend-soft-light"
              />
            </div>
          </div>
        </Reveal>

        {/* The thought */}
        <Reveal delay={0.15}>
          <blockquote>
            <p className="max-w-md font-serif text-3xl italic leading-snug text-text-primary sm:text-4xl">
              &ldquo;The best systems are quiet — they hold complexity the way
              still water holds the sky.&rdquo;
            </p>
            <footer className="mt-7 font-mono text-sm text-text-secondary">
              <span className="text-text-muted">{"//"}</span> notes from between
              compile times
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
