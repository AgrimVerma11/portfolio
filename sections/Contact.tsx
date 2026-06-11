"use client";

import { useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { SiSubstack } from "react-icons/si";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { site } from "@/lib/site";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const inputClasses =
  "w-full rounded-lg border border-white/10 bg-bg-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 focus:border-accent-primary focus:shadow-[0_0_20px_rgba(108,99,255,0.25)] focus:outline-none";

const DIRECT_LINKS = [
  {
    icon: FiMail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: `github.com/${site.githubHandle}`,
    href: site.github,
  },
  {
    icon: SiSubstack,
    label: "Substack",
    value: "agrimverma.substack.com",
    href: site.substack,
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: site.linkedin,
  },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No Formspree ID configured → graceful mailto fallback
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio contact from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="grain relative overflow-hidden bg-bg-primary">
      {/* ambient orb */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent-primary/10 blur-[140px] motion-safe:animate-orb-drift"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
        <SectionHeader label="contact" title="Let's Build Something." />
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-lg text-text-secondary">
            Open to internships, full-time roles, collaborations, and good
            conversations.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          {/* Form */}
          <Reveal delay={0.15}>
            <form onSubmit={onSubmit} className="space-y-5" aria-label="Contact form">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-text-secondary">
                    NAME
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Stephen Hawking"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-text-secondary">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="stephen@quantum.physicist"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-text-secondary">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the thing you want to build."
                  className={`${inputClasses} resize-y`}
                />
              </div>
              <Magnetic strength={0.25}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_36px_rgba(108,99,255,0.5)] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  <FiSend />
                </button>
              </Magnetic>
              <p aria-live="polite" className="min-h-5 font-mono text-xs">
                {status === "sent" && (
                  <span className="text-accent-cyan">Message sent — I&apos;ll get back to you soon.</span>
                )}
                {status === "error" && (
                  <span className="text-accent-warm">
                    Something broke. Email me directly at {site.email}.
                  </span>
                )}
              </p>
            </form>
          </Reveal>

          {/* Direct links */}
          <Reveal delay={0.25}>
            <ul className="space-y-4">
              {DIRECT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-white/5 bg-bg-secondary/60 px-5 py-4 transition-all duration-300 hover:border-accent-primary/30 hover:bg-bg-surface"
                    >
                      <Icon className="h-5 w-5 text-text-secondary transition-colors duration-300 group-hover:text-accent-primary" />
                      <span>
                        <span className="block font-mono text-xs text-text-muted">
                          {link.label.toUpperCase()}
                        </span>
                        <span className="text-sm text-text-primary">{link.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
