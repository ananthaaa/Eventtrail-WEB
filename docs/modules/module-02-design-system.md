# Module 1.2 — Design System

## What was built
- **Neo-brutalist Token Configuration**: Expanded `frontend/tailwind.config.ts` and `frontend/src/index.css` with canonical Neo-brutalist colors (`bg-neobrutalist` `#F9F5F6`, `accent-yellow` `#FFDB58`, `pastel-mint` `#DAF5F0`, `pastel-peach` `#F8D6B3`, `pastel-yellow` `#FDFD96`), Google Fonts (`Epilogue` and `Inter`), 3px solid black borders, sharp `rounded-none` geometry, and flat shadow offset tokens (`neo-shadow-sm`, `neo-shadow`, `neo-shadow-lg`).
- **Atomic UI Component Library (`frontend/src/components/ui/`)**: Rebuilt 9 tactile components from scratch:
  - `Button`: Supports variants (`primary`, `secondary`, `accent`, `outline`), sizes (`sm`, `md`, `lg`), disabled states, and Framer Motion tap compression (`whileTap={{ scale: 0.98, x: 2, y: 2 }}`).
  - `Badge`: Styled uppercase bold pill in 6 variants (`mint`, `peach`, `yellow`, `accent`, `white`, `dark`) with 2px black border.
  - `Card`: Background variants, shadow sizes, and interactive Framer Motion hover lifts (`whileHover={{ x: -2, y: -2 }}`).
  - `SeatMeter`: Animated capacity fill bar using Framer Motion that dynamically switches to a warning red waitlist mode (`0 Seats Remaining`) when `available <= 0`.
  - `StepTracker`: Vertical numbered step sequence with checkmark icons for completed steps, active highlighting, and connecting line lines.
  - `RSVPTicket`: Tactile admission ticket card featuring edge circular cutouts, dashed perforation divider line, status icon box, status badge, and ticket number tag.
  - `Marquee`: Infinite horizontal scrolling text banner with rotated yellow diamond separators and speed controls.
  - `ImageUploadZone`: File drag-and-drop zone with thick 3px dashed border, active drop hover styling, and instant image preview with removal button.
  - `ToastProvider` & `useToast`: Context notification system rendering animated alert cards (`success`, `error`, `info`, `warning`) in the bottom-right viewport corner.
- **Layout Shells (`frontend/src/components/layout/`)**:
  - `NavBar`: Sticky header displaying Epilogue brand logo, navigation links, and role CTA button.
  - `Footer`: Bottom footer displaying brand mission, navigation quick links, tech stack details, and copyright.
  - `LandingLayout`: Public marketing shell wrapping content with `.bg-grid-dots` background pattern.
  - `StudentLayout`: Authenticated student workspace shell featuring student sub-navigation banner (`My RSVPs`, `My Clubs`, etc.).
  - `AdminLayout`: Administrative control panel shell with responsive dark/peach sidebar and workspace chrome.
- **Visual QA Style Guide & Routing**: Created interactive test suite at `frontend/src/pages/StyleGuide.tsx` demonstrating all UI components, Framer Motion micro-animations, and live toast triggers. Configured basic client routing in `frontend/src/App.tsx` for `/style-guide`, `/events`, `/admin`, and `/`.

## Key Decisions & Rationale
- **Strict Canonical Token Enforcement**: Purged leftover legacy dark theme classes (`bg-surface`, `text-primary`, `border-subtle`) found in reference mockups, replacing them exclusively with canonical Neo-brutalist tokens to maintain strict adherence to `design-system.md`.
- **Framer Motion Micro-Animations**: Replaced CSS active states on tactile components with Framer Motion physics-based transforms for smoother, tactile user engagement (e.g., tap compression and hover shadow expansion).
- **Separation of Hook and Provider**: Extracted `useToast` and context definitions into `useToast.ts` to satisfy Fast Refresh ESLint rules (`react-refresh/only-export-components`).

## AWS Resources Touched/Created
- None in this module (UI layer only). Existing CDK v2 infrastructure remains unchanged.

## Database Changes
- None in this module.

## Known Gaps / TODO for Next Sprint
- Module 2.1: Implement AWS Lambda auth handlers and Amazon Cognito user pools.
- Integrate real DynamoDB event feed and RDS student RSVP data with the `RSVPTicket` and `SeatMeter` UI components in Module 3.

## How to Test Locally
1. **Frontend Build & Lint**:
   ```bash
   cd frontend
   npm run lint
   npm run build
   ```
2. **Interactive Visual QA**:
   ```bash
   cd frontend
   npm run dev
   ```
   Open `http://localhost:5173/style-guide` in your browser to inspect and interact with all design tokens, components, and toast alerts.
