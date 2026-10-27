export const site = {
  name: "Agrim Verma",
  title: "Agrim Verma | Full Stack & ML Engineer",
  description:
    "Portfolio of Agrim Verma, full-stack engineer and ML developer at TIET. Builds production web platforms and explainable ML systems; AI/ML Mentor at GDG.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://agrimverma.dev",
  email: "agrim.works@gmail.com",
  phone: "+91 88470 46566",
  phoneHref: "+918847046566",
  github: "https://github.com/AgrimVerma11",
  githubHandle: "AgrimVerma11",
  substack: "https://agrimverma.substack.com",
  linkedin: "https://www.linkedin.com/in/agrimverma11/",
  alotus: "https://alotusinthemud.com/author/verma-agrim/",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

/** mailto link that opens a pre-filled "request a demo" email for a project. */
export function demoRequestHref(projectTitle: string) {
  const subject = encodeURIComponent(`Demo request: ${projectTitle}`);
  const body = encodeURIComponent(
    `Hi Agrim,\n\nI'd like to see a demo of ${projectTitle}.\n\nName:\nOrganisation:\nPreferred time:\n`
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}
