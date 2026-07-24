export const site = {
  name: "Agrim Verma",
  title: "Agrim Verma | Full Stack & ML Engineer",
  description:
    "Portfolio of Agrim Verma, full-stack engineer and ML developer at TIET. Builds production web platforms and explainable ML systems; AI/ML Mentor at GDG.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://agrimverma.dev",
  email: "masteragrim11@gmail.com",
  phone: "+91 88470 46566",
  phoneHref: "+918847046566",
  github: "https://github.com/AgrimVerma11",
  githubHandle: "AgrimVerma11",
  substack: "https://agrimverma.substack.com",
  linkedin: "https://www.linkedin.com/in/agrimverma11/",
  /** Static file under /public: replace the PDF at this exact path to update it, nothing else to touch. */
  resume: "/resume.pdf",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;
