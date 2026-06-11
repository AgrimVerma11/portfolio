"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { FiGithub, FiMenu, FiX } from "react-icons/fi";
import Logo from "@/components/Logo";
import Magnetic from "@/components/Magnetic";
import { navLinks, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view.
  // Re-attached on every route change — the Navbar outlives the page, so a
  // mount-only observer would keep watching unmounted sections and freeze
  // the highlight on whatever was active when the user left the homepage.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (href: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (href.startsWith("#")) setActiveSection(href);
    if (href.startsWith("#") && window.location.pathname === "/") {
      e.preventDefault();
      if (lenis) lenis.scrollTo(href, { offset: -80 });
      else document.querySelector(href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <Link
          href="/#hero"
          onClick={goTo("#hero")}
          className="flex items-center gap-2"
          aria-label="Agrim Verma — home"
        >
          <Logo />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${link.href}`}
                onClick={goTo(link.href)}
                className={`group relative text-sm transition-colors duration-300 ${
                  activeSection === link.href
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {/* underline draws outward from center */}
                <span
                  className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-gradient-violet-cyan transition-all duration-300 ${
                    activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-text-secondary transition-colors duration-300 hover:text-text-primary"
          >
            <FiGithub className="h-5 w-5" />
          </a>
          <Magnetic strength={0.3}>
            <Link
              href="/#contact"
              onClick={goTo("#contact")}
              className="rounded-full border border-accent-primary/50 px-5 py-2 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent-primary hover:shadow-[0_0_24px_rgba(108,99,255,0.35)]"
            >
              Hire Me
            </Link>
          </Magnetic>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-text-primary md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg-primary/98 backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-text-primary"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-7">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/${link.href}`}
                    onClick={goTo(link.href)}
                    className="font-display text-3xl font-medium text-text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.07, duration: 0.5 }}
              >
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 font-mono text-sm text-text-secondary"
                >
                  <FiGithub /> @{site.githubHandle}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
