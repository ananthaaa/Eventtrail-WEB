## ADDED Requirements

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
The built React app SHALL render a minimal placeholder page (title "EventTrail — Coming Soon", a heading, and a brief description) so the CloudFront URL serves visible content immediately after deploy.

#### Scenario: Placeholder page is visible in browser
- **WHEN** the built bundle is served (via CloudFront or local `npm run preview`)
- **THEN** the page SHALL display the text "EventTrail" in the document title and a visible heading on screen

### Requirement: Tailwind CSS is configured and ready for Module 2 tokens
The `frontend/tailwind.config.ts` SHALL exist, extend the default theme, and have placeholder comments marking where Module 2 will inject color tokens, font families, and shadow utilities. The app SHALL import `index.css` which includes Tailwind's base/components/utilities layers.

#### Scenario: Tailwind utility classes apply in production build
- **WHEN** a Tailwind utility class (e.g., `bg-white`, `text-black`) is used in `App.tsx` and the app is built
- **THEN** the class SHALL appear in the purged CSS output in `dist/assets/`
