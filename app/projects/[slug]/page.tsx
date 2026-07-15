import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import BrowserMock from "@/components/BrowserMock";
import Footer from "@/components/Footer";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const url = `${site.url}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.tagline,
    keywords: [project.title, ...project.tech, "Agrim Verma"],
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.tagline,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const narrative = [
    project.story.problem,
    project.story.approach,
    project.story.solution,
    project.story.outcome,
  ];

  return (
    <>
      <main className="mx-auto max-w-4xl px-6 pb-28 pt-32">
        <Reveal y={16}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <FiArrowLeft /> back to projects
          </Link>
        </Reveal>

        {/* Story hero */}
        <header className="mt-10">
          <p className="mb-3 font-mono text-sm tracking-wider text-accent-primary/80">
            <span className="text-text-muted">{"//"}</span> the build story
          </p>
          <SplitText
            as="h1"
            text={project.title}
            className="font-display text-5xl font-bold tracking-tight text-text-primary sm:text-6xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {project.tagline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(108,99,255,0.45)]"
              >
                <FiGithub /> View on GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent-cyan"
                >
                  Live site <FiArrowUpRight />
                </a>
              )}
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.25} className="mt-14">
          <BrowserMock />
        </Reveal>

        {/* Problem → Approach → Solution → Outcome */}
        <div className="mt-20 space-y-16">
          {narrative.map((section, i) => (
            <Reveal key={section.heading} delay={0.05}>
              <section>
                <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold text-text-primary sm:text-3xl">
                  <span className="font-mono text-sm text-accent-cyan">
                    0{i + 1}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((para, j) => (
                    <p key={j} className="leading-relaxed text-text-secondary">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Tech stack deep-dive */}
        <Reveal className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-text-primary sm:text-3xl">
            <span className="text-accent-primary">&lt;</span>Stack
            <span className="text-accent-primary"> /&gt;</span>
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Technologies used">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/10 bg-bg-secondary px-4 py-2 font-mono text-sm text-text-secondary"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Key architectural decisions */}
        <Reveal className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-text-primary sm:text-3xl">
            Key Architectural Decisions
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {project.story.decisions.map((decision, i) => (
            <Reveal key={decision.title} delay={0.05 + i * 0.07}>
              <article className="h-full rounded-xl border border-white/5 bg-bg-secondary p-6 transition-colors duration-300 hover:border-accent-primary/25">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {decision.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                  {decision.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
