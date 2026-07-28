# Bridget Hu's Digital Garden

A responsive personal portfolio for Bridget Hu, designed as a warm and evolving digital
garden. The site brings together selected software projects, learning notes, current
interests, and a concise personal journey around one idea: **Growing through building.**

## Design theme

The visual system uses warm paper surfaces, soft sage green, lake blue, natural line art,
and original botanical SVG illustrations. The layout is intentionally quieter and more
personal than a conventional developer portfolio while remaining suitable for internship,
laboratory, competition, and graduate applications.

Core visual elements include:

- an animated digital plant in the hero;
- botanical project illustrations;
- a connected growth path and vine timeline;
- paper notes, field records, and a contact postcard;
- responsive, reduced-motion-aware interactions.

No remote images, external font services, backend, database, or API keys are used.

## Technology

- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- GSAP
- lucide-vue-next
- pnpm

## Local development

Requirements:

- Node.js 22 or later
- pnpm 10

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Vite will print the local URL, normally `http://localhost:5173`.

## Production build

Run the TypeScript checker and create the production bundle:

```bash
pnpm build
```

Preview the generated `dist` directory:

```bash
pnpm preview
```

## GitHub Pages deployment

The repository includes `.github/workflows/deploy.yml`. Each push to `main` installs
dependencies from `pnpm-lock.yaml`, builds the site, uploads `dist`, and deploys it through
GitHub Pages.

In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. This is the `bridget-hu.github.io` user site, so Vite uses the root
base path `/`.

## Updating content

- Projects and project illustration variants: `src/data/projects.ts`
- Journey entries: `src/data/journey.ts`
- Currently Growing items: `src/data/current.ts`
- Email, GitHub, and resume configuration: `src/data/contact.ts`
- About copy and interest tags: `src/components/AboutSection.vue`
- Beyond Code interests: `src/components/BeyondCodeSection.vue`
- Global colors, typography, and responsive rules: `src/styles/main.css`

## Email and resume placeholders

Replace `REPLACE_WITH_YOUR_EMAIL` in `src/data/contact.ts` when a public email address is
ready.

To add a resume:

1. add the real file to `public`, for example `public/resume.pdf`;
2. set `RESUME_URL` in `src/data/contact.ts` to `'/resume.pdf'`.

Until these values are provided, the website displays **Email coming soon** and
**Resume coming soon** without creating invalid links.
