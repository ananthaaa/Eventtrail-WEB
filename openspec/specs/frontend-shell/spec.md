# Capability: Frontend Shell

## Purpose
Defines the base client-side application architecture using Vite, React 19, TypeScript, Tailwind CSS v3, and linting tools (ESLint + Oxlint).

## Requirements

### Requirement: Frontend application builds successfully from clean install
The `frontend/` directory SHALL contain a Vite + React 19 + TypeScript project that installs cleanly (`npm ci`), passes lint (`npm run lint`), and produces a `dist/` bundle (`npm run build`) with no errors.

#### Scenario: Fresh install and build succeeds
- **WHEN** a developer runs `npm ci && npm run build` inside `frontend/`
- **THEN** the command SHALL exit with code 0 and `frontend/dist/index.html` SHALL exist

#### Scenario: Lint passes with no errors
- **WHEN** a developer runs `npm run lint` inside `frontend/`
- **THEN** the command SHALL exit with code 0 and report zero errors

#### Scenario: Dev server starts on default port
- **WHEN** a developer runs `npm run dev` inside `frontend/`
- **THEN** Vite SHALL start and serve the app at `http://localhost:5173` with hot-module replacement active

### Requirement: Frontend renders a placeholder page
The built React app SHALL configure client-side routing (e.g., using React Router or state-based tab routing) and render active application screens wrapped in appropriate layout shells, including a public landing page and the `/style-guide` route for visual QA, replacing the static Module 1.1 placeholder page.

#### Scenario: Placeholder page is visible in browser
- **WHEN** the built bundle is served (via CloudFront or local `npm run preview`)
- **THEN** the root path `/` SHALL render the main landing layout and navigation chrome, and the path `/style-guide` SHALL render the interactive design system catalog

### Requirement: Tailwind CSS is configured and ready for Module 2 tokens
The `frontend/tailwind.config.ts` SHALL exist, extend the default theme, and have placeholder comments marking where Module 2 will inject color tokens, font families, and shadow utilities. The app SHALL import `index.css` which includes Tailwind's base/components/utilities layers.

#### Scenario: Tailwind utility classes apply in production build
- **WHEN** a Tailwind utility class (e.g., `bg-white`, `text-black`) is used in `App.tsx` and the app is built
- **THEN** the class SHALL appear in the purged CSS output in `dist/assets/`
