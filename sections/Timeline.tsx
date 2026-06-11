"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import GdgLogo from "@/components/GdgLogo";

type EntryPhoto = {
  src: string;
  alt: string;
  /** object-position to keep faces in frame across crops */
  position?: string;
  /** aspect class override — matched to the photo's native ratio so it shows uncropped */
  aspect?: string;
};

const ENTRIES: {
  year: string;
  title: string;
  description: string;
  ongoing?: boolean;
  gdg?: boolean;
  photos?: EntryPhoto[];
}[] = [
  {
    year: "2026",
    title: "Final Year @ TIET",
    description: "Placement season, deep DSA grind, shipping projects.",
    ongoing: true,
  },
  {
    year: "Apr 2026",
    title: "GDG BuildSpace",
    description:
      "Organised the BuildSpace case competition at TIET, Patiala and sat on the judging panel for the final evaluation — 110+ teams from colleges across north and central India.",
    gdg: true,
    photos: [
      {
        src: "/events/buildspace-judging.jpg",
        alt: "Agrim on the BuildSpace judging panel during final evaluation",
        position: "50% 45%",
      },
      {
        src: "/events/buildspace-closeup.jpg",
        alt: "Agrim listening to a team's pitch at BuildSpace",
        position: "50% 28%",
      },
    ],
  },
  {
    year: "Feb 2026",
    title: "“Beyond the Code”",
    description:
      "Organised an interactive session with industry experts — Varun Singla (Gate Smashers), Raghav Chopra (Founder, Unstop), and more — at TIET, Patiala.",
    gdg: true,
    photos: [
      {
        src: "/events/beyond-the-code.jpg",
        alt: "Agrim with Varun Singla of Gate Smashers at Beyond the Code",
        aspect: "aspect-[3/4]",
      },
    ],
  },
  {
    year: "Nov 2025",
    title: "GDG SATHACK × Saturnalia",
    description:
      "Organised SATHACK in collaboration with Saturnalia, TIET's annual fest, and mentored teams participating from across India.",
    gdg: true,
    photos: [
      {
        src: "/events/sathack-mentoring.jpg",
        alt: "Agrim mentoring participating teams during the hackathon",
        aspect: "aspect-[3/2]",
      },
    ],
  },
  {
    year: "Nov 2025",
    title: "GDG DevFest, TIET Patiala",
    description:
      "Organised DevFest with 400+ attendees — designed the AI/ML bootcamp track and mentored students through it.",
    gdg: true,
    photos: [
      {
        src: "/events/devfest-speaking.jpg",
        alt: "Agrim teaching supervised learning at the DevFest AI/ML bootcamp",
        aspect: "aspect-[3/4]",
      },
    ],
  },
  {
    year: "2025",
    title: "Opportunity Quest Begins",
    description:
      "Noticed the gap between faculty and students — opportunities existed, but never reached the people they were meant for. Started configuring and designing Opportunity Quest.",
  },
  {
    year: "2025",
    title: "AI/ML Mentor @ GDG TIET",
    description:
      "Promoted to the Executive Board of Google Developer Groups TIET as AI/ML Mentor.",
    gdg: true,
  },
  {
    year: "2024",
    title: "Core Team @ GDG TIET",
    description:
      "Joined as a Core Team Member and led a 5-day ML workshop — 90+ participants, capped with a hands-on OCR project. Also stepped up as Head of the Editorial Board at SPIC MACAY TIET.",
    gdg: true,
    photos: [
      {
        src: "/events/ml-workshop.jpg",
        alt: "Agrim teaching Python fundamentals during the 5-day ML workshop",
        aspect: "aspect-[3/4]",
      },
    ],
  },
  {
    year: "2023",
    title: "Joined TIET, COE",
    description:
      "Computer Engineering begins — along with the Thapar Amateur Astronomers' Society and the SPIC MACAY TIET chapter.",
  },
];

type TimelineProps = {
  /** filenames present in public/events — photos render only once their file exists */
  availablePhotos?: string[];
};

export default function Timeline({ availablePhotos = [] }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // The spine draws itself as you scroll through the section
  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lineRef.current.style.transform = "scaleY(1)";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="journey" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeader label="journey" title="The Journey So Far" className="mb-16" />

      <div ref={containerRef} className="relative">
        {/* the spine */}
        <div
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-px bg-white/5 md:left-1/2"
        />
        <div
          ref={lineRef}
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-px md:left-1/2"
          style={{
            background:
              "linear-gradient(to bottom, #6C63FF, #00D4FF 60%, #E8A87C)",
            transform: "scaleY(0)",
            transformOrigin: "top center",
          }}
        />

        <ol className="space-y-10">
          {ENTRIES.map((entry, i) => {
            const left = i % 2 === 0;
            return (
              <li key={entry.year + entry.title} className="relative">
                {/* node dot on the spine */}
                <span
                  aria-hidden
                  className={`absolute left-4 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-bg-primary md:left-1/2 ${
                    entry.ongoing
                      ? "bg-accent-warm motion-safe:animate-pulse-dot"
                      : "bg-accent-primary"
                  }`}
                />
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                    left ? "" : "md:ml-[calc(50%+3rem)]"
                  }`}
                >
                  <Reveal x={left ? -36 : 36} y={0} delay={0.05}>
                    <article className="rounded-xl border border-white/5 bg-bg-secondary p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/25 hover:shadow-[0_8px_30px_rgba(8,8,16,0.5)]">
                      <span className="mb-2 inline-block rounded-full bg-bg-primary px-3 py-1 font-mono text-xs text-accent-cyan">
                        {entry.year}
                        {entry.ongoing && (
                          <span className="text-accent-warm"> · ongoing</span>
                        )}
                      </span>
                      <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-text-primary">
                        {entry.gdg && <GdgLogo className="h-3.5 w-7 shrink-0" />}
                        {entry.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                        {entry.description}
                      </p>
                      {(() => {
                        const photos = entry.photos?.filter((p) =>
                          availablePhotos.includes(p.src.split("/").pop() ?? "")
                        );
                        if (!photos || photos.length === 0) return null;
                        const pair = photos.length > 1;
                        return (
                          <div
                            className={`mt-4 grid gap-2 ${pair ? "grid-cols-2" : "grid-cols-1"}`}
                          >
                            {photos.map((photo) => (
                              <div
                                key={photo.src}
                                className={`group/photo relative overflow-hidden rounded-lg border border-white/5 ${
                                  photo.aspect ?? (pair ? "aspect-square" : "aspect-[16/10]")
                                }`}
                              >
                                <Image
                                  src={photo.src}
                                  alt={photo.alt}
                                  fill
                                  sizes={
                                    pair
                                      ? "(min-width: 768px) 220px, 40vw"
                                      : "(min-width: 768px) 440px, 80vw"
                                  }
                                  style={{ objectPosition: photo.position ?? "50% 50%" }}
                                  className="object-cover saturate-[.85] brightness-[.92] transition-all duration-500 group-hover/photo:scale-[1.03] group-hover/photo:brightness-100 group-hover/photo:saturate-100"
                                />
                                {/* fade the photo into the card so it doesn't sit on top of the dark UI */}
                                <div
                                  aria-hidden
                                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-secondary/45 via-transparent to-bg-secondary/10"
                                />
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </article>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
