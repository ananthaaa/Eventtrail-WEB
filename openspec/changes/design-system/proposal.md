## Why

The EventTrail application requires a distinct, premium visual language that immediately engages campus students and event administrators. We are implementing the Neo-brutalist design system specified in `design-system.md` to establish consistent styling tokens, tactile micro-animations, and reusable UI components across all future features (auth, event discovery, indoor/outdoor maps, and RSVP ticketing).

## What Changes

- Configure Tailwind CSS v3 (`frontend/tailwind.config.ts`) with custom Neo-brutalist color tokens (`bg-neobrutalist`, `accent-yellow`, `pastel-mint`, `pastel-peach`, `pastel-yellow`, `border-black`), Epilogue/Inter typography from Google Fonts, 3px borders, and hard-edged offset drop shadows (`neo-shadow*`).
- Build core UI components in `frontend/src/components/ui/`: `Button` (with framer-motion tap and shadow compression), `Badge`, `Card` (with hover lift), `SeatMeter`, `StepTracker`, `RSVPTicket`, `Marquee`, `ImageUploadZone`, and a toast notification system (`ToastProvider` / `useToast`).
- Build layout shells in `frontend/src/components/layout/`: `LandingLayout`, `StudentLayout`, `AdminLayout`, `NavBar`, and `Footer`.
- Correct legacy dark-theme token inconsistencies in `SeatMeter` and `StepTracker` by standardizing on the active Neo-brutalist tokens.
- Add a dedicated `/style-guide` visual QA route and screen in `frontend/src/pages/StyleGuide.tsx` demonstrating all components and variants.

## Capabilities

### New Capabilities
- `neobrutalist-tokens`: Tailwind CSS theme configuration, Google Fonts imports, and CSS utilities for Neo-brutalist borders, shadows, textures, and scrollbars.
- `ui-component-kit`: Reusable React component library (`Button`, `Badge`, `Card`, `SeatMeter`, `StepTracker`, `RSVPTicket`, `Marquee`, `ImageUploadZone`, toast system) with framer-motion micro-animations.
- `layout-shells`: Role-based page layout wrappers (`LandingLayout`, `StudentLayout`, `AdminLayout`, `NavBar`, `Footer`).
- `style-guide-qa`: Visual QA page at route `/style-guide` displaying interactive demos of all components and variants.

### Modified Capabilities
- `frontend-shell`: Update React router and application entry to support layout wrappers and the `/style-guide` route.

## Impact

- `frontend/tailwind.config.ts`: Replaced placeholder theme extensions with full Neo-brutalist design token definitions.
- `frontend/src/index.css`: Added Google Fonts import, `.neo-*` utility classes, grid textures, and custom scrollbars.
- `frontend/src/components/`: New directories `ui/` and `layout/` housing all foundational design system components.
- `frontend/src/pages/StyleGuide.tsx`: New visual QA screen accessible during local development and testing.
