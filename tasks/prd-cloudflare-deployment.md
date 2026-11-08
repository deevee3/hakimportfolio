# Cloudflare Pages Deployment PRD

## Introduction / Overview
The Hakim Portfolio is a Next.js 15 App Router site (`src/app/page.tsx`) that currently targets Firebase App Hosting (`apphosting.yaml`).
 We need to enable deployment on **Cloudflare Pages**, ensuring the build pipeline, environment variables, and runtime integrations (notably the Genkit AI image optimization feature in `src/ai/flows/optimize-image-sizes.ts`) work end to end. The goal is to deliver a repeatable deployment path for Cloudflare without breaking existing local/Firebase workflows.

## Goals
- Deliver a reliable build-and-deploy workflow for Cloudflare Pages that outputs the statically generated/SSR bundle from the existing Next.js project.
- Document runtime configuration (environment variables, secrets, integrations) required for Cloudflare.
- Validate that all user-facing routes and server actions (e.g., `optimizeImageAction` in `src/app/actions/optimize-image.ts`) function within Cloudflare limits or have a fallback.

## User Stories
- **As a developer**, I can run a Cloudflare-specific build command so that the site deploys successfully on Pages without manual tweaks.
- **As a developer**, I can configure required secrets (e.g., Google Genkit credentials) in Cloudflare Pages so that AI-powered features keep working.
- **As a developer**, I understand any Firebase dependencies that must be retained or replaced before deploying to Cloudflare.
- **As a developer**, I can verify deployment health via documented checks or testing steps post-deploy.

## Functional Requirements
1. Provide a Cloudflare Pages build pipeline using `@cloudflare/next-on-pages` (or equivalent) that compiles the Next.js app with app directory support.
2. Document the exact build and deploy commands (e.g., `npm install`, `npx @cloudflare/next-on-pages build`, upload artifacts) and confirm compatibility with the existing scripts in `package.json`.
3. Identify and list all environment variables and secrets required at runtime, including Genkit / Google AI keys, any Firebase config, and placeholder values if the final keys are unknown.
4. Ensure server actions (`optimizeImageAction`) either run within the Cloudflare Worker environment or provide an alternative path (e.g., disabling feature with UX messaging when credentials are absent).
5. Produce guidance for staging vs. production deployments, even if final environment separation is undecided (recommend defaults to unlock future multi-env support).
6. Update project documentation (e.g., root `README.md`) summarizing Cloudflare deployment steps and noting dual hosting considerations.
7. Validate deployment by running an end-to-end smoke test checklist that covers core pages and AI assistant functionality; document results or known blockers.

## Non-Goals
- Migrating Firebase services to Cloudflare equivalents (decision pending).
- Refactoring application features unrelated to deployment (e.g., UI redesigns, new functionality).
- Implementing automated CI/CD pipelines beyond the minimal deployment steps unless required by Cloudflare Pages.

## Design Considerations (Optional)
- Keep the existing branding guidelines defined in `docs/blueprint.md`. Deployment work must not regress styles or asset delivery.
- Monitor Cloudflare Image Optimization or caching settings to preserve current image quality, especially for gallery and Instagram sections.

## Technical Considerations (Optional)
- The project uses `genkit` with Google AI (`src/ai/genkit.ts`); Cloudflare Workers require edge-compatible dependencies and secrets (`GOOGLE_API_KEY` or service credentials). Confirm that Genkit’s Node APIs run on Workers or plan a fall-back (e.g., invoke an external API endpoint).
- `package.json` pins Next.js 15.3.3. Verify `@cloudflare/next-on-pages` version compatibility with this release (app directory + server actions support is still evolving).
- Current build script sets `NODE_ENV=production next build`. Cloudflare’s build image may not accept inline environment assignments; consider moving to a cross-platform command or `.env.production` file without overwriting the user’s `.env`.
- The app leverages Tailwind (`tailwind.config.ts`) and shadcn UI components; ensure the build step processes PostCSS (`postcss.config.mjs`).

## Success Metrics
- Cloudflare Pages deployment completes without build errors and serves the homepage, gallery, Instagram section, and contact form.
- Server actions (image optimizer) return valid responses or graceful fallback messaging verified in the deployed environment.
- Documented deployment steps allow another developer to redeploy within 30 minutes.
- No regressions in existing Firebase hosting (if retained) or local development workflows (`npm run dev`).

## Open Questions
- What is the definitive plan for Firebase services (keep vs. migrate)?
- Which Google/Genkit credentials are available, and can they operate inside Cloudflare Workers without Node-specific modules?
- Do we need automated previews (preview branches) on Cloudflare Pages, and how should secrets be managed per environment to support that?
- Should we introduce monitoring/logging specific to Cloudflare (e.g., Workers Trace Events) for post-deploy visibility?
