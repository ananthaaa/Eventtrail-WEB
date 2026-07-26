## Context

In Module 1.1, we established a React 19 + TypeScript + Vite frontend shell with a default Tailwind CSS v3 configuration and placeholder comments for design tokens. The reference UI design (`EventTrail-UI-main` / `design-system.md`) relies on a Neo-brutalist aesthetic characterized by hard-edged 3px black borders, flat offset box shadows (`2px 2px 0px 0px #000`, etc.), distinctive typography (`Epilogue` for headings/buttons and `Inter` for body), and vibrant pastel/accent backgrounds (`#F9F5F6`, `#FFDB58`, etc.).

To prepare for subsequent feature modules (auth, event browsing, maps, and ticketing), we must port these design tokens and build a robust UI component kit and layout hierarchy from scratch without copying legacy code or introducing inconsistencies.

## Goals / Non-Goals

**Goals:**
- Extend Tailwind CSS (`tailwind.config.ts`) with custom Neo-brutalist color tokens, typography families, border widths (`3px`), and box shadows.
- Define global CSS utility classes in `index.css` for borders, shadows, active button compression, dotted background grids, and custom scrollbars.
- Build 9 foundational UI components (`Button`, `Badge`, `Card`, `SeatMeter`, `StepTracker`, `RSVPTicket`, `Marquee`, `ImageUploadZone`, toast system) using React 19, TypeScript, and `framer-motion` animations.
- Build 5 core layout shells (`NavBar`, `Footer`, `LandingLayout`, `StudentLayout`, `AdminLayout`) with responsive navigation and slot-based layout composition.
- Build a visual QA style guide route (`/style-guide` -> `StyleGuide.tsx`) rendering every component and variant state to satisfy the Module 1.2 Definition of Done.

**Non-Goals:**
- Implementing Leaflet-specific map components (`CampusMap`, `RouteLayer`); these will be built in Module 11 when outdoor routing and Leaflet integrations are implemented.
- Wiring real AWS backend APIs or Cognito auth logic into the layout buttons; buttons will use placeholder actions or local state toggles for now.

## Decisions

1. **Framer Motion for Micro-Animations**:
   - *Choice*: Use `framer-motion` for interactive button taps (`whileTap={{ scale: 0.98 }}`), card hover lifts, and animated progress bars (`SeatMeter`).
   - *Rationale*: Provides fluid hardware-accelerated animations and declarative gesture handling that aligns with modern web design best practices and the tactile Neo-brutalist metaphor.
   - *Alternatives Considered*: CSS transitions only. Rejected because complex spring physics and sequenced animations are cumbersome in pure CSS.

2. **Strict Neo-brutalist Token Enforcement**:
   - *Choice*: Eliminate legacy dark-theme tokens (`bg-surface`, `text-primary`, `border-subtle`) found in the reference demo's `SeatMeter` and `StepTracker`. Rebuild them using canonical tokens (`bg-white`, `neo-border`, `neo-shadow`, `accent-yellow`, `text-black`).
   - *Rationale*: Maintains visual consistency across all components and prevents token drift.

3. **Context-Based Toast Notification System**:
   - *Choice*: Build a lightweight React Context (`ToastContext` / `ToastProvider` / `useToast`) with Neo-brutalist styled alerts positioned at the bottom-right of the viewport.
   - *Rationale*: Replaces third-party toast libraries with a custom solution that perfectly matches our 3px borders, square corners, and flat drop shadows.

4. **Component Architecture & Folder Layout**:
   - *Choice*: Organize components into `src/components/ui/` (atomic elements: `Button`, `Card`, `Badge`, etc.) and `src/components/layout/` (structural wrappers: `NavBar`, `Footer`, `LandingLayout`, `StudentLayout`, `AdminLayout`).
   - *Rationale*: Establishes a clear separation of concerns between reusable atomic design components and page-level chrome.

## Risks / Trade-offs

- **Risk: Performance overhead from excessive framer-motion animations on lists or grids.**
  - *Mitigation*: Restrict animations on passive list elements; apply motion primarily to interactive buttons, clickable cards, and state transitions (e.g., progress bars). Use standard CSS transforms for simple hover states where appropriate.
- **Risk: React 19 type incompatibilities with older third-party animation libraries.**
  - *Mitigation*: Ensure `framer-motion` is installed at a React 19-compatible version (`^12.0.0` or latest) and test build synthesis with `npm run build` after every component addition.
