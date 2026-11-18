# Yasyn Nait Edderhm — Portfolio

An original, cinematic portfolio for a full-stack developer. It is built with Next.js, TypeScript, GSAP, Tailwind CSS, and a lightweight React Three Fiber hero scene.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run typecheck
npm run build
npm run start
```

The production build uses Next's webpack compiler because the local environment blocks Turbopack's CSS worker. This has no effect on the application experience.

## Project structure

- `app/` — App Router pages, metadata, sitemap, robots rules, and global design system.
- `components/` — navigation, cinematic intro, hero scene, project gallery, dialog, constellation, and content sections.
- `lib/projects.ts` — verified project content and case-study data.
- `public/assets/` — portrait images used by the experience.

## Notes

- The first visit has a short optional intro; it is skipped for users who prefer reduced motion and can always be skipped manually.
- The Three.js hero scene is client-only and has a CSS fallback for reduced-motion or unavailable WebGL environments.
- Set `NEXT_PUBLIC_SITE_URL` in the deployment environment to enable canonical metadata and a populated sitemap.
- AtlasMatch only describes the implemented catalog foundation. Community, chat, AI, and trip-planning features are identified as future work where relevant.
