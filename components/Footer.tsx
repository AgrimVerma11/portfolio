import Link from "next/link";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiSubstack } from "react-icons/si";
import Logo from "@/components/Logo";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-primary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-12">
        <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo className="h-7 w-7" />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${link.href}`}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href={site.substack}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Substack"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              <SiSubstack className="h-4 w-4" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="text-center font-mono text-xs text-text-secondary/70">
          © 2026 Agrim Verma · Built with Next.js &amp; a lot of coffee ☕
        </p>
      </div>
    </footer>
  );
}
