export type StorySection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  github: string;
  live?: string;
  featured: boolean;
  story: {
    problem: StorySection;
    approach: StorySection;
    solution: StorySection;
    outcome: StorySection;
    decisions: { title: string; detail: string }[];
  };
};

export const projects: Project[] = [
  {
    slug: "opportunity-quest",
    title: "Opportunity Quest",
    tagline:
      "A full-stack platform connecting students with opportunities — internships, hackathons, research, and more.",
    description:
      "A production-hardened MERN platform where students discover, filter, and track opportunities in one place — built with security and scalability as first-class concerns, not afterthoughts.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "REST API"],
    highlights: [
      "Production security hardening: env variables, CORS, httpOnly JWT cookies, rate limiting",
      "End-to-end opportunity discovery flow with auth and role-based access",
      "Clean RESTful architecture with scalability in mind",
    ],
    github: "https://github.com/AgrimVerma11",
    featured: true,
    story: {
      problem: {
        heading: "The Observation",
        body: [
          "In my third year I noticed a gap everyone lived with but nobody named: faculty and departments held opportunities — internships, research openings, hackathons — that rarely reached the students they were meant for. What did circulate moved through WhatsApp forwards, expired Google Forms, and word of mouth, and the good ones were usually found too late.",
          "Nobody asked me to fix this. The observation was mine, and so was the itch: this wasn't a content problem, it was an infrastructure problem. The opportunities existed — there was just no reliable, structured pipe between the people who had them and the people who needed them.",
        ],
      },
      approach: {
        heading: "The Approach",
        body: [
          "I designed Opportunity Quest as a single source of truth: a platform where opportunities are posted with structured metadata (type, deadline, eligibility), and students browse with real filters instead of scroll-and-pray.",
          "From day one I treated it as a production system rather than a class project. That meant designing the data model before writing routes, planning role-based access (students vs. posters/admins) up front, and treating security as part of the architecture rather than a final-week patch.",
        ],
      },
      solution: {
        heading: "The Solution",
        body: [
          "The result is a MERN application with a clean RESTful API layer. Authentication uses JWTs delivered via httpOnly cookies — keeping tokens out of localStorage and out of reach of XSS. CORS is locked to known origins, secrets live in environment variables, and rate limiting protects the auth endpoints from brute-force attempts.",
          "On the frontend, React handles the discovery flow: browsing, filtering, and viewing opportunity detail pages, with auth state managed cleanly across protected routes. The API is organized by resource with consistent error handling, making new opportunity types cheap to add.",
        ],
      },
      outcome: {
        heading: "The Outcome",
        body: [
          "A deployable, security-hardened platform that demonstrates the full lifecycle: schema design, API architecture, auth, and frontend state — plus the production concerns (rate limiting, cookie security, CORS policy) that separate a demo from a system.",
          "The codebase is structured so the next features — notifications, saved searches, posting workflows — slot into existing patterns instead of requiring rewrites.",
        ],
      },
      decisions: [
        {
          title: "httpOnly cookies over localStorage for JWTs",
          detail:
            "Storing tokens in localStorage is the path of least resistance, but it leaves them readable by any injected script. httpOnly cookies cost more setup (CSRF consideration, CORS credentials) but remove an entire class of XSS token theft.",
        },
        {
          title: "Role-based access designed into the schema",
          detail:
            "Roles were modeled before the first route was written, so authorization checks are a middleware concern — not conditionals scattered through controllers.",
        },
        {
          title: "Rate limiting on auth endpoints",
          detail:
            "Login and signup are the highest-value attack surface. Express rate limiting keeps brute-force attempts cheap to absorb without touching legitimate traffic.",
        },
        {
          title: "REST over GraphQL",
          detail:
            "For a resource-oriented domain (opportunities, users, applications), REST keeps the mental model simple and caching trivial. GraphQL's flexibility wasn't worth its complexity at this scale.",
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
