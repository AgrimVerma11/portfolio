# agrimverma.dev

Source for my personal site — [github.com/AgrimVerma11](https://github.com/AgrimVerma11).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, custom theme in `tailwind.config.ts`
- Framer Motion for reveals and micro-interactions, GSAP ScrollTrigger for the timeline draw
- React Three Fiber for the hero particle field (three pinned to r182 — r183 deprecated `Clock`, which fiber v8 still uses)
- Lenis for smooth scrolling
- MDX blog via `next-mdx-remote` + `gray-matter`
- Clash Display self-hosted in `app/fonts/`; Inter / JetBrains Mono / Cormorant Garamond via `next/font`

## Running locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Env vars (both optional in dev):

- `NEXT_PUBLIC_SITE_URL` — canonical URL, used by metadata/sitemap/OG
- `NEXT_PUBLIC_FORMSPREE_ID` — contact form endpoint; without it the form falls back to `mailto:`

## Layout

```
app/            routes — / , /blog , /blog/[slug] , /projects/[slug]
sections/       homepage sections, top to bottom
components/     shared pieces (ParticleField, Reveal, Magnetic, SplitText, ...)
lib/            site constants, project data, skill graph, blog reader
content/blog/   .mdx files become posts on /blog
```

## Adding a post

Drop a file in `content/blog/`:

```mdx
---
title: "Post title"
date: "2026-06-01"
category: "Philosophy"
excerpt: "One line."
---

Body.
```

Nothing else to wire up.

## Notes to self

- [ ] point `lib/projects.ts` at the Opportunity Quest repo + live URL once deployed
- [ ] add `public/portrait.png` (bg-removed side profile, ≥1500px tall) — the interlude section picks it up at build time
- [ ] set up Formspree before going live

## Deploy

Vercel, zero config. Set the two env vars in the dashboard. Sitemap, robots, and the OG image are all generated.
