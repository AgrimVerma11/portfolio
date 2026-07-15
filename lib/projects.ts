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
  /** path under /public to a real logo/brand mark, shown instead of the generic browser mock */
  logo?: string;
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
    slug: "firasa",
    title: "Firasa",
    tagline:
      "Academic risk intelligence that identifies at-risk students before they fall through the cracks.",
    description:
      "An end-to-end ML platform that clusters students into behavioral learning profiles and generates explainable, personalized interventions. Built on a Flask and React stack, deployed live on Render and Vercel, with real users across institutions globally. Powered by SHAP and LIME for interpretable recommendations, not black-box predictions.",
    tech: ["Python", "Flask", "React", "SHAP", "LIME", "Scikit-learn", "Render", "Vercel"],
    highlights: [
      "Live deployment with active users across the globe",
      "Behavioral clustering and explainable AI (SHAP/LIME) for interpretable academic interventions",
      "End-to-end ownership: ML pipeline, REST API, React frontend, and cloud deployment",
    ],
    github: "https://github.com/AgrimVerma11/Firasa",
    live: "https://firasa.agrimverma.dev",
    logo: "/projects/firasa-logo.jpg",
    featured: true,
    story: {
      problem: {
        heading: "The Problem",
        body: [
          "Most academic risk systems are reactive: a student is flagged only after grades slip or attendance drops, by which point the intervention window has mostly closed.",
          "There was no widely accessible tool that read behavioral signals early, explained its reasoning, and surfaced guidance an educator or student could actually act on. A prediction without an explanation does not change behavior; it just adds another number to ignore.",
        ],
      },
      approach: {
        heading: "The Approach",
        body: [
          "Firasa clusters students into behavioral learning profiles using unsupervised machine learning, working from proxies that are available before failure ever shows up on a transcript: engagement patterns, submission timing, and resource access.",
          "The pipeline moves data input through feature engineering, into clustering, then through a SHAP and LIME explanation layer, before serving results through a Flask REST API to a React frontend. Every stage exists so the final recommendation can be traced back to the behavior that produced it.",
        ],
      },
      solution: {
        heading: "What Makes It Different",
        body: [
          "Firasa is explainability-first by design. SHAP and LIME turn cluster membership into a reasoned account of why a student was grouped the way they were, so the output reads as a conversation starter for an educator, not a verdict.",
          "The name is a deliberate nod to that idea: Firasa is an 11th-century Arabic concept describing the ability to read a person's inner state from outward signs, which is exactly what the system does with behavioral data instead of intuition.",
        ],
      },
      outcome: {
        heading: "The Outcome",
        body: [
          "Firasa is deployed and in active use, with real users across institutions globally: a Flask API on Render, a React frontend on Vercel, and a Python ML pipeline connecting them.",
          "It was also built as part of Agrim's ML coursework evaluation, where it was recognized for the same explainability-first approach that defines the live product.",
        ],
      },
      decisions: [
        {
          title: "Unsupervised clustering over supervised classification",
          detail:
            "Labeled 'at-risk' outcomes are scarce and biased toward whoever already got flagged. Clustering on behavioral proxies surfaces profiles without needing historical failure labels, and generalizes across student populations a supervised model wouldn't.",
        },
        {
          title: "SHAP and LIME over an opaque risk score",
          detail:
            "A number alone tells an educator nothing about what to do next. Layering SHAP for global feature importance with LIME for per-student explanations turns each recommendation into something a human can question and act on.",
        },
        {
          title: "Flask as the inference layer",
          detail:
            "The ML pipeline is Python end to end, so a Flask REST API kept the model, the explanation layer, and the serving logic in one language without a translation layer between training and inference.",
        },
        {
          title: "Render and Vercel over a single host",
          detail:
            "Splitting the Flask API onto Render and the React frontend onto Vercel let each half deploy on infrastructure suited to it, backend workloads on Render and static/edge-rendered frontend on Vercel, without provisioning a server directly.",
        },
      ],
    },
  },
  {
    slug: "opportunity-quest",
    title: "Opportunity Quest",
    tagline:
      "A production-grade platform that turns scattered campus opportunities – internships, research, hackathons – into one structured, searchable pipeline.",
    description:
      "A security-hardened MERN platform engineered end to end, solo: schema-first data modeling, role-based access control, and an API surface designed for features that don't exist yet.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "REST API"],
    highlights: [
      "Security-first backend – httpOnly JWT cookies, CORS allowlisting, rate-limited auth, zero secrets in source",
      "Role-based access control modeled at the schema level and enforced as middleware on every route",
      "Modular REST architecture engineered to absorb new opportunity types and scale without rewrites",
    ],
    github: "https://github.com/AgrimVerma11/OpportunityQuest",
    featured: false,
    story: {
      problem: {
        heading: "The Observation",
        body: [
          "In my third year I noticed a gap everyone lived with but nobody named: faculty and departments held opportunities – internships, research openings, hackathons – that rarely reached the students they were meant for. What did circulate moved through WhatsApp forwards, expired Google Forms, and word of mouth, and the good ones were usually found too late.",
          "Nobody asked me to fix this. The observation was mine, and so was the itch: this wasn't a content problem, it was an infrastructure problem. The opportunities existed; there was just no reliable, structured pipe between the people who had them and the people who needed them.",
        ],
      },
      approach: {
        heading: "The Approach",
        body: [
          "I designed Opportunity Quest as a single source of truth: a platform where opportunities carry structured metadata – type, deadline, eligibility – and students query with real filters instead of scroll-and-pray. The system was designed before the code: entity relationships, the route map, and the auth flows all existed on paper first.",
          "From day one I treated it as a production system, not a college project. The data model was locked before the first route was written, role-based access (students vs. posters vs. admins) was planned into the schema up front, and security was part of the architecture – threat-modeled around the auth surface – rather than a final-week patch.",
        ],
      },
      solution: {
        heading: "The Solution",
        body: [
          "The result is a MERN application with a clean RESTful API layer. Authentication uses JWTs delivered via httpOnly cookies, keeping tokens out of localStorage and out of reach of XSS. CORS is locked to known origins, secrets live in environment variables, and rate limiting protects the auth endpoints from brute-force attempts.",
          "On the frontend, React handles the discovery flow: browsing, filtering, and viewing opportunity detail pages, with auth state managed cleanly across protected routes. The API is organized by resource with consistent error handling, making new opportunity types cheap to add.",
        ],
      },
      outcome: {
        heading: "The Outcome",
        body: [
          "A deployable, security-hardened platform that covers the full engineering lifecycle solo: schema design, API architecture, auth, and frontend state, plus the production concerns (rate limiting, cookie security, CORS policy) that separate a demo from a system. It's the kind of infrastructure campuses usually buy, built from a gap I noticed and refused to ignore.",
          "The codebase is structured so the next features – notifications, saved searches, posting workflows – slot into existing patterns instead of requiring rewrites. That's deliberate: the platform was engineered for the roadmap, not just the demo.",
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
            "Roles were modeled before the first route was written, so authorization checks are a middleware concern, not conditionals scattered through controllers.",
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
