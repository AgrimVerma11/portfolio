export const site = {
  name: "Agrim Verma",
  title: "Agrim Verma — Full Stack Engineer & ML Developer",
  description:
    "Final-year Computer Engineering student at TIET building at the intersection of full-stack web and machine learning. AI/ML Mentor at Google Developer Groups TIET, open-source contributor, occasional writer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "masteragrim11@gmail.com",
  github: "https://github.com/AgrimVerma11",
  githubHandle: "AgrimVerma11",
  substack: "https://agrimverma.substack.com",
  linkedin: "https://www.linkedin.com/in/agrim-verma", // placeholder — update with real profile
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;
